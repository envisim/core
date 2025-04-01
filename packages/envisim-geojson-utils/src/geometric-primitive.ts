import type * as GJ from "./geojson.js";

export type GeometricPrimitiveArea = (typeof GeometricPrimitive)["AREA"];
export type GeometricPrimitiveLine = (typeof GeometricPrimitive)["LINE"];
export type GeometricPrimitivePoint = (typeof GeometricPrimitive)["POINT"];
export type GeometricPrimitiveNone = (typeof GeometricPrimitive)["NONE"];
export type GeometricPrimitiveUnion =
  | GeometricPrimitiveArea
  | GeometricPrimitiveLine
  | GeometricPrimitivePoint
  | GeometricPrimitiveNone;

export class GeometricPrimitive {
  static AREA = "gp-area" as const;
  static LINE = "gp-line" as const;
  static POINT = "gp-point" as const;
  static NONE = "gp-none" as const;

  static isArea(obj: unknown): obj is GeometricPrimitiveArea {
    return obj === GeometricPrimitive.AREA;
  }
  static isLine(obj: unknown): obj is GeometricPrimitiveLine {
    return obj === GeometricPrimitive.LINE;
  }
  static isPoint(obj: unknown): obj is GeometricPrimitivePoint {
    return obj === GeometricPrimitive.POINT;
  }

  static assertArea(obj: unknown): asserts obj is GeometricPrimitiveArea {
    if (!GeometricPrimitive.isArea(obj)) throw new RangeError("obj is not GeometricPrimitive.AREA");
  }
  static assertLine(obj: unknown): asserts obj is GeometricPrimitiveLine {
    if (!GeometricPrimitive.isLine(obj)) throw new RangeError("obj is not GeometricPrimitive.LINE");
  }
  static assertPoint(obj: unknown): asserts obj is GeometricPrimitivePoint {
    if (!GeometricPrimitive.isPoint(obj))
      throw new RangeError("obj is not GeometricPrimitive.POINT");
  }

  static fromGeometry(obj: GJ.AreaGeometry, allowGC?: boolean): GeometricPrimitiveArea;
  static fromGeometry(obj: GJ.LineGeometry, allowGC?: boolean): GeometricPrimitiveLine;
  static fromGeometry(obj: GJ.PointGeometry, allowGC?: boolean): GeometricPrimitivePoint;
  static fromGeometry(obj: GJ.BaseGeometry, allowGC?: boolean): GeometricPrimitiveUnion;
  static fromGeometry(obj: GJ.BaseGeometry, allowGC: boolean = false): GeometricPrimitiveUnion {
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

      const gp = GeometricPrimitive.fromGeometry(obj.geometries[0], false);

      if (
        obj.geometries.length === 1 ||
        obj.geometries.every((geom) => gp === GeometricPrimitive.fromGeometry(geom, false))
      ) {
        return gp;
      }
    }

    return GeometricPrimitive.NONE;
  }

  static fromFeature(obj: GJ.AreaFeature, allowGC?: boolean): GeometricPrimitiveArea;
  static fromFeature(obj: GJ.LineFeature, allowGC?: boolean): GeometricPrimitiveLine;
  static fromFeature(obj: GJ.PointFeature, allowGC?: boolean): GeometricPrimitivePoint;
  static fromFeature(obj: GJ.BaseFeature, allowGC?: boolean): GeometricPrimitiveUnion;
  static fromFeature(obj: GJ.BaseFeature, allowGC: boolean = false): GeometricPrimitiveUnion {
    return GeometricPrimitive.fromGeometry(obj.geometry, allowGC);
  }

  static fromCollection(
    obj: GJ.BaseFeatureCollection,
    allowGC: boolean = false,
    exhaustive: boolean = false,
  ): GeometricPrimitiveUnion {
    if (obj.features.length === 0) {
      return GeometricPrimitive.NONE;
    }

    const gp = GeometricPrimitive.fromGeometry(obj.features[0].geometry, allowGC);

    if (
      exhaustive === false ||
      obj.features.length === 1 ||
      obj.features.every((feat) => gp === GeometricPrimitive.fromGeometry(feat.geometry, allowGC))
    ) {
      return gp;
    }

    return GeometricPrimitive.NONE;
  }
}
