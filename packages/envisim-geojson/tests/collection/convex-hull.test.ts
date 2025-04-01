import { expect, test } from "vitest";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { convexHull } from "../../src/collection/convex-hull.js";
import { FeatureCollection, MultiPoint, Polygon } from "../../src/index.js";

const positions: GJ.Position[] = [
  [0, 0],
  [2, 0],
  [1, 1],
  [2, 2],
  [0, 2],
  [0, 0],
];

const positions2: GJ.Position[] = [
  [0, 0],
  [0, 0],
  [0, 0],
];

const pc = FeatureCollection.newPoint();
pc.addGeometry(MultiPoint.create(positions), {});
const hull = convexHull(pc);

const pc2 = FeatureCollection.newPoint();
pc2.addGeometry(MultiPoint.create(positions2), {});
const hull2 = convexHull(pc2);

test("convexHull", () => {
  expect(hull2).toBe(null);
  Polygon.assert(hull);
  const coords = hull.coordinates[0];
  expect(coords).toEqual(
    expect.arrayContaining([
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
      [0, 0],
    ]),
  );
});
