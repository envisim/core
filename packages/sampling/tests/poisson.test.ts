import {RandomMock} from './sampling.testf';
import {poisson, conditionalPoisson} from '../src/index';

describe('poisson', () => {
  const pi_arr = [0.2, 0.6, 0.4, 0.8, 0.5];
  const rv_arr = [0.72, 0.05, 0.36, 0.98, 0.29];
  const rand = new RandomMock(rv_arr);

  test('poisson', () => {
    expect(poisson(pi_arr, {rand})).arrayToEqual([1, 2, 4]);
    expect(poisson(pi_arr, {rand})).not.arrayToEqual([1, 2]);
  });

  const pi_arr2 = [0.4, 0.99];

  test('conditional poisson', () => {
    rand.resetCounter();
    expect(conditionalPoisson(pi_arr2, 2, {rand})).arrayToEqual([0, 1]);
    rand.resetCounter();
    expect(conditionalPoisson(pi_arr2, 1, {rand})).arrayToEqual([1]);
  });
});
