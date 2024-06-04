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
  type SamplePointsOnAreasOptions,
  samplePointsOnAreas,
} from './samplePointsOnAreas.js';

export interface SampleDistancePointsOptions
  extends SamplePointsOnAreasOptions {
  /**
   * The point layer to collect objects from.
   */
  baseLayer: Layer<PointCollection>;
  /**
   * The detection function giving the detection probability as a
   * function of distance.
   */
  detectionFunction: DetectionFunction;
  /**
   * The cutoff distance in meters.
   */
  cutoff: number;
}

/**
 * Distance sampling with points. Selects a point sample on an area layer
 * and collect point objects from a base layer using a detection function
 * to (randomly) determine inclusion.
 *
 * @param layer 
 * @param opts

 */
export function sampleDistancePoints(
  layer: Layer<AreaCollection>,
  {
    baseLayer,
    detectionFunction,
    cutoff,
    rand = new Random(),
    ...opts
  }: SampleDistancePointsOptions,
): Layer<PointCollection> {
  // Compute effective radius
  const effRadius = effectiveRadius(detectionFunction, cutoff);

  // Select sample of points (optional buffer via opts)
  const buffer = cutoff;
  //opts.samplePointsOnAreasOptions.buffer = buffer;
  const pointSample = samplePointsOnAreas(layer, {
    ...opts,
    buffer,
    rand,
  });
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
              for (let i = 0; i < layer.collection.features.length; i++) {
                const frameFeature = layer.collection.features[i];
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
