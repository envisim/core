import {TArrayLike, arrayLikeToArray} from '@envisim/matrix';

/** @internal */
export function parseAndCheckSampleArray(
  sample: TArrayLike,
  N: number,
): number[] {
  const s = arrayLikeToArray(sample);

  if (!s.every((e: number): boolean => Number.isInteger(e) && 0 <= e && e < N))
    throw new TypeError('sample must be a vector of valid sample indices');

  return s;
}
