import {describe} from 'vitest';

import {ChiSquared} from '../../src/index.js';
import {distributionTests, fromTo} from '../_distributions.testf.js';

describe('ChiSquared(3)', () => {
  const pdf = [
    0.0, 0.241970725, 0.207553749, 0.15418033, 0.107981933, 0.073224913, 0.048652173, 0.0318734,
    0.020666985, 0.013295545, 0.008500367,
  ];
  const cdf = [
    0.0, 0.198748, 0.4275933, 0.6083748, 0.7385359, 0.8282029, 0.8883898, 0.9281022, 0.9539883,
    0.9707091, 0.9814339,
  ];
  const quantile = [
    0.0,
    0.5843744,
    1.005174,
    1.4236522,
    1.8691684,
    2.3659739,
    2.9461661,
    3.6648708,
    4.6416277,
    6.2513886,
    Infinity,
  ];
  const x = fromTo(0, 10, 1);

  distributionTests(new ChiSquared(3), {x, pdf, cdf, quantile});
});
