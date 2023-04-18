import {Poisson} from '@envisim/distributions';
import {area} from './area.js';
import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';

/**
 * Generates points from a uniform Poisson point process
 * on areas of input GeoJSON. Given the (Poisson distributed)
 * random number of points, the points are generated uniformly
 * on a spherical model of the earth.
 *
 * @param geoJSON - A GeoJSON Feature or FeatureCollection containing area.
 * @param intensity - Number of points per square meters.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const uniformPoissonPointProcess = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
  intensity: number,
): GeoJSON.FeatureCollection => {
  const A = area(geoJSON);
  const mu = intensity * A;
  const sampleSize = Poisson.random(1, {rate: mu})[0];
  return uniformBinomialPointProcess(geoJSON, sampleSize);
};
