import {copy} from './copy.js';
import {destination} from './destination.js';
import {geomEach} from './geomEach.js';

// Internal function to treat non-standard circle geometry.
const getCoordinatesForCircle = (
  point: GeoJSON.Position,
  radius: number,
): GeoJSON.Position[] => {
  const top = destination(point, radius, 0);
  const right = destination(point, radius, 90);
  const bottom = destination(point, radius, 180);
  const left = destination(point, radius, 270);
  return [top, right, bottom, left];
};

/**
 * Computes the bounding box for longitude and latitude only.
 *
 * @param geoJSON - A GeoJSON object.
 * @returns - The bounding box as [west, south, east, north].
 */
export const bbox = (geoJSON: GeoJSON.GeoJSON): GeoJSON.BBox => {
  // TODO?: Fix special cases for bbox including
  // north or south pole.
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLon = Infinity;
  let maxLon = -Infinity;
  let maxLonNeg = -Infinity;
  let minLonPos = Infinity;
  const doCoord = (coord: GeoJSON.Position) => {
    minLat = Math.min(minLat, coord[1]);
    maxLat = Math.max(maxLat, coord[1]);
    minLon = Math.min(minLon, coord[0]);
    maxLon = Math.max(maxLon, coord[0]);
    if (coord[0] < 0) {
      maxLonNeg = Math.max(maxLonNeg, coord[0]);
    } else {
      minLonPos = Math.min(minLonPos, coord[0]);
    }
  };
  geomEach(geoJSON, (g: GeoJSON.Geometry, fi: number) => {
    let radius = 0;
    let circle = false;
    if (geoJSON.type === 'Feature') {
      let props = geoJSON.properties;
      if (props && props._radius > 0) {
        circle = true;
        radius = props._radius;
      }
    } else if (geoJSON.type === 'FeatureCollection') {
      let props = geoJSON.features[fi].properties;
      if (props && props._radius > 0) {
        circle = true;
        radius = props._radius;
      }
    }
    switch (g.type) {
      case 'Point':
        if (circle) {
          getCoordinatesForCircle(g.coordinates, radius).forEach(coord => {
            doCoord(coord);
          });
        } else {
          doCoord(g.coordinates);
        }
        break;
      case 'MultiPoint':
        if (circle) {
          for (let i = 0; i < g.coordinates.length; i++) {
            getCoordinatesForCircle(g.coordinates[i], radius).forEach(coord => {
              doCoord(coord);
            });
          }
        } else {
          for (let i = 0; i < g.coordinates.length; i++) {
            doCoord(g.coordinates[i]);
          }
        }
        break;
      case 'LineString':
        for (let i = 0; i < g.coordinates.length; i++) {
          doCoord(g.coordinates[i]);
        }
        break;
      case 'MultiLineString':
      case 'Polygon':
        for (let i = 0; i < g.coordinates.length; i++) {
          for (let j = 0; j < g.coordinates[i].length; j++) {
            doCoord(g.coordinates[i][j]);
          }
        }
        break;
      case 'MultiPolygon':
        for (let i = 0; i < g.coordinates.length; i++) {
          for (let j = 0; j < g.coordinates[i].length; j++) {
            for (let k = 0; k < g.coordinates[i][j].length; k++) {
              doCoord(g.coordinates[i][j][k]);
            }
          }
        }
        break;
      default:
        break;
    }
  });

  if (minLon < 0 && maxLon > 0) {
    const lonSpan1 = maxLon - minLon;
    const lonSpan2 = 360 - minLonPos + maxLonNeg;
    if (lonSpan1 < lonSpan2) {
      return [minLon, minLat, maxLon, maxLat];
    }
    return [minLonPos, minLat, maxLonNeg, maxLat];
  }
  return [minLon, minLat, maxLon, maxLat];
};

/**
 * Checks if point is in bbox.
 *
 * @param point - Point coordinates.
 * @param bbox - Bounding box.
 * @returns - Returns true if point is in bbox, otherwise false.
 */
export const pointInBbox = (
  point: GeoJSON.Position,
  bbox: GeoJSON.BBox,
): boolean => {
  if (bbox.length !== 4) {
    throw new Error('The bounding box must be of length 4.');
  }
  if (point.length !== 2) {
    throw new Error('The point must be [longitude, latitude].');
  }
  if (bbox[2] < bbox[0]) {
    // Over antimeridian.
    if (point[0] >= bbox[0] || point[0] <= bbox[2]) {
      if (point[1] <= bbox[3] && point[1] >= bbox[1]) {
        return true;
      }
    }
    return false;
  }
  return (
    bbox[0] <= point[0] &&
    bbox[1] <= point[1] &&
    bbox[2] >= point[0] &&
    bbox[3] >= point[1]
  );
};

// TODO: Check this one. What about antimeridian boxes?
/**
 * Checks if two bounding boxes overlap.
 *
 * @param bbox1 - The first bounding box.
 * @param bbox2 - The second bounding box.
 * @returns - Returns true if the bboxes overlap, otherwise false.
 */
export const bboxInBbox = (
  bbox1: GeoJSON.BBox,
  bbox2: GeoJSON.BBox,
): boolean => {
  if (bbox1.length !== 4) {
    throw new Error('The bounding box bbox1 must be of length 4.');
  }
  if (bbox2.length !== 4) {
    throw new Error('The bounding box bbox2 must be of length 4.');
  }
  return (
    bbox1[0] < bbox2[2] &&
    bbox2[0] < bbox1[2] &&
    bbox1[1] < bbox2[3] &&
    bbox2[1] < bbox1[3]
  );
};

/**
 * Adds bounding boxes to all Features in the GeoJSON
 * and to FeatureCollection.
 * Note: The added bbox is of length 4, i.e. [west, south, east, north].
 *
 * @param geoJSON - The GeoJSON to add bboxes in.
 * @returns - The new GeoJSON
 */
export const addBboxes = <
  T extends GeoJSON.Feature | GeoJSON.FeatureCollection,
>(
  geoJSON: T,
): T => {
  const g = copy(geoJSON);
  switch (g.type) {
    case 'Feature':
      g.bbox = bbox(g);
      break;
    case 'FeatureCollection':
      g.features.forEach(feature => {
        feature.bbox = bbox(feature);
      });
      g.bbox = bbox(g);
      break;
    default:
      throw new Error('Argument must be Feature or FeatureCollection');
  }
  return g as T;
};
