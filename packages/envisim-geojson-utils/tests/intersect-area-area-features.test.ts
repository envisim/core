import {expect, test} from 'vitest';

import {AreaFeature, type GeoJSON as GJ, Polygon} from '../src/index.js';
import {intersectAreaAreaFeatures} from '../src/intersect-area-area-features.js';
import './_equalArrays.testf';

const poly1: GJ.Position2[][] = [
  [
    [20.73, 24.84],
    [17.47, 20.47],
    [21.94, 15.08],
    [29.31, 17.06],
    [31.28, 24.45],
    [25.59, 27.94],
    [20.73, 24.84],
  ],
  [
    [26.69, 21.54],
    [25.66, 23.93],
    [28.16, 25.4],
    [30.21, 23.33],
    [26.69, 21.54],
  ],
];

const poly2: GJ.Position2[][] = [
  [
    [30.46, 28.96],
    [23.58, 24.66],
    [26.85, 19.91],
    [34.62, 20.48],
    [33.06, 26.02],
    [30.46, 28.96],
  ],
];

const intersectPoints: GJ.Position2[][] = [
  [
    [23.58, 24.66],
    [26.85, 19.91],
    [30.133963433480055, 20.15090851442518],
    [31.28, 24.45],
    [27.224222103956006, 26.937638814972505],
  ],
  [
    [26.69, 21.54],
    [25.66, 23.93],
    [28.16, 25.4],
    [30.21, 23.33],
  ],
];

const af1 = AreaFeature.create({type: 'Polygon', coordinates: poly1});
const af2 = AreaFeature.create({type: 'Polygon', coordinates: poly2});

test('intersect', () => {
  const int = intersectAreaAreaFeatures(af1, af2);
  AreaFeature.assert(int);
  const geom = int.geometry;
  Polygon.assert(geom);
  const coords = geom.coordinates;
  expect(coords.length).toBe(2);
  expect(coords[0]).toEqual(expect.arrayContaining(intersectPoints[0]));
  expect(coords[1]).toEqual(expect.arrayContaining(intersectPoints[1]));
});
