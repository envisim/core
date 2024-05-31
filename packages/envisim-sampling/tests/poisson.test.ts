import {describe, expect, test} from 'vitest';

import {conditionalPoissonSampling, poissonSampling} from '../src/index';
import {RandomMock} from './_Random.testf';
import './_equalArrays.testf';

describe('poisson', () => {
  const pi_arr = [0.2, 0.6, 0.4, 0.8, 0.5];
  const rv_arr = [0.72, 0.05, 0.36, 0.98, 0.29];
  const rand = new RandomMock(rv_arr);

  test('poisson', () => {
    expect(poissonSampling({probabilities: pi_arr, rand})).arrayToEqual([
      1, 2, 4,
    ]);
    expect(poissonSampling({probabilities: pi_arr, rand})).not.arrayToEqual([
      1, 2,
    ]);
  });

  const pi_arr2 = [0.4, 0.99];

  test('conditional poisson', () => {
    rand.resetCounter();
    expect(
      conditionalPoissonSampling({probabilities: pi_arr2, n: 2, rand}),
    ).arrayToEqual([0, 1]);
    rand.resetCounter();
    expect(
      conditionalPoissonSampling({probabilities: pi_arr2, n: 1, rand}),
    ).arrayToEqual([1]);
  });
});
