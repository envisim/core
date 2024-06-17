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

/**
 * Retrieves the matching ids in the property record of the supplied property names.
 *
 * @param propertyRecord
 * @param names
 * @returns an ordered array of matching ids.
 */
export function propertyRecordIdsFromNames(
  propertyRecord: PropertyRecord,
  names: string[],
): string[] {
  const ids: string[] = [];

  names.forEach((name) => {
    let found = false;
    Object.keys(propertyRecord).forEach((key) => {
      if (propertyRecord[key].name === name) {
        ids.push(key);
        found = true;
      }
    });
    if (!found) {
      throw new Error(`id matching ${name} not found.`);
    }
  });

  return ids;
}
