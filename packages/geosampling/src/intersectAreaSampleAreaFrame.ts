import {
  GeoJSON,
  AreaCollection,
  intersectAreaAreaFeatures,
} from '@envisim/geojson-utils';

/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * to sample (if frame features have design weights).
 *
 * @param sample - A GeoJSON AreaFeatureCollection.
 * @param frame - A GeoJSON AreaFeatureCollection.
 * @returns An AreaCollection.
 */
export const intersectAreaSampleAreaFrame = (
  sample: AreaCollection,
  frame: AreaCollection,
): AreaCollection => {
  const newFeatures: GeoJSON.AreaFeature[] = [];

  // Intersect with all area features and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  sample.features.forEach((sampleFeature) => {
    frame.features.forEach((frameFeature) => {
      const intersect = intersectAreaAreaFeatures(sampleFeature, frameFeature);

      if (intersect) {
        let newFeature = intersect;
        let dw = 1;
        if (frameFeature.properties?._designWeight) {
          dw *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          dw *= sampleFeature.properties._designWeight;
        }
        if (newFeature?.properties) {
          newFeature.properties._designWeight = dw;
        }
        newFeatures.push(newFeature);
      }
    });
  });
  return new AreaCollection({
    type: 'FeatureCollection',
    features: newFeatures,
  });
};