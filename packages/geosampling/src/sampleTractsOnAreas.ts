import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {
  placeModelTract,
  radiusOfModelTract,
  sizeOfModelTract,
} from './modelTract.js';
import {addBboxes} from './bbox.js';
import {typeOfFrame} from './typeOfFrame.js';
import {intersectLineSampleAreaFrame} from './intersectLineSampleAreaFrame.js';
import {intersectPointSampleAreaFrame} from './intersectPointSampleAreaFrame.js';
import {intersectAreaSampleAreaFrame} from './intersectAreaSampleAreaFrame.js';

interface IsampleTractsOnAreasOpts {
  modelTract: GeoJSON.Feature;
  rotation?: number;
  sampleSize: number;
  method: 'uniform' | 'systematic';
  randomRotation?: boolean;
  ratio?: number;
  rand?: Random;
}
/**
 * Select a sample of tracts on areas.
 *
 * @param geoJSON - A GeoJSON containing area.
 * @param opts - An options object.
 * @param opts.modelTract - A GeoJSON model tract.
 * @param opts.method - The method to use "uniform" or "systematic".
 * @param opts.sampleSize - Expected sample size integer > 0.
 * @param opts.rotation - The rotation angle in degrees.
 * @param opts.randomRotation - Boolean true/false for random rotation of individual tract.
 * @returns - Resulting GeoJSON.
 */
export const sampleTractsOnAreas = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
  opts: IsampleTractsOnAreasOpts,
) => {
  const point: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {},
  };

  // Set default options.
  const tract = opts.modelTract || point;
  const rotation = opts.rotation || 0;
  const sampleSize = opts.sampleSize || 1;
  const method = opts.method || 'uniform';
  const randomRotation = opts.randomRotation || false;

  // Check input modelTract is of type Feature.
  if (tract.type !== 'Feature') {
    throw new Error(
      'sampleTractsOnAreas: modelTract needs to be of type Feature, not type: ' +
        tract.type +
        '.',
    );
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelTract(tract);
  const sizeOfTract = sizeOfModelTract(tract);

  // Select first a sample of points and use radius as buffer.
  const featureCollection = samplePointsOnAreas(geoJSON, {
    sampleSize: sampleSize,
    method: method,
    buffer: radius,
    rand: opts.rand,
  });

  // Transform the Features by placing a model tract on each point.
  const newFeatures = featureCollection.features.map((feature) => {
    let newFeature: GeoJSON.Feature = {
      type: 'Feature',
      geometry: feature.geometry,
      properties: feature.properties,
    };
    if (feature.geometry.type === 'Point') {
      newFeature = placeModelTract(tract, feature.geometry.coordinates, {
        rotation: rotation,
        randomRotation: randomRotation,
      });
    }
    if (!newFeature?.properties) {
      newFeature.properties = {};
    }
    if (feature.properties) {
      newFeature.properties._designWeight =
        feature.properties._designWeight / sizeOfTract;
    }
    addBboxes(newFeature);
    return newFeature;
  });
  featureCollection.features = newFeatures;

  // Check type point/line/area and transfer designWeights from parents
  // by intersect of all features and split of features.
  const type = typeOfFrame(tract);
  if (type === 'point') {
    // Call intersectPointSampleAreaFrame.
    if (geoJSON.type === 'Feature') {
      return intersectPointSampleAreaFrame(featureCollection, {
        type: 'FeatureCollection',
        features: [geoJSON],
      });
    }
    if (geoJSON.type === 'FeatureCollection') {
      return intersectPointSampleAreaFrame(featureCollection, geoJSON);
    }
  }
  if (type === 'line') {
    // Call intersectLineSampleAreaFrame.
    if (geoJSON.type === 'Feature') {
      return intersectLineSampleAreaFrame(featureCollection, {
        type: 'FeatureCollection',
        features: [geoJSON],
      });
    }
    if (geoJSON.type === 'FeatureCollection') {
      return intersectLineSampleAreaFrame(featureCollection, geoJSON);
    }
  }
  if (type === 'area') {
    // Call intersectAreaSampleAreaFrame.
    if (geoJSON.type === 'Feature') {
      return intersectAreaSampleAreaFrame(featureCollection, {
        type: 'FeatureCollection',
        features: [geoJSON],
      });
    }
    if (geoJSON.type === 'FeatureCollection') {
      return intersectAreaSampleAreaFrame(featureCollection, geoJSON);
    }
  }
};
