import polygonClipping from 'polygon-clipping';
import {geomEach} from './geomEach.js';
import {toFeatureCollection} from './toFeatureCollection.js';

/**
 * Computes the union of the polygons in a GeoJSON FeatureCollection
 * @param polygons - A FeatureCollection
 * @returns - A FeatureCollection
 */
export const unionOfPolygons = (
  polygons: GeoJSON.FeatureCollection,
): GeoJSON.FeatureCollection => {
  const geoms: polygonClipping.Geom[] = [];
  geomEach(polygons, (geom: GeoJSON.Geometry) => {
    if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
      geoms.push(geom.coordinates as polygonClipping.Geom);
    }
  });
  if (geoms.length < 2) {
    throw new Error('Requires at least 2 polygons');
  }

  const union = polygonClipping.union(geoms[0], ...geoms.slice(1));
  if (union.length === 1) {
    return toFeatureCollection(
      {
        type: 'Polygon',
        coordinates: union[0],
      },
      {copy: false},
    );
  }
  return toFeatureCollection(
    {
      type: 'MultiPolygon',
      coordinates: union,
    },
    {copy: false},
  );
};
