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
