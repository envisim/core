import type * as GJ from './types.js';

export type OptionalParam<T, S extends keyof T> = Omit<T, S> &
  Partial<Pick<T, S>>;

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
}
