import geodesic from 'geographiclib-geodesic';

import type * as GJ from '../types/geojson.js';
import {distance} from './distance.js';

const geod = geodesic.Geodesic.WGS84;

interface GeodesicPolygon {
  AddPoint(a0: number, a1: number): void;
  Compute(a0: boolean, a1: boolean): {area: number};
}

// Internal.
const areaOfRingLonLat = (coords: GJ.Position[], maxDist: number): number => {
  const p = geod.Polygon(false) as GeodesicPolygon;
  const n = coords.length;

  for (let i = 0; i < n - 1; i++) {
    const dist = distance(coords[i], coords[i + 1]);
    // add first point of segment (lat,lon)
    p.AddPoint(coords[i][1], coords[i][0]);
    // add more interpolated points?
    const numPointsToAdd = maxDist === Infinity ? 1 : Math.ceil(dist / maxDist);

    if (numPointsToAdd > 1) {
      // add more points
      const lon0 = coords[i][0];
      const lon1 = coords[i + 1][0];
      const lat0 = coords[i][1];
      const lat1 = coords[i + 1][1];

      for (let j = 1; j < numPointsToAdd; j++) {
        const t = j / numPointsToAdd;
        const lon = lon0 + t * (lon1 - lon0);
        const lat = lat0 + t * (lat1 - lat0);
        p.AddPoint(lat, lon);
      }
    }
  }

  // add last point
  p.AddPoint(coords[n - 1][1], coords[n - 1][0]);

  // compute and return area
  return Math.abs(p.Compute(false, true).area);
};

/**
 * Computes the area of a Polygon (not MultiPolygon)
 * @param points - The coordinates of the Polygon.
 * @param dist - Optional segment distance in meters for start using interpolated points, defaults to Infinity meters.
 * @returns - The area in square meters.
 */
export const areaOfPolygonLonLat = (
  points: GJ.Position[][],
  dist: number = Infinity,
): number => {
  // Full area of outer ring.
  let area = areaOfRingLonLat(points[0], dist);
  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - areaOfRingLonLat(points[i], dist);
  }
  return area;
};
