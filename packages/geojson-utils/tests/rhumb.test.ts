import {GeoJSON as GJ} from '../src/index.js';
import {geodesicAreaOfRing} from '../src/utils/area.js';
import {
  rhumbAreaOfRing,
  rhumbDestination,
  rhumbDistance,
  rhumbForwardAzimuth,
  plateCarreeAreaOfRing,
} from '../src/utils/rhumb.js';

describe('rhumb', () => {
  const ring: GJ.Position[] = [
    [12.888806360606111, 61.4879814554327],
    [16.389604974232412, 62.03272898392305],
    [18.647276634218542, 63.86015271397079],
    [12.751410965460195, 63.53080548838537],
    [12.888806360606111, 61.4879814554327],
  ];
  // Interpolate points to each segment
  const N = 10000;
  let longRing: GJ.Position[] = [];
  for (let i = 0; i < ring.length - 1; i++) {
    longRing.push(ring[i]);
    for (let j = 1; j < N; j++) {
      longRing.push([
        ring[i][0] + (j / N) * (ring[i + 1][0] - ring[i][0]),
        ring[i][1] + (j / N) * (ring[i + 1][1] - ring[i][1]),
      ]);
    }
  }
  longRing.push(ring[ring.length - 1]);

  // rhumb area of the ring according to
  // https://geographiclib.sourceforge.io/cgi-bin/Planimeter
  const area = 48909672712.3;
  const area0 = rhumbAreaOfRing(ring);
  const area1 = plateCarreeAreaOfRing(ring);
  const area2 = geodesicAreaOfRing(longRing);
  const area3 = plateCarreeAreaOfRing(longRing);

  const res = rhumbDestination([0, 87], 1000000, 90);
  // https://geographiclib.sourceforge.io/cgi-bin/RhumbSolve
  // [171.07008849454, 87.00000000000]
  const azi12 = rhumbForwardAzimuth([0, 0], [1, 1]);
  // 45.19094926130
  const s12 = rhumbDistance([0, 0], [1, 1]);
  // 156899.568453

  test('rhumb', () => {
    expect(area0).toBeCloseTo(area, 1);
    expect(area1 / area2).toBeCloseTo(1, 10);
    expect(area1).toBeCloseTo(area3, -1);
    expect(res[0]).toBeCloseTo(171.07008849454, 10);
    expect(res[1]).toBeCloseTo(87, 10);
    expect(azi12).toBeCloseTo(45.1909492613, 10);
    expect(s12).toBeCloseTo(156899.568453, 5);
  });
});
