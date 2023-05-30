import {lpm2, rpm, spm} from '../src/index';
import {Pivotal, PivotalMethod} from '../src/sampling-classes/Pivotal';
import {RandomMock} from './_Random.testf';
import {data} from './_data.testf';
import './_equalArrays.testf';

describe('Pivotal', () => {
  const rand01 = new RandomMock(0.01);
  const rand99 = new RandomMock(0.99);

  test('lpm1Int', () => {
    const lpmInt = new Pivotal(
      PivotalMethod.LPM1,
      2,
      data,
      10,
      2,
      1e-9,
      rand01,
    );

    expect(lpmInt.probabilities[0]).toBe(2);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([0, 1]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[0]).toBe(0);
    expect(lpmInt.probabilities[1]).toBe(4);
    expect(lpmInt.idx.exists(0)).toBe(false);
    expect(lpmInt.idx.exists(1)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([9, 4]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[9]).toBe(0);
    expect(lpmInt.probabilities[4]).toBe(4);
    expect(lpmInt.idx.exists(9)).toBe(false);
    expect(lpmInt.idx.exists(4)).toBe(true);
  });

  test('lpm1Double', () => {
    const lpmDouble = new Pivotal(
      PivotalMethod.LPM1,
      new Array<number>(10).fill(0.2),
      data,
      10,
      2,
      1e-9,
      rand99,
    );

    expect(lpmDouble.probabilities[0]).toBe(0.2);

    lpmDouble.draw();
    expect(lpmDouble.pair).arrayToEqual([9, 4]);
    lpmDouble.resolveDouble();
    expect(lpmDouble.probabilities[9]).toBe(0.4);
    expect(lpmDouble.probabilities[4]).toBe(0.0);
    expect(lpmDouble.idx.exists(9)).toBe(true);
    expect(lpmDouble.idx.exists(4)).toBe(false);
  });

  test('lpm2Int', () => {
    const lpmInt = new Pivotal(
      PivotalMethod.LPM2,
      2,
      data,
      10,
      2,
      1e-9,
      rand01,
    );

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([0, 1]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[0]).toBe(0);
    expect(lpmInt.probabilities[1]).toBe(4);
    expect(lpmInt.idx.exists(0)).toBe(false);
    expect(lpmInt.idx.exists(1)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([9, 4]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[9]).toBe(0);
    expect(lpmInt.probabilities[4]).toBe(4);
    expect(lpmInt.idx.exists(9)).toBe(false);
    expect(lpmInt.idx.exists(4)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([8, 3]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[8]).toBe(0);
    expect(lpmInt.probabilities[3]).toBe(4);
    expect(lpmInt.idx.exists(8)).toBe(false);
    expect(lpmInt.idx.exists(4)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([7, 2]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[7]).toBe(0);
    expect(lpmInt.probabilities[2]).toBe(4);
    expect(lpmInt.idx.exists(7)).toBe(false);
    expect(lpmInt.idx.exists(2)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([6, 5]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[6]).toBe(0);
    expect(lpmInt.probabilities[5]).toBe(4);
    expect(lpmInt.idx.exists(6)).toBe(false);
    expect(lpmInt.idx.exists(5)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([5, 3]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[5]).toBe(0);
    expect(lpmInt.probabilities[3]).toBe(8);
    expect(lpmInt.idx.exists(5)).toBe(false);
    expect(lpmInt.idx.exists(3)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([4, 2]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[4]).toBe(0);
    expect(lpmInt.probabilities[2]).toBe(8);
    expect(lpmInt.idx.exists(4)).toBe(false);
    expect(lpmInt.idx.exists(2)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([3, 2]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[3]).toBe(10);
    expect(lpmInt.probabilities[2]).toBe(6);
    expect(lpmInt.idx.exists(3)).toBe(false);
    expect(lpmInt.idx.exists(2)).toBe(true);

    lpmInt.draw();
    expect(lpmInt.pair).arrayToEqual([2, 1]);
    lpmInt.resolveInt();
    expect(lpmInt.probabilities[2]).toBe(0);
    expect(lpmInt.probabilities[1]).toBe(10);
    expect(lpmInt.idx.exists(2)).toBe(false);
    expect(lpmInt.idx.exists(1)).toBe(false);

    expect(lpm2(2, data, {rand: rand01, treeBucketSize: 2})).arrayToEqual([
      1, 3,
    ]);
  });

  test('lpm2Double', () => {
    const lpmDouble = new Pivotal(
      PivotalMethod.LPM2,
      new Array<number>(10).fill(0.2),
      data,
      10,
      2,
      1e-9,
      rand01,
    );

    lpmDouble.run();
    expect(lpmDouble.sample).arrayToEqual([1, 3]);
  });

  test('rpm', () => {
    expect(rpm(new Array<number>(4).fill(0.5), {rand: rand01})).arrayToEqual([
      1, 3,
    ]);
  });

  test('spm', () => {
    expect(spm(new Array<number>(4).fill(0.5), {rand: rand01})).arrayToEqual([
      1, 3,
    ]);
  });
});
