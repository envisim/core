import { expect, test } from "vitest";
import { inInterval } from "../src/interval";

test("inInterval", () => {
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "closed" })).toBeTruthy();
  expect(inInterval(0.0, { interval: [-1, 1], ends: "closed" })).toBeTruthy();
  expect(inInterval(1.0, { interval: [-1, 1], ends: "closed" })).toBeTruthy();
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "open" })).toBeFalsy();
  expect(inInterval(0.0, { interval: [-1, 1], ends: "open" })).toBeTruthy();
  expect(inInterval(1.0, { interval: [-1, 1], ends: "open" })).toBeFalsy();
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "left-open" })).toBeFalsy();
  expect(inInterval(0.0, { interval: [-1, 1], ends: "left-open" })).toBeTruthy();
  expect(inInterval(1.0, { interval: [-1, 1], ends: "left-open" })).toBeTruthy();
  expect(inInterval(-1.0, { interval: [-1, 1], ends: "right-open" })).toBeTruthy();
  expect(inInterval(0.0, { interval: [-1, 1], ends: "right-open" })).toBeTruthy();
  expect(inInterval(1.0, { interval: [-1, 1], ends: "right-open" })).toBeFalsy();
  expect(inInterval(1.0, { interval: [-1], ends: "right-open" })).toBeTruthy();
  expect(inInterval(-Infinity, { interval: [-1, 1], ends: "right-open" })).toBeFalsy();
  expect(inInterval(Infinity, { interval: [-1, 1], ends: "right-open" })).toBeFalsy();
});
