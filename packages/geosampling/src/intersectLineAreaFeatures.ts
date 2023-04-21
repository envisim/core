import {
  bbox,
  bboxInBbox,
  intersectLinePolygonFeatures,
  geomEach,
  toFeature,
} from '@envisim/geojson-utils';
import {convertPointCirclesToPolygons} from './convertPointCirclesToPolygons.js';

interface Intersect {
  intersection: boolean;
  geoJSON?: GeoJSON.Feature;
}

/**
 * Computes the intersect between a line Feature and an area Feature.
 *
 * @param lineFeature - The line Feature.
 * @param areaFeature - The area Feature.
 * @returns - An intersect object.
 */
export const intersectLineAreaFeatures = (
  lineFeature: GeoJSON.Feature,
  areaFeature: GeoJSON.Feature,
): Intersect => {
  let lines: GeoJSON.Position[][] = [];
  const box1 = lineFeature.bbox || bbox(lineFeature);
  const box2 = areaFeature.bbox || bbox(areaFeature);
  if (bboxInBbox(box1, box2)) {
    geomEach(areaFeature, (areaGeom: GeoJSON.Geometry) => {
      let areaF = toFeature(areaGeom, {
        properties: {
          _radius: 0,
        },
      });
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
      geomEach(lineFeature, (lineGeom: GeoJSON.Geometry) => {
        if (
          lineGeom.type === 'LineString' ||
          lineGeom.type == 'MultiLineString'
        ) {
          let lineF = toFeature(lineGeom, {copy: false});
          if (
            areaF.geometry.type === 'Polygon' ||
            areaF.geometry.type === 'MultiPolygon'
          ) {
            let intersect = intersectLinePolygonFeatures(lineF, areaF);
            if (intersect.geoJSON) {
              if (intersect.geoJSON.geometry.type === 'LineString') {
                lines.push(intersect.geoJSON.geometry.coordinates);
              } else if (
                intersect.geoJSON.geometry.type === 'MultiLineString'
              ) {
                lines = lines.concat(intersect.geoJSON.geometry.coordinates);
              }
            }
          } else {
            throw new Error(
              'Only Polygon/MultiPolygon geometries are allowed in areaFeature.',
            );
          }
        }
      });
    });
  }
  if (lines.length === 0) {
    return {intersection: false};
  }
  if (lines.length === 1) {
    return {
      intersection: true,
      geoJSON: toFeature(
        {
          type: 'LineString',
          coordinates: lines[0],
        },
        {copy: false},
      ),
    };
  }
  if (lines.length > 1) {
    return {
      intersection: true,
      geoJSON: toFeature(
        {
          type: 'MultiLineString',
          coordinates: lines,
        },
        {copy: false},
      ),
    };
  }
  return {intersection: false};
};
