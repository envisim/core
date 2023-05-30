import {ColumnVector} from '@envisim/matrix';

import {hansenHurwitz, horvitzThompson} from '../src/index';

describe('estimate', () => {
  const ys_arr = [1.1, 0.4, 0.0, 0.3, 1.2, 0.5];
  const xs_arr = [8.2, 5.4, 1.6, 7.5, 4.8, 3.9];
  const pi_arr = xs_arr.map((e) => e / 314.0);
  const ys = new ColumnVector(ys_arr);
  const pi = new ColumnVector(pi_arr);
  const ht_est = 196.6976207;

  test('ht', () => {
    expect(horvitzThompson(ys, pi)).toBeCloseTo(ht_est);
    expect(horvitzThompson(ys, pi_arr)).toBeCloseTo(ht_est);
  });
  test.todo('ht variance');

  const es = pi.multiplyScalar(8);
  const is = new ColumnVector([2, 2, 1, 1, 1, 1]);
  const hh_est = 32.7598539;

  test('hh', () => {
    expect(hansenHurwitz(ys, es, is)).toBeCloseTo(hh_est);
  });
  test.todo('hh variance');

  test.todo('ratioEstimator');

  test.todo('wrEstimator');
  test.todo('wrVariance');

  test.todo('nearestNeighbourEstimator');

  test.todo('voronoiBalance');
});
