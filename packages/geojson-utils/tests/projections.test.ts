import {
  cartesian,
  webMercator,
  azimuthalEquidistant,
} from '../src/projections.js';

describe('projections', () => {
  const p1 = [30, -45];

  const proj = cartesian();
  const p2 = proj.project(p1);
  const p3 = proj.unproject(p2);

  const proj2 = webMercator();
  const p4 = proj2.project(p1);
  const p5 = proj2.unproject(p4);

  const proj3 = azimuthalEquidistant([0, 0]);
  const p6 = proj3.project(p1);
  const p7 = proj3.unproject(p6);

  test('cartesian', () => {
    expect(p3[0]).toBeCloseTo(p1[0], 4);
    expect(p3[1]).toBeCloseTo(p1[1], 4);
  });

  test('webMercator', () => {
    expect(p5[0]).toBeCloseTo(p1[0], 4);
    expect(p5[1]).toBeCloseTo(p1[1], 4);
  });

  test('azimuthalEquidistant', () => {
    expect(p7[0]).toBeCloseTo(p1[0], 4);
    expect(p7[1]).toBeCloseTo(p1[1], 4);
  });
});
