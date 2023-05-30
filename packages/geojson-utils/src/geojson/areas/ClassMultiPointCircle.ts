import type * as GJ from '../types.js';
import {bboxFromArrayOfPositions, getPositionsForCircle} from '../../bbox.js';
import {destination} from '../../destination.js';
import {distance} from '../../distance.js';
import type {GeomEachCallback} from '../typeGeomEachCallback.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';

export class MultiPointCircle
  extends BaseAreaObject<GJ.MultiPointCircle>
  implements GJ.MultiPointCircle
{
  static isObject(obj: any): obj is MultiPointCircle {
    return obj instanceof MultiPointCircle;
  }

  static create(
    coordinates: GJ.MultiPointCircle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): MultiPointCircle {
    return new MultiPointCircle({coordinates, radius}, shallow);
  }

  radius: number;

  constructor(
    obj: OptionalParam<GJ.MultiPointCircle, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'MultiPoint'}, shallow);
    this.radius = obj.radius;
  }

  toPolygon({
    shallow = true,
    pointsPerCircle = 16,
  }: {shallow?: boolean; pointsPerCircle?: number} = {}): MultiPolygon {
    // Check shallow for bbox, as this is the only prop in need of copy
    const bbox: GJ.BBox | undefined =
      shallow === true ? this.bbox : this.bbox ? [...this.bbox] : undefined;

    // Early return
    if (this.coordinates.length === 0)
      return new MultiPolygon({coordinates: [], bbox}, true);

    const coordinates: GJ.Position[][][] = new Array(this.coordinates.length);

    // Use the radius that gives equal area to the polygon for best approx.
    const v = Math.PI / pointsPerCircle;
    const radius = Math.sqrt(
      (Math.PI * this.radius ** 2) /
        (pointsPerCircle * Math.sin(v) * Math.cos(v)),
    );

    for (let i = 0; i < this.coordinates.length; i++) {
      const coords: GJ.Position[] = new Array(pointsPerCircle);
      for (let j = 0; j < pointsPerCircle; j++) {
        const angle = 360.0 - (j / pointsPerCircle) * 360.0;
        coords[j] = destination(this.coordinates[i], radius, angle);
      }
      // Close the polygon by adding the first point as the last
      coords.push([...coords[0]]);

      coordinates[i] = [coords];
    }

    return new MultiPolygon({coordinates, bbox}, true);
  }

  get size(): number {
    return this.coordinates.length;
  }

  area(): number {
    return this.coordinates.length * Math.PI * this.radius ** 2;
  }

  geomEach(callback: GeomEachCallback<MultiPointCircle>): void {
    callback(this);
  }

  distanceToPosition(coords: GJ.Position): number {
    return (
      this.coordinates.reduce((prev, curr) => {
        return Math.min(prev, distance(coords, curr));
      }, Infinity) - this.radius
    );
  }

  setBBox(): GJ.BBox {
    let coords: GJ.Position[] = [];
    this.coordinates.forEach((coord) => {
      coords = coords.concat(getPositionsForCircle(coord, this.radius));
    });
    this.bbox = bboxFromArrayOfPositions(coords);
    return this.bbox;
  }

  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox();
  }
}
