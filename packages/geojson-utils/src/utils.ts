import type * as GeoJSON from './geojson/types.js';

function degreeToRadian(p: number): number;
function degreeToRadian(p: GeoJSON.Position): GeoJSON.Position {
  if (typeof p === 'number') {
    return (p * Math.PI) / 180.0;
  }

  const r: GeoJSON.Position = [
    (p[0] * Math.PI) / 180.0,
    (p[1] * Math.PI) / 180.0,
  ];

  if (p.length === 3) {
    r.push(p[2]);
  }

  return r;
}
export {degreeToRadian};

export function sincos(v: number): [number, number] {
  return [Math.sin(v), Math.cos(v)];
}
