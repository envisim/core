import {expect, test} from 'vitest';

import {GeoJSON as GJ} from '../../src/index.js';
import {PlateCarree} from '../../src/utils/class-plate-carree.js';

const p1: GJ.Position = [0, 0];
const p2: GJ.Position = [1, 1];

const p12 = PlateCarree.intermediate(p1, p2, 0.5);
const l1 = PlateCarree.distance(p1, p12);
const l2 = PlateCarree.distance(p12, p2);

test('intermediateOnSegment', () => {
  expect(l1).toBeCloseTo(l2, 2);
});
