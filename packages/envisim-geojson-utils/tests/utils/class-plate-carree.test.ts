import {expect, test} from 'vitest';

import {GeoJSON as GJ} from '../../src/index.js';
import {PlateCarree} from '../../src/utils/class-plate-carree.js';

const p1: GJ.Position = [0, 0];
const p2: GJ.Position = [1, 1];

const p12 = PlateCarree.intermediate(p1, p2, 0.5);
const l1 = PlateCarree.distance(p1, p12);
const l2 = PlateCarree.distance(p12, p2);

test('PlateCarree.intermediate', () => {
  expect(l1).toBeCloseTo(l2, 2);
});

test('PlateCarre.distance', () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const p2: GJ.Position = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;
  expect(PlateCarree.distance(p1, p2)).toBeCloseTo(d12, 3);
});
