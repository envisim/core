import {Matrix} from '@envisim/matrix';
import {
  IOptions,
  optionsDefaultDistfun,
  optionsDefaultEps,
} from '@envisim/sampling';

/** @internal */
export const nearestNeighbourArray = (
  xm: Matrix,
  idx: number,
  {distfun = optionsDefaultDistfun, eps = optionsDefaultEps}: IOptions = {},
): number[] => {
  const neighbours: number[] = [];
  let mindist = Infinity;
  let dist;

  for (let j = 0; j < xm.nrow; j++) {
    if (idx === j) continue;
    dist = distfun(xm, idx, j);

    if (dist > mindist) continue;

    if (dist + eps < mindist) {
      neighbours.splice(0, neighbours.length, j);
      mindist = dist;
      continue;
    }

    neighbours.push(j);
  }

  return neighbours;
};
