import { expect, test } from "vitest";
import type * as GJ from "../../src/geojson.js";
import { isBaseGeometry, isCircle, isPoint } from "../../src/type-guards/objects.js";

const points = [
  {
    type: "Point",
    coordinates: [1, 2],
  },
  {
    type: "Point",
    coordinates: [1, 2],
    radius: 2,
  },
  {
    type: "Point2",
    coordinates: [1, 2],
  },
  {
    type: "Point",
    coordinates: [1, 2, 2, 2],
  },
  {
    type: "Point",
    coordinates: [[1, 2]],
  },
];
const lines = [
  {
    type: "LineString",
    coordinates: [
      [1, 2],
      [2, 2],
      [3, 3],
    ],
  },
  {
    type: "LineString2",
    coordinates: [
      [1, 2],
      [2, 2],
      [3, 3],
    ],
  },
  {
    type: "LineString",
    coordinates: [1, 2, 2, 2],
  },
];
const polygons = [
  {
    type: "Polygon",
    coordinates: [
      [
        [1, 2],
        [2, 2],
        [3, 3],
      ],
    ],
  },
  {
    type: "Polygon2",
    coordinates: [
      [
        [1, 2],
        [2, 2],
        [3, 3],
      ],
    ],
  },
  {
    type: "Polygon",
    coordinates: [1, 2, 2, 2],
  },
];

test("isBaseGeometry", () => {
  expect(points.map((p) => isBaseGeometry(p, false))).toEqual([true, true, false, true, true]);
  expect(points.map((p) => isBaseGeometry(p, true))).toEqual([true, true, false, false, false]);
  expect(lines.map((p) => isBaseGeometry(p, true))).toEqual([true, false, false]);
  expect(polygons.map((p) => isBaseGeometry(p, true))).toEqual([true, false, false]);
});

test("isCircle", () => {
  expect((points as GJ.SingleTypeObject[]).map((p) => isCircle(p))).toEqual([
    false,
    true,
    false,
    false,
    false,
  ]);
  expect((points as GJ.SingleTypeObject[]).map((p) => isPoint(p))).toEqual([
    true,
    false,
    false,
    true,
    true,
  ]);
});
