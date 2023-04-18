import type {IGeodesic} from './types.js';

import {geodesicParameters, geodesicToGeocentric} from './utils.js';
import {wgs84} from './wgs84.js';

export const sweref99: IGeodesic = geodesicParameters({
  a: 6378137.0,
  f: 1.0 / 298.257222101,
});
