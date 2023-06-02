import {
  AreaCollection,
  LineCollection,
  LineFeature,
  intersectLineAreaFeatures,
} from '@envisim/geojson-utils';

/**
 * Intersects a sample of lines with an area frame and transfers _designWeight
 * to sample of lines (if frame features have design weights).
 *
 * @param sample - A GeoJSON LineFeatureCollection.
 * @param frame - A GeoJSON AreaFeatureCollection.
 * @returns - A LineCollection.
 */
export function intersectLineSampleAreaFrame(
  sample: LineCollection,
  frame: AreaCollection,
): LineCollection {
  const newFeatures: LineFeature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  sample.features.forEach((sampleFeature) => {
    frame.features.forEach((frameFeature) => {
      const intersect = intersectLineAreaFeatures(sampleFeature, frameFeature);

      if (intersect) {
        let newFeature = intersect;
        let dw = 1; // designWeight
        // Transfer the properties from sampleFeature to newFeature without copy.
        newFeature.properties = sampleFeature.properties || {};
        if (frameFeature.properties?._designWeight) {
          dw *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          dw *= sampleFeature.properties._designWeight;
        }
        // Update the design weight.
        newFeature.properties._designWeight = dw;
        newFeatures.push(newFeature);
      }
    });
  });
  return new LineCollection({
    type: 'FeatureCollection',
    features: newFeatures,
  });
}
