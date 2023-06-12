import {
  AreaCollection,
  PointCollection,
  PointFeature,
  intersectPointAreaFeatures,
} from '@envisim/geojson-utils';

/**
 * Intersects a sample of points with an area frame and transfers _designWeight
 * to sample of points (if frame features have design weights).
 *
 * @param sample a PointCollection.
 * @param frame an AreaCollection.
 * @returns a PointCollection.
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
        if (frameFeature.properties?._designWeight) {
          dw *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          dw *= sampleFeature.properties._designWeight;
        }
        intersect.properties._designWeight = dw;
        newFeatures.push(intersect);
      }
    });
  });
  return new PointCollection({features: newFeatures}, true);
}
