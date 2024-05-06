import type * as GJ from '../../types/geojson.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import type {OptionalParam} from '../base/index.js';
import type {AreaObject} from '../objects/index.js';
import {AbstractGeometryCollection} from './AbstractGeometryCollection.js';
import {toAreaGeometry} from './toAreaGeometry.js';

export class AreaGeometryCollection
  extends AbstractGeometryCollection<AreaObject, GJ.AreaObject>
  implements GJ.AreaGeometryCollection
{
  static isGeometryCollection(obj: unknown): obj is AreaGeometryCollection {
    return obj instanceof AreaGeometryCollection;
  }

  static assert(obj: unknown, msg?: string): obj is AreaGeometryCollection {
    if (obj instanceof AreaGeometryCollection) return true;
    throw new TypeError(msg ?? 'Expected AreaGeometryCollection');
  }

  static create(
    geometries: GJ.AreaObject[],
    shallow: boolean = true,
  ): AreaGeometryCollection {
    return new AreaGeometryCollection({geometries}, shallow);
  }

  constructor(
    obj: OptionalParam<GJ.AreaGeometryCollection, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.AreaObject) =>
      toAreaGeometry(g, shallow, false),
    );
  }

  /* GEOJSON COMMON */
  override distanceToPosition(coords: GJ.Position): number {
    return this.geometries.reduce((prev, curr) => {
      const d = curr.distanceToPosition(coords);
      if (prev <= 0 && d <= 0) {
        return Math.max(d, prev);
      }
      return Math.min(d, prev);
    }, Infinity);
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.geometries.map((geom: AreaObject) => {
      return {
        centroid: geom.centroid(iterations),
        weight: geom.area(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations)
      .centroid;
  }

  /* AREA SPECIFIC */
  area(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.area(), 0);
  }

  perimeter(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.perimeter(), 0);
  }
}
