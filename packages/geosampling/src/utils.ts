const RADIUS_METER: number = 6371071;
const DEGREES_TO_RADIANS = Math.PI / 180.0;

/**
 * @param p1 - array of [lat, long]
 * @param p2 - array of [lat, long]
 */
export const distanceInMeters = (p1: number[], p2: number[]): number => {
  const phi1 = p1.map((e) => e * DEGREES_TO_RADIANS);
  const phi2 = p2.map((e) => e * DEGREES_TO_RADIANS);
  const delta = [phi2[0] - phi1[0], phi2[1] - phi1[1]];
  const a =
    Math.pow(Math.sin(delta[1] * 0.5), 2) +
    Math.cos(phi2[0]) *
      Math.cos(phi2[1]) *
      Math.pow(Math.sin(delta[0] * 0.5), 2);
  const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
  return RADIUS_METER * c;
};
