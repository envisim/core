import type * as GJ from './geojson.js';

export function isPoint(obj: GJ.SingleTypeObject): obj is GJ.Point {
  return obj.type === 'Point' && 'radius' in obj === false;
}
export function isMultiPoint(obj: GJ.SingleTypeObject): obj is GJ.MultiPoint {
  return obj.type === 'MultiPoint' && 'radius' in obj === false;
}

export function isCircle(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.Circle {
  return obj.type === 'Point' && 'radius' in obj && (!checkPositiveRadius || obj.radius > 0.0);
}
export function isMultiCircle(
  obj: GJ.SingleTypeObject,
  checkPositiveRadius: boolean = false,
): obj is GJ.MultiCircle {
  return obj.type === 'MultiPoint' && 'radius' in obj && (!checkPositiveRadius || obj.radius > 0.0);
}
