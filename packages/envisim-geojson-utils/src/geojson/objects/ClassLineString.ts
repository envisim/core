import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {
  type BufferOptions,
  bufferPolygons,
  defaultBufferOptions,
  lineToRing,
} from '../../buffer/index.js';
import {bboxFromPositions} from '../../utils/bbox.js';
import {centroidOfLineString} from '../../utils/centroid.js';
import {distancePositionToSegment} from '../../utils/distancePositionToSegment.js';
import {lengthOfLineString} from '../../utils/length.js';
import {type GeomEachCallback} from '../base/index.js';
import {AbstractLineObject} from './AbstractLineObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {Polygon} from './ClassPolygon.js';

export class LineString extends AbstractLineObject<GJ.LineString> implements GJ.LineString {
  static isObject(obj: unknown): obj is LineString {
    return obj instanceof LineString;
  }

  static assert(obj: unknown, msg: string = 'Expected LineString'): asserts obj is LineString {
    if (!(obj instanceof LineString)) throw new TypeError(msg);
  }

  static create(coordinates: GJ.LineString['coordinates'], shallow: boolean = true): LineString {
    return new LineString({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.LineString, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'LineString'}, shallow);
  }

  get size(): number {
    return 1;
  }

  buffer(options: BufferOptions): Polygon | MultiPolygon | null {
    const opts = defaultBufferOptions(options);
    if (opts.distance <= 0.0) return null;

    return bufferPolygons([lineToRing(this.coordinates)], opts);
  }

  length(): number {
    return lengthOfLineString(this.coordinates);
  }

  centroid(iterations: number = 2): GJ.Position {
    return centroidOfLineString(this.coordinates, this.getBBox(), iterations).centroid;
  }

  geomEach(callback: GeomEachCallback<LineString>, featureIndex: number = -1): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const n = c.length - 1;
    for (let i = 0; i < n; i++) {
      d = Math.min(d, distancePositionToSegment(coords, [c[i], c[i + 1]]));
    }
    return d;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(this.coordinates);
    return this.bbox;
  }
}
