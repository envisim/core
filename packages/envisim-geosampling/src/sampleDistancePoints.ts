import {
  AreaCollection,
  Geodesic,
  Layer,
  PointCollection,
  PointFeature,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';
import {copy} from '@envisim/utils';

import {DetectionFunction, effectiveRadius} from './sampleDistanceUtils.js';
import {
  TsamplePointsOnAreasOpts,
  samplePointsOnAreas,
} from './samplePointsOnAreas.js';

/**
 * Distance sampling with points. Selects a point sample on an area layer
 * and collect point objects from a base layer using a detection function
 * to (randomly) determine inclusion.
 *
 * @param frameLayer an area layer
 * @param method the method to use "uniform" or "systematic".
 * @param sampleSize the expected sample size of points as integer > 0.
 * @param baseLayer a PointCollection of single Point features.
 * @param detectionFunction the detection function.
 * @param cutoff the maximum detection distance in meters.
 * @param opts an object containing buffer, ratio (dx/dy), rand.
 * @param opts.buffer optional buffer in meters (default cutoff).
 * @param opts.ratio the ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand an optional instance of Random.
 */
export function sampleDistancePoints(
  frameLayer: Layer<AreaCollection>,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  baseLayer: Layer<PointCollection>,
  detectionFunction: DetectionFunction,
  cutoff: number,
  opts: TsamplePointsOnAreasOpts,
): Layer<PointCollection> {
  // Check input first


  if (!Layer.isPointLayer(baseLayer)) {
    throw new Error('Parameter baseLayer must be a point layer.');
  }

  // Compute effective radius
  const effRadius = effectiveRadius(detectionFunction, cutoff);
  // Set random generator
  const rand = opts.rand ?? new Random();
  opts.rand = rand;
  // Select sample of points (optional buffer via opts)
  const buffer = opts.buffer ?? cutoff;
  opts.buffer = buffer;
  const pointSample = samplePointsOnAreas(frameLayer, method, sampleSize, opts);
  // To store sampled features
  const sampledFeatures: PointFeature[] = [];

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  baseLayer.collection.features.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;

      pointSample.collection.features.forEach(
        (samplePoint, samplePointIndex) => {
          if (samplePoint.geometry.type === 'Point') {
            const dist = Geodesic.distance(
              basePointCoords,
              samplePoint.geometry.coordinates,
            );
            if (dist < cutoff && rand.float() < detectionFunction(dist)) {
              // Check if base point exists in this frame (frame could be part/stratum)
              for (let i = 0; i < frameLayer.collection.features.length; i++) {
                const frameFeature = frameLayer.collection.features[i];
                const intersect = intersectPointAreaFeatures(
                  pointFeature,
                  frameFeature,
                );
                if (intersect) {
                  // Follow the design weight
                  let dw = 1 / (Math.PI * effRadius * effRadius);
                  if (samplePoint.properties?.['_designWeight']) {
                    dw *= samplePoint.properties['_designWeight'];
                  }
                  // If buffer = 0, then sample point has already collected
                  // design weight from frame. If buffer > 0, then we need
                  // to collect the weight here.
                  if (
                    frameFeature.properties?.['_designWeight'] &&
                    buffer > 0
                  ) {
                    dw *= frameFeature.properties['_designWeight'];
                  }
                  const newFeature = new PointFeature(pointFeature, false);
                  if (!newFeature.properties) {
                    newFeature.properties = {};
                  }
                  newFeature.properties['_designWeight'] = dw;
                  newFeature.properties['_parent'] = samplePointIndex;
                  newFeature.properties['_distance'] = dist;
                  sampledFeatures.push(newFeature);
                  break;
                }
              }
            }
          }
        },
      );
    } else {
      throw new Error(
        'Only Features with geometry of type Point is allowed in parameter base.',
      );
    }
  });
  // Fix property record (same as base layer, but add design variables)
  const newRecord = copy(baseLayer.propertyRecord);
  newRecord['_designWeight'] = {
    id: '_designWeight',
    name: '_designWeight',
    type: 'numerical',
  };
  newRecord['_parent'] = {id: '_parent', name: '_parent', type: 'numerical'};
  newRecord['_distance'] = {
    id: '_distance',
    name: '_distance',
    type: 'numerical',
  };

  return new Layer(
    new PointCollection({features: sampledFeatures}, true),
    newRecord,
    true,
  );
}
