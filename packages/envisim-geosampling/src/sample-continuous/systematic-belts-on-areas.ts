import { type AreaObject, FeatureCollection, toAreaObject } from "@envisim/geojson";
import { BoundingBox, cutAreaGeometry } from "@envisim/geojson-utils";
import { destination, distance } from "@envisim/geojson-utils/geodesic";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random, type RandomGenerator } from "@envisim/random";
import "@envisim/utils";
import { intersectAreaSampleAreaFrame } from "../utils/index.js";
import {
  type OptionsCircleConversion,
  type OptionsParallelLines,
  SAMPLE_ERROR_LIST,
  type SampleError,
  optionsCircleConversionCheck,
  optionsParallelLinesCheck,
  throwRangeError,
} from "./options.js";

export interface SampleSystematicBeltsOnAreas
  extends OptionsCircleConversion,
    OptionsParallelLines {
  rand?: RandomGenerator;
  /**
   * The half-width of the belt.
   */
  halfWidth: number;
}

export function sampleSystematicBeltsOnAreasCheck(
  options: SampleSystematicBeltsOnAreas,
): SampleError {
  if (options.halfWidth <= 0.0) {
    return SAMPLE_ERROR_LIST.HALF_WIDTH_NOT_POSITIVE;
  }

  return optionsCircleConversionCheck(options) || optionsParallelLinesCheck(options);
}

/**
 * Selects a systematic sample of belts on areas.
 *
 * @param collection -
 * @param options -
 */
export function sampleSystematicBeltsOnAreas(
  collection: FeatureCollection<AreaObject>,
  options: SampleSystematicBeltsOnAreas,
): FeatureCollection<AreaObject> {
  throwRangeError(sampleSystematicBeltsOnAreasCheck(options));

  const { rand = new Random(), interspace, rotation = 0.0, halfWidth } = options;

  const box = BoundingBox.removeAltitude(collection.getBBox());
  const center = BoundingBox.center(box);
  const bottomLeft: GJ.Position = [box[0], box[1]];
  const topRight: GJ.Position = [box[2], box[3]];
  const radius = Math.max(distance(center, bottomLeft), distance(center, topRight));

  const numPointsPerLine = 20;
  const numLines = Math.ceil((2.0 * radius) / interspace);
  const randomStart = rand.random() * interspace;

  const rings: GJ.Position[][] = [];
  for (let i = 0; i < numLines; i++) {
    // Left and right horizontal positon of vertical belt (before rotation)
    const x1 = -radius + i * interspace + randomStart - halfWidth;
    const x2 = x1 + 2 * halfWidth;

    const thisRing: GJ.Position[] = [];
    // First side of belt (counterclockwise).
    for (let j = 0; j < numPointsPerLine; j++) {
      // vertical position (before rotation)
      const y = -radius + (2 * radius * j) / (numPointsPerLine - 1);
      // rotate and and convert to lon lat
      thisRing.push(placePoint([x2, y], center, rotation));
    }
    // Reverse direction on other side.
    for (let j = numPointsPerLine - 1; j >= 0; j--) {
      const y = -radius + (2 * radius * j) / (numPointsPerLine - 1);
      thisRing.push(placePoint([x1, y], center, rotation));
    }
    // Close the polygon by adding first coordinate at the end.
    thisRing.push([...thisRing[0]]);
    rings.push(thisRing);
  }

  const sc = FeatureCollection.newArea([]);

  for (const coords of rings) {
    const geom = toAreaObject(cutAreaGeometry({ type: "Polygon", coordinates: [coords] }));
    if (geom === null) continue;
    sc.addGeometry(geom, { _designWeight: interspace / (halfWidth * 2.0) }, true);
  }

  return intersectAreaSampleAreaFrame(sc, collection, options);
}

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return destination(position, dist, angle);
}
