import {longitudeDifference, normalizePosition} from './position.js';
import {degreeToRadian} from './utils.js';
import {wgs84} from './geodesic/wgs84.js';

export function haversine(
  p1: GeoJSON.Position, // [lon, lat]
  p2: GeoJSON.Position, // [lon, lat]
): number {
  const r1 = degreeToRadian(p1);
  const r2 = degreeToRadian(p2);
  const dlon = (r2[0] - r1[0]) / 2.0; // lambda, lon, EW
  const dlat = (r2[1] - r1[1]) / 2.0; // phi, lat, NS
  const slon = Math.pow(Math.sin(dlon), 2.0);
  const slat = Math.pow(Math.sin(dlat), 2.0);

  return (
    2.0 *
    wgs84.a *
    Math.asin(Math.sqrt(slat + slon * Math.cos(r1[1]) * Math.cos(r2[1])))
  );
}

export function vincenty(
  p1: GeoJSON.Position, // [lon, lat]
  p2: GeoJSON.Position, // [lon, lat]
  eps: number = 1e-12,
): number {
  const r1 = degreeToRadian(p1);
  const r2 = degreeToRadian(p2);
  const lon = [r1[0], r2[0]]; // L
  const lat = [r1[1], r2[1]]; // phi
  const U = lat.map((e) => Math.atan((1.0 - wgs84.f) * Math.tan(e)));
  const dlon = lon[1] - lon[0];

  let lambda: number = dlon;
  let lambda2: number = dlon + 10 * eps;
  let sigma: number = NaN;
  let C: number;
  let cos2alpha: number = NaN;
  const cos = {
    sigma: NaN,
    lambda: NaN,
    sig2m: NaN,
    U: U.map(Math.cos),
  };
  const sin = {
    sigma: NaN,
    lambda: NaN,
    alpha: NaN,
    U: U.map(Math.sin),
  };
  let temp: number;

  while (Math.abs(lambda2 - lambda) > eps) {
    lambda2 = lambda;

    cos.lambda = Math.cos(lambda);
    sin.lambda = Math.sin(lambda);

    sin.sigma = Math.sqrt(
      Math.pow(cos.U[1] * sin.lambda, 2.0) +
        Math.pow(cos.U[0] * sin.U[1] - sin.U[0] * cos.U[1] * cos.lambda, 2.0),
    );
    cos.sigma = sin.U[0] * sin.U[1] + cos.U[0] * cos.U[1] * cos.lambda;
    sigma = Math.atan2(sin.sigma, cos.sigma);

    sin.alpha = (cos.U[0] * cos.U[1] * sin.lambda) / sin.sigma;
    cos2alpha = 1.0 - Math.pow(sin.alpha, 2.0);
    cos.sig2m =
      cos2alpha === 0.0
        ? 0.0
        : cos.sigma - (2.0 * sin.U[0] * sin.U[1]) / cos2alpha;
    C =
      (wgs84.f / 16.0) * cos2alpha * (4.0 + wgs84.f * (4.0 - 3.0 * cos2alpha));

    // dlon + vs - ???
    lambda =
      dlon +
      (1.0 - C) *
        wgs84.f *
        sin.alpha *
        (sigma +
          C *
            sin.sigma *
            (cos.sig2m +
              C * cos.sigma * (2.0 * Math.pow(cos.sig2m, 2.0) - 1.0)));
  }

  const u2 = cos2alpha * wgs84.ep2;
  const A =
    1.0 + (u2 / 16384.0) * (4096.0 + u2 * (-768.0 + u2 * (320.0 - 175.0 * u2)));
  const B = (u2 / 1024.0) * (256.0 + u2 * (-128.0 + u2 * (74.0 - 47.0 * u2)));
  temp = Math.pow(cos.sig2m, 2.0);
  const dsigma =
    B *
    sin.sigma *
    (cos.sig2m +
      0.25 *
        B *
        (cos.sigma * (-1.0 + 2.0 * temp) -
          (B / 6.0) *
            cos.sig2m *
            (-3.0 + 4.0 * Math.pow(sin.sigma, 2.0)) *
            (-3.0 + 4.0 * temp)));

  return wgs84.b * A * (sigma - dsigma);
}

function scBeta(s: number, c: number): [number, number] {
  let sin = (1.0 - wgs84.f) * s;
  let cos = c;
  const hypot = Math.hypot(sin, cos);
  return [sin / hypot, cos / hypot];
}

export function karney(
  p1: GeoJSON.Position, // [lon, lat]
  p2: GeoJSON.Position, // [lon, lat]
): number {
  const r1 = normalizePosition(p1);
  const r2 = normalizePosition(p2);
  let lon: [number, number] = [r1[0], r2[0]];
  let lat: [number, number] = [r1[1], r2[1]];

  // EQ (44)
  if (Math.abs(lat[0]) < Math.abs(lat[1])) {
    lon = [lon[1], lon[0]];
    lat = [lat[1], lat[0]];
  }
  if (lat[0] > 0.0) {
    lat[0] *= -1.0;
    lat[1] *= -1.0;
  }

  // (6)
  const beta1: number = Math.atan((1.0 - wgs84.f) * Math.tan(lat[0]));
  const beta2: number = Math.atan((1.0 - wgs84.f) * Math.tan(lat[1]));
  const sbeta1 = Math.sin(beta1);
  const sbeta2 = Math.sin(beta2);
  const cbeta1 = Math.cos(beta1);
  const cbeta2 = Math.cos(beta2);

  // (44)
  const lambda12: number =
    (longitudeDifference(lon[0], lon[1]) * Math.PI) / 180.0;

  // (48)
  const w: number = Math.sqrt(
    1.0 - wgs84.e2 * Math.pow((cbeta1 + cbeta2) * 0.5, 2.0),
  );

  // Table 3
  const omega12: number = lambda12 / w;
  const somega12 = Math.sin(omega12);
  const comega12 = Math.cos(omega12);

  // (49)
  const z1: number = Math.hypot(
    cbeta1 * sbeta2 - sbeta1 * cbeta2 * comega12,
    cbeta2 * somega12,
  );

  // (51)
  const sigma12: number = Math.atan2(
    z1,
    sbeta1 * sbeta2 + cbeta1 * cbeta2 * comega12,
  );

  // Table 3
  return wgs84.a * w * sigma12;
}
