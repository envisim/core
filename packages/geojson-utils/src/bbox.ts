import {copy} from './copy.js';
import {destination} from './destination.js';
import {geomEach} from './geomEach.js';
import type * as GJ from './geojson/types.js';

// Internal function to treat non-standard circle geometry.
export const getPositionsForCircle = (
  point: GJ.Position,
  radius: number,
): GJ.Position[] => {
  const top = destination(point, radius, 0);
  const right = destination(point, radius, 90);
  const bottom = destination(point, radius, 180);
  const left = destination(point, radius, 270);
  return [top, right, bottom, left];
};

/*
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
          getPositionsForCircle(g.coordinates, radius).forEach((coord) => {
            doCoord(coord);
          });
        } else {
          doCoord(g.coordinates);
        }
        break;
      case 'MultiPoint':
        if (circle) {
          for (let i = 0; i < g.coordinates.length; i++) {
            getPositionsForCircle(g.coordinates[i], radius).forEach((coord) => {
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
};*/

/**
 * Checks if point is in bbox.
 *
 * @param point - Point coordinates.
 * @param bbox - Bounding box.
 * @returns - Returns true if point is in bbox, otherwise false.
 */
export const pointInBbox = (point: GJ.Position, bbox: GJ.BBox): boolean => {
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
export const bboxInBbox = (bbox1: GJ.BBox, bbox2: GJ.BBox): boolean => {
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

/*
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
      g.features.forEach((feature) => {
        feature.bbox = bbox(feature);
      });
      g.bbox = bbox(g);
      break;
    default:
      throw new Error('Argument must be Feature or FeatureCollection');
  }
  return g as T;
};*/

export const bboxFromArrayOfPositions = (coords: GJ.Position[]): GJ.BBox => {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let maxLonNeg = -Infinity;
  let minLonPos = Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let maxHeight = -Infinity;
  let minHeight = Infinity;
  const n = coords.length;
  let boxLength = 4;

  for (let i = 0; i < n; i++) {
    const lon = coords[i][0];
    const lat = coords[i][1];
    // As height may be undefined.
    // Existance of any third coordinate gives box of length 6.
    if (typeof coords[i][2] === 'number') {
      boxLength = 6;
    }
    const height = coords[i][2] || 0;
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    if (boxLength == 6) {
      minHeight = Math.min(minHeight, height);
      maxHeight = Math.max(maxHeight, height);
    }
    if (lon < 0) {
      maxLonNeg = Math.max(maxLonNeg, lon);
    } else {
      minLonPos = Math.min(minLonPos, lon);
    }
  }

  // Pole box?
  if (minLon === -180 && maxLon === 180) {
    // Choose smallest cap
    if (-minLat < maxLat) {
      // box including north pole is smallest
      maxLat = 90;
    } else {
      // box including south pole is smallest
      minLat = -90;
    }
  } else {
    // Meridian or antimeridian box?
    if (minLon < 0 && maxLon > 0) {
      if (maxLon - minLon > 360 - minLonPos + maxLonNeg) {
        minLon = minLonPos;
        maxLon = maxLonNeg;
      }
    }
  }
  if (boxLength === 4) {
    return [minLon, minLat, maxLon, maxLat];
  } else {
    return [minLon, minLat, minHeight, maxLon, maxLat, maxHeight];
  }
};

export const bboxFromArrayOfBBoxes = (bboxes: GJ.BBox[]): GJ.BBox => {
  // build coordinates array
  // is more points needed to avoid wrong split in meridian/antimeridian
  // in extreme cases? Maybe need to add center points as well?
  let coords: GJ.Position[] = [];
  bboxes.forEach((box) => {
    if (box.length === 4) {
      coords = coords.concat([
        [box[0], box[1]],
        [box[2], box[1]],
        [box[2], box[3]],
        [box[0], box[3]],
      ]);
    } else {
      coords = coords.concat([
        [box[0], box[1], box[2]],
        [box[3], box[1], box[2]],
        [box[3], box[4], box[5]],
        [box[0], box[4], box[5]],
      ]);
    }
  });
  return bboxFromArrayOfPositions(coords);
};

export const bbox4 = (bbox: GJ.BBox): [number, number, number, number] => {
  if (bbox.length === 6) {
    return [bbox[0], bbox[1], bbox[3], bbox[4]];
  }
  return [...bbox];
};
