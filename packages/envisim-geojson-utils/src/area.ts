import type * as GJ from "./geojson.js";
import { areaOfRing } from "./segments/geodesic.js";

/**
 * Computes the plate carrée area of a Polygon (not MultiPolygon)
 * @param points the coordinates of the Polygon.
 * @returns the area in square meters.
 */
export const areaOfPolygonLonLat = (points: GJ.Position[][]): number => {
  // Full area of outer ring.
  let area = areaOfRing(points[0]);

  // Now substract area of any holes.
  for (let i = 1; i < points.length; i++) {
    area = area - areaOfRing(points[i]);
  }

  return area;
};
