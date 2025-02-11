import {v4 as uuid} from 'uuid';

import {copy} from '@envisim/utils';

import type * as GJ from '../types/geojson.js';
import {type Feature} from './class-feature.js';
import {type PureObject} from './objects/index.js';

interface PropertyBase<ID extends string> {
  /** The UUID of the Features property using this category. */
  id: ID;
  type: string;
  /** A human-friendly name */
  name?: string;
}

export interface NumericalProperty<ID extends string = string> extends PropertyBase<ID> {
  type: 'numerical';
  /** Holds id and index of collected categorical variable */
  parent?: [string, number];
}

export interface CategoricalProperty<ID extends string = string> extends PropertyBase<ID> {
  type: 'categorical';
  /** An ordered array of values defined on this category */
  values: string[];
}

export type Property<ID extends string = string> = NumericalProperty<ID> | CategoricalProperty<ID>;

type PropertyList<IDS extends string = string> = Record<IDS, Property<IDS>>;

const SPECIAL_KEYS = [
  '_designWeight',
  '_distance',
  '_parent',
  '_randomRotation',
  '_measure',
  '_count',
] as const;
export type SpecialPropertyNames = (typeof SPECIAL_KEYS)[number];

type SpecialFeatureProperties = Partial<Record<SpecialPropertyNames, number>>;
export type FeatureProperties<IDS extends string = string> = SpecialFeatureProperties &
  Record<IDS, number | string>;

export class PropertyRecord<IDS extends string = string> {
  // SPECIAL PROPERTIES
  static readonly SPECIAL_KEYS = SPECIAL_KEYS;
  static isSpecial(k: string): k is SpecialPropertyNames {
    return (PropertyRecord.SPECIAL_KEYS as ReadonlyArray<string>).includes(k);
  }

  record: PropertyList<IDS>;

  static isRecord(obj: unknown): obj is PropertyRecord {
    return obj instanceof PropertyRecord;
  }

  static createFromJson(
    feature?: GJ.BaseFeature<GJ.BaseGeometry, unknown>,
  ): PropertyRecord<string> {
    if (feature === undefined || feature.properties === null) {
      return new PropertyRecord<string>({}, true);
    }

    const properties = feature.properties;
    const pr = new PropertyRecord<string>({}, true);

    for (const [id, prop] of Object.entries(properties ?? {})) {
      switch (typeof prop) {
        case 'number':
          pr.addNumerical({id});
          break;
        case 'string':
          pr.addCategorical({id, values: [prop]});
          break;
      }
    }

    return pr;
  }

  static createFromFeature<IDS1 extends string = string>(
    feature?: Feature<PureObject, IDS1>,
  ): PropertyRecord<IDS1> {
    const pr = new PropertyRecord<string>({}, true);

    if (feature === undefined) {
      return pr as PropertyRecord<IDS1>;
    }

    for (const [id, prop] of Object.entries(feature.properties)) {
      switch (typeof prop) {
        case 'number':
          pr.addNumerical({id});
          break;
        case 'string':
          pr.addCategorical({id, values: [prop]});
          break;
      }
    }

    return pr as PropertyRecord<IDS1>;
  }

  static mergeRecords<IDS1 extends string, IDS2 extends string>(
    record1: PropertyRecord<IDS1>,
    record2: PropertyRecord<IDS2>,
  ): PropertyRecord<IDS1 | IDS2> {
    const keys1 = record1.getIds();
    record2.getIds().forEach((k) => {
      if (keys1.includes(k)) {
        throw new Error('Record contain duplicate identifier ' + k);
      }
    });

    return new PropertyRecord({...record1.record, ...record2.record});
  }

  static isNumerical(property: Property | null): property is NumericalProperty {
    return property?.type === 'numerical';
  }

  static isCategorical(property: Property | null): property is CategoricalProperty {
    return property?.type === 'categorical';
  }

  constructor(record: PropertyList<IDS>, shallow: boolean = true) {
    this.record = shallow === true ? record : copy(record);
  }

  copy(shallow: boolean = true): PropertyRecord<IDS> {
    return new PropertyRecord(this.record, shallow);
  }

  hasId(id?: string): boolean {
    return id !== undefined && Object.hasOwn(this.record, id);
  }

  getId(id: IDS): Property;
  getId(id?: IDS): Property | null;
  getId(id?: IDS): Property | null {
    if (id === undefined || !Object.hasOwn(this.record, id)) {
      return null;
    }

    return this.record[id];
  }

  getIds(): string[] {
    return Object.keys(this.record);
  }

  getRecord(): Property[] {
    return Object.values(this.record);
  }

  isNumerical(id: IDS): boolean {
    return PropertyRecord.isNumerical(this.record?.[id]);
  }

  addNumerical(
    this: PropertyRecord<string>,
    {id = uuid(), name = id, parent}: Partial<NumericalProperty<string>>,
  ): string {
    this.record[id] = {
      type: 'numerical',
      id,
      name,
      parent,
    };

    return id;
  }

  idCategorical(id: IDS): boolean {
    return PropertyRecord.isCategorical(this.record?.[id]);
  }

  addCategorical(
    this: PropertyRecord<string>,
    {id = uuid(), name = id, values = []}: Partial<CategoricalProperty<string>>,
  ): string {
    this.record[id] = {
      type: 'categorical',
      id,
      name,
      values,
    };

    return id;
  }

  addValueToCategory(id: IDS, value: string): number {
    if (PropertyRecord.isCategorical(this.record?.[id]) === false) {
      throw new TypeError(`${id} is not categorical.`);
    }

    const index = this.record[id].values.indexOf(value);
    if (index >= 0) {
      return index;
    }

    return this.record[id].values.push(value) - 1;
  }

  categoryHasValue(id: IDS, value: string): boolean {
    if (PropertyRecord.isCategorical(this.record?.[id]) === false) {
      throw new TypeError(`${id} is not categorical.`);
    }

    return this.record?.[id].values.includes(value) === true;
  }

  addProperty(this: PropertyRecord<string>, property: Property<string>): string {
    if (PropertyRecord.isNumerical(property)) {
      return this.addNumerical(property);
    }

    return this.addCategorical(property);
  }

  removeProperty(this: PropertyRecord<string>, id: string): void {
    delete this.record[id];
  }
}
