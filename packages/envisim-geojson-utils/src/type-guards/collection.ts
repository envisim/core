import type * as GJ from "../geojson.js";
import { isBaseFeature } from "./feature.js";

export function isBaseCollection(
  obj: unknown,
  checkCoordinates: boolean = false,
): obj is GJ.BaseFeatureCollection {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return false;
  if (!("type" in obj) || obj.type !== "FeatureCollection") return false;
  if (!("features" in obj) || !Array.isArray(obj.features)) return false;
  return obj.features.every((f) => isBaseFeature(f, checkCoordinates));
}
