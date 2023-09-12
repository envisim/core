import type * as GJ from '../types/geojson.js';
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
// azimuthal equidistant projection, but only run the process once.
// TODO?: Add iterations to improve accuracy.

export type Tcentroid = {
  centroid: GJ.Position;
  weight: number;
};

/**
 * Compute the centroid of centroids
 * @param centroids
 * @param bbox
 */
export function centroidFromMultipleCentroids(
  centroids: Tcentroid[],
  bbox: GJ.BBox,
): Tcentroid {
  const center = bboxCenter(bbox);
  const proj = azimuthalEquidistant(center);
  let total = 0.0;
  let Cx = 0.0;
  let Cy = 0.0;
  for (let i = 0; i < centroids.length; i++) {
    const c = centroids[i];
    const p = proj.project(c.centroid);
    const weight = c.weight;
    total += weight;
    Cx += p[0] * weight;
    Cy += p[1] * weight;
  }
  Cx /= total;
  Cy /= total;
  return {centroid: proj.unproject([Cx, Cy]), weight: total};
}

/**
 * Computes the centroid from the coordinates of a LineString
 * @param coords
 * @param bbox
 */
export function centroidOfLineString(
  coords: GJ.Position[],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids: Tcentroid[] = [];
  const count = coords.length - 1;
  for (let i = 0; i < count; i++) {
    centroids.push({
      centroid: intermediate(coords[i], coords[i + 1], 0.5),
      weight: distance(coords[i], coords[i + 1]),
    });
  }
  return centroidFromMultipleCentroids(centroids, bbox);
}

/**
 * Computes the centroid from the coordinates of a MultiLineString
 * @param coords
 * @param bbox
 */
export function centroidOfMultiLineString(
  coords: GJ.Position[][],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord) => centroidOfLineString(coord, bbox));
  return centroidFromMultipleCentroids(centroids, bbox);
}

/**
 * Computes the centroid from the coordinates of a MultiPoint
 * @param coords
 * @param bbox
 */
export function centroidOfMultiPoint(
  coords: GJ.Position[],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord) => {
    return {centroid: coord, weight: 1};
  });
  return centroidFromMultipleCentroids(centroids, bbox);
}

/**
 * Computes the centroid from the coordinates of a polygon ring
 * @param coords
 * @param bbox
 */
function centroidOfRing(coords: GJ.Position[], bbox: GJ.BBox): Tcentroid {
  const center = bboxCenter(bbox);
  const proj = azimuthalEquidistant(center);
  const xy = coords.map((coord) => proj.project(coord));
  let Cx = 0.0;
  let Cy = 0.0;
  let A = 0.0;
  const count = xy.length;
  for (let i = 0; i < count; i++) {
    const j = (i + 1) % count;
    const part = xy[i][0] * xy[j][1] - xy[j][0] * xy[i][1];
    Cx += (xy[i][0] + xy[j][0]) * part;
    Cy += (xy[i][1] + xy[j][1]) * part;
    A += part;
  }
  A /= 2;
  Cx /= 6 * A;
  Cy /= 6 * A;
  return {centroid: proj.unproject([Cx, Cy]), weight: Math.abs(A)};
}

/**
 * Computes the centroid from the coordinates of a Polygon
 * @param coords
 * @param bbox
 */
export function centroidOfPolygon(
  coords: GJ.Position[][],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord, index) => {
    const c = centroidOfRing(coord, bbox);
    if (index > 0) {
      // negative weights for holes
      c.weight = -c.weight;
    }
    return c;
  });
  return centroidFromMultipleCentroids(centroids, bbox);
}

/**
 * Computes the centroid from the coordinates of a MultiPolygon
 * @param coords
 * @param bbox
 */
export function centroidOfMultiPolygon(
  coords: GJ.Position[][][],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord) => centroidOfPolygon(coord, bbox));
  return centroidFromMultipleCentroids(centroids, bbox);
}
