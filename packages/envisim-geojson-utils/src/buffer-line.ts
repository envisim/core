import * as GJ from './types/geojson.js';
import {bufferRings} from './buffer-area.js';
import type {BufferOptions} from './buffer.js';
import {AreaObject, LineObject, LineString} from './geojson/index.js';
import {moveCoordsAroundEarth} from './utils/antimeridian.js';
import {bboxCrossesAntimeridian} from './utils/bbox.js';

function ringFromLine(line: GJ.Position[]): GJ.Position[][] {
  const ring: GJ.Position[] = [...line];

  for (let i = line.length - 1; i-- > 0; ) {
    ring.push(line[i]);
  }

  return [ring];
}

export function bufferLine(line: LineObject, options: Required<BufferOptions>): AreaObject | null {
  if (options.distance <= 0.0) {
    return null;
  }

  if (LineString.isObject(line)) {
    return bufferRings([ringFromLine(line.coordinates)], options);
  }

  if (bboxCrossesAntimeridian(line.getBBox())) {
    return bufferRings(line.coordinates.map(moveCoordsAroundEarth).map(ringFromLine), options);
  }

  return bufferRings(line.coordinates.map(ringFromLine), options);
}
