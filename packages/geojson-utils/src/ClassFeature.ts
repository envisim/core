import {v4 as uuid} from 'uuid';

import type {TCollectionType} from './types/collection.js';

import {copy as fnCopy} from './copy.js';
import {collectionTypeWithRadius} from './collectionType.js';

export class Feature implements GeoJSON.Feature {
  readonly type = 'Feature';
  id: string;
  geometry: GeoJSON.Geometry;
  properties: NonNullable<GeoJSON.GeoJsonProperties> = {};
  bbox: GeoJSON.BBox | undefined;

  /**
   *
   * @param feature - An initial `GeoJSON.Feature`. To initialize a geometry, use {@link Feature.create}.
   * @param copy - If a copy should be made on construction.
   * @param strict - If `true`, mixed GeometryCollections, i.e. containing different {@link TCollectionType}s will not be allowed.
   */
  constructor(
    {
      id,
      geometry,
      properties = {},
      bbox,
    }: Partial<GeoJSON.Feature> & {geometry: GeoJSON.Geometry},
    copy: boolean = false,
    strict: boolean = true,
  ) {
    this.id = id ? String(id) : uuid();

    const props = properties ?? {};
    this.properties = copy === true ? fnCopy(props) : props;

    this.geometry = copy === true ? fnCopy(geometry) : geometry;

    if (bbox) {
      this.bbox = bbox;
    }

    if (this.geometry.type === 'GeometryCollection') {
      if (strict === false) {
        if (
          this.geometry.geometries.some((g) => g.type === 'GeometryCollection')
        )
          throw new Error('Nested GeometryCollections are not allowed');
      } else {
        const radiusIsDefined = this.properties._radius > 0.0;
        const ctype = collectionTypeWithRadius(
          this.geometry.geometries[0],
          radiusIsDefined,
        );

        this.geometry.geometries.forEach((g, i) => {
          if (g.type === 'GeometryCollection')
            throw new Error('Nested GeometryCollections are not allowed');

          const t = collectionTypeWithRadius(g, radiusIsDefined);
          if (t !== ctype)
            throw new Error(
              'Mixed GeometryCollections are not allowed (strict)',
            );
        });
      }
    }

    return this;
  }

  static create(
    geometry: GeoJSON.Geometry,
    properties: GeoJSON.GeoJsonProperties = {},
    copy: boolean = false,
    strict: boolean = true,
  ): Feature {
    return new Feature({type: 'Feature', geometry, properties}, copy);
  }

  get ctype(): TCollectionType {
    let t = this.geometry.type;

    if (t === 'GeometryCollection') {
      const gc = this.geometry as GeoJSON.GeometryCollection;
      t = gc.geometries[0].type;
    }

    switch (t) {
      case 'LineString':
      case 'MultiLineString':
        return 'line';

      case 'Point':
      case 'MultiPoint':
        return this.isCircle() ? 'polygon' : 'point';

      case 'Polygon':
      case 'MultiPolygon':
        return 'polygon';

      default:
        throw new Error('Nested GeometryCollections are not allowed');
    }
  }

  isCircle(): boolean {
    // Negation ! is needed as _radius might be undefined
    if (!(this.properties._radius > 0.0)) return false;
    if (this.geometry.type === 'Point') return true;
    if (
      this.geometry.type === 'GeometryCollection' &&
      this.geometry.geometries.some((g) => g.type === 'Point')
    )
      return true;
    return false;
  }

  initProperty(property: string, defaultValue: number = 0.0): this {
    if (!this.properties.hasOwnProperty(property))
      this.properties[property] = defaultValue;
    return this;
  }

  removeProperty(property: string): this {
    delete this.properties[property];
    return this;
  }

  setProperty(property: string, value: number): this {
    this.properties[property] = value;
    return this;
  }
}
