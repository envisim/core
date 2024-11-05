import {
  AreaCollection,
  Geodesic,
  GeometricPrimitive,
  Layer,
  PointCollection,
  PointFeature,
  createDesignWeightProperty,
  createParentProperty,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';
import {copy} from '@envisim/utils';

import {SAMPLE_POINT_OPTIONS, type SamplePointOptions} from './options.js';
import {samplePointsOnAreas} from './points-on-areas.js';

interface SampleRelascopePointsOptions extends SamplePointOptions {
  /**
   * The point layer to collect objects from.
   */
  baseLayer: Layer<PointCollection>;
  /**
   * The sizeProperty is the id of the proberty in the baseLayer that should
   * be used as the size property and should be in meters (e.g. diameter in meters).
   */
  sizeProperty: string;
  /**
   * The relascope factor to be used.
   */
  factor: number;
}

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
 * @param layer
 * @param opts
 */
export function sampleRelascopePoints(
  layer: Layer<AreaCollection>,
  {
    buffer = SAMPLE_POINT_OPTIONS.buffer,
    baseLayer,
    factor,
    sizeProperty,
    ...opts
  }: SampleRelascopePointsOptions,
): Layer<PointCollection> {
  Layer.assert(layer, GeometricPrimitive.AREA);

  // Square root of relascope factor
  const sqrtRf = Math.sqrt(factor);
  // Select sample of points (optional buffer via opts)
  const pointSample = samplePointsOnAreas(layer, {buffer, ...opts});
  // To store sampled features
  const sampledFeatures: PointFeature[] = [];
  const baseFeatures = baseLayer.collection.features;
  const frameFeatures = layer.collection.features;

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  baseFeatures.forEach((pointFeature) => {
    if (pointFeature.geometry.type === 'Point') {
      const basePointCoords = pointFeature.geometry.coordinates;
      let sizePropertyValue = 0;
      if (pointFeature.properties !== undefined) {
        sizePropertyValue = pointFeature.properties[sizeProperty] || 0;
      }
      // Radius of inclusion zone
      const radius = (50 * sizePropertyValue) / sqrtRf;

      pointSample.collection.features.forEach((samplePoint, samplePointIndex) => {
        if (samplePoint.geometry.type === 'Point') {
          const dist = Geodesic.distance(basePointCoords, samplePoint.geometry.coordinates);
          if (dist < radius) {
            // Check if base point exists in this frame (frame could be part/stratum)
            for (let i = 0; i < frameFeatures.length; i++) {
              const frameFeature = frameFeatures[i];
              if (
                pointFeature.geometry.type === 'GeometryCollection' ||
                frameFeature.geometry.type === 'GeometryCollection'
              )
                continue;
              const intersect = intersectPointAreaGeometries(
                pointFeature.geometry,
                frameFeature.geometry,
              );
              if (intersect !== null) {
                // Follow the design weight
                let dw = 1 / (Math.PI * radius * radius);
                if (samplePoint.properties?.['_designWeight']) {
                  dw *= samplePoint.properties['_designWeight'];
                }
                // If buffer = 0, then sample point has already collected
                // design weight from frame. If buffer > 0, then we need to
                // collect the weight here.
                if (frameFeature.properties?.['_designWeight'] && buffer > 0) {
                  dw *= frameFeature.properties['_designWeight'];
                }
                const newFeature = copy(pointFeature);
                if (newFeature.properties === undefined) {
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
      });
    } else {
      throw new Error('Only Features with geometry of type Point is allowed in parameter base.');
    }
  });

  // Fix property record (same as base layer, but add design variables)
  const newRecord = copy(baseLayer.propertyRecord);
  newRecord['_designWeight'] = createDesignWeightProperty();
  newRecord['_parent'] = createParentProperty();

  return new Layer(new PointCollection({features: sampledFeatures}, true), newRecord, true);
}
