import {
  arrayLikeToColumnVector,
  ColumnVector,
  Matrix,
  TArrayLike,
} from '@envisim/matrix';
import {Random} from '@envisim/random';
import {
  IOptions,
  optionsDefaultDistfun,
  optionsDefaultEps,
  optionsDefaultRand,
} from './types.js';

interface Choose {
  (indices: ColumnVector, unresolvedObjects: number): number[];
}

/**
 * The pivotal method, generic.
 *
 * @ignore
 * @param arg - Arguments.
 * @param arg.p - Array of inclusion probabilities.
 * @param arg.choose - Function taking arguments (indices, unresolvedObjects),
 *   where indices is an array of indices, where 0 ,..., unresolvedObjects-1 are
 *   unresolved (i.e. has probability mass in (0, 1)). arg.choose should return
 *   an array with two unique elements within 0 and unresolvedObjects - 1.
 * @param arg.rand - Instance of {@link random.Random}.
 * @param arg.eps - Epsilon.
 * @returns An array of indices of chosen units, the sample.
 */
const _pivotal = ({
  p: prob,
  choose,
  rand,
  eps = optionsDefaultEps,
}: {
  p: ColumnVector;
  choose: Choose;
  rand: Random;
  eps?: number;
}): number[] => {
  const N = prob.length;
  const indices = ColumnVector.createSequence(0, N - 1, 1).sortRandom(
    true,
    rand,
  );
  const sample = new ColumnVector(-1, N); // -1, 0, 1

  let unresolvedObjects: number = N;
  let rid1: number, id1: number, rid2: number, id2: number, psum: number;

  while (unresolvedObjects > 0) {
    // Resolve lonely unit
    if (unresolvedObjects === 1) {
      id1 = indices.at(0);
      sample.ed(id1, rand.float() <= prob.at(id1) ? 1 : 0);
      unresolvedObjects--;
      break;
    }

    // Get competing objects
    [rid1, rid2] = choose(indices, unresolvedObjects);
    id1 = indices.at(rid1);
    id2 = indices.at(rid2);

    // Resolve new probabilities
    psum = prob.at(id1) + prob.at(id2);
    if (psum <= 1.0) {
      if (rand.float() * psum <= prob.at(id1)) {
        prob.ed(id1, psum);
        prob.ed(id2, 0.0);
      } else {
        prob.ed(id1, 0.0);
        prob.ed(id2, psum);
      }
    } else {
      if (rand.float() * (2.0 - psum) <= 1.0 - prob.at(id2)) {
        prob.ed(id1, 1.0);
        prob.ed(id2, psum - 1.0);
      } else {
        prob.ed(id1, psum - 1.0);
        prob.ed(id2, 1.0);
      }
    }

    // Fix sample status
    if (prob.at(id1) <= eps) {
      sample.ed(id1, 0);
    } else if (1.0 - eps <= prob.at(id1)) {
      sample.ed(id1, 1);
    }

    if (prob.at(id2) <= eps) {
      sample.ed(id2, 0);
    } else if (1.0 - eps <= prob.at(id2)) {
      sample.ed(id2, 1);
    }

    // Remove unit 1 from indices if it is decided
    if (sample.at(id1) !== -1) {
      unresolvedObjects--;
      indices.swap(rid1, unresolvedObjects);
      // If unit 1 and 2 just switched places
      if (rid2 === unresolvedObjects) {
        rid2 = rid1;
      }
    }

    // Remove unit 2 from indices if it is decided
    if (sample.at(id2) !== -1) {
      unresolvedObjects--;
      indices.swap(rid2, unresolvedObjects);
    }
  }

  const ret: number[] = [];
  sample.forEach((e, i) => {
    if (e === 1) {
      ret.push(i);
    }
  });

  return ret;
};

/**
 * Selects a (pips) sample using the local pivotal method 1.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param xm - N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param options - Available:
 *   {@link IOptions.rand}, {@link IOptions.eps}, {@link IOptions.distfun}, {@link IOptions.categorical}
 * @returns An array of indices of the sample.
 */
