import { expect, test } from "vitest";
import { EnvisimError, ValidationError as VE } from "../src/errors.js";

test("ValidationError", () => {
  expect(() => VE.checkOther("other-value-not-existing", "", undefined)?.cast()).toThrowError();
  expect(() => VE.checkOther("other-value-not-existing", "", void 0).cast()).toThrowError();

  expect(() => VE.checkOther("other-value-not-existing", "", 0)?.cast()).not.toThrowError();
  expect(() => VE.checkOther("other-array-empty", "", [])?.cast()).toThrowError();
  expect(() => VE.checkOther("other-array-empty", "", [undefined])?.cast()).not.toThrowError();

  expect(() => VE.checkNumber("number-not-number", "", undefined)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-number", "", -22.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-integer", "", -22.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-integer", "", -22)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-positive", "", 0.0)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-positive", "", -0.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-positive", "", 0.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-negative", "", -0.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-negative", "", 0.0)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-negative", "", 0.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-nonnegative", "", -0.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-nonnegative", "", 0.0)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-nonnegative", "", 0.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-nonpositive", "", -0.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-nonpositive", "", 0.0)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-nonpositive", "", 0.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-finite", "", Infinity)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-finite", "", 0.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-in-unit-interval", "", -0.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-in-unit-interval", "", 0.0)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-in-unit-interval", "", 0.2)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-in-unit-interval", "", 1.0)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-in-unit-interval", "", 1.2)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-positive-i32", "", -10)?.cast()).toThrowError();
  expect(() => VE.checkNumber("number-not-positive-i32", "", 10)?.cast()).not.toThrowError();
  expect(() => VE.checkNumber("number-not-positive-i32", "", 0x8fffffff)?.cast()).toThrowError();
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
