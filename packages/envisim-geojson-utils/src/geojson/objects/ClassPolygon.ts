import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {bufferGeometry} from '../../buffer.js';
import {areaOfPolygonLonLat} from '../../utils/area.js';
import {bboxFromPositions} from '../../utils/bbox.js';
import {centroidOfPolygon} from '../../utils/centroid.js';
import {distancePositionToSegment} from '../../utils/distancePositionToSegment.js';
import {lengthOfLineString} from '../../utils/length.js';
import {pointInSinglePolygonPosition} from '../../utils/pointInPolygonPosition.js';
import {AbstractAreaObject} from './AbstractAreaObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';

export class Polygon extends AbstractAreaObject<GJ.Polygon> implements GJ.Polygon {
  static isObject(obj: unknown): obj is Polygon {
    return obj instanceof Polygon;
  }

  static assert(obj: unknown, msg: string = 'Expected Polygon'): asserts obj is Polygon {
    if (!(obj instanceof Polygon)) throw new TypeError(msg);
  }

  static create(coordinates: GJ.Polygon['coordinates'], shallow: boolean = true): Polygon {
    return new Polygon({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.Polygon, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Polygon'}, shallow);
  }

  get size(): number {
    return 1;
  }

  area(): number {
    return areaOfPolygonLonLat(this.coordinates);
  }

  buffer(distance: number, steps: number = 10): Polygon | MultiPolygon | null {
    return bufferGeometry(this, {distance, steps});
  }

  perimeter(): number {
    return this.coordinates.reduce((prev, curr) => prev + lengthOfLineString(curr), 0);
  }

  centroid(iterations: number = 2): GJ.Position {
    return centroidOfPolygon(this.coordinates, this.getBBox(), iterations).centroid;
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const nRing = c.length;
    for (let i = 0; i < nRing; i++) {
      const nSeg = c[i].length - 1;
      for (let j = 0; j < nSeg; j++) {
        d = Math.min(d, distancePositionToSegment(coords, [c[i][j], c[i][j + 1]]));
      }
    }
    if (pointInSinglePolygonPosition(coords, c)) {
      return -d;
    }
    return d;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(this.coordinates[0]);
    return this.bbox;
  }
}
