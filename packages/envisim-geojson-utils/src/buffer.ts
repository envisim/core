// @ts-expect-error turf-buffer needs to include the exports.types directive
import turfBuffer from '@turf/buffer';

import type * as GJ from './types/geojson.js';
import {AreaCollection} from './geojson/index.js';

type BufferOpts = {
  /**
   * The radius/distance to buffer in meters
   */
  radius?: number;
  /**
   * The number of steps in the buffer.
   */
  steps?: number;
};

/**
 * Buffers a GeoJSON FeatureCollection. Geometries are buffered individually.
 * May result in overlapping geometries. Use unionOfPolygons() on resulting
 * FeatureCollection to union overlapping polygons.
 *
 * @param geoJSON The AreaCollection to buffer.
 * @param opts
 * @returns An buffered AreaCollection, or `null` if buffering failed.
 */
export function buffer(
  geoJSON: AreaCollection,
  opts: BufferOpts,
): AreaCollection | null {
  const radius = opts.radius ?? 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const turfCollection = turfBuffer(geoJSON, radius / 1000, {
    units: 'kilometers',
    steps: opts.steps ?? 10,
  }) as GJ.AreaFeatureCollection;

  if (!turfCollection.features || turfCollection.features.length === 0)
    return null;

  return new AreaCollection(turfCollection, true);
}
