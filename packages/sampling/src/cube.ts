import {arrayLikeToArray, Matrix, TArrayLike} from '@envisim/matrix';
import {
  IOptions,
  optionsDefaultDistfun,
  optionsDefaultEps,
  optionsDefaultRand,
} from './types.js';
import {numberInOpen01} from './utils.js';

/**
 * Subroutine for the cube method.
 *
 * @ignore
 * @param arg - Arguments.
 * @param arg.p - Array of inclusion probabilities.
 * @param arg.Bm - Matrix.
 * @returns Updated inclusion probabilities.
 */
const _oneStepFastFlightCube = ({
  p,
  Bm,
  eps = optionsDefaultEps,
}: {
  p: number[];
  Bm: Matrix;
  eps?: number;
}): number[] => {
  const prob = p.slice();
  const N = Bm.nrow;
  const K = Bm.ncol;

  // nr of units must be larger than nr of balancing variables
  if (N > K) {
    throw new RangeError(
      'Number of units must be larger than number of balancing variables',
    );
  }

  const u = new Array(K);
  let free = -1;

  // find nonzero vector u in Ker B (null space of B, i.e. Bu = 0)
  // with both positive and negative values
  // find reduced row echelon form of B
  const B = Bm.reducedRowEchelon();
  for (let i = N - 1; i >= 0; i--) {
    // find lead (first nonzero entry on row) if exists
    // if no lead, i.e lead = ncol, do nothing
    // if lead, the variables after are either set or free
    // free variables are set to 1 or -1 (is this the best?, does it matter?)
    let lead = 0;
    for (let j = 0; j < K; j++) {
      if (B.atRC(i, j) !== 0) break;
      lead++;
    }

    // lead found
    if (lead < K) {
      let v = 0;
      for (let j = lead + 1; j < K; j++) {
        if (typeof u[j] !== 'number') {
          free *= -1;
          u[j] = free;
        }

        v -= u[j] * B.atRC(i, j);
      }
      u[lead] = v / B.atRC(i, lead);
    }
  }

  // unset u[i] are free and are set to 1 or -1, can only exist at beginning
  for (let i = 0; i < K; i++) {
    if (typeof u[i] === 'number') break;
    free *= -1;
    u[i] = free;
  }

  let lambda1 = Infinity;
  let lambda2 = Infinity;
  // find lambda1 and lambda2
  for (let i = 0; i < K; i++) {
    if (u[i] > 0) {
      lambda1 = Math.min(lambda1, (1 - prob[i]) / u[i]);
      lambda2 = Math.min(lambda2, prob[i] / u[i]);
    } else if (u[i] < 0) {
      lambda1 = Math.min(lambda1, prob[i] / u[i]);
      lambda2 = Math.min(lambda2, (prob[i] - 1) / u[i]);
    }
  }

  // random choice of p+lambda1*u and p-lambda2*u
  const lambda =
    Math.random() < lambda2 / (lambda1 + lambda2) ? lambda1 : -lambda2;

  // update phi
  prob.forEach((_, i) => {
    prob[i] += lambda * u[i];
    if (prob[i] < eps) {
      prob[i] = 0.0;
    } else if (prob[i] > 1 - eps) {
      prob[i] = 1.0;
    }
  });

  return prob;
};

/**
 * Selects a balanced (pips) sample using the cube method.
 *
 * - opts.eps defaults to 1e-9.
 *
 * @param prob - Array or column vector of inclusion probabilities.
 * @param xm - N*p Matrix of balancing variables, where N is equal to size of `prob`.
 * @param options - {@link IOptions.rand}, {@link IOptions.eps}
 * @param options.rand - Available: {@link IOptions.rand}, {@link IOptions.eps}
 * @returns The sample.
 */
export const cube = (
  prob: TArrayLike,
  xm: Matrix,
  {rand = optionsDefaultRand, eps = optionsDefaultEps}: IOptions = {},
): number[] => {
  // landing by supression of balancing variables,
  // starting from the column with largest index.
  // the first (nr of balancing variables +1) undecided
  // units are sent to flightphase each time.
  // hence the units can be sorted by decending probabilities
  // before applying the method in order to improve balance
  // by deciding for large units first. this is not done automatically.

  const p = arrayLikeToArray(prob);
  const pr = p.slice();
  const N = pr.length;
  const K = xm.ncol;

  if (N !== xm.nrow) {
    throw new RangeError('Rows in xm must match length of prob');
  }

  let nr = N;
  let counts = 0;
  let start = 0;

  while (nr > 0 && counts <= N) {
    nr = 0;
    let pSmall: number[] = [];
    let iSmall: number[] = [];

    for (let i = start; i < N; i++) {
      if (numberInOpen01(pr[i], eps)) {
        nr++;
        continue;
      }

      if (start === i) {
        start = i + 1;
      }
      // start is the first undecided unit in the list
    }

    // nr is nr of units with 0<p<1
    // howmany is the number of units we choose to use
    // in the flight phase. for optimal speed it is
    // equal to nr of balancing variables + 1.
    // if fewer units remain, balancing variables are dropped.
    // the maximum nr of balancing variables is howmany - 1.

    const howmany = Math.min(K + 1, nr);
    // run flightphase only if howmany > 1
    if (howmany > 1) {
      // build empty arrays to hold p and index
      // for selected subset
      pSmall = new Array(howmany);
      iSmall = new Array(howmany);
      // build empty B-matrix of size (howmany-1) x howmany
      const B = new Matrix(0.0, howmany - 1, howmany);

      // fill B, pSmall, iSmall
      let count2 = 0;
      for (let i = start; i < N; i++) {
        if (!numberInOpen01(pr[i], eps)) continue;
        if (count2 >= howmany) break;

        for (let j = 0; j < howmany - 1; j++) {
          B.edRC(i, count2, xm.atRC(i, j) / p[i]);
        }
        pSmall[count2] = pr[i];
        iSmall[count2] = i;

        count2++;
      }

      // run flightphase on selected subset
      pSmall = _oneStepFastFlightCube({p: pSmall, Bm: B, eps});

      // update p
      for (let i = 0; i < howmany; i++) {
        pr[iSmall[i]] = pSmall[i];
      }
    } else {
      // max one unit left
      for (let i = start; i < N; i++) {
        if (!numberInOpen01(pr[i], eps)) continue;
        pr[i] = rand.float() < pr[i] ? 1.0 : 0.0;
      }
    }

    counts++;
  }

  const s = [];
  for (let i = 0; i < N; i++) {
    if (pr[i] < 1 - eps) continue;
    s.push(i);
  }
  return s;
};

