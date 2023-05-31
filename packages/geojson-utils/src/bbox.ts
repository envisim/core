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

enum BBoxEnum {
  alon,
  alat,
  az,
  blon,
  blat,
  bz,
}

function getBBoxValue(bbox: GJ.BBox, e: BBoxEnum): number {
  switch (e) {
    case BBoxEnum.alon:
      return bbox[0];
    case BBoxEnum.alat:
      return bbox[1];
    case BBoxEnum.blon:
      return bbox.length === 4 ? bbox[2] : bbox[3];
    case BBoxEnum.blat:
      return bbox.length === 4 ? bbox[3] : bbox[4];
    case BBoxEnum.az:
      return bbox.length === 4 ? Infinity : bbox[2];
    case BBoxEnum.bz:
      return bbox.length === 4 ? -Infinity : bbox[5];
  }
}

/**
 * @param positions - an array of positions
 * @returns the bounding box around the array of positions
 * @throws Error when positions.length === 0
 */
export function bboxFromPositions(positions: GJ.Position[]): GJ.BBox {
  if (positions.length === 0) throw new Error('positions must not be empty');
  if (positions.length === 1) {
    return [...positions[0], ...positions[0]] as GJ.BBox;
  }

  const box: GJ.BBox = positions.every((a) => a.length === 2)
    ? [Infinity, Infinity, -Infinity, -Infinity]
    : [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];

  if (box.length === 4) {
    for (let i = 0; i < positions.length; i++) {
      box[1] = Math.min(positions[i][1], box[1]);
      box[3] = Math.max(positions[i][1], box[3]);
    }
  } else {
    for (let i = 0; i < positions.length; i++) {
      box[1] = Math.min(positions[i][1], box[1]);
      box[4] = Math.max(positions[i][1], box[4]);

      if (positions[i].length === 3) {
        box[2] = Math.min(positions[i][2] as number, box[2]);
        box[5] = Math.max(positions[i][2] as number, box[5]);
      }
    }
  }

  const sorted = positions.map((p) => p[0]).sort((a, b) => a - b);

  let distance = longitudeDistance(sorted[sorted.length - 1], sorted[0]);
  let distanceIndex = 0;
  for (let i = 1; i < positions.length; i++) {
    const dist = longitudeDistance(sorted[i - 1], sorted[i]);

    if (dist > distance) {
      distance = dist;
      distanceIndex = i;
    }
  }

  box[0] = sorted[distanceIndex];
  box[box.length === 4 ? 2 : 3] =
    sorted[distanceIndex === 0 ? sorted.length - 1 : distanceIndex - 1];

  return box;
}

/**
 * @param bboxes - an array of bboxes
 * @returns the bounding box around the array of bboxes
 * @throws Error when bboxes.length === 0
 */
export function unionOfBBoxes(bboxes: GJ.BBox[]): GJ.BBox {
  if (bboxes.length === 0) throw new Error('bboxes must not be empty');

  bboxes.sort((a, b) => a[0] - b[0]);
  const box: GJ.BBox = bboxes.every((a) => a.length === 4)
    ? [Infinity, Infinity, -Infinity, -Infinity]
    : [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];

  if (box.length === 4) {
    for (let i = 0; i < bboxes.length; i++) {
      box[1] = Math.min(bboxes[i][1], box[1]);
      box[3] = Math.max(bboxes[i][3], box[3]);
    }
  } else {
    for (let i = 0; i < bboxes.length; i++) {
      box[1] = Math.min(bboxes[i][1], box[1]);
      box[2] = Math.min(getBBoxValue(bboxes[i], BBoxEnum.az), box[2]);
      box[4] = Math.max(getBBoxValue(bboxes[i], BBoxEnum.blat), box[4]);
      box[5] = Math.max(getBBoxValue(bboxes[i], BBoxEnum.bz), box[5]);
    }
  }

  const merged: [number, number][] = [];
  for (let i = 0; i < bboxes.length; ) {
    const candidate: [number, number] = [
      bboxes[i][0],
      getBBoxValue(bboxes[i], BBoxEnum.blon),
    ];

    // Check if the current candidate holds any other candidate
    let j = i + 1;
    for (; j < bboxes.length; j++) {
      if (!checkLongitudeInRange(bboxes[j][0], candidate[0], candidate[1]))
        break;

      // We shouldn't update candidate's endpoint if both j-points are in the range
      const blon = getBBoxValue(bboxes[j], BBoxEnum.blon);
      if (!checkLongitudeInRange(blon, candidate[0], candidate[1]))
        candidate[1] = getBBoxValue(bboxes[j], BBoxEnum.blon);
    }

    merged.push(candidate);
    i = j;
  }

  if (merged.length === 1) {
    box[0] = merged[0][0];
    box[box.length === 4 ? 2 : 3] = merged[0][1];
    return box;
  }

  // Check all distances, and select the largest distance
  let distance = longitudeDistance(merged[merged.length - 1][1], merged[0][0]);
  let distanceIndex = 0;
  for (let i = 1; i < merged.length; i++) {
    const dist = longitudeDistance(merged[i - 1][1], merged[i][0]);

    if (dist > distance) {
      distance = dist;
      distanceIndex = i;
    }
  }

  box[0] = merged[distanceIndex][0];
  box[box.length === 4 ? 2 : 3] =
    merged[distanceIndex === 0 ? merged.length - 1 : distanceIndex - 1][1];

  return box;
}

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
