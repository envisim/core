import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type GeoJSON as GJ,
  type LineObject,
  type PointObject,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {
  type OptionsPointsOnAreas,
  SAMPLE_ERROR_LIST,
  type SampleError,
  optionsPointsOnAreasCheck,
  throwRangeError,
} from './options.js';
import {samplePointsOnAreas} from './points-on-areas.js';
import {
  placeAreaGeometry,
  placeLineGeometry,
  placePointGeometry,
  radiusOfModelGeometry,
  sizeOfModelGeometry,
} from '~/model-geometry.js';
import {
  intersectAreaSampleAreaFrame,
  intersectLineSampleAreaFrame,
  intersectPointSampleAreaFrame,
} from '~/utils/index.js';

export interface SampleFeaturesOnAreasOptions<G extends GJ.SingleTypeObject>
  extends OptionsPointsOnAreas {
  /**
   * A model feature of points or lines or areas to be placed on the selected points.
   */
  modelGeometry: G;
  /**
   * Optional rotation angle in degrees to rotate the model geometry.
   * Random rotation is forced for line geometries -- option is ignored.
   * @defaultValue `0.0`
   */
  rotationOfGeometry?: number | 'random';
}

export function sampleAreaFeaturesOnAreasCheck(
  options: SampleFeaturesOnAreasOptions<GJ.AreaObject>,
): SampleError {
  switch (options.modelGeometry.type) {
    case 'Polygon':
    case 'MultiPolygon':
      break;
    case 'Point':
    case 'MultiPoint':
      if (options.modelGeometry.radius <= 0.0) return SAMPLE_ERROR_LIST.MODEL_FEATURE_NOT_AREA;
      break;
    default:
      return SAMPLE_ERROR_LIST.MODEL_FEATURE_NOT_AREA;
  }

  if (typeof options.rotationOfGeometry === 'string' && options.rotationOfGeometry !== 'random') {
    return SAMPLE_ERROR_LIST.ROTATION_OF_MODEL_FEATURE_ERROR;
  }

  return optionsPointsOnAreasCheck(options);
}

/**
 * Select a sample of features/tracts on areas.
 *
 * @param collection
 * @param opts
 */
export function sampleAreaFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  options: SampleFeaturesOnAreasOptions<GJ.AreaObject>,
): FeatureCollection<AreaObject, never> {
  throwRangeError(sampleAreaFeaturesOnAreasCheck(options));

  const opts = {
    ...options,
    rand: options.rand ?? new Random(),
    rotationOfGeometry: options.rotationOfGeometry ?? 0.0,
    buffer: radiusOfModelGeometry(options.modelGeometry),
  };

  // Compute radius and size of the model tract.
  const sizeOfTract = sizeOfModelGeometry(options.modelGeometry);
  const _randomRotation = options.rotationOfGeometry === 'random' ? 1 : 0;

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, opts);

  const newCollection = FeatureCollection.newArea<AreaObject, never>(
    pointCollection.features.map((f) => {
      const dw = f.getSpecialPropertyDesignWeight();
      return new Feature<AreaObject, never>(placeAreaGeometry(f.geometry.coordinates, opts), {
        _designWeight: dw / sizeOfTract,
        _randomRotation,
      });
    }),
  );

  return intersectAreaSampleAreaFrame(newCollection, collection, opts);
}

export function sampleLineFeaturesOnAreasCheck(
  options: SampleFeaturesOnAreasOptions<GJ.LineObject>,
): SampleError {
  switch (options.modelGeometry.type) {
    case 'LineString':
    case 'MultiLineString':
      break;
    default:
      return SAMPLE_ERROR_LIST.MODEL_FEATURE_NOT_LINE;
  }

  if (typeof options.rotationOfGeometry === 'string' && options.rotationOfGeometry !== 'random') {
    return SAMPLE_ERROR_LIST.ROTATION_OF_MODEL_FEATURE_ERROR;
  }

  return optionsPointsOnAreasCheck(options);
}

export function sampleLineFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  options: SampleFeaturesOnAreasOptions<GJ.LineObject>,
): FeatureCollection<LineObject, never> {
  throwRangeError(sampleLineFeaturesOnAreasCheck(options));

  const opts = {
    ...options,
    rand: options.rand ?? new Random(),
    rotationOfGeometry: 'random' as const,
    buffer: radiusOfModelGeometry(options.modelGeometry),
  };

  // Compute radius and size of the model tract.
  const sizeOfTract = sizeOfModelGeometry(opts.modelGeometry);

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, opts);

  const newCollection = FeatureCollection.newLine<LineObject, never>(
    pointCollection.features.map((f) => {
      const dw = f.getSpecialPropertyDesignWeight();
      return new Feature<LineObject, never>(placeLineGeometry(f.geometry.coordinates, opts), {
        _designWeight: dw / sizeOfTract,
        _randomRotation: 1,
      });
    }),
  );

  return intersectLineSampleAreaFrame(newCollection, collection, opts);
}

export function samplePointFeaturesOnAreasCheck(
  options: SampleFeaturesOnAreasOptions<GJ.PointObject>,
): SampleError {
  switch (options.modelGeometry.type) {
    case 'Point':
    case 'MultiPoint':
      break;
    default:
      return SAMPLE_ERROR_LIST.MODEL_FEATURE_NOT_POINT;
  }

  if (typeof options.rotationOfGeometry === 'string' && options.rotationOfGeometry !== 'random') {
    return SAMPLE_ERROR_LIST.ROTATION_OF_MODEL_FEATURE_ERROR;
  }

  return optionsPointsOnAreasCheck(options);
}

export function samplePointFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  options: SampleFeaturesOnAreasOptions<GJ.PointObject>,
): FeatureCollection<PointObject, never> {
  throwRangeError(samplePointFeaturesOnAreasCheck(options));

  const opts = {
    ...options,
    rand: options.rand ?? new Random(),
    rotationOfGeometry: options.rotationOfGeometry ?? 0.0,
    buffer: radiusOfModelGeometry(options.modelGeometry),
  };

  // Compute radius and size of the model tract.
  const sizeOfTract = sizeOfModelGeometry(opts.modelGeometry);
  const _randomRotation = options.rotationOfGeometry === 'random' ? 1 : 0;

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, opts);

  if (opts.buffer === 0.0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return pointCollection;
  }

  const newCollection = FeatureCollection.newPoint<PointObject, never>(
    pointCollection.features.map((f) => {
      const dw = f.getSpecialPropertyDesignWeight();
      return new Feature<PointObject, never>(placePointGeometry(f.geometry.coordinates, opts), {
        _designWeight: dw / sizeOfTract,
        _randomRotation,
      });
    }),
  );

  return intersectPointSampleAreaFrame(newCollection, collection);
}
