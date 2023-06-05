import type * as GJ from '../../types/geojson.js';
import {areaOfPolygonLonLat} from '../../utils/area.js';
import {bboxFromPositions, unionOfBBoxes} from '../../utils/bbox.js';
import {distancePositionToSegment} from '../../utils/distancePositionToSegment.js';
import {pointInSinglePolygonPosition} from '../../utils/pointInPolygonPosition.js';
import type {GeomEachCallback} from '../callback-types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';

export class MultiPolygon
  extends BaseAreaObject<GJ.MultiPolygon>
  implements GJ.MultiPolygon
{
  static isObject(obj: unknown): obj is MultiPolygon {
    return obj instanceof MultiPolygon;
  }

  static create(
    coordinates: GJ.MultiPolygon['coordinates'],
    shallow: boolean = true,
  ): MultiPolygon {
    return new MultiPolygon({coordinates}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.MultiPolygon, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPolygon'}, shallow);
  }

  get size(): number {
    return this.coordinates.length;
  }

  area(dist: number = Infinity): number {
    return this.coordinates.reduce(
      (prev, curr) => prev + areaOfPolygonLonLat(curr, dist),
      0,
    );
  }

  geomEach(
    callback: GeomEachCallback<MultiPolygon>,
    featureIndex: number = -1,
  ): void {
    callback(this, featureIndex, -1);
  }

  distanceToPosition(coords: GJ.Position): number {
    let d = Infinity;
    const c = this.coordinates;
    const nPoly = c.length;
    let inside = false;
    for (let i = 0; i < nPoly; i++) {
      const nRing = c[i].length;
      for (let j = 0; j < nRing; j++) {
        const nSeg = c[i][j].length - 1;
        for (let k = 0; k < nSeg; k++) {
          d = Math.min(
            d,
            distancePositionToSegment(coords, [c[i][j][k], c[i][j][k + 1]]),
          );
        }
      }
      if (pointInSinglePolygonPosition(coords, c[i])) {
        inside = true;
      }
    }
    if (inside) {
      return -d;
    }
    return d;
  }

  setBBox(): GJ.BBox {
    const bboxes = this.coordinates.map((pos) => bboxFromPositions(pos[0]));
    this.bbox = unionOfBBoxes(bboxes);
    return this.bbox;
  }
}
