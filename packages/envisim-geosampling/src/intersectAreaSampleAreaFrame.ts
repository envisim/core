import {
  AreaCollection,
  AreaFeature,
  intersectAreaAreaFeatures,
} from '@envisim/geojson-utils';

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
): AreaCollection {
  const newFeatures: AreaFeature[] = [];

  // Intersect with all area features and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  frame.forEach((frameFeature) => {
    sample.forEach((sampleFeature) => {
      const intersect = intersectAreaAreaFeatures(sampleFeature, frameFeature);

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
