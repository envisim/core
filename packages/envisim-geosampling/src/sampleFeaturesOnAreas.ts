import {
  AreaCollection,
  type GeoJSON as GJ,
  Layer,
  LineCollection,
  PointCollection,
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
  pointsPerCircle?: number;
};

type Method = 'uniform' | 'systematic';

/**
 * Select a sample of features/tracts on areas.
 *
 * @param layer
 * @param method the method to use "uniform" or "systematic".
 * @param sampleSize expected sample size integer > 0.
 * @param modelFeature a GeoJSON model tract.
 * @param opts an options object.
 * @param opts.rotation the rotation angle in degrees.
 * @param opts.randomRotation boolean true/false for random rotation of individual tract (always true for line tract).
 * @param opts.ratio an optional ratio for systematic sampling.
 * @param opts.rand an optional instance of Random.
 * @param opts.pointsPerCircle optional number of points per circle.
 * @returns resulting Point/Line/AreaCollection.
 */

// create overload signatures for different return types
// PointCollection, LineCollection, AreaCollection
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  method: Method,
  sampleSize: number,
  modelFeature: GJ.PointFeature,
  opts?: TsampleTractsOnAreasOpts,
): Layer<PointCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  method: Method,
  sampleSize: number,
  modelFeature: GJ.LineFeature,
  opts?: TsampleTractsOnAreasOpts,
): Layer<LineCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  method: Method,
  sampleSize: number,
  modelFeature: GJ.AreaFeature,
  opts?: TsampleTractsOnAreasOpts,
): Layer<AreaCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  method: Method,
  sampleSize: number,
  modelFeature: GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
  opts: TsampleTractsOnAreasOpts = {},
): Layer<PointCollection | LineCollection | AreaCollection> {
  const tractType = typeOfFeature(modelFeature);

  // Set default options.
  const rotation = opts.rotation ?? 0;
  let randomRotation = opts.randomRotation ?? false;
  const rand = opts.rand ?? new Random();
  const pointsPerCircle = opts.pointsPerCircle ?? 16;

  // Force randomRotation for type line!
  if (tractType === 'line') {
    randomRotation = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelFeature(modelFeature);
  const sizeOfTract = sizeOfModelFeature(modelFeature);

  // Select first a sample of points and use radius as buffer.
  const pointsLayer = samplePointsOnAreas(layer, method, sampleSize, {
    ratio: opts.ratio ?? 1,
    buffer: radius,
    rand: rand,
  });

  if (radius === 0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return pointsLayer;
  }

  // Transform the point features by placing a model feature on each point.
  switch (tractType) {
    case 'point': {
      const pointFeatures: GJ.PointFeature[] = [];
      pointsLayer.collection.features.forEach((feature) => {
        const dw = feature.properties?.['_designWeight'] || 1;

        let newFeature: GJ.PointFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelFeature(
            modelFeature as GJ.PointFeature,
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
            newFeature.properties['_designWeight'] = dw / sizeOfTract;
          }
          pointFeatures.push(newFeature);
        }
      });
      const collection = intersectPointSampleAreaFrame(
        PointCollection.create(pointFeatures, true),
        layer.collection,
      );
      return new Layer(
        collection,
        {
          _designWeight: {
            id: '_designWeight',
            name: '_designWeight',
            type: 'numerical',
          },
        },
        true,
      );
    }

    case 'line': {
      const lineFeatures: GJ.LineFeature[] = [];
      pointsLayer.collection.features.forEach((feature) => {
        const dw = feature.properties?.['_designWeight'] || 1;

        let newFeature: GJ.LineFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelFeature(
            modelFeature as GJ.LineFeature,
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
            newFeature.properties['_designWeight'] = dw / sizeOfTract;
            if (randomRotation) {
              newFeature.properties['_randomRotation'] = 1;
            }
          }
          lineFeatures.push(newFeature);
        }
      });

      const collection = intersectLineSampleAreaFrame(
        LineCollection.create(lineFeatures),
        layer.collection,
        pointsPerCircle,
      );
      return new Layer(
        collection,
        {
          _designWeight: {
            id: '_designWeight',
            name: '_designWeight',
            type: 'numerical',
          },
        },
        true,
      );
    }

    case 'area': {
      const areaFeatures: GJ.AreaFeature[] = [];
      pointsLayer.collection.features.forEach((feature) => {
        const dw = feature.properties?.['_designWeight'] || 1;

        let newFeature: GJ.AreaFeature;

        if (feature.geometry.type === 'Point') {
          newFeature = placeModelFeature(
            modelFeature as GJ.AreaFeature,
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
            newFeature.properties['_designWeight'] = dw / sizeOfTract;
            if (randomRotation) {
              newFeature.properties['_randomRotation'] = 1;
            }
          }
          areaFeatures.push(newFeature);
        }
      });
      const collection = intersectAreaSampleAreaFrame(
        AreaCollection.create(areaFeatures),
        layer.collection,
        pointsPerCircle,
      );
      return new Layer(
        collection,
        {
          _designWeight: {
            id: '_designWeight',
            name: '_designWeight',
            type: 'numerical',
          },
        },
        true,
      );
    }

    default:
      throw new Error('Model feature type is unknown.');
  }
}

export {sampleFeaturesOnAreas};
