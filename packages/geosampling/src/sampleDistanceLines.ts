import {
  intersectPointAreaFeatures,
  PointCollection,
  PointFeature,
  AreaCollection,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

import {effectiveHalfWidth} from './sampleDistanceUtils.js';
import {sampleLinesOnAreas} from './sampleLinesOnAreas.js';

export type TsampleDistanceLinesOpts = {
  rotation?: number;
  rand?: Random;
};

/**
 * Distance sampling with line transects.
 * Selects a line sample on an area frame and collect point objects from a base
 * layer using a detection function to (randomly) determine inclusion.
 *
 * @param frame an AreaCollection.
 * @param distBetween the distance in meters between lines.
 * @param base a PointCollection of single Point features.
 * @param detectionFunction the detection function.
 * @param cutoff positive number, the maximum distance for detection.
 * @param opts an object containing distBetween, rotation, rand.
 * @param opts.rotation optional fixed rotation of the lines.
 * @param opts.rand an optional instance of Random.
 * @returns resulting PointCollection.
 */
export function sampleDistanceLines(
  frame: AreaCollection,
  distBetween: number,
  base: PointCollection,
  detectionFunction: Function,
  cutoff: number,
  opts: TsampleDistanceLinesOpts,
): PointCollection {
  // Compute effective half width
  const effHalfWidth = effectiveHalfWidth(detectionFunction, cutoff);
  // Get random generator
  const rand = opts.rand ?? new Random();
  opts.rand = rand;
  // Compute design weight for this selection
  const dw = distBetween / (effHalfWidth * 2);
  // Select sample of lines
  const lineSample = sampleLinesOnAreas(frame, distBetween, opts);
  // To store sampled features
  const sampledFeatures: PointFeature[] = [];

  // Find selected points in base layer and check if
  // seleccted base point is in frame and transfer _designWeight
  base.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;

      lineSample.forEach((sampleLine, sampleLineIndex) => {
        const type = sampleLine.geometry.type;

        if (type === 'LineString' || type === 'MultiLineString') {
          const dist = sampleLine.distanceToPosition(basePointCoords);

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
                // This selection
                let designWeight = dw;
                // All previous selections
                if (frameFeature.properties?._designWeight) {
                  designWeight *= frameFeature.properties._designWeight;
                }

                const newFeature = new PointFeature(pointFeature, false);

                newFeature.properties._designWeight = designWeight;
                newFeature.properties._parent = sampleLineIndex;
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
  return new PointCollection({
    type: 'FeatureCollection',
    features: sampledFeatures,
  });
}
