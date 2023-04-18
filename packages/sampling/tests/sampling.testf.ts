import {Random} from '@envisim/random';

export class RandomMock extends Random {
  i = 0;
  arr: number[];

  constructor(arr: number | number[] = 0.1) {
    super();

    if (typeof arr === 'number') {
      this.arr = [arr];
      return this;
    }

    this.arr = [...arr];
    return this;
  }

  float() {
    if (this.i === this.arr.length) this.i = 0;
    return this.arr[this.i++];
  }

  resetCounter() {
    this.i = 0;
  }
}

export const arraysAreEqual = (a: number[], b: number[]): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  return a.every((e, i) => e === b[i]);
};

declare global {
  namespace jest {
    interface Matchers<R> {
      arrayToEqual(expected: number[]): R;
    }
  }
}

expect.extend({
  arrayToEqual: (a: number[], b: number[]) => {
    const equal = arraysAreEqual(a, b);

    if (equal === true) {
      return {
        message: () =>
          `expected ${a.toString()} to not be same as ${b.toString()}`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${a.toString()} to be same as ${b.toString()}`,
      pass: false,
    };
  },
});
