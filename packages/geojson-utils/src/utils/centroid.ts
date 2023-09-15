import type * as GJ from '../types/geojson.js';
import {areaOfPolygonLonLat} from './area.js';
import {bboxCenter} from './bbox.js';
import {distance} from './distance.js';
import {intermediate} from './intermediate.js';
import {azimuthalEquidistant} from './projections.js';

// The centroid is the geographic center that minimizes the mean squared
// distance to all the points in the feature/features.
//
// An iterative method to find the centroid with high accuracy is presented in:
//
// Rogerson, P. A. (2015). A new method for finding geographic centers,
// with application to us states. The Professional Geographer, 67(4), 686-694.
//
// The method (for a polygon) is based on using the azimuthal equidistant projection,
// with an initial guess of the centroid, on the vertices of the polygon. Then
// compute the planar centroid using standard formula for polygon and project
// back the resulting point to longitude and latitude. The process can be
// iterated with the new centroid as initial guess and is said to converge rapidly.
// i.e. the distance between the initial guess and the resulting centroid goes
// to zero quickly as the iterations continue.

// Here, the initial guess is the center of the bounding box and we use the
// azimuthal equidistant projection for the WGS84 ellipsoid.

export type WeightedCentroid = {
  centroid: GJ.Position;
  weight: number;
};

/**
 * Compute the centroid of centroids
 * @param centroids
 * @param bbox
 * @param iterations
 */
export function centroidFromMultipleCentroids(
  centroids: WeightedCentroid[],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  let center = bboxCenter(bbox);
  let total = 0.0;
  for (let i = 0; i < iterations; i++) {
    let proj = azimuthalEquidistant(center);
    total = 0.0;
    let Cx = 0.0;
    let Cy = 0.0;
    for (let k = 0; k < centroids.length; k++) {
      const c = centroids[k];
      const p = proj.project(c.centroid);
      const weight = c.weight;
      total += weight;
      Cx += p[0] * weight;
      Cy += p[1] * weight;
    }
    Cx /= total;
    Cy /= total;
    center = proj.unproject([Cx, Cy]);
  }
  return {centroid: center, weight: total};
}

/**
 * Computes the centroid from the coordinates of a LineString
 * @param coords
 * @param bbox
 * @param iterations
 */
export function centroidOfLineString(
  coords: GJ.Position[],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  const centroids: WeightedCentroid[] = [];
  const count = coords.length - 1;
  for (let i = 0; i < count; i++) {
    centroids.push({
      centroid: intermediate(coords[i], coords[i + 1], 0.5),
      weight: distance(coords[i], coords[i + 1]),
    });
  }
  return centroidFromMultipleCentroids(centroids, bbox, iterations);
}

/**
 * Computes the centroid from the coordinates of a MultiLineString
 * @param coords
 * @param bbox
 * @param iterations
 */
export function centroidOfMultiLineString(
  coords: GJ.Position[][],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  const centroids = coords.map((coord) =>
    centroidOfLineString(coord, bbox, iterations),
  );
  return centroidFromMultipleCentroids(centroids, bbox, iterations);
}

/**
 * Computes the centroid from the coordinates of a MultiPoint
 * @param coords
 * @param bbox
 * @param iterations
 */
export function centroidOfMultiPoint(
  coords: GJ.Position[],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  const centroids = coords.map((coord) => {
    return {centroid: coord, weight: 1};
  });
  return centroidFromMultipleCentroids(centroids, bbox, iterations);
}

/**
 * Computes the centroid from the coordinates of a polygon ring
 * @param coords
 * @param bbox
 * @param iterations
 */
function centroidOfRing(
  coords: GJ.Position[],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  let center = bboxCenter(bbox);
  let A = 0.0;
  for (let i = 0; i < iterations; i++) {
    const proj = azimuthalEquidistant(center);
    const xy = coords.map((coord) => proj.project(coord));
    let Cx = 0.0;
    let Cy = 0.0;
    A = 0.0;
    const count = xy.length;
    for (let j = 0; j < count; j++) {
      const k = (j + 1) % count;
      const part = xy[j][0] * xy[k][1] - xy[k][0] * xy[j][1];
      Cx += (xy[j][0] + xy[k][0]) * part;
      Cy += (xy[j][1] + xy[k][1]) * part;
      A += part;
    }
    A /= 2;
    Cx /= 6 * A;
    Cy /= 6 * A;
    center = proj.unproject([Cx, Cy]);
  }
  return {centroid: center, weight: areaOfPolygonLonLat([coords])};
}

/**
 * Computes the centroid from the coordinates of a Polygon
 * @param coords
 * @param bbox
 * @param iterations
 */
export function centroidOfPolygon(
  coords: GJ.Position[][],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  const centroids = coords.map((coord, index) => {
    const c = centroidOfRing(coord, bbox, iterations);
    if (index > 0) {
      // negative weights for holes
      c.weight = -c.weight;
    }
    return c;
  });
  return centroidFromMultipleCentroids(centroids, bbox, iterations);
}

/**
 * Computes the centroid from the coordinates of a MultiPolygon
 * @param coords
 * @param bbox
 * @param iterations
 */
export function centroidOfMultiPolygon(
  coords: GJ.Position[][][],
  bbox: GJ.BBox,
  iterations: number = 2,
): WeightedCentroid {
  const centroids = coords.map((coord) =>
    centroidOfPolygon(coord, bbox, iterations),
  );
  return centroidFromMultipleCentroids(centroids, bbox, iterations);
}
