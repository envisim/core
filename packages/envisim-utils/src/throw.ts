export function throwRangeError(err: string | null | undefined): asserts err is null | undefined {
  if (typeof err === 'string') throw new RangeError(err);
}
