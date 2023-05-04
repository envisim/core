// Basic
export type Position = [number, number] | [number, number, number];
export type BBox =
  | [number, number, number, number]
  | [number, number, number, number, number, number];

export interface GeoJsonObject<T extends string> {
  type: T;
  bbox?: BBox;
}

// Geometries
export interface Point extends GeoJsonObject<'Point'> {
  type: 'Point';
  coordinates: Position;
  radius?: undefined;
}
export interface PointCircle extends GeoJsonObject<'Point'> {
  type: 'Point';
  coordinates: Position;
  radius: number;
}
export interface MultiPoint extends GeoJsonObject<'MultiPoint'> {
  type: 'MultiPoint';
  coordinates: Position[];
  radius?: undefined;
}
export interface MultiPointCircle extends GeoJsonObject<'MultiPoint'> {
  type: 'MultiPoint';
  coordinates: Position[];
  radius: number;
}
export interface LineString extends GeoJsonObject<'LineString'> {
  type: 'LineString';
  coordinates: Position[];
  radius?: undefined;
}
export interface MultiLineString extends GeoJsonObject<'MultiLineString'> {
  type: 'MultiLineString';
  coordinates: Position[][];
  radius?: undefined;
}
export interface Polygon extends GeoJsonObject<'Polygon'> {
  type: 'Polygon';
  coordinates: Position[][];
  radius?: undefined;
}
export interface MultiPolygon extends GeoJsonObject<'MultiPolygon'> {
  type: 'MultiPolygon';
  coordinates: Position[][][];
  radius?: undefined;
}

export interface GeometryCollection
  extends GeoJsonObject<'GeometryCollection'> {
  type: 'GeometryCollection';
  geometries: BaseGeometry[];
}
export interface PointGeometryCollection extends GeometryCollection {
  geometries: PointObject[];
}
export interface LineGeometryCollection extends GeometryCollection {
  geometries: LineObject[];
}
export interface AreaGeometryCollection extends GeometryCollection {
  geometries: AreaObject[];
}

export type PointObject = Point | MultiPoint;
export type LineObject = LineString | MultiLineString;
export type AreaObject =
  | PointCircle
  | MultiPointCircle
  | Polygon
  | MultiPolygon;

export type BaseGeometry = PointObject | LineObject | AreaObject;
export type Geometry = BaseGeometry | GeometryCollection;
export type PointGeometry = PointObject | PointGeometryCollection;
export type LineGeometry = LineObject | LineGeometryCollection;
export type AreaGeometry = AreaObject | AreaGeometryCollection;

// Features
export type FeatureProperties = {[name: string]: any} | null;
export interface Feature<T extends Geometry | null>
  extends GeoJsonObject<'Feature'> {
  type: 'Feature';
  geometry: T;
  properties: FeatureProperties;
}
export type PointFeature = Feature<PointGeometry>;
export type LineFeature = Feature<LineGeometry>;
export type AreaFeature = Feature<AreaGeometry>;

// FeatureCollections
export interface FeatureCollection extends GeoJsonObject<'FeatureCollection'> {
  type: 'FeatureCollection';
  features: Feature<Geometry>[];
}
export interface PointFeatureCollection extends FeatureCollection {
  features: PointFeature[];
}
export interface LineFeatureCollection extends FeatureCollection {
  features: LineFeature[];
}
export interface AreaFeatureCollection extends FeatureCollection {
  features: AreaFeature[];
}

export function isPointObject(obj: any): obj is PointObject {
  return (
    (obj?.type === 'Point' || obj?.type === 'MultiPoint') &&
    typeof obj?.radius !== 'number'
  );
}

export function isPointGeometry(
  obj: any,
  shallow: boolean = true,
): obj is PointGeometry {
  if (typeof obj?.type !== 'string') return false;
  if (isPointObject(obj) === true) return true;

  if (
    obj.type !== 'GeometryCollection' ||
    Array.isArray(obj?.geometries) ||
    obj.geometries.length === 0
  )
    return false;

  if (shallow === true) return isPointObject(obj.geometries[0]);
  return obj.geometries.every((g: any) => isPointObject(g));
}

export function isLineObject(obj: any): obj is LineObject {
  return obj?.type === 'LineString' || obj?.type === 'MultiLineString';
}

export function isLineGeometry(
  obj: any,
  shallow: boolean = true,
): obj is LineGeometry {
  if (typeof obj?.type !== 'string') return false;
  if (isLineObject(obj) === true) return true;

  if (
    obj.type !== 'GeometryCollection' ||
    Array.isArray(obj?.geometries) ||
    obj.geometries.length === 0
  )
    return false;

  if (shallow === true) return isLineObject(obj.geometries[0]);
  return obj.geometries.every((g: any) => isLineObject(g));
}

export function isAreaObject(obj: any): obj is AreaObject {
  return (
    ((obj?.type === 'Point' || obj?.type === 'MultiPoint') &&
      typeof obj?.radius === 'number') ||
    obj?.type === 'Polygon' ||
    obj?.type === 'MultiPolygon'
  );
}

export function isAreaGeometry(
  obj: any,
  shallow: boolean = true,
): obj is AreaGeometry {
  if (typeof obj?.type !== 'string') return false;
  if (isAreaObject(obj) === true) return true;

  if (
    obj.type !== 'GeometryCollection' ||
    Array.isArray(obj?.geometries) ||
    obj.geometries.length === 0
  )
    return false;

  if (shallow === true) return isAreaObject(obj.geometries[0]);
  return obj.geometries.every((g: any) => isAreaObject(g));
}

export function isBaseGeometry(obj: any): obj is BaseGeometry {
  if (typeof obj?.type !== 'string') return false;
  return isPointObject(obj) || isLineObject(obj) || isAreaObject(obj);
}
