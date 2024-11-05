import * as GJ from '../types/geojson.js';
import {GeometricPrimitive} from './enum-geometric-primitive.js';

function getGeometryPrimitive(obj: GJ.PointGeometry, allowGC?: boolean): GeometricPrimitive.POINT;
function getGeometryPrimitive(obj: GJ.LineGeometry, allowGC?: boolean): GeometricPrimitive.LINE;
function getGeometryPrimitive(obj: GJ.AreaGeometry, allowGC?: boolean): GeometricPrimitive.AREA;
function getGeometryPrimitive(
  obj: GJ.BaseGeometry,
  allowGC?: boolean,
  exhaustive?: boolean,
): GeometricPrimitive;
function getGeometryPrimitive(
  obj: GJ.BaseGeometry,
  allowGC: boolean = true,
  exhaustive: boolean = false,
): GeometricPrimitive {
  switch (obj.type) {
    case 'Point':
    case 'MultiPoint':
      return Object.hasOwn(obj, 'radius') ? GeometricPrimitive.AREA : GeometricPrimitive.POINT;
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

    const gp = getGeometryPrimitive(obj.geometries[0], false, false);

    if (
      obj.geometries.length === 1 ||
      exhaustive === false ||
      obj.geometries.every((geom) => gp === getGeometryPrimitive(geom, false, false))
    ) {
      return gp;
    }
  }

  return GeometricPrimitive.NONE;
}
export {getGeometryPrimitive};

function isGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive.POINT,
  exhaustive?: boolean,
): obj is GJ.PointGeometry;
function isGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive.LINE,
  exhaustive?: boolean,
): obj is GJ.LineGeometry;
function isGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive.AREA,
  exhaustive?: boolean,
): obj is GJ.AreaGeometry;
function isGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive,
  exhaustive?: boolean,
): obj is never;
function isGeometryPrimitive(
  obj: GJ.BaseGeometry,
  primitive: GeometricPrimitive,
  exhaustive: boolean = false,
): obj is GJ.BaseGeometry {
  return getGeometryPrimitive(obj, true, exhaustive) === primitive;
}
export {isGeometryPrimitive};

function getFeaturePrimitive(obj: GJ.PointFeature): GeometricPrimitive.POINT;
function getFeaturePrimitive(obj: GJ.LineFeature): GeometricPrimitive.LINE;
function getFeaturePrimitive(obj: GJ.AreaFeature): GeometricPrimitive.AREA;
function getFeaturePrimitive(obj: GJ.BaseFeature, exhaustive?: boolean): GeometricPrimitive;
function getFeaturePrimitive(obj: GJ.BaseFeature, exhaustive: boolean = false): GeometricPrimitive {
  return getGeometryPrimitive(obj.geometry, true, exhaustive);
}
export {getFeaturePrimitive};

export function getCollectionPrimitive(
  obj: GJ.BaseFeatureCollection,
  exhaustive: boolean = false,
): GeometricPrimitive {
  if (obj.features.length === 0) {
    return GeometricPrimitive.NONE;
  }

  const gp = getGeometryPrimitive(obj.features[0].geometry, true, exhaustive);

  if (
    obj.features.length === 1 ||
    exhaustive === false ||
    obj.features.every((feat) => gp === getGeometryPrimitive(feat.geometry, true, true))
  ) {
    return gp;
  }

  return GeometricPrimitive.NONE;
}
