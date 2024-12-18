import {
  type AreaObject,
  FeatureCollection,
  type Point,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

import {SampleDistancePointsOptions} from './distance-points.js';
import {effectiveHalfWidth} from './distance-utils.js';
import {
  SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS,
  type SampleSystematicLineOnAreaOptions,
  sampleSystematicLineOnAreaOptionsCheck,
} from './options.js';
import {sampleSystematicLinesOnAreas} from './systematic-lines-on-areas.js';

/**
 * @interface
 */
type SampleSystematicDistanceLinesOptions = SampleSystematicLineOnAreaOptions &
  SampleDistancePointsOptions;

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
  {
    rand = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.rand,
    pointsPerCircle = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.pointsPerCircle,
    distBetween,
    rotation = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.rotation,
    baseCollection,
    detectionFunction,
    cutoff,
  }: SampleSystematicDistanceLinesOptions,
): FeatureCollection<Point> {
  const optionsError = sampleSystematicLineOnAreaOptionsCheck({
    rand,
    pointsPerCircle,
    distBetween,
    rotation,
    // baseLayer,
    // detectionFunction,
    // cutoff,
  });
  if (optionsError !== null) {
    throw new RangeError(`sampleSystematicDistanceLines error: ${optionsError}`);
  }

  // Compute effective half width
  const effHalfWidth = effectiveHalfWidth(detectionFunction, cutoff);

  // Compute design weight for this selection
  const dw = distBetween / (effHalfWidth * 2.0);

  // Select sample of lines
  const lineFeatures = sampleSystematicLinesOnAreas(collection, {
    distBetween,
    rotation,
    rand,
    pointsPerCircle,
  }).features;

  // To store sampled features
  const newCollection = FeatureCollection.newPoint<Point>([], baseCollection.propertyRecord, false);
  newCollection.propertyRecord.addDesignWeight();
  newCollection.propertyRecord.addParent();
  newCollection.propertyRecord.addDistance();

  // Find selected points in base layer and check if
  // seleccted base point is in frame and transfer _designWeight
  baseCollection.forEach((pointFeature) => {
    // if (Point.isObject(pointFeature.geometry)) {
    lineFeatures.forEach((sampleLine, sampleLineIndex) => {
      const dist = sampleLine.geometry.distanceToPosition(pointFeature.geometry.coordinates);

      if (dist < cutoff && rand.float() < detectionFunction(dist)) {
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
    // } else {
    //   throw new Error('Only Features with geometry of type Point is allowed in parameter base.');
    // }
  });

  return newCollection;
}
