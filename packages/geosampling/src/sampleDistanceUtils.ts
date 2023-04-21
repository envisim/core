// TODO: Should we add parametric options for detection function instead?
// E.g. uniform, halfnormal(sigma),...

/**
 * Returns a uniform detection function on [0, cutoff], i.e. the
 * detection probability is 1 if 0 <= distance <= cutoff and 0 otherwise.
 * @param cutoff - The maximum detection distance in meters.
 * @returns - The uniform detection function.
 */
export const uniformDetectionFunction = (cutoff: number): Function => {
  const g = (dist: number) => {
    if (dist < 0 || dist > cutoff) {
      return 0;
    } else {
      return 1;
    }
  };
  return g;
};

/**
 * Returns a half normal detection function on [0, cutoff].
 * @param sigma - The sigma parameter.
 * @param cutoff - The maximum detection distance in meters.
 * @returns - The half normal detection function.
 */
export const halfNormalDetectionFunction = (
  sigma: number,
  cutoff: number,
): Function => {
  const g = (dist: number) => {
    if (dist < 0 || dist > cutoff) {
      return 0;
    } else {
      return Math.exp(-(dist ** 2 / (2 * sigma ** 2)));
    }
  };
  return g;
};

/**
 * Constructs a detection function on the interval [0,cutoff] given
 * an array of breakValues (probabilities).
 * @param breakValues - Array of n >= 2 detection probabilities at the distances [0,cutoff/(n-1),cutoff/(n-2),...,cutoff].
 * @param cutoff - The maximum detection distance in meters.
 * @returns - The detection function.
 */
export const detectionFunction = (
  breakValues: number[],
  cutoff: number,
): Function => {
  const n = breakValues.length;
  if (cutoff <= 0) {
    throw new Error('cutoff must be a positive number.');
  }
  if (breakValues.length < 2) {
    throw new Error('breakValues must contain at least two elements.');
  }
  for (let i = 0; i < breakValues.length; i++) {
    if (breakValues[i] < 0 || breakValues[i] > 1) {
      throw new Error('breakValues must contain numbers between 0 and 1.');
    }
  }
  const g = (x: number) => {
    if (x < 0 || x > cutoff) {
      return 0;
    }
    for (let i = 0; i < n - 1; i++) {
      const left = (i / (n - 1)) * cutoff;
      const right = ((i + 1) / (n - 1)) * cutoff;
      if (x >= left && x <= right) {
        // Interpolate
        return (
          breakValues[i] +
          ((breakValues[i + 1] - breakValues[i]) * (x - left)) / (right - left)
        );
      }
    }
  };
  return g;
};

/**
 * Integrate a function f from a to b.
 * @param f - Function to integrate.
 * @param a - Lower limit a > -Infinity.
 * @param b - Upper limit b > a and b < Infinity.
 * @param n - Optional, number of intervals will be 3n (default n = 100).
 * @returns - Number, f integrated from a to b.
 */
export const integrate = (
  f: Function,
  a: number,
  b: number,
  n = 100,
): number => {
  // Simpson's 3/8 rule
  const np = 3 * Math.round(n);
  const h = (b - a) / np;
  let sum = 0;
  for (let i = 1; i <= np / 3; i++) {
    sum +=
      f(a + (3 * i - 3) * h) +
      3 * f(a + (3 * i - 2) * h) +
      3 * f(a + (3 * i - 1) * h) +
      f(a + 3 * i * h);
  }
  return ((3 * h) / 8) * sum;
};

/**
 * Computes the effective radius for distance sampling with points.
 * @param g - Detection function (should return detection probability, given distance in meters).
 * @param cutoff - Maximum detection distance in meters.
 * @returns - The effective radius in meters.
 */
export const effectiveRadius = (g: Function, cutoff: number): number => {
  const h = (x: number) => {
    return g(x) * (x / cutoff) * (2 / cutoff);
  };
  const sum = integrate(h, 0, cutoff);
  return cutoff * Math.sqrt(sum);
};

/**
 * Computes the effective half width for distance sampling along a line.
 * @param g - Detection function (should return detection probability, given distance in meters).
 * @param cutoff - Maximum detection distance in meters.
 * @returns - The effective half width in meters.
 */
export const effectiveHalfWidth = (g: Function, cutoff: number): number => {
  return integrate(g, 0, cutoff);
};
