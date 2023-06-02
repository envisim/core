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
 * @param sample - A GeoJSON PointFeatureCollection.
 * @param frame - A GeoJSON AreaFeatureCollection.
 * @returns - A PointCollection.
 */
export function intersectPointSampleAreaFrame(
  sample: PointCollection,
  frame: AreaCollection,
): PointCollection {
  const newFeatures: PointFeature[] = [];

  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  sample.features.forEach((sampleFeature) => {
    frame.features.forEach((frameFeature) => {
      const intersect = intersectPointAreaFeatures(sampleFeature, frameFeature);
      if (intersect) {
        let newFeature = intersect;
        let dw = 1;
        if (frameFeature.properties?._designWeight) {
          dw *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          dw *= sampleFeature.properties._designWeight;
        }
        if (newFeature.properties) {
          newFeature.properties._designWeight = dw;
          newFeatures.push(newFeature);
        }
      }
    });
  });
  return new PointCollection({
    type: 'FeatureCollection',
    features: newFeatures,
  });
}
