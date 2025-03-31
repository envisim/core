import { expect, test } from "vitest";
import { Feature, FeatureCollection, Polygon } from "@envisim/geojson";
import { pointGeometry, rectangularAreaGeometry } from "../../src/model-geometry.js";
import {
  sampleAreaFeaturesOnAreas,
  samplePointFeaturesOnAreas,
} from "../../src/sample-continuous/index.js";

const polygon = Polygon.create([
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ],
]);

const frame = FeatureCollection.newArea([new Feature(polygon, {})]);

const tract = rectangularAreaGeometry(10.0, 10.0);

const sample = sampleAreaFeaturesOnAreas(frame, {
  pointSelection: "independent",
  sampleSize: 10,
  modelGeometry: tract,
});

const tract2 = pointGeometry();
const sample2 = samplePointFeaturesOnAreas(frame, {
  pointSelection: "independent",
  sampleSize: 10,
  modelGeometry: tract2,
});

test("sampleFeaturesOnAreas", () => {
  expect(sample.size()).toBe(10);
  expect(sample2.size()).toBe(10);
});
