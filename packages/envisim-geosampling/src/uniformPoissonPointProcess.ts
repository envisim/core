import {Poisson} from '@envisim/distributions';
import {AreaCollection, Layer, PointCollection} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';

/**
 * Generates points from a uniform Poisson point process
 * on areas of input layer. Given the (Poisson distributed)
 * random number of points, the points are generated uniformly
 * on a spherical model of the earth.
 *
 * @param layer an area layer.
 * @param intensity number of points per square meter.
 * @param opts an optional options object.
 * @param opts.rand an optional instance of Random.
 * @returns a PointCollection of generated points.
 */
export function uniformPoissonPointProcess(
  layer: Layer<AreaCollection>,
  intensity: number,
  opts: {rand?: Random} = {},
): Layer<PointCollection> {

  const rand = opts.rand ?? new Random();
  const A = layer.collection.area();
  const mu = intensity * A;
  const sampleSize = Poisson.random(1, {rate: mu}, {rand: rand})[0];
  if (sampleSize === 0) {
    return new Layer(new PointCollection({features: []}, true), {}, true);
  }
  return uniformBinomialPointProcess(layer, sampleSize, {rand: rand});
}
