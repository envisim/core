import {
  AreaCollection,
  type GeoJSON as GJ,
  GeometricPrimitive,
  Layer,
  LineCollection,
  PointCollection,
  getFeaturePrimitive,
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

export interface SampleFeaturesOnAreasOptions<
  T extends GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature,
> {
  method: 'independent' | 'systematic';
  sampleSize: number;
  modelFeature: T;
  rotation?: number;
  randomRotation?: boolean;
  ratio?: number;
  rand?: Random;
  pointsPerCircle?: number;
}

/**
 * Select a sample of features/tracts on areas.
 *
 * @param opts an options object.
 */

// create overload signatures for different return types
// PointCollection, LineCollection, AreaCollection
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeaturesOnAreasOptions<GJ.PointFeature>,
): Layer<PointCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeaturesOnAreasOptions<GJ.LineFeature>,
): Layer<LineCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeaturesOnAreasOptions<GJ.AreaFeature>,
): Layer<AreaCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeaturesOnAreasOptions<
    GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature
  >,
): Layer<PointCollection | LineCollection | AreaCollection> {
  const {method, sampleSize, modelFeature} = opts;
  Layer.assert(layer, GeometricPrimitive.AREA);

  const tractType = getFeaturePrimitive(modelFeature);

  // Set default options.
  const rotation = opts.rotation ?? 0;
  let randomRotation = opts.randomRotation ?? false;
  const rand = opts.rand ?? new Random();
  const pointsPerCircle = opts.pointsPerCircle ?? 16;

  // Force randomRotation for type line!
  if (tractType === GeometricPrimitive.LINE) {
    randomRotation = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelFeature(modelFeature);
  const sizeOfTract = sizeOfModelFeature(modelFeature);

  // Select first a sample of points and use radius as buffer.
  const pointsLayer = samplePointsOnAreas(layer, {
    method,
    sampleSize,
    buffer: radius,
    rand,
    ratio: opts.ratio,
  });

  if (radius === 0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return pointsLayer;
  }

  // Transform the point features by placing a model feature on each point.
  switch (tractType) {
    case GeometricPrimitive.POINT: {
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

    case GeometricPrimitive.LINE: {
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

    case GeometricPrimitive.AREA: {
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
