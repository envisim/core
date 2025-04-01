import { Feature, FeatureCollection, type LineObject, LineString } from "@envisim/geojson";
import { PlateCarree, lengthOfLineString } from "@envisim/geojson-utils";
import type * as GJ from "@envisim/geojson-utils/geojson";
import { Random, type RandomGenerator } from "@envisim/random";
import { SAMPLE_ERROR_LIST, type SampleError, throwRangeError } from "./options.js";

export type SampleSystematicLinesOnLines = {
  /**
   * An random number generator
   * @defaultValue `new Random()`
   */
  rand?: RandomGenerator;
  /**
   * The dash length
   */
  dashLength: number;
  /**
   * The void length
   */
  voidLength: number;
};

export function sampleSystematicLinesOnLinesCheck(
  options: SampleSystematicLinesOnLines,
): SampleError {
  if (typeof options.dashLength !== "number" || options.dashLength <= 0) {
    return SAMPLE_ERROR_LIST.DASH_LENGTH_NOT_POSITIVE;
  }
  if (typeof options.voidLength !== "number" || options.voidLength < 0) {
    return SAMPLE_ERROR_LIST.SEPARATION_NOT_POSITIVE;
  }
  return null;
}

/**
 * Selects systematic line dashes along a line layer. Each LineString recieves its
 * own random starting position of the dashes.
 *
 * @param collection
 * @param opts
 */
export function sampleSystematicLinesOnLines(
  collection: FeatureCollection<LineObject>,
  options: SampleSystematicLinesOnLines,
): FeatureCollection<LineString, never> {
  throwRangeError(sampleSystematicLinesOnLinesCheck(options));
  const { rand = new Random(), dashLength, voidLength } = options;

  const L = collection.measure(); // total length of input geoJSON
  if (L === 0) {
    return FeatureCollection.newLine<LineString, never>([]);
  }

  const intervalLength = dashLength + voidLength;
  const designWeight = intervalLength / dashLength;
  const dashes: Feature<LineString, never>[] = [];

  //sample each linestring separately
  collection.forEach((f, i) => {
    const coords =
      f.geometry.type === "LineString" ? [f.geometry.coordinates] : f.geometry.coordinates;

    coords.forEach((ls) => {
      // create and push all "dashes" along this LineString as new LineString features
      const thisLength = lengthOfLineString(ls);
      const start = -dashLength + rand.random() * intervalLength;
      const maxSampleSize = Math.ceil(thisLength / intervalLength);
      const distances: number[][] = [];

      for (let j = 0; j < maxSampleSize; j++) {
        const dashStart = Math.max(0, start + j * intervalLength);
        const dashEnd = Math.min(thisLength, start + j * intervalLength + dashLength);
        if (dashStart < thisLength) {
          distances.push([dashStart, dashEnd]);
        }
      }

      if (distances.length > 0) {
        const dashLines: GJ.Position[][] = Array.from<GJ.Position[]>({
          length: distances.length,
        }).fill([]);
        let dashOpen = -1;
        let dashClosed = -1;
        let distTravelled = 0;
        for (let k = 0; k < ls.length - 1; k++) {
          const segmentLength = PlateCarree.distance(ls[k], ls[k + 1]);
          const segmentStart = distTravelled;
          const segmentEnd = segmentStart + segmentLength;

          for (let m = dashClosed + 1; m < dashLines.length; m++) {
            // check if start of current dash is in this segment
            if (distances[m][0] >= segmentStart && distances[m][0] <= segmentEnd) {
              const fraction = (distances[m][0] - segmentStart) / segmentLength;
              dashLines[m] = [PlateCarree.intermediate(ls[k], ls[k + 1], fraction)];
              dashOpen = m;
            }
            // check if end of current dash is in this segment
            if (distances[m][1] >= segmentStart && distances[m][1] <= segmentEnd) {
              const fraction = (distances[m][1] - segmentStart) / segmentLength;
              dashLines[m].push(PlateCarree.intermediate(ls[k], ls[k + 1], fraction));
              dashClosed = m;
            }
            // if current dash is open but not closed, then add
            // this segment ending position to dash
            if (dashOpen > dashClosed) {
              dashLines[m].push(ls[k + 1]);
            }
          }
          distTravelled += segmentLength;
        }
        // push all dash features
        dashLines.forEach((ls) => {
          dashes.push(
            new Feature<LineString, never>(
              LineString.create(ls, true),
              // TODO: if we decide to transfer all properties from parent,
              // then add them here.
              {
                _designWeight: designWeight * f.getSpecialPropertyDesignWeight(),
                _parent: i,
              },
            ),
          );
        });
      }
    });
  });
  return FeatureCollection.newLine<LineString, never>(dashes);
}
