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
  placeModelTract,
  radiusOfModelTract,
  sizeOfModelTract,
} from './modelTract.js';
import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {typeOfTract} from './typeOfTract.js';

export type TsampleTractsOnAreasOpts = {
  rotation?: number;
  randomRotation?: boolean;
  ratio?: number;
  rand?: Random;
};

type Method = 'uniform' | 'systematic';

/**
 * Select a sample of tracts on areas.
 *
 * @param collection - An AreaCollection
 * @param method - The method to use "uniform" or "systematic".
 * @param sampleSize - Expected sample size integer > 0.
 * @param modelTract - A GeoJSON model tract.
 * @param opts - An options object.
 * @param opts.rotation - The rotation angle in degrees.
 * @param opts.randomRotation - Boolean true/false for random rotation of individual tract (always true for line tract).
 * @param opts.ratio - An optional ratio for systematic sampling.
 * @param opts.rand - An optional instance of Random.
 * @returns - Resulting Point/Line/AreaCollection.
 */

// create overload signatures for different return types
// PointCollection, LineCollection, AreaCollection
function sampleTractsOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelTract: GeoJSON.PointFeature,
  opts?: TsampleTractsOnAreasOpts,
): PointCollection;
function sampleTractsOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelTract: GeoJSON.LineFeature,
  opts?: TsampleTractsOnAreasOpts,
): LineCollection;
function sampleTractsOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelTract: GeoJSON.AreaFeature,
  opts?: TsampleTractsOnAreasOpts,
): AreaCollection;
function sampleTractsOnAreas(
  collection: AreaCollection,
  method: Method,
  sampleSize: number,
  modelTract: GeoJSON.PointFeature | GeoJSON.LineFeature | GeoJSON.AreaFeature,
  opts: TsampleTractsOnAreasOpts = {},
) {
  if (!AreaCollection.isCollection(collection)) {
    throw new Error('Input collection must be an AreaCollection.');
  }
  const tractType = typeOfTract(modelTract);

  // Set default options.
  const rotation = opts.rotation ?? 0;
  let randomRotation = opts.randomRotation ?? false;
  const rand = opts.rand ?? new Random();

  // Force randomRotation for type line!
  if (tractType === 'line') {
    randomRotation = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelTract(modelTract);
  const sizeOfTract = sizeOfModelTract(modelTract);

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

  // Transform the Features by placing a model tract on each point.

  // TODO: check if new single geometries cross antimeridian
  // and see if they then can be split.
  // Maybe create dual geometries, one with all negative longitude (outside range -180)
  // and one with all positive longitude (outside range +180) and they will be cut in the below
  // intersect functions automatically.

  switch (tractType) {
    case 'point':
      const pointFeatures: GeoJSON.PointFeature[] = [];
      featureCollection.features.forEach((feature) => {
        const dw = feature.properties?._designWeight || 1;

        let newFeature: GeoJSON.PointFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelTract(
            modelTract as GeoJSON.PointFeature,
            feature.geometry.coordinates,
            {
              rotation: rotation,
              randomRotation: randomRotation,
              rand: rand,
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

    case 'line':
      const lineFeatures: GeoJSON.LineFeature[] = [];
      featureCollection.features.forEach((feature) => {
        const dw = feature.properties?._designWeight || 1;

        let newFeature: GeoJSON.LineFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelTract(
            modelTract as GeoJSON.LineFeature,
            feature.geometry.coordinates,
            {
              rotation: rotation,
              randomRotation: randomRotation,
              rand: rand,
            },
          );
          if (newFeature.properties) {
            newFeature.properties._designWeight = dw / sizeOfTract;
            if (randomRotation) {
              newFeature.properties._randomRotation = true;
            }
          }
          // TODO?: fix dual geometries for antimeridian here
          lineFeatures.push(newFeature);
        }
      });
      return intersectLineSampleAreaFrame(
        LineCollection.create(lineFeatures),
        collection,
      );

    case 'area':
      const areaFeatures: GeoJSON.AreaFeature[] = [];
      featureCollection.features.forEach((feature) => {
        const dw = feature.properties?._designWeight || 1;

        let newFeature: GeoJSON.AreaFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelTract(
            modelTract as GeoJSON.AreaFeature,
            feature.geometry.coordinates,
            {
              rotation: rotation,
              randomRotation: randomRotation,
              rand: rand,
            },
          );
          if (newFeature.properties) {
            newFeature.properties._designWeight = dw / sizeOfTract;
            if (randomRotation) {
              newFeature.properties._randomRotation = true;
            }
          }
          // TODO?: fix dual geometries for antimeridian here
          areaFeatures.push(newFeature);
        }
      });
      return intersectAreaSampleAreaFrame(
        AreaCollection.create(areaFeatures),
        collection,
      );
    default:
      throw new Error('Tract type is unknown.');
  }
}

export {sampleTractsOnAreas};
