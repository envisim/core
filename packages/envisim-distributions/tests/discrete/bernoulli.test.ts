import {describe, expect, test} from 'vitest';

import {Random} from '@envisim/random';

import {Bernoulli} from '../../src/index.js';
import {PRECISION, RANDOM_ARRAY_LENGTH, RANDOM_PRECISION} from '../_distributions.testf.js';

describe('Bernoulli', () => {
  const probs = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  const pdf = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  test('pdf', () => {
    const res = probs.map((p) => new Bernoulli(p).pdf(1));
    const exp = pdf.map((v) => expect.closeTo(v, PRECISION));
    expect(res).toEqual(exp);
  });

  test('cdf', () => {
    const res0 = probs.map((p) => new Bernoulli(p).cdf(0));
    const res1 = probs.map((p) => new Bernoulli(p).cdf(1));
    const exp0 = pdf.map((v) => expect.closeTo(1.0 - v, PRECISION));
    const exp1 = pdf.map(() => expect.closeTo(1.0, PRECISION));
    expect(res0).toEqual(exp0);
    expect(res1).toEqual(exp1);
  });

  test('quantile', () => {
    const res = probs.map((p) => new Bernoulli(p).quantile(0.5));
    const exp = [0, 0, 0, 0, 0, 1, 1, 1, 1].map((v) => expect.closeTo(v, PRECISION));
    expect(res).toEqual(exp);
  });

  test('random', () => {
    const randomValues = new Bernoulli(0.25).random(RANDOM_ARRAY_LENGTH, {rand: new Random(4242)});
    const mean = randomValues.reduce((t, c) => t + c, 0) / RANDOM_ARRAY_LENGTH;
    expect(mean).toBeCloseTo(0.25, RANDOM_PRECISION);
  });
});
