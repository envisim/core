import {describe} from 'vitest';

import {UniformDiscrete} from '../../src/index.js';
import {distributionTests, fromTo} from '../_distributions.testf.js';

describe('UniformDiscrete(-10, 10)', () => {
  const pdf = new Array(11).fill(0.047619047619047616404);
  const cdf = [
    0.047619047619047616404, 0.142857142857142849213, 0.238095238095238082021,
    0.33333333333333331483, 0.428571428571428547638, 0.523809523809523835958,
    0.619047619047619068766, 0.714285714285714301575, 0.809523809523809534383,
    0.904761904761904767192, 1.0,
  ];
  const quantile = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];
  const x = fromTo(-10, 10, 2);

  distributionTests(new UniformDiscrete(-10, 10), {x, pdf, cdf, quantile});
});