/**
 * Selects a doubly balanced sample using the local cube method.
 *
 * - opts.distfun defaults to [euclideanSquared]{@link sampling.euclideanSquared}.
 * - opts.eps defaults to 1e-9.
 *
 * @param prob Array or column vector of inclusion probabilities.
 * @param xb N*p Matrix of balancing variables, where N is equal to size of `prob`.
 * @param xs N*p Matrix of variables to spread the sample, where N is equal to
 *   size of `prob`.
 * @param options - Available:
 *   {@link IOptions.rand}, {@link IOptions.eps}, {@link IOptions.distfun}, {@link IOptions.categorical}
 * @returns An array of indices of the sample.
 */
export const localcube = (
  prob: TArrayLike,
  xb: Matrix,
  xs: Matrix,
  options: IOptions = {},
): number[] => {
  const distfun = options.distfun ?? optionsDefaultDistfun;
  const rand = options.rand ?? optionsDefaultRand;
  const eps = options.eps ?? optionsDefaultEps;
  const cat = options.categorical;

  const p = arrayLikeToArray(prob);
  const pr = p.slice();
  const N = pr.length;
  const K = xb.ncol;

  if (N !== xb.nrow)
    throw new RangeError('Rows in xm must match length of prob');

  let left: number[] = [];
  pr.forEach((e, i) => {
    if (numberInOpen01(e, eps)) {
      left.push(i);
    }
  });

  let nr: number = N;
  let counts: number = 0;

  while (nr > 0 && counts < N) {
    nr = left.length;
    let pSmall: number[] = [];
    let iSmall: number[] = [];

    // nr is nr of units with 0<p<1
    // howmany is the number of units we choose to use
    // in the flight phase. for optimal speed and spatial balance it is
    // equal to nr of balancing variables + 1.
    // if fewer units remain, balancing variables are dropped.
    // the maximum nr of balancing variables is howmany - 1.
    const howmany = Math.min(K + 1, nr);
    // run flightphase only if howmany > 1

    if (howmany > 1) {
      // build empty arrays to hold p and index
      // for selected subset
      pSmall = new Array(howmany);
      iSmall = new Array(howmany);

      // build empty B-matrix of size (howmany-1) x howmany
      const B = new Matrix(0.0, howmany - 1, howmany);

      // select one unit randomly
      const one = Math.floor(Math.random() * nr);

      // calculate distance to the others, and store
      // only the howmany closests
      const dists: number[][] = new Array(howmany);
      for (let i = 0; i < howmany; i++) {
        dists[i] = [i, Infinity];
      }

      for (let i = 0; i < nr; i++) {
        const d = distfun(xs, left[one], left[i], cat);
        // check if candidate
        if (d >= dists[howmany - 1][1]) continue;

        for (let j = 0; j < howmany; j++) {
          if (d >= dists[j][1]) continue;
          // enter new value at correct position
          dists.splice(j, 0, [i, d]);
          // remove last element of dists
          dists.pop();
          break;
        }
      }

      // fill B, pSmall, iSmall
      for (let i = 0; i < howmany; i++) {
        for (let j = 0; j < howmany - 1; j++) {
          B.edRC(j, i, xb.atRC(left[dists[i][0]], j) / p[left[dists[i][0]]]);
        }
        pSmall[i] = pr[left[dists[i][0]]];
        iSmall[i] = left[dists[i][0]];
      }

      // run flightphase on selected subset
      pSmall = _oneStepFastFlightCube({p: pSmall, Bm: B, eps});

      // update p
      for (let i = 0; i < howmany; i++) {
        pr[iSmall[i]] = pSmall[i];
      }

      // remove finished units from array left
      let j = 0;
      for (let i = 0; i < nr; i++) {
        if (numberInOpen01(pr[left[j]])) {
          j++;
        } else {
          left.splice(j, 1);
        }
      }
    } else {
      if (left.length === 1) {
        if (numberInOpen01(pr[left[0]])) {
          pr[left[0]] = rand.float() < pr[left[0]] ? 1.0 : 0.0;
        }
        left = [];
      }
    }
    counts++;
  }

  const s = [];
  for (let i = 0; i < N; i++) {
    if (pr[i] < 1 - eps) continue;
    s.push(i);
  }
  return s;
};
