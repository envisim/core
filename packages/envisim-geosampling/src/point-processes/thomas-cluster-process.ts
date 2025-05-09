import { Normal, Poisson } from "@envisim/distributions";
import { type AreaObject, FeatureCollection, Point, Polygon } from "@envisim/geojson";
import { BoundingBox } from "@envisim/geojson-utils";
import { destination } from "@envisim/geojson-utils/geodesic";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random } from "@envisim/random";
import { samplePositionsInBbox } from "../sample-continuous/index.js";

// For conversion from radians to degrees.
const TO_DEG = 180 / Math.PI;

// Internal. Generates point with normally distributed offsets around center.
// Sigma is standard deviation.
function randomPositionInCluster(center: GJ.Position, sigma: number, rand: Random): GJ.Position {
  // Generate two independent Normal(0,sigma).
  const xy = new Normal(0, sigma).random(2, { rand });
  // Compute angle.
  const theta = Math.atan2(xy[1], xy[0]) * TO_DEG;
  // Compute azimuth = angle from north in degrees clockwise.
  const azimuth = (90 - theta + 360) % 360;
  // Compute distance from [0,0].
  const dist = Math.sqrt(xy[0] * xy[0] + xy[1] * xy[1]);
  // Compute destination point from center via
  // distance and angle.
  return destination(center, dist, azimuth);
}

export interface ThomasClusterProcessOptions {
  /**
   * The mean number of parent points per square meters.
   */
  intensityOfParents: number;
  /**
   * The mean number of points in a cluster.
   */
  meanOfCluster: number;
  /**
   * The standard deviation of distance to parent.
   */
  sigmaOfCluster: number;
  /**
   * An RNG
   * @defaultValue `new Random()`
   */
  rand?: Random;
}

/**
 * Generates points from a Thomas cluster point process
 * on areas of input area collection.
 *
 * @param collection
 * @param opts

 */
export function thomasClusterProcess(
  collection: FeatureCollection<AreaObject>,
  {
    intensityOfParents,
    meanOfCluster,
    sigmaOfCluster,
    rand = new Random(),
  }: ThomasClusterProcessOptions,
): FeatureCollection<Point, never> {
  const box = BoundingBox.removeAltitude(collection.getBBox());
  // Extend box by 4 * sigmaOfCluster to avoid edge effects.
  // Same as spatstat default in R.
  const dist = Math.SQRT2 * 4 * sigmaOfCluster;
  const westSouth = destination([box[0], box[1]], dist, 225);
  const eastSouth = destination([box[2], box[1]], dist, 135);
  const westNorth = destination([box[0], box[3]], dist, 315);
  const eastNorth = destination([box[2], box[3]], dist, 45);
  // Expanded box as polygon coordinates counterclockwise.
  const expandedBoxPolygonCoords = [[westNorth, westSouth, eastSouth, eastNorth, westNorth]];
  // Expanded box as Feature
  const expandedBoxPolygon = Polygon.create(expandedBoxPolygonCoords);
  // Generate parents in expanded box.
  const A = expandedBoxPolygon.area();
  const muParents = intensityOfParents * A;
  const nrOfParents = new Poisson(muParents).random(1, { rand })[0];

  const parentsInBox = samplePositionsInBbox([...westSouth, ...eastNorth] as GJ.BBox, {
    sampleSize: nrOfParents,
    rand,
  });

  // To store new features.
  const newCollection = FeatureCollection.newPoint<Point>();
  // Generate number of points in each cluster.
  const nrOfPointsInCluster = new Poisson(meanOfCluster).random(nrOfParents, { rand });
  // nr of features in collection
  const nrOfFeatures = collection.features.length;

  parentsInBox.forEach((coords, index: number) => {
    // Generate the child points and push if they are inside
    // input collection.
    const clusterSize = nrOfPointsInCluster[index];
    for (let i = 0; i < clusterSize; i++) {
      // Create random child point in cluster.
      const coordinates = randomPositionInCluster(coords, sigmaOfCluster, rand);
      // If child is in input collection, then push child.
      if (BoundingBox.includesPoint(box, coordinates)) {
        for (let j = 0; j < nrOfFeatures; j++) {
          const geom = collection.features[j].geometry;
          if (geom.includesPosition(coordinates)) {
            newCollection.addGeometry(Point.create(coordinates), {});
            break;
          }
        }
      }
    }
  });

  return newCollection;
}
