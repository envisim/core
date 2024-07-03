import {copy} from '@envisim/utils';

import {type PropertyRecord} from '../index.js';

/**
 * Merges property records into a single property record
 *
 * @param propertyRecords
 * @returns the new property record
 */
export function mergePropertyRecords(
  propertyRecords: PropertyRecord[],
): PropertyRecord {
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
