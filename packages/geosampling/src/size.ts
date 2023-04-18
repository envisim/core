import {typeOfFrame} from './typeOfFrame.js';
import {area} from './area.js';
import {length} from './length.js';
import {count} from './count.js';

/**
 * Computes the size of a GeoJSON object. All geometries
 * must have the same dimension.
 *
 * @param geoJSON - The GeoJSON to compute the size of.
 * @returns - The size.
 */
export const size = (
  geoJSON: GeoJSON.Feature | GeoJSON.FeatureCollection,
): number => {
  const type = typeOfFrame(geoJSON);
  switch (type) {
    case 'point':
      return count(geoJSON);
    case 'line':
      return length(geoJSON);
    case 'area':
      return area(geoJSON);
    default:
      throw new Error('size: Unresolved type.');
  }
};
