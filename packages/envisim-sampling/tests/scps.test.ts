import { expect, test } from "vitest";
import { lcps, scps } from "../src/index";
import { CorrelatedPoisson } from "../src/sampling-classes/index";
import { RandomMock } from "./_Random.testf";
import { data } from "./_data.testf";
import "./_equalArrays.testf";

const rand01 = new RandomMock(0.01);
const rand99 = new RandomMock(0.99);
const probs = new Array<number>(10).fill(0.2);

test("scps-cps", () => {
  const cps = new CorrelatedPoisson(CorrelatedPoisson.SCPS, probs, data, 10, 2, 1e-9, rand01);

  expect(cps.probabilities[0]).toBe(0.2);

  cps.draw();
  expect(cps.drawUnit).toBe(0);
  cps.resolve();
  expect(cps.probabilities[0]).toBe(1.0);
  expect(cps.probabilities[1]).toBe(0.0);
  expect(cps.probabilities[8]).toBe(0.0);
  expect(cps.probabilities[4]).toBe(0.0);
  expect(cps.probabilities[2]).toBe(0.0);
  expect(cps.idx.exists(0)).toBe(false);
  expect(cps.idx.exists(1)).toBe(false);
  expect(cps.idx.exists(8)).toBe(false);
  expect(cps.idx.exists(4)).toBe(false);
  expect(cps.idx.exists(2)).toBe(false);

  cps.draw();
  expect(cps.drawUnit).toBe(9);
  cps.resolve();
  expect(cps.probabilities[9]).toBe(1.0);
  expect(cps.probabilities[3]).toBe(0.0);
  expect(cps.probabilities[5]).toBe(0.0);
  expect(cps.probabilities[6]).toBe(0.0);
  expect(cps.probabilities[7]).toBe(0.0);
  expect(cps.idx.exists(0)).toBe(false);
  expect(cps.idx.exists(1)).toBe(false);
  expect(cps.idx.exists(8)).toBe(false);
  expect(cps.idx.exists(4)).toBe(false);
  expect(cps.idx.exists(2)).toBe(false);
});

test("scps", () => {
  expect(
    scps({
      probabilities: probs,
      auxiliaries: data,
      rand: rand01,
      treeBucketSize: 2,
    }),
  ).arrayToEqual([0, 9]);
  // 01: 98234567
  // 94: 782365
  // 72: 5863
  // 53: 68
  expect(
    scps({
      probabilities: new Array<number>(10).fill(0.5),
      auxiliaries: data,
      rand: rand01,
      treeBucketSize: 2,
    }),
  ).arrayToEqual([0, 5, 6, 7, 9]);
});

test("lcps-cps", () => {
  const cps = new CorrelatedPoisson(CorrelatedPoisson.LCPS, probs, data, 10, 2, 1e-9, rand01);

  expect(cps.probabilities[0]).toBe(0.2);

  cps.draw();
  expect(cps.drawUnit).toBe(8);
  cps.resolve();
  expect(cps.probabilities[8]).toBe(1.0);
  expect(cps.probabilities[3]).toBe(0.0);
  expect(cps.probabilities[5]).toBe(0.0);
  expect(cps.probabilities[2]).toBe(0.0);
  expect(cps.probabilities[1]).toBe(0.0);
  expect(cps.idx.exists(8)).toBe(false);
  expect(cps.idx.exists(3)).toBe(false);
  expect(cps.idx.exists(5)).toBe(false);
  expect(cps.idx.exists(2)).toBe(false);
  expect(cps.idx.exists(1)).toBe(false);

  cps.draw();
  expect(cps.drawUnit).toBe(4);
  cps.resolve();
  expect(cps.probabilities[4]).toBe(1.0);
  expect(cps.probabilities[9]).toBe(0.0);
  expect(cps.probabilities[7]).toBe(0.0);
  expect(cps.probabilities[0]).toBe(0.0);
  expect(cps.probabilities[6]).toBe(0.0);
  expect(cps.idx.exists(4)).toBe(false);
  expect(cps.idx.exists(9)).toBe(false);
  expect(cps.idx.exists(7)).toBe(false);
  expect(cps.idx.exists(0)).toBe(false);
  expect(cps.idx.exists(6)).toBe(false);
});

test("lcps", () => {
  expect(
    lcps({
      probabilities: probs,
      auxiliaries: data,
      rand: rand01,
      treeBucketSize: 2,
    }),
  ).arrayToEqual([4, 8]);
});

test("scpscoord-cps", () => {
  const cps = new CorrelatedPoisson(CorrelatedPoisson.SCPSCOORD, probs, data, 10, 2, 1e-9);
  cps.setRandomArr(new Array<number>(10).fill(0.0));

  cps.draw();
  expect(cps.drawUnit).toBe(0);
  cps.resolve();
  expect(cps.probabilities[0]).toBe(1.0);
  expect(cps.probabilities[1]).toBe(0.0);
  expect(cps.probabilities[8]).toBe(0.0);
  expect(cps.probabilities[4]).toBe(0.0);
  expect(cps.probabilities[2]).toBe(0.0);
  expect(cps.idx.exists(0)).toBe(false);
  expect(cps.idx.exists(1)).toBe(false);
  expect(cps.idx.exists(8)).toBe(false);
  expect(cps.idx.exists(4)).toBe(false);
  expect(cps.idx.exists(2)).toBe(false);

  cps.draw();
  expect(cps.drawUnit).toBe(3);
  cps.resolve();
  expect(cps.probabilities[3]).toBe(1.0);
  expect(cps.probabilities[9]).toBe(0.0);
  expect(cps.probabilities[5]).toBe(0.0);
  expect(cps.probabilities[6]).toBe(0.0);
  expect(cps.probabilities[7]).toBe(0.0);
  expect(cps.idx.exists(3)).toBe(false);
  expect(cps.idx.exists(9)).toBe(false);
  expect(cps.idx.exists(5)).toBe(false);
  expect(cps.idx.exists(6)).toBe(false);
  expect(cps.idx.exists(7)).toBe(false);
});
