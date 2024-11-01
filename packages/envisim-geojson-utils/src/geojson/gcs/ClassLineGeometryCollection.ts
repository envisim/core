import {type OptionalParam} from '@envisim/utils';

import type * as GJ from '../../types/geojson.js';
import {type BufferOptions} from '../../buffer/index.js';
import {GeometricPrimitive} from '../../geometric-primitive/index.js';
import {centroidFromMultipleCentroids} from '../../utils/centroid.js';
import {type LineObject} from '../objects/index.js';
import {AbstractGeometryCollection} from './AbstractGeometryCollection.js';
import {AreaGeometryCollection} from './ClassAreaGeometryCollection.js';
import {toLineGeometry} from './toLineGeometry.js';

export class LineGeometryCollection
  extends AbstractGeometryCollection<LineObject, GJ.LineObject>
  implements GJ.LineGeometryCollection
{
  static isGeometryCollection(obj: unknown): obj is LineGeometryCollection {
    return obj instanceof LineGeometryCollection;
  }

  static assert(
    obj: unknown,
    msg: string = 'Expected LineGeometryCollection',
  ): asserts obj is LineGeometryCollection {
    if (!(obj instanceof LineGeometryCollection)) throw new TypeError(msg);
  }

  static create(geometries: GJ.LineObject[], shallow: boolean = true): LineGeometryCollection {
    return new LineGeometryCollection({geometries}, shallow);
  }

  constructor(obj: OptionalParam<GJ.LineGeometryCollection, 'type'>, shallow: boolean = true) {
    super({...obj, type: 'GeometryCollection'}, shallow);

    this.geometries = obj.geometries.map((g: GJ.LineObject) => toLineGeometry(g, shallow, false));
  }

  geometricPrimitive(): GeometricPrimitive.LINE {
    return GeometricPrimitive.LINE;
  }

  buffer(_: BufferOptions): AreaGeometryCollection | null {
    return null;
  }

  centroid(iterations: number = 2): GJ.Position {
    const centroids = this.geometries.map((geom: LineObject) => {
      return {
        centroid: geom.centroid(iterations),
        weight: geom.length(),
      };
    });
    return centroidFromMultipleCentroids(centroids, this.getBBox(), iterations).centroid;
  }

  /* LINE SPECIFIC */
  length(): number {
    return this.geometries.reduce((prev, curr) => prev + curr.length(), 0);
  }
}
