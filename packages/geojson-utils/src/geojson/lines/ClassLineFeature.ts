import {BaseFeature} from '../ClassBaseFeature.js';
import type * as GJ from '../types.js';
import {OptionalParam} from '../util-types.js';
import {
  LineGeometry,
  LineGeometryCollection,
} from './ClassLineGeometryCollection.js';
import {LineString, MultiLineString} from './LineObjects.js';

export class LineFeature extends BaseFeature implements GJ.LineFeature {
  static isFeature(obj: any): obj is LineFeature {
    return obj instanceof LineFeature;
  }

  geometry: LineGeometry;

  constructor(
    obj: OptionalParam<GJ.LineFeature, 'type'>,
    shallow: boolean = true,
  ) {
    super({...obj, type: 'Feature'}, shallow);

    switch (obj.geometry?.type) {
      case 'GeometryCollection':
        this.geometry = new LineGeometryCollection(obj.geometry, shallow);
        break;
      case 'LineString':
        this.geometry = new LineString(obj.geometry, shallow);
        break;
      case 'MultiLineString':
        this.geometry = new MultiLineString(obj.geometry, shallow);
        break;
    }
  }
}
