import {distanceEuclidean, distanceEuclidean2} from '../src/index';
import {Matrix} from '@envisim/matrix';

describe('distances', () => {
  const xm_arr = [10, 10, 10, 25, 5, 25, 30, 0, 30];
  const xm = new Matrix(xm_arr, 3, 3, true);

  test('euclidean squared', () => {
    expect(distanceEuclidean2(xm, 0, 1)).toBe(225 + 25 + 225);
    expect(distanceEuclidean2(xm, 2, 1)).toBe(25 + 25 + 25);
    expect(distanceEuclidean2(xm, 0, 2)).toBe(400 + 100 + 400);
  });

  test('euclidean', () => {
    expect(distanceEuclidean(xm, 0, 1)).toBe(Math.sqrt(225 + 25 + 225));
    expect(distanceEuclidean(xm, 2, 1)).toBe(Math.sqrt(25 + 25 + 25));
    expect(distanceEuclidean(xm, 0, 2)).toBe(Math.sqrt(400 + 100 + 400));
  });

  test.todo('gs');
});
