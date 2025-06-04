export interface Interval {
  /** The [left, right] bounds of the interval */
  interval: [number] | [number, number];
  /** The openness of the interval */
  ends?: "closed" | "open" | "left-open" | "right-open";
}

/**
 * @param x -
 * @returns `true` if `x` is within the interval
 */
export function inInterval(
  x: number,
  { interval: [a, b = Infinity], ends = "closed" }: Interval,
): boolean {
  if (!Number.isFinite(x)) return false;

  switch (ends) {
    case "closed":
      return a <= x && x <= b;
    case "open":
      return a < x && x < b;
    case "left-open":
      return a < x && x <= b;
    case "right-open":
      return a <= x && x < b;
  }
}

/**
 * @param x -
 * @returns `true` if `x` is to the left of the interval
 */
export function isLeftOfInterval(x: number, { interval: [a], ends = "closed" }: Interval): boolean {
  switch (ends) {
    case "open":
    case "left-open":
      return x <= a;
    case "closed":
    case "right-open":
      return x < a;
  }
}

/**
 * @param x -
 * @returns `true` if `x` is to the right of the interval
 */
export function isRightOfInterval(
  x: number,
  { interval: [_, b = Infinity], ends = "closed" }: Interval,
): boolean {
  switch (ends) {
    case "open":
    case "right-open":
      return b <= x;
    case "closed":
    case "left-open":
      return b < x;
  }
}

/**
 * @param x -
 * @returns `true` if `x` is within the unit interval
 */
export function inUnitInterval(
  x: number,
  { ends = "closed" }: Omit<Interval, "interval"> = {},
): boolean {
  switch (ends) {
    case "closed":
      return 0.0 <= x && x <= 1.0;
    case "open":
      return 0.0 < x && x < 1.0;
    case "left-open":
      return 0.0 < x && x <= 1.0;
    case "right-open":
      return 0.0 <= x && x < 1.0;
  }
}

/**
 * @returns a string representation of the interval
 */
export function intervalToText({ interval, ends = "closed" }: Interval, arg: string = "x"): string {
  const left = Number.isFinite(interval[0])
    ? `${interval[0]} ${ends === "closed" || ends === "right-open" ? "<=" : "<"} `
    : "";
  const right = Number.isFinite(interval[1])
    ? ` ${ends === "closed" || ends === "left-open" ? "<=" : "<"} ${interval[1]}`
    : "";

  return `${left}${arg}${right}`;
}
