/**
 * @module @envisim/geojson-utils/rhumb
 */
import type * as GJ from "../geojson.js";

// This javascript (typescript) implementation for rhumb lines is based on the
// algorithms described in the following papers. Primarily the first two.
// On auxiliary latitudes, C. F. F. Karney 2023, https://arxiv.org/pdf/2212.05818.pdf
// The area of rhumb polygons, C. F. F. Karney 2023, https://arxiv.org/pdf/2303.03219.pdf
// Algorithms for geodesics, C. F. F. Karney, 2013, J. Geodesy, 87(1), 43–55, doi:10.1007/s00190-012-0578-z.

// Explanation of some notations in the papers (and here)

// a - equatorial radius
// b - polar semi-axis
// f - flattening
// n - (a-b)/(a+b) third flattening
// phi - latitude in radians
// lambda - longitude in radians
// alpha - azimuth in radians
// chi - conformal latitude
// mu - rectifying latitude
// beta - parametric latitude
// psi - isometric latitude
// xi - authalic latitude
// e = eccentricity
// R = rectifying radius

// some relations

// beta = atan((1-f)tan(phi))
// psi = gd^-1(psi) - e * atanh(e * sin(phi))
// gd = "gudermannian function"
// gd^-1(x) = asinh(tan(x))
// gd(psi) = atan(sinh(psi))
// chi = gd(psi)

// WGS84 ellipsoid parameters
const a = 6378137.0;
const b = 6356752.314245;
const f = 1 / 298.257223563;
const n = (a - b) / (a + b);
const e = Math.sqrt((a ** 2 - b ** 2) / a ** 2);

// See (5), The area of rhumb polygons.
const R = (a / (1 + n)) * (1 + (1 / 4) * n ** 2 + (1 / 64) * n ** 4 + (1 / 256) * n ** 6);

// See (10), The area of rhumb polygons.
const c2 = a ** 2 / 2 + ((b ** 2 / 2) * Math.atanh(e)) / e;

// See (25), The area of rhumb polygons.
const Q: number[][] = [
  [-1 / 3, 22 / 45, -398 / 945, 596 / 2025, -102614 / 467775, 138734126 / 638512875],
  [0, 1 / 5, -118 / 315, 1543 / 4725, -24562 / 155925, 17749373 / 425675250],
  [0, 0, -17 / 315, 152 / 945, -38068 / 155925, 1882432 / 8513505],
  [0, 0, 0, 5 / 252, -752 / 10395, 268864 / 2027025],
  [0, 0, 0, 0, -101 / 17325, 62464 / 2027025],
  [0, 0, 0, 0, 0, 11537 / 4054050],
];

// See (24), The area of rhumb polygons.
const N = [n, n ** 2, n ** 3, n ** 4, n ** 5, n ** 6];

// See (22), The area of rhumb polygons.
const P = [
  Q[0][0] * N[0] +
    Q[0][1] * N[1] +
    Q[0][2] * N[2] +
    Q[0][3] * N[3] +
    Q[0][4] * N[4] +
    Q[0][5] * N[5],
  Q[1][1] * N[1] + Q[1][2] * N[2] + Q[1][3] * N[3] + Q[1][4] * N[4] + Q[1][5] * N[5],
  Q[2][2] * N[2] + Q[2][3] * N[3] + Q[2][4] * N[4] + Q[2][5] * N[5],
  Q[3][3] * N[3] + Q[3][4] * N[4] + Q[3][5] * N[5],
  Q[4][4] * N[4] + Q[4][5] * N[5],
  Q[5][5] * N[5],
];

// See (15), The area of rhumb polygons.
function p_0(chi: number): number {
  return Math.asinh((Math.tan(chi) * Math.sin(chi)) / 2);
}

// See (21), The area of rhumb polygons.
function p_beta(beta: number): number {
  let s = 0;
  for (let i = 0; i < 6; i++) {
    s += P[i] * Math.cos((i + 1) * 2 * beta);
  }
  return s;
}

// Conversion between degrees and radians
const TO_RAD = Math.PI / 180.0;
const TO_DEG = 180.0 / Math.PI;

// Gudermannian inverse function
function gdInverse(x: number): number {
  return Math.asinh(Math.tan(x));
}

// Closed formula for finding the isometric latitude psi from phi.
function psiFromPhi(phi: number): number {
  return gdInverse(phi) - e * Math.atanh(e * Math.sin(phi));
}

