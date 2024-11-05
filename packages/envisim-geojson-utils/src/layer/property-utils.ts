import {copy} from '@envisim/utils';

import type {NumericalProperty, PropertyRecord} from './property.js';

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
