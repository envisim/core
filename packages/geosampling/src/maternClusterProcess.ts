import {
  area,
  bbox,
  pointInBbox,
  pointInPolygon,
  destination,
  toPoint,
  toPolygon,
  asFeatureCollection,
} from '@envisim/geojson-utils';
import {Poisson} from '@envisim/distributions';
import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';
import {Random} from '@envisim/random';

// For conversion from radians to degrees.
const toDeg = 180 / Math.PI;

// Internal. Generates a point uniformly in a disk of radius around center point.
// See e.g. https://mathworld.wolfram.com/DiskPointPicking.html
const randomPointInCluster = (
  center: GeoJSON.Position,
  radius: number,
  rand: Random,
): GeoJSON.Position => {
  // Randomize angle.
  const theta = rand.float() * 2 * Math.PI;
  // Compute azimuth = angle from north in degrees clockwise.
  const azimuth = (90 - theta * toDeg + 360) % 360;
  // Randomize radius (distance from center).
  const dist = radius * Math.sqrt(rand.float());
  return destination(center, dist, azimuth);
};

/**
 * Generates points from a Matérn cluster point process
 * on areas of input GeoJSON.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing area.
 * @param intensityOfParents - Number of parent points / clusters per square meter.
 * @param meanOfCluster - Mean number of points per cluster.
 * @param radiusOfCluster - Radius in meters of a (circular) cluster.
 * @param opts - An optional options object.
 * @param opts.rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const maternClusterProcess = (
  geoJSON: GeoJSON.FeatureCollection,
  intensityOfParents: number,
  meanOfCluster: number,
  radiusOfCluster: number,
  opts: {rand?: Random} = {},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const box = bbox(geoJSON);
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
  const expandedBoxPolygon = toPolygon(expandedBoxPolygonCoords);
  // Generate parents in expanded box.
  const rand = opts.rand ?? new Random();
  const A = area(expandedBoxPolygon);
  const muParents = intensityOfParents * A;
  const nrOfParents = Poisson.random(1, {rate: muParents}, {rand: rand})[0];

  const parentsInBox = uniformBinomialPointProcess(
    asFeatureCollection(expandedBoxPolygon),
    nrOfParents,
    {rand: rand},
  );
  // To store new features.
  const features: GeoJSON.Feature[] = [];
  // Generate number of points in each cluster.
  const nrOfPointsInCluster = Poisson.random(nrOfParents, {
    rate: meanOfCluster,
  });

  parentsInBox.features.forEach((feature: GeoJSON.Feature, index: number) => {
    // Generate the child points and push if they are inside
    // input geoJSON.
    for (let i = 0; i < nrOfPointsInCluster[index]; i++) {
      if (feature.geometry.type === 'Point') {
        // Create random child point on disk uniformly.
        const coordinates = randomPointInCluster(
          feature.geometry.coordinates,
          radiusOfCluster,
          rand,
        );
        const child = toPoint(coordinates);
        // If child is in input geoJSON, then push child.
        if (pointInBbox(coordinates, box)) {
          const nrOfFeatures = geoJSON.features.length;
          for (let j = 0; j < nrOfFeatures; j++) {
            const f = geoJSON.features[j];
            if (
              f.geometry.type === 'Polygon' ||
              f.geometry.type === 'MultiPolygon'
            ) {
              if (pointInPolygon(child, f)) {
                features.push(child);
                break;
              }
            }
          }
        }
      }
    }
  });
  return {
    type: 'FeatureCollection',
    features: features,
  };
};
