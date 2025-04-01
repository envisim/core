import type * as GJ from "./geojson.js";

export const GEOMETRIC_PRIMITIVES = {
  NONE: "gp-none",
  POINT: "gp-point",
  LINE: "gp-line",
  AREA: "gp-area",
} as const;
export type GeometricPrimitiveMap = typeof GEOMETRIC_PRIMITIVES;
export type GeometricPrimitive = GeometricPrimitiveMap[keyof GeometricPrimitiveMap];

export function getPrimitiveOfGeometry(
  obj: GJ.PointGeometry,
  allowGC?: boolean,
): GeometricPrimitiveMap["POINT"];
export function getPrimitiveOfGeometry(
  obj: GJ.LineGeometry,
  allowGC?: boolean,
): GeometricPrimitiveMap["LINE"];
export function getPrimitiveOfGeometry(
  obj: GJ.AreaGeometry,
  allowGC?: boolean,
): GeometricPrimitiveMap["AREA"];
export function getPrimitiveOfGeometry(obj: GJ.BaseGeometry, allowGC?: boolean): GeometricPrimitive;
export function getPrimitiveOfGeometry(
  obj: GJ.BaseGeometry,
  allowGC: boolean = false,
): GeometricPrimitive {
  switch (obj.type) {
    case "Point":
    case "MultiPoint":
      return "radius" in obj ? GEOMETRIC_PRIMITIVES.AREA : GEOMETRIC_PRIMITIVES.POINT;
    case "LineString":
    case "MultiLineString":
      return GEOMETRIC_PRIMITIVES.LINE;
    case "Polygon":
    case "MultiPolygon":
      return GEOMETRIC_PRIMITIVES.AREA;
  }

  if (allowGC && obj.type === "GeometryCollection") {
    if (obj.geometries.length === 0) {
      return GEOMETRIC_PRIMITIVES.NONE;
    }

    const gp = getPrimitiveOfGeometry(obj.geometries[0], false);

    if (
      obj.geometries.length === 1 ||
      obj.geometries.every((geom) => gp === getPrimitiveOfGeometry(geom, false))
    ) {
      return gp;
    }
  }

  return GEOMETRIC_PRIMITIVES.NONE;
}

export function getPrimitiveOfFeature(
  obj: GJ.PointFeature,
  allowGC?: boolean,
): GeometricPrimitiveMap["POINT"];
export function getPrimitiveOfFeature(
  obj: GJ.LineFeature,
  allowGC?: boolean,
): GeometricPrimitiveMap["LINE"];
export function getPrimitiveOfFeature(
  obj: GJ.AreaFeature,
  allowGC?: boolean,
): GeometricPrimitiveMap["AREA"];
export function getPrimitiveOfFeature(obj: GJ.BaseFeature, allowGC?: boolean): GeometricPrimitive;
export function getPrimitiveOfFeature(
  obj: GJ.BaseFeature,
  allowGC: boolean = false,
): GeometricPrimitive {
  return getPrimitiveOfGeometry(obj.geometry, allowGC);
}

export function getPrimitiveOfCollection(
  obj: GJ.BaseFeatureCollection,
  allowGC: boolean = false,
  exhaustive: boolean = false,
): GeometricPrimitive {
  if (obj.features.length === 0) {
    return GEOMETRIC_PRIMITIVES.NONE;
  }

  const gp = getPrimitiveOfGeometry(obj.features[0].geometry, allowGC);

  if (
    exhaustive === false ||
    obj.features.length === 1 ||
    obj.features.every((feat) => gp === getPrimitiveOfGeometry(feat.geometry, allowGC))
  ) {
    return gp;
  }

  return GEOMETRIC_PRIMITIVES.NONE;
}
