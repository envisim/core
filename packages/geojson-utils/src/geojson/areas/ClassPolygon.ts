import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';
import {areaOfPolygonLonLat} from '../../area.js';
import {distancePositionToSegment} from '../../distancePositionToSegment.js';
import {pointInSinglePolygon} from '../../pointInPolygon.js';
import {bboxFromArrayOfPositions} from '../../bbox.js';
import type {GeomEachCallback} from '../callback-types.js';

export class Polygon extends BaseAreaObject<GJ.Polygon> implements GJ.Polygon {
  static isObject(obj: any): obj is Polygon {
    return obj instanceof Polygon;
  }

  static create(
    coordinates: GJ.Polygon['coordinates'],
    shallow: boolean = true,
  ): Polygon {
    return new Polygon({coordinates}, shallow);
  }

  constructor(obj: OptionalParam<GJ.Polygon, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Polygon'}, shallow);
  }

  get size(): number {
    return 1;
  }

  area(dist: number = Infinity): number {
    return areaOfPolygonLonLat(this.coordinates, dist);
  }

  geomEach(
    callback: GeomEachCallback<Polygon>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const nRing = c.length;
    for (let i = 0; i < nRing; i++) {
      const nSeg = c[i].length - 1;
      for (let j = 0; j < nSeg; j++) {
        d = Math.min(
          d,
          distancePositionToSegment(coords, [c[i][j], c[i][j + 1]]),
        );
      }
    }
    if (pointInSinglePolygon(coords, c)) {
      return -d;
    }
    return d;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromArrayOfPositions(this.coordinates[0]);
    return this.bbox;
  }
}
