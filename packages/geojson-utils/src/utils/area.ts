import geodesic from 'geographiclib-geodesic';

import type * as GJ from '../types/geojson.js';
import {plateCarreeAreaOfRing} from './rhumb.js';

const geod = geodesic.Geodesic.WGS84;

interface GeodesicPolygon {
  AddPoint(a0: number, a1: number): void;
  Compute(a0: boolean, a1: boolean): {area: number};
}

export function geodesicAreaOfRing(coords: GJ.Position[]): number {
  const p = geod.Polygon(false) as GeodesicPolygon;
  const n = coords.length;

  for (let i = 0; i < n; i++) {
    // add point as (lat,lon)
    p.AddPoint(coords[i][1], coords[i][0]);
  }
  // compute and return area
  return Math.abs(p.Compute(false, true).area);
}

/**
 * Computes the plate carrée area of a Polygon (not MultiPolygon)
 * @param points the coordinates of the Polygon.
 * @returns the area in square meters.
 */
export const areaOfPolygonLonLat = (points: GJ.Position[][]): number => {
  // Full area of outer ring.
  let area = plateCarreeAreaOfRing(points[0]);
  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - plateCarreeAreaOfRing(points[i]);
  }
  return area;
};
