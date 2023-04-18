import {destinationPoint} from './distance.js';
import {area} from './area.js';
import {Poisson} from '@envisim/distributions';
import {uniformBinomialPointProcess} from './uniformBinomialPointProcess.js';
import {bbox, pointInBbox} from './bbox.js';
import {pointInPolygon} from 'pointInPolygon.js';

// For conversion from radians to degrees.
const toDeg = 180 / Math.PI;

// Internal. Generates a point uniformly in a disk of radius around center point.
// See e.g. https://mathworld.wolfram.com/DiskPointPicking.html
const randomPointInCircle = (
  center: GeoJSON.Position,
  radius: number,
): GeoJSON.Position => {
  // Randomize angle.
  const theta = Math.random() * 2 * Math.PI;
  // Compute bearing = angle from north in degrees clockwise.
  const brng = (90 - theta * toDeg + 360) % 360;
  // Randomize radius (distance from center).
  const dist = radius * Math.sqrt(Math.random());
  return destinationPoint(center, dist, brng);
};

/**
 * Generates points from a Matérn cluster point process
 * on areas of input GeoJSON.
 *
 * @param geoJSON - A GeoJSON Feature or FeatureCollection containing area.
 * @param intensityOfParents - Number of parent points / clusters per square meters.
 * @param meanOfCluster - Mean number of points per cluster.
 * @param radiusOfCluster - Radius in meters of a (circular) cluster.
 * @returns - A GeoJSON FeatureCollection of generated points.
 */
export const maternClusterProcess = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
  intensityOfParents: number,
  meanOfCluster: number,
  radiusOfCluster: number,
): GeoJSON.FeatureCollection => {
  const box = bbox(geoJSON);
  // Expand box by radius of cluster, as parent points should
  // be allowed outside of area. This is to avoid edge effects.
  const dist = Math.SQRT2 * radiusOfCluster;
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
        // Create random child point on disk uniformly.
        const coordinates = randomPointInCircle(
          feature.geometry.coordinates,
          radiusOfCluster,
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
