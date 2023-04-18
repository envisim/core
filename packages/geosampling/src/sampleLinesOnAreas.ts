import {sampleBeltsOnAreas} from './sampleBeltsOnAreas.js';

interface IsampleLinesOnAreasOpts {
  distBetween: number;
  rotation?: number;
}

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param geoJSON - A GeoJSON Feature/FeatureCollection.
 * @param opts - An options object.
 * @param opts.distBetween - Distance in meters between the parallell lines.
 * @param opts.rotation - Rotation angle in degrees.
 * @returns - A GeoJSON FeatureCollection of LineString/MultiLineString.
 */
export const sampleLinesOnAreas = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
  opts: IsampleLinesOnAreasOpts = {distBetween: 100, rotation: 0},
): GeoJSON.FeatureCollection => {
  const beltOpts = {
    distBetween: opts.distBetween,
    rotation: opts.rotation,
    halfWidth: 0,
  };
  return sampleBeltsOnAreas(geoJSON, beltOpts);
};
