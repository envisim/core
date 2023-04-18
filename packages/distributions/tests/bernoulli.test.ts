import {Random} from '@envisim/random';
import {Bernoulli} from '../src/bernoulli';
import {RANDN, RPRECISION} from './distributions.testf';

const rand = new Random('test');

describe('bernoulli', () => {
  const pdf = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  test('pdf', () => {
    for (let i = 1; i <= 9; i++) {
      expect(Bernoulli.pdf(1, {p: i / 10})).toBeCloseTo(pdf[i - 1]);
    }
  });

  test('cdf', () => {
    for (let i = 1; i <= 9; i++) {
      expect(Bernoulli.cdf(0, {p: i / 10})).toBeCloseTo(1.0 - i / 10);
      expect(Bernoulli.cdf(1, {p: i / 10})).toBeCloseTo(1.0);
    }
  });

  test('quantile', () => {
    for (let i = 1; i <= 9; i++) {
      expect(Bernoulli.quantile(0.5, {p: i / 10})).toBe(i <= 5 ? 0 : 1);
    }
  });

  test('random', () => {
    const r = Bernoulli.random(RANDN, {p: 0.25});
    expect(r.reduce((t, e) => t + e, 0) / RANDN).toBeCloseTo(0.25, RPRECISION);
  });
});
