import {
  type AreaObject,
  FeatureCollection,
  type GeoJSON as GJ,
  GeometricPrimitive,
  type LineObject,
  type PointObject,
  getGeometryPrimitive,
} from '@envisim/geojson-utils';

import {placeModelGeometry, radiusOfModelGeometry, sizeOfModelGeometry} from '../model-geometry.js';
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
 * @param collection
 * @param opts
 */
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  opts: SampleFeatureOptions<GJ.PointObject>,
): FeatureCollection<PointObject>;
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  opts: SampleFeatureOptions<GJ.LineObject>,
): FeatureCollection<LineObject>;
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  opts: SampleFeatureOptions<GJ.AreaObject>,
): FeatureCollection<AreaObject>;
function sampleFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  {
    rand = SAMPLE_FEATURE_OPTIONS.rand,
    pointsPerCircle = SAMPLE_FEATURE_OPTIONS.pointsPerCircle,
    pointSelection,
    sampleSize,
    modelGeometry,
    rotationOfGeometry = SAMPLE_FEATURE_OPTIONS.rotationOfGeometry,
    randomRotationOfGeometry = SAMPLE_FEATURE_OPTIONS.randomRotationOfGeometry,
    ratio = SAMPLE_FEATURE_OPTIONS.ratio,
    rotationOfGrid = SAMPLE_FEATURE_OPTIONS.rotationOfGrid,
    randomRotationOfGrid = SAMPLE_FEATURE_OPTIONS.randomRotationOfGrid,
  }: SampleFeatureOptions<GJ.AreaObject | GJ.LineObject | GJ.PointObject>,
): FeatureCollection<AreaObject> | FeatureCollection<LineObject> | FeatureCollection<PointObject> {
  const optionsError = sampleFeatureOptionsCheck({
    rand,
    pointsPerCircle,
    pointSelection,
    sampleSize,
    modelGeometry,
    rotationOfGeometry,
    randomRotationOfGeometry,
    ratio,
    rotationOfGrid,
    randomRotationOfGrid,
  });
  if (optionsError !== null) {
    throw new RangeError(`sampleFeaturesOnAreas error: ${optionsError}`);
  }

  const tractType = getGeometryPrimitive(modelGeometry);

  // Force randomRotation for type line!
  if (tractType === GeometricPrimitive.LINE) {
    randomRotationOfGeometry = true;
  }

  // Compute radius and size of the model tract.
  const radius = radiusOfModelGeometry(modelGeometry);
  const sizeOfTract = sizeOfModelGeometry(modelGeometry);

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, {
    pointSelection,
    sampleSize,
    buffer: radius,
    rand,
    ratio,
    rotationOfGrid,
    randomRotationOfGrid,
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
        const dw = feature.getSpecialPropertyDesignWeight();
        let newGeometry: GJ.PointObject;

        if (feature.geometry.type === 'Point') {
          newGeometry = placeModelGeometry(
            modelGeometry as GJ.PointObject,
            feature.geometry.coordinates,
            {
              rotation: rotationOfGeometry,
              randomRotation: randomRotationOfGeometry,
              rand: rand,
              type: tractType,
              radius: radius,
            },
          );
          pointFeatures.push({
            type: 'Feature',
            geometry: newGeometry,
            properties: {
              _designWeight: dw / sizeOfTract,
            },
          });
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
        const dw = feature.getSpecialPropertyDesignWeight();
        let newGeometry: GJ.LineObject;

        if (feature.geometry.type === 'Point') {
          newGeometry = placeModelGeometry(
            modelGeometry as GJ.LineObject,
            feature.geometry.coordinates,
            {
              rotation: rotationOfGeometry,
              randomRotation: randomRotationOfGeometry,
              rand: rand,
              type: tractType,
              radius: radius,
            },
          );
          lineFeatures.push({
            type: 'Feature',
            geometry: newGeometry,
            properties: {
              _designWeight: dw / sizeOfTract,
              _randomRotation: randomRotationOfGeometry ? 1 : 0,
            },
          });
        }
      });

      return intersectLineSampleAreaFrame(FeatureCollection.createLine(lineFeatures), collection, {
        pointsPerCircle,
      });
    }

    case GeometricPrimitive.AREA: {
      const areaFeatures: GJ.AreaFeature[] = [];
      pointCollection.forEach((feature) => {
        const dw = feature.getSpecialPropertyDesignWeight();
        let newGeometry: GJ.AreaObject;

        if (feature.geometry.type === 'Point') {
          newGeometry = placeModelGeometry(
            modelGeometry as GJ.AreaObject,
            feature.geometry.coordinates,
            {
              rotation: rotationOfGeometry,
              randomRotation: randomRotationOfGeometry,
              rand: rand,
              type: tractType,
              radius: radius,
            },
          );
          areaFeatures.push({
            type: 'Feature',
            geometry: newGeometry,
            properties: {
              _designWeight: dw / sizeOfTract,
              _randomRotation: randomRotationOfGeometry ? 1 : 0,
            },
          });
        }
      });
      return intersectAreaSampleAreaFrame(FeatureCollection.createArea(areaFeatures), collection, {
        pointsPerCircle,
      });
    }

    default:
      throw new Error('Model geometry type is unknown.');
  }
}
export {sampleFeaturesOnAreas};
