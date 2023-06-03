import {AreaCollection, LineCollection} from '@envisim/geojson-utils';

import {
  sampleBeltsOnAreas,
  TsampleBeltsOnAreasOpts,
} from './sampleBeltsOnAreas.js';

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param collection an AreaCollection.
 * @param distBetween distance in meters between the parallell lines.
 * @param opts an options object.
 * @param opts.rotation rotation angle in degrees.
 * @param opts.rand optional instance of Random.
 * @returns a LineCollection of LineString/MultiLineString.
 */
export function sampleLinesOnAreas(
  collection: AreaCollection,
  distBetween: number,
  opts: TsampleBeltsOnAreasOpts,
): LineCollection {
  return sampleBeltsOnAreas(collection, distBetween, 0, opts);
}
