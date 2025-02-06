import {type Vector} from '@envisim/matrix';

/** @internal */
export function checkSampleArray(sample: number[] | Vector, N: number): void {
  if (!sample.every((e: number): boolean => Number.isInteger(e) && 0 <= e && e < N)) {
    throw new TypeError('sample must be a vector of valid sample indices');
  }
}
