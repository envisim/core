export function inClosedInterval(x: number, a: number = 0.0, b: number = 1.0): boolean {
  return a <= x && x <= b;
}

export function inOpenInterval(x: number, a: number = 0.0, b: number = 1.0): boolean {
  return a < x && x < b;
}
