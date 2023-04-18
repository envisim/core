import {destinationPoint} from './distance.js';

// Internal function to treat non-standard circle geometry.
const getCoordinatesForCircle = (
  point: GeoJSON.Position,
  radius: number,
): GeoJSON.Position[] => {
  const top = destinationPoint(point, radius, 0);
  const right = destinationPoint(point, radius, 90);
  const bottom = destinationPoint(point, radius, 180);
  const left = destinationPoint(point, radius, 270);
  return [top, right, bottom, left];
};

// Internal function to get all coordinates as an array.
const getCoordinatesArray = (
  geoJSON: GeoJSON.GeoJSON,
  opts = {_radius: 0},
): GeoJSON.Position[] => {
  let coords: GeoJSON.Position[] = [];
  switch (geoJSON.type) {
    case 'Point':
      if (opts._radius > 0) {
        coords = getCoordinatesForCircle(geoJSON.coordinates, opts._radius);
      } else {
        coords = [geoJSON.coordinates];
      }
      break;
    case 'MultiPoint':
      if (opts._radius > 0) {
        coords = geoJSON.coordinates.reduce(
          (arr: GeoJSON.Position[], part) =>
            arr.concat(getCoordinatesForCircle(part, opts._radius)),
          [],
        );
      } else {
        coords = geoJSON.coordinates;
      }
      break;
    case 'LineString':
      coords = geoJSON.coordinates;
      break;
    case 'MultiLineString':
    case 'Polygon':
      coords = geoJSON.coordinates.reduce(
        (arr: GeoJSON.Position[], part) => arr.concat(part),
        [],
      );
      break;
    case 'MultiPolygon':
      coords = geoJSON.coordinates.reduce(
        (arr: GeoJSON.Position[], polygon) => {
          return arr.concat(
            polygon.reduce((points, part) => {
              return points.concat(part);
            }, []),
          );
        },
        [],
      );
      break;
    case 'Feature':
      if (geoJSON.properties?._radius) {
        coords = getCoordinatesArray(geoJSON.geometry, {
          _radius: geoJSON.properties._radius,
        });
      } else {
        coords = getCoordinatesArray(geoJSON.geometry);
      }
      break;
    case 'GeometryCollection':
      coords = geoJSON.geometries.reduce(
        (arr: GeoJSON.Position[], geometry) => {
          return arr.concat(getCoordinatesArray(geometry, opts));
        },
        [],
      );
      break;
    case 'FeatureCollection':
      coords = geoJSON.features.reduce((arr: GeoJSON.Position[], feature) => {
        return arr.concat(getCoordinatesArray(feature));
      }, []);
      break;
    default:
      throw new Error('bbox: Unknown GeoJSON type.');
  }
  return coords;
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
  let minLng = Infinity;
  let maxLng = -Infinity;
  let maxLngNeg = -Infinity;
  let minLngPos = Infinity;
  const coords = getCoordinatesArray(geoJSON);

  coords.forEach((coord) => {
    minLat = Math.min(minLat, coord[1]);
    maxLat = Math.max(maxLat, coord[1]);
    minLng = Math.min(minLng, coord[0]);
    maxLng = Math.max(maxLng, coord[0]);
    if (coord[0] < 0) {
      maxLngNeg = Math.max(maxLngNeg, coord[0]);
    } else {
      minLngPos = Math.min(minLngPos, coord[0]);
    }
  });
  if (minLng < 0 && maxLng > 0) {
    const lngSpan1 = maxLng - minLng;
    const lngSpan2 = 360 - minLngPos + maxLngNeg;
    if (lngSpan1 < lngSpan2) {
      return [minLng, minLat, maxLng, maxLat];
    }
    return [minLngPos, minLat, maxLngNeg, maxLat];
  }
  return [minLng, minLat, maxLng, maxLat];
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
    throw new Error('pointInBbox: The bounding box must be of length 4.');
  }
  if (point.length !== 2) {
    throw new Error('pointInBbox: The point must be [longitude, latitude].');
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
    throw new Error('bboxInBbox: The bounding box bbox1 must be of length 4.');
  }
  if (bbox2.length !== 4) {
    throw new Error('bboxInBbox: The bounding box bbox2 must be of length 4.');
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
 */
export const addBboxes = (geoJSON: GeoJSON.GeoJSON): void => {
  switch (geoJSON.type) {
    case 'Feature':
      geoJSON.bbox = bbox(geoJSON);
      break;
    case 'FeatureCollection':
      geoJSON.features.forEach((feature) => {
        feature.bbox = bbox(feature);
      });
      geoJSON.bbox = bbox(geoJSON);
      break;
    default:
      throw new Error(
        'addBboxes: bboxes can only be added to Feature and FeatureCollection',
      );
  }
};
