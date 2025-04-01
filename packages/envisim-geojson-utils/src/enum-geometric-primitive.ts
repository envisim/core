import type * as GJ from "./geojson.js";

export enum GeometricPrimitive {
  NONE,
  POINT,
  LINE,
  AREA,
}

export function getPrimitiveOfGeometry(
  obj: GJ.PointGeometry,
  allowGC?: boolean,
): GeometricPrimitive.POINT;
export function getPrimitiveOfGeometry(
  obj: GJ.LineGeometry,
  allowGC?: boolean,
): GeometricPrimitive.LINE;
export function getPrimitiveOfGeometry(
  obj: GJ.AreaGeometry,
  allowGC?: boolean,
): GeometricPrimitive.AREA;
export function getPrimitiveOfGeometry(obj: GJ.BaseGeometry, allowGC?: boolean): GeometricPrimitive;
export function getPrimitiveOfGeometry(
  obj: GJ.BaseGeometry,
  allowGC: boolean = false,
): GeometricPrimitive {
  switch (obj.type) {
    case "Point":
    case "MultiPoint":
      return "radius" in obj ? GeometricPrimitive.AREA : GeometricPrimitive.POINT;
    case "LineString":
    case "MultiLineString":
      return GeometricPrimitive.LINE;
    case "Polygon":
    case "MultiPolygon":
      return GeometricPrimitive.AREA;
  }

  if (allowGC && obj.type === "GeometryCollection") {
    if (obj.geometries.length === 0) {
      return GeometricPrimitive.NONE;
    }

    const gp = getPrimitiveOfGeometry(obj.geometries[0], false);

    if (
      obj.geometries.length === 1 ||
      obj.geometries.every((geom) => gp === getPrimitiveOfGeometry(geom, false))
    ) {
      return gp;
    }
  }

  return GeometricPrimitive.NONE;
}

export function getPrimitiveOfFeature(
  obj: GJ.PointFeature,
  allowGC?: boolean,
): GeometricPrimitive.POINT;
export function getPrimitiveOfFeature(
  obj: GJ.LineFeature,
  allowGC?: boolean,
): GeometricPrimitive.LINE;
export function getPrimitiveOfFeature(
  obj: GJ.AreaFeature,
  allowGC?: boolean,
): GeometricPrimitive.AREA;
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
    return GeometricPrimitive.NONE;
  }

  const gp = getPrimitiveOfGeometry(obj.features[0].geometry, allowGC);

  if (
    exhaustive === false ||
    obj.features.length === 1 ||
    obj.features.every((feat) => gp === getPrimitiveOfGeometry(feat.geometry, allowGC))
  ) {
    return gp;
  }

  return GeometricPrimitive.NONE;
}
