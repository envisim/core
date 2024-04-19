import {Poisson} from '@envisim/distributions';
import {AreaCollection, PointCollection} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';

/**
 * Generates points from a uniform Poisson point process
 * on areas of input AreaCollection. Given the (Poisson distributed)
 * random number of points, the points are generated uniformly
 * on a spherical model of the earth.
 *
 * @param collection an AreaCollection.
 * @param intensity number of points per square meter.
 * @param opts an optional options object.
 * @param opts.rand an optional instance of Random.
 * @returns a PointCollection of generated points.
 */
export function uniformPoissonPointProcess(
  collection: AreaCollection,
  intensity: number,
  opts: {rand?: Random} = {},
): PointCollection {
  if (!AreaCollection.isCollection(collection)) {
    throw new Error('Input collection must be an AreaCollection.');
  }

  const rand = opts.rand ?? new Random();
  const A = collection.area();
  const mu = intensity * A;
  const sampleSize = Poisson.random(1, {rate: mu}, {rand: rand})[0];

  if (sampleSize === 0) {
    return new PointCollection({features: []}, true);
  }

  return uniformBinomialPointProcess(collection, sampleSize, {rand: rand});
}
