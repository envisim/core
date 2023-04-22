import {IPropertyRecord} from '@envisim/geojson-utils';

import {samplePointsOnAreas} from '../samplePointsOnAreas.js';
import {samplePointsOnLines} from '../samplePointsOnLines.js';
import {ISampleOptionsContinuous} from './types.js';

export function sampleFromLine(
  methodName: string,
  collection: GeoJSON.FeatureCollection,
  sampleOptions: ISampleOptionsContinuous,
  validProps: IPropertyRecord = {},
): GeoJSON.FeatureCollection {
  switch (methodName) {
    case 'point-uniform':
      return samplePointsOnLines(collection, {
        ...sampleOptions,
        method: 'uniform',
      });
    case 'point-systematic':
      return samplePointsOnLines(collection, {
        ...sampleOptions,
        method: 'systematic',
      });
    default:
      throw new Error('methodName not valid');
  }
}

export function sampleFromPolygon(
  methodName: string,
  collection: GeoJSON.FeatureCollection,
  sampleOptions: ISampleOptionsContinuous,
  validProps: IPropertyRecord = {},
): GeoJSON.FeatureCollection {
  switch (methodName) {
    case 'point-uniform':
      return samplePointsOnAreas(collection, {
        ...sampleOptions,
        method: 'uniform',
      });
    case 'point-systematic':
      return samplePointsOnAreas(collection, {
        ...sampleOptions,
        method: 'systematic',
      });
    case 'line':
    case 'belt':
    // Need to get length in direction
    case 'tract':
    // HANDLE
    default:
      throw new Error('methodName not valid');
  }
}
