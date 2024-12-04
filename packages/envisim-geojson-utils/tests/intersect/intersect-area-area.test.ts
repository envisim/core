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

test('intersect converted circle-polygon', () => {
  const polygon = Polygon.create([
    [
      [20.383759, 63.800804],
      [20.380669, 63.800037],
      [20.383523, 63.799279],
      [20.386033, 63.800188],
      [20.383759, 63.800804],
    ],
  ]);
  const polycircle = Polygon.create([
    [
      [20.383399244581472, 63.79932128736324],
      [20.383363919580006, 63.79931992104308],
      [20.383329667920844, 63.79931586359794],
      [20.38329753033209, 63.79930923831235],
      [20.383268483304654, 63.799300246493964],
      [20.383243409421233, 63.799289161356754],
      [20.383223070539113, 63.79927631971924],
      [20.38320808464142, 63.79926211177015],
      [20.383198907060574, 63.799246969212575],
      [20.38319581664394, 63.79923135214656],
      [20.38319890728223, 63.79921573508916],
      [20.383208085057994, 63.79920059255636],
      [20.383223071100332, 63.79918638464525],
      [20.38324341005946, 63.799173543054295],
      [20.38326848394285, 63.79916245796663],
      [20.383297530893312, 63.799153466194824],
      [20.38332966833741, 63.799146840947195],
      [20.383363919801653, 63.799142783526825],
      [20.383399244581454, 63.79914141721527],
      [20.38343456936129, 63.799142783526825],
      [20.383468820825534, 63.799146840947195],
      [20.383500958269632, 63.799153466194824],
      [20.383530005220095, 63.79916245796663],
      [20.383555079103484, 63.799173543054295],
      [20.383575418062613, 63.79918638464525],
      [20.38359040410495, 63.79920059255636],
      [20.383599581880713, 63.79921573508916],
      [20.383602672519004, 63.79923135214656],
      [20.38359958210237, 63.799246969212575],
      [20.383590404521524, 63.79926211177015],
      [20.38357541862383, 63.79927631971924],
      [20.38355507974171, 63.799289161356754],
      [20.38353000585829, 63.799300246493964],
      [20.383500958830854, 63.79930923831235],
      [20.3834688212421, 63.79931586359794],
      [20.38343456958294, 63.79931992104308],
      [20.383399244581472, 63.79932128736324],
    ],
  ]);

  const int1 = intersectAreaAreaGeometries(polygon, polycircle);
  expect(int1).not.toBeNull();
});

test('non-overlapping', () => {
  const poly1 = Polygon.create([
    [
      [20.382250571191626, 63.79941345753493],
      [20.38253248161436, 63.799284398430416],
      [20.382824408311265, 63.79940902934919],
      [20.38254249797854, 63.79953808902122],
      [20.382250571191626, 63.79941345753493],
    ],
  ]);
  const poly2 = Polygon.create([
    [
      [20.383759, 63.800804],
      [20.380669, 63.800037],
      [20.383523, 63.799279],
      [20.386033, 63.800188],
      [20.383759, 63.800804],
    ],
  ]);

  const int1 = intersectAreaAreaGeometries(poly1, poly2);
  expect(int1).toBeNull();
});
