import {Poisson} from '@envisim/distributions';
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

// Internal. Generates a point uniformly in a disk of radius around center point.
// See e.g. https://mathworld.wolfram.com/DiskPointPicking.html
function randomPositionInCluster(
  center: GeoJSON.Position,
  radius: number,
  rand: Random,
): GeoJSON.Position {
  // Randomize angle.
  const theta = rand.float() * 2 * Math.PI;
  // Compute azimuth = angle from north in degrees clockwise.
  const azimuth = (90 - theta * toDeg + 360) % 360;
  // Randomize radius (distance from center).
  const dist = radius * Math.sqrt(rand.float());
  return destination(center, dist, azimuth);
}

/**
 * Generates points from a Matérn cluster point process
 * on an AreaCollection.
 *
 * @param collection
 * @param intensityOfParents number of parent points / clusters per square meter.
 * @param meanOfCluster mean number of points per cluster.
 * @param radiusOfCluster radius in meters of a (circular) cluster.
 * @param opts an optional options object.
 * @param opts.rand an optional instance of Random.
 */
export function maternClusterProcess(
  collection: AreaCollection,
  intensityOfParents: number,
  meanOfCluster: number,
  radiusOfCluster: number,
  opts: {rand?: Random} = {},
): PointCollection {
  if (!AreaCollection.isCollection(collection)) {
    throw new Error('Input collection must be an Areaollection.');
  }

  const rand = opts.rand ?? new Random();
  const box = bbox4(collection.getBBox());
  // Expand box by radius of cluster, as parent points should
  // be allowed outside of area. This is to avoid edge effects.
  const dist = Math.SQRT2 * radiusOfCluster;
  const westSouth = destination([box[0], box[1]], dist, 225);
  const eastSouth = destination([box[1], box[1]], dist, 135);
  const westNorth = destination([box[0], box[2]], dist, 315);
  const eastNorth = destination([box[1], box[2]], dist, 45);
  // Expanded box as polygon coordinates counterclockwise.
  const expandedBoxPolygonCoords = [
    [westNorth, westSouth, eastSouth, eastNorth, westNorth],
  ];
  // Expanded box as Feature.
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
      const coordinates = randomPositionInCluster(
        coords,
        radiusOfCluster,
        rand,
      );
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
