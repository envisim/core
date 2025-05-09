import {describe} from 'vitest';

import {Beta, Semicircle} from '../../src/index.js';
import {QUANTILES, distributionTests, fromTo} from '../_distributions.testf.js';

describe('Semicircle(3)', () => {
  const radius = 3.0;
  const btos = (x: number): number => radius * (2.0 * x - 1.0);
  const x = fromTo(-3, 3, 0.5);
  // const pdf = Beta.pdf(x.map(stob), bparams);
  // const cdf = Beta.cdf(x.map(stob), bparams);
  const pdf = [
    0.0, 0.11730160661470734329, 0.15816945409270605216, 0.18377629847393070484,
    0.20007029247935695371, 0.20923852026807379656, 0.21220659078919379414, 0.20923852026807379656,
    0.20007029247935695371, 0.18377629847393070484, 0.15816945409270605216, 0.11730160661470734329,
    0.0,
  ];
  const cdf = [
    0.0, 0.039802490408953117296, 0.109551018708523961731, 0.195501109477885293142,
    0.291791405790928826125, 0.394389990894867870086, 0.5, 0.605610009105132185425,
    0.708208594209071229386, 0.804498890522114651347, 0.89044898129147609378,
    0.960197509591046882704, 1.0,
  ];
  const beta = new Beta(1.5, 1.5);
  const quantile = QUANTILES.map((q) => btos(beta.quantile(q)));

  distributionTests(new Semicircle(radius), {x, pdf, cdf, quantile});
});
