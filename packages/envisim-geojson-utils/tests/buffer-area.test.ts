import {describe, expect, test} from 'vitest';

import {bufferArea} from '../src/buffer-area.js';
import {AreaObject, Circle, GeoJSON as GJ, Polygon} from '../src/index.js';

const circles = [Circle.create([80, 70], 10)] satisfies Circle[];

const polygons = [
  Polygon.create([
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
      [0, 0],
    ],
  ]),
  Polygon.create([
    [
      [20, 0],
      [25, 0],
      [25, 2.5],
      [22.5, 2.5],
      [22.5, 5],
      [20, 5],
      [20, 0],
    ],
  ]),
  Polygon.create([
    [
      [0, 20],
      [3, 20],
      [3, 25],
      [4, 25],
      [4, 20],
      [10, 20],
      [10, 30],
      [0, 30],
      [0, 20],
    ],
  ]),
  Polygon.create([
    [
      [20, 20],
      [23, 20],
      [23, 27],
      [27, 27],
      [27, 23],
      [23.5, 23],
      [23.5, 20],
      [30, 20],
      [30, 30],
      [20, 30],
      [20, 20],
    ],
  ]),
  Polygon.create([
    [
      [40, 0],
      [43, 0],
      [43, 2],
      [46, 2],
      [46, 0],
      [49, 0],
      [49, 5],
      [46, 5],
      [46, 3],
      [43, 3],
      [43, 5],
      [40, 5],
      [40, 0],
    ],
  ]),
  Polygon.create([
    [
      [0, 40],
      [8, 40],
      [8, 46],
      [5, 46],
      [5, 44],
      [3, 44],
      [3, 46],
      [0, 46],
      [0, 40],
    ],
  ]),
] satisfies Polygon[];

describe('buffer-area', () => {
  const bOptions = {radius: 80000, steps: 1};
  const sOptions = {radius: -80000, steps: 5};

  test('circle', () => {
    expect(bufferArea(circles[0], {radius: 5, steps: 1})).toEqual(
      Circle.create(circles[0].coordinates, 15),
    );
    expect(bufferArea(circles[0], {radius: 5, steps: 1})).toEqual(
      Circle.create(circles[0].coordinates, 5),
    );
  });

  test('poly', () => {
    console.log(bufferArea(polygons[0], bOptions).coordinates);
    throw new Error('h');
  });

  test.todo('check lengths');
});
