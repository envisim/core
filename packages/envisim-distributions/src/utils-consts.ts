/* eslint-disable no-loss-of-precision */
export const EULERSCONSTANT = 0.5772156649015328606065;
export const RIEMANNZETAFUN3 = 1.202056903159594285399;
export const LOG4 = 1.3862943611198906; // 2 * Math.LN2;
export const LOG5P1 = 2.6094379124341005; // Math.log(5.0) + 1.0;
export const FRAC1_6 = 0.16666666666666666; // 1.0 / 6.0;
export const FRAC2_9 = 0.2222222222222222; // 2.0 / 9.0;
export const SQRT32 = 5.656854249492381; // 5.65685424949238;
export const SQRTPI = 1.7724538509055159; // Math.sqrt(Math.PI);
export const SQRTEBYPI = 0.9301913671026328; // Math.sqrt(Math.E / Math.PI);
export const SQRT2PI = 2.5066282746310002; // Math.sqrt(2.0 * Math.PI);
export const SQRTMPI = 0.5641895835477563; // 1 / SQRTPI
export const LOGSQRTPI = 0.5723649429247001; // Math.log(Math.PI) / 2.0
export const LOGSQRT2PI = 0.9189385332046727; // Math.log(Math.sqrt(2 * Math.PI))
export const KFAC = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800] as const;
export const LOGKFAC = [
  0.0, 0.0, 0.6931471805599453, 1.791759469228055, 3.1780538303479458, 4.787491742782046,
  6.579251212010101, 8.525161361065415, 10.60460290274525, 12.801827480081469, 15.104412573075516,
] as const; // Math.log(k!), k = 0,...,10
export const HALFPI = 1.5707963267948966; // Math.PI * 0.5;
export const EPS = 1e-12; // Smol
