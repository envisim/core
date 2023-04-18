import {ColumnVector, Matrix} from '@envisim/matrix';
import {RandomMock} from './sampling.testf';
import {lpm, lpm1, lpm2, randomPivotal} from '../src/index';

describe('pivotal', () => {
  const rand01 = new RandomMock(0.1);
  const rand99 = new RandomMock(0.9999);
  const xm_arr = [1, 2, 3, 4, 5, 6];
  const xm = new Matrix(xm_arr, 6, 1);
  const ps = new ColumnVector(1 / 3, 6);

  test('lpm1', () => {
    // Random order of indices: [123450]
    // 1 vs 2 => 1 => [10345]
    // 1 vs 0 => 1 => [543]
    // 5 vs 4 => 5 => [53]
    // 5 vs 3 => 5
    expect(lpm1(ps, xm, {rand: rand01})).arrayToEqual([1, 5]);
    expect(lpm(ps, xm, {rand: rand01, variant: 1})).arrayToEqual([1, 5]);

    // Random order of indices: [012345]
    // 0 vs 1 => 1 => [51234]
    // 5 vs 4 => 4 => [4123]
    // 4 vs 3 => 3 => [21]
    // 2 vs 1 => 1
    expect(lpm1(ps, xm, {rand: rand99})).arrayToEqual([1, 3]);
    expect(lpm(ps, xm, {rand: rand99, variant: 1})).arrayToEqual([1, 3]);
  });

  test('lpm2', () => {
    // Random order of indices: [123450]
    // 1 vs _2, 0 => 1 => [10345]
    // 1 vs 0 => 1 => [543]
    // 5 vs 4 => 5 => [53]
    // 5 vs 3 => 5
    expect(lpm2(ps, xm, {rand: rand01})).arrayToEqual([1, 5]);
    expect(lpm(ps, xm, {rand: rand01, variant: 2})).arrayToEqual([1, 5]);

    // Random order of indices: [012345]
    // 0 vs 1 => 1 => [51234]
    // 5 vs 4 => 4 => [4123]
    // 4 vs 3 => 3 => [21]
    // 2 vs 1 => 1
    expect(lpm2(ps, xm, {rand: rand99})).arrayToEqual([1, 3]);
    expect(lpm(ps, xm, {rand: rand99, variant: 2})).arrayToEqual([1, 3]);
  });

  test('random pivotal', () => {
    // Random order of indices: [123450]
    // 1 vs 2 => 1 => [10345]
    // 1 vs 0 => 1 => [543]
    // 5 vs 4 => 5 => [53]
    // 5 vs 3 => 5
    expect(randomPivotal(ps, {rand: rand01})).arrayToEqual([1, 5]);

    // Random order of indices: [012345]
    // 0 vs 1 => 1 => [51234]
    // 5 vs 1 => 1 => [432]
    // 4 vs 3 => 3 => [23]
    // 2 vs 3 => 3
    expect(randomPivotal(ps, {rand: rand99})).arrayToEqual([1, 3]);
  });
});
