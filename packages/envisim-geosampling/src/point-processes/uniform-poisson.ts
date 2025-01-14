import {Poisson} from '@envisim/distributions';
import {type AreaObject, FeatureCollection, type PointObject} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformBinomialPointProcess} from './uniform-binomial.js';

interface UniformPoissonProcessOptions {
  /**
   * The intensity as mean number of points per square meters.
   */
  intensity: number;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
}

/**
 * Generates points from a uniform Poisson point process
 * on areas of input collection. Given the (Poisson distributed)
 * random number of points, the points are generated uniformly
 * on a spherical model of the earth.
 *
 * @param collection
 * @param opts

 */
export function uniformPoissonPointProcess(
  collection: FeatureCollection<AreaObject>,
  {intensity, rand = new Random()}: UniformPoissonProcessOptions,
): FeatureCollection<PointObject> {
  const A = collection.measure();
  const mu = intensity * A;
  const sampleSize = new Poisson(mu).random(1, {rand})[0];

  if (sampleSize === 0) {
    return FeatureCollection.newPoint();
  }

  return uniformBinomialPointProcess(collection, {sampleSize, rand});
}
