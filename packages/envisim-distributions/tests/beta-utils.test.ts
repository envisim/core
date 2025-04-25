import { expect, test } from "vitest";
import { BetaParams } from "../src/beta-utils.js";
import { PRECISION, fromTo } from "./_distributions.testf.js";

const EPS = 1e-20;

test("beta", () => {
  const x = fromTo(0.5, 5, 0.5);
  const x1 = [...x, ...x];
  const x2 = [...x, ...new Array(10).fill(10)];
  const b = x1.map((e, i) => new BetaParams(e, x2[i]).betaFunction());
  const lb = x1.map((e, i) => new BetaParams(e, x2[i]).logBetaFunction());
  const res = [
    3.1415926535897935600872, 1.0, 0.3926990816987241950109, 0.1666666666666666574148,
    0.0736310778185107761562, 0.0333333333333333328707, 0.0153398078788564134339,
    0.0071428571428571435015, 0.0033555829734998403845, 0.0015873015873015873002,
    5.6754638550304303823e-1, 9.9999999999999991673e-2, 2.7026018357287677485e-2,
    9.0909090909090922022e-3, 3.5251328292114311215e-3, 1.5151515151515151502e-3,
    7.0502656584228847944e-4, 3.4965034965034965005e-4, 1.8278466521837015164e-4,
    9.9900099900099900013e-5,
  ];
  const lres = [
    1.1447298858494003859, 0.0, -0.9347116558304356948, -1.7917594692280549573,
    -2.6086880894021073907, -3.4011973816621554612, -4.1773040073159526386, -4.9416424226093038641,
    -5.697129761060366171, -6.4457198193855784751, -0.56643279639759391841, -2.30258509299404590109,
    -3.6109552341210164883, -4.70048036579241568234, -5.64783716138205704738,
    -6.49223983502047197192, -7.25727507381615755122, -7.95857690381389737411,
    -8.60720179076517233341, -9.21133987230926720713,
  ];

  expect(b).toEqual(res.map((r) => expect.closeTo(r, PRECISION)));
  expect(lb).toEqual(lres.map((r) => expect.closeTo(r, PRECISION)));
});

test("regularized beta", () => {
  const beta = new BetaParams(4, 2);
  const x = fromTo(0, 10, 1).map((e) => e / 10);
  const rb = x.map((e) => beta.regularizedBetaFunction(e, EPS));
  const ib = x.map((e) => beta.incompleteBetaFunction(e, EPS));
  const res = [
    0.0, 0.00046000000000000012233, 0.00672000000000000114603, 0.03077999999999998098632,
    0.08704000000000000625278, 0.18749999999999997224442, 0.33695999999999992624566,
    0.52822000000000002284395, 0.73728000000000004643397, 0.91854000000000002312817, 1.0,
  ];
  const ibres = res.map((e) => e * beta.betaFunction());

  expect(rb).toEqual(res.map((r) => expect.closeTo(r, PRECISION)));
  expect(ib).toEqual(ibres.map((r) => expect.closeTo(r, PRECISION)));
});

test("inverse reg beta", () => {
  const beta = new BetaParams(4, 2);
  const x = fromTo(0, 10, 1).map((e) => e / 10);
  const rb = x.map((e) => beta.inverseRegularizedBetaFunction(e, EPS));
  const res = [
    0.0, 0.41610962538047108206, 0.50980765702780561632, 0.5779917925913677923,
    0.63501477359508218257, 0.68618982954430252086, 0.73443130395830280577, 0.78197308423677525102,
    0.83139115104107419452, 0.88776504145414147917, 1.0,
  ];

  expect(rb).toEqual(res.map((r) => expect.closeTo(r, PRECISION)));
});
