import {describe, expect, test} from 'vitest';

import {GeoJSON as GJ} from '../src/index.js';
import {Rhumb} from '../src/utils/Rhumb.js';

describe('Rhumb', () => {
  const ring: GJ.Position[] = [
    [12.888806360606111, 61.4879814554327],
    [16.389604974232412, 62.03272898392305],
    [18.647276634218542, 63.86015271397079],
    [12.751410965460195, 63.53080548838537],
    [12.888806360606111, 61.4879814554327],
  ];

  // rhumb area of the ring according to
  // https://geographiclib.sourceforge.io/cgi-bin/Planimeter
  const area = 48909672712.3;
  const area0 = Rhumb.areaOfRing(ring);

  const res = Rhumb.destination([0, 87], 1000000, 90);
  // https://geographiclib.sourceforge.io/cgi-bin/RhumbSolve
  // [171.07008849454, 87.00000000000]
  const azi12 = Rhumb.forwardAzimuth([0, 0], [1, 1]);
  // 45.19094926130
  const s12 = Rhumb.distance([0, 0], [1, 1]);
  // 156899.568453

  test('rhumb', () => {
    expect(area0).toBeCloseTo(area, 1);
    expect(res[0]).toBeCloseTo(171.07008849454, 10);
    expect(res[1]).toBeCloseTo(87, 10);
    expect(azi12).toBeCloseTo(45.1909492613, 10);
    expect(s12).toBeCloseTo(156899.568453, 5);
  });
});
