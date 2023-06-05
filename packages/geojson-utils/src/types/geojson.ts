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
export interface Circle extends GeoJsonObject<'Point'> {
  type: 'Point';
  coordinates: Position;
  radius: number;
}
export interface MultiPoint extends GeoJsonObject<'MultiPoint'> {
  type: 'MultiPoint';
  coordinates: Position[];
  radius?: undefined;
}
export interface MultiCircle extends GeoJsonObject<'MultiPoint'> {
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
export type AreaObject = Circle | MultiCircle | Polygon | MultiPolygon;

export type BaseGeometry = PointObject | LineObject | AreaObject;
export type Geometry = BaseGeometry | GeometryCollection;
export type PointGeometry = PointObject | PointGeometryCollection;
export type LineGeometry = LineObject | LineGeometryCollection;
export type AreaGeometry = AreaObject | AreaGeometryCollection;

// Features
export type FeatureProperties = {[name: string]: number} | null;
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
