import polygonClipping from 'polygon-clipping';
import {geomEach} from './geomEach.js';
import {toPolygon, toMultiPolygon} from './to.js';
import type * as GJ from './geojson/types.js';

interface Intersect {
  geoJSON?: GJ.AreaFeature;
}

// TODO: Fix conversion of PointCircles/MultiPointCircles and AreaGeometryCollection?

/**
 * Intersect of polygons.
 * @param polygon1 - An AreaFeature.
 * @param polygon2 - An AreaFeature.
 * @returns - An empty object {} if no intersect and {geoJSON} if intersect.
 */
export const intersectPolygonPolygonFeatures = (
  polygon1: GJ.AreaFeature,
  polygon2: GJ.AreaFeature,
): Intersect => {
  const features: GJ.FeatureCollection = {
    type: 'FeatureCollection',
    features: [polygon1, polygon2],
  };
  const geoms: polygonClipping.Geom[] = [];

  geomEach(features, (geom: GJ.Geometry) => {
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
