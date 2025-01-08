import {v4 as uuid} from 'uuid';

import {copy} from '@envisim/utils';

import type * as GJ from '../types/geojson.js';

interface PropertyBase {
  /** The UUID of the Features property using this category. */
  id: string;
  type: string;
  /** A human-friendly name */
  name?: string;
}

export interface NumericalProperty extends PropertyBase {
  type: 'numerical';
  /** Holds id and index of collected categorical variable */
  parent?: [string, number];
}

export interface CategoricalProperty extends PropertyBase {
  type: 'categorical';
  /** An ordered array of values defined on this category */
  values: string[];
}

export type Property = NumericalProperty | CategoricalProperty;

interface SpecialPropertyList {
  _designWeight?: NumericalProperty;
  _distance?: NumericalProperty;
  _parent?: NumericalProperty;
  _randomRotation?: NumericalProperty;
}

interface PropertyList {
  [id: string]: Property;
}

export class PropertyRecord {
  record: SpecialPropertyList & PropertyList = {};

  static createFromFeature({properties = {}}: GJ.BaseFeature<GJ.BaseGeometry, unknown>) {
    const pr = new PropertyRecord();

    for (const [id, prop] of Object.entries(properties ?? {})) {
      if (PropertyRecord.idIsSpecial(id)) {
        if (typeof prop !== 'number') {
          throw new TypeError(`${id} is a reserved property and must be a number`);
        }

        switch (id) {
          case '_designWeight':
            pr.addDesignWeight();
            break;
          case '_distance':
            pr.addDistance();
            break;
          case '_parent':
            pr.addParent();
            break;
          case '_randomRotation':
            pr.addRandomRotation();
            break;
        }

        continue;
      }

      switch (typeof prop) {
        case 'number':
          pr.addNumerical({id});
          break;
        case 'string':
          pr.addCategorical({id});
          break;
      }
    }

    return pr;
  }

  static mergePropertyRecords(propertyRecords: PropertyRecord[]): PropertyRecord {
    const pr = new PropertyRecord();

    for (const record of propertyRecords) {
      for (const id of Object.keys(record)) {
        if (pr.hasId(id)) {
          throw new Error(`Records contain duplicate identifier ${id}.`);
        }

        if (record.idIsNumerical(id)) {
          pr.addNumerical(record.getId(id) as NumericalProperty);
        } else {
          pr.addCategorical(record.getId(id) as CategoricalProperty);
        }
      }
    }

    return pr;
  }

  static propertyIsNumerical(property: Property | null): property is NumericalProperty {
    return property?.type === 'numerical';
  }

  static propertyIsCategorical(property: Property | null): property is CategoricalProperty {
    return property?.type === 'categorical';
  }

  constructor(record: Record<string, Property> = {}, shallow: boolean = true) {
    this.record = shallow === true ? record : copy(record);
  }

  copy(shallow: boolean = true): PropertyRecord {
    return new PropertyRecord(this.record, shallow);
  }

  hasId(id?: string): boolean {
    return id !== undefined && Object.hasOwn(this.record, id);
  }

  getId(id?: string): Property | null {
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

  idIsNumerical(id: string): boolean {
    return PropertyRecord.propertyIsNumerical(this.record?.[id]);
  }

  addNumerical({id = uuid(), name = id, parent}: Partial<NumericalProperty>): string {
    this.record[id] = {
      type: 'numerical',
      id,
      name,
      parent,
    };

    return id;
  }

  idIsCategorical(id: string): boolean {
    return PropertyRecord.propertyIsCategorical(this.record?.[id]);
  }

  addCategorical({id = uuid(), name = id, values = []}: Partial<CategoricalProperty>): string {
    this.record[id] = {
      type: 'categorical',
      id,
      name,
      values,
    };

    return id;
  }

  addValueToCategory(id: string, value: string): number {
    if (PropertyRecord.propertyIsCategorical(this.record?.[id]) === false) {
      throw new TypeError(`${id} is not categorical.`);
    }

    const index = this.record[id].values.indexOf(value);
    if (index >= 0) {
      return index;
    }

    return this.record[id].values.push(value) - 1;
  }

  categoryHasValue(id: string, value: string): boolean {
    if (PropertyRecord.propertyIsCategorical(this.record?.[id]) === false) {
      throw new TypeError(`${id} is not categorical.`);
    }

    return this.record?.[id].values.includes(value) === true;
  }

  addProperty(property: Property): string {
    if (PropertyRecord.propertyIsNumerical(property)) {
      return this.addNumerical(property);
    }

    return this.addCategorical(property);
  }

  removeProperty(id: string): void {
    if (this.hasId(id)) {
      delete this.record[id];
    }
  }

  // SPECIAL PROPERTIES
  static readonly SPECIAL_KEYS = ['_designWeight', '_distance', '_parent', '_randomRotation'];

  static idIsSpecial(id: string): boolean {
    return PropertyRecord.SPECIAL_KEYS.includes(id);
  }

  addDesignWeight() {
    if (Object.hasOwn(this.record, '_designWeight')) return;
    this.record['_designWeight'] = {
      id: '_designWeight',
      name: 'design weight',
      type: 'numerical',
    };
  }

  addDistance() {
    if (Object.hasOwn(this.record, '_distance')) return;
    this.record['_distance'] = {
      id: '_distance',
      name: 'distance',
      type: 'numerical',
    };
  }

  addParent() {
    if (Object.hasOwn(this.record, '_parent')) return;
    this.record['_parent'] = {
      id: '_parent',
      name: 'parent',
      type: 'numerical',
    };
  }

  addRandomRotation() {
    if (Object.hasOwn(this.record, '_randomRotation')) return;
    this.record['_randomRotation'] = {
      id: '_randomRotation',
      name: 'random rotation',
      type: 'numerical',
    };
  }
}
