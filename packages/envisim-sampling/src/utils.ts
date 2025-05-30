import { ValidationError } from "@envisim/utils";

export function arrayBack<T>(arr: T[]): T {
  ValidationError.check["other-array-empty"]({ arg: "arr" }, arr)?.raise();
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
    ValidationError.check["number-not-integer"]({ arg: argName }, n) ??
    ValidationError.check["number-not-in-interval"](
      { arg: argName, interval: [minSize, maxSize], ends: "closed" },
      n,
    )
  )?.raise();
}
