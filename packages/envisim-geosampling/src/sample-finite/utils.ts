import {
  type AreaObject,
  type CategoricalProperty,
  FeatureCollection,
  type LineObject,
  type NumericalProperty,
  type PointObject,
  PropertyRecord,
} from '@envisim/geojson-utils';
import {bbox4, longitudeCenter} from '@envisim/geojson-utils';
import {ColumnVector, Matrix} from '@envisim/matrix';

import type {SampleFiniteOptions} from './sample-finite.js';

/**
 * Get a numerical property as a ColumnVector
 * @param collection
 * @param property
 */
function extractNumericalProperty(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  property: NumericalProperty,
): ColumnVector {
  const N = collection.size();
  const vec = Array.from<number>({length: N});
  collection.forEachProperty(property.id, (v, i) => (vec[i] = v as number));
  return new ColumnVector(vec, true);
}

/**
 * Get a categorical property as an array of ColumnVectors, where the
 * length of the array is the number of non-all-zero categories.
 * @param collection
 * @param property
 */
function extractCategoricalProperty(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  property: CategoricalProperty,
): ColumnVector[] {
  const N = collection.size();
  const props: ColumnVector[] = [];

  for (const rv of property.values) {
    const cv = Array.from<number>({length: N});
    let allZeros: boolean = true;

    collection.forEachProperty(property.id, (x, j) => {
      if (rv === x) {
        allZeros = false;
        cv[j] = 1.0;
      } else {
        cv[j] = 0.0;
      }
    });

    if (!allZeros) {
      props.push(new ColumnVector(cv, true));
    }
  }
  return props;
}

/**
 * Get a matrix of variables to spread the sample on.
 * Categorical properties with h categories are collected
 * as h-1 columns of indicators. Numerical properties are
 * standardized.
 *
 * @param collection
 * @param properties array of properties to spread on.
 * @param spreadGeo if true includes spatial coordinates.
 */
export function spreadMatrixFromLayer(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  properties: string[],
  spreadGeo: boolean = true,
): Matrix {
  const rec = collection.propertyRecord;

  const newprops: ColumnVector[] = [];

  if (spreadGeo) {
    // For now use center of bbox for longitude and latitude
    const N = collection.size();
    const lon = Array.from<number>({length: N});
    const lat = Array.from<number>({length: N});
    const alt = Array.from<number>({length: N}).fill(0.0);
    let hasAlt = false;

    collection.forEach((f, i) => {
      const bbox = f.geometry.getBBox();
      const box4 = bbox4(bbox);
      lat[i] = (box4[1] + box4[3]) / 2.0;
      lon[i] = longitudeCenter(box4[0], box4[2]);
      if (bbox.length === 6) {
        hasAlt = true;
        alt[i] = (bbox[5] + bbox[2]) / 2.0;
      }
    });

    newprops.push(new ColumnVector(lon, true).standardize(false, true));
    newprops.push(new ColumnVector(lat, true).standardize(false, true));

    if (hasAlt) {
      newprops.push(new ColumnVector(alt, true).standardize(false, true));
    }
  }

  properties.forEach((id) => {
    const prop = rec.getId(id);

    // Collect numerical properties and standardize
    // ignore constant variables.
    if (PropertyRecord.propertyIsNumerical(prop)) {
      const vec = extractNumericalProperty(collection, prop);
      if (vec.sd() > 0.0) {
        newprops.push(vec.standardize(false, true));
      }
    }

    // Collect categorical properties a set of 0-1 vectors
    if (PropertyRecord.propertyIsCategorical(prop)) {
      const arr = extractCategoricalProperty(collection, prop);
      // skip last column
      for (let i = 0; i < arr.length - 1; i++) {
        newprops.push(arr[i]);
      }
    }

    throw new Error('all properties not present on property record');
  });

  return Matrix.cbind(...newprops);
}

/**
 * Get a matrix of variables to balance the sample on.
 * A constant is automatically included as the last balancing variable.
 * If unequal probabilities, then the same property as used for
 * inclusion probabilities should be included as the first
 * property if a fixed sample size is desired.
 * @param collection
 * @param properties an array of properties to balance on.
 */
