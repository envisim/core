import {expect, test} from 'vitest';

import {GeoJSON as GJ} from '../../src/index.js';
import {Geodesic} from '../../src/utils/class-geodesic.js';

test('Geodesic.distance', () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const p2: GJ.Position = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;

  expect(Geodesic.distance(p1, p2)).toBeCloseTo(d12, 2);
});

test('destination', () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const azimuth = 180;
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;
  const p2 = Geodesic.destination(p1, d12, azimuth); // p2 should be close to [0,0]

  expect(p2[0]).toBeCloseTo(0, 4);
  expect(p2[1]).toBeCloseTo(0, 4);
});

test('Geodesic.forwardAzimuth', () => {
  const p1: GJ.Position = [0, 0];
  const p2: GJ.Position = [0, 1];
  const p3: GJ.Position = [0, -1];
  const p4: GJ.Position = [1, 0];
  const p5: GJ.Position = [-1, 0];

  expect(Geodesic.forwardAzimuth(p1, p2)).toBe(0);
  expect(Geodesic.forwardAzimuth(p1, p3)).toBe(180);
  expect(Geodesic.forwardAzimuth(p1, p4)).toBe(90);
  expect(Geodesic.forwardAzimuth(p1, p5)).toBe(-90);
});

const p1: GJ.Position = [0, 0];
const p2: GJ.Position = [2, 0];

test('Geodesic.intermediate', () => {
  expect(Geodesic.intermediate(p1, p2, 0.5)).toStrictEqual([1, 0]);
});
