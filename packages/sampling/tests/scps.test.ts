import {ColumnVector, Matrix} from '@envisim/matrix';
import {RandomMock} from './sampling.testf';
import {scps} from '../src/index';

describe('scps', () => {
  const rand01 = new RandomMock(0.1);
  const rand99 = new RandomMock(0.9999);
  const xm_arr = [1, 2, 3, 4, 5, 6];
  const xm = new Matrix(xm_arr, 6, 1);
  const ps = new ColumnVector(1 / 3, 6);

  test('scps', () => {
    expect(scps(ps, xm, {rand: rand01})).arrayToEqual([0, 5]);
    expect(scps(ps, xm, {rand: rand99})).arrayToEqual([0, 3]);
  });
});
