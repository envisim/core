// @ts-ignore
import turfBuffer from '@turf/buffer';

type BufferOpts = {
  radius?: number;
  steps?: number;
};

/**
 * Buffers a GeoJSON FeatureCollection. Geometries are buffered individually.
 * May result in overlapping geometries. Use unionOfPolygons() on resulting
 * FeatureCollection to union overlapping polygons.
 *
 * @param geoJSON - The GeoJSON to buffer.
 * @param opts - Options object.
 * @param opts.radius - The radius/distance to buffer in meters.
 * @param opts.steps - The number of steps in the buffer.
 * @returns - A GeoJSON FeatureCollection with result of buffering. An empty FeatureCollection if failed.
 */
export const buffer = (
  geoJSON: GeoJSON.FeatureCollection,
  opts: BufferOpts,
): GeoJSON.FeatureCollection => {
  const radius = opts.radius ?? 0;
  return turfBuffer(geoJSON, radius / 1000, {
    units: 'kilometers',
    steps: opts.steps ?? 10,
  });
};
