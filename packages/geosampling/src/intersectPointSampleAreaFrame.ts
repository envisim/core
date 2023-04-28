import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {bbox} from '@envisim/geojson-utils';

/**
 * Intersects a sample of points with an area frame and transfers _designWeight
 * from polygons to sample of points (if those features have design weights).
 *
 * @param sample - A GeoJSON FeatureCollection of Point/MultiPoint.
 * @param frame - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @returns - A GeoJSON FeaturreCollection of Point/MultiPoint intersected with the area.
 */
export const intersectPointSampleAreaFrame = (
  sample: GeoJSON.FeatureCollection,
  frame: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  // Check that both are FeatureCollections.
  if (sample.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for pointSample.');
  }
  if (frame.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for AreaFrame.');
  }
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  sample.features.forEach((sampleFeature) => {
    frame.features.forEach((frameFeature) => {
      const intersect = intersectPointAreaFeatures(sampleFeature, frameFeature);
      if (intersect.geoJSON) {
        let newFeature = intersect.geoJSON;
        let dw = 1;
        if (frameFeature.properties?._designWeight) {
          dw *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          dw *= sampleFeature.properties._designWeight;
        }
        if (newFeature.properties) {
          newFeature.properties._designWeight = dw;
          // add bbox only if type is MultiPoint
          if (newFeature.geometry.type === 'MultiPoint') {
            newFeature.bbox = bbox(newFeature);
          }
          newFeatures.push(newFeature);
        }
      }
    });
  });
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
