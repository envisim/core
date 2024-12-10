import {describe} from 'vitest';

import {Hypergeometric} from '../../src/index.js';
import {distributionTests, fromTo} from '../_distributions.testf.js';

describe('Hypergeometric(500, 50, 100)', () => {
  const pdf = [
    0.00072251, 0.0103328846, 0.0514502107, 0.1188994436, 0.1473678442, 0.1067505549, 0.0477835036,
    0.0137271608, 0.002598338, 0.0003299852,
  ];
  const cdf = [
    0.0008347249, 0.0143769459, 0.0915342093, 0.2955869429, 0.585148365, 0.8254985772, 0.9489281616,
    0.9896759118, 0.9985580728, 0.9998605354,
  ];
  const quantile = [0, 7, 8, 9, 9, 10, 11, 11, 12, 13, 50];

  const x = fromTo(2, 20, 2);

  distributionTests(new Hypergeometric(500, 50, 100), {x, pdf, cdf, quantile});
});

describe('Hypergeometric(10, 2, 5)', () => {
  const cdf = [0.2222222222, 0.7777777778, 1.0];
  const x = [0, 1, 2];

  distributionTests(new Hypergeometric(10, 2, 5), {
    x,
    pdf: [],
    cdf,
    quantile: [],
    skip: {pdf: true, cdf: true, quantile: true},
  });
});
