import {
  AreaFeature,
  AreaCollection,
  intersectAreaAreaFeatures,
} from '@envisim/geojson-utils';

/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * to sample (if frame features have design weights).
 *
 * @param sample an AreaCollection.
 * @param frame an AreaCollection.
 * @returns an AreaCollection.
 */
export function intersectAreaSampleAreaFrame(
  sample: AreaCollection,
  frame: AreaCollection,
): AreaCollection {
  const newFeatures: AreaFeature[] = [];

  // Intersect with all area features and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  sample.forEach((sampleFeature) => {
    frame.forEach((frameFeature) => {
      const intersect = intersectAreaAreaFeatures(sampleFeature, frameFeature);

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
  return new AreaCollection({
    type: 'FeatureCollection',
    features: newFeatures,
  });
}
