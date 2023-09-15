import type * as GJ from '../types/geojson.js';
import {destination} from './destination.js';
import {
  checkInRange,
  checkLongitudeInRange,
  longitudeDistance,
  longitudeCenter,
} from './position.js';

enum BBoxEnum {
  alon,
  alat,
  aalt,
  blon,
  blat,
  balt,
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
    case BBoxEnum.aalt:
      return bbox.length === 4 ? Infinity : bbox[2];
    case BBoxEnum.balt:
      return bbox.length === 4 ? -Infinity : bbox[5];
  }
}

/**
 * Computes posisions needed to find bounding box of a PointCircle.
 * @param point - A position.
 * @param radius - The radius in meters.
 * @returns - An array with four positions [top,right,bottom,left].
 */
export function getPositionsForCircle(
  point: GJ.Position,
  radius: number,
): GJ.Position[] {
  const top = destination(point, radius, 0);
  const right = destination(point, radius, 90);
  const bottom = destination(point, radius, 180);
  const left = destination(point, radius, 270);
  return [top, right, bottom, left];
}

/**
 * Checks if position is in bbox.
 * Considers the altitude only if both have it
 *
 * @param point - Point coordinates.
 * @param bbox - Bounding box.
 * @returns true if point is in bbox, otherwise false.
 */
export function pointInBBox(point: GJ.Position, bbox: GJ.BBox): boolean {
  return (
    // Check lon
    checkLongitudeInRange(
      point[0],
      bbox[0],
      getBBoxValue(bbox, BBoxEnum.blon),
    ) &&
    // Check lat
    checkInRange(point[1], bbox[1], getBBoxValue(bbox, BBoxEnum.blat)) &&
    // Check z, only if both have it, otherwise they are considered all-covering
    (point.length === 2 ||
      bbox.length === 4 ||
      checkInRange(point[2], bbox[2], bbox[5]))
  );
}

// TODO: Test this one. Should we use < and > or <= and >= ?
/**
 * Checks if two bounding boxes overlap.
 *
 * @param b1 - The first bounding box.
 * @param b2 - The second bounding box.
 * @returns - Returns true if the bboxes overlap, otherwise false.
 */
export function bboxInBBox(b1: GJ.BBox, b2: GJ.BBox): boolean {
  const b1lonb = getBBoxValue(b1, BBoxEnum.blon);
  const b2lonb = getBBoxValue(b2, BBoxEnum.blon);
  const b1latb = getBBoxValue(b1, BBoxEnum.blat);
  const b2latb = getBBoxValue(b2, BBoxEnum.blat);

  if (
    !(
      checkLongitudeInRange(b1[0], b2[0], b2lonb) ||
      checkLongitudeInRange(b1lonb, b2[0], b2lonb) ||
      checkLongitudeInRange(b2[0], b1[0], b1lonb)
    )
  ) {
    return false;
  }

  if (
    !(
      checkInRange(b1[1], b2[1], b2latb) ||
      checkInRange(b1latb, b2[1], b2latb) ||
      checkInRange(b2[1], b1[1], b1latb)
    )
  ) {
    return false;
  }

  if (b1.length === 4 || b2.length === 4) return true;

  if (
    !(
      checkInRange(b1[2], b2[2], b2[5]) ||
      checkInRange(b1[5], b2[2], b2[5]) ||
      checkInRange(b2[2], b1[2], b1[5])
    )
  ) {
    return false;
  }

  return true;
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
      box[2] = Math.min(getBBoxValue(bboxes[i], BBoxEnum.aalt), box[2]);
      box[4] = Math.max(getBBoxValue(bboxes[i], BBoxEnum.blat), box[4]);
      box[5] = Math.max(getBBoxValue(bboxes[i], BBoxEnum.balt), box[5]);
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
 * @param bbox - a bounding box.
 * @returns - a bounding box of length 4.
 */
export function bbox4(bbox: GJ.BBox): [number, number, number, number] {
  if (bbox.length === 6) {
    return [bbox[0], bbox[1], bbox[3], bbox[4]];
  }

  return [...bbox] as [number, number, number, number];
}

/**
 * Computes the center (in longitude and latitude only) of a bounding box
 * @param bbox - a bounding box
 * @returns - the center of the bounding box
 */
export function bboxCenter(bbox: GJ.BBox): GJ.Position {
  const box = bbox4(bbox);
  return [longitudeCenter(box[0], box[2]), (box[1] + box[3]) / 2];
}
