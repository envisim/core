import * as GJ from '../types/geojson.js';
import {GeometricPrimitive} from './GeometricPrimitive.js';

export function GetGeometryPrimitive(
  obj: GJ.BaseGeometry,
  allowGC: boolean = true,
  exhaustive: boolean = false,
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

export function AssertGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive.POINT,
  exhaustive?: boolean,
): obj is GJ.PointGeometry;
export function AssertGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive.LINE,
  exhaustive?: boolean,
): obj is GJ.LineGeometry;
export function AssertGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive.AREA,
  exhaustive?: boolean,
): obj is GJ.AreaGeometry;
export function AssertGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive,
  exhaustive?: boolean,
): obj is never;
export function AssertGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive,
  exhaustive: boolean = false,
): obj is GJ.BaseGeometry {
  return GetGeometryPrimitive(obj, true, exhaustive) === primitive;
}

export function GetFeaturePrimitive(
  obj: GJ.BaseFeature,
  exhaustive: boolean = false,
): GeometricPrimitive {
  return GetGeometryPrimitive(obj.geometry, true, exhaustive);
}

export function GetCollectionPrimitive(
  obj: GJ.BaseFeatureCollection,
  exhaustive: boolean = false,
): GeometricPrimitive {
  if (obj.features.length === 0) {
    return GeometricPrimitive.NONE;
  }

  const gp = GetGeometryPrimitive(obj.features[0].geometry, true, exhaustive);

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
