import { expect, test } from "vitest";
import type * as GJ from "../../src/geojson.js";
import { distance, intermediate } from "../../src/segments/plate-carree.js";

const p1: GJ.Position = [0, 0];
const p2: GJ.Position = [1, 1];

const p12 = intermediate(p1, p2, 0.5);
const l1 = distance(p1, p12);
const l2 = distance(p12, p2);

test("intermediate", () => {
  expect(l1).toBeCloseTo(l2, 2);
});

test("distance", () => {
  const p1: GJ.Position = [0, 90]; // North pole
  const p2: GJ.Position = [0, 0]; // Equator
  // Distance in meters between the north pole and the equator for WGS84
  // https://en.wikipedia.org/wiki/Latitude
  const d12 = 10001965.729;
  expect(distance(p1, p2)).toBeCloseTo(d12, 3);
});
