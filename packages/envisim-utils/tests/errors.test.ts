import { expect, test } from "vitest";
import { EnvisimError, ValidationError as VE } from "../src/errors.js";

test("ValidationError", () => {
  expect(() => VE.check["other-value-not-existing"]({}, undefined)?.raise()).toThrowError();
  expect(() => VE.check["other-value-not-existing"]({}, void 0).raise()).toThrowError();
  expect(() => VE.check["other-value-not-existing"]({}, 0)?.raise()).not.toThrowError();

  expect(() => VE.check["array-empty"]({}, [])?.raise()).toThrowError();
  expect(() => VE.check["array-empty"]({}, [undefined])?.raise()).not.toThrowError();
  expect(() => VE.check["array-incorrect-length"]({ length: 3 }, [1, 2])?.raise()).toThrowError();
  expect(() =>
    VE.check["array-incorrect-length"]({ length: 2 }, [1, 2])?.raise(),
  ).not.toThrowError();

  expect(() => VE.check["number-not-number"]({}, undefined)?.raise()).toThrowError();
  expect(() => VE.check["number-not-number"]({}, -22.2)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-integer"]({}, -22.2)?.raise()).toThrowError();
  expect(() => VE.check["number-not-integer"]({}, -22)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-positive"]({}, 0.0)?.raise()).toThrowError();
  expect(() => VE.check["number-not-positive"]({}, -0.2)?.raise()).toThrowError();
  expect(() => VE.check["number-not-positive"]({}, 0.2)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-nonnegative"]({}, -0.2)?.raise()).toThrowError();
  expect(() => VE.check["number-not-nonnegative"]({}, 0.0)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-nonnegative"]({}, 0.2)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-finite"]({}, Infinity)?.raise()).toThrowError();
  expect(() => VE.check["number-not-finite"]({}, 0.2)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-in-unit-interval"]({}, -0.2)?.raise()).toThrowError();
  expect(() => VE.check["number-not-in-unit-interval"]({}, 0.0)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-in-unit-interval"]({}, 0.2)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-in-unit-interval"]({}, 1.0)?.raise()).not.toThrowError();
  expect(() => VE.check["number-not-in-unit-interval"]({}, 1.2)?.raise()).toThrowError();
  expect(() =>
    VE.check["number-not-in-interval"]({ interval: [0, 0x7fffffff] }, -10)?.raise(),
  ).toThrowError();
  expect(() =>
    VE.check["number-not-in-interval"]({ interval: [0, 0x7fffffff] }, 10)?.raise(),
  ).not.toThrowError();
  expect(() =>
    VE.check["number-not-in-interval"]({ interval: [0, 0x7fffffff] }, 0x8fffffff)?.raise(),
  ).toThrowError();
});

test("EnvisimError", () => {
  const e = new EnvisimError();
  expect(e.orNull()).toBeNull();
  expect(EnvisimError.isError(e.orNull())).toBeFalsy();
  expect(() => e.throwErrors()).not.toThrowError();
  expect(e.length).toBe(0);

  e.add(new Error("test"));
  expect(e.orNull()).not.toBeNull();
  expect(EnvisimError.isError(e.orNull())).toBeTruthy();
  expect(() => e.throwErrors()).toThrowError();
  expect(e.length).toBe(1);

  const e2 = new EnvisimError();
  e2.add(new Error("test"));
  e2.add(new Error("test"));
  e.append(e2);
  expect(e.length).toBe(3);

  e.append([new Error("test"), new Error("test")]);
  expect(e.length).toBe(5);
});
