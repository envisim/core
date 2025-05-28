import { expect, test } from "vitest";
import { copy } from "../src/index.js";

const a = [[4, 5]];
const b = copy(a);
const c = [...a];

test("copy", () => {
  b[0][0] = 1;
  expect(b[0][0]).toBe(1);
  expect(a[0][0]).toBe(4);

  c[0][0] = 1;
  expect(b[0][0]).toBe(1);
  expect(c[0][0]).toBe(1);
});
