import {distTests, fromTo} from './distributions.testf';
import {Cauchy as Dist} from '../src/cauchy';

describe('cauchy(2, 2)', () => {
  const pdf = [
    0.01591549, 0.02195241, 0.03183099, 0.04897075, 0.07957747, 0.12732395,
    0.15915494, 0.12732395, 0.07957747, 0.04897075, 0.03183099, 0.02195241,
    0.01591549,
  ];
  const cdf = [
    0.1024164, 0.1211189, 0.1475836, 0.187167, 0.25, 0.3524164, 0.5, 0.6475836,
    0.75, 0.812833, 0.8524164, 0.8788811, 0.8975836,
  ];
  const quantile = [
    -Infinity,
    -4.1553671,
    -0.7527638,
    0.5469149,
    1.3501606,
    2.0,
    2.6498394,
    3.4530851,
    4.7527638,
    8.1553671,
    Infinity,
  ];
  const x = fromTo(-4, 8, 1);
  const params = {location: 2, scale: 2};

  distTests({Dist, x, params, pdf, cdf, quantile});
});
