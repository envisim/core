import {Random} from '@envisim/random';
import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {typeOfFrame} from './typeOfFrame.js';
import {copy, distance} from '@envisim/geojson-utils';
import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {
  uniformDetectionFunction,
  halfNormalDetectionFunction,
  effectiveRadius,
} from './sampleDistanceUtils.js';

export type TsampleDistancePointsOpts = {
  cutoff: number;
  df: 'uniform' | 'halfnormal';
  sigma?: number;
  method: 'uniform' | 'systematic';
  sampleSize: number;
  buffer?: number;
  ratio?: number;
  rand?: Random;
};

/**
 * Distance sampling with points. Selects a point sample on an area frame
 * and collect point objects from a base layer using a detection function
 * to (randomly) determine inclusion.
 *
 * @param frame - A GeoJSON FeatureCollection of Polygon/MultiPolygon features.
 * @param base - A GeoJSON FeatureCollection of single Point features.
 * @param opts - An object containing cutoff, df, sigma, method, sampleSize, buffer, ratio (dx/dy)
 * @param opts.cutoff - The maximum detection distance.
 * @param opts.df - The detection function "uniform" or "halfnormal".
 * @param opts.sigma - The sigma parameter for "halfnormal".
 * @param opts.method - The method to use "uniform" or "systematic"
 * @param opts.sampleSize - The expected sample size of points as integer > 0.
 * @param opts.buffer - Optional buffer in meters (default cutoff).
 * @param opts.ratio - The ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand - An optional instance of Random.
 * @returns - Resulting GeoJSON FeatureCollection.
 */
export const sampleDistancePoints = (
  frame: GeoJSON.FeatureCollection,
  base: GeoJSON.FeatureCollection,
  opts: TsampleDistancePointsOpts,
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
  const cutoff = opts.cutoff ?? 10;
  // Construct detection function
  let g: Function;
  if (opts.df === 'halfnormal') {
    g = halfNormalDetectionFunction(opts.sigma ?? 1, cutoff);
  } else {
    // default to uniform
    g = uniformDetectionFunction(cutoff);
  }
  // Compute effective radius
  const effRadius = effectiveRadius(g, cutoff);
  // Set random generator
  const rand = opts.rand ?? new Random();
  opts.rand = rand;
  // Select sample of points (optional buffer via opts)
  const buffer = opts.buffer ?? cutoff;
  opts.buffer = buffer;
  const pointSample = samplePointsOnAreas(frame, opts);
  // To store sampled features
  const sampledFeatures: GeoJSON.Feature[] = [];

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  base.features.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;

      pointSample.features.forEach((samplePoint, samplePointIndex) => {
        if (samplePoint.geometry.type === 'Point') {
          const dist = distance(
            basePointCoords,
            samplePoint.geometry.coordinates,
          );
          if (dist < cutoff && rand.float() < g(dist)) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frame.features.length; i++) {
              const frameFeature = frame.features[i];
              const intersect = intersectPointAreaFeatures(
                pointFeature,
                frameFeature,
              );
              if (intersect.intersection) {
                // Follow the design weight
                let dw = 1 / (Math.PI * effRadius * effRadius);
                if (samplePoint.properties?._designWeight) {
                  dw *= samplePoint.properties._designWeight;
                }
                // If buffer = 0, then sample point has already collected
                // design weight from frame. If buffer > 0, then we need
                // to collect the weight here.
                if (frameFeature.properties?._designWeight && buffer > 0) {
                  dw *= frameFeature.properties._designWeight;
                }
                const newFeature = copy(pointFeature);
                if (!newFeature.properties) {
                  newFeature.properties = {};
                }
                newFeature.properties._designWeight = dw;
                newFeature.properties._parent = samplePointIndex;
                newFeature.properties._distance = dist;
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
