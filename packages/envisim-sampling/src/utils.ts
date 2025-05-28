import { ValidationError } from "@envisim/utils";

export function arrayBack<T>(arr: T[]): T {
  ValidationError.checkOther("other-array-empty", "arr", arr);
  return arr[arr.length - 1];
}

export function probability1(p: number, eps: number): boolean {
  return p >= 1.0 - eps;
}

export function probability01(p: number, eps: number): boolean {
  return p <= eps || p >= 1.0 - eps;
}

export function assertSizeRange(
  n: number,
  minSize: number = 0,
  maxSize: number = Number.MAX_SAFE_INTEGER,
  argName: string = "n",
): void {
  (
    ValidationError.checkNumber("number-not-integer", argName, n) ??
    (minSize <= n && n <= maxSize
      ? undefined
      : ValidationError.createNumber(
          "number-not-in-interval",
          argName,
          `${minSize} <= ${argName} <= ${maxSize}`,
        ))
  )?.cast();
}
