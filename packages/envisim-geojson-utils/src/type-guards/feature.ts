import type * as GJ from "../geojson.js";
import { isBaseGeometry } from "./objects.js";

export function isSingleTypeFeature(
  obj: unknown,
  checkCoordinates: boolean = false,
): obj is GJ.BaseFeature<GJ.SingleTypeObject, unknown> {
  return isBaseFeature(obj, checkCoordinates, false);
}

export function isBaseFeature(
  obj: unknown,
  checkCoordinates: boolean = false,
  allowGC: boolean = true,
): obj is GJ.BaseFeature {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return false;
  if (
    !("type" in obj) ||
    obj.type !== "Feature" ||
    !("geometry" in obj) ||
    !("properties" in obj) ||
    (obj.properties !== null && (typeof obj.properties !== "object" || Array.isArray(obj)))
  ) {
    return false;
  }

  return isBaseGeometry(obj.geometry, checkCoordinates, allowGC);
}
