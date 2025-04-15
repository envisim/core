import { type AreaObject, Feature, FeatureCollection, Point, union } from "@envisim/geojson";
import {
  Geodesic,
  BoundingBox,
  longitudeDistance,
  normalizeLongitude,
} from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random } from "@envisim/random";
import {
  type OptionsPointsOnAreas,
  SAMPLE_ERROR_LIST,
  type SampleError,
  optionsPointsOnAreasCheck,
  throwRangeError,
} from "./options.js";

const TO_RAD = Math.PI / 180.0;
const TO_DEG = 180.0 / Math.PI;

export interface SamplePointsOnAreasOptions extends OptionsPointsOnAreas {
  /**
   * @defaultValue `0.0`
   */
  buffer?: number;
}

export function samplePointsOnAreasCheck(options: SamplePointsOnAreasOptions): SampleError {
  if (options.ratio !== undefined && options.ratio <= 0.0) {
    return SAMPLE_ERROR_LIST.RATIO_NOT_POSITIVE;
  }

  return optionsPointsOnAreasCheck(options);
}

/**
 * Selects points on areas (if features have bbox, it is used in pointInPolygon
 * to reject point outside bbox if buffer is zero).
 *
 * @param collection -
 * @param options -
 */
export function samplePointsOnAreas(
  collection: FeatureCollection<AreaObject>,
  options: SamplePointsOnAreasOptions,
): FeatureCollection<Point, never> {
  throwRangeError(samplePointsOnAreasCheck(options));
  const {
    rand = new Random(),
    sampleSize,
    pointSelection,
    buffer,
    ratio = 1.0,
    rotationOfGrid,
    ...opts
  } = options;

  // Buffer the Collection if needed.
  const buffered =
    buffer !== undefined && buffer > 0.0
      ? union(
          collection.buffer({ distance: buffer, steps: 10 }) ?? FeatureCollection.newArea(),
          opts,
        )
      : collection;

  // Pre-calculations for both metods 'uniform' and 'systematic'.
  const A = buffered.measure();
  const designWeight = A / sampleSize;
  const box = BoundingBox.removeAltitude(buffered.getBBox());
  const pointFeatures: Feature<Point, never>[] = [];
  const parentIndex: number[] = [];

  switch (pointSelection) {
    default:
    case "independent": {
      // Store number of iterations and number of hits.
      let iterations = 0;
      let hits = 0;

      // Generate uniform points on a sphere conditioned
      // on beeing in the bounding box and then accept
      // points that fall inside a polygon.
      // See e.g. https://mathworld.wolfram.com/SpherePointPicking.html
      // for generating uniform points on a sphere.
      const y1 = (Math.cos((90.0 - box[1]) * TO_RAD) + 1.0) / 2.0;
      const y2 = (Math.cos((90.0 - box[3]) * TO_RAD) + 1.0) / 2.0;
      const lonDist = longitudeDistance(box[0], box[2]);

      while (hits < sampleSize && iterations < 1e7) {
        // Generate the point
        const yRand = y1 + (y2 - y1) * rand.random();
        const lat = 90 - Math.acos(2.0 * yRand - 1.0) * TO_DEG;
        const lon = normalizeLongitude(box[0] + lonDist * rand.random());
        const lonLat: GJ.Position = [lon, lat];

        // Check if point is in any feature.
        for (let i = 0; i < buffered.features.length; i++) {
          if (buffered.features[i].geometry.includesPosition(lonLat)) {
            // Point is in feature. Create and store new point feature.
            const pointFeature = new Feature<Point, never>(Point.create(lonLat), {
              _designWeight: designWeight,
            });
            pointFeatures.push(pointFeature);
            parentIndex.push(i);
            hits += 1;
            break;
          }
        }
        iterations += 1;
      }

      break;
    }

    case "systematic": {
      // Precalculations for systematic sampling.
      const center = BoundingBox.center(box);
      const bottomLeft: GJ.Position = [box[0], box[1]];
      const topRight: GJ.Position = [box[2], box[3]];
      const radius = Math.max(
        Geodesic.distance(center, bottomLeft),
        Geodesic.distance(center, topRight),
      );

      const angle = rotationOfGrid === "random" ? rand.random() * 360.0 : (rotationOfGrid ?? 0.0);

      const dy = Math.sqrt(A / (sampleSize * ratio));
      const dx = ratio * dy;
      // generate random offset in x and y
      const xoff = rand.random() * dx;
      const yoff = rand.random() * dy;
      // maximum number of points in each direction
      const nx = Math.ceil((2 * radius) / dx);
      const ny = Math.ceil((2 * radius) / dy);

      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          const xy: GJ.Position = [-radius + i * dx + xoff, -radius + j * dy + yoff];
          const lonLat = placePoint(xy, center, angle);
          // Check if point is in any feature and then store.
          for (let k = 0; k < buffered.features.length; k++) {
            if (buffered.features[k].geometry.includesPosition(lonLat)) {
              // Point is in feature. Create and store new point feature.
              const pointFeature = new Feature<Point, never>(Point.create(lonLat), {
                _designWeight: designWeight,
              });
              pointFeatures.push(pointFeature);
              parentIndex.push(k);
              break;
            }
          }
        }
      }
      break;
    }
  }

  if (buffer === 0.0) {
    // Transfer design weights here.
    pointFeatures.forEach((pf, i) => {
      const feature = buffered.features[parentIndex[i]];
      pf.multSpecialPropertyDesignWeight(feature.getSpecialPropertyDesignWeight());
    });
  }

  return FeatureCollection.newPoint(pointFeatures, undefined, true);
}

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return Geodesic.destination(position, dist, angle);
}