// Closed formula for computing the parametric latitude beta from phi.
function betaFromPhi(phi: number) {
  return Math.atan((1 - f) * Math.tan(phi));
}

// Matrix with coefficients for finding mu from phi.
// See Appendix in On auxiliary latitudes.
const C_mu_phi: number[][] = [
  [-3 / 2, 0, 9 / 16, 0, -3 / 32, 0],
  [0, 15 / 16, 0, -15 / 32, 0, 135 / 2048],
  [0, 0, -35 / 48, 0, 105 / 256, 0],
  [0, 0, 0, 315 / 512, 0, -189 / 512],
  [0, 0, 0, 0, -693 / 1280, 0],
  [0, 0, 0, 0, 0, 1001 / 2048],
];

// Matrix with coefficients for finding phi from mu.
// See Appendix in On auxiliary latitudes.
const C_phi_mu: number[][] = [
  [3 / 2, 0, -27 / 32, 0, 269 / 512, 0],
  [0, 21 / 16, 0, -55 / 32, 0, 6759 / 4096],
  [0, 0, 151 / 96, 0, -417 / 128, 0],
  [0, 0, 0, 1097 / 512, 0, -15543 / 2560],
  [0, 0, 0, 0, 8011 / 2560, 0],
  [0, 0, 0, 0, 0, 293393 / 61440],
];

// Matrix with coefficients for finding chi from phi.
// See Appendix in On auxiliary latitudes.
const C_chi_phi: number[][] = [
  [-2, 2 / 3, 4 / 3, -82 / 45, 32 / 45, 4642 / 4725],
  [0, 5 / 3, -16 / 15, -13 / 9, 904 / 315, -1522 / 945],
  [0, 0, -26 / 15, 34 / 21, 8 / 5, -12686 / 2835],
  [0, 0, 0, 1237 / 630, -12 / 5, -24832 / 14175],
  [0, 0, 0, 0, -734 / 315, 109598 / 31185],
  [0, 0, 0, 0, 0, 444337 / 155925],
];

// Matrix with coefficients for finding xi from phi.
// See Appendix in On auxiliary latitudes.
const C_xi_phi: number[][] = [
  [-4 / 3, -4 / 45, 88 / 315, 538 / 4725, 20824 / 467775, -44732 / 2837835],
  [0, 34 / 45, 8 / 105, -2482 / 14175, -37192 / 467775, -12467764 / 212837625],
  [0, 0, -1532 / 2835, -898 / 14175, 54968 / 467775, 100320856 / 1915538625],
  [0, 0, 0, 6007 / 14175, 24496 / 467775, -5884124 / 70945875],
  [0, 0, 0, 0, -23356 / 66825, -839792 / 19348875],
  [0, 0, 0, 0, 0, 570284222 / 1915538625],
];

// Computes auxiliary latitudes, given the from latitude and the
// matrix with coefficients. See (16) in On auxiliary latitudes.
function auxiliary(from: number, C: number[][]): number {
  const S = [2, 4, 6, 8, 10, 12].map((x) => Math.sin(x * from));
  return (
    (C[0][0] * N[0] +
      C[0][1] * N[1] +
      C[0][2] * N[2] +
      C[0][3] * N[3] +
      C[0][4] * N[4] +
      C[0][5] * N[5]) *
      S[0] +
    (C[1][1] * N[1] + C[1][2] * N[2] + C[1][3] * N[3] + C[1][4] * N[4] + C[1][5] * N[5]) * S[1] +
    (C[2][2] * N[2] + C[2][3] * N[3] + C[2][4] * N[4] + C[2][5] * N[5]) * S[2] +
    (C[3][3] * N[3] + C[3][4] * N[4] + C[3][5] * N[5]) * S[3] +
    (C[4][4] * N[4] + C[4][5] * N[5]) * S[4] +
    C[5][5] * N[5] * S[5] +
    from
  );
}

