import {Poisson} from '@envisim/distributions';
import {
  AreaCollection,
  AreaFeature,
  type GeoJSON as GJ,
  Geodesic,
  GeometricPrimitive,
  Layer,
  Point,
  PointCollection,
  PointFeature,
  Polygon,
  bbox4,
  pointInAreaFeature,
  pointInBBox,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {uniformPositionsInBBox} from './samplePointsOnAreas.js';

// For conversion from radians to degrees.
const toDeg = 180 / Math.PI;

// Internal. Generates a point uniformly in a disk of radius around center point.
// See e.g. https://mathworld.wolfram.com/DiskPointPicking.html
function randomPositionInCluster(
  center: GJ.Position,
  radius: number,
  rand: Random,
): GJ.Position {
  // Randomize angle.
  const theta = rand.float() * 2 * Math.PI;
  // Compute azimuth = angle from north in degrees clockwise.
  const azimuth = (90 - theta * toDeg + 360) % 360;
  // Randomize radius (distance from center).
  const dist = radius * Math.sqrt(rand.float());
  return Geodesic.destination(center, dist, azimuth);
}

export interface MaternClusterProcessOptions {
  layer: Layer<AreaCollection>;
  intensityOfParents: number;
  meanOfCluster: number;
  radiusOfCluster: number;
  rand?: Random;
}

/**
 * Generates points from a Matérn cluster point process
 * on an area layer.
 *
 * @param layer an area layer.
 * @param opts an optional options object.
 */
export function maternClusterProcess(
  opts: MaternClusterProcessOptions,
): Layer<PointCollection> {
  const {layer, intensityOfParents, meanOfCluster, radiusOfCluster} = opts;
  Layer.assert(layer, GeometricPrimitive.AREA);

  const rand = opts.rand ?? new Random();
  const box = bbox4(layer.collection.getBBox());
  // Expand box by radius of cluster, as parent points should
  // be allowed outside of area. This is to avoid edge effects.
  const dist = Math.SQRT2 * radiusOfCluster;
  const westSouth = Geodesic.destination([box[0], box[1]], dist, 225);
  const eastSouth = Geodesic.destination([box[2], box[1]], dist, 135);
  const westNorth = Geodesic.destination([box[0], box[3]], dist, 315);
  const eastNorth = Geodesic.destination([box[2], box[3]], dist, 45);
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
  // and be incorrect GeoJSON.
  const muParents = intensityOfParents * A;
  const nrOfParents = Poisson.random(1, {rate: muParents}, {rand: rand})[0];

  const parentsInBox = uniformPositionsInBBox(
    [...westSouth, ...eastNorth] as GJ.BBox,
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
  const nrOfFeatures = layer.collection.features.length;

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
          if (pointInAreaFeature(coordinates, layer.collection.features[j])) {
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
  return new Layer(new PointCollection({features}, true), {}, true);
}
