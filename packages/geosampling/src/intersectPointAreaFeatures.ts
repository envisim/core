import {
  bbox,
  bboxInBbox,
  pointInPolygon,
  geomEach,
  toFeature,
  toPoint,
  toMultiPoint,
} from '@envisim/geojson-utils';
import {convertPointCirclesToPolygons} from './convertPointCirclesToPolygons.js';

interface Intersect {
  geoJSON?: GeoJSON.Feature;
}

/**
 * Computes the intersect of a Feature containing Point/MultiPoint and a Feature
 * containing Polygon/MultiPolygon.
 *
 * @param pointFeature - A Feature containing Point/MultiPoint geometries.
 * @param areaFeature - A Feature containing Polygon/MultiPolygon geometries.
 * @returns - An intersect object.
 */
export const intersectPointAreaFeatures = (
  pointFeature: GeoJSON.Feature,
  areaFeature: GeoJSON.Feature,
): Intersect => {
  const points: GeoJSON.Position[] = [];
  const box1 = pointFeature.bbox || bbox(pointFeature);
  const box2 = areaFeature.bbox || bbox(areaFeature);
  if (bboxInBbox(box1, box2)) {
    geomEach(areaFeature, (areaGeom: GeoJSON.Geometry) => {
      let areaF = toFeature(areaGeom, {_radius: 0});
      if (areaGeom.type === 'Point' || areaGeom.type === 'MultiPoint') {
        if (areaFeature.properties?._radius) {
          if (areaF.properties) {
            areaF.properties._radius = areaFeature.properties._radius;
          }
          areaF = convertPointCirclesToPolygons(areaF);
        } else {
          throw new Error(
            'Only Polygon/MultiPolygon geometries are allowed in areaFeature.',
          );
        }
      }
      geomEach(pointFeature, (pointGeom: GeoJSON.Geometry) => {
        let pointsCoords = [];
        if (pointGeom.type === 'Point') {
          pointsCoords.push(pointGeom.coordinates);
        }
        if (pointGeom.type === 'MultiPoint') {
          pointsCoords = pointGeom.coordinates;
        }
        pointsCoords.forEach((point) => {
          let pointF = toPoint(point.slice());
          if (
            areaF.geometry.type === 'Polygon' ||
            areaF.geometry.type === 'MultiPolygon'
          ) {
            if (pointInPolygon(pointF, areaF)) {
              if (pointF.geometry.type === 'Point') {
                points.push(pointF.geometry.coordinates);
              }
            }
          } else {
            throw new Error(
              'Only Polygon/MultiPolygon geometries are allowed in areaFeature.',
            );
          }
        });
      });
    });
  }
  if (points.length === 0) {
    return {};
  }
  if (points.length === 1) {
    return {
      geoJSON: toPoint(points[0]),
    };
  }
  return {
    geoJSON: toMultiPoint(points),
  };
};
