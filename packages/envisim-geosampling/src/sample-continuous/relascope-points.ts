import {
  type AreaObject,
  FeatureCollection,
  type Point,
  intersectPointAreaGeometries,
} from "@envisim/geojson";
import { Geodesic } from "@envisim/geojson-utils";
import {
  type OptionsPointsOnAreas,
  SAMPLE_ERROR_LIST,
  type SampleError,
  optionsPointsOnAreasCheck,
  throwRangeError,
} from "./options.js";
import { samplePointsOnAreas } from "./points-on-areas.js";

export interface SampleRelascopePointsOptions<P extends string> extends OptionsPointsOnAreas {
  /**
   * The point layer to collect objects from.
   */
  baseCollection: FeatureCollection<Point, P>;
  /**
   * The sizeProperty is the id of the proberty in the baseLayer that should
   * be used as the size property and should be in meters (e.g. diameter in meters).
   */
  sizeProperty: P;
  /**
   * The relascope factor to be used.
   */
  factor: number;
  /**
   * @defaultValue `0.0`
   */
  buffer?: number;
}

export function sampleRelascopePointsOptionsCheck<P extends string>(
  options: SampleRelascopePointsOptions<P>,
): SampleError {
  if (options.factor <= 0.0) {
    return SAMPLE_ERROR_LIST.FACTOR_NOT_POSITIVE;
  } else if (FeatureCollection.isPoint(options.baseCollection) == false) {
    return SAMPLE_ERROR_LIST.EXPECTED_POINT;
  } else if (options.baseCollection.propertyRecord.hasId(options.sizeProperty) === false) {
    return SAMPLE_ERROR_LIST.SIZE_PROPERTY_MISSING;
  } else if (options.baseCollection.propertyRecord.isNumerical(options.sizeProperty) === false) {
    return SAMPLE_ERROR_LIST.SIZE_PROPERTY_NOT_NUMERICAL;
  }

  return optionsPointsOnAreasCheck(options);
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
export function sampleRelascopePoints<P extends string>(
  collection: FeatureCollection<AreaObject>,
  options: SampleRelascopePointsOptions<P>,
): {
  collection: FeatureCollection<Point, P>;
  pointSample: FeatureCollection<Point>;
  areaRatio: number;
} {
  throwRangeError(sampleRelascopePointsOptionsCheck(options));
  const opts = { ...options, buffer: options.buffer ?? 0.0 };

  // Square root of relascope factor
  const sqrtRf = Math.sqrt(options.factor);
  // Select sample of points (optional buffer via opts)
  const pointSample = samplePointsOnAreas(collection, opts);

  // To store sampled features
  // Fix property record (same as base layer, but add design variables)
  const newCollection = options.baseCollection.copyEmpty(false);

  // Compute estimate of area with input area collection
  const areaEstimateBefore = collection.features.reduce(
    (p, c) => p + c.measure() * c.getSpecialPropertyDesignWeight(),
    0.0,
  );

  // Compute estimate of area with sampled points
  let areaEstimateWithPoints = 0.0;

  for (let i = 0; i < pointSample.features.length; i++) {
    const samplePoint = pointSample.features[i];
    // check if point is inside area
    for (let j = 0; j < collection.features.length; j++) {
      const frameFeature = collection.features[j];
      if (frameFeature.geometry.includesPosition(samplePoint.geometry.coordinates)) {
        const dw =
          samplePoint.getSpecialPropertyDesignWeight() *
          (opts.buffer > 0.0 ? frameFeature.getSpecialPropertyDesignWeight() : 1.0);
        areaEstimateWithPoints += dw;
        break;
      }
    }
  }

  // Find selected points in base layer and check if selected base point is in frame and transfer dw
  options.baseCollection.forEach((pointFeature) => {
    const basePointCoords = pointFeature.geometry.coordinates;
    const sizePropertyValue = (pointFeature.properties[options.sizeProperty] ?? 0.0) as number;

    // Radius of inclusion zone
    const radius = (50.0 * sizePropertyValue) / sqrtRf;
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
            (opts.buffer > 0.0 ? frameFeature.getSpecialPropertyDesignWeight() : 1.0);

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
  });

  return {
    collection: newCollection,
    pointSample,
    areaRatio: areaEstimateWithPoints / areaEstimateBefore,
  };
}
