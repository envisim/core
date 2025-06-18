import { expect, test } from "vitest";
import { inInterval, inUnitInterval, isLeftOfInterval, isRightOfInterval } from "../src/interval";

test("inInterval", () => {
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "closed" })).toBe(true);
  expect(inInterval(0.0, { interval: [-1, 1], ends: "closed" })).toBe(true);
  expect(inInterval(1.0, { interval: [-1, 1], ends: "closed" })).toBe(true);
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "open" })).toBe(false);
  expect(inInterval(0.0, { interval: [-1, 1], ends: "open" })).toBe(true);
  expect(inInterval(1.0, { interval: [-1, 1], ends: "open" })).toBe(false);
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "left-open" })).toBe(false);
  expect(inInterval(0.0, { interval: [-1, 1], ends: "left-open" })).toBe(true);
  expect(inInterval(1.0, { interval: [-1, 1], ends: "left-open" })).toBe(true);
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "right-open" })).toBe(true);
  expect(inInterval(0.0, { interval: [-1, 1], ends: "right-open" })).toBe(true);
  expect(inInterval(1.0, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(inInterval(1.0, { interval: [-1], ends: "right-open" })).toBe(true);
  expect(inInterval(-Infinity, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(inInterval(Infinity, { interval: [-1, 1], ends: "right-open" })).toBe(false);
});

test("isLeftOfInterval", () => {
  expect(isLeftOfInterval(-1.0, { interval: [-1, 1], ends: "closed" })).toBe(false);
  expect(isLeftOfInterval(0.0, { interval: [-1, 1], ends: "closed" })).toBe(false);
  expect(isLeftOfInterval(1.0, { interval: [-1, 1], ends: "closed" })).toBe(false);
  expect(isLeftOfInterval(-1.0, { interval: [-1, 1], ends: "open" })).toBe(true);
  expect(isLeftOfInterval(0.0, { interval: [-1, 1], ends: "open" })).toBe(false);
  expect(isLeftOfInterval(1.0, { interval: [-1, 1], ends: "open" })).toBe(false);
  expect(isLeftOfInterval(-1.0, { interval: [-1, 1], ends: "left-open" })).toBe(true);
  expect(isLeftOfInterval(0.0, { interval: [-1, 1], ends: "left-open" })).toBe(false);
  expect(isLeftOfInterval(1.0, { interval: [-1, 1], ends: "left-open" })).toBe(false);
  expect(isLeftOfInterval(-1.0, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(isLeftOfInterval(0.0, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(isLeftOfInterval(1.0, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(isLeftOfInterval(1.0, { interval: [-1], ends: "right-open" })).toBe(false);
  expect(isLeftOfInterval(-Infinity, { interval: [-1, 1], ends: "right-open" })).toBe(true);
  expect(isLeftOfInterval(Infinity, { interval: [-1, 1], ends: "right-open" })).toBe(false);
});

test("isRightOfInterval", () => {
  expect(isRightOfInterval(-1.0, { interval: [-1, 1], ends: "closed" })).toBe(false);
  expect(isRightOfInterval(0.0, { interval: [-1, 1], ends: "closed" })).toBe(false);
  expect(isRightOfInterval(1.0, { interval: [-1, 1], ends: "closed" })).toBe(false);
  expect(isRightOfInterval(-1.0, { interval: [-1, 1], ends: "open" })).toBe(false);
  expect(isRightOfInterval(0.0, { interval: [-1, 1], ends: "open" })).toBe(false);
  expect(isRightOfInterval(1.0, { interval: [-1, 1], ends: "open" })).toBe(true);
  expect(isRightOfInterval(-1.0, { interval: [-1, 1], ends: "left-open" })).toBe(false);
  expect(isRightOfInterval(0.0, { interval: [-1, 1], ends: "left-open" })).toBe(false);
  expect(isRightOfInterval(1.0, { interval: [-1, 1], ends: "left-open" })).toBe(false);
  expect(isRightOfInterval(-1.0, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(isRightOfInterval(0.0, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(isRightOfInterval(1.0, { interval: [-1, 1], ends: "right-open" })).toBe(true);
  expect(isRightOfInterval(1.0, { interval: [-1], ends: "right-open" })).toBe(false);
  expect(isRightOfInterval(-Infinity, { interval: [-1, 1], ends: "right-open" })).toBe(false);
  expect(isRightOfInterval(Infinity, { interval: [-1, 1], ends: "right-open" })).toBe(true);
});

test("inUnitInterval", () => {
  expect(inUnitInterval(0.0, { ends: "closed" })).toBe(true);
  expect(inUnitInterval(1.0, { ends: "closed" })).toBe(true);
  expect(inUnitInterval(0.0, { ends: "open" })).toBe(false);
  expect(inUnitInterval(1.0, { ends: "open" })).toBe(false);
  expect(inUnitInterval(0.0, { ends: "left-open" })).toBe(false);
  expect(inUnitInterval(1.0, { ends: "left-open" })).toBe(true);
  expect(inUnitInterval(0.0, { ends: "right-open" })).toBe(true);
  expect(inUnitInterval(1.0, { ends: "right-open" })).toBe(false);
});
