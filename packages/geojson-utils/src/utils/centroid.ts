import type * as GJ from '../types/geojson.js';
import {bboxCenter} from './bbox.js';
import {distance} from './distance.js';
import {intermediate} from './intermediate.js';
import {azimuthalEquidistant} from './projections.js';

export type Tcentroid = {
  centroid: GJ.Position;
  weight: number;
};

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

export function centroidOfMultiLineString(
  coords: GJ.Position[][],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord) => centroidOfLineString(coord, bbox));
  return centroidFromMultipleCentroids(centroids, bbox);
}

export function centroidOfMultiPoint(
  coords: GJ.Position[],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord) => {
    return {centroid: coord, weight: 1};
  });
  return centroidFromMultipleCentroids(centroids, bbox);
}

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

export function centroidOfMultiPolygon(
  coords: GJ.Position[][][],
  bbox: GJ.BBox,
): Tcentroid {
  const centroids = coords.map((coord) => centroidOfPolygon(coord, bbox));
  return centroidFromMultipleCentroids(centroids, bbox);
}
