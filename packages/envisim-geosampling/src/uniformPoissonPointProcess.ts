import {Poisson} from '@envisim/distributions';
import {
  AreaCollection,
  GeometricPrimitive,
  Layer,
  PointCollection,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';

export interface UniformPoissonProcessOptions {
  intensity: number;
  rand?: Random;
}

/**
 * Generates points from a uniform Poisson point process
 * on areas of input layer. Given the (Poisson distributed)
 * random number of points, the points are generated uniformly
 * on a spherical model of the earth.
 *
 * @param layer
 * @param opts an options object.

 */
export function uniformPoissonPointProcess(
  layer: Layer<AreaCollection>,
  opts: UniformPoissonProcessOptions,
): Layer<PointCollection> {
  const {intensity} = opts;
  Layer.assert(layer, GeometricPrimitive.AREA);
  const rand = opts.rand ?? new Random();
  const A = layer.collection.area();
  const mu = intensity * A;
  const sampleSize = Poisson.random(1, {rate: mu}, {rand: rand})[0];
  if (sampleSize === 0) {
    return new Layer(new PointCollection({features: []}, true), {}, true);
  }
  return uniformBinomialPointProcess(layer, {...opts, sampleSize});
}
