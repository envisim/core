import {describe, expect, test} from 'vitest';

import {srswor, srswr} from '../src/index';
import {RandomMock} from './_Random.testf';
import './_equalArrays.testf';

describe('srs', () => {
  const rand = new RandomMock();

  test('srs wr', () => {
    expect(srswr(5, 10, {rand})).arrayToEqual([1, 1, 1, 1, 1]);
    expect(srswr(2, 10, {rand})).arrayToEqual([1, 1]);
    expect(srswr(1, 10, {rand})).arrayToEqual([1]);
  });

  test('srs wor', () => {
    expect(srswor(5, 10, {rand})).arrayToEqual([0, 1, 2, 3, 4]);
    expect(srswor(2, 10, {rand})).arrayToEqual([0, 1]);
    expect(srswor(1, 10, {rand})).arrayToEqual([1]);
  });
});
