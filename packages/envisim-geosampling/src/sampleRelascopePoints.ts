import {
  AreaCollection,
  Geodesic,
  Layer,
  PointCollection,
  PointFeature,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';
import {copy} from '@envisim/utils';

import {
  TsamplePointsOnAreasOpts,
  samplePointsOnAreas,
} from './samplePointsOnAreas.js';

// TODO: Decide if we should implement correction by adding the correct buffer.
// Probably deviates from common use to add buffer, but estimates will be biased
// if we do not add the correction.

/**
 * Selects a point sample on an area frame and collect point objects from a base
 * layer using a relascope to determine inclusion. A buffer is needed for unbiased
 * estimation. The buffer should be set to the largest radius of the inclusion zones.
 * The largest radius depends on maximum value of sizeProperty and the factor of
 * the relascope, according to max(radius) = (50 * max(sizePropertyValue)) / sqrt(factor).
 * Default buffer is zero, which gives a negative bias for estimates of positive
 * quantities.
 *
 * @param frameLayer
 * @param method the method to use "uniform" or "systematic"
 * @param sampleSize the expected number of points as integer > 0.
 * @param baseLayer a PointCollection of single Point features.
 * @param sizeProperty the name of the size property in base which has numeric value in meters (e.g. diameter at breast hight).
 * @param factor positive number, the relascope factor.
 * @param opts an object containing buffer, ratio (dx/dy), rand
 * @param opts.buffer optional buffer in meters (default 0).
 * @param opts.ratio the ratio (dx/dy) for systematic sampling (default 1).
 * @param opts.rand an optional instance of Random.
 */
export function sampleRelascopePoints(
  frameLayer: Layer<AreaCollection>,
  method: 'uniform' | 'systematic',
  sampleSize: number,
  baseLayer: Layer<PointCollection>,
  sizeProperty: string,
  factor: number,
  opts: TsamplePointsOnAreasOpts,
): Layer<PointCollection> {

  // Square root of relascope factor
  const sqrtRf = Math.sqrt(factor);
  // Set buffer
  const buffer = opts.buffer || 0;
  opts.buffer = buffer;
  // Select sample of points (optional buffer via opts)
  const pointSample = samplePointsOnAreas(frameLayer, method, sampleSize, opts);
  // To store sampled features
  const sampledFeatures: PointFeature[] = [];
  const baseFeatures = baseLayer.collection.features;
  const frameFeatures = frameLayer.collection.features;

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  baseFeatures.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;
      let sizePropertyValue = 0;
      if (pointFeature.properties) {
        sizePropertyValue = pointFeature.properties[sizeProperty] || 0;
      }
      // Radius of inclusion zone
      const radius = (50 * sizePropertyValue) / sqrtRf;

      pointSample.collection.features.forEach(
        (samplePoint, samplePointIndex) => {
          if (samplePoint.geometry.type === 'Point') {
            const dist = Geodesic.distance(
              basePointCoords,
              samplePoint.geometry.coordinates,
            );
            if (dist < radius) {
              // Check if base point exists in this frame (frame could be part/stratum)
              for (let i = 0; i < frameFeatures.length; i++) {
                const frameFeature = frameFeatures[i];
                const intersect = intersectPointAreaFeatures(
                  pointFeature,
                  frameFeature,
                );
                if (intersect) {
                  // Follow the design weight
                  let dw = 1 / (Math.PI * radius * radius);
                  if (samplePoint.properties?.['_designWeight']) {
                    dw *= samplePoint.properties['_designWeight'];
                  }
                  // If buffer = 0, then sample point has already collected
                  // design weight from frame. If buffer > 0, then we need to
                  // collect the weight here.
                  if (
                    frameFeature.properties?.['_designWeight'] &&
                    buffer > 0
                  ) {
                    dw *= frameFeature.properties['_designWeight'];
                  }
                  const newFeature = copy(pointFeature);
                  if (!newFeature.properties) {
                    newFeature.properties = {};
                  }
                  newFeature.properties['_designWeight'] = dw;
                  newFeature.properties['_parent'] = samplePointIndex;
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

  return new Layer(
    new PointCollection({features: sampledFeatures}, true),
    newRecord,
    true,
  );
}
