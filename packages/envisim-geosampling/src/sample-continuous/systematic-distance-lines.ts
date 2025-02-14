import {
  type AreaObject,
  FeatureCollection,
  type Point,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';
import {Random, type RandomGenerator} from '@envisim/random';

import {effectiveHalfWidth} from './distance-utils.js';
import {
  type OptionsCircleConversion,
  type OptionsDistancePoints,
  type OptionsParallelLines,
  type SampleError,
  optionsCircleConversionCheck,
  optionsDistancePointsCheck,
  optionsParallelLinesCheck,
  throwRangeError,
} from './options.js';
import {sampleSystematicLinesOnAreas} from './systematic-lines-on-areas.js';

export interface SampleSystematicDistanceLinesOptions
  extends OptionsCircleConversion,
    OptionsParallelLines,
    OptionsDistancePoints {
  rand?: RandomGenerator;
}

export function sampleSystematicDistanceLinesCheck(
  options: SampleSystematicDistanceLinesOptions,
): SampleError {
  return (
    optionsCircleConversionCheck(options) ||
    optionsParallelLinesCheck(options) ||
    optionsDistancePointsCheck(options)
  );
}

/**
 * Distance sampling with line transects.
 * Selects a line sample on an area frame and collect point objects from a base
 * layer using a detection function to (randomly) determine inclusion.
 *
 * @param collection
 * @param opts

 */
export function sampleSystematicDistanceLines(
  collection: FeatureCollection<AreaObject>,
  options: SampleSystematicDistanceLinesOptions,
): FeatureCollection<Point> {
  throwRangeError(sampleSystematicDistanceLinesCheck(options));

  const {rand = new Random(), interspace, detectionFunction, cutoff} = options;

  // Compute effective half width
  const effHalfWidth = effectiveHalfWidth(detectionFunction, cutoff);

  // Compute design weight for this selection
  const dw = interspace / (effHalfWidth * 2.0);

  // Select sample of lines
  const lineFeatures = sampleSystematicLinesOnAreas(collection, {...options, rand}).features;

  // To store sampled features
  const newCollection = FeatureCollection.newPoint<Point>(
    [],
    options.baseCollection.propertyRecord,
    false,
  );

  // Find selected points in base layer and check if
  // seleccted base point is in frame and transfer _designWeight
  options.baseCollection.forEach((pointFeature) => {
    // if (Point.isObject(pointFeature.geometry)) {
    lineFeatures.forEach((sampleLine, sampleLineIndex) => {
      const dist = sampleLine.geometry.distanceToPosition(pointFeature.geometry.coordinates);

      if (dist < cutoff && rand.random() < detectionFunction(dist)) {
        // Check if base point exists in this frame (frame could be part/stratum)
        for (let i = 0; i < collection.features.length; i++) {
          const frameFeature = collection.features[i];
          const intersect = intersectPointAreaGeometries(
            pointFeature.geometry,
            frameFeature.geometry,
          );
          if (intersect === null) continue;

          // Follow the design weight: This selection * all previous selections
          const designWeight = dw * frameFeature.getSpecialPropertyDesignWeight();

          newCollection.addGeometry(pointFeature.geometry, {
            ...(pointFeature.properties ?? {}),
            _designWeight: designWeight,
            _parent: sampleLineIndex,
            _distance: dist,
          });
          break;
        }
      }
    });
  });

  return newCollection;
}
