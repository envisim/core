import type * as GJ from "../geojson.js";
import { isBaseGeometry } from "./objects.js";

export function isBaseFeature(
  obj: unknown,
  checkCoordinates: boolean = false,
): obj is GJ.BaseFeature {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return false;
  if (!("type" in obj) || !("geometry" in obj) || !("properties" in obj)) return false;
  if (obj.properties !== null && (typeof obj.properties !== "object" || Array.isArray(obj))) {
    return false;
  }
  return isBaseGeometry(obj.geometry, checkCoordinates);
}
