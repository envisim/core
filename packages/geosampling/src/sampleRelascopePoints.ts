import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {typeOfFrame} from './typeOfFrame.js';
import {copy, distance} from '@envisim/geojson-utils';
import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {Random} from '@envisim/random';

// TODO: Decide if we should implement correction by adding the correct buffer.
// Probably deviates from common use to add buffer, but estimates will be biased
// if we do not add the correction.

export type TsampleRelascopePoints = {
  buffer?: number;
  ratio?: number;
  rand?: Random;
};

/**
 * Selects a point sample on an area frame and collect point objects from a base
 * layer using a relascope to determine inclusion. A buffer is needed for unbiased
 * estimation. The buffer should be set to the largest radius of the inclusion zones.
 * The largest radius depends on maximum value of sizeProperty and the factor of
 * the relascope, according to max(radius) = (50 * max(sizePropertyValue)) / sqrt(factor).
 * Default buffer is zero, which gives a negative bias for estimates of positive
 * quantities.
 *
 * @param frame - A GeoJSON FeatureCollection of Polygon/MultiPolygon features.
 * @param method - The method to use "uniform" or "systematic"
 * @param sampleSize - The expected number of points as integer > 0.
 * @param base - A GeoJSON FeatureCollection of single Point features.
 * @param sizeProperty - The name of the size property in base which has numeric value in meters (e.g. diameter at breast hight).
 * @param factor - Positive number, the relascope factor.
 * @param opts - An object containing buffer, ratio (dx/dy), rand
 * @param opts.buffer - Optional buffer in meters (default 0).
 * @param opts.ratio - The ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand - An optional instance of Random.
 * @returns - Resulting GeoJSON FeatureCollection.
 */
export const sampleRelascopePoints = (
  frame: GeoJSON.FeatureCollection,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  base: GeoJSON.FeatureCollection,
  sizeProperty: string,
  factor: number,
  opts: TsampleRelascopePoints,
): GeoJSON.FeatureCollection => {
  // Check types first
  const frameType = typeOfFrame(frame);
  const baseType = typeOfFrame(base);
  if (frameType !== 'area') {
    throw new Error(
      'Parameter frame must be a FeatureCollection of Polygons/MultiPolygons.',
    );
  }
  if (baseType !== 'point') {
    throw new Error('Parameter base must be a FeatureCollection of Points.');
  }

  // Square root of relascope factor
  const sqrtRf = Math.sqrt(factor);
  // Set buffer
  const buffer = opts.buffer || 0;
  opts.buffer = buffer;
  // Select sample of points (optional buffer via opts)
  const pointSample = samplePointsOnAreas(frame, method, sampleSize, opts);
  // To store sampled features
  const sampledFeatures: GeoJSON.Feature[] = [];

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  base.features.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;
      let sizePropertyValue = 0;
      if (pointFeature.properties) {
        sizePropertyValue = pointFeature.properties[sizeProperty] || 0;
      }
      // Radius of inclusion zone
      const radius = (50 * sizePropertyValue) / sqrtRf;

      pointSample.features.forEach((samplePoint, samplePointIndex) => {
        if (samplePoint.geometry.type === 'Point') {
          const dist = distance(
            basePointCoords,
            samplePoint.geometry.coordinates,
          );
          if (dist < radius) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frame.features.length; i++) {
              const frameFeature = frame.features[i];
              const intersect = intersectPointAreaFeatures(
                pointFeature,
                frameFeature,
              );
              if (intersect.intersection) {
                // Follow the design weight
                let dw = 1 / (Math.PI * radius * radius);
                if (samplePoint.properties?._designWeight) {
                  dw *= samplePoint.properties._designWeight;
                }
                // If buffer = 0, then sample point has already collected
                // design weight from frame. If buffer > 0, then we need to
                // collect the weight here.
                if (frameFeature.properties?._designWeight && buffer > 0) {
                  dw *= frameFeature.properties._designWeight;
                }
                const newFeature = copy(pointFeature);
                if (!newFeature.properties) {
                  newFeature.properties = {};
                }
                newFeature.properties._designWeight = dw;
                newFeature.properties._parent = samplePointIndex;
                sampledFeatures.push(newFeature);
                break;
              }
            }
          }
        }
      });
    } else {
      throw new Error(
        'Only Features with geometry of type Point is allowed in parameter base.',
      );
    }
  });
  return {
    type: 'FeatureCollection',
    features: sampledFeatures,
  };
};
