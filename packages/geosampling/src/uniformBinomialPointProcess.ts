import {PointCollection, AreaCollection} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {samplePointsOnAreas} from './samplePointsOnAreas.js';

/**
 * Generate points from a uniform Binomial point process
 * on areas of input AreaCollection. The points are generated
 * uniformly on a spherical model of the earth.
 *
 * @param collection - An AreaCollection.
 * @param sampleSize - Number of points to generate.
 * @param opts - An optional options object.
 * @param opts.rand - An optional instance of Random.
 * @returns - A PointCollection.
 */
export const uniformBinomialPointProcess = (
  collection: AreaCollection,
  sampleSize: number,
  opts: {rand?: Random} = {},
): PointCollection => {
  const rand = opts.rand ?? new Random();
  const points = samplePointsOnAreas(collection, 'uniform', sampleSize, {
    buffer: 0,
    rand: rand,
  });
  // Remove _designWeight property
  points.features.forEach((feature) => {
    feature.properties = {};
  });
  return points;
};
