import {
  type AreaObject,
  Feature,
  FeatureCollection,
  type PointObject,
  intersectPointAreaGeometries,
} from "@envisim/geojson";
import { distance } from "@envisim/geojson-utils/geodesic";
import { Random } from "@envisim/random";
import type { EnvisimError } from "@envisim/utils";
import { effectiveRadius } from "./distance-utils.js";
import {
  type OptionsDistancePoints,
  type OptionsPointsOnAreas,
  optionsDistancePointsCheck,
  optionsPointsOnAreasCheck,
} from "./options.js";
import { samplePointsOnAreas } from "./points-on-areas.js";

/**
 * @interface
 */
export type SampleDistancePointsOptions = OptionsPointsOnAreas & OptionsDistancePoints;

export function sampleDistancePointsCheck(options: SampleDistancePointsOptions): EnvisimError {
  return optionsPointsOnAreasCheck(options).append(optionsDistancePointsCheck(options));
}

/**
 * Distance sampling with points. Selects a point sample on an area layer
 * and collect point objects from a base layer using a detection function
 * to (randomly) determine inclusion.
 *
 * @param collection -
 * @param options -
 */
export function sampleDistancePoints(
  collection: FeatureCollection<AreaObject>,
  options: SampleDistancePointsOptions,
): FeatureCollection<PointObject> {
  sampleDistancePointsCheck(options).throwErrors();

  const { rand = new Random(), baseCollection, detectionFunction, cutoff } = options;

  // Compute effective radius
  const effRadius = effectiveRadius(detectionFunction, cutoff);
  const baseDw = 1.0 / (Math.PI * effRadius * effRadius);

  // Select sample of points (optional buffer via opts)
  const pointSample = samplePointsOnAreas(collection, {
    ...options,
    buffer: cutoff,
    rand,
  });

  // To store sampled features
  const newCollection = FeatureCollection.newPoint([], baseCollection.propertyRecord, false);

  // Find selected points in base layer and check if seleccted base point
  // is in frame and transfer _designWeight
  baseCollection.forEach((pointFeature) => {
    // if (Point.isObject(pointFeature.geometry)) {
    const basePointCoords = pointFeature.geometry.coordinates;

    pointSample.forEach((samplePoint, samplePointIndex) => {
      const dist = distance(basePointCoords, samplePoint.geometry.coordinates);
      if (dist < cutoff && rand.random() < detectionFunction(dist)) {
        // Check if base point exists in this frame (frame could be part/stratum)
        for (let i = 0; i < collection.features.length; i++) {
          const frameFeature = collection.features[i];
          const intersect = intersectPointAreaGeometries(
            pointFeature.geometry,
            frameFeature.geometry,
          );
          if (intersect !== null) {
            // Follow the design weight
            let dw = baseDw * samplePoint.getSpecialPropertyDesignWeight();
            // If buffer = 0, then sample point has already collected
            // design weight from frame. If buffer > 0, then we need
            // to collect the weight here.
            if (cutoff > 0) {
              dw *= frameFeature.getSpecialPropertyDesignWeight();
            }
            const newFeature = Feature.createPointFromJson(pointFeature, false);
            if (newFeature === null) continue;

            newFeature.setSpecialPropertyDesignWeight(dw);
            newFeature.setSpecialPropertyDistance(dist);
            newFeature.setSpecialPropertyParent(samplePointIndex);
            newCollection.addFeature(newFeature, true);
            break;
          }
        }
      }
    });
  });

  return newCollection;
}
