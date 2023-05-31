import type * as GJ from './geojson/types.js';
import {destination} from './destination.js';
import {checkLongitudeInRange, longitudeDistance} from './position.js';

/**
 * Computes posisions needed to find bounding box of a PointCircle.
 * @param point - A position.
 * @param radius - The radius in meters.
 * @returns - An array with four positions [top,right,bottom,left].
 */
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

/**
 * Checks if position is in bbox.
 *
 * @param point - Point coordinates.
 * @param bbox - Bounding box.
 * @returns - Returns true if point is in bbox, otherwise false.
 */
export const pointInBBox = (point: GJ.Position, bbox: GJ.BBox): boolean => {
  const [minLon, minLat, minAlt, maxLon, maxLat, maxAlt] =
    bbox.length == 6 ? bbox : [bbox[0], bbox[1], 0, bbox[2], bbox[3], 0];
  const p = point.length == 3 ? point : [...point, 0];

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

/**
 * Computes the bounding box from an array of positions
 * @param coords - GeoJSON.Position[]
 * @returns - The bounding box
 */
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

  if (minLon < 0 && maxLon > 0) {
    if (maxLon - minLon > 360 - minLonPos + maxLonNeg) {
      minLon = minLonPos;
      maxLon = maxLonNeg;
    }
  }

  if (boxLength === 4) {
    return [minLon, minLat, maxLon, maxLat];
  }

  return [minLon, minLat, minAlt, maxLon, maxLat, maxAlt];
};

export function unionOfBBoxesInPlace(
  org: GJ.BBox,
  box: GJ.BBox,
  init: boolean = false,
): void {
  if (init === true) {
    org.splice(0, 6, ...box);
    return;
  }

  // Add z if needed
  if (org.length === 4 && box.length === 6) {
    // org 4, box 6
    org.splice(2, 0, box[2]);
    org.push(box[5]);
  }

  // Store positions of longitudes
  const xA = 0;
  const xB = org.length === 6 ? 3 : 2;
  const xC = 0;
  const xD = box.length === 6 ? 3 : 2;

  // Update latitudes and z
  if (org.length === 4 && box.length === 4) {
    org[1] = Math.min(org[1], box[1]);
    org[3] = Math.max(org[3], box[3]);
  } else if (org.length === 6 && box.length === 6) {
    org[1] = Math.min(org[1], box[1]);
    org[2] = Math.min(org[2], box[2]);
    org[4] = Math.max(org[4], box[4]);
    org[5] = Math.max(org[5], box[5]);
  } else if (org.length === 6 && box.length === 4) {
    org[1] = Math.min(org[1], box[1]);
    org[4] = Math.max(org[4], box[3]);
  } else {
    throw new Error('unexpected bbox');
  }

  /*
    (a, b)
       (c, d)

    Cases:
    - c & d in [a,b] => [a, b]
    - c in [a, b] => [a, d]
    - d in [a, b] => [c, b]
    - a & b in [c,d] => [c, d]
    - otherwise choose smalles of [a, d] and [c, b]
  */

  const boxCinAB = checkLongitudeInRange(box[xC], org[xA], org[xB]);
  const boxDinAB = checkLongitudeInRange(box[xD], org[xA], org[xB]);

  if (boxCinAB && boxDinAB) {
    // DO NOTHING
  } else if (boxCinAB) {
    org[xB] = box[xD];
  } else if (boxDinAB) {
    org[xA] = box[xC];
  } else if (
    checkLongitudeInRange(org[xA], box[xC], box[xD]) &&
    checkLongitudeInRange(org[xB], box[xC], box[xD])
  ) {
    org[xA] = box[xC];
    org[xB] = box[xD];
  } else {
    if (
      longitudeDistance(org[xA], box[xD]) <= longitudeDistance(box[xC], org[xA])
    ) {
      org[xB] = box[xD];
    } else {
      org[xA] = box[xC];
    }
  }

  return;
}

/**
 * Computes the overall bounding box from an array of bounding boxes.
 * @param bboxes - An array of type GeoJSON.BBox[].
 * @returns - The bounding box.
 */
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

/**
 * Converts a bounding box of possible length 6 to a bounding box of length 4.
 * @param bbox - A bounding box.
 * @returns - A bounding box of length 4.
 */
export const bbox4 = (bbox: GJ.BBox): [number, number, number, number] => {
  if (bbox.length === 6) {
    return [bbox[0], bbox[1], bbox[3], bbox[4]];
  }

  return [...bbox];
};
