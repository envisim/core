import {AreaCollection, LineCollection} from '@envisim/geojson-utils';

import {
  sampleBeltsOnAreas,
  TsampleBeltsOnAreasOpts,
} from './sampleBeltsOnAreas.js';

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param collection - An AreaCollection.
 * @param distBetween - Distance in meters between the parallell lines.
 * @param opts - An options object.
 * @param opts.rotation - Rotation angle in degrees.
 * @param opts.rand - Optional instance of Random.
 * @returns - A LineCollection of LineString/MultiLineString.
 */
export function sampleLinesOnAreas(
  collection: AreaCollection,
  distBetween: number,
  opts: TsampleBeltsOnAreasOpts,
): LineCollection {
  return sampleBeltsOnAreas(collection, distBetween, 0, opts);
}
