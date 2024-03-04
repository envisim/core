import {
  GeoJSON,
  PointCollection,
  LineCollection,
  AreaCollection,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {intersectAreaSampleAreaFrame} from './intersectAreaSampleAreaFrame.js';
import {intersectLineSampleAreaFrame} from './intersectLineSampleAreaFrame.js';
import {intersectPointSampleAreaFrame} from './intersectPointSampleAreaFrame.js';
import {
  placeModelFeature,
  radiusOfModelFeature,
  sizeOfModelFeature,
} from './modelFeature.js';
import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {typeOfFeature} from './typeOfFeature.js';

export type TsampleTractsOnAreasOpts = {
  rotation?: number;
  randomRotation?: boolean;
  ratio?: number;
  rand?: Random;
};

type Method = 'uniform' | 'systematic';

/**
 * Select a sample of features/tracts on areas.
 *
 * @param collection
 * @param method the method to use "uniform" or "systematic".
 * @param sampleSize expected sample size integer > 0.
 * @param modelFeature a GeoJSON model tract.
 * @param opts an options object.
 * @param opts.rotation the rotation angle in degrees.
 * @param opts.randomRotation boolean true/false for random rotation of individual tract (always true for line tract).
 * @param opts.ratio an optional ratio for systematic sampling.
 * @param opts.rand an optional instance of Random.
 * @returns resulting Point/Line/AreaCollection.
 */

// create overload signatures for different return types
// PointCollection, LineCollection, AreaCollection
function sampleFeaturesOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelFeature: GeoJSON.PointFeature,
  opts?: TsampleTractsOnAreasOpts,
): PointCollection;
function sampleFeaturesOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelFeature: GeoJSON.LineFeature,
  opts?: TsampleTractsOnAreasOpts,
): LineCollection;
function sampleFeaturesOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelFeature: GeoJSON.AreaFeature,
  opts?: TsampleTractsOnAreasOpts,
): AreaCollection;
function sampleFeaturesOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelFeature:
    | GeoJSON.PointFeature
    | GeoJSON.LineFeature
    | GeoJSON.AreaFeature,
  opts: TsampleTractsOnAreasOpts = {},
): PointCollection | LineCollection | AreaCollection {
  if (!AreaCollection.isCollection(collection)) {
    throw new Error('Input collection must be an AreaCollection.');
  }
  const tractType = typeOfFeature(modelFeature);

  // Set default options.
  const rotation = opts.rotation ?? 0;
  let randomRotation = opts.randomRotation ?? false;
  const rand = opts.rand ?? new Random();

  // Force randomRotation for type line!
  if (tractType === 'line') {
    randomRotation = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelFeature(modelFeature);
  const sizeOfTract = sizeOfModelFeature(modelFeature);

  // Select first a sample of points and use radius as buffer.
  const featureCollection = samplePointsOnAreas(
    collection,
    method,
    sampleSize,
    {
      ratio: opts.ratio ?? 1,
      buffer: radius,
      rand: rand,
    },
  );

  if (radius === 0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return featureCollection;
  }

  // Transform the point features by placing a model feature on each point.
  switch (tractType) {
    case 'point': {
      const pointFeatures: GeoJSON.PointFeature[] = [];
      featureCollection.features.forEach((feature) => {
        const dw = feature.properties?._designWeight || 1;

        let newFeature: GeoJSON.PointFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelFeature(
            modelFeature as GeoJSON.PointFeature,
            feature.geometry.coordinates,
            {
              rotation: rotation,
              randomRotation: randomRotation,
              rand: rand,
              type: tractType,
              radius: radius,
            },
          );
          if (newFeature.properties) {
            newFeature.properties._designWeight = dw / sizeOfTract;
          }
          pointFeatures.push(newFeature);
        }
      });

      return intersectPointSampleAreaFrame(
        PointCollection.create(pointFeatures),
        collection,
      );
    }

    case 'line': {
      const lineFeatures: GeoJSON.LineFeature[] = [];
      featureCollection.features.forEach((feature) => {
        const dw = feature.properties?._designWeight || 1;

        let newFeature: GeoJSON.LineFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelFeature(
            modelFeature as GeoJSON.LineFeature,
            feature.geometry.coordinates,
            {
              rotation: rotation,
              randomRotation: randomRotation,
              rand: rand,
              type: tractType,
              radius: radius,
            },
          );
          if (newFeature.properties) {
            newFeature.properties._designWeight = dw / sizeOfTract;
            if (randomRotation) {
              newFeature.properties._randomRotation = 1;
            }
          }
          lineFeatures.push(newFeature);
        }
      });

      return intersectLineSampleAreaFrame(
        LineCollection.create(lineFeatures),
        collection,
      );
    }

    case 'area': {
      const areaFeatures: GeoJSON.AreaFeature[] = [];
      featureCollection.features.forEach((feature) => {
        const dw = feature.properties?._designWeight || 1;

        let newFeature: GeoJSON.AreaFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelFeature(
            modelFeature as GeoJSON.AreaFeature,
            feature.geometry.coordinates,
            {
              rotation: rotation,
              randomRotation: randomRotation,
              rand: rand,
              type: tractType,
              radius: radius,
            },
          );
          if (newFeature.properties) {
            newFeature.properties._designWeight = dw / sizeOfTract;
            if (randomRotation) {
              newFeature.properties._randomRotation = 1;
            }
          }
          areaFeatures.push(newFeature);
        }
      });

      return intersectAreaSampleAreaFrame(
        AreaCollection.create(areaFeatures),
        collection,
      );
    }

    default:
      throw new Error('Tract type is unknown.');
  }
}

export {sampleFeaturesOnAreas};
