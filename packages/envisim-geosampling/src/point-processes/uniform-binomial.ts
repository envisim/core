import {type AreaObject, type FeatureCollection, type Point} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {samplePointsOnAreas} from '../sample-continuous/index.js';

interface UniformBinomialPointProcessOptions {
  /**
   * The number of points to generate.
   */
  sampleSize: number;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
}

/**
 * Generate points from a uniform Binomial point process
 * on areas of input area collection. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param collection
 * @param opts
 */
export function uniformBinomialPointProcess(
  collection: FeatureCollection<AreaObject>,
  {sampleSize, rand = new Random()}: UniformBinomialPointProcessOptions,
): FeatureCollection<Point> {
  const pointCollection = samplePointsOnAreas(collection, {
    pointSelection: 'independent',
    sampleSize,
    rand,
  });
  // Remove _designWeight property
  pointCollection.removeProperty('_designWeight');
  return pointCollection;
}
