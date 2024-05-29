import * as GJ from '../types/geojson.js';
import {GeometricPrimitive} from './GeometricPrimitive.js';

export function GetGeometryPrimitive(
  obj: never,
  exhaustive?: boolean,
  allowGC?: boolean,
): GeometricPrimitive.NONE;
export function GetGeometryPrimitive(
  obj: GJ.PointGeometry,
  exhaustive?: boolean,
  allowGC?: boolean,
): GeometricPrimitive.POINT;
export function GetGeometryPrimitive(
  obj: GJ.LineGeometry,
  exhaustive?: boolean,
  allowGC?: boolean,
): GeometricPrimitive.LINE;
export function GetGeometryPrimitive(
  obj: GJ.AreaGeometry,
  exhaustive?: boolean,
  allowGC?: boolean,
): GeometricPrimitive.AREA;
export function GetGeometryPrimitive(
  obj: GJ.BaseGeometry,
  exhaustive?: boolean,
  allowGC?: boolean,
): GeometricPrimitive;
export function GetGeometryPrimitive(
  obj: GJ.BaseGeometry,
  exhaustive: boolean = false,
  allowGC: boolean = true,
): GeometricPrimitive {
  switch (obj.type) {
    case 'Point':
    case 'MultiPoint':
      return Object.hasOwn(obj, 'radius')
        ? GeometricPrimitive.AREA
        : GeometricPrimitive.POINT;
    case 'LineString':
    case 'MultiLineString':
      return GeometricPrimitive.LINE;
    case 'Polygon':
    case 'MultiPolygon':
      return GeometricPrimitive.AREA;
  }

  if (allowGC === false) {
    return GeometricPrimitive.NONE;
  }

  if (obj.type === 'GeometryCollection') {
    if (obj.geometries.length === 0) {
      return GeometricPrimitive.NONE;
    }

    const gp = GetGeometryPrimitive(obj.geometries[0], false, false);

    if (
      obj.geometries.length === 1 ||
      exhaustive === false ||
      obj.geometries.every(
        (geom) => gp === GetGeometryPrimitive(geom, false, false),
      )
    ) {
      return gp;
    }
  }

  return GeometricPrimitive.NONE;
}

export function GetFeaturePrimitive(
  obj: never,
  exhaustive?: boolean,
): GeometricPrimitive.NONE;
export function GetFeaturePrimitive(
  obj: GJ.PointFeature,
  exhaustive?: boolean,
): GeometricPrimitive.POINT;
export function GetFeaturePrimitive(
  obj: GJ.LineFeature,
  exhaustive?: boolean,
): GeometricPrimitive.LINE;
export function GetFeaturePrimitive(
  obj: GJ.AreaFeature,
  exhaustive?: boolean,
): GeometricPrimitive.AREA;
export function GetFeaturePrimitive(
  obj: GJ.BaseFeature,
  exhaustive?: boolean,
): GeometricPrimitive;
export function GetFeaturePrimitive(
  obj: GJ.BaseFeature,
  exhaustive: boolean = false,
): GeometricPrimitive {
  return GetGeometryPrimitive(obj.geometry, exhaustive);
}

export function GetCollectionPrimitive(
  obj: never,
  exhaustive?: boolean,
): GeometricPrimitive.NONE;
export function GetCollectionPrimitive(
  obj: GJ.PointFeatureCollection,
  exhaustive?: boolean,
): GeometricPrimitive.POINT;
export function GetCollectionPrimitive(
  obj: GJ.LineFeatureCollection,
  exhaustive?: boolean,
): GeometricPrimitive.LINE;
export function GetCollectionPrimitive(
  obj: GJ.AreaFeatureCollection,
  exhaustive?: boolean,
): GeometricPrimitive.AREA;
export function GetCollectionPrimitive(
  obj: GJ.BaseFeatureCollection,
  exhaustive?: boolean,
): GeometricPrimitive;
export function GetCollectionPrimitive(
  obj: GJ.BaseFeatureCollection,
  exhaustive: boolean = false,
): GeometricPrimitive {
  if (obj.features.length === 0) {
    return GeometricPrimitive.NONE;
  }

  const gp = GetGeometryPrimitive(obj.features[0].geometry);

  if (
    obj.features.length === 1 ||
    exhaustive === false ||
    obj.features.every(
      (feat) => gp === GetGeometryPrimitive(feat.geometry, true, true),
    )
  ) {
    return gp;
  }

  return GeometricPrimitive.NONE;
}
