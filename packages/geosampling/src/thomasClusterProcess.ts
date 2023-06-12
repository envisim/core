import {Poisson} from '@envisim/distributions';
import {Normal} from '@envisim/distributions';
import {
  GeoJSON,
  pointInBBox,
  bbox4,
  pointInAreaFeature,
  destination,
  Point,
  PointFeature,
  PointCollection,
  AreaCollection,
  Polygon,
  AreaFeature,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformPositionsInBBox} from './samplePointsOnAreas.js';

// For conversion from radians to degrees.
const toDeg = 180 / Math.PI;

// Internal. Generates point with normally distributed offsets around center.
// Sigma is standard deviation.
function randomPositionInCluster(
  center: GeoJSON.Position,
  sigma: number,
  rand: Random,
): GeoJSON.Position {
  // Generate two independent Normal(0,sigma).
  const xy = Normal.random(2, {mu: 0, sigma: sigma}, {rand});
  // Compute angle.
  const theta = Math.atan2(xy[1], xy[0]) * toDeg;
  // Compute azimuth = angle from north in degrees clockwise.
  const azimuth = (90 - theta + 360) % 360;
  // Compute distance from [0,0].
  const dist = Math.sqrt(xy[0] * xy[0] + xy[1] * xy[1]);
  // Compute destination point from center via
  // distance and angle.
  return destination(center, dist, azimuth);
}

/**
 * Generates points from a Thomas cluster point process
 * on areas of input AreaCollection.
 *
 * @param collection
 * @param intensityOfParents number of parent points / clusters per square meter.
 * @param meanOfCluster mean number of points per cluster.
 * @param sigmaOfCluster standard deviation in meters in Normal distributions for generating points offset in cluster.
 * @param opts an optional options object.
 * @param opts.rand an optional instance of Random.
 */
export function thomasClusterProcess(
  collection: AreaCollection,
  intensityOfParents: number,
  meanOfCluster: number,
  sigmaOfCluster: number,
  opts: {rand?: Random} = {},
): PointCollection {
  if (!AreaCollection.isCollection(collection)) {
    throw new Error('Input collection must be an Areaollection.');
  }

  const rand = opts.rand ?? new Random();
  const box = bbox4(collection.getBBox());
  // Extend box by 4 * sigmaOfCluster to avoid edge effects.
  // Same as spatstat default in R.
  const dist = Math.SQRT2 * 4 * sigmaOfCluster;
  const westSouth = destination([box[0], box[1]], dist, 225);
  const eastSouth = destination([box[1], box[1]], dist, 135);
  const westNorth = destination([box[0], box[2]], dist, 315);
  const eastNorth = destination([box[1], box[2]], dist, 45);
  // Expanded box as polygon coordinates counterclockwise.
  const expandedBoxPolygonCoords = [
    [westNorth, westSouth, eastSouth, eastNorth, westNorth],
  ];
  // Expanded box as Feature
  const expandedBoxPolygon = AreaFeature.create(
    Polygon.create(expandedBoxPolygonCoords),
    {},
    true,
  );
  // Generate parents in expanded box.
  const A = expandedBoxPolygon.area();
  // TODO?: The expanded box polygon may overlap antimeridian
  // and be incorrect GeoJSON. However, the area calculation
  // should still be correct as geographic-lib does not require
  // split over antimeridian.

  const muParents = intensityOfParents * A;
  const nrOfParents = Poisson.random(1, {rate: muParents}, {rand: rand})[0];

  const parentsInBox = uniformPositionsInBBox(
    [...westSouth, ...eastNorth] as GeoJSON.BBox,
    nrOfParents,
    {rand},
  );

  // To store new features.
  const features: PointFeature[] = [];
  // Generate number of points in each cluster.
  const nrOfPointsInCluster = Poisson.random(
    nrOfParents,
    {
      rate: meanOfCluster,
    },
    {rand: rand},
  );

  // nr of features in collection
  const nrOfFeatures = collection.features.length;

  parentsInBox.forEach((coords, index: number) => {
    // Generate the child points and push if they are inside
    // input geoJSON.
    const clusterSize = nrOfPointsInCluster[index];
    for (let i = 0; i < clusterSize; i++) {
      // Create random child point in cluster.
      const coordinates = randomPositionInCluster(coords, sigmaOfCluster, rand);
      // If child is in input collection, then push child.
      if (pointInBBox(coordinates, box)) {
        for (let j = 0; j < nrOfFeatures; j++) {
          if (pointInAreaFeature(coordinates, collection.features[i])) {
            const child = PointFeature.create(
              Point.create(coordinates),
              {},
              true,
            );
            features.push(child);
            break;
          }
        }
      }
    }
  });
  return new PointCollection({features: features}, true);
}
