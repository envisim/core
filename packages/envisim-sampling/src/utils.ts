export function arrayBack<T>(arr: T[]): T {
  if (arr.length === 0) throw new RangeError('array is empty');
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
  argName: string = 'n',
): void {
  if (!Number.isInteger(n)) throw new TypeError(`${argName} must be integer`);
  if (n < minSize || maxSize < n)
    throw new RangeError(
      `${argName} must be between ${minSize} and ${maxSize}`,
    );
}