export function balancingMatrixFromLayer(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  properties: string[],
): Matrix {
  const rec = collection.propertyRecord;

  const newprops: ColumnVector[] = [];

  // Always balance on a constant
  const N = collection.size();
  newprops.push(new ColumnVector(Array.from<number>({length: N}).fill(1.0), true));

  properties.forEach((id) => {
    const prop = rec.getId(id);

    // Collect numerical properties, no standardization here
    if (PropertyRecord.propertyIsNumerical(prop)) {
      const vec = extractNumericalProperty(collection, prop);
      // Ignore constant variable here
      if (vec.sd() > 0.0) {
        newprops.push(vec);
      }
    }

    // Collect categorical properties a set of 0-1 vectors
    if (PropertyRecord.propertyIsCategorical(prop)) {
      const arr = extractCategoricalProperty(collection, prop);
      // skip last column
      for (let i = 0; i < arr.length - 1; i++) {
        newprops.push(arr[i]);
      }
    }

    throw new Error('all properties not present on property record');
  });

  return Matrix.cbind(...newprops);
}

/**
 * Returns a vector of ones as the inclusion probabilities, if probabilitiesFrom is not set
 */
function probsFromLayer(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  {probabilitiesFrom, probabilitiesFromSize}: SampleFiniteOptions,
): ColumnVector {
  let probs: ColumnVector;

  if (probabilitiesFromSize !== undefined) {
    // Probabilities from the size of the features
    const sizes: number[] = collection.features.map((f) => f.geometry.measure());
    probs = new ColumnVector(sizes);
  } else {
    // Probabilities from numerical property

    const prop = collection.propertyRecord.getId(probabilitiesFrom);

    if (prop === null) {
      return ColumnVector.create(1.0, collection.size());
    } else if (!PropertyRecord.propertyIsNumerical(prop)) {
      throw new TypeError('probabilitiesFrom must be numerical');
    }

    probs = extractNumericalProperty(collection, prop);
  }

  // OR set to 0.0?
  if (!probs.every((e) => e >= 0.0)) throw new Error('the selected property has negative values');

  return probs;
}

/**
 * Computes the drawing propabilities from a layer and options.
 *
 * @param collection
 * @param options
 */
export function drawprobsFromLayer(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  options: SampleFiniteOptions,
): ColumnVector {
  const probs = probsFromLayer(collection, options);
  const sum = probs.sum();

  return probs.map((e) => e / sum, true);
}

/**
 * Computes the inclusion propabilities from a layer and options.
 *
 * @param collection
 * @param options
 */
export function inclprobsFromLayer(
  collection: FeatureCollection<AreaObject | LineObject | PointObject>,
  options: SampleFiniteOptions,
): ColumnVector {
  if (options.sampleSize <= 0) throw new RangeError('sampleSize is <= 0');
  const x = probsFromLayer(collection, options);
  let n = Math.round(options.sampleSize);
  const N = collection.size();

  let sum: number;
  let failed: boolean = true;
  // The return vector
  const ips = new ColumnVector(Array.from<number>({length: N}).fill(0.0), true);

  /*
   * Continue this loop while there are still units to decide
   * The failed flag will be true if any nx / X > 1
   * where X is sum(x)
   */
  while (n > 0 && failed) {
    failed = false;
    // Calculate X for all remaining units
    sum = x.reduce((tot, e, i) => (ips.at(i) === 1.0 ? tot : tot + e), 0.0);

    x
      // Map x to nx/X
      .map((e) => (n * e) / sum)
      /*
       * For each element in x, update ips
       * If ips already is 1.0, ignore it
       * If nx/X >= 1.0, remove one from n, and set ips = 1.0
       * If nx/X > 1.0, we need to do another loop
       * Otherwise, set ips to nx/X
       */
      .forEach((e, i) => {
        if (ips.at(i) === 1.0) {
          return;
        }
        if (e > 1.0) {
          n--;
          failed = true;
          ips.ed(i, 1.0);
        } else if (e === 1.0) {
          n--;
          ips.ed(i, 1.0);
        } else {
          ips.ed(i, e);
        }
        return;
      });
  }

  return ips;
}
