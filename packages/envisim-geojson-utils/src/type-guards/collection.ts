import type * as GJ from "../geojson.js";
import { isBaseFeature } from "./feature.js";

/**
 * @param checkCoordinates - if `true`, checks the validity of the `coordinates` property on every
 * geometry in the collection, otherwise only checks for the existance of the `coordinates` property
 * on every geometry in the collection.
 * @param allowGC - if `false`, disallowes the existance of `GJ.BaseGeometryCollection` as a geometry
 * @returns `true` if `obj` can be narrowed to `GJ.BaseFeatureCollection`.
 */
export function isBaseCollection(
  obj: unknown,
  checkCoordinates: boolean,
  allowGC: false,
): obj is GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>;
export function isBaseCollection(
  obj: unknown,
  checkCoordinates?: boolean,
  allowGC?: boolean,
): obj is GJ.BaseFeatureCollection;
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

/**
 * @returns `true` if `obj` can be narrowed to
 * `GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>`.
 */
export function isSingleTypeCollection(
  obj: unknown,
  checkCoordinates: boolean = false,
): obj is GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>> {
  return isBaseCollection(obj, checkCoordinates, false);
}

/**
 * @returns `true` if `obj` can be narrowed to a FeatureCollection with uniform properties, i.e. a
 * FeatureCollection where every feature has exactly the same property object.
 */
export function isUniformCollection(
  obj: GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, unknown>>,
): obj is GJ.BaseFeatureCollection<GJ.BaseFeature<GJ.SingleTypeObject, string | number>> {
  if (obj.features.length === 0) return true;

  // Use the first feature as template
  const p0 = obj.features[0].properties;

  // If template property object is null, all features must have null property object
  if (p0 === null) {
    return obj.features.every((f) => f.properties === null);
  }

  // Store the property keys and types
  const propertyMap = new Map<string, "string" | "number">();

  for (const k in p0) {
    const t = typeof p0[k];
    if (t !== "number" && t !== "string") return false;
    propertyMap.set(k, t);
  }

  // Check the properties of every feature against the key/type map
  for (let i = 1; i < obj.features.length; i++) {
    const p = obj.features[i].properties;

    if (p === null) {
      return false;
    }

    if (Object.keys(p).some((k) => typeof p[k] !== propertyMap.get(k))) return false;
  }

  return true;
}
