import {describe, expect, test} from 'vitest';

import {
  gammaFunction,
  logGammaFunction,
  regularizedLowerGammaFunction,
  regularizedUpperGammaFunction,
} from '../src/gamma-utils';
import {PRECISION, createTable, fromTo} from './_distributions.testf';

describe('gamma', () => {
  const x = fromTo(0.5, 10, 0.5);
  const lx = [...x, 50];
  const g = x.map(gammaFunction);
  const lg = x.map(logGammaFunction);
  const res = [
    1.772453850905516104, 1.0, 8.8622692545275805198e-1, 1.0,
    1.3293403881791370225, 2.0, 3.3233509704478425562, 6.0,
    1.1631728396567449835e1, 2.4e1, 5.2342777784553526033e1, 1.2e2,
    2.8788527781504438963e2, 7.2e2, 1.8712543057977884473e3, 5.04e3,
    1.4034407293483413014e4, 4.032e4, 1.1929246199460900971e5, 3.6288e5,
  ];
  const lres = [
    0.57236494292470008194, 0.0, -0.12078223763524517653, 0.0,
    0.28468287047291918057, 0.69314718055994528623, 1.20097360234707428717,
    1.79175946922805495731, 2.45373657084244234383, 3.17805383034794575181,
    3.9578139676187165108, 4.78749174278204581157, 5.66256205985714178297,
    6.57925121201010121297, 7.53436423675873268024, 8.52516136106541466688,
    9.54926725730099690281, 10.60460290274525085863, 11.689333420797268559,
    12.80182748008146909058, 144.5657439463448668,
  ];

  test.each(createTable(g, res, x))(
    'gamma (%f, %f) [%f]',
    (x: number, v: number) => {
      expect(x).toBeCloseTo(v, PRECISION);
    },
  );

  test.each(createTable(lg, lres, lx))(
    'logGamma (%f, %f) [%f]',
    (x: number, v: number) => {
      expect(x).toBeCloseTo(v, PRECISION);
    },
  );
});

describe('incomplete gamma', () => {
  const ax = fromTo(0, 10, 1);
  const a5 = new Array(11).fill(5);
  const x1 = [
    //
    ...ax,
    ...a5,
    ...ax,
  ];
  const x2 = [
    //
    ...ax,
    ...ax,
    ...a5,
  ];
  const lgf = x1.map((e, i) => regularizedLowerGammaFunction(e, x2[i]));
  const ugf = x1.map((e, i) => regularizedUpperGammaFunction(e, x2[i]));

  const R_lgf = [
    0.0, 0.63212055882855766598, 0.59399415029016189305, 0.57680991887315657962,
    0.56652987963329093368, 0.55950671493478754126, 0.55432035863538864362,
    0.5502889441513012514, 0.54703919051300542442, 0.54434739567758128054,
    0.54207028552814773281,
    //
    0.0, 0.0036598468273437130896, 0.0526530173437111462253,
    0.1847367554762278651914, 0.3711630648201265647579,
    0.5595067149347875412602, 0.7149434996833687883111,
    0.8270083921179286479131, 0.9003675995129539755268,
    0.9450363585048950909595, 0.9707473119230388691747,
    //
    1.0, 0.993262053000914524326, 0.959572318005487145953,
    0.875347980516918866556, 0.734974084702638252864, 0.55950671493478754126,
    0.384039345166936885168, 0.23781653702706131992, 0.133371674070007301127,
    0.06809363472184855326, 0.031828057306204811383,
  ];
  const R_ugf = R_lgf.map((e) => 1.0 - e);

  test.each(createTable(lgf, R_lgf, x1, x2))(
    'regularizedLowerGamma (%f, %f) [%f, %f]',
    (x: number, v: number) => {
      expect(x).toBeCloseTo(v, PRECISION);
    },
  );

  test.each(createTable(ugf, R_ugf, x1, x2))(
    'regularizedUpperGamma (%f, %f) [%f, %f]',
    (x: number, v: number) => {
      expect(x).toBeCloseTo(v, PRECISION);
    },
  );
});
