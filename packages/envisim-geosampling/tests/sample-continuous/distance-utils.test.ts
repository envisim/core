import {expect, test} from 'vitest';

import {
  effectiveRadius,
  halfNormalDetectionFunction,
  integrate,
  uniformDetectionFunction,
} from '../../src/sample-continuous/distance-utils.js';

const f1 = (x: number) => x;
const f2 = () => 1;
const f3 = () => 0.5;
const halfNormal = halfNormalDetectionFunction(2);
const uniform = uniformDetectionFunction();

test('integrate', () => {
  expect(integrate(f1, 0, 1)).toBeCloseTo(0.5, 4);
  expect(integrate(Math.sin, 0, Math.PI)).toBeCloseTo(2, 4);
});
test('effectiveRadius', () => {
  expect(effectiveRadius(f2, 3)).toBeCloseTo(3, 4);
  expect(effectiveRadius(f3, 3)).toBeCloseTo(Math.sqrt(4.5), 4);
});
test('uniformDetectionFunction', () => {
  expect(uniform(-1)).toBe(0);
  expect(uniform(0)).toBe(1);
  expect(uniform(5)).toBe(1);
  expect(uniform(6)).toBe(1);
});
test('halfNormalDetectionFunction', () => {
  expect(halfNormal(-1)).toBe(0);
  expect(halfNormal(0)).toBe(1);
  expect(halfNormal(5) > 0).toBe(true);
});
