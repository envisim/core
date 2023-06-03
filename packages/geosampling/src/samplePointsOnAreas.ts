import {
  GeoJSON,
  pointInAreaFeature,
  distance,
  buffer,
  unionOfPolygons,
  Point,
  PointFeature,
  PointCollection,
  AreaCollection,
  copy,
  AreaGeometryCollection,
  PointCircle,
  MultiPointCircle,
  bbox4,
  longitudeCenter,
  longitudeDistance,
  normalizeLongitude,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

const toRad = Math.PI / 180;
const toDeg = 180 / Math.PI;

/**
 * Generates uniform random positions in bounding box
 * @param box - A GeoJSON bounding box.
 * @param n - Positive integer sample size.
 * @param opts - Options.
 * @param opts.rand - Optional instance of Random.
 * @returns - Array of GeoJSON positions.
 */
export function uniformPositionsInBBox(
  box: GeoJSON.BBox,
  n: number,
  opts: {rand: Random},
): GeoJSON.Position[] {
  const bbox = bbox4(box);
  const y1 = (Math.cos((90 - bbox[1]) * toRad) + 1) / 2;
  const y2 = (Math.cos((90 - bbox[3]) * toRad) + 1) / 2;
  const lonDist = longitudeDistance(bbox[0], bbox[2]);
  const positions: GeoJSON.Position[] = [];
  const rand = opts.rand ?? new Random();
  if (n < 0) {
    throw new Error('n must be non-negative.');
  }

  for (let i = 0; i < n; i++) {
    // Generate the point
    const yRand = y1 + (y2 - y1) * rand.float();
    const lat = 90 - Math.acos(2 * yRand - 1) * toDeg;
    const lon = normalizeLongitude(bbox[0] + lonDist * rand.float());
    positions.push([lon, lat]);
  }

  if (box.length === 6) {
    for (let i = 0; i < n; i++) {
      const alt = box[2] + (box[5] - box[2]) * rand.float();
      positions[i].push(alt);
    }
  }
  return positions;
}

export type TsamplePointsOnAreasOpts = {
  buffer?: number;
  ratio?: number;
  rand?: Random;
};

/**
 * Selects points on areas (if features have bbox, it is used in pointInPolygon
 * to reject point outside bbox if buffer is zero).
 *
 * @param collection an AreaCollection
 * @param method the method to use "uniform" or "systematic"
 * @param sampleSize the expected sample size as integer > 0.
 * @param opts an optional options object.
 * @param opts.buffer an optional buffer in meters (default 0).
 * @param opts.ratio an optional ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand an optional instance of Random.
 * @returns resulting PointCollection.
 */
export function samplePointsOnAreas(
  collection: AreaCollection,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  opts: TsamplePointsOnAreasOpts = {},
): PointCollection {
  if (!AreaCollection.isCollection(collection)) {
    throw new Error('Input collection must be an AreaCollection.');
  }

  if (method !== 'systematic' && method !== 'uniform') {
    throw new Error("Input method must be either'uniform' or 'systematic'");
  }

  if (
    typeof sampleSize !== 'number' ||
    sampleSize !== Math.round(sampleSize) ||
    sampleSize <= 0
  ) {
    throw new Error('Input sampleSize must be a positive integer.');
  }
  // Set options.
  const radius = opts.buffer || 0;
  const ratio = opts.ratio || 1;
  const rand = opts.rand ?? new Random();

  // copy the collection
  const gj = new AreaCollection(collection, false);

  // Make polygons of possible circles
  gj.features.forEach((feature) => {
    let geom = feature.geometry;
    if (AreaGeometryCollection.isGeometryCollection(geom)) {
      geom.geometries.forEach((geometry) => {
        if (
          PointCircle.isObject(geometry) ||
          MultiPointCircle.isObject(geometry)
        ) {
          geometry = geometry.toPolygon();
        }
      });
    } else {
      if (PointCircle.isObject(geom) || MultiPointCircle.isObject(geom)) {
        geom = geom.toPolygon();
      }
    }
  });

  // Buffer the Collection if needed.
  let buffered: AreaCollection;
  if (radius > 0) {
    buffered = buffer(unionOfPolygons(gj), {
      radius: radius,
      steps: 10,
    });
    if (buffered.features.length === 0) {
      throw new Error('Buffering failed.');
    }
  } else {
    buffered = gj;
  }

  // Pre-calculations for both metods 'uniform' and 'systematic'.
  const A = buffered.area();
  let designWeight = A / sampleSize;
  const box = bbox4(buffered.getBBox());
  const pointFeatures = [];
  const parentIndex: number[] = [];
  let pointLonLat: GeoJSON.Position;
  switch (method) {
    case 'uniform':
      // Store number of iterations and number of hits.
      let iterations = 0;
      let hits = 0;

      // Generate uniform points on a sphere conditioned
      // on beeing in the bounding box and then accept
      // points that fall inside a polygon.
      // See e.g. https://mathworld.wolfram.com/SpherePointPicking.html
      // for generating uniform points on a sphere.
      const y1 = (Math.cos((90 - box[1]) * toRad) + 1) / 2;
      const y2 = (Math.cos((90 - box[3]) * toRad) + 1) / 2;
      const lonDist = longitudeDistance(box[0], box[2]);

      while (hits < sampleSize && iterations < 1e7) {
        // Generate the point
        const yRand = y1 + (y2 - y1) * rand.float();
        const lat = 90 - Math.acos(2 * yRand - 1) * toDeg;
        const lon = normalizeLongitude(box[0] + lonDist * rand.float());
        pointLonLat = [lon, lat];

        // Check if point is in any feature.
        for (let i = 0; i < buffered.features.length; i++) {
          if (pointInAreaFeature(pointLonLat, buffered.features[i])) {
            // Point is in feature. Create and store new point feature.
            const pointFeature = PointFeature.create(
              Point.create(pointLonLat),
              {_designWeight: designWeight},
            );
            pointFeatures.push(pointFeature);
            parentIndex.push(i);
            hits += 1;
            break;
          }
        }
        iterations += 1;
      }
      break;
    case 'systematic':
      // Precalculations for systematic sampling.
      const boxHeight = distance([box[0], box[1]], [box[0], box[3]]);
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
      //const centerLon = box[0] + (box[2] - box[0]) / 2;
      // Compute maximum number of points in latitude direction.
      const ny = Math.ceil(boxHeight / dy);
      // Generate the points.
      for (let j = 0; j < ny; j++) {
        const latCoord = box[1] + (yoff + j * dy) * latPerMeter;

        // Find longitudes per meter at this latitude.
        const dLonMeter = distance([box[0], latCoord], [box[2], latCoord]);
        const lonPerMeter = longitudeDistance(box[0], box[2]) / dLonMeter;

        // Find how many points to place in the box at this latitude.
        let nx = Math.ceil(dLonMeter / dx);
        if (nx % 2 == 1) {
          nx += 1;
        }

        // Compute the points
        for (let i = 0; i <= nx; i++) {
          const lonCoord = normalizeLongitude(
            centerLon + (xoff + dx * (i - nx / 2)) * lonPerMeter,
          );
          pointLonLat = [lonCoord, latCoord];

          // Check if point is in any feature and then store.
          for (let k = 0; k < buffered.features.length; k++) {
            if (pointInAreaFeature(pointLonLat, buffered.features[k])) {
              // Point is in feature. Create and store new point feature.
              const pointFeature = PointFeature.create(
                Point.create(pointLonLat),
                {_designWeight: designWeight},
              );
              pointFeatures.push(pointFeature);
              parentIndex.push(k);
              break;
            }
          }
        }
      }
      break;
    default:
      throw new Error('Unknown method.');
  }

  if (radius === 0) {
    // Transfer design weights here.
    pointFeatures.forEach((pf: PointFeature, i) => {
      let dw = 1;
      let feature = gj.features[parentIndex[i]];
      if (feature.properties?._designWeight) {
        dw = feature.properties._designWeight;
        if (pf.properties) {
          pf.properties._designWeight *= dw;
        }
      }
    });
  }
  // parentIndex refer to buffered features, so
  // may not be used to transfer design weights
  // from parents unless buffer is 0.
  return new PointCollection({
    type: 'FeatureCollection',
    features: pointFeatures,
  });
}
