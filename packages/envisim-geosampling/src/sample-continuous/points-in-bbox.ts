import { BoundingBox, longitudeDistance, normalizeLongitude } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random } from "@envisim/random";
import {
  type OptionsBase,
  type SampleError,
  optionsBaseCheck,
  throwRangeError,
} from "./options.js";

const TO_RAD = Math.PI / 180.0;
const TO_DEG = 180.0 / Math.PI;

/**
 * @interface
 */
export type SamplePositionsInBbox = OptionsBase;

export function samplePositionsInBboxCheck(options: SamplePositionsInBbox): SampleError {
  return optionsBaseCheck(options);
}

/**
 * Generates uniform random positions in bounding box
 * @param box A GeoJSON bounding box.
 * @returns Array of GeoJSON positions.
 */
export function samplePositionsInBbox(box: GJ.BBox, options: SamplePositionsInBbox): GJ.Position[] {
  throwRangeError(samplePositionsInBboxCheck(options));
  const { rand = new Random(), sampleSize } = options;

  const bbox = BoundingBox.removeAltitude(box);
  const y1 = (Math.cos((90 - bbox[1]) * TO_RAD) + 1) / 2;
  const y2 = (Math.cos((90 - bbox[3]) * TO_RAD) + 1) / 2;
  const lonDist = longitudeDistance(bbox[0], bbox[2]);
  const positions: GJ.Position[] = [];

  for (let i = 0; i < sampleSize; i++) {
    // Generate the point
    const yRand = y1 + (y2 - y1) * rand.random();
    const lat = 90 - Math.acos(2 * yRand - 1) * TO_DEG;
    const lon = normalizeLongitude(bbox[0] + lonDist * rand.random());
    positions.push([lon, lat]);
  }

  if (box.length === 6) {
    for (let i = 0; i < sampleSize; i++) {
      const alt = box[2] + (box[5] - box[2]) * rand.random();
      positions[i].push(alt);
    }
  }

  return positions;
}
