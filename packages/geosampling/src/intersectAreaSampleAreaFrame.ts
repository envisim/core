import {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
import {bbox} from '@envisim/geojson-utils';
/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * from polygons to sample of polygons (if those features have design weights).
 *
 * @param sample - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @param frame - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @returns A GeoJSON FeaturreCollection of geometries intersected with the area.
 */
export const intersectAreaSampleAreaFrame = (
  sample: GeoJSON.FeatureCollection,
  frame: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  // Check that both are FeatureCollections.
  if (sample.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for sampleAreas.');
  }
  if (frame.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for frameAreas.');
  }
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  sample.features.forEach((sampleFeature) => {
    frame.features.forEach((frameFeature) => {
      const intersect = intersectAreaAreaFeatures(sampleFeature, frameFeature);

      if (intersect.geoJSON) {
        let newFeature = intersect.geoJSON;
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
        newFeature.bbox = bbox(newFeature);
        newFeatures.push(newFeature);
      }
    });
  });
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
