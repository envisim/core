import {
  AreaCollection,
  type GeoJSON as GJ,
  GeometricPrimitive,
  Layer,
  LineCollection,
  PointCollection,
  createDesignWeightProperty,
  getFeaturePrimitive,
} from '@envisim/geojson-utils';

import {
  placeModelFeature,
  radiusOfModelFeature,
  sizeOfModelFeature,
} from '../model-feature.js';
import {
  intersectAreaSampleAreaFrame,
  intersectLineSampleAreaFrame,
  intersectPointSampleAreaFrame,
} from '../utils/index.js';
import {
  SAMPLE_FEATURE_OPTIONS,
  type SampleFeatureOptions,
  sampleFeatureOptionsCheck,
} from './options.js';
import {samplePointsOnAreas} from './points-on-areas.js';

/**
 * Select a sample of features/tracts on areas.
 *
 * @param layer
 * @param opts
 */
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeatureOptions<GJ.PointFeature>,
): Layer<PointCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeatureOptions<GJ.LineFeature>,
): Layer<LineCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  opts: SampleFeatureOptions<GJ.AreaFeature>,
): Layer<AreaCollection>;
function sampleFeaturesOnAreas(
  layer: Layer<AreaCollection>,
  {
    rand = SAMPLE_FEATURE_OPTIONS.rand,
    pointsPerCircle = SAMPLE_FEATURE_OPTIONS.pointsPerCircle,
    pointSelection,
    sampleSize,
    modelFeature,
    rotation = SAMPLE_FEATURE_OPTIONS.rotation,
    randomRotation = SAMPLE_FEATURE_OPTIONS.randomRotation,
    ratio = SAMPLE_FEATURE_OPTIONS.ratio,
  }: SampleFeatureOptions<GJ.PointFeature | GJ.LineFeature | GJ.AreaFeature>,
): Layer<PointCollection | LineCollection | AreaCollection> {
  const optionsError = sampleFeatureOptionsCheck({
    rand,
    pointsPerCircle,
    pointSelection,
    sampleSize,
    modelFeature,
    rotation,
    randomRotation,
    ratio,
  });
  if (optionsError !== null) {
    throw new RangeError(`sampleFeaturesOnAreas error: ${optionsError}`);
  }

  const tractType = getFeaturePrimitive(modelFeature);

  // Force randomRotation for type line!
  if (tractType === GeometricPrimitive.LINE) {
    randomRotation = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelFeature(modelFeature);
  const sizeOfTract = sizeOfModelFeature(modelFeature);

  // Select first a sample of points and use radius as buffer.
  const pointsLayer = samplePointsOnAreas(layer, {
    pointSelection,
    sampleSize,
    buffer: radius,
    rand,
    ratio,
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
        {_designWeight: createDesignWeightProperty()},
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
        {_designWeight: createDesignWeightProperty()},
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
        {_designWeight: createDesignWeightProperty()},
        true,
      );
    }

    default:
      throw new Error('Model feature type is unknown.');
  }
}
export {sampleFeaturesOnAreas};
