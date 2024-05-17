import {
  AreaCollection,
  Layer,
  PointCollection,
  PointFeature,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';
import {copy} from '@envisim/utils';

import {DetectionFunction, effectiveHalfWidth} from './sampleDistanceUtils.js';
import {sampleSystematicLinesOnAreas} from './sampleSystematicLinesOnAreas.js';

export type TsampleDistanceLinesOpts = {
  rotation?: number;
  rand?: Random;
};

/**
 * Distance sampling with line transects.
 * Selects a line sample on an area frame and collect point objects from a base
 * layer using a detection function to (randomly) determine inclusion.
 *
 * @param frameLayer
 * @param distBetween the distance in meters between lines.
 * @param baseLayer a PointCollection of single Point features.
 * @param detectionFunction the detection function.
 * @param cutoff positive number, the maximum distance for detection.
 * @param opts an object containing distBetween, rotation, rand.
 * @param opts.rotation optional fixed rotation of the lines.
 * @param opts.rand an optional instance of Random.
 */
export function sampleSystematicDistanceLines(
  frameLayer: Layer<AreaCollection>,
  distBetween: number,
  baseLayer: Layer<PointCollection>,
  detectionFunction: DetectionFunction,
  cutoff: number,
  opts: TsampleDistanceLinesOpts,
): Layer<PointCollection> {
  // Compute effective half width
  const effHalfWidth = effectiveHalfWidth(detectionFunction, cutoff);
  // Get random generator
  const rand = opts.rand ?? new Random();
  opts.rand = rand;
  // Compute design weight for this selection
  const dw = distBetween / (effHalfWidth * 2);
  // Select sample of lines
  const lineFeatures = sampleSystematicLinesOnAreas(
    frameLayer,
    distBetween,
    opts,
  ).collection.features;
  // To store sampled features
  const sampledFeatures: PointFeature[] = [];
  const baseFeatures = baseLayer.collection.features;
  const frameFeatures = frameLayer.collection.features;
  // Find selected points in base layer and check if
  // seleccted base point is in frame and transfer _designWeight
  baseFeatures.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;

      lineFeatures.forEach((sampleLine, sampleLineIndex) => {
        const type = sampleLine.geometry.type;

        if (type === 'LineString' || type === 'MultiLineString') {
          const dist = sampleLine.distanceToPosition(basePointCoords);

          if (dist < cutoff && rand.float() < detectionFunction(dist)) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frameFeatures.length; i++) {
              const frameFeature = frameFeatures[i];
              const intersect = intersectPointAreaFeatures(
                pointFeature,
                frameFeature,
              );

              if (intersect) {
                // Follow the design weight
                // This selection
                let designWeight = dw;
                // All previous selections
                if (frameFeature.properties?.['_designWeight']) {
                  designWeight *= frameFeature.properties['_designWeight'];
                }

                const newFeature = new PointFeature(pointFeature, false);

                newFeature.properties['_designWeight'] = designWeight;
                newFeature.properties['_parent'] = sampleLineIndex;
                newFeature.properties['_distance'] = dist;

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
