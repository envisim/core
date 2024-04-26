// Basic
export type PositionXY = [number, number];
export type PositionXYZ = [number, number, number];
export type Position = PositionXY | PositionXYZ;
export type BBoxXY = [number, number, number, number];
export type BBoxXYZ = [number, number, number, number, number, number];
export type BBox = BBoxXY | BBoxXYZ;

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
export type NumericProperties = {[name: string]: number};
export type NumericFeatureProperties = NumericProperties | null;
export type FeatureProperties = {[name: string]: any} | null;

export interface Feature extends GeoJsonObject<'Feature'> {
  type: 'Feature';
  geometry: Geometry;
  properties: FeatureProperties;
}

export interface BaseFeature<T extends Geometry | null>
  extends GeoJsonObject<'Feature'> {
  type: 'Feature';
  geometry: T;
  properties: NumericFeatureProperties;
}

export type PointFeature = BaseFeature<PointGeometry>;
export type LineFeature = BaseFeature<LineGeometry>;
export type AreaFeature = BaseFeature<AreaGeometry>;

// FeatureCollections
export interface FeatureCollection extends GeoJsonObject<'FeatureCollection'> {
  type: 'FeatureCollection';
  features: Feature[];
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
