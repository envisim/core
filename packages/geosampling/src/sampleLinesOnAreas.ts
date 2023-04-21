import {Random} from '@envisim/random';
import {sampleBeltsOnAreas} from './sampleBeltsOnAreas.js';

export type TsampleLinesOnAreasOpts = {
  distBetween: number;
  rotation?: number;
  rand?: Random;
};

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param geoJSON - A GeoJSON FeatureCollection.
 * @param opts - An options object.
 * @param opts.distBetween - Distance in meters between the parallell lines.
 * @param opts.rotation - Rotation angle in degrees.
 * @param opts.rand - Optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of LineString/MultiLineString.
 */
export const sampleLinesOnAreas = (
  geoJSON: GeoJSON.FeatureCollection,
  opts: TsampleLinesOnAreasOpts,
): GeoJSON.FeatureCollection => {
  const beltOpts = {
    distBetween: opts.distBetween || 100,
    rotation: opts.rotation || 0,
    halfWidth: 0,
    rand: opts.rand ?? new Random(),
  };
  return sampleBeltsOnAreas(geoJSON, beltOpts);
};
