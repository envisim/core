import {bbox, bboxInBbox} from './bbox.js';
import {pointInPolygon} from './pointInPolygon.js';
import {geomEach} from './geomEach.js';
import {convertPointCirclesToPolygons} from './convertPointCirclesToPolygons.js';

interface Intersect {
  intersection: boolean;
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
      let areaF: GeoJSON.Feature = {
        type: 'Feature',
        geometry: areaGeom,
        properties: {
          _radius: 0,
        },
      };
      if (areaGeom.type === 'Point' || areaGeom.type === 'MultiPoint') {
        if (areaFeature.properties?._radius) {
          if (areaF.properties) {
            areaF.properties._radius = areaFeature.properties._radius;
          }
          areaF = convertPointCirclesToPolygons(areaF);
        } else {
          throw new Error(
            'intersectPointAreaFeatures: Only Polygon/MultiPolygon geometries are allowed in areaFeature.',
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
          let pointF: GeoJSON.Feature = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: point.slice(),
            },
            properties: {},
          };
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
              'intersectPointAreaFeatures: Only Polygon/MultiPolygon geometries are allowed in areaFeature.',
            );
          }
        });
      });
    });
  }
  if (points.length === 0) {
    return {intersection: false};
  }
  if (points.length === 1) {
    return {
      intersection: true,
      geoJSON: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: points[0],
        },
        properties: {},
      },
    };
  }
  if (points.length > 1) {
    return {
      intersection: true,
      geoJSON: {
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: points,
        },
        properties: {},
      },
    };
  }
  return {intersection: false};
};
