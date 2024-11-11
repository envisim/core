import geodesic from 'geographiclib-geodesic';

import type * as GJ from '../types/geojson.js';

const GEOD = geodesic.Geodesic.WGS84;
const GEOD_INVERSE_DIST = geodesic.Geodesic.DISTANCE;
const GEOD_INVERSE_AZI = geodesic.Geodesic.AZIMUTH;
const GEOD_INVERSE_AZI_DIST = geodesic.Geodesic.DISTANCE | geodesic.Geodesic.AZIMUTH;
const GEOD_DIRECT_OPTS = geodesic.Geodesic.LONGITUDE | geodesic.Geodesic.LATITUDE;
const GEOD_DIRECT_OPTS_UNROLLED = GEOD_DIRECT_OPTS | geodesic.Geodesic.LONG_UNROLL;

interface GeodesicPolygon {
  AddPoint(a0: number, a1: number): void;
  Compute(a0: boolean, a1: boolean): {area: number};
}

export class Geodesic {
  /**
   * Computes the shortest distance in meters between two point coordinates.
   *
   * @param p1 point coordinates [lon,lat].
   * @param p2 point coordinates [lon,lat].
   * @returns the distance in meters.
   */
  static distance(p1: GJ.Position, p2: GJ.Position): number {
    const result = GEOD.Inverse(p1[1], p1[0], p2[1], p2[0], GEOD_INVERSE_DIST);
    if (typeof result.s12 === 'number') {
      return result.s12;
    }
    // should never be reached
    throw new Error('Not able to compute distance.');
  }

  /**
   * Computes the destination point on a geodesic path given a point,
   * a distance and an azimuth.
   *
   * @param point point coordinates [lon,lat].
   * @param dist the distance in meters.
   * @param azimuth azimuth (angle) clockwise from north in degrees.
   * @returns the coordinates [lon,lat] of the destination point.
   */
  static destination(point: GJ.Position, dist: number, azimuth: number): GJ.Position2 {
    const result = GEOD.Direct(point[1], point[0], (azimuth + 360) % 360, dist, GEOD_DIRECT_OPTS);
    if (typeof result.lon2 === 'number' && typeof result.lat2 === 'number') {
      return [result.lon2, result.lat2];
    }
    // should never be reached
    throw new Error('Not able to compute destination point.');
  }

  /**
   * Computes the destination point on a geodesic path given a point,
   * a distance and an azimuth.
   *
   * @param point point coordinates [lon,lat].
   * @param dist the distance in meters.
   * @param azimuth azimuth (angle) clockwise from north in degrees.
   * @returns the coordinates [lon,lat] of the destination point.
   */
  static destinationUnrolled(point: GJ.Position, dist: number, azimuth: number): GJ.Position2 {
    const result = GEOD.Direct(
      point[1],
      point[0],
      (azimuth + 360) % 360,
      dist,
      GEOD_DIRECT_OPTS_UNROLLED,
    );
    if (typeof result.lon2 === 'number' && typeof result.lat2 === 'number') {
      return [result.lon2, result.lat2];
    }
    // should never be reached
    throw new Error('Not able to compute destination point.');
  }

  /**
   * Computes the forward azimuth (angle from north) from the first point
   * to the second point for a geodesic path between the points.
   * The azimuth takes values in the range -180 to +180.
   *
   * @param p1 point coordinates [lon,lat] for first point.
   * @param p2 point coordinates [lon,lat] for second point.
   * @returns the forward azimuth in degrees.
   */
  static forwardAzimuth(p1: GJ.Position, p2: GJ.Position): number {
    const result = GEOD.Inverse(p1[1], p1[0], p2[1], p2[0], GEOD_INVERSE_AZI);
    if (typeof result.azi1 === 'number') {
      return result.azi1;
    }
    // should never be reached
    throw new Error('Not able to compute forward azimuth');
  }

  /**
   * Computes the forward azimuth (angle from north) from the first point
   * to the second point for a geodesic path between the points.
   * The azimuth takes values in the range -180 to +180.
   *
   * @param p1 point coordinates [lon,lat] for first point.
   * @param p2 point coordinates [lon,lat] for second point.
   * @returns the forward azimuth in degrees.
   */
  static forwardAzimuthDistance(p1: GJ.Position, p2: GJ.Position): [number, number] {
    const result = GEOD.Inverse(p1[1], p1[0], p2[1], p2[0], GEOD_INVERSE_AZI_DIST);
    if (typeof result.azi1 === 'number' && typeof result.s12 === 'number') {
      return [result.azi1, result.s12];
    }

    // should never be reached
    throw new Error('Not able to compute forward azimuth');
  }

  /**
   * Computes an intermediate point on a geodesic path given a start point,
   * an end point and the fraction of the distance.
   *
   * @param p1 point coordinates [lon,lat] for start point.
   * @param p2 point coordinates [lon,lat] for end point.
   * @param fraction the fraction of distance between the points.
   * @returns the coordinates [lon,lat] of the intermediate point.
   */
  static intermediate(p1: GJ.Position, p2: GJ.Position, fraction: number): GJ.Position {
    const [azimuth, dist] = Geodesic.forwardAzimuthDistance(p1, p2);

    if (typeof dist === 'number' && typeof azimuth === 'number') {
      const result2 = GEOD.Direct(p1[1], p1[0], azimuth, dist * fraction, GEOD_DIRECT_OPTS);
      if (typeof result2.lon2 === 'number' && typeof result2.lat2 === 'number') {
        return [result2.lon2, result2.lat2];
      }
    }

    throw new Error('Not able to compute intermediate point.');
  }

  /**
   * Computes the area of a polygon ring where the segments are the shortest
   * (geodesic) paths between the points.
   * @param coords coordinates of a polygon ring.
   * @returns the area in square meters.
   */
  static areaOfRing(coords: GJ.Position[]): number {
    const p = GEOD.Polygon(false) as GeodesicPolygon;
    const n = coords.length;

    for (let i = 0; i < n; i++) {
      // add point as (lat,lon)
      p.AddPoint(coords[i][1], coords[i][0]);
    }
    // compute and return area
    return Math.abs(p.Compute(false, true).area);
  }
}
