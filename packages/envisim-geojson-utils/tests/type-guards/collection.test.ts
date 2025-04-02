import { expect, test } from "vitest";
import { isBaseCollection } from "../../src/type-guards/collection.js";

test("isBaseCollection", () => {
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

  const c1 = {
    type: "FeatureCollection",
    features: [f1, f1, f1],
  };
  const c2 = {
    type: "FeatureCollection",
    features: [f1, f2, f3, f4, f5],
  };

  expect(isBaseCollection(c1, true)).toEqual(true);
  expect(isBaseCollection(c2, true)).toEqual(false);
  expect(isBaseCollection(f1, true)).toEqual(false);
});
