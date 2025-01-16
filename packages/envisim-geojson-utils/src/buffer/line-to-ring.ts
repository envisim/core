import type * as GJ from '../types/geojson.js';

export function lineToRing(line: GJ.Position[]): GJ.Position[][] {
  const ring: GJ.Position[] = [...line];

  for (let i = line.length - 1; i-- > 0; ) {
    ring.push(line[i]);
  }

  return [ring];
}
