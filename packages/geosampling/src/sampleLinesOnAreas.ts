import {
  sampleBeltsOnAreas,
  TsampleBeltsOnAreasOpts,
} from './sampleBeltsOnAreas.js';

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param geoJSON - A GeoJSON FeatureCollection.
 * @param distBetween - Distance in meters between the parallell lines.
 * @param opts - An options object.
 * @param opts.rotation - Rotation angle in degrees.
 * @param opts.rand - Optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of LineString/MultiLineString.
 */
export const sampleLinesOnAreas = (
  geoJSON: GeoJSON.FeatureCollection,
  distBetween: number,
  opts: TsampleBeltsOnAreasOpts,
): GeoJSON.FeatureCollection => {
  return sampleBeltsOnAreas(geoJSON, distBetween, 0, opts);
};
