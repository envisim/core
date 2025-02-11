import {
  type AreaObject,
  FeatureCollection,
  type GeoJSON as GJ,
  type LineObject,
  type PointObject,
} from '@envisim/geojson-utils';

import {
  placeLineGeometry,
  placePointGeometry,
  radiusOfModelGeometry,
  sizeOfModelGeometry,
} from '../model-geometry.js';
import {placeAreaGeometry} from '../model-geometry.js';
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

export function sampleAreaFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  {...options}: SampleFeatureOptions<GJ.AreaObject>,
): FeatureCollection<AreaObject> {
  const opts: Required<SampleFeatureOptions<GJ.AreaObject>> = {
    ...SAMPLE_FEATURE_OPTIONS,
    ...options,
  };

  const optionsError = sampleFeatureOptionsCheck(opts);
  if (optionsError !== null) {
    throw new RangeError(`sampleFeaturesOnAreas error: ${optionsError}`);
  }

  // Compute radius and size of the model tract.
  opts.buffer = radiusOfModelGeometry(opts.modelGeometry);
  const sizeOfTract = sizeOfModelGeometry(opts.modelGeometry);

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, opts);

  const newCollection = FeatureCollection.newArea([]);

  pointCollection.forEach((feature) => {
    const dw = feature.getSpecialPropertyDesignWeight();
    newCollection.addGeometry(placeAreaGeometry(feature.geometry.coordinates, opts), {
      _designWeight: dw / sizeOfTract,
      _randomRotation: opts.randomRotationOfGeometry ? 1 : 0,
    });
  });

  return intersectAreaSampleAreaFrame(newCollection, collection, opts);
}

export function sampleLineFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  {...options}: SampleFeatureOptions<GJ.LineObject>,
): FeatureCollection<LineObject> {
  const opts: Required<SampleFeatureOptions<GJ.LineObject>> = {
    ...SAMPLE_FEATURE_OPTIONS,
    ...options,
  };

  const optionsError = sampleFeatureOptionsCheck(opts);
  if (optionsError !== null) {
    throw new RangeError(`sampleFeaturesOnAreas error: ${optionsError}`);
  }

  // Compute radius and size of the model tract.
  opts.buffer = radiusOfModelGeometry(opts.modelGeometry);
  const sizeOfTract = sizeOfModelGeometry(opts.modelGeometry);

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, opts);

  const newCollection = FeatureCollection.newLine([]);

  pointCollection.forEach((feature) => {
    const dw = feature.getSpecialPropertyDesignWeight();
    newCollection.addGeometry(placeLineGeometry(feature.geometry.coordinates, opts), {
      _designWeight: dw / sizeOfTract,
      _randomRotation: opts.randomRotationOfGeometry ? 1 : 0,
    });
  });

  return intersectLineSampleAreaFrame(newCollection, collection, opts);
}

export function samplePointFeaturesOnAreas(
  collection: FeatureCollection<AreaObject>,
  {...options}: SampleFeatureOptions<GJ.PointObject>,
): FeatureCollection<PointObject> {
  const opts: Required<SampleFeatureOptions<GJ.PointObject>> = {
    ...SAMPLE_FEATURE_OPTIONS,
    ...options,
  };

  const optionsError = sampleFeatureOptionsCheck(opts);
  if (optionsError !== null) {
    throw new RangeError(`sampleFeaturesOnAreas error: ${optionsError}`);
  }

  // Compute radius and size of the model tract.
  opts.buffer = radiusOfModelGeometry(opts.modelGeometry);
  const sizeOfTract = sizeOfModelGeometry(opts.modelGeometry);

  // Select first a sample of points and use radius as buffer.
  const pointCollection = samplePointsOnAreas(collection, opts);

  if (opts.buffer === 0.0) {
    // Single point tract with 0 radius, _designWeight already transfered.
    return pointCollection;
  }

  const newCollection = FeatureCollection.newPoint([]);

  pointCollection.forEach((feature) => {
    const dw = feature.getSpecialPropertyDesignWeight();
    newCollection.addGeometry(placePointGeometry(feature.geometry.coordinates, opts), {
      _designWeight: dw / sizeOfTract,
      _randomRotation: opts.randomRotationOfGeometry ? 1 : 0,
    });
  });

  return intersectPointSampleAreaFrame(newCollection, collection);
}