const rhumbAzi12 = 1 << 0;
const rhumbS12 = 1 << 1;
const rhumbOutmask = {
  azi12: rhumbAzi12,
  s12: rhumbS12,
  both: rhumbAzi12 | rhumbS12,
};
// See: The area of rhumb polygons
// Results seem to match https://geographiclib.sourceforge.io/cgi-bin/RhumbSolve
// closely, but precision is slightly less here due to use of the
// simpler algorithm for the phi1 close to phi2 case. At worst, if there is no
// mistake in the implementation, the distance could be off by 0.1 mm, but often
// it is much better than that.
// Internal function.
function inverseRhumbLine(
  p1: GJ.Position,
  p2: GJ.Position,
  output: number = rhumbOutmask.both,
): { azi12?: number; s12?: number } {
  const phi1 = p1[1] * TO_RAD;
  const phi2 = p2[1] * TO_RAD;
  const psi1 = psiFromPhi(phi1);
  const psi2 = psiFromPhi(phi2);
  const psi12 = psi2 - psi1;
  let lambda12 = (p2[0] - p1[0]) * TO_RAD;
  if (Math.abs(lambda12) > Math.PI) {
    lambda12 = lambda12 > 0 ? lambda12 - 2 * Math.PI : lambda12 + 2 * Math.PI;
  }
  const res: { azi12?: number; s12?: number } = {};
  // Compute forward azimuth
  if (output & rhumbAzi12) {
    res.azi12 = Math.atan(lambda12 / psi12) * TO_DEG;
  }
  // Compute distance s12
  if (output & rhumbS12) {
    const transitionPointDegrees = 0.001;
    let s12 = Math.sqrt(lambda12 ** 2 + psi12 ** 2);
    if (Math.abs(phi1 - phi2) * TO_DEG < transitionPointDegrees) {
      const beta = betaFromPhi((phi1 + phi2) / 2);
      s12 *= a * Math.cos(beta);
    } else {
      const mu1 = auxiliary(phi1, C_mu_phi);
      const mu2 = auxiliary(phi2, C_mu_phi);
      const mu12 = mu2 - mu1;
      s12 *= (R * mu12) / psi12;
    }
    res.s12 = s12;
  }
  return res;
}

// See: The area of rhumb polygons
// Results seem to match https://geographiclib.sourceforge.io/cgi-bin/RhumbSolve
// closely, but precision is slightly less here due to use of the
// simpler algorithm for the phi1 close to phi2 case.

/**
 * Computes the distance in meters along a rhumb line between two point coordinates.
 *
 * @param p1 point coordinates [lon,lat].
 * @param p2 point coordinates [lon,lat].
 * @returns the distance in meters.
 */
export function distance(p1: GJ.Position, p2: GJ.Position): number {
  return inverseRhumbLine(p1, p2, rhumbOutmask.s12).s12 ?? 0.0;
}

/**
 * Computes the destination point on a rhumb line given a point,
 * a distance and an azimuth.
 *
 * @param origin point coordinates [lon,lat].
 * @param dist the distance in meters.
 * @param azimuth azimuth (angle) clockwise from north in degrees.
 * @returns the coordinates [lon,lat] of the destination point.
 */
export function destination(origin: GJ.Position, dist: number, azimuth: number): GJ.Position2 {
  const s12 = dist;
  const phi1 = origin[1] * TO_RAD;
  const alpha12 = azimuth * TO_RAD;
  const mu12 = (s12 / R) * Math.cos(alpha12);
  const mu1 = auxiliary(phi1, C_mu_phi);
  let mu2 = mu12 + mu1;
  // If mu2 is outside of [-pi/2, pi/2], then it should be replaced
  // by its supplement. Because in this case, the rhumb line has spiraled
  // infinately many times around the pole and lambda12 is then indeterminate.
  if (Math.abs(mu2) > Math.PI / 2) {
    mu2 = mu2 > 0 ? Math.PI - mu2 : -Math.PI - mu2;
  }
  // If mu2 = +/- pi/2, then psi12 = +/- Infinity, and lambda12 is indeterminate.
  // In this case, throw an error (or return NaNs?)
  // Should a tolerance be used here?
  if (Math.abs(mu2) == Math.PI / 2) {
    throw new Error("Rhumb line passes through a pole!");
  }
  const phi2 = auxiliary(mu2, C_phi_mu);
  const psi1 = psiFromPhi(phi1);
  const psi2 = psiFromPhi(phi2);
  const psi12 = psi2 - psi1;
  const transitionPointDegrees = 0.001;
  let lambda12 = s12 * Math.sin(alpha12);
  if (Math.abs(phi2 - phi1) * TO_DEG < transitionPointDegrees) {
    // Special case if phi2 is approximately equal to phi1.
    // In that case lambda12 = s12 * Math.sin(alpha12) / (a * Math.cos(beta)).
    // where beta is evaluated at the midpoint of phi1 and phi2.
    const beta = betaFromPhi((phi1 + phi2) / 2);
    lambda12 /= a * Math.cos(beta);
  } else {
    lambda12 *= psi12 / (mu12 * R);
  }
  const lambda1 = origin[0] * TO_RAD;
  const lambda2 = lambda1 + lambda12;
  let lon2 = lambda2 * TO_DEG;
  lon2 = ((lon2 + 540) % 360) - 180;
  let lat2 = phi2 * TO_DEG;
  if (Math.abs(lat2) > 90) {
    lat2 = lat2 > 0 ? 180 - lat2 : -180 - lat2;
  }
  // Return the destination point
  return [lon2, lat2];
}

