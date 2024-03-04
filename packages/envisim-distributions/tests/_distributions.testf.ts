import {expect, test} from 'vitest';

import {Random} from '@envisim/random';

export const QARR = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
export const PRECISION = 4;
export const RPRECISION = 2;
export const RANDN = 100000;

export const createTable = (...arrs: number[][]): number[][] => {
  const c: number[][] = [];
  for (let i = 0; i < arrs[0].length; i++) {
    c.push(arrs.map((e) => e[i]));
  }
  return c;
};

export const fromTo = (from: number, to: number, by: number) => {
  const s: number[] = [];
  for (let i = from; i <= to; i += by) s.push(i);
  return s;
};

export const distTests = ({
  Dist,
  x,
  params,
  pdf,
  cdf,
  quantile,
  rand = new Random('test'),
  doTests = [1, 2, 3, 4],
  randn = RANDN,
  precision = PRECISION,
  rprecision = RPRECISION,
}: {
  Dist: any;
  x: number[];
  params: any;
  pdf: number[];
  cdf: number[];
  quantile: number[];
  rand?: Random;
  doTests?: number[];
  randn?: number;
  precision?: number;
  rprecision?: number;
}): void => {
  if (doTests.indexOf(1) >= 0)
    test.each(createTable(Dist.pdf(x, params), pdf, x))(
      'pdf (%f, %f) [%f]',
      (x: number, v: number) => {
        expect(x).toBeCloseTo(v, precision);
      },
    );

  if (doTests.indexOf(2) >= 0)
    test.each(createTable(Dist.cdf(x, params), cdf, x))(
      'cdf (%f, %f) [%f]',
      (x: number, v: number) => {
        expect(x).toBeCloseTo(v, precision);
      },
    );

  if (doTests.indexOf(3) >= 0)
    test.each(createTable(Dist.quantile(QARR, params), quantile, QARR))(
      'quantile (%f, %f) [%f]',
      (x: number, v: number) => {
        expect(x).toBeCloseTo(v, precision);
      },
    );

  if (doTests.indexOf(4) >= 0) {
    const r = Dist.random(randn, params, {rand});
    const rq = x.map(
      (e) =>
        r.reduce((t: number, v: number) => t + (v <= e ? 1 : 0), 0) / randn,
    );

    test.each(createTable(rq, cdf, x))(
      'random (%f, %f) [%f]',
      (x: number, v: number) => {
        expect(x).toBeCloseTo(v, rprecision);
      },
    );
  }
};