export const lpm1 = (
  prob: TArrayLike,
  xm: Matrix,
  options: IOptions = {},
): number[] => {
  const distfun = options.distfun ?? optionsDefaultDistfun;
  const rand = options.rand ?? optionsDefaultRand;
  const eps = options.eps ?? optionsDefaultEps;
  const cat = options.categorical;

  const p = arrayLikeToColumnVector(prob);
  const N = p.length;

  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');
  if (xm.nrow !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const findClosestNeighbours = (
    indices: ColumnVector,
    unresolvedObjects: number,
    start: number,
    rid1: number,
  ): number[] => {
    // o2s: the array of [[rid, id]] of neighbours to rid1
    const id1 = indices.at(rid1);
    let o2s: number[] = [];
    let maxdist: number = Infinity;
    let dist: number;

    for (let i = start; i < unresolvedObjects; i++) {
      if (i === rid1) continue;
      dist = distfun(xm, id1, indices.at(i), cat);

      if (dist > maxdist) continue;

      if (dist + eps < maxdist) {
        o2s = [i];
        maxdist = dist;
        continue;
      }

      o2s.push(i);
    }

    return o2s;
  };

  const findNeighboursNeighbour = (
    indices: ColumnVector,
    unresolvedObjects: number,
    rid2: number,
  ): number[] => {
    const id2 = indices.at(rid2);
    let o2s: number[] = [];
    let maxdist: number = Infinity;
    let dist: number;

    for (let i = 0; i < unresolvedObjects; i++) {
      if (i === rid2) continue;
      dist = distfun(xm, id2, indices.at(i), cat);

      if (dist > maxdist) continue;

      if (dist + eps < maxdist) {
        o2s = [i];
        maxdist = dist;
        continue;
      }

      o2s.push(i);
    }

    return o2s;
  };

  const choose: Choose = (
    indices: ColumnVector,
    unresolvedObjects: number,
  ): number[] => {
    for (let rid1 = 0; rid1 < unresolvedObjects; rid1++) {
      // We only need to look forward in the list, as all previous units should
      // already have been selected
      const start = rid1 + 1;

      const o2s = findClosestNeighbours(
        indices,
        unresolvedObjects,
        start,
        rid1,
      );

      for (let i = 0; i < o2s.length; i++) {
        // findNeighboursNeighbour differs from findClosestNeighbour, as
        // closest can skip looking at previous units in the list, as
        const o2s2 = findNeighboursNeighbour(
          indices,
          unresolvedObjects,
          o2s[i],
        );

        if (o2s2.indexOf(rid1) > -1) return [rid1, o2s[i]];
      }
    }

    // Fallback
    return [0, 1];
  };

  return _pivotal({p, choose, rand, eps});
};

/**
 * Selects a (pips) sample using the local pivotal method 2.
 *
 * @param prob an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param xm N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param options - Available:
 *   {@link IOptions.rand}, {@link IOptions.eps}, {@link IOptions.distfun}, {@link IOptions.categorical}
 * @returns An array of indices of the sample.
 */
export const lpm2 = (
  prob: TArrayLike,
  xm: Matrix,
  options: IOptions = {},
): number[] => {
  const distfun = options.distfun ?? optionsDefaultDistfun;
  const rand = options.rand ?? optionsDefaultRand;
  const eps = options.eps ?? optionsDefaultEps;
  const cat = options.categorical;

  const p = arrayLikeToColumnVector(prob);
  const N = p.length;

  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');
  if (xm.nrow !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const choose: Choose = (
    indices: ColumnVector,
    unresolvedObjects: number,
  ): number[] => {
    // const rid1 = rand.intn(unresolvedObjects);
    const rid1 = 0; // Should work since indices is randomized
    const id1 = indices.at(rid1);
    // let i = rid1 === 0 ? 1 : 0; // stat

    let o2s: number[] = [];
    let mindist: number = Infinity;
    let dist: number;

    for (let i = 1; i < unresolvedObjects; i++) {
      if (i === rid1) continue;
      dist = distfun(xm, id1, indices.at(i), cat);

      if (dist > mindist) continue;

      if (dist + eps < mindist) {
        o2s = [i];
        mindist = dist;
        continue;
      }

      o2s.push(i);
    }

    // Draw randomly from list
    const o2si = rand.intn(o2s.length);
    return [rid1, o2s[o2si]];
  };

  return _pivotal({p, choose, rand, eps});
};

/**
 * Selects a (pips) sample using the local pivotal method {@link lpm1} or
 * {@link lpm2}.
 *
 * If `variant = 1`, then {@link lpm1} is run. Otherwise {@link lpm2} (default).
 *
 * @param prob an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param xm N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param options - Available:
 *   {@link IOptions.rand}, {@link IOptions.eps}, {@link IOptions.distfun}, {@link IOptions.variant}
 * @returns An array of indices of the sample.
 */
export const lpm = (
  prob: TArrayLike,
  xm: Matrix,
  {variant = 2, ...options}: IOptions = {},
): number[] => {
  if (variant === 1) return lpm1(prob, xm, options);

  return lpm2(prob, xm, options);
};

/**
 * Selects a (pips) sample using random pivotal method.
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param options - Available: {@link IOptions.rand}, {@link IOptions.eps}
 * @returns An array of indices of chosen units, the sample.
 */
export const randomPivotal = (
  prob: TArrayLike,
  {rand = optionsDefaultRand, eps = optionsDefaultEps}: IOptions = {},
): number[] => {
  const p = arrayLikeToColumnVector(prob);

  const choose: Choose = (_: ColumnVector, __: number): number[] => {
    // const rid1 = rand.intn(unresolvedObjects);
    // let rid2 = rand.intn(unresolvedObjects - 1);

    // if (rid2 === rid1) {
    //   rid2 = unresolvedObjects - 1;
    // }

    // return [rid1, rid2];

    // Should work since indices is randomized
    return [0, 1];
  };

  return _pivotal({p, choose, rand, eps});
};
