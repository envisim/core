import {copy, distancePointToLine} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {effectiveHalfWidth} from './sampleDistanceUtils.js';
import {sampleLinesOnAreas} from './sampleLinesOnAreas.js';
import {typeOfFrame} from './typeOfFrame.js';

export type TsampleDistanceLinesOpts = {
  rotation?: number;
  rand?: Random;
};

/**
 * Distance sampling with line transects.
 * Selects a line sample on an area frame and collect point objects from a base
 * layer using a detection function to (randomly) determine inclusion.
 *
 * @param frame - A GeoJSON FeatureCollection of Polygon/MultiPolygon features.
 * @param distBetween - The distance in meters between lines.
 * @param base - A GeoJSON FeatureCollection of single Point features.
 * @param detectionFunction - The detection function.
 * @param cutoff - Positive number, the maximum distance for detection.
 * @param opts - An object containing distBetween, rotation, rand.
 * @param opts.rotation - Optional fixed rotation of the lines.
 * @param opts.rand - An optional instance of Random.
 * @returns - Resulting GeoJSON FeatureCollection.
 */
export const sampleDistanceLines = (
  frame: GeoJSON.FeatureCollection,
  distBetween: number,
  base: GeoJSON.FeatureCollection,
  detectionFunction: Function,
  cutoff: number,
  opts: TsampleDistanceLinesOpts,
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
  // Compute effective half width
  const effHalfWidth = effectiveHalfWidth(detectionFunction, cutoff);
  // Get random generator
  const rand = opts.rand ?? new Random();
  opts.rand = rand;
  // Compute design weight for this selection
  const dw = distBetween / (effHalfWidth * 2);

  // Select sample of lines
  const lineSample = sampleLinesOnAreas(frame, distBetween, opts);
  // To store sampled features
  const sampledFeatures: GeoJSON.Feature[] = [];

  // Find selected points in base layer and check if
  // seleccted base point is in frame and transfer _designWeight
  base.features.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;

      lineSample.features.forEach((sampleLine, sampleLineIndex) => {
        const type = sampleLine.geometry.type;
        if (type === 'LineString' || type === 'MultiLineString') {
          const dist = distancePointToLine(pointFeature, sampleLine);
          if (dist < cutoff && rand.float() < detectionFunction(dist)) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frame.features.length; i++) {
              const frameFeature = frame.features[i];
              const intersect = intersectPointAreaFeatures(
                pointFeature,
                frameFeature,
              );
              if (intersect.geoJSON) {
                // Follow the design weight
                // This selection
                let designWeight = dw;
                // All previous selections
                if (frameFeature.properties?._designWeight) {
                  designWeight *= frameFeature.properties._designWeight;
                }
                const newFeature = copy(pointFeature);
                if (!newFeature.properties) {
                  newFeature.properties = {};
                }
                newFeature.properties._designWeight = designWeight;
                newFeature.properties._parent = sampleLineIndex;
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
