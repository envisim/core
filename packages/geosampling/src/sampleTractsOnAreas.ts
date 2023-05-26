import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {
  placeModelTract,
  radiusOfModelTract,
  sizeOfModelTract,
  pointTract,
} from './modelTract.js';
import {bbox} from '@envisim/geojson-utils';
import {typeOfFrame} from './typeOfFrame.js';
import {intersectLineSampleAreaFrame} from './intersectLineSampleAreaFrame.js';
import {intersectPointSampleAreaFrame} from './intersectPointSampleAreaFrame.js';
import {intersectAreaSampleAreaFrame} from './intersectAreaSampleAreaFrame.js';

export type TsampleTractsOnAreasOpts = {
  rotation?: number;
  randomRotation?: boolean;
  ratio?: number;
  rand?: Random;
};
/**
 * Select a sample of tracts on areas.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing area.
 * @param method - The method to use "uniform" or "systematic".
 * @param sampleSize - Expected sample size integer > 0.
 * @param modelTract - A GeoJSON model tract.
 * @param opts - An options object.
 * @param opts.rotation - The rotation angle in degrees.
 * @param opts.randomRotation - Boolean true/false for random rotation of individual tract (always true for line tract).
 * @param opts.ratio - An optional ratio for systematic sampling.
 * @param opts.rand - An optional instance of Random.
 * @returns - Resulting GeoJSON.
 */
export const sampleTractsOnAreas = (
  geoJSON: GeoJSON.FeatureCollection,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  modelTract: GeoJSON.Feature,
  opts: TsampleTractsOnAreasOpts = {},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const point = pointTract();
  // Set default options.
  const tract = modelTract ?? point;
  const rotation = opts.rotation ?? 0;
  let randomRotation = opts.randomRotation ?? false;
  const rand = opts.rand ?? new Random();

  // Check input modelTract is of type Feature.
  if (tract.type !== 'Feature') {
    throw new Error(
      'The modelTract needs to be of type Feature, not type: ' +
        tract.type +
        '.',
    );
  }

  const typeOfTract = typeOfFrame(tract);

  // Force randomRotation for type line!
  if (typeOfTract === 'line') {
    randomRotation = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelTract(tract);
  const sizeOfTract = sizeOfModelTract(tract);

  // Select first a sample of points and use radius as buffer.
  const featureCollection = samplePointsOnAreas(geoJSON, method, sampleSize, {
    ratio: opts.ratio ?? 1,
    buffer: radius,
    rand: rand,
  });

  if (radius === 0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return featureCollection;
  }

  // Transform the Features by placing a model tract on each point.
  featureCollection.features.forEach((feature, index) => {
    const dw = feature.properties?._designWeight || 1;
    let newFeature: GeoJSON.Feature;
    if (feature.geometry.type === 'Point') {
      newFeature = placeModelTract(tract, feature.geometry.coordinates, {
        rotation: rotation,
        randomRotation: randomRotation,
        rand: rand,
      });
      if (newFeature.properties) {
        newFeature.properties._designWeight = dw / sizeOfTract;
        // Flag randomRotation on line features for future
        // computation of _designWeight or collect.
        if (randomRotation && typeOfTract === 'line') {
          newFeature.properties._randomRotation = true;
        }
      }
      newFeature.bbox = bbox(newFeature);
      featureCollection.features[index] = newFeature;
    }
  });

  // Check type point/line/area and transfer designWeights from parents
  // by intersect of all features and split of features.
  if (typeOfTract === 'point') {
    // Call intersectPointSampleAreaFrame.
    return intersectPointSampleAreaFrame(featureCollection, geoJSON);
  }
  if (typeOfTract === 'line') {
    // Call intersectLineSampleAreaFrame.
    return intersectLineSampleAreaFrame(featureCollection, geoJSON);
  }
  if (typeOfTract === 'area') {
    // Call intersectAreaSampleAreaFrame.
    return intersectAreaSampleAreaFrame(featureCollection, geoJSON);
  }
  return {type: 'FeatureCollection', features: []};
};
