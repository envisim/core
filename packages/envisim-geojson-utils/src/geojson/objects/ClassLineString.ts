import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {bboxFromPositions} from '../../utils/bbox.js';
import {centroidOfLineString} from '../../utils/centroid.js';
import {distancePositionToSegment} from '../../utils/distancePositionToSegment.js';
import {lengthOfLineString} from '../../utils/length.js';
import {type GeomEachCallback} from '../base/index.js';
import {AbstractLineObject} from './AbstractLineObject.js';

export class LineString
  extends AbstractLineObject<GJ.LineString>
  implements GJ.LineString
{
  static isObject(obj: unknown): obj is LineString {
    return obj instanceof LineString;
  }

  static assert(obj: unknown, msg?: string): obj is LineString {
    if (obj instanceof LineString) return true;
    throw new TypeError(msg ?? 'Expected LineString');
  }

  static create(
    coordinates: GJ.LineString['coordinates'],
    shallow: boolean = true,
  ): LineString {
    return new LineString({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.LineString, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'LineString'}, shallow);
  }

  get size(): number {
    return 1;
  }

  length(): number {
    return lengthOfLineString(this.coordinates);
  }

  centroid(iterations: number = 2): GJ.Position {
    return centroidOfLineString(this.coordinates, this.getBBox(), iterations)
      .centroid;
  }

  geomEach(
    callback: GeomEachCallback<LineString>,
    featureIndex: number = -1,
  ): void {
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
