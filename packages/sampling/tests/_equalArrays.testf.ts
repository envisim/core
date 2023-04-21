export const arraysAreEqual = (a: number[], b: number[]): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  return a.every((e, i) => e === b[i]);
};

export const arraysAreAlmostEqual = (
  a: number[],
  b: number[],
  eps: number = 1e-9,
): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  return a.every((e, i) => Math.abs(e - b[i]) < eps);
};

declare global {
  namespace jest {
    interface Matchers<R> {
      arrayToEqual(expected: number[]): R;
      arrayToAlmostEqual(expected: number[], eps?: number): R;
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
  arrayToAlmostEqual: (a: number[], b: number[], eps: number = 1e-9) => {
    const equal = arraysAreAlmostEqual(a, b, eps);

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
