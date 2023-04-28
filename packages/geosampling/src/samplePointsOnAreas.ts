import {Random} from '@envisim/random';
import {
  area,
  bbox,
  pointInPolygon,
  geomEach,
  distance,
  buffer,
  unionOfPolygons,
  toPoint,
} from '@envisim/geojson-utils';
import {convertPointCirclesToPolygons} from './convertPointCirclesToPolygons.js';

export type TsamplePointsOnAreasOpts = {
  buffer?: number;
  ratio?: number;
  rand?: Random;
};

/**
 * Selects points on areas (if features have bbox, it is used in pointInPolygon
 * to reject point outside bbox if buffer is zero).
 *
 * @param geoJSON - A GeoJSON object to select points on Polygon/MultiPolygon features
 * @param method - The method to use "uniform" or "systematic"
 * @param sampleSize - The expected sample size as integer > 0.
 * @param opts - An optional options object.
 * @param opts.buffer - An optional buffer in meters (default 0).
 * @param opts.ratio - An optional ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand - An optional instance of Random.
 * @returns - Resulting GeoJSON FeatureCollection.
 */
export const samplePointsOnAreas = (
  geoJSON: GeoJSON.FeatureCollection,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  opts: TsamplePointsOnAreasOpts = {},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error('Input GeoJSON must be a FeatureCollection.');
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

  // filter out Polygons and Multipolygons
  // store featureIndex as that might be needed to transfer
  // properties such as designWeights later.
  const features: GeoJSON.Feature[] = [];
  const featureIndex: number[] = [];

  geomEach(geoJSON, (geom: GeoJSON.Geometry, fi: number) => {
    if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
      features.push({
        type: 'Feature',
        geometry: geom,
        properties: {
          _designWeight: 1,
        },
      });
      featureIndex.push(fi);
    }
    if (
      (geom.type === 'Point' || geom.type === 'MultiPoint') &&
      geoJSON.type === 'FeatureCollection'
    ) {
      let feature = geoJSON.features[fi];
      if (feature.properties?._radius) {
        features.push(
          convertPointCirclesToPolygons({
            type: 'Feature',
            geometry: geom,
            properties: {
              _radius: feature.properties._radius,
            },
          }),
        );
        featureIndex.push(fi);
      }
    }
  });

  if (features.length === 0) {
    throw new Error('No Polygon or MultiPolygon found.');
  }
  // Filtering done. Make FeatureCollection.
  const featureCollection: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: features,
  };
  // Buffer the Collection if needed.
  let buffered: GeoJSON.FeatureCollection;
  if (radius > 0) {
    if (features.length > 1) {
      // If more than one geometry, then we need to take
      // union before (or after) the buffering to make sure
      // that the area of the buffered frame is correct.
      buffered = buffer(unionOfPolygons(featureCollection), {
        radius: radius,
        steps: 10,
      });
    } else {
      buffered = buffer(featureCollection, {radius: radius, steps: 10});
    }
    if (buffered.features.length === 0) {
      throw new Error('Buffering failed.');
    }
  } else {
    buffered = featureCollection;
  }
  // Pre-calculations for both metods 'uniform' and 'systematic'.
  const A = area(buffered);
  let designWeight = A / sampleSize;
  const box = buffered.bbox ?? bbox(buffered);
  const pointFeatures = [];
  const parentIndex: number[] = [];
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;
  let pointLonLat = [];
  switch (method) {
    case 'uniform':
      let iterations = 0;
      let hits = 0;
      // Generate uniform points on a sphere conditioned
      // on beeing in the bounding box and then accept
      // points that fall inside a polygon.
      // See e.g. https://mathworld.wolfram.com/SpherePointPicking.html
      // for generating uniform points on a sphere.
      let y1 = (Math.cos((90 - box[1]) * toRad) + 1) / 2;
      let y2 = (Math.cos((90 - box[3]) * toRad) + 1) / 2;
      while (hits < sampleSize && iterations < 1e7) {
        let yRand = y1 + (y2 - y1) * rand.float();
        pointLonLat = [
          box[0] + (box[2] - box[0]) * rand.float(),
          90 - Math.acos(2 * yRand - 1) * toDeg,
        ];
        let pointFeature = toPoint(pointLonLat, {
          _designWeight: designWeight,
        });
        // Check if point is in any feature.
        for (let i = 0; i < buffered.features.length; i++) {
          if (pointInPolygon(pointFeature, buffered.features[i])) {
            pointFeatures.push(pointFeature);
            parentIndex.push(featureIndex[i]);
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
      const centerLon = box[0] + (box[2] - box[0]) / 2;
      // Compute maximum number of points in latitude direction.
      const ny = Math.ceil(boxHeight / dy);
      // Generate the points.
      for (let j = 0; j < ny; j++) {
        let latCoord = box[1] + (yoff + j * dy) * latPerMeter;
        let dLon = distance([box[0], latCoord], [box[2], latCoord]);
        let lonPerMeter = (box[2] - box[0]) / dLon;
        let nx = Math.ceil(dLon / dx);
        if (nx % 2 == 1) {
          nx += 1;
        }
        for (let i = 0; i <= nx; i++) {
          let lonCoord = centerLon + (xoff + dx * (i - nx / 2)) * lonPerMeter;
          pointLonLat = [lonCoord, latCoord];
          let pointFeature = toPoint(pointLonLat, {
            _designWeight: designWeight,
          });
          // Check if point is in any feature and then store.
          for (let k = 0; k < buffered.features.length; k++) {
            if (pointInPolygon(pointFeature, buffered.features[k])) {
              pointFeatures.push(pointFeature);
              parentIndex.push(featureIndex[k]);
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
    pointFeatures.forEach((pf: GeoJSON.Feature, i) => {
      let dw = 1;
      let feature = geoJSON.features[parentIndex[i]];
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
  return {
    type: 'FeatureCollection',
    features: pointFeatures,
  };
};
