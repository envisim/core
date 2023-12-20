import {GeoJSON as GJ} from '../src/index.js';
import {cutLineGeometry, cutAreaGeometry} from '../src/utils/antimeridian.js';

describe('antimeridian', () => {
  const ls: GJ.Position[] = [
    [170, 0],
    [-180, 0],
    [-170, 0],
    [-150, 0],
  ];

  const pol: GJ.Position[][] = [
    [
      [170, 0],
      [-170, 0],
      [-170, 10],
      [170, 10],
      [170, 0],
    ],
  ];

  console.log(
    JSON.stringify(cutLineGeometry({type: 'LineString', coordinates: ls})),
  );
  console.log(
    JSON.stringify(cutAreaGeometry({type: 'Polygon', coordinates: pol})),
  );

  test('antimeridian', () => {
    //expect(area0).toBeCloseTo(area, 1);
  });
});
