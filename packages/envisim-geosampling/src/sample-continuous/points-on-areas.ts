import {
  type AreaObject,
  Circle,
  Feature,
  FeatureCollection,
  type GeoJSON as GJ,
  Geodesic,
  MultiCircle,
  Point,
  PropertyRecord,
  bbox4,
  bboxCenter,
  longitudeDistance,
  normalizeLongitude,
  unionOfPolygons,
} from '@envisim/geojson-utils';

import {SAMPLE_POINT_OPTIONS, type SamplePointOptions, samplePointOptionsCheck} from './options.js';

const TO_RAD = Math.PI / 180.0;
const TO_DEG = 180.0 / Math.PI;

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return Geodesic.destination(position, dist, angle);
}

/**
 * Selects points on areas (if features have bbox, it is used in pointInPolygon
 * to reject point outside bbox if buffer is zero).
 *
 * @param collection
 * @param opts
 */
export function samplePointsOnAreas(
  collection: FeatureCollection<AreaObject>,
  {
    rand = SAMPLE_POINT_OPTIONS.rand,
    pointSelection,
    sampleSize,
    buffer = SAMPLE_POINT_OPTIONS.buffer,
    ratio = SAMPLE_POINT_OPTIONS.ratio,
    rotationOfGrid = SAMPLE_POINT_OPTIONS.rotationOfGrid,
    randomRotationOfGrid = SAMPLE_POINT_OPTIONS.randomRotationOfGrid,
  }: SamplePointOptions,
): FeatureCollection<Point> {
  const optionsError = samplePointOptionsCheck({
    pointSelection,
    sampleSize,
    buffer,
    ratio,
    rotationOfGrid,
    randomRotationOfGrid,
  });
  if (optionsError !== null) {
    throw new RangeError(`samplePointsOnAreas error: ${optionsError}`);
  }

  // copy the collection
  const gj = FeatureCollection.newArea(collection.features, undefined, false);

  // Make polygons of possible circles
  gj.forEach((feature) => {
    let geom = feature.geometry;
    if (Circle.isObject(geom) || MultiCircle.isObject(geom)) {
      const p = geom.toPolygon();
      if (p === null) return;
      geom = p;
    }
  });

  // Buffer the Collection if needed.

  let buffered: FeatureCollection<AreaObject> | null;
  if (buffer > 0.0) {
    buffered = gj.buffer({distance: buffer, steps: 10});

    if (buffered === null) {
      throw new Error('Buffering failed.');
    }
    buffered = unionOfPolygons(buffered);
  } else {
    // Should union be used here as well?
    buffered = gj;
  }

  // Pre-calculations for both metods 'uniform' and 'systematic'.
  const A = buffered.measure();
  const designWeight = A / sampleSize;
  const box = bbox4(buffered.getBBox());
  const pointFeatures: Feature<Point>[] = [];
  const parentIndex: number[] = [];

  switch (pointSelection) {
    case 'independent': {
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
        const yRand = y1 + (y2 - y1) * rand.float();
        const lat = 90 - Math.acos(2.0 * yRand - 1.0) * TO_DEG;
        const lon = normalizeLongitude(box[0] + lonDist * rand.float());
        const lonLat: GJ.Position = [lon, lat];

        // Check if point is in any feature.
        for (let i = 0; i < buffered.features.length; i++) {
          if (buffered.features[i].geometry.includesPosition(lonLat)) {
            // Point is in feature. Create and store new point feature.
            const pointFeature = new Feature(Point.create(lonLat), {
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

    case 'systematic': {
      // Precalculations for systematic sampling.
      const center = bboxCenter(box);
      const bottomLeft: GJ.Position = [box[0], box[1]];
      const topRight: GJ.Position = [box[2], box[3]];
      const radius = Math.max(
        Geodesic.distance(center, bottomLeft),
        Geodesic.distance(center, topRight),
      );
      const angle = randomRotationOfGrid === true ? rand.float() * 360.0 : rotationOfGrid;
      const dy = Math.sqrt(A / (sampleSize * ratio));
      const dx = ratio * dy;
      // generate random offset in x and y
      const xoff = rand.float() * dx;
      const yoff = rand.float() * dy;
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
              const pointFeature = new Feature(Point.create(lonLat), {
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

    default:
      throw new Error('Unknown method.');
  }

  if (buffer === 0.0) {
    // Transfer design weights here.
    pointFeatures.forEach((pf, i) => {
      const feature = gj.features[parentIndex[i]];
      pf.multSpecialPropertyDesignWeight(feature.getSpecialPropertyDesignWeight());
    });
  }

  // parentIndex refer to buffered features, so
  // may not be used to transfer design weights
  // from parents unless buffer is 0.
  const pr = new PropertyRecord();
  pr.addDesignWeight();
  return FeatureCollection.newPoint(pointFeatures, pr, true);
}
