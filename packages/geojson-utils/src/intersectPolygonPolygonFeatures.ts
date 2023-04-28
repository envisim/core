import polygonClipping from 'polygon-clipping';
import {geomEach} from './geomEach.js';
import {toPolygon, toMultiPolygon} from './to.js';

interface Intersect {
  geoJSON?: GeoJSON.Feature;
}

export const intersectPolygonPolygonFeatures = (
  polygon1: GeoJSON.Feature,
  polygon2: GeoJSON.Feature,
): Intersect => {
  const features: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [polygon1, polygon2],
  };
  const geoms: polygonClipping.Geom[] = [];

  geomEach(features, (geom: GeoJSON.Geometry) => {
    if (geom.type === 'Polygon' || geom.type === 'MultiPolygon') {
      geoms.push(geom.coordinates as polygonClipping.Geom);
    }
  });

  if (geoms.length < 2) {
    throw new Error('Requires at least 2 polygons');
  }
  const intersection = polygonClipping.intersection(
    geoms[0],
    ...geoms.slice(1),
  );
  if (intersection.length === 0) {
    return {};
  }
  if (intersection.length === 1) {
    return {
      geoJSON: toPolygon(intersection[0]),
    };
  }
  return {
    geoJSON: toMultiPolygon(intersection),
  };
};
