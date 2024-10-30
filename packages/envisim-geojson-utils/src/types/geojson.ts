// BASICS
// Position
export type Position2 = [number, number];
export type Position3 = [number, number, number];
export type Position = Position2 | Position3;

// BBox
export type BBox2 = [number, number, number, number];
export type BBox3 = [number, number, number, number, number, number];
export type BBox = BBox2 | BBox3;

// GeoJsonObject
export interface GeoJsonObject<T extends string> {
  type: T;
  bbox?: BBox;
}

// Properties
export type FeatureProperties<P = number> = {[name: string]: P};

// OBJECTS
export interface BaseObject<T extends string, C> extends GeoJsonObject<T> {
  coordinates: C;
}

export interface Point extends BaseObject<'Point', Position> {}
export interface MultiPoint extends BaseObject<'MultiPoint', Position[]> {}
export type PointObject = Point | MultiPoint;

export interface LineString extends BaseObject<'LineString', Position[]> {}
export interface MultiLineString extends BaseObject<'MultiLineString', Position[][]> {}
export type LineObject = LineString | MultiLineString;

export interface Polygon extends BaseObject<'Polygon', Position[][]> {}
export interface MultiPolygon extends BaseObject<'MultiPolygon', Position[][][]> {}
export interface Circle extends BaseObject<'Point', Position> {
  radius: number;
}
export interface MultiCircle extends BaseObject<'MultiPoint', Position[]> {
  radius: number;
}
export type AreaObject = Polygon | MultiPolygon | Circle | MultiCircle;

export type SingleTypeObject = PointObject | LineObject | AreaObject;

// GEOMETRY COLLECTIONS
export interface BaseGeometryCollection<G extends BaseGeometry = BaseGeometry>
  extends GeoJsonObject<'GeometryCollection'> {
  geometries: G[];
}
export type GeometryCollection<O extends SingleTypeObject> = BaseGeometryCollection<O>;
export type PointGeometryCollection = GeometryCollection<PointObject>;
export type LineGeometryCollection = GeometryCollection<LineObject>;
export type AreaGeometryCollection = GeometryCollection<AreaObject>;

// GEOMETRIES
export type BaseGeometry = SingleTypeObject | BaseGeometryCollection;
export type PointGeometry = PointObject | PointGeometryCollection;
export type LineGeometry = LineObject | LineGeometryCollection;
export type AreaGeometry = AreaObject | AreaGeometryCollection;
export type Geometry = PointGeometry | LineGeometry | AreaGeometry;

// FEATURES
export interface BaseFeature<G extends BaseGeometry | null = BaseGeometry, P = any>
  extends GeoJsonObject<'Feature'> {
  geometry: G;
  properties: FeatureProperties<P> | null;
}
export type Feature<G extends Geometry = Geometry> = BaseFeature<G, number>;
export type PointFeature = Feature<PointGeometry>;
export type LineFeature = Feature<LineGeometry>;
export type AreaFeature = Feature<AreaGeometry>;

// FEATURE COLLECTIONS
export interface BaseFeatureCollection<F extends BaseFeature = BaseFeature>
  extends GeoJsonObject<'FeatureCollection'> {
  features: F[];
}
export type FeatureCollection<F extends Feature = Feature> = BaseFeatureCollection<F>;
export type PointFeatureCollection = FeatureCollection<PointFeature>;
export type LineFeatureCollection = FeatureCollection<LineFeature>;
export type AreaFeatureCollection = FeatureCollection<AreaFeature>;
