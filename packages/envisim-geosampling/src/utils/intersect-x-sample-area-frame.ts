import {
  AreaCollection,
  AreaFeature,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
  intersectAreaAreaFeatures,
  intersectLineAreaFeatures,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';

/**
 * Intersects a sample of points with an area frame and transfers _designWeight
 * to sample of points (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectPointSampleAreaFrame(
  sample: PointCollection,
  frame: AreaCollection,
): PointCollection {
  const newFeatures: PointFeature[] = [];

  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      const intersect = intersectPointAreaFeatures(sampleFeature, frameFeature);

      if (intersect) {
        let dw = 1;
        if (frameFeature.properties?.['_designWeight']) {
          dw *= frameFeature.properties['_designWeight'];
        }
        if (sampleFeature.properties?.['_designWeight']) {
          dw *= sampleFeature.properties['_designWeight'];
        }
        intersect.properties['_designWeight'] = dw;
        newFeatures.push(intersect);
      }
    });
  });
  return new PointCollection({features: newFeatures}, true);
}

/**
 * Intersects a sample of lines with an area frame and transfers _designWeight
 * to sample of lines (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectLineSampleAreaFrame(
  sample: LineCollection,
  frame: AreaCollection,
  pointsPerCircle: number = 16,
): LineCollection {
  const newFeatures: LineFeature[] = [];

  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      const intersect = intersectLineAreaFeatures(sampleFeature, frameFeature, pointsPerCircle);

      if (intersect) {
        let dw = 1; // designWeight
        // Transfer the properties from sampleFeature to newFeature without copy.
        intersect.properties = sampleFeature.properties ?? {};
        if (frameFeature.properties?.['_designWeight']) {
          dw *= frameFeature.properties['_designWeight'];
        }
        if (sampleFeature.properties?.['_designWeight']) {
          dw *= sampleFeature.properties['_designWeight'];
        }
        // Update the design weight.
        intersect.properties['_designWeight'] = dw;
        newFeatures.push(intersect);
      }
    });
  });
  return new LineCollection({features: newFeatures}, true);
}

/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * to sample (if frame features have design weights).
 *
 * @param sample
 * @param frame
 */
export function intersectAreaSampleAreaFrame(
  sample: AreaCollection,
  frame: AreaCollection,
  pointsPerCircle: number = 16,
): AreaCollection {
  const newFeatures: AreaFeature[] = [];

  // Intersect with all area features and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      const intersect = intersectAreaAreaFeatures(sampleFeature, frameFeature, pointsPerCircle);

      if (intersect) {
        let dw = 1;
        if (frameFeature.properties?.['_designWeight']) {
          dw *= frameFeature.properties['_designWeight'];
        }
        if (sampleFeature.properties?.['_designWeight']) {
          dw *= sampleFeature.properties['_designWeight'];
        }
        intersect.properties['_designWeight'] = dw;
        newFeatures.push(intersect);
      }
    });
  });
  return new AreaCollection({features: newFeatures}, true);
}
