import {coordToWebMercator, coordFromWebMercator} from './projections.js';
import turfIntersect from '@turf/intersect'; // now assumes global turf
import {deepCopy} from './deepCopy.js';

interface Intersect {
  intersection: boolean;
  geoJSON?: GeoJSON.Feature;
}

/**
 * Intersect of two Polygon/MultiPolygon GeoJSON Features.
 *
 * @param polygon1 - The first GeoJSON Polygon/MultiPolygon Feature.
 * @param polygon2 - The second GeoJSON Polygon/MultiPolygon Feature.
 * @returns - An object containing intersection true/false and possible resulting geoJSON.
 */
export const intersectPolygonPolygon = (
  polygon1: GeoJSON.Feature,
  polygon2: GeoJSON.Feature,
): Intersect => {
  const pol1: any = {
    type: 'Feature',
    geometry: deepCopy(polygon1.geometry),
    properties: {},
  };
  const pol2: any = {
    type: 'Feature',
    geometry: deepCopy(polygon2.geometry),
    properties: {},
  };
  if (polygon1.geometry.type === 'Polygon') {
    pol1.geometry.coordinates.forEach((ring: GeoJSON.Position[]) => {
      ring = ring.map(coordToWebMercator);
    });
  }
  if (polygon1.geometry.type === 'MultiPolygon') {
    pol1.geometry.coordinates.forEach((polygon: GeoJSON.Position[][]) => {
      polygon.forEach((ring: GeoJSON.Position[]) => {
        ring = ring.map(coordToWebMercator);
      });
    });
  }
  if (polygon2.geometry.type === 'Polygon') {
    pol2.geometry.coordinates.forEach((ring: GeoJSON.Position[]) => {
      ring = ring.map(coordToWebMercator);
    });
  }
  if (polygon2.geometry.type === 'MultiPolygon') {
    pol2.geometry.coordinates.forEach((polygon: GeoJSON.Position[][]) => {
      polygon.forEach((ring: GeoJSON.Position[]) => {
        ring = ring.map(coordToWebMercator);
      });
    });
  }
  // Intersect, use turf for now assume global turf
  // maybe use polygon-clipping library (which turf do)
  // but turf use without projection, so probably not good for
  // really long segments.
  const intersect = turfIntersect(pol1, pol2);
  if (intersect !== null) {
    if (intersect.geometry.type === 'Polygon') {
      intersect.geometry.coordinates.forEach((ring: GeoJSON.Position[]) => {
        ring = ring.map(coordFromWebMercator);
      });
    }
    if (intersect.geometry.type === 'MultiPolygon') {
      intersect.geometry.coordinates.forEach(
        (polygon: GeoJSON.Position[][]) => {
          polygon.forEach((ring: GeoJSON.Position[]) => {
            ring = ring.map(coordFromWebMercator);
          });
        },
      );
    }
    return {
      intersection: true,
      geoJSON: intersect,
    };
  }
  return {intersection: false};
};
