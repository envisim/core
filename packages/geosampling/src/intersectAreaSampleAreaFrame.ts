import {intersectAreaAreaFeatures} from './intersectAreaAreaFeatures.js';
import {addBboxes} from './bbox.js';
/**
 * Intersects a sample of area with an area frame and transfers _designWeight
 * from polygons to sample of polygons (if those features have design weights).
 *
 * @param areaSample - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @param areaFrame - A GeoJSON FeatureCollection of
 *   Polygon/MultiPolygon/GeometryCollection.
 * @returns A GeoJSON FeaturreCollection of geometries intersected with the area.
 */
export const intersectAreaSampleAreaFrame = (
  areaSample: GeoJSON.FeatureCollection,
  areaFrame: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  // Check that both are FeatureCollections.
  if (areaSample.type !== 'FeatureCollection') {
    throw new Error(
      'intersectAreaSampleAreaFrame: FeatureCollection is required for sampleAreas.',
    );
  }
  if (areaFrame.type !== 'FeatureCollection') {
    throw new Error(
      'intersectAreaSampleAreaFrame: FeatureCollection is required for frameAreas.',
    );
  }
  const newFeatures: GeoJSON.Feature[] = [];
  // Intersect with all polygons and push results to newFeatures.
  // If intersection, then compute new designWeight as product of the features design weights.
  areaSample.features.forEach((sampleFeature) => {
    areaFrame.features.forEach((frameFeature) => {
      const intersect = intersectAreaAreaFeatures(sampleFeature, frameFeature);

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
    throw new Error('intersectAreaSampleAreaFrame: There was no intersection.');
    // Maybe return a FeatureCollection with an empty features array
    // instead of throwing an error here.
  }
  return {
    type: 'FeatureCollection',
    features: newFeatures,
  };
};
