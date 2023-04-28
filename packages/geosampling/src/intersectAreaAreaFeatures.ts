import {
  bbox,
  bboxInBbox,
  intersectPolygonPolygonFeatures,
  geomEach,
  distancePointToPolygon,
  distance,
  toFeature,
} from '@envisim/geojson-utils';
import {convertPointCirclesToPolygons} from './convertPointCirclesToPolygons.js';

interface Intersect {
  geoJSON?: GeoJSON.Feature;
}

/**
 * Computes intersect between two area features.
 *
 * @param firstFeature - The first Feature containing area.
 * @param secondFeature - The second Feature containing area.
 * @returns - An intersect object.
 */
export const intersectAreaAreaFeatures = (
  firstFeature: GeoJSON.Feature,
  secondFeature: GeoJSON.Feature,
): Intersect => {
  let areaGeoms: GeoJSON.Geometry[] = [];
  const box1 = firstFeature.bbox || bbox(firstFeature);
  const box2 = secondFeature.bbox || bbox(secondFeature);
  let firstRadius = 0;
  if (firstFeature.properties?._radius) {
    firstRadius = firstFeature.properties._radius;
  }
  let secondRadius = 0;
  if (secondFeature.properties?._radius) {
    secondRadius = secondFeature.properties._radius;
  }
  if (bboxInBbox(box1, box2)) {
    geomEach(firstFeature, (firstGeom: GeoJSON.Geometry) => {
      geomEach(secondFeature, (secondGeom: GeoJSON.Geometry) => {
        // TODO: Fix unneccessary conversion to polygon
        // in case of both PointCircles.
        if (firstGeom.type === 'Point' && secondGeom.type === 'Point') {
          if (firstRadius > 0 && secondRadius > 0) {
            let dist = distance(firstGeom.coordinates, secondGeom.coordinates);
            if (dist < firstRadius + secondRadius) {
              // We have intersection,
              // convert both to polygons.
              let firstPolygon = convertPointCirclesToPolygons(
                toFeature(firstGeom, {
                  properties: {_radius: firstRadius},
                  copy: false,
                }),
              );
              let secondPolygon = convertPointCirclesToPolygons(
                toFeature(secondGeom, {
                  properties: {_radius: secondRadius},
                  copy: false,
                }),
              );
              let intersect = intersectPolygonPolygonFeatures(
                firstPolygon,
                secondPolygon,
              );
              if (intersect.geoJSON) {
                areaGeoms.push(intersect.geoJSON.geometry);
              }
            }
          }
        }
        if (
          firstGeom.type === 'Point' &&
          (secondGeom.type === 'Polygon' || secondGeom.type === 'MultiPolygon')
        ) {
          if (firstRadius > 0) {
            let dist = distancePointToPolygon(
              toFeature(firstGeom, {copy: false}),
              toFeature(secondGeom, {copy: false}),
            );
            if (dist < -firstRadius) {
              // Circle fully within polygon,
              // keep as point circle.
              areaGeoms.push(firstGeom);
            }
            if (dist >= -firstRadius && dist < firstRadius) {
              // We have intersection and need to convert
              // to polygon.
              let firstPolygon = convertPointCirclesToPolygons(
                toFeature(firstGeom, {
                  properties: {
                    _radius: firstRadius,
                  },
                  copy: false,
                }),
              );
              let secondPolygon = toFeature(secondGeom, {
                copy: false,
              });
              let intersect = intersectPolygonPolygonFeatures(
                firstPolygon,
                secondPolygon,
              );
              if (intersect.geoJSON) {
                areaGeoms.push(intersect.geoJSON.geometry);
              }
            }
          }
        }
        if (
          secondGeom.type === 'Point' &&
          (firstGeom.type === 'Polygon' || firstGeom.type === 'MultiPolygon')
        ) {
          if (secondRadius > 0) {
            let dist = distancePointToPolygon(
              toFeature(secondGeom, {copy: false}),
              toFeature(firstGeom, {copy: false}),
            );
            if (dist < -secondRadius) {
              // Circle fully within polygon,
              // keep as point circle.
              areaGeoms.push(secondGeom);
            }
            if (dist >= -secondRadius && dist < secondRadius) {
              // We have intersection and need to convert
              // to polygon.
              let secondPolygon = convertPointCirclesToPolygons(
                toFeature(secondGeom, {
                  properties: {
                    _radius: secondRadius,
                  },
                  copy: false,
                }),
              );
              let firstPolygon = toFeature(firstGeom, {
                copy: false,
              });
              let intersect = intersectPolygonPolygonFeatures(
                firstPolygon,
                secondPolygon,
              );
              if (intersect.geoJSON) {
                areaGeoms.push(intersect.geoJSON.geometry);
              }
            }
          }
        }
        if (
          (firstGeom.type === 'Polygon' || firstGeom.type === 'MultiPolygon') &&
          (secondGeom.type === 'Polygon' || secondGeom.type === 'MultiPolygon')
        ) {
          let firstPolygon = toFeature(firstGeom, {
            copy: false,
          });
          let secondPolygon = toFeature(secondGeom, {
            copy: false,
          });
          let intersect = intersectPolygonPolygonFeatures(
            firstPolygon,
            secondPolygon,
          );
          if (intersect.geoJSON) {
            areaGeoms.push(intersect.geoJSON.geometry);
          }
        }
      });
    });
  }
  if (areaGeoms.length === 0) {
    return {};
  }
  // Compute new _radius, if any.
  let properties = {};
  if (firstRadius > 0) {
    properties = {_radius: firstRadius};
  }
  if (secondRadius > 0) {
    properties = {_radius: secondRadius};
  }
  if (firstRadius > 0 && secondRadius > 0) {
    properties = {_radius: Math.min(firstRadius, secondRadius)};
  }
  if (areaGeoms.length === 1) {
    return {
      geoJSON: toFeature(areaGeoms[0], properties),
    };
  }
  if (areaGeoms.length > 1) {
    return {
      geoJSON: toFeature(
        {
          type: 'GeometryCollection',
          geometries: areaGeoms,
        },
        properties,
      ),
    };
  }
  return {};
};