/**
 * Computes the forward azimuth (angle from north) from the first point
 * to the second point for a rhumb line between the points.
 * The azimuth takes values in the range -180 to +180.
 *
 * @param p1 point coordinates [lon,lat] for first point.
 * @param p2 point coordinates [lon,lat] for second point.
 * @returns the forward azimuth in degrees.
 */
export function forwardAzimuth(p1: GJ.Position, p2: GJ.Position): number {
  return inverseRhumbLine(p1, p2, rhumbOutmask.azi12).azi12 ?? 0.0;
}

/**
 * Computes an intermediate point on a rhumb line given a start point,
 * an end point and the fraction of the distance.
 *
 * @param p1 point coordinates [lon,lat] for start point.
 * @param p2 point coordinates [lon,lat] for end point.
 * @param fraction the fraction of distance between the points.
 * @returns the coordinates [lon,lat] of the intermediate point.
 */
export function intermediate(p1: GJ.Position, p2: GJ.Position, fraction: number): GJ.Position2 {
  const res = inverseRhumbLine(p1, p2, rhumbOutmask.both);
  // Here both s12 and azi12 are needed.
  const azi12 = res.azi12 ?? 0.0;
  const s12 = res.s12 ?? 0.0;
  return destination(p1, s12 * fraction, azi12);
}

/**
 * Computes the area of a rhumb polygon ring
 * @param ring
 * @returns the area in square meters.
 */
export function areaOfRing(ring: GJ.Position[]): number {
  const o = ring.map((coord) => {
    const lambda = coord[0] * TO_RAD;
    const phi = coord[1] * TO_RAD;
    const chi = auxiliary(phi, C_chi_phi);
    const psi = psiFromPhi(phi);
    const beta = betaFromPhi(phi);
    const p = p_0(chi) + p_beta(beta);
    return { lambda, phi, chi, psi, beta, p };
  });
  const nr = ring.length;
  let S = 0; // Aggregate the area under the rhumb segments.
  const transitionPointDegrees = 0.001;

  // Count the number of segments that crosses antimeridian
  let crosses = 0;

  for (let i = 1; i < nr; i++) {
    // Check if the segment crosses antimeridian
    if (Math.abs(ring[i][0] - ring[i - 1][0]) > 180) {
      crosses++;
    }
    const o1 = o[i - 1];
    const o2 = o[i];
    let lambda12 = o2.lambda - o1.lambda;
    if (Math.abs(lambda12) > Math.PI) {
      lambda12 = lambda12 > 0 ? lambda12 - 2 * Math.PI : lambda12 + 2 * Math.PI;
    }
    let S12 = c2 * lambda12;
    if (Math.abs(o2.phi - o1.phi) * TO_DEG < transitionPointDegrees) {
      const xi = auxiliary((o2.phi + o1.phi) / 2, C_xi_phi);
      S12 *= Math.sin(xi);
    } else {
      const p12 = o2.p - o1.p;
      const psi12 = o2.psi - o1.psi;
      S12 *= p12 / psi12;
    }
    S += S12;
  }
  // Matches closely the result at https://geographiclib.sourceforge.io/cgi-bin/Planimeter
  // for rhumb polygons. Extreme cases has NOT been tested.
  // If the ring encloses a pole, then the term 2 * Math.PI * c2 should be added to the result.
  // See Karney 2013 for details.
  // Odd number of segments that crosses antimeridian implies a pole.
  return crosses % 2 === 0 ? Math.abs(S) : 2 * Math.PI * c2 - Math.abs(S);
}

