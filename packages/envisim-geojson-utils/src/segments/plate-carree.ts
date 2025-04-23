import type * as GJ from "../geojson.js";
import { plateCarreeAreaOfRing } from "./rhumb.js";

// WGS84 ellipsoid parameters
const a = 6378137.0;
const b = 6356752.314245;
const e2 = (a ** 2 - b ** 2) / a ** 2;

// Convert to radians/degrees
const toRad = Math.PI / 180;
const toDeg = 180 / Math.PI;

// Radius of the parallel
function Rp(phi: number): number {
  return (a * Math.cos(phi)) / (1 - e2 * Math.sin(phi) ** 2) ** 0.5;
}

// Radius of the meridian
function Rm(phi: number): number {
  return (a * (1 - e2)) / (1 - e2 * Math.sin(phi) ** 2) ** 1.5;
}

/**
 * Computes the plate carrée distance between two points
 * @param p1 the first point
 * @param p2 the second point
 * @returns the distance in meters
 */
export function distance(p1: GJ.Position, p2: GJ.Position): number {
  const delta = [p2[0] - p1[0], p2[1] - p1[1]];
  const degrees = (delta[0] ** 2 + delta[1] ** 2) ** 0.5;
  // Numerical integration of the length
  const numPoints = Math.ceil(degrees / 0.005);
  let L = 0; // Aggregate length
  let phi1 = p1[1] * toRad;
  let lambda1 = p1[0] * toRad;
  let Rm1 = Rm(phi1);
  let Rp1 = Rp(phi1);
  for (let i = 1; i <= numPoints; i++) {
    const phi2 = (p1[1] + (i / numPoints) * delta[1]) * toRad;
    const dPhi = phi2 - phi1;
    const lambda2 = (p1[0] + (i / numPoints) * delta[0]) * toRad;
    const dLambda = lambda2 - lambda1;
    const Rp2 = Rp(phi2);
    const Rm2 = Rm(phi2);
    const mRm = (Rm1 + Rm2) / 2;
    const mRp = (Rp1 + Rp2) / 2;
    L += ((mRm * dPhi) ** 2 + (mRp * dLambda) ** 2) ** 0.5;
    phi1 = phi2;
    lambda1 = lambda2;
    Rm1 = Rm2;
    Rp1 = Rp2;
  }
  return L;
}

/**
 * Computes a position on the segment at a fraction of the length of the
 * segment, where the segment is of type plate carrée.
 * @param p1 start point [lon,lat]
 * @param p2 end point [lon,lat]
 * @param fraction the fraction of the length
 * @returns the position on the segment
 */
export function intermediate(p1: GJ.Position, p2: GJ.Position, fraction: number): GJ.Position2 {
  if (fraction < 0 || fraction > 1) {
    throw new Error("fraction must be between 0 and 1");
  }
  const delta = [p2[0] - p1[0], p2[1] - p1[1]];
  const degrees = (delta[0] ** 2 + delta[1] ** 2) ** 0.5;
  // Numerical integration of the length
  const numPoints = Math.ceil(degrees / 0.005);

  const distToEnd = distance(p1, p2);
  const distToPlace = fraction * distToEnd;
  let L = 0; // Aggregate length
  let phi1 = p1[1] * toRad;
  let lambda1 = p1[0] * toRad;
  let Rm1 = Rm(phi1);
  let Rp1 = Rp(phi1);
  for (let i = 1; i <= numPoints; i++) {
    const phi2 = (p1[1] + (i / numPoints) * delta[1]) * toRad;
    const dPhi = phi2 - phi1;
    const lambda2 = (p1[0] + (i / numPoints) * delta[0]) * toRad;
    const dLambda = lambda2 - lambda1;
    const Rp2 = Rp(phi2);
    const Rm2 = Rm(phi2);
    const mRm = (Rm1 + Rm2) / 2;
    const mRp = (Rp1 + Rp2) / 2;
    const segmentLength = ((mRm * dPhi) ** 2 + (mRp * dLambda) ** 2) ** 0.5;

    if (distToPlace <= L + segmentLength) {
      const fractionOnSegment = (distToPlace - L) / segmentLength;
      return [
        (lambda1 + fractionOnSegment * dLambda) * toDeg,
        (phi1 + fractionOnSegment * dPhi) * toDeg,
      ];
    }
    L += segmentLength;
    phi1 = phi2;
    lambda1 = lambda2;
    Rm1 = Rm2;
    Rp1 = Rp2;
  }

  // Should not be reached
  throw new Error("intermediate not on segment");
}

/**
 * Computes the area of a polygon ring where the segments are
 * defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
 * 0 <= t <= 1.
 * @param ring
 * @returns the area in square meters.
 */
export function areaOfRing(ring: GJ.Position[]): number {
  return plateCarreeAreaOfRing(ring);
}
