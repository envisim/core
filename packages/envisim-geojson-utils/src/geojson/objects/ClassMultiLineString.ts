import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {
  type BufferOptions,
  bufferPolygons,
  defaultBufferOptions,
  lineToRing,
} from '../../buffer/index.js';
import {moveCoordsAroundEarth} from '../../utils/antimeridian.js';
import {bboxCrossesAntimeridian, bboxFromPositions, unionOfBBoxes} from '../../utils/bbox.js';
import {centroidFromMultipleCentroids, centroidOfLineString} from '../../utils/centroid.js';
import {distancePositionToSegment} from '../../utils/distancePositionToSegment.js';
import {lengthOfLineString} from '../../utils/length.js';
import {AbstractLineObject} from './AbstractLineObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {Polygon} from './ClassPolygon.js';

export class MultiLineString
  extends AbstractLineObject<GJ.MultiLineString>
  implements GJ.MultiLineString
{
  static isObject(obj: unknown): obj is MultiLineString {
    return obj instanceof MultiLineString;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected MultiLineString',
  ): asserts obj is MultiLineString {
    if (!(obj instanceof MultiLineString)) throw new TypeError(msg);
  }

  static create(
    coordinates: GJ.MultiLineString['coordinates'],
    shallow: boolean = true,
  ): MultiLineString {
    return new MultiLineString({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.MultiLineString, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'MultiLineString'}, shallow);
  }

  getCoordinateArray(): GJ.Position[][] {
    return this.coordinates;
  }

  get size(): number {
    return this.coordinates.length;
  }

  buffer(options: BufferOptions): Polygon | MultiPolygon | null {
    const opts = defaultBufferOptions(options);
    if (opts.distance <= 0.0) return null;

    if (bboxCrossesAntimeridian(this.getBBox())) {
      return bufferPolygons(this.coordinates.map(moveCoordsAroundEarth).map(lineToRing), opts);
    }

    return bufferPolygons(this.coordinates.map(lineToRing), opts);
  }

  length(): number {
    return this.coordinates.reduce((prev, curr) => prev + lengthOfLineString(curr), 0);
  }

  centroid(iterations: number = 2): GJ.Position {
    const bbox = this.getBBox();
    const centroids = this.coordinates.map((coord) =>
      centroidOfLineString(coord, bbox, iterations),
    );
    return centroidFromMultipleCentroids(centroids, bbox, iterations).centroid;
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    for (let i = 0; i < c.length; i++) {
      const n = c[i].length - 1;
      for (let j = 0; j < n; j++) {
        d = Math.min(d, distancePositionToSegment(coords, [c[i][j], c[i][j + 1]]));
      }
    }
    return d;
  }

  setBBox(): GJ.BBox {
    const bbox = this.coordinates.map((ls) => bboxFromPositions(ls));
    this.bbox = unionOfBBoxes(bbox);
    return this.bbox;
  }
}
