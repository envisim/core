import {expect, test} from 'vitest';

import {Vector, sequence} from '../src/index.js';

test('accessors', () => {
  const c1content = [1, 0, 4, 3, 5, -1];
  const c1 = new Vector(c1content);
  const c2 = c1.clone();

  expect(c1.slice()).toEqual(c1content);
  expect(c1.length).toBe(6);
  expect(c1.ncol).toBe(1);
  expect(c1.length).toBe(6);
  expect(c1.nrow).toBe(6);
  expect(c1.dim()).toEqual([6, 1]);
  expect(c1.at(2)).toBe(4);
  expect(c2.ed(2, 10)).toBe(10);
  expect(c2.at(2)).toBe(10);
  expect(c2.fn(2, (e) => e + 2)).toBe(12);
  expect(c2.at(2)).toBe(12);
  expect(c1.indexOf(4)).toBe(2);
  expect(c1.colOfIndex(2)).toBe(0);
  expect(c1.rowOfIndex(2)).toBe(2);
  expect(c1.lastIndexOf(5)).toBe(4);
});

test('basic operators', () => {
  const c1content = [1, 0, 4, 3, 5, -1];
  const c1 = new Vector(c1content);
  const c1m2 = c1content.map((e) => e * 2);

  expect(c1.add(c1).slice()).toEqual(c1m2);
  expect(c1.multiply(2).slice()).toEqual(c1m2);
});

test('copy methods', () => {
  const c1content = [1, 0, 4, 3, 5, -1];
  const c1 = new Vector(c1content);

  expect(c1.clone().slice()).toEqual(c1.slice());
  expect(c1.filter((e) => e > 0).slice()).toEqual([1, 4, 3, 5]);
});

test('statistics', () => {
  const c1content = [1, 0, 4, 3, 5, -1];
  const c1 = new Vector(c1content);
  const c3 = sequence(1, 6, 1);

  expect(c1.correlation(c3)).toBeCloseTo(0.09035079029);
  expect(c1.covariance(c3)).toBeCloseTo(0.4);
  expect(c1.cumulativeSum().slice()).toEqual([1, 1, 5, 8, 13, 12]);
});

test('maps', () => {
  const c1content = [1, 0, 4, 3, 5, -1];
  const c1sorted = [...c1content].sort((a, b) => a - b);
  const c1 = new Vector(c1content);
  const c1_cumsum = new Vector([1, 1, 5, 8, 13, 12]);
  const c1_sorti = [5, 1, 0, 3, 2, 4];

  expect(c1.some((e) => e < 0)).toBe(true);
  expect(c1_cumsum.some((e) => e < 0)).toBe(false);
  expect(c1.sort((a, b) => a - b).slice()).toEqual(c1sorted);
  expect(c1.sortIndex()).toEqual(c1_sorti);
  expect(c1.union(c1_cumsum).slice()).toEqual([...c1content, 8, 13, 12]);
  expect(c1.intersect(c1_cumsum).slice()).toEqual([1, 5]);
});
