import LatLon1 from 'geodesy/latlon-ellipsoidal-vincenty.js';
const LatLon = LatLon1 as any;

// Wrappers to simplify for GeoJSON coordinates [longitude, latitude].

/**
 * Computes distance in meters between two point coordinates.
 *
 * @param p1 - Point coordinates [longitude,latitude].
 * @param p2 - Point coordinates [longitude,latitude].
 * @returns - The distance in meters.
 */
export const distance = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
): number => {
  const latlon1 = new LatLon(p1[1], p1[0]);
  const latlon2 = new LatLon(p2[1], p2[0]);
  return latlon1.distanceTo(latlon2);
};

/**
 * Computes the destination point given a point and distance and bearing.
 *
 * @param point - Point coordinates [longitude,latitude].
 * @param dist - The distance in meters.
 * @param brng - Bearing (angle) clockwise from north in degrees.
 * @returns - The coordinates [longitude,latitude] of the destination point.
 */
export const destinationPoint = (
  point: GeoJSON.Position,
  dist: number,
  brng: number,
): GeoJSON.Position => {
  const latlon1 = new LatLon(point[1], point[0]);
  const latlon2 = latlon1.destinationPoint(dist, brng);
  return [latlon2.lon, latlon2.lat];
};

/**
 * Computes an intermediate point given a start point and an end point and the
 * fraction of the distance.
 *
 * @param p1 - Point coordinates [longitude,latitude] for start point.
 * @param p2 - Point coordinates [longitude,latitude] for end point.
 * @param fraction - The fraction of distance between the points.
 * @returns - The coordinates [longitude,latitude] of the intermediate point.
 */
export const intermediatePoint = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
  fraction: number,
): GeoJSON.Position => {
  const latlon1 = new LatLon(p1[1], p1[0]);
  const latlon2 = new LatLon(p2[1], p2[0]);
  const brng = latlon1.initialBearingTo(latlon2);
  const distance = latlon1.distanceTo(latlon2);
  const latlon3 = latlon1.destinationPoint(distance * fraction, brng);
  //const latlon3 = latlon1.intermediatePointTo(latlon2, fraction);
  return [latlon3.lon, latlon3.lat];
};

/**
 * Computes the initial bearing from the first point to the second point.
 *
 * @param p1 - Point coordinates [longitude,latitude] for first point.
 * @param p2 - Point coordinates [longitude,latitude] for second point.
 * @returns - The initial bearing in degrees.
 */
export const initialBearing = (
  p1: GeoJSON.Position,
  p2: GeoJSON.Position,
): number => {
  const latlon1 = new LatLon(p1[1], p1[0]);
  const latlon2 = new LatLon(p2[1], p2[0]);
  return latlon1.initialBearingTo(latlon2);
};
