/* eslint-disable-next-line no-loss-of-precision */
export const EULERSCONSTANT = 0.577215664901532860606512090082402431042;

export const HALF_PI = Math.PI * 0.5;
export const HALF_PI_INV = 2.0 / Math.PI;
export const SQRT_PI = Math.sqrt(Math.PI);
export const SQRT_PI_INV = 1.0 / SQRT_PI;
export const LOG_SQRT_PI = Math.log(Math.PI) / 2.0;

export const KFAC = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800] as const;
export const LOGKFAC = [
  0.0, 0.0, 0.6931471805599453, 1.791759469228055, 3.1780538303479458, 4.787491742782046,
  6.579251212010101, 8.525161361065415, 10.60460290274525, 12.801827480081469, 15.104412573075516,
] as const; // Math.log(k!), k = 0,...,10
