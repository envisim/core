import {describe, expect, test} from 'vitest';

import {srswor, srswr} from '../src/index';
import {RandomMock} from './_Random.testf';
import './_equalArrays.testf';

describe('srs', () => {
  const rand = new RandomMock();

  test('srs wr', () => {
    expect(srswr({n: 5, N: 10, rand})).arrayToEqual([1, 1, 1, 1, 1]);
    expect(srswr({n: 2, N: 10, rand})).arrayToEqual([1, 1]);
    expect(srswr({n: 1, N: 10, rand})).arrayToEqual([1]);
  });

  test('srs wor', () => {
    expect(srswor({n: 5, N: 10, rand})).arrayToEqual([0, 1, 2, 3, 4]);
    expect(srswor({n: 2, N: 10, rand})).arrayToEqual([0, 1]);
    expect(srswor({n: 1, N: 10, rand})).arrayToEqual([1]);
  });
});
