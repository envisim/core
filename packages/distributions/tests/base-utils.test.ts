import {factorial, logFactorial} from '../src/utils';
import {createTable, fromTo, PRECISION} from './distributions.testf';

describe('factorial', () => {
  const x = fromTo(0, 10, 1);
  const fac = x.map(factorial);
  const lfac = x.map(logFactorial);
  const res = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];
  const lres = [
    0.0, 0.0, 0.6931472, 1.7917595, 3.1780538, 4.7874917, 6.5792512, 8.5251614,
    10.6046029, 12.8018275, 15.1044126,
  ];

  test.each(createTable(fac, res, x))(
    'factorial (%f, %f) [%f]',
    (x: number, v: number) => {
      expect(x).toBeCloseTo(v, PRECISION);
    },
  );

  test.each(createTable(lfac, lres, x))(
    'logFactorial (%f, %f) [%f]',
    (x: number, v: number) => {
      expect(x).toBeCloseTo(v, PRECISION);
    },
  );
});
