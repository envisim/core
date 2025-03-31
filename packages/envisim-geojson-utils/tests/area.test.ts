import { expect, test } from "vitest";
import { areaOfPolygonLonLat } from "../src/area.js";
import * as GJ from "../src/geojson.js";

test("area", () => {
  const ring: GJ.Position[] = [
    [12.888806360606111, 61.4879814554327],
    [16.389604974232412, 62.03272898392305],
    [18.647276634218542, 63.86015271397079],
    [12.751410965460195, 63.53080548838537],
    [12.888806360606111, 61.4879814554327],
  ];

  // plate carrée area of ring
  const area = 49046961795.9875;
  const area0 = areaOfPolygonLonLat([ring]);

  expect(area0).toBeCloseTo(area, 1);
});
