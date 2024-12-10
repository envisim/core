import {describe, expect, test} from 'vitest';

import {Matrix} from '@envisim/matrix';

import {cube, localCube} from '../src/index';
import {RandomMock} from './_Random.testf';
import {data} from './_data.testf';
import './_equalArrays.testf';

function addToRes(res: number[], arr: number[]): void {
  arr.forEach((v) => (res[v] += 1));
}

function divideByN(res: number[], n: number): void {
  for (let i = 0; i < res.length; i++) res[i] /= n;
}

describe('Cube', () => {
  const rand01 = new RandomMock(0.01);
  const rand99 = new RandomMock(0.99);
  const probs = new Array<number>(10).fill(0.2);
  const balData = Matrix.cbind(new Matrix(probs, 10), data);

  test('length', () => {
    for (let r = 0; r < 100; r++)
      expect(cube({probabilities: probs, balancing: balData}).length).toBe(2);

    for (let r = 0; r < 100; r++)
      expect(localCube({probabilities: probs, balancing: balData, auxiliaries: data}).length).toBe(
        2,
      );
  });

  test('probs', () => {
    const probs2 = [0.1, 0.2, 0.3, 0.4, 0.5, 0.5, 0.4, 0.3, 0.2, 0.1];
    const balData2 = Matrix.cbind(new Matrix(probs2, 10), data);
    const res = new Array<number>(10).fill(0);
    const lres = new Array<number>(10).fill(0);
    const R = 10000;

    for (let r = 0; r < R; r++) {
      addToRes(res, cube({probabilities: probs2, balancing: balData2}));
    }

    divideByN(res, R);
    // round(res);
    expect(res).arrayToAlmostEqual(probs2, 1e-1);

    for (let r = 0; r < R; r++) {
      addToRes(
        lres,
        localCube({
          probabilities: probs2,
          balancing: balData2,
          auxiliaries: data,
        }),
      );
    }

    divideByN(lres, R);
    // round(lres);
    expect(lres).arrayToAlmostEqual(probs2, 1e-1);
  });

  test.todo('cube proper');
  test.todo('lcube proper');
});
