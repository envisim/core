import {
  AreaCollection,
  Layer,
  LineCollection,
  PointCollection,
} from '@envisim/geojson-utils';
import {bbox4, longitudeCenter} from '@envisim/geojson-utils';
import {ColumnVector, Matrix} from '@envisim/matrix';

import type {SampleFiniteOptions} from './sampleFinite.js';

/**
 * Get a numerical property as a ColumnVector
 * @param layer
 * @param property
 */
function extractNumericalProperty(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  property: string,
): ColumnVector {
  const rec = layer.propertyRecord[property];
  if (!(rec.type === 'numerical')) {
    throw new Error('Expected numerical property');
  }
  const N = layer.collection.size;
  const vec = new Array(N);
  layer.collection.forEachProperty(property, (v, i) => (vec[i] = v));
  return new ColumnVector(vec, true);
}

/**
 * Get a categorical property as an array of ColumnVectors, where the
 * length of the array is the number of non-all-zero categories.
 * @param layer
 * @param property
 */
function extractCategoricalProperty(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  property: string,
): ColumnVector[] {
  const rec = layer.propertyRecord[property];
  if (!(rec.type === 'categorical')) {
    throw new Error('Expected categorical property');
  }
  const N = layer.collection.size;
  const props: ColumnVector[] = [];
  for (let i = 0; i < rec.values.length; i++) {
    const cv = new Array(N);
    let allZeros: boolean = true;
    layer.collection.forEachProperty(property, (x, j) => {
      if (i === x) {
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
 * @param layer
 * @param properties array of properties to spread on.
 * @param spreadGeo if true includes spatial coordinates.
 */
export function spreadMatrixFromLayer(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  properties: string[],
  spreadGeo: boolean = true,
): Matrix {
  const rec = layer.propertyRecord;
  if (!properties.every((prop) => Object.hasOwn(rec, prop)))
    throw new Error('all properties not present on property record');

  const newprops: ColumnVector[] = [];

  if (spreadGeo) {
    // For now use center of bbox for longitude and latitude
    const N = layer.collection.size;
    const lon = new Array(N);
    const lat = new Array(N);
    const alt = new Array(N).fill(0.0);
    let hasAlt = false;

    layer.collection.forEach((f, i) => {
      const bbox = f.getBBox();
      const box4 = bbox4(bbox);
      lat[i] = (box4[1] + box4[3]) / 2;
      lon[i] = longitudeCenter(box4[0], box4[2]);
      if (bbox.length === 6) {
        hasAlt = true;
        alt[i] = (bbox[5] + bbox[2]) / 2;
      }
    });

    newprops.push(new ColumnVector(lon, true).standardize(false, true));
    newprops.push(new ColumnVector(lat, true).standardize(false, true));

    if (hasAlt) {
      newprops.push(new ColumnVector(alt, true).standardize(false, true));
    }
  }
  properties.forEach((prop) => {
    // Collect numerical properties and standardize
    // ignore constant variables.
    if (rec[prop].type === 'numerical') {
      const vec = extractNumericalProperty(layer, prop);
      if (vec.sd() > 0.0) {
        newprops.push(vec.standardize(false, true));
      }
    }
    // Collect categorical properties a set of 0-1 vectors
    if (rec[prop].type === 'categorical') {
      const arr = extractCategoricalProperty(layer, prop);
      // skip last column
      for (let i = 0; i < arr.length - 1; i++) {
        newprops.push(arr[i]);
      }
    }
  });
  return Matrix.cbind(...newprops);
}

/**
 * Get a matrix of variables to balance the sample on.
 * A constant is automatically included as the last balancing variable.
 * If unequal probabilities, then the same property as used for
 * inclusion probabilities should be included as the first
 * property if a fixed sample size is desired.
 * @param layer
 * @param properties an array of properties to balance on.
 */
export function balancingMatrixFromLayer(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  properties: string[],
): Matrix {
  const rec = layer.propertyRecord;
  if (!properties.every((prop) => Object.hasOwn(rec, prop)))
    throw new Error('all properties not present on property record');

  const newprops: ColumnVector[] = [];

  // Always balance on a constant
  const N = layer.collection.size;
  newprops.push(new ColumnVector(new Array(N).fill(1), true));

  properties.forEach((prop) => {
    // Collect numerical properties, no standardization here
    if (rec[prop].type === 'numerical') {
      const vec = extractNumericalProperty(layer, prop);
      // Ignore constant variable here
      if (vec.sd() > 0.0) {
        newprops.push(vec);
      }
    }
    // Collect categorical properties a set of 0-1 vectors
    if (rec[prop].type === 'categorical') {
      const arr = extractCategoricalProperty(layer, prop);
      // skip last column
      for (let i = 0; i < arr.length - 1; i++) {
        newprops.push(arr[i]);
      }
    }
  });

  return Matrix.cbind(...newprops);
}

function probsFromLayer(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  {sampleSize, probabilitiesFrom, probabilitiesFromSize}: SampleFiniteOptions,
): ColumnVector {
  const N = layer.collection.size;
  let prop: ColumnVector;

  if (probabilitiesFromSize) {
    // Probabilities from the size of the features
    let sizes: number[];

    if (AreaCollection.isCollection(layer.collection)) {
      sizes = layer.collection.features.map((feature) => feature.area());
    } else if (LineCollection.isCollection(layer.collection)) {
      sizes = layer.collection.features.map((feature) => feature.length());
    } else {
      sizes = layer.collection.features.map((feature) => feature.count());
    }

    prop = new ColumnVector(sizes);
  } else {
    // Probabilities from numerical property

    if (typeof probabilitiesFrom !== 'string') {
      if (sampleSize <= 0) throw new RangeError('sampleSize is <= 0');
      return new ColumnVector(new Array(N).fill(1), true);
    }

    if (!Object.hasOwn(layer.propertyRecord, probabilitiesFrom))
      throw new RangeError(
        'validProps does not contain a property with the required name',
      );
    if (layer.propertyRecord[probabilitiesFrom].type === 'categorical')
      throw new RangeError(
        'the property to create probabilities from is categorical',
      );

    prop = extractNumericalProperty(layer, probabilitiesFrom);
  }

  // OR set to 0.0?
  if (!prop.every((e) => e >= 0.0))
    throw new Error('the selected property has negative values');

  return prop;
}

/**
 * Computes the drawing propabilities from a layer and options.
 *
 * @param layer
 * @param options
 */
export function drawprobsFromLayer(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  options: SampleFiniteOptions,
): ColumnVector {
  const probs = probsFromLayer(layer, options);
  const sum = probs.sum();

  return probs.map((e) => e / sum, true);
}

/**
 * Computes the inclusion propabilities from a layer and options.
 *
 * @param layer
 * @param options
 */
export function inclprobsFromLayer(
  layer: Layer<AreaCollection | LineCollection | PointCollection>,
  options: SampleFiniteOptions,
): ColumnVector {
  if (options.sampleSize <= 0) throw new RangeError('sampleSize is <= 0');
  const x = probsFromLayer(layer, options);
  let n = Math.round(options.sampleSize);
  const N = layer.collection.size;

  let sum: number;
  let failed: boolean = true;
  // The return vector
  const ips = new ColumnVector(new Array(N).fill(0.0), true);

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
        if (e >= 1.0) {
          n--;
          failed = e > 1.0;
          ips.ed(i, 1.0);
        } else {
          ips.ed(i, e);
        }
        return;
      });
  }

  return ips;
}
