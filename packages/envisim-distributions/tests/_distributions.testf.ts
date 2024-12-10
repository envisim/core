import {expect, test} from 'vitest';

import {Random} from '@envisim/random';

import {Distribution} from '../src/abstract-distribution';

export const QUANTILES = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
export const PRECISION = 4;
export const RANDOM_PRECISION = 2;
export const RANDOM_ARRAY_LENGTH = 100000;

// export const createTable = (...arrs: number[][]): number[][] => {
//   const c: number[][] = [];
//   for (let i = 0; i < arrs[0].length; i++) {
//     c.push(arrs.map((e) => e[i]));
//   }
//   return c;
// };

export const fromTo = (from: number, to: number, by: number) => {
  const s: number[] = [];
  for (let i = from; i <= to; i += by) s.push(i);
  return s;
};

interface TestOptionsSkips {
  pdf?: boolean;
  cdf?: boolean;
  quantile?: boolean;
  random?: boolean;
}

interface TestOptions {
  x: number[];
  pdf: number[];
  cdf: number[];
  quantile: number[];
  rand?: Random;
  skip?: TestOptionsSkips;
  precision?: number;
  randomArrayLength?: number;
  randomPrecision?: number;
}
// {
//   x,
//   params,
//   pdf,
//   cdf,
//   quantile,
//   rand = new Random('test'),
//   doTests = [1, 2, 3, 4], pdf, cdf, q, r
//   randn = RANDN,
//   precision = PRECISION,
//   rprecision = RPRECISION,
// }: {
//   Dist: any;
//   x: number[];
//   params: any;
//   pdf: number[];
//   cdf: number[];
//   quantile: number[];
//   rand?: Random;
//   doTests?: number[];
// },

export function distributionTests<T>(
  instance: Distribution<T>,
  {
    x,
    pdf,
    cdf,
    quantile,
    rand = new Random(4242),
    skip,
    precision = PRECISION,
    randomArrayLength = RANDOM_ARRAY_LENGTH,
    randomPrecision = RANDOM_PRECISION,
  }: TestOptions,
): void {
  if (skip?.pdf !== true) {
    test('pdf', () => {
      const res = x.map((v) => instance.pdf(v));
      const exp = pdf.map((v) => expect.closeTo(v, precision));
      expect(res).toEqual(exp);
    });
  }

  if (skip?.cdf !== true) {
    test('cdf', () => {
      const res = x.map((v) => instance.cdf(v));
      const exp = cdf.map((v) => expect.closeTo(v, precision));
      expect(res).toEqual(exp);
    });
  }

  if (skip?.quantile !== true) {
    test('quantile', () => {
      const res = QUANTILES.map((v) => instance.quantile(v));
      const exp = quantile.map((v) => expect.closeTo(v, precision));
      expect(res).toEqual(exp);
    });
  }

  if (skip?.random !== true) {
    test('random', () => {
      const exp = cdf.map((v) => expect.closeTo(v, randomPrecision));
      const randomValues = instance.random(randomArrayLength, {rand});
      const empiricalCdf = Array.from<number>({length: x.length}).fill(0);

      for (let i = 0; i < randomArrayLength; i++) {
        const idx = x.findIndex((v) => randomValues[i] <= v);

        if (idx > -1) {
          empiricalCdf[idx] += 1;
        }
      }

      let cumsum = 0;
      for (let j = 0; j < x.length; j++) {
        cumsum += empiricalCdf[j];
        empiricalCdf[j] = cumsum / randomArrayLength;
      }

      expect(empiricalCdf).toEqual(exp);
    });
  }
}
