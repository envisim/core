import {
  AreaCollection,
  Layer,
  PointCollection,
  PointFeature,
  createDesignWeightProperty,
  createDistanceProperty,
  createParentProperty,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';
import {copy} from '@envisim/utils';

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
 * @param layer
 * @param opts

 */
export function sampleSystematicDistanceLines(
  layer: Layer<AreaCollection>,
  {
    rand = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.rand,
    pointsPerCircle = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.pointsPerCircle,
    distBetween,
    rotation = SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS.rotation,
    baseLayer,
    detectionFunction,
    cutoff,
  }: SampleSystematicDistanceLinesOptions,
): Layer<PointCollection> {
  const optionsError = sampleSystematicLineOnAreaOptionsCheck(layer, {
    rand,
    pointsPerCircle,
    distBetween,
    rotation,
    // baseLayer,
    // detectionFunction,
    // cutoff,
  });
  if (optionsError !== 0) {
    throw new RangeError(`sampleSystematicDistanceLines error: ${optionsError}`);
  }

  // Compute effective half width
  const effHalfWidth = effectiveHalfWidth(detectionFunction, cutoff);

  // Compute design weight for this selection
  const dw = distBetween / (effHalfWidth * 2.0);

  // Select sample of lines
  const lineFeatures = sampleSystematicLinesOnAreas(layer, {
    distBetween,
    rotation,
    rand,
    pointsPerCircle,
  }).collection.features;

  // To store sampled features
  const sampledFeatures: PointFeature[] = [];
  const baseFeatures = baseLayer.collection.features;
  const frameFeatures = layer.collection.features;
  // Find selected points in base layer and check if
  // seleccted base point is in frame and transfer _designWeight
  baseFeatures.forEach((pointFeature) => {
    const pg = pointFeature.geometry;
    if (pg.type === 'GeometryCollection') return;

    if (pg.type === 'Point') {
      const basePointCoords = pg.coordinates;

      lineFeatures.forEach((sampleLine, sampleLineIndex) => {
        const slg = sampleLine.geometry;
        if (slg.type === 'GeometryCollection') return;

        if (slg.type === 'LineString' || slg.type === 'MultiLineString') {
          const dist = sampleLine.distanceToPosition(basePointCoords);

          if (dist < cutoff && rand.float() < detectionFunction(dist)) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frameFeatures.length; i++) {
              const frameFeature = frameFeatures[i];
              if (frameFeature.geometry.type === 'GeometryCollection') continue;

              const intersect = intersectPointAreaGeometries(pg, frameFeature.geometry);

              if (intersect !== null) {
                // Follow the design weight
                // This selection
                let designWeight = dw;
                // All previous selections
                if (frameFeature.properties?.['_designWeight']) {
                  designWeight *= frameFeature.properties['_designWeight'];
                }

                const newFeature = new PointFeature(pointFeature, false);

                newFeature.properties['_designWeight'] *= designWeight;
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
      throw new Error('Only Features with geometry of type Point is allowed in parameter base.');
    }
  });
  // Fix property record (same as base layer, but add design variables)
  const newRecord = copy(baseLayer.propertyRecord);
  newRecord['_designWeight'] = createDesignWeightProperty();
  newRecord['_parent'] = createParentProperty();
  newRecord['_distance'] = createDistanceProperty();

  return new Layer(new PointCollection({features: sampledFeatures}, true), newRecord, true);
}
