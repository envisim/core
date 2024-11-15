import {v4 as uuidv4} from 'uuid';

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

export type PropertyRecord = Record<string, Property>;

export const PropertySpecialKeys = [
  '_designWeight',
  '_distance',
  '_parent',
  '_randomRotation',
] as const;

export function createDesignWeightProperty(): NumericalProperty {
  return {
    id: '_designWeight',
    name: 'design weight',
    type: 'numerical',
  };
}

export function createDistanceProperty(): NumericalProperty {
  return {
    id: '_distance',
    name: 'distance',
    type: 'numerical',
  };
}

export function createParentProperty(): NumericalProperty {
  return {
    id: '_parent',
    name: 'parent',
    type: 'numerical',
  };
}

/**
 * To be used when converting into classes. Keeps ids as name
 */
export function createPropertyRecordFromFeature({
  properties = {},
}: GJ.BaseFeature<GJ.BaseGeometry, any>): PropertyRecord {
  const propertyRecord: PropertyRecord = {};

  Object.entries(properties ?? {}).forEach(([id, prop]) => {
    const isSpecialKey = (PropertySpecialKeys as ReadonlyArray<string>).includes(id);
    const valueType = typeof prop;

    if (valueType === 'number') {
      propertyRecord[id] = {type: 'numerical', id, name: id};
    } else if (isSpecialKey) {
      throw new Error(`Property ${prop} is a reserved property and must be a number`);
    } else if (valueType === 'string') {
      propertyRecord[id] = {type: 'categorical', id, name: id, values: []};
    }
  });

  return propertyRecord;
}

/**
 * Merges property records into a single property record
 *
 * @param propertyRecords
 * @returns the new property record
 */
export function mergePropertyRecords(propertyRecords: PropertyRecord[]): PropertyRecord {
  const newRecord: PropertyRecord = {};

  propertyRecords.forEach((record) => {
    Object.keys(record).forEach((key) => {
      // Check for duplicates
      if (Object.hasOwn(newRecord, key)) {
        throw new Error('Records contain duplicate identifier.');
      }
      // Add a copy to new record
      newRecord[key] = copy(record[key]);
    });
  });
  return newRecord;
}
