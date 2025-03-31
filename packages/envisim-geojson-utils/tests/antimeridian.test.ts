import { expect, test } from "vitest";
import { cutAreaGeometry, cutLineGeometry } from "../src/antimeridian.js";
import type * as GJ from "../src/geojson.js";

const ls: GJ.Position[] = [
  [170, 0],
  [-180, 0],
  [-170, 0],
  [-150, 0],
];

const pol: GJ.Position[][] = [
  [
    [170, 0],
    [-170, 0],
    [-170, 10],
    [170, 10],
    [170, 0],
  ],
];

const cutLine = cutLineGeometry({ type: "LineString", coordinates: ls });
const cutPol = cutAreaGeometry({ type: "Polygon", coordinates: pol });

test("antimeridian", () => {
  expect(cutLine.type).toBe("MultiLineString");
  expect(cutPol.type).toBe("MultiPolygon");
});
