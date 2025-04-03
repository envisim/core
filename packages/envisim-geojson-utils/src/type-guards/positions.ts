import type * as GJ from "../geojson.js";

export function isPosition(obj: unknown): obj is GJ.Position {
  if (!Array.isArray(obj) || obj.length < 2 || 3 < obj.length) return false;
  return obj.every((v) => typeof v === "number");
}
export function isPositionArr1(obj: unknown): obj is GJ.Position[] {
  if (!Array.isArray(obj)) return false;
  return obj.every((c) => isPosition(c));
}
export function isPositionArr2(obj: unknown): obj is GJ.Position[][] {
  if (!Array.isArray(obj)) return false;
  return obj.every((c) => isPositionArr1(c));
}
export function isPositionArr3(obj: unknown): obj is GJ.Position[][][] {
  if (!Array.isArray(obj)) return false;
  return obj.every((c) => isPositionArr2(c));
}