// See:https://geographiclib.sourceforge.io/C++/doc/rhumb.html#platecarreearea

const M = [
  [
    1,
    -4 / 9,
    -274 / 675,
    -2468 / 19845,
    48142 / 1488375,
    3814124 / 108056025,
    -35827479502 / 9587270818125,
  ],
  [
    0,
    -4 / 9,
    -112 / 675,
    4012 / 19845,
    306496 / 1488375,
    1613548 / 21611205,
    -5765564176 / 9587270818125,
  ],
  [0, 0, 6 / 25, 8 / 49, -43132 / 496125, -4668968 / 36018675, -197327562308 / 3195756939375],
  [0, 0, 0, -8 / 49, -544 / 3969, 330052 / 7203735, 2313624304 / 25566055515],
  [0, 0, 0, 0, 10 / 81, 3400 / 29403, -399980 / 14907321],
  [0, 0, 0, 0, 0, -12 / 121, -2032 / 20449],
  [0, 0, 0, 0, 0, 0, 14 / 169],
];

const N7 = [1, ...N];

function F(phi: number): number {
  const C = [1, ...[2, 4, 6, 8, 10, 12].map((x) => Math.cos(x * phi))];
  return (
    -Math.cos(phi) *
    ((M[0][0] * N7[0] +
      M[0][1] * N7[1] +
      M[0][2] * N7[2] +
      M[0][3] * N7[3] +
      M[0][4] * N7[4] +
      M[0][5] * N7[5] +
      M[0][6] * N7[6]) *
      C[0] +
      (M[1][1] * N7[1] +
        M[1][2] * N7[2] +
        M[1][3] * N7[3] +
        M[1][4] * N7[4] +
        M[1][5] * N7[5] +
        M[1][6] * N7[6]) *
        C[1] +
      (M[2][2] * N7[2] + M[2][3] * N7[3] + M[2][4] * N7[4] + M[2][5] * N7[5] + M[2][6] * N7[6]) *
        C[2] +
      (M[3][3] * N7[3] + M[3][4] * N7[4] + M[3][5] * N7[5] + M[3][6] * N7[6]) * C[3] +
      (M[4][4] * N7[4] + M[4][5] * N7[5] + M[4][6] * N7[6]) * C[4] +
      (M[5][5] * N7[5] + M[5][6] * N7[6]) * C[5] +
      M[6][6] * N7[6] * C[6])
  );
}

/**
 * Computes the area of a polygon ring where the segments are
 * defined as [lon1 + t * (lon2 - lon1), lat1 + t * (lat2 - lat1)], for
 * 0 <= t <= 1.
 * @param ring
 * @returns the area in square meters.
 */
export function plateCarreeAreaOfRing(ring: GJ.Position[]): number {
  const o = ring.map((coord) => {
    const lambda = coord[0] * TO_RAD;
    const phi = coord[1] * TO_RAD;
    const Fphi = F(phi);
    return { lambda, phi, Fphi };
  });
  const nr = ring.length;
  let S = 0; // Aggregate the area under the GeoJSON segments.
  const transitionPointDegrees = 0.001;

  // Count the number of segments that crosses antimeridian
  let crosses = 0;

  for (let i = 1; i < nr; i++) {
    // Check if the segment crosses antimeridian
    if (Math.abs(ring[i][0] - ring[i - 1][0]) > 180) {
      crosses++;
    }
    const o1 = o[i - 1];
    const o2 = o[i];
    let lambda12 = o2.lambda - o1.lambda;
    if (Math.abs(lambda12) > Math.PI) {
      lambda12 = lambda12 > 0 ? lambda12 - 2 * Math.PI : lambda12 + 2 * Math.PI;
    }
    let S12 = c2 * lambda12;
    if (Math.abs(o2.phi - o1.phi) * TO_DEG < transitionPointDegrees) {
      const xi = auxiliary((o2.phi + o1.phi) / 2, C_xi_phi);
      S12 *= Math.sin(xi);
    } else {
      S12 *= (o2.Fphi - o1.Fphi) / (o2.phi - o1.phi);
    }
    S += S12;
  }
  // Needs a correction if the ring encloses a pole.
  // Odd number of segments that crosses antimeridian implies a pole.
  return crosses % 2 === 0 ? Math.abs(S) : 2 * Math.PI * c2 - Math.abs(S);
}
