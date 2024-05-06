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
export interface MultiLineString
  extends BaseObject<'MultiLineString', Position[][]> {}
export type LineObject = LineString | MultiLineString;

export interface Polygon extends BaseObject<'Polygon', Position[][]> {}
export interface MultiPolygon
  extends BaseObject<'MultiPolygon', Position[][][]> {}
export interface Circle extends BaseObject<'Point', Position> {
  radius: number;
}
export interface MultiCircle extends BaseObject<'MultiPoint', Position[]> {
  radius: number;
}
export type AreaObject = Polygon | MultiPolygon | Circle | MultiCircle;

export type Object = PointObject | LineObject | AreaObject;

// GEOMETRY COLLECTIONS
export interface BaseGeometryCollection<G extends BaseGeometry = Object>
  extends GeoJsonObject<'GeometryCollection'> {
  geometries: G[];
}
export type GeometryCollection<O extends Object> = BaseGeometryCollection<O>;
export type PointGeometryCollection = GeometryCollection<PointObject>;
export type LineGeometryCollection = GeometryCollection<LineObject>;
export type AreaGeometryCollection = GeometryCollection<AreaObject>;

// GEOMETRIES
export type BaseGeometry = Object | BaseGeometryCollection;
export type PointGeometry = PointObject | PointGeometryCollection;
export type LineGeometry = LineObject | LineGeometryCollection;
export type AreaGeometry = AreaObject | AreaGeometryCollection;
export type Geometry = PointGeometry | LineGeometry | AreaGeometry;

// FEATURES
export interface BaseFeature<
  G extends BaseGeometry | null = Geometry,
  P = number,
> extends GeoJsonObject<'Feature'> {
  geometry: G;
  properties: FeatureProperties<P> | null;
}
export interface Feature<G extends Geometry = Geometry>
  extends BaseFeature<G, number> {}
export interface PointFeature extends Feature<PointGeometry> {}
export interface LineFeature extends Feature<LineGeometry> {}
export interface AreaFeature extends Feature<AreaGeometry> {}

// FEATURE COLLECTIONS
export interface BaseFeatureCollection<F extends BaseFeature>
  extends GeoJsonObject<'FeatureCollection'> {
  features: F[];
}
export interface FeatureCollection<F extends Feature = Feature>
  extends BaseFeatureCollection<F> {}
export interface PointFeatureCollection
  extends FeatureCollection<PointFeature> {}
export interface LineFeatureCollection extends FeatureCollection<LineFeature> {}
export interface AreaFeatureCollection extends FeatureCollection<AreaFeature> {}
