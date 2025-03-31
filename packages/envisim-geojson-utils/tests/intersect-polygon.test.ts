import { expect, test } from "vitest";
import { EARTH_BOUNDARIES } from "../src/antimeridian.js";
import type * as GJ from "../src/geojson.js";
import { intersectPolygons } from "../src/intersect-polygons.js";

const antimeridian: GJ.Position2[][] = [
  [
    [178, -16],
    [181, -16],
    [181, -15],
    [179, -15],
    [179, -14],
    [181, -14],
    [181, -13],
    [178, -13],
    [178, -16],
  ],
];

test("antimeridian", () => {
  const res = intersectPolygons([antimeridian], [EARTH_BOUNDARIES.right]);
  expect(res.length).toBe(2);
});
