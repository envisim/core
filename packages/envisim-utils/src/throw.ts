export function throwRangeError(err: string | null | undefined): asserts err is null | undefined {
  if (err) throw new RangeError(err);
}
