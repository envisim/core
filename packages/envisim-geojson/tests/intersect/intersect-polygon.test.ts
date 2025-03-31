import { expect, test } from "vitest";
import { Polygon } from "../../src/index.js";
import { intersectPolygons } from "../../src/intersect/intersect-polygons.js";
import { EARTH_BOUNDARIES } from "../../src/utils/antimeridian.js";

const antimeridian = Polygon.create([
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
]);

test("antimeridian", () => {
  const res = intersectPolygons([antimeridian.coordinates], [EARTH_BOUNDARIES.right]);
  expect(res.length).toBe(2);
});
