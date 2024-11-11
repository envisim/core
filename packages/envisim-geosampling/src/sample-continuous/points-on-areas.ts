import {
  type AreaObject,
  Circle,
  Feature,
  FeatureCollection,
  type GeoJSON as GJ,
  Geodesic,
  MultiCircle,
  Point,
  bbox4,
  createDesignWeightProperty,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
  unionOfPolygons,
} from '@envisim/geojson-utils';

import {SAMPLE_POINT_OPTIONS, type SamplePointOptions, samplePointOptionsCheck} from './options.js';

const TO_RAD = Math.PI / 180.0;
const TO_DEG = 180.0 / Math.PI;

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
  }: SamplePointOptions,
): FeatureCollection<Point> {
  const optionsError = samplePointOptionsCheck(collection, {
    pointSelection,
    sampleSize,
    buffer,
    ratio,
  });
  if (optionsError !== 0) {
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
  let designWeight = A / sampleSize;
  const box = bbox4(buffered.getBBox());
  const pointFeatures: Feature<Point>[] = [];
  const parentIndex: number[] = [];
  let pointLonLat: GJ.Position;

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
        pointLonLat = [lon, lat];

        // Check if point is in any feature.
        for (let i = 0; i < buffered.features.length; i++) {
          if (buffered.features[i].geometry.includesPosition(pointLonLat)) {
            // Point is in feature. Create and store new point feature.
            const pointFeature = new Feature(Point.create(pointLonLat), {
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
      const boxHeight = Geodesic.distance([box[0], box[1]], [box[0], box[3]]);
      const latPerMeter = (box[3] - box[1]) / boxHeight;
      // ratio = dx/dy
      // Compute distances in x (longitude) and y (latitude) between points in meters.
      const dy = Math.sqrt(A / (sampleSize * ratio));
      const dx = ratio * dy;
      designWeight = dx * dy;
      // generate random offset in x and y
      const xoff = rand.float() * dx;
      const yoff = rand.float() * dy;
      const centerLon = longitudeCenter(box[0], box[2]);
      // Compute maximum number of points in latitude direction.
      const ny = Math.ceil(boxHeight / dy);
      // Generate the points.
      for (let j = 0; j < ny; j++) {
        const latCoord = box[1] + (yoff + j * dy) * latPerMeter;

        // Find longitudes per meter at this latitude.
        const dLonMeter = Geodesic.distance([box[0], latCoord], [box[2], latCoord]);
        const lonPerMeter = longitudeDistance(box[0], box[2]) / dLonMeter;

        // Find how many points to place in the box at this latitude.
        let nx = Math.ceil(dLonMeter / dx);
        if (nx % 2 == 1) {
          nx += 1;
        }

        // Compute the points
        for (let i = 0; i <= nx; i++) {
          const lonCoord = normalizeLongitude(
            centerLon + (xoff + dx * (i - nx / 2.0)) * lonPerMeter,
          );
          pointLonLat = [lonCoord, latCoord];

          // Check if point is in any feature and then store.
          for (let k = 0; k < buffered.features.length; k++) {
            if (buffered.features[i].geometry.includesPosition(pointLonLat)) {
              // Point is in feature. Create and store new point feature.
              const pointFeature = new Feature(Point.create(pointLonLat), {
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
      let dw = 1;
      const feature = gj.features[parentIndex[i]];
      if (feature.properties?.['_designWeight']) {
        dw = feature.properties['_designWeight'];
        if (pf.properties !== undefined) {
          pf.properties['_designWeight'] *= dw;
        }
      }
    });
  }

  // parentIndex refer to buffered features, so
  // may not be used to transfer design weights
  // from parents unless buffer is 0.
  return FeatureCollection.newPoint(
    pointFeatures,
    {_designWeight: createDesignWeightProperty()},
    true,
  );
}
