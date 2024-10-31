import geodesic from 'geographiclib-geodesic';
import {expect, test} from 'vitest';

import {bufferArea} from '../src/buffer-area.js';
import {AreaObject, Circle, GeoJSON as GJ, MultiPolygon, Polygon} from '../src/index.js';

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

const antimeridian = Polygon.create([
  [
    [179.98, -16.87],
    [179.98, -16.84],
    [179.94, -16.88],
    [179.96, -16.92],
    [180.0, -16.92],
    [180.0, -16.895],
    [179.98, -16.895],
    [179.98, -16.875],
    [180.0, -16.875],
    [180.0, -16.87],
    [179.98, -16.87],
  ],
]);

const multi = MultiPolygon.create([
  antimeridian.coordinates,
  [
    [
      [-179.97, -16.9],
      [-179.95, -16.87],
      [-179.98, -16.83],
      [-180.0, -16.83],
      [-180.0, -16.875],
      [-179.99, -16.875],
      [-179.99, -16.895],
      [-180.0, -16.895],
      [-180.0, -16.9],
      [-179.97, -16.9],
    ],
  ],
]);

const bOptions = {distance: 80000, steps: 5};
const sOptions = {distance: -80000, steps: 5};

test('circle', () => {
  expect(bufferArea(circles[0], {distance: 5, steps: 1})).toEqual(
    Circle.create(circles[0].coordinates, 15),
  );
  expect(bufferArea(circles[0], {distance: -5, steps: 1})).toEqual(
    Circle.create(circles[0].coordinates, 5),
  );
});

test('antimeridian', () => {
  let buf = bufferArea(antimeridian, {distance: 100, steps: 1});
  expect(buf?.coordinates.length).toBe(3);
});

test('multipoly', () => {
  let buf = bufferArea(multi, {distance: 100, steps: 1});
  expect(buf?.coordinates.length).toBe(2);
});

// test('poly', () => {
//   // console.log(JSON.stringify(polygons.map((p) => p.coordinates)));
//   console.log(
//     JSON.stringify(
//       polygons.flatMap((p) => {
//         const b = bufferArea(p, sOptions);

//         if (b === null) return [];

//         if (Polygon.isObject(b)) {
//           return [b.coordinates];
//         }

//         return b.coordinates;
//       }),
//     ),
//   );

//   // console.log(bufferArea(polygons[0], bOptions).coordinates);
//   throw new Error('h');
// });

test.todo('check lengths');
