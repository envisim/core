import type * as GJ from '../types/geojson.js';

export abstract class GeoJsonObject<T extends string>
  implements GJ.GeoJsonObject<T>
{
  readonly type: T;
  bbox?: GJ.BBox;

  constructor(obj: GJ.GeoJsonObject<T>, shallow = true) {
    this.type = obj.type;

    if (shallow === true) {
      this.bbox = obj.bbox;
    } else {
      if (obj?.bbox) this.bbox = [...obj.bbox];
    }
  }

  abstract setBBox(force?: boolean): GJ.BBox;
  getBBox(): GJ.BBox {
    return this.bbox ?? this.setBBox(false);
  }
}
