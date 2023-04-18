import {distTests, fromTo} from './distributions.testf';
import {Exponential as Dist} from '../src/exponential';

describe('exponential(1.5)', () => {
  const pdf = [
    1.5, 0.823217454, 0.451791318, 0.247948332, 0.13607693, 0.074680603,
    0.040985584, 0.022493365, 0.012344621, 0.006774871, 0.003718128,
  ];
  const cdf = [
    0.0, 0.4511884, 0.6988058, 0.8347011, 0.909282, 0.9502129, 0.9726763,
    0.9850044, 0.9917703, 0.9954834, 0.9975212,
  ];
  const quantile = [
    0.0,
    0.07024034,
    0.14876237,
    0.2377833,
    0.34055042,
    0.46209812,
    0.61086049,
    0.80264854,
    1.07295861,
    1.53505673,
    Infinity,
  ];
  const x = fromTo(0, 10, 1).map((e) => (e * 4) / 10);
  const params = {rate: 1.5};

  distTests({Dist, x, params, pdf, cdf, quantile});
});
