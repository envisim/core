import type * as GJ from "../geojson.js";
import { isBaseFeature } from "./feature.js";

export function isBaseCollection(
  obj: unknown,
  checkCoordinates: boolean = false,
  allowGC: boolean = true,
): obj is GJ.BaseFeatureCollection {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) return false;
  if (!("type" in obj) || obj.type !== "FeatureCollection") return false;
  if (!("features" in obj) || !Array.isArray(obj.features)) return false;
  return obj.features.every((f) => isBaseFeature(f, checkCoordinates, allowGC));
}

export function isSingleTypeCollection(
  obj: unknown,
  checkCoordinates: boolean = false,
): obj is GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>> {
  return isBaseCollection(obj, checkCoordinates, false);
}

export function isUniformCollection(
  obj: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>,
): obj is GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, string | number>> {
  if (obj.features.length === 0) return true;

  const p0 = obj.features[0].properties;

  if (p0 === null) {
    return obj.features.every((f) => f.properties === null);
  }

  const propertyTypes: Record<string, "string" | "number"> = {};

  for (const k in p0) {
    const t = typeof p0[k];

    if (t !== "number" && t !== "string") {
      return false;
    }

    propertyTypes[k] = t;
  }

  for (let i = 1; i < obj.features.length; i++) {
    const p = obj.features[i].properties;

    if (p === null) {
      return false;
    }

    if (Object.keys(p).some((k) => typeof p[k] !== propertyTypes[k])) return false;
  }

  return true;
}
