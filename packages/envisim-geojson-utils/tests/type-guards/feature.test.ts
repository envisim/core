import { expect, test } from "vitest";
import { isBaseFeature } from "../../src/type-guards/feature.js";

test("isBaseFeature", () => {
  const f1 = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [1, 2],
    },
    properties: null,
  };
  const f2 = {
    type: "Feature",
    geometry: {
      type: "Point2",
      coordinates: [1, 2],
    },
    properties: null,
  };
  const f3 = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [1, 2, 3, 3],
    },
    properties: null,
  };
  const f4 = {
    type: "Feature2",
    geometry: {
      type: "Point",
      coordinates: [1, 2],
    },
    properties: null,
  };
  const f5 = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [1, 2],
    },
  };

  expect(isBaseFeature(f1, true)).toEqual(true);
  expect(isBaseFeature(f2, true)).toEqual(false);
  expect(isBaseFeature(f3, true)).toEqual(false);
  expect(isBaseFeature(f4, true)).toEqual(false);
  expect(isBaseFeature(f5, true)).toEqual(false);
});
