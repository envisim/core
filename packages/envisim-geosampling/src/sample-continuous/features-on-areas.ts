import {
  type AreaObject,
  FeatureCollection,
  type GeoJSON as GJ,
  GeometricPrimitive,
  type LineObject,
  type PointObject,
  getFeaturePrimitive,
} from '@envisim/geojson-utils';

import {placeModelFeature, radiusOfModelFeature, sizeOfModelFeature} from '../model-feature.js';
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
  collection: FeatureCollection<AreaObject>,
  opts: SampleFeatureOptions<GJ.PointFeature>,
): FeatureCollection<PointObject>;
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  opts: SampleFeatureOptions<GJ.LineFeature>,
): FeatureCollection<LineObject>;
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  opts: SampleFeatureOptions<GJ.AreaFeature>,
): FeatureCollection<AreaObject>;
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  {
    rand = SAMPLE_FEATURE_OPTIONS.rand,
    pointsPerCircle = SAMPLE_FEATURE_OPTIONS.pointsPerCircle,
    pointSelection,
    sampleSize,
    modelFeature,
    rotation = SAMPLE_FEATURE_OPTIONS.rotation,
    randomRotation = SAMPLE_FEATURE_OPTIONS.randomRotation,
    ratio = SAMPLE_FEATURE_OPTIONS.ratio,
  }: SampleFeatureOptions<GJ.AreaFeature | GJ.LineFeature | GJ.PointFeature>,
): FeatureCollection<AreaObject> | FeatureCollection<LineObject> | FeatureCollection<PointObject> {
  const optionsError = sampleFeatureOptionsCheck(collection, {
    rand,
    pointsPerCircle,
    pointSelection,
    sampleSize,
    modelFeature,
    rotation,
    randomRotation,
    ratio,
  });
  if (optionsError !== 0) {
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
  const pointCollection = samplePointsOnAreas(collection, {
    pointSelection,
    sampleSize,
    buffer: radius,
    rand,
    ratio,
  });

  if (radius === 0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return pointCollection;
  }

  // Transform the point features by placing a model feature on each point.
  switch (tractType) {
    case GeometricPrimitive.POINT: {
      const pointFeatures: GJ.PointFeature[] = [];
      pointCollection.forEach((feature) => {
        const dw = (feature.properties?.['_designWeight'] ?? 1.0) as number;

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

      return intersectPointSampleAreaFrame(
        FeatureCollection.createPoint(pointFeatures, false, true),
        collection,
      );
    }

    case GeometricPrimitive.LINE: {
      const lineFeatures: GJ.LineFeature[] = [];
      pointCollection.forEach((feature) => {
        const dw = (feature.properties?.['_designWeight'] ?? 1.0) as number;

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

      return intersectLineSampleAreaFrame(FeatureCollection.createLine(lineFeatures), collection, {
        pointsPerCircle,
      });
    }

    case GeometricPrimitive.AREA: {
      const areaFeatures: GJ.AreaFeature[] = [];
      pointCollection.forEach((feature) => {
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
            newFeature.properties['_designWeight'] =
              feature.getSpecialPropertyDesignWeight() / sizeOfTract;

            if (randomRotation) {
              newFeature.properties['_randomRotation'] = 1;
            }
          }
          areaFeatures.push(newFeature);
        }
      });
      return intersectAreaSampleAreaFrame(FeatureCollection.createArea(areaFeatures), collection, {
        pointsPerCircle,
      });
    }

    default:
      throw new Error('Model feature type is unknown.');
  }
}
export {sampleFeaturesOnAreas};
