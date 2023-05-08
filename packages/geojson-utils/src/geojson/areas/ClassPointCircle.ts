import type * as GJ from '../types.js';
import type {OptionalParam} from '../util-types.js';
import {BaseAreaObject} from './BaseAreaObject.js';

export class PointCircle
  extends BaseAreaObject<GJ.PointCircle>
  implements GJ.PointCircle
{
  static isObject(obj: any): obj is PointCircle {
    return obj instanceof PointCircle;
  }

  static create(
    coordinates: GJ.PointCircle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): PointCircle {
    return new PointCircle({coordinates, radius}, shallow);
  }

  radius: number;

  constructor(
    obj: OptionalParam<GJ.PointCircle, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Point'}, shallow);
    this.radius = obj.radius;
  }

  toPolygon({
    shallow = true,
    pointsPerCircle = 16,
  }: {shallow?: boolean; pointsPerCircle?: number} = {}): Polygon {
    // Check shallow for bbox, as this is the only prop in need of copy
    const bbox = shallow === true ? this.bbox : [...this.bbox];
    const coordinates: GJ.Position[] = new Array(pointsPerCircle);

    // Use the radius that gives equal area to the polygon for best approx.
    const v = Math.PI / pointsPerCircle;
    const radius = Math.sqrt(
      (Math.PI * this.radius ** 2) /
        (pointsPerCircle * Math.sin(v) * Math.cos(v)),
    );

    for (let i = 0; i < pointsPerCircle; i++) {
      const angle = 360.0 - (i / pointsPerCircle) * 360.0;
      coordinates[i] = destination(this.coordinates, radius, angle);
    }

    // Close the polygon by adding the first point as the last
    coordinates.push([...coordinates[0]]);

    return new Polygon({coordinates: [coordinates], bbox}, true);
  }

  get size(): number {
    return 1;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
