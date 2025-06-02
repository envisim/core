export interface Interval {
  interval: [number] | [number, number];
  ends?: "closed" | "open" | "left-open" | "right-open";
}

export function inInterval(x: number, { interval, ends = "closed" }: Interval): boolean {
  if (!Number.isFinite(x)) return false;

  switch (ends) {
    case "closed":
      return interval[0] <= x && (interval[1] === undefined || x <= interval[1]);
    case "open":
      return interval[0] < x && (interval[1] === undefined || x < interval[1]);
    case "left-open":
      return interval[0] < x && (interval[1] === undefined || x <= interval[1]);
    case "right-open":
      return interval[0] <= x && (interval[1] === undefined || x < interval[1]);
  }
}

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

export function intervalToText({ interval, ends = "closed" }: Interval, arg: string = "x"): string {
  const left = Number.isFinite(interval[0])
    ? `${interval[0]} ${ends === "closed" || ends === "right-open" ? "<=" : "<"} `
    : "";
  const right = Number.isFinite(interval[1])
    ? ` ${ends === "closed" || ends === "left-open" ? "<=" : "<"} ${interval[1]}`
    : "";

  return `${left}${arg}${right}`;
}
