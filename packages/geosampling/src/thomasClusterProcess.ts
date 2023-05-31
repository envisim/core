import {Poisson} from '@envisim/distributions';
import {Normal} from '@envisim/distributions';
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
import {Random} from '@envisim/random';

import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';

// For conversion from radians to degrees.
const toDeg = 180 / Math.PI;

// Internal. Generates point with normally distributed offsets around center.
// Sigma is standard deviation.
const randomPointInCluster = (
  center: GeoJSON.Position,
  sigma: number,
  rand: Random,
): GeoJSON.Position => {
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
};

/**
 * Generates points from a Thomas cluster point process
 * on areas of input GeoJSON.
 *
 * @param geoJSON - A GeoJSON FeatureCollection containing area.
 * @param intensityOfParents - Number of parent points / clusters per square meter.
 * @param meanOfCluster - Mean number of points per cluster.
 * @param sigmaOfCluster - Standard deviation in meters in Normal distributions for generating points offset in cluster.
 * @param opts - An optional options object.
 * @param opts.rand - An optional instance of Random.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const thomasClusterProcess = (
  geoJSON: GeoJSON.FeatureCollection,
  intensityOfParents: number,
  meanOfCluster: number,
  sigmaOfCluster: number,
  opts: {rand?: Random} = {},
): GeoJSON.FeatureCollection => {
  if (geoJSON.type !== 'FeatureCollection') {
    throw new Error(
      'Input GeoJSON must be a FeatureCollection, not type: ' +
        geoJSON.type +
        '.',
    );
  }
  const rand = opts.rand ?? new Random();
  const box = bbox(geoJSON);
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
  const expandedBoxPolygon = toPolygon(expandedBoxPolygonCoords);
  // Generate parents in expanded box.
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
  const nrOfPointsInCluster = Poisson.random(
    nrOfParents,
    {
      rate: meanOfCluster,
    },
    {rand: rand},
  );

  parentsInBox.features.forEach((feature: GeoJSON.Feature, index: number) => {
    // Generate the child points and push if they are inside
    // input geoJSON.
    for (let i = 0; i < nrOfPointsInCluster[index]; i++) {
      if (feature.geometry.type === 'Point') {
        // Create random child point in cluster.
        const coordinates = randomPointInCluster(
          feature.geometry.coordinates,
          sigmaOfCluster,
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
