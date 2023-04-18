import {samplePointsOnAreas} from './samplePointsOnAreas.js';

/**
 * Generate points from a uniform Binomial point process
 * on areas of input GeoJSON. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param geoJSON - A GeoJSON Feature or FeatureCollection containing area.
 * @param sampleSize - Number of points to generate.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const uniformBinomialPointProcess = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
  sampleSize: number,
): GeoJSON.FeatureCollection => {
  const points = samplePointsOnAreas(geoJSON, {
    sampleSize: sampleSize,
    method: 'uniform',
    buffer: 0,
  });
  points.features.forEach((feature) => {
    feature.properties = {};
  });
  return points;
};
