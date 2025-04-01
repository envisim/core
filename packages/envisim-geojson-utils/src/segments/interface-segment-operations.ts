import type * as GJ from "../geojson.js";

export interface SegmentOperations {
  /**
   * Computes the shortest distance in meters between two point coordinates.
   *
   * @param p1 point coordinates [lon,lat].
   * @param p2 point coordinates [lon,lat].
   * @returns the distance in meters.
   */
  distance(p1: GJ.Position, p2: GJ.Position): number;

  /**
   * Computes the destination point on a geodesic path given a point,
   * a distance and an azimuth.
   *
   * @param point point coordinates [lon,lat].
   * @param dist the distance in meters.
   * @param azimuth azimuth (angle) clockwise from north in degrees.
   * @returns the coordinates [lon,lat] of the destination point.
   */
  destination(point: GJ.Position, dist: number, azimuth: number): GJ.Position2;

  /**
   * Computes the destination point on a geodesic path given a point,
   * a distance and an azimuth.
   *
   * @param point point coordinates [lon,lat].
   * @param dist the distance in meters.
   * @param azimuth azimuth (angle) clockwise from north in degrees.
   * @returns the coordinates [lon,lat] of the destination point.
   */
  destinationUnrolled(point: GJ.Position, dist: number, azimuth: number): GJ.Position2;

  /**
   * Computes the forward azimuth (angle from north) from the first point
   * to the second point for a geodesic path between the points.
   * The azimuth takes values in the range -180 to +180.
   *
   * @param p1 point coordinates [lon,lat] for first point.
   * @param p2 point coordinates [lon,lat] for second point.
   * @returns the forward azimuth in degrees.
   */
  forwardAzimuth(p1: GJ.Position, p2: GJ.Position): number;

  /**
   * Computes the forward azimuth (angle from north) from the first point
   * to the second point for a geodesic path between the points.
   * The azimuth takes values in the range -180 to +180.
   *
   * @param p1 point coordinates [lon,lat] for first point.
   * @param p2 point coordinates [lon,lat] for second point.
   * @returns the forward azimuth in degrees.
   */
  forwardAzimuthDistance(p1: GJ.Position, p2: GJ.Position): [number, number];

  /**
   * Computes an intermediate point on a geodesic path given a start point,
   * an end point and the fraction of the distance.
   *
   * @param p1 point coordinates [lon,lat] for start point.
   * @param p2 point coordinates [lon,lat] for end point.
   * @param fraction the fraction of distance between the points.
   * @returns the coordinates [lon,lat] of the intermediate point.
   */
  intermediate(p1: GJ.Position, p2: GJ.Position, fraction: number): GJ.Position2;

  /**
   * Computes the area of a polygon ring where the segments are the shortest
   * (geodesic) paths between the points.
   * @param coords coordinates of a polygon ring.
   * @returns the area in square meters.
   */
  areaOfRing(coords: GJ.Position[]): number;
}
