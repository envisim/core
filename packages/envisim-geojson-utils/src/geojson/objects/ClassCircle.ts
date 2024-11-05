import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions, defaultBufferOptions} from '../../buffer/index.js';
import {Geodesic} from '../../utils/Geodesic.js';
import {bboxFromPositions, getPositionsForCircle} from '../../utils/bbox.js';
import {CirclesToPolygonsOptions, circlesToPolygons} from '../../utils/circles-to-polygons.js';
import {type GeomEachCallback} from '../base/index.js';
import {AbstractAreaObject} from './AbstractAreaObject.js';
import {MultiPolygon} from './ClassMultiPolygon.js';
import {Polygon} from './ClassPolygon.js';

export class Circle extends AbstractAreaObject<GJ.Circle> implements GJ.Circle {
  static isObject(obj: unknown): obj is Circle {
    return obj instanceof Circle;
  }

  static assert(obj: unknown, msg: string = 'Expected Circle'): asserts obj is Circle {
    if (!(obj instanceof Circle)) throw new TypeError(msg);
  }

  static create(
    coordinates: GJ.Circle['coordinates'],
    radius: number,
    shallow: boolean = true,
  ): Circle {
    return new Circle({coordinates, radius}, shallow);
  }

  radius: number;

  /**
   * The `Circle` is a {@link Point} with the extra property `radius`.
   * Thus, it does not follow the GeoJSON standard, but can be converted to
   * a {@link Polygon} through the {@link Circle.toPolygon}.
   *
   * @param obj
   * @param shallow if `true`, copys by reference when possible.
   */
  constructor(obj: OptionalParam<GJ.Circle, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'Point'}, shallow);
    this.radius = obj.radius;
  }

  getCoordinateArray(): GJ.Position[] {
    return [this.coordinates];
  }

  toPolygon(options: CirclesToPolygonsOptions = {}): Polygon | MultiPolygon | null {
    const polygons = circlesToPolygons([this.coordinates], this.radius, options);

    if (polygons.length === 0) {
      return null;
    } else if (polygons.length === 1) {
      return Polygon.create(polygons[0], true);
    }

    return MultiPolygon.create(polygons, true);
  }

  get size(): number {
    return 1;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  buffer(options: BufferOptions): Circle | null {
    const opts = defaultBufferOptions(options);
    const newRadius = this.radius + opts.distance;

    if (newRadius <= 0.0) return null;
    return Circle.create(this.coordinates, newRadius, false);
  }

  centroid(): GJ.Position {
    return [...this.coordinates];
  }

  distanceToPosition(coords: GJ.Position): number {
    return Geodesic.distance(coords, this.coordinates) - this.radius;
  }

  geomEach(callback: GeomEachCallback<Circle>, featureIndex: number = -1): void {
    callback(this, featureIndex, -1);
  }

  perimeter(): number {
    return Math.PI * this.radius * 2;
  }

  setBBox(): GJ.BBox {
    this.bbox = bboxFromPositions(getPositionsForCircle(this.coordinates, this.radius));
    return this.bbox;
  }
}
