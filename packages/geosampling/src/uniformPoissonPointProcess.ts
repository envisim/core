import {Poisson} from '@envisim/distributions';
import {area} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';

/**
 * Generates points from a uniform Poisson point process
 * on areas of input GeoJSON. Given the (Poisson distributed)
 * random number of points, the points are generated uniformly
 * on a spherical model of the earth.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing area.
 * @param intensity - Number of points per square meter.
 * @param opts - An optional options object.
 * @param opts.rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const uniformPoissonPointProcess = (
  geoJSON: GeoJSON.FeatureCollection,
  intensity: number,
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
  const A = area(geoJSON);
  const mu = intensity * A;
  const sampleSize = Poisson.random(1, {rate: mu}, {rand: rand})[0];
  return uniformBinomialPointProcess(geoJSON, sampleSize, {rand: rand});
};
