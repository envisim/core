import {
  distance,
  intersectPointAreaFeatures,
  AreaCollection,
  PointCollection,
  PointFeature,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {effectiveRadius, DetectionFunction} from './sampleDistanceUtils.js';
import {
  samplePointsOnAreas,
  TsamplePointsOnAreasOpts,
} from './samplePointsOnAreas.js';

/**
 * Distance sampling with points. Selects a point sample on an area frame
 * and collect point objects from a base layer using a detection function
 * to (randomly) determine inclusion.
 *
 * @param frame
 * @param method the method to use "uniform" or "systematic".
 * @param sampleSize the expected sample size of points as integer > 0.
 * @param base a PointCollection of single Point features.
 * @param detectionFunction the detection function.
 * @param cutoff the maximum detection distance in meters.
 * @param opts an object containing buffer, ratio (dx/dy), rand.
 * @param opts.buffer optional buffer in meters (default cutoff).
 * @param opts.ratio the ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand an optional instance of Random.
 */
export function sampleDistancePoints(
  frame: AreaCollection,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  base: PointCollection,
  detectionFunction: DetectionFunction,
  cutoff: number,
  opts: TsamplePointsOnAreasOpts,
): PointCollection {
  // Check input first

  if (!AreaCollection.isCollection(frame)) {
    throw new Error('Parameter frame must be an AreaCollection.');
  }

  if (!PointCollection.isCollection(base)) {
    throw new Error('Parameter base must be a PointCollection.');
  }

  // Compute effective radius
  const effRadius = effectiveRadius(detectionFunction, cutoff);
  // Set random generator
  const rand = opts.rand ?? new Random();
  opts.rand = rand;
  // Select sample of points (optional buffer via opts)
  const buffer = opts.buffer ?? cutoff;
  opts.buffer = buffer;
  const pointSample = samplePointsOnAreas(frame, method, sampleSize, opts);
  // To store sampled features
  const sampledFeatures: PointFeature[] = [];

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  base.features.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;

      pointSample.features.forEach((samplePoint, samplePointIndex) => {
        if (samplePoint.geometry.type === 'Point') {
          const dist = distance(
            basePointCoords,
            samplePoint.geometry.coordinates,
          );
          if (dist < cutoff && rand.float() < detectionFunction(dist)) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frame.features.length; i++) {
              const frameFeature = frame.features[i];
              const intersect = intersectPointAreaFeatures(
                pointFeature,
                frameFeature,
              );
              if (intersect) {
                // Follow the design weight
                let dw = 1 / (Math.PI * effRadius * effRadius);
                if (samplePoint.properties?._designWeight) {
                  dw *= samplePoint.properties._designWeight;
                }
                // If buffer = 0, then sample point has already collected
                // design weight from frame. If buffer > 0, then we need
                // to collect the weight here.
                if (frameFeature.properties?._designWeight && buffer > 0) {
                  dw *= frameFeature.properties._designWeight;
                }
                const newFeature = new PointFeature(pointFeature, false);
                if (!newFeature.properties) {
                  newFeature.properties = {};
                }
                newFeature.properties._designWeight = dw;
                newFeature.properties._parent = samplePointIndex;
                newFeature.properties._distance = dist;
                sampledFeatures.push(newFeature);
                break;
              }
            }
          }
        }
      });
    } else {
      throw new Error(
        'Only Features with geometry of type Point is allowed in parameter base.',
      );
    }
  });
  return new PointCollection({features: sampledFeatures}, true);
}
