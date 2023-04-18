import {intersectLineAreaFeatures} from './intersectLineAreaFeatures.js';
import {addBboxes} from './bbox.js';

/**
 * Intersects a sample of lines with an area frame and transfers _designWeight
 * from polygons to sample of lines (if those features have design weights).
 *
 * @param lineSample - A GeoJSON FeatureCollection of LineString/MultiLineString.
 * @param areaFrame - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @returns - A GeoJSON FeaturreCollection of LineString/MultiLineString
 *   intersected with the area.
 */
export const intersectLineSampleAreaFrame = (
  lineSample: GeoJSON.FeatureCollection,
  areaFrame: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  // Check that both are FeatureCollections.
  if (lineSample.type !== 'FeatureCollection') {
    throw new Error(
      'intersectLineSampleAreaFrame: FeatureCollection is required for LineSample.',
    );
  }
  if (areaFrame.type !== 'FeatureCollection') {
    throw new Error(
      'intersectLineSampleAreaFrame: FeatureCollection is required for AreaFrame.',
    );
  }
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  lineSample.features.forEach((sampleFeature) => {
    areaFrame.features.forEach((frameFeature) => {
      const intersect = intersectLineAreaFeatures(sampleFeature, frameFeature);

      if (intersect.geoJSON) {
        const newFeature = intersect.geoJSON;
        let designWeight = 1;
        if (frameFeature.properties?._designWeight) {
          designWeight *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          designWeight *= sampleFeature.properties._designWeight;
        }
        if (newFeature?.properties) {
          newFeature.properties['_designWeight'] = designWeight;
        }
        addBboxes(newFeature);
        newFeatures.push(newFeature);
      }
    });
  });
  if (newFeatures.length === 0) {
    throw new Error('intersectLineSampleAreaFrame: There was no intersection.');
    // Maybe return empty collection instead.
  }
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
