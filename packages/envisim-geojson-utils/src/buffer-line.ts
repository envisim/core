import * as GJ from './types/geojson.js';
import {buffering} from './buffer-area.js';
import type {BufferOptions} from './buffer.js';
import {AreaObject, LineObject, LineString, MultiPolygon, Polygon} from './geojson/index.js';

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

  const geoms: GJ.Position[][][] = [];

  if (LineString.isObject(line)) {
    geoms.push(ringFromLine(line.coordinates));
  } else {
    geoms.push(...line.coordinates.map((l) => ringFromLine(l)));
  }

  const newGeoms = buffering(geoms, options);

  if (newGeoms.length === 0) {
    return null;
  }

  if (newGeoms.length === 1) {
    return Polygon.create(newGeoms[0], true);
  }

  return MultiPolygon.create(newGeoms, true);
}
