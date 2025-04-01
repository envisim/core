import { expect, test } from "vitest";
import { Feature, FeatureCollection, LineString } from "@envisim/geojson";
import { samplePointsOnLines } from "../../src/sample-continuous/index.js";

const ls = LineString.create([
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 0],
]);

const frame = FeatureCollection.newLine([new Feature(ls, {})]);
const sample = samplePointsOnLines(frame, {
  pointSelection: "independent",
  sampleSize: 10,
});

test("samplePointsOnLines", () => {
  expect(sample.size()).toBe(10);
});
