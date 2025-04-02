import { Poisson } from "@envisim/distributions";
import { type AreaObject, FeatureCollection, Point, Polygon } from "@envisim/geojson";
import { Geodesic, BoundingBox } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random } from "@envisim/random";
import { samplePositionsInBbox } from "../sample-continuous/index.js";

// For conversion from radians to degrees.
const TO_DEG = 180 / Math.PI;

// Internal. Generates a point uniformly in a disk of radius around center point.
// See e.g. https://mathworld.wolfram.com/DiskPointPicking.html
function randomPositionInCluster(center: GJ.Position, radius: number, rand: Random): GJ.Position {
  // Randomize angle.
  const theta = rand.float() * 2 * Math.PI;
  // Compute azimuth = angle from north in degrees clockwise.
  const azimuth = (90 - theta * TO_DEG + 360) % 360;
  // Randomize radius (distance from center).
  const dist = radius * Math.sqrt(rand.float());
  return Geodesic.destination(center, dist, azimuth);
}

interface MaternClusterProcessOptions {
  /**
   * The mean number of parent points per square meters.
   */
  intensityOfParents: number;
  /**
   * The mean number of points in a cluster.
   */
  meanOfCluster: number;
  /**
   * The radius in meters of a cluster.
   */
  radiusOfCluster: number;
  /**
   * An instance of {@link random.Random}
   * @defaultValue `new Random()`
   */
  rand?: Random;
}

/**
 * Generates points from a Matérn cluster point process
 * on an area collection.
 *
 * @param collection
 * @param opts
 */
export function maternClusterProcess(
  collection: FeatureCollection<AreaObject>,
  {
    intensityOfParents,
    meanOfCluster,
    radiusOfCluster,
    rand = new Random(),
  }: MaternClusterProcessOptions,
): FeatureCollection<Point, never> {
  const box = BoundingBox.removeAltitude(collection.getBBox());
  // Expand box by radius of cluster, as parent points should
  // be allowed outside of area. This is to avoid edge effects.
  const dist = Math.SQRT2 * radiusOfCluster;
  const westSouth = Geodesic.destination([box[0], box[1]], dist, 225);
  const eastSouth = Geodesic.destination([box[2], box[1]], dist, 135);
  const westNorth = Geodesic.destination([box[0], box[3]], dist, 315);
  const eastNorth = Geodesic.destination([box[2], box[3]], dist, 45);
  // Expanded box as polygon coordinates counterclockwise.
  const expandedBoxPolygonCoords = [[westNorth, westSouth, eastSouth, eastNorth, westNorth]];
  // Expanded box as Feature.
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
  // Number of features in collection.
  const nrOfFeatures = collection.features.length;

  parentsInBox.forEach((coords, index: number) => {
    // Generate the child points and push if they are inside
    // input collection.
    const clusterSize = nrOfPointsInCluster[index];
    for (let i = 0; i < clusterSize; i++) {
      // Create random child point in cluster.
      const coordinates = randomPositionInCluster(coords, radiusOfCluster, rand);
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
