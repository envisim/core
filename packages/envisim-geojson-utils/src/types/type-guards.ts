import type * as GJ from './geojson.js';

export function isPoint(obj: GJ.Point | GJ.Circle): obj is GJ.Point {
  return !Object.hasOwn(obj, 'radius');
}
export function isMultiPoint(
  obj: GJ.MultiPoint | GJ.MultiCircle,
): obj is GJ.MultiPoint {
  return !Object.hasOwn(obj, 'radius');
}

export function isCircle(
  obj: GJ.Point | GJ.Circle,
  checkPositiveRadius: boolean = false,
): obj is GJ.Circle {
  return (
    Object.hasOwn(obj, 'radius') &&
    (!checkPositiveRadius || (obj as GJ.Circle).radius > 0.0)
  );
}
export function isMultiCircle(
  obj: GJ.MultiPoint | GJ.MultiCircle,
  checkPositiveRadius: boolean = false,
): obj is GJ.MultiCircle {
  return (
    Object.hasOwn(obj, 'radius') &&
    (!checkPositiveRadius || (obj as GJ.MultiCircle).radius > 0.0)
  );
}
