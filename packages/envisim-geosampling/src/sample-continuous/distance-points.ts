import {
  type AreaObject,
  Feature,
  FeatureCollection,
  Geodesic,
  Point,
  type PointObject,
  createDesignWeightProperty,
  createDistanceProperty,
  createParentProperty,
  intersectPointAreaGeometries,
} from '@envisim/geojson-utils';

import {DetectionFunction, effectiveRadius} from './distance-utils.js';
import {SAMPLE_POINT_OPTIONS, type SamplePointOptions} from './options.js';
import {samplePointsOnAreas} from './points-on-areas.js';

export interface SampleDistancePointsOptions extends SamplePointOptions {
  /**
   * The point layer to collect objects from.
   */
  // baseCollection: Layer<PointObject>;
  baseCollection: FeatureCollection<Point>;
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
 * @param collection
 * @param opts

 */
export function sampleDistancePoints(
  collection: FeatureCollection<AreaObject>,
  {
    rand = SAMPLE_POINT_OPTIONS.rand,
    baseCollection,
    detectionFunction,
    cutoff,
    ...opts
  }: SampleDistancePointsOptions,
): FeatureCollection<PointObject> {
  // Compute effective radius
  const effRadius = effectiveRadius(detectionFunction, cutoff);

  // Select sample of points (optional buffer via opts)
  const buffer = cutoff;
  //opts.samplePointsOnAreasOptions.buffer = buffer;
  const pointSample = samplePointsOnAreas(collection, {
    ...opts,
    buffer,
    rand,
  });

  // To store sampled features
  const newCollection = FeatureCollection.newPoint([], baseCollection.propertyRecord, false);
  // Fix property record (same as base layer, but add design variables)
  newCollection.propertyRecord['_designWeight'] = createDesignWeightProperty();
  newCollection.propertyRecord['_distance'] = createDistanceProperty();
  newCollection.propertyRecord['_parent'] = createParentProperty();

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  baseCollection.forEach((pointFeature) => {
    // if (Point.isObject(pointFeature.geometry)) {
    const basePointCoords = pointFeature.geometry.coordinates;

    pointSample.forEach((samplePoint, samplePointIndex) => {
      if (Point.isObject(samplePoint.geometry)) {
        const dist = Geodesic.distance(basePointCoords, samplePoint.geometry.coordinates);
        if (dist < cutoff && rand.float() < detectionFunction(dist)) {
          // Check if base point exists in this frame (frame could be part/stratum)
          for (let i = 0; i < collection.features.length; i++) {
            const frameFeature = collection.features[i];
            const intersect = intersectPointAreaGeometries(
              pointFeature.geometry,
              frameFeature.geometry,
            );
            if (intersect !== null) {
              // Follow the design weight
              let dw = 1 / (Math.PI * effRadius * effRadius);
              if (samplePoint.properties?.['_designWeight']) {
                dw *= samplePoint.properties['_designWeight'];
              }
              // If buffer = 0, then sample point has already collected
              // design weight from frame. If buffer > 0, then we need
              // to collect the weight here.
              if (frameFeature.properties?.['_designWeight'] && buffer > 0) {
                dw *= frameFeature.properties['_designWeight'];
              }
              const newFeature = Feature.createPointFromJson(pointFeature, false);
              if (newFeature === null) continue;

              newFeature.properties['_designWeight'] = dw;
              newFeature.properties['_parent'] = samplePointIndex;
              newFeature.properties['_distance'] = dist;
              newCollection.addFeature(newFeature, true);
              break;
            }
          }
        }
      }
    });
    // } else {
    //   throw new Error('Only Features with geometry of type Point is allowed in parameter base.');
    // }
  });

  return newCollection;
}
