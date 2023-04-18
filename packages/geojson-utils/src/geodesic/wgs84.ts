import type {IGeodesic} from './types.js';

import {geodesicParameters} from './utils.js';

export const wgs84: IGeodesic = geodesicParameters({
  a: 6378137.0,
  f: 1.0 / 298.257223563,
});
