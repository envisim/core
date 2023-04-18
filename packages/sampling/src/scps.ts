import {
  Matrix,
  TArrayLike,
  ColumnVector,
  arrayLikeToColumnVector,
} from '@envisim/matrix';
import {
  IOptions,
  optionsDefaultDistfun,
  optionsDefaultEps,
  optionsDefaultRand,
} from './types.js';
import {maxWeight} from './utils.js';

/**
 * Selects a Spatially Correlated Poisson Sample (SCPS)
 * @see Grafström, A. (2012).
 * Spatially correlated Poisson sampling.
 * Journal of Statistical Planning and Inference, 142(1), 139-147.
 * [DOI:10.1016/j.jspi.2011.07.003](https://doi.org/10.1016/j.jspi.2011.07.003)
 *
 * @param prob - an {@link matrix.TArrayLike} of inclusion probabilities.
 * @param xm N*p Matrix of auxilliary variables, where N is equal to size of `prob`.
 * @param options - Available:
 *   {@link IOptions.rand}, {@link IOptions.eps}, {@link IOptions.distfun}, {@link IOptions.categorical}
 * @returns An array of indices of the sample.
 */
export const scps = (
  prob: TArrayLike,
  xm: Matrix,
  options: IOptions = {},
): number[] => {
  const distfun = options.distfun ?? optionsDefaultDistfun;
  const rand = options.rand ?? optionsDefaultRand;
  const eps = options.eps ?? optionsDefaultEps;
  const cat = options.categorical;

  const pr = arrayLikeToColumnVector(prob);
  const N = pr.length;

  if (!Matrix.isMatrix(xm)) throw new TypeError('xm must be Matrix');
  if (xm.nrow !== N)
    throw new RangeError('Rows in xm must match length of prob');

  const indices = ColumnVector.createSequence(0, N - 1, 1);
  const sample = new ColumnVector(-1, N); // -1, 0, 1

  let unresolvedObjects = N;
  let rid: number, id: number, equals: number, o2sLen: number;
  let slag: number, totalWeight: number, weight: number;

  while (unresolvedObjects > 0) {
    // Select step unit
    rid = rand.intn(unresolvedObjects);
    id = indices.at(rid);

    // Decide outcome of step unit
    if (rand.float() <= pr.at(id)) slag = sample.ed(id, 1);
    else slag = sample.ed(id, 0);

    // Switch places in indices for step unit, as step unit is decided
    unresolvedObjects--;
    indices.swap(rid, unresolvedObjects);

    // Obv, break if it was last object
    if (unresolvedObjects === 0) break;

    slag -= pr.at(id);

    // Set an array with indices and distances compared to step: [[id, dist]]
    // For all still undecided units
    const o2s = new Array(unresolvedObjects);
    o2sLen = unresolvedObjects;
    for (let i = 0; i < o2sLen; i++) {
      o2s[i] = [indices.at(i), distfun(xm, id, indices.at(i), cat)];
    }
    // Sort o2s according to distance, with smallest distance first
    o2s.sort((a, b) => a[1] - b[1]);

    // Loop through o2s, until totalWeight is used up
    totalWeight = 1.0;
    for (let i = 0; i < o2sLen && totalWeight > eps; ) {
      // Set an array of indices, distances and weights for all equals (dist)
      // [[id, dist, weight]]
      const o2se = [[...o2s[i], maxWeight(pr.at(id), pr.at(o2s[i][0]))]];

      // Loop through following units in o2s
      for (equals = 1; i + equals < unresolvedObjects; equals++) {
        // Stop loop if distance is bigger than previous
        if (o2s[i + equals][1] - eps > o2s[i][1]) break;

        // Push to o2se [id, dist, weight] of equalling unit
        o2se.push([
          ...o2s[i + equals],
          maxWeight(pr.at(id), pr.at(o2s[i + equals][0])),
        ]);
      }

      // Sort array if necessary, so that smallest weights are first
      // This is needed to ensure that maximum possible weight is distributied
      // at this distance
      if (equals > 1) o2se.sort((a, b) => a[2] - b[2]);

      // Loop through all equals
      for (let j = 0; j < equals; j++) {
        // Maximum avail. weight to distribute to current equal
        weight = totalWeight / (equals - j);

        if (o2se[j][2] <= weight) {
          // If the max weight current unit can provide is less than the
          // weight possible to distribute (weight)
          // we will either fully exhaust or fill the probability of the
          // current unit
          // weight = o2se[j][2];

          if (pr.at(id) + pr.at(o2se[j][0]) <= 1.0) {
            pr.ed(o2se[j][0], sample.at(id) === 1 ? 0.0 : o2se[j][2]);
          } else {
            pr.ed(o2se[j][0], sample.at(id) === 1 ? 1.0 - o2se[j][2] : 1.0);
          }

          totalWeight -= o2se[j][2];
        } else {
          // Otherwise, the current unit will still be in the game
          pr.fn(o2se[j][0], (e) => e - slag * weight);

          totalWeight -= weight;
        }

        // Set sample statuses for units which has fully emptied or filled their
        // probabilities
        if (pr.at(o2se[j][0]) + eps >= 1.0) {
          sample.ed(o2se[j][0], 1);
        } else if (pr.at(o2se[j][0]) - eps <= 0.0) {
          sample.ed(o2se[j][0], 0);
        }

        // ...and "remove" these units from the indices-list
        if (sample.at(o2se[j][0]) !== -1) {
          unresolvedObjects--;
          rid = indices.findIndex((e) => e === o2se[j][0]);
          indices.swap(rid, unresolvedObjects);
        }
      }

      i += equals;
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
