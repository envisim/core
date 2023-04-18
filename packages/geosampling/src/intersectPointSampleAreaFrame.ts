import {intersectPointAreaFeatures} from './intersectPointAreaFeatures.js';
import {addBboxes} from './bbox.js';

/**
 * Intersects a sample of points with an area frame and transfers _designWeight
 * from polygons to sample of points (if those features have design weights).
 *
 * @param pointSample - A GeoJSON FeatureCollection of Point/MultiPoint.
 * @param areaFrame - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @returns - A GeoJSON FeaturreCollection of Point/MultiPoint intersected with the area.
 */
export const intersectPointSampleAreaFrame = (
  pointSample: GeoJSON.FeatureCollection,
  areaFrame: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  // Check that both are FeatureCollections.
  if (pointSample.type !== 'FeatureCollection') {
    throw new Error(
      'intersectPointSampleAreaFrame: FeatureCollection is required for pointSample.',
    );
  }
  if (areaFrame.type !== 'FeatureCollection') {
    throw new Error(
      'intersectPointSampleAreaFrame: FeatureCollection is required for AreaFrame.',
    );
  }
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // if intersection, then compute new designWeight as product of the features design weights.
  pointSample.features.forEach((sampleFeature) => {
    areaFrame.features.forEach((frameFeature) => {
      const intersect = intersectPointAreaFeatures(sampleFeature, frameFeature);
      if (intersect.geoJSON) {
        const newFeature = intersect.geoJSON;
        let designWeight = 1;
        if (frameFeature.properties?._designWeight) {
          designWeight *= frameFeature.properties._designWeight;
        }
        if (sampleFeature.properties?._designWeight) {
          designWeight *= sampleFeature.properties._designWeight;
        }
        if (newFeature.properties) {
          newFeature.properties['_designWeight'] = designWeight;
          addBboxes(newFeature);
          newFeatures.push(newFeature);
        }
      }
    });
  });
  if (newFeatures.length === 0) {
    throw new Error(
      'intersectPointSampleAreaFrame: There was no intersection.',
    );
    // Maybe return empty collection here.
  }
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
