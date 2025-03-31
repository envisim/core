import { expect, test } from "vitest";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Polygon } from "../../src/index.js";

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);

test("includesPosition", () => {
  const points: GJ.Position2[] = [
    [0.5, 0.5],
    [5, 0.5],
    [0, 0],
    [0, 0.5],
    [1.000001, 1.000001],
  ];

  const res = points.map((p) => polygon.includesPosition(p));
  expect(res).toEqual([true, false, true, true, false]);
});

test("full copy", () => {
  const p = Polygon.create(polygon.coordinates, false);
  expect(p.coordinates).toEqual(polygon.coordinates);
  p.coordinates[0][1][0] = 10;
  expect(p.coordinates).not.toEqual(polygon.coordinates);
});

test("bbox", () => {
  const box: GJ.BBox = [0, 0, 1, 1];
  expect(polygon.getBBox()).toStrictEqual(box);
});

test("centroid convergence", () => {
  const polygon = Polygon.create([
    [
      [0, 0],
      [1, 0],
      [1, 50],
      [51, 50],
      [101, 60],
      [-100, 60],
      [-50, 50],
      [0, 50],
      [0, 0],
    ],
  ]);
  const centroid1 = polygon.centroid(10);
  const centroid2 = polygon.centroid(20);

  // Check convergence of 8 decimals at the 10th iteration
  expect(centroid1).toEqual(centroid2.map((v) => expect.closeTo(v, 8)));
});
