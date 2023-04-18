import type {IGeodesic, IGeodesicBase, GCPosition} from './types.js';

import {degreeToRadian, sincos} from '../utils.js';

export function geodesicParameters({a, f}: IGeodesicBase): IGeodesic {
  const b = a * (1.0 - f);
  const e2 = f * (2.0 - f);

  return {
    a,
    b,
    f,
    n: f / (2.0 - f),
    e2,
    ep2: e2 / (1.0 - e2),
  };
}

export function geodesicToGeocentric(
  p: GeoJSON.Position, // [lon, lat, h]
  {a, e2}: IGeodesic,
): GCPosition {
  const lon = degreeToRadian(p[0]);
  const lat = degreeToRadian(p[1]);
  const [slon, clon] = sincos(lon);
  const [slat, clat] = sincos(lat);

  const N = a / Math.sqrt(1.0 - e2 * slat * slat);
  const h = p.length === 3 ? p[2] : 0.0;
  const r: GCPosition = [
    (N + h) * clat * clon,
    (N + h) * clat * slon,
    ((1.0 - e2) * N + h) * slat,
  ];

  return r;
}

export function geocentricToGeodesic(
  p: GCPosition, // [x, y, z]
  {a, e2}: IGeodesic,
): GeoJSON.Position {
  const lon = Math.atan2(p[1], p[0]);
  const d = Math.hypot(p[0], p[1]);

  const e2sq = Math.sqrt(1.0 - e2);
  const v = p[2] / (d * e2sq);
  const ct = 1.0 / Math.sqrt(1.0 + v * v);
  const st = v * ct;

  const lat = Math.atan(
    p[1] +
      (((a * e2) / e2sq) * Math.pow(st, 3.0)) /
        (d - a * e2 * Math.pow(ct, 3.0)),
  );

  return [lon, lat];
}
