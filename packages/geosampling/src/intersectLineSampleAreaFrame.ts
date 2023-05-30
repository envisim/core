import {bbox} from '@envisim/geojson-utils';

import {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';

/**
 * Intersects a sample of lines with an area frame and transfers _designWeight
 * from polygons to sample of lines (if those features have design weights).
 *
 * @param sample - A GeoJSON FeatureCollection of LineString/MultiLineString.
 * @param frame - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @returns - A GeoJSON FeaturreCollection of LineString/MultiLineString
 *   intersected with the area.
 */
export const intersectLineSampleAreaFrame = (
  sample: GeoJSON.FeatureCollection,
  frame: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  // Check that both are FeatureCollections.
  if (sample.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for LineSample.');
  }
  if (frame.type !== 'FeatureCollection') {
    throw new Error('FeatureCollection is required for AreaFrame.');
  }
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  sample.features.forEach((sampleFeature) => {
    frame.features.forEach((frameFeature) => {
      const intersect = intersectLineAreaFeatures(sampleFeature, frameFeature);

      if (intersect.geoJSON) {
        let newFeature = intersect.geoJSON;
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
