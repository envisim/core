import {destinationPoint} from './distance.js';
import {area} from './area.js';
import {Poisson} from '@envisim/distributions';
import {Normal} from '@envisim/distributions';
import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';
import {bbox, pointInBbox} from './bbox.js';
import {pointInPolygon} from 'pointInPolygon.js';

// For conversion from radians to degrees.
const toDeg = 180 / Math.PI;

// Internal. Generates point with normally distributed offsets around center.
// Sigma is standard deviation.
const randomPointInCluster = (
  center: GeoJSON.Position,
  sigma: number,
): GeoJSON.Position => {
  // Generate two independent Normal(0,sigma).
  const xy = Normal.random(2, {mu: 0, sigma: sigma});
  // Compute angle.
  const theta = Math.atan2(xy[1], xy[0]) * toDeg;
  // Compute bearing = angle from north in degrees clockwise.
  const brng = (90 - theta + 360) % 360;
  // Compute distance from [0,0].
  const dist = Math.sqrt(xy[0] * xy[0] + xy[1] * xy[1]);
  // Compute destination point from center via
  // distance and angle.
  return destinationPoint(center, dist, brng);
};

/**
 * Generates points from a Thomas cluster point process
 * on areas of input GeoJSON.
 *
 * @param geoJSON - A GeoJSON Feature or FeatureCollection containing area.
 * @param intensityOfParents - Number of parent points / clusters per square meters.
 * @param meanOfCluster - Mean number of points per cluster.
 * @param sigmaOfCluster - Standard deviation in meters in Normal distributions for generating points offset in cluster.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const maternClusterProcess = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
  intensityOfParents: number,
  meanOfCluster: number,
  sigmaOfCluster: number,
): GeoJSON.FeatureCollection => {
  const box = bbox(geoJSON);
  // Extend box by 4 * sigmaOfCluster to avoid edge effects.
  // Same as spatstat default in R.
  const dist = Math.SQRT2 * 4 * sigmaOfCluster;
  const westSouth = destinationPoint([box[0], box[1]], dist, 225);
  const eastSouth = destinationPoint([box[1], box[1]], dist, 135);
  const westNorth = destinationPoint([box[0], box[2]], dist, 315);
  const eastNorth = destinationPoint([box[1], box[2]], dist, 45);
  // Expanded box as polygon coordinates clockwise.
  const expandedBoxPolygonCoords = [
    [westSouth, westNorth, eastNorth, eastSouth, westSouth],
  ];
  // Expanded box as Feature.
  const expandedBoxPolygon: GeoJSON.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: expandedBoxPolygonCoords,
    },
    properties: {},
  };
  // Generate parents in expanded box.
  const A = area(expandedBoxPolygon);
  const muParents = intensityOfParents * A;
  const nrOfParents = Poisson.random(1, {rate: muParents})[0];

  const parentsInBox = uniformBinomialPointProcess(
    expandedBoxPolygon,
    nrOfParents,
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
        // Create random child point in cluster.
        const coordinates = randomPointInCluster(
          feature.geometry.coordinates,
          sigmaOfCluster,
        );
        const child: GeoJSON.Feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {},
        };
        // If child is in input geoJSON, then push child.
        if (pointInBbox(coordinates, box)) {
          if (geoJSON.type === 'Feature') {
            if (
              geoJSON.geometry.type === 'Polygon' ||
              geoJSON.geometry.type === 'MultiPolygon'
            ) {
              if (pointInPolygon(child, geoJSON)) {
                features.push(child);
              }
            }
          }
          if (geoJSON.type === 'FeatureCollection') {
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
    }
  });

  return {
    type: 'FeatureCollection',
    features: features,
  };
};
