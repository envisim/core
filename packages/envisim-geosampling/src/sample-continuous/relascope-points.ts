import {
  type AreaObject,
  FeatureCollection,
  Geodesic,
  type Point,
  PropertyRecord,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

import {SamplingError} from '../sampling-error.js';
import type {ErrorType} from '../utils/error-type.js';
import {SAMPLE_POINT_OPTIONS, type SamplePointOptions, samplePointOptionsCheck} from './options.js';
import {samplePointsOnAreas} from './points-on-areas.js';

export interface SampleRelascopePointsOptions extends SamplePointOptions {
  /**
   * The point layer to collect objects from.
   */
  baseCollection: FeatureCollection<Point>;
  /**
   * The sizeProperty is the id of the proberty in the baseLayer that should
   * be used as the size property and should be in meters (e.g. diameter in meters).
   */
  sizeProperty: string;
  /**
   * The relascope factor to be used.
   */
  factor: number;
}

export function sampleRelascopePointsOptionsCheck(
  {baseCollection, sizeProperty, factor, ...options}: SampleRelascopePointsOptions,
  recursiveCheck: boolean = false,
): ErrorType<typeof SamplingError> {
  if (recursiveCheck === true) {
    const pointCheck = samplePointOptionsCheck(options);
    if (pointCheck !== null) {
      return pointCheck;
    }
  }

  if (factor <= 0.0) {
    return SamplingError.FACTOR_NOT_POSITIVE;
  }

  const prop = baseCollection.propertyRecord.getId(sizeProperty);
  if (prop === null) {
    return SamplingError.SIZE_PROPERTY_MISSING;
  } else if (!PropertyRecord.propertyIsNumerical(prop)) {
    return SamplingError.SIZE_PROPERTY_NOT_NUMERICAL;
  }

  return null;
}

// TODO: Decide if we should implement correction by adding the correct buffer.
// Probably deviates from common use to add buffer, but estimates will be biased
// if we do not add the correction.

/**
 * Selects a point sample on an area frame and collect point objects from a base
 * layer using a relascope to determine inclusion. A buffer is needed for unbiased
 * estimation. The buffer should be set to the largest radius of the inclusion zones.
 * The largest radius depends on maximum value of sizeProperty and the factor of
 * the relascope, according to max(radius) = (50 * max(sizePropertyValue)) / sqrt(factor).
 * Default buffer is zero, which gives a negative bias for estimates of positive
 * quantities.
 *
 * @param collection
 * @param opts
 */
export function sampleRelascopePoints(
  collection: FeatureCollection<AreaObject>,
  {
    buffer = SAMPLE_POINT_OPTIONS.buffer,
    baseCollection,
    factor,
    sizeProperty,
    ...opts
  }: SampleRelascopePointsOptions,
): FeatureCollection<Point> {
  const optionsError = sampleRelascopePointsOptionsCheck(
    {
      buffer,
      baseCollection,
      factor,
      sizeProperty,
      ...opts,
    },
    false,
  );
  if (optionsError !== null) {
    throw new RangeError(`samplePointsOnAreas error: ${optionsError}`);
  }

  // Square root of relascope factor
  const sqrtRf = Math.sqrt(factor);
  // Select sample of points (optional buffer via opts)
  const pointSample = samplePointsOnAreas(collection, {buffer, ...opts});

  // To store sampled features
  // Fix property record (same as base layer, but add design variables)
  const newCollection = FeatureCollection.newPoint<Point>([], baseCollection.propertyRecord, false);
  newCollection.propertyRecord.addDesignWeight();
  newCollection.propertyRecord.addParent();

  // const sampledFeatures: PointFeature[] = [];

  // Find selected points in base layer and check if selected base point is in frame and transfer dw
  baseCollection.forEach((pointFeature) => {
    // if (Point.isObject(pointFeature.geometry)) {
    const basePointCoords = pointFeature.geometry.coordinates;
    const sizePropertyValue = (pointFeature?.properties?.[sizeProperty] ?? 0.0) as number;

    // Radius of inclusion zone
    const radius = (50 * sizePropertyValue) / sqrtRf;
    const baseDw = 1.0 / (Math.PI * radius * radius);

    pointSample.forEach((samplePoint, samplePointIndex) => {
      const dist = Geodesic.distance(basePointCoords, samplePoint.geometry.coordinates);
      if (dist < radius) {
        // Check if base point exists in this frame (frame could be part/stratum)
        for (let i = 0; i < collection.features.length; i++) {
          const frameFeature = collection.features[i];
          const intersect = intersectPointAreaGeometries(
            pointFeature.geometry,
            frameFeature.geometry,
          );
          if (intersect === null) continue;

          // Follow the design weight
          // If buffer = 0, then sample point has already collected design weight from frame. If
          // buffer > 0, then we need to collect the weight here.
          const dw =
            baseDw *
            samplePoint.getSpecialPropertyDesignWeight() *
            (buffer > 0.0 ? frameFeature.getSpecialPropertyDesignWeight() : 1.0);

          newCollection.addGeometry(
            pointFeature.geometry,
            {
              ...(pointFeature.properties ?? {}),
              _designWeight: dw,
              _parent: samplePointIndex,
            },
            false,
          );

          break;
        }
      }
    });
    // } else {
    //   throw new Error('Only Features with geometry of type Point is allowed in parameter base.');
    // }
  });

  return newCollection;
}
