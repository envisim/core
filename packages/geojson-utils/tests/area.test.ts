import {areaOfPolygonLonLat, GeoJSON as GJ} from '../src/index.js';

describe('area', () => {
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
  const area0 = areaOfPolygonLonLat([ring]);

  test('area', () => {
    expect(area0).toBeCloseTo(area, 1);
  });
});
