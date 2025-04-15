import {
  type AreaObject,
  FeatureCollection,
  type LineObject,
  toLineObject,
} from "@envisim/geojson";
import { Geodesic, BoundingBox, cutLineGeometry } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random, type RandomGenerator } from "@envisim/random";
import { intersectLineSampleAreaFrame } from "../utils/index.js";
import {
  type OptionsCircleConversion,
  type OptionsParallelLines,
  type SampleError,
  optionsCircleConversionCheck,
  optionsParallelLinesCheck,
  throwRangeError,
} from "./options.js";

export interface SampleSystematicLinesOnAreas
  extends OptionsCircleConversion,
    OptionsParallelLines {
  rand?: RandomGenerator;
}

export function sampleSystematicLinesOnAreasCheck(
  options: SampleSystematicLinesOnAreas,
): SampleError {
  return optionsCircleConversionCheck(options) || optionsParallelLinesCheck(options);
}

/**
 * Selects a sample of lines systematically over all areas.
 *
 * @param collection -
 * @param options -
 */
export function sampleSystematicLinesOnAreas(
  collection: FeatureCollection<AreaObject>,
  options: SampleSystematicLinesOnAreas,
): FeatureCollection<LineObject> {
  throwRangeError(sampleSystematicLinesOnAreasCheck(options));

  const { rand = new Random(), interspace, rotation = 0.0 } = options;

  const box = BoundingBox.removeAltitude(collection.getBBox());
  const center = BoundingBox.center(box);
  const bottomLeft: GJ.Position = [box[0], box[1]];
  const topRight: GJ.Position = [box[2], box[3]];
  const radius = Math.max(
    Geodesic.distance(center, bottomLeft),
    Geodesic.distance(center, topRight),
  );

  const numPointsPerLine = 20;
  const numLines = Math.ceil((2.0 * radius) / interspace);
  const randomStart = rand.random() * interspace;

  const sc = FeatureCollection.newLine([]);

  for (let i = 0; i < numLines; i++) {
    const x = -radius + i * interspace + randomStart;
    const thisLine = [];
    for (let j = 0; j < numPointsPerLine; j++) {
      const y = -radius + (2 * radius * j) / (numPointsPerLine - 1);
      thisLine.push(placePoint([x, y], center, rotation));
    }
    // Cut at antimeridian if needed
    const lineGeom = toLineObject(
      cutLineGeometry({
        type: "LineString",
        coordinates: thisLine,
      }),
    );
    if (lineGeom === null) continue;
    sc.addGeometry(lineGeom, { _designWeight: interspace }, true);
  }

  return intersectLineSampleAreaFrame(sc, collection, options);
}

// Internal.
function placePoint(point: GJ.Position, position: GJ.Position, rotation: number): GJ.Position {
  const dist = Math.sqrt(point[0] * point[0] + point[1] * point[1]);
  const angle = 90 - (Math.atan2(point[1], point[0]) * 180) / Math.PI + rotation;
  return Geodesic.destination(position, dist, angle);
}
