import {destination} from './destination.js';
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
 * Checks if position is in bbox.
 *
 * @param position - Point coordinates.
 * @param bbox - Bounding box.
 * @returns - Returns true if point is in bbox, otherwise false.
 */
export const positionInBBox = (
  position: GJ.Position,
  bbox: GJ.BBox,
): boolean => {
  const [minLon, minLat, minAlt, maxLon, maxLat, maxAlt] =
    bbox.length == 6 ? bbox : [bbox[0], bbox[1], 0, bbox[2], bbox[3], 0];
  const p = position.length == 3 ? position : [...position, 0];

  // Check if antimeridian bbox
  if (maxLon < minLon) {
    // Over antimeridian
    if (p[0] >= minLon || p[0] <= maxLon) {
      return (
        minLat <= p[1] && maxLat >= p[1] && minAlt <= p[2] && maxAlt >= p[2]
      );
    }
    return false;
  }
  // Regular bbox
  return (
    minLon <= p[0] &&
    maxLon >= p[0] &&
    minLat <= p[1] &&
    maxLat >= p[1] &&
    minAlt <= p[2] &&
    maxAlt >= p[2]
  );
};

// TODO: Test this one. Should we use < and > or <= and >= ?
/**
 * Checks if two bounding boxes overlap.
 *
 * @param bbox1 - The first bounding box.
 * @param bbox2 - The second bounding box.
 * @returns - Returns true if the bboxes overlap, otherwise false.
 */
export const bboxInBBox = (bbox1: GJ.BBox, bbox2: GJ.BBox): boolean => {
  const [minLon1, minLat1, minAlt1, maxLon1, maxLat1, maxAlt1] =
    bbox1.length == 6 ? bbox1 : [bbox1[0], bbox1[1], 0, bbox1[2], bbox1[3], 0];
  const [minLon2, minLat2, minAlt2, maxLon2, maxLat2, maxAlt2] =
    bbox2.length == 6 ? bbox2 : [bbox2[0], bbox2[1], 0, bbox2[2], bbox2[3], 0];

  const latCond = minLat1 < maxLat2 && minLat2 < maxLat1;
  // Allow for all zeros here
  const altCond = minAlt1 <= maxAlt2 && minAlt2 <= maxAlt1;

  // Longitude is the odd one
  if (maxLon1 < minLon1) {
    if (maxLon2 < minLon2) {
      // Both cover antimeridian
      return latCond && altCond;
    } else {
      return latCond && altCond && (maxLon2 > minLon1 || minLon2 < maxLon1);
    }
  }
  if (maxLon2 < minLon2) {
    // Only 2 cover antimeridian
    return latCond && altCond && (maxLon1 > minLon2 || minLon1 < maxLon2);
  }
  // Regular boxes
  return latCond && altCond && minLon1 < maxLon2 && minLon2 < maxLon1;
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
  let minLon = 180;
  let maxLon = -180;
  let maxLonNeg = -180;
  let minLonPos = 180;
  let minLat = 90;
  let maxLat = -90;
  let maxAlt = -Infinity;
  let minAlt = Infinity;
  const n = coords.length;
  let boxLength = 4;

  for (let i = 0; i < n; i++) {
    const lon = coords[i][0];
    const lat = coords[i][1];
    // As height may be undefined.
    const height = coords[i][2] ?? 0;
    // Existance of any third coordinate gives box of length 6.
    if (typeof coords[i][2] === 'number') {
      boxLength = 6;
    }
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    if (boxLength == 6) {
      minAlt = Math.min(minAlt, height);
      maxAlt = Math.max(maxAlt, height);
    }
    if (lon < 0) {
      maxLonNeg = Math.max(maxLonNeg, lon);
    } else {
      minLonPos = Math.min(minLonPos, lon);
    }
  }

  // Pole box? How to check?
  /*if (minLon === -180 && maxLon === 180) {
    // Choose smallest cap
    if (-minLat < maxLat) {
      // box including north pole is smallest
      maxLat = 90;
    } else {
      // box including south pole is smallest
      minLat = -90;
    }
  } else {*/
  // Meridian or antimeridian box?
  if (minLon < 0 && maxLon > 0) {
    if (maxLon - minLon > 360 - minLonPos + maxLonNeg) {
      minLon = minLonPos;
      maxLon = maxLonNeg;
    }
  }
  //}
  if (boxLength === 4) {
    return [minLon, minLat, maxLon, maxLat];
  }
  return [minLon, minLat, minAlt, maxLon, maxLat, maxAlt];
};

export const bboxFromArrayOfBBoxes = (bboxes: GJ.BBox[]): GJ.BBox => {
  let minLon = 180;
  let maxLon = -180;
  let maxLonNeg = -180;
  let minLonPos = 180;
  let minLat = 90;
  let maxLat = -90;
  let maxAlt = -Infinity;
  let minAlt = Infinity;
  let boxLength = 4;

  let antimeridian = false;

  bboxes.forEach((box) => {
    if (box.length === 4) {
      minLat = Math.min(minLat, box[1]);
      maxLat = Math.max(maxLat, box[3]);
      minLon = Math.min(minLon, box[0]);
      maxLon = Math.max(maxLon, box[2]);
      if (box[0] > box[2]) {
        antimeridian = true;
      }
      if (box[0] > 0) {
        minLonPos = Math.min(minLonPos, box[0]);
      }
      if (box[2] < 0) {
        maxLonNeg = Math.max(maxLonNeg, box[2]);
      }
    } else {
      boxLength = 6;
      minLat = Math.min(minLat, box[1]);
      maxLat = Math.max(maxLat, box[4]);
      minAlt = Math.min(minAlt, box[2]);
      maxAlt = Math.max(maxAlt, box[5]);
      minLon = Math.min(minLon, box[0]);
      maxLon = Math.max(maxLon, box[3]);
      if (box[0] > box[3]) {
        antimeridian = true;
      }
      if (box[0] > 0) {
        minLonPos = Math.min(minLonPos, box[0]);
      }
      if (box[3] < 0) {
        maxLonNeg = Math.max(maxLonNeg, box[3]);
      }
    }
  });
  if (antimeridian) {
    minLon = minLonPos;
    maxLon = maxLonNeg;
    return boxLength === 4
      ? [minLon, minLat, maxLon, maxLat]
      : [minLon, minLat, minAlt, maxLon, maxLat, maxAlt];
  }
  if (minLon < 0 && maxLon > 0) {
    // Even if no individual box cover antimeridian, the overall box with the shortest width migth
    // be an antimeridian box.
    if (maxLon - minLon > 360 - minLonPos + maxLonNeg) {
      minLon = minLonPos;
      maxLon = maxLonNeg;
    }
  }
  return boxLength === 4
    ? [minLon, minLat, maxLon, maxLat]
    : [minLon, minLat, minAlt, maxLon, maxLat, maxAlt];
};

export const bbox4 = (bbox: GJ.BBox): [number, number, number, number] => {
  if (bbox.length === 6) {
    return [bbox[0], bbox[1], bbox[3], bbox[4]];
  }
  return [...bbox];
};
