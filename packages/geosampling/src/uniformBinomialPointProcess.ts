import {samplePointsOnAreas} from './samplePointsOnAreas.js';
import {Random} from '@envisim/random';

/**
 * Generate points from a uniform Binomial point process
 * on areas of input GeoJSON. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing area.
 * @param sampleSize - Number of points to generate.
 * @param rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const uniformBinomialPointProcess = (
  geoJSON: GeoJSON.FeatureCollection,
  sampleSize: number,
  rand?: Random,
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const rand1 = rand ?? new Random();
  const points = samplePointsOnAreas(geoJSON, {
    sampleSize: sampleSize,
    method: 'uniform',
    buffer: 0,
    rand: rand1,
  });
  // Remove _designWeight property
  points.features.forEach((feature) => {
    feature.properties = {};
  });
  return points;
};
