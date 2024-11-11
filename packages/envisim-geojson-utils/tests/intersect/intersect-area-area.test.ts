import {expect, test} from 'vitest';

import {Circle, type GeoJSON as GJ, Polygon} from '../../src/index.js';
import {intersectAreaAreaGeometries} from '../../src/intersect/intersect-area-area.js';

const ag1 = Polygon.create([
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
]);

const ag2 = Polygon.create([
  [
    [30.46, 28.96],
    [23.58, 24.66],
    [26.85, 19.91],
    [34.62, 20.48],
    [33.06, 26.02],
    [30.46, 28.96],
  ],
]);

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

test('intersect polygon-polygon', () => {
  const int = intersectAreaAreaGeometries(ag1, ag2);
  Polygon.assert(int);
  const coords = int.coordinates;
  expect(coords.length).toBe(2);
  expect(coords[0]).toEqual(expect.arrayContaining(intersectPoints[0]));
  expect(coords[1]).toEqual(expect.arrayContaining(intersectPoints[1]));
});

const circles = [
  Circle.create([25.8, 22.4], 10000),
  Circle.create([25.8, 22.4], 60000),
  Circle.create([26.34, 22.67], 10000),
];

test('intersect circle-circle', () => {
  {
    const int = intersectAreaAreaGeometries(circles[0], circles[1]);
    Circle.assert(int);
    delete circles[0].bbox;
    expect(int).toEqual(circles[0]);
  }
  {
    const int = intersectAreaAreaGeometries(circles[2], circles[1]);
    Polygon.assert(int);
  }
});

test('intersect circle-polygon', () => {
  {
    const int = intersectAreaAreaGeometries(ag1, circles[0]);
    Circle.assert(int);
    delete circles[0].bbox;
    expect(int).toEqual(circles[0]);
  }
  {
    const int = intersectAreaAreaGeometries(ag1, circles[1]);
    Polygon.assert(int);
  }
  {
    const int = intersectAreaAreaGeometries(ag1, circles[2]);
    expect(int).toBeNull();
  }
});
