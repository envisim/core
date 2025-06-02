import { type RandomGenerator } from "@envisim/random";
import { ValidationError } from "@envisim/utils";
import {
  Distribution,
  Interval,
  type RandomOptions,
  RANDOM_OPTIONS_DEFAULT,
} from "../abstract-distribution.js";
import { HypergeometricParams } from "../params.js";
import { binomialCoefficient, logBinomialCoefficient } from "../utils.js";
import { logFactorial } from "../utils.js";

/**
 * @category Discrete distributions
 */
export class Hypergeometric extends Distribution {
  /** @internal */
  #params!: HypergeometricParams;

  /**
   * The Hypergeometric distribution
   *
   * @example
   * const x = new Hypergeometric(10, 5, 2);
   * x.pdf(1);
   * x.cdf(2);
   * x.quantile(0.5)
   * x.random(10);
   */
  constructor(N?: number, K?: number, n?: number) {
    super();
    this.#params = new HypergeometricParams(N, K, n);
    this.support = new Interval(
      Math.max(0, this.#params.n + this.#params.K - this.#params.N),
      Math.min(this.#params.n, this.#params.K),
      false,
      true,
    );
  }

  /** @internal */
  get params() {
    return this.#params;
  }

  pdf(x: number): number {
    const check = this.support.checkPDFInt(x);
    if (check !== null) {
      return check;
    } else if (this.params.n === 0 || this.params.K === 0) {
      return x === 0 ? 1.0 : 0.0;
    }

    return Math.exp(
      logBinomialCoefficient(this.params.K, x) +
        logBinomialCoefficient(this.params.N - this.params.K, this.params.n - x) -
        this.params.lbc,
    );
  }

  /*
   * Berger, R. L. (1991).
   * A Remark on Algorithm AS 152: Cumulative Hypergeometric Probabilities.
   * Journal of the Royal Statistical Society Series C, 40(2), 374-375.
   * https://doi.org/10.2307/2347606
   *
   * Shea, B. L. (1989).
   * Remark AS R77: A remark on algorithm AS 152: Cumulative hypergeometric probabilities.
   * Journal of the Royal Statistical Society. Series C (Applied Statistics), 38(1), 199-204.
   * https://doi.org/10.2307/2347696
   *
   * Lund, R. E. (1980).
   * Algorithm AS 152: Cumulative hypergeometric probabilities.
   * Journal of the Royal Statistical Society. Series C (Applied Statistics), 29(2), 221-223.
   * https://doi.org/10.2307/2986315
   *
   * Welinder, M. (2004).
   * Bug 6772 - phyper accuracy and efficiency
   * R-project.
   * https://bugs.r-project.org/show_bug.cgi?id=6772
   */
  cdf(x: number, eps: number = 1e-12): number {
    let NK = this.params.K;
    let KN = this.params.N - this.params.K;

    let xx0 = x;
    let flip = false;

    if (x < Math.max(0, this.params.n - KN)) {
      return 0.0;
    } else if (x >= Math.min(this.params.n, this.params.K)) {
      return 1.0;
    } else if (x * this.params.N > this.params.n * this.params.K) {
      xx0 = this.params.n - x - 1;
      NK = KN;
      KN = this.params.K;
      flip = true;
    }

    let xx = xx0;

    let e = 1.0;
    let s = 1.0;

    while (xx > 0 && e > s * eps) {
      e *= (xx * (KN - this.params.n + xx)) / ((NK - xx + 1) * (this.params.n - xx + 1));
      s += e;
      xx--;
    }

    const pdf = Math.exp(
      logBinomialCoefficient(NK, xx0) +
        logBinomialCoefficient(KN, this.params.n - xx0) -
        this.params.lbc,
    );

    return flip ? 1.0 - s * pdf : s * pdf;
  }

  quantile(q: number): number {
    if (q < 0.0 || q > 1.0) return NaN;
    let NK = this.params.K;
    let KN = this.params.N - this.params.K;
    const k0 = Math.max(0, this.params.n - KN);
    if (q === 0.0) return k0;
    const k1 = Math.min(this.params.n, this.params.K);
    if (q === 1.0) return Math.min(this.params.n, this.params.K);

    let nk = k0;
    let kn = this.params.n - k0;
    let e =
      (binomialCoefficient(NK, nk) * binomialCoefficient(KN, kn)) /
      binomialCoefficient(this.params.N, this.params.n);
    let s = e;
    NK -= nk;
    KN -= kn;

    while (s < q && nk < k1) {
      nk++;
      KN++;
      e *= (NK / KN) * (kn / nk);
      s += e;
      kn--;
      NK--;
    }

    return nk;
  }

  /*
   * Kachitvichyanukul, V., & Schmeiser, B. (1985).
   * Computer generation of hypergeometric random variates.
   * Journal of Statistical Computation and Simulation, 22(2), 127-145.
   * https://doi.org/10.1080/00949658508810839
   */
  override random(n: number = 1, options: RandomOptions = RANDOM_OPTIONS_DEFAULT): number[] {
    n = Math.trunc(n);
    ValidationError.check["number-not-positive"]({ arg: "n" }, n)?.raise();

    const rv = Array.from<number>({ length: n });
    // n1 = K
    // n2 = N - K
    // n = k
    // H2PE 0.0
    const n0 = this.params.N;
    let n1 = this.params.K;
    let n2 = n0 - n1;
    if (n1 > n2) {
      n1 = n2;
      n2 = this.params.K;
    }
    const k = this.params.n <= n0 * 0.5 ? this.params.n : n0 - this.params.n;

    // H2PE 0.1
    const m = (((k + 1) * (n1 + 1)) / (n0 + 2)) | 0;
    if (m - Math.max(0, k - n2) < 10) {
      for (let i = 0; i < n; i++) {
        rv[i] = this.quantile(options.rand.random());
      }
      return rv;
    }

    const a =
      logFactorial(m) + logFactorial(n1 - m) + logFactorial(k - m) + logFactorial(n2 - k + m);
    const d = 0.5 + ((1.5 * Math.sqrt(((n0 - k) * k * n1 * n2) / ((n0 - 1) * n0 * n0))) | 0); // unclear
    const xl = m - d + 0.5;
    const xr = m + d + 0.5;
    const kl = Math.exp(
      a -
        logFactorial(xl) -
        logFactorial(n1 - xl) -
        logFactorial(k - xl) -
        logFactorial(n2 - k + xl),
    );
    const kr = Math.exp(
      a -
        logFactorial(xr - 1) -
        logFactorial(n1 - xr + 1) -
        logFactorial(k - xr + 1) -
        logFactorial(n2 - k + xr - 1),
    );
    const lambdal = -Math.log((xl * (n2 - k + xl)) / ((n1 - xl + 1) * (k - xl + 1)));
    const lambdar = -Math.log(((n1 - xr + 1) * (k - xr + 1)) / (xr * (n2 - k + xr)));
    const p1 = 2 * d;
    const p2 = p1 + kl / lambdal;
    const p3 = p2 + kr / lambdar;

    const constants: HypergeometricRandom = {
      n0,
      n1,
      n2,
      k,
      m,
      xl,
      xr,
      lambdal,
      lambdar,
      p1,
      p2,
      p3,
    };

    for (let i = 0; i < n; i++)
      rv[i] = randomHypergeometric_inner.call(this, options.rand, constants);
    return rv;
  }

  mean(): number {
    const { N, K, n } = this.params;
    return (n * K) / N;
  }

  variance(): number {
    const { N, K, n } = this.params;
    return (this.mean() * (N - K) * (N - n)) / (N * (N - 1));
  }

  mode(): number {
    const { N, K, n } = this.params;
    return Math.ceil(((n + 1) * (K + 1)) / (N + 2)) - 1;
  }

  skewness(): number {
    const { N, K, n } = this.params;
    return (
      (((N - 2 * K) * (N - 2 * n)) / (N - 2)) * Math.sqrt((N - 1) / (n * K * (N - K) * (N - n)))
    );
  }
}

interface HypergeometricRandom {
  n0: number;
  n1: number;
  n2: number;
  k: number;
  m: number;
  xl: number;
  xr: number;
  lambdal: number;
  lambdar: number;
  p1: number;
  p2: number;
  p3: number;
}

function randomHypergeometric_inner(
  this: Hypergeometric,
  rand: RandomGenerator,
  { n0, n1, n2, k, m, xl, xr, lambdal, lambdar, p1, p2, p3 }: HypergeometricRandom,
): number {
  // H2PE 1
  let i: number, f: number, u: number, v: number;
  let y: number = 0;

  let xm: number, xn: number, xk: number;
  let y1: number, ym: number, yn: number, yk: number;
  let r: number, s: number, t: number, e: number;
  let nk: number, nm: number;
  let g: number, gu: number, gl: number;
  let ub: number, av: number;
  let dg: number, dr: number, ds: number, dt: number, de: number;

  let run = 0;
  while (run++ <= 1e5) {
    u = rand.random() * p3;
    v = rand.random();
    if (u <= p1) {
      // H2PE 1
      y = (xl + u) | 0;
    } else if (u <= p2) {
      // H2PE 2
      y = (xl + Math.log(v) / lambdal) | 0;
      if (y < Math.max(0, k - n2)) continue;
      v *= (u - p1) * lambdal;
    } else {
      y = (xr - Math.log(v) / lambdar) | 0;
      if (y > Math.min(n1, k)) continue;
      v *= (u - p2) * lambdar;
    }

    if (m < 100 || y <= 50) {
      // H2PE 4.1
      f = 1.0;
      if (m < y) {
        for (i = m + 1; i <= y; i++) f *= ((n1 - i + 1) * (k - i + 1)) / (i * (n2 - k + i));
      } else if (m > y) {
        for (i = y + 1; i <= m; i++) f *= (i * (n2 - k + i)) / ((n1 - i + 1) * (k - i + 1));
        // f *= (i * (n2 - k + i)) / ((n1 - i) * (k - i));
      }
      if (v > f) continue;
      break;
    } else {
      // H2PE 4.2
      // x = y;
      y1 = y + 1;
      ym = y - m;
      yn = n1 - y + 1;
      yk = k - y + 1;
      nk = n2 - k + y1;
      r = -ym / y1;
      s = ym / yn;
      t = ym / yk;
      e = -ym / nk;
      g = (yn * yk) / (y1 * nk) - 1.0;
      dg = g < 0 ? 1.0 + g : 1.0;
      gu = g * (1.0 + g * (-0.5 + g / 3.0));
      gl = gu - Math.pow(g, 4) / (4 * dg); // unclear
      xm = m + 0.5;
      xn = n1 - m + 0.5;
      xk = k - m + 0.5;
      nm = n2 - k + xm;
      ub =
        xm * r * (1.0 + r * (-0.5 + r / 3.0)) +
        xn * s * (1.0 + s * (-0.5 + s / 3.0)) +
        xk * t * (1.0 + t * (-0.5 + t / 3.0)) +
        nm * e * (1.0 + e * (-0.5 + e / 3.0)) +
        y * gu -
        m * gl +
        0.0034;
      av = Math.log(v);
      if (av > ub) continue;
      dr = xm * Math.pow(r, 4);
      if (r < 0) dr /= 1 + r;
      ds = xn * Math.pow(s, 4);
      if (s < 0) ds /= 1 + s;
      dt = xk * Math.pow(t, 4);
      if (t < 0) dt /= 1 + t;
      de = nm * Math.pow(e, 4);
      if (e < 0) de /= 1 + e;

      if (
        av < ub - 0.25 * (dr + ds + dt + de) + (y + m) * (gl - gu) - 0.0078 ||
        av <=
          -logFactorial(y) - logFactorial(n1 - y) - logFactorial(k - y) - logFactorial(n2 - k + y)
      )
        break;
    }
  }

  // H2PE 5
  if (this.params.n < n0 * 0.5)
    return this.params.K <= this.params.N - this.params.K ? y : this.params.n - y;
  if (this.params.K <= this.params.N - this.params.K) return this.params.K - y;
  return this.params.n - this.params.N + this.params.K + y;
}
