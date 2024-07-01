import {
  type GeoJSON as GJ,
  bbox4,
  longitudeDistance,
  normalizeLongitude,
} from '@envisim/geojson-utils';
import {Random} from '@envisim/random';

const TO_RAD = Math.PI / 180.0;
const TO_DEG = 180.0 / Math.PI;

/**
 * Generates uniform random positions in bounding box
 * @param box A GeoJSON bounding box.
 * @param n Positive integer sample size.
 * @param opts Options.
 * @param opts.rand Optional instance of Random.
 * @returns Array of GeoJSON positions.
 */
export function uniformPositionsInBBox(
  box: GJ.BBox,
  n: number,
  {rand = new Random()},
): GJ.Position[] {
  const bbox = bbox4(box);
  const y1 = (Math.cos((90 - bbox[1]) * TO_RAD) + 1) / 2;
  const y2 = (Math.cos((90 - bbox[3]) * TO_RAD) + 1) / 2;
  const lonDist = longitudeDistance(bbox[0], bbox[2]);
  const positions: GJ.Position[] = [];

  if (n < 0) {
    throw new RangeError('n must be non-negative');
  }

  for (let i = 0; i < n; i++) {
    // Generate the point
    const yRand = y1 + (y2 - y1) * rand.float();
    const lat = 90 - Math.acos(2 * yRand - 1) * TO_DEG;
    const lon = normalizeLongitude(bbox[0] + lonDist * rand.float());
    positions.push([lon, lat]);
  }

  if (box.length === 6) {
    for (let i = 0; i < n; i++) {
      const alt = box[2] + (box[5] - box[2]) * rand.float();
      positions[i].push(alt);
    }
  }

  return positions;
}
