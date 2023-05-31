import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';

/**
 * Generate points from a uniform Binomial point process
 * on areas of input GeoJSON. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing area.
 * @param sampleSize - Number of points to generate.
 * @param opts - An optional options object.
 * @param opts.rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const uniformBinomialPointProcess = (
  geoJSON: GeoJSON.FeatureCollection,
  sampleSize: number,
  opts: {rand?: Random} = {},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const rand = opts.rand ?? new Random();
  const points = samplePointsOnAreas(geoJSON, 'uniform', sampleSize, {
    buffer: 0,
    rand: rand,
  });
  // Remove _designWeight property
  points.features.forEach((feature) => {
    feature.properties = {};
  });
  return points;
};
