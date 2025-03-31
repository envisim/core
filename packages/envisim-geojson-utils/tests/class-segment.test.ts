import { expect, test } from "vitest";
import { Segment, intersects } from "../src/class-segment.js";

const segments = [
  /* 0*/ new Segment([10, 0], [0, 10]),
  /* 1*/ new Segment([0, 0], [10, 10]),
  /* 2*/ new Segment([0, 0], [20, 10]),
  /* 3*/ new Segment([3, 3], [7, 7]),
  /* 4*/ new Segment([3, 3], [15, 15]),
  /* 5*/ new Segment([-5, -5], [7, 7]),
  /* 6*/ new Segment([15, 15], [20, 20]),
  /* 7*/ new Segment([30, 30], [20, 20]),
  /* 8*/ new Segment([10, 0], [20, 10]),
  /* 9*/ new Segment([5, 0], [5, 10]),
  /*10*/ new Segment([0, 5], [10, 5]),
  /*11*/ new Segment([4, 6], [4, 5]),
  /*12*/ new Segment([4, 6], [3, 7]),
];

test("delta", () => {
  expect(segments[0].delta).toEqual([-10, 10]);
  expect(segments[1].delta).toEqual([10, 10]);
  expect(segments[2].delta).toEqual([20, 10]);
  expect(segments[3].delta).toEqual([4, 4]);
  expect(segments[4].delta).toEqual([12, 12]);
  expect(segments[5].delta).toEqual([12, 12]);
  expect(segments[6].delta).toEqual([5, 5]);
  expect(segments[7].delta).toEqual([-10, -10]);
  expect(segments[8].delta).toEqual([10, 10]);
  expect(segments[9].delta).toEqual([0, 10]);
  expect(segments[10].delta).toEqual([10, 0]);
});

test("vertical", () => {
  expect(segments.map((seg) => seg.isVertical())).toEqual([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
  ]);
});

test("intersect", () => {
  expect(intersects(segments[0], segments[1])).toEqual([[0.5, 0.5]]);
  expect(intersects(segments[0], segments[2])).toEqual([[1 / 3, 1 / 3]]);
  expect(intersects(segments[0], segments[3])).toEqual([[0.5, 0.5]]);
  expect(intersects(segments[0], segments[7])).toEqual([]);
  expect(intersects(segments[0], segments[9])).toEqual([[0.5, 0.5]]);
  expect(intersects(segments[0], segments[10])).toEqual([[0.5, 0.5]]);
  expect(intersects(segments[1], segments[3])).toEqual([
    [0.3, 0],
    [0.7, 1],
  ]);
  expect(intersects(segments[1], segments[4])).toEqual([
    [0.3, 0],
    [1, 7 / 12],
  ]);
  expect(intersects(segments[1], segments[5])).toEqual([
    [0, 5 / 12],
    [7 / 10, 1],
  ]);
  expect(intersects(segments[1], segments[6])).toEqual([]);
  expect(intersects(segments[1], segments[8])).toEqual([]);
  expect(intersects(segments[11], segments[12])).toEqual([[-0, 0]]);
});
