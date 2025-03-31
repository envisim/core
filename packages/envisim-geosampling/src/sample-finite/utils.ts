import {
  type CategoricalProperty,
  type FeatureCollection,
  type NumericalProperty,
  PropertyRecord,
  type PureObject,
} from "@envisim/geojson";
import { bbox4, longitudeCenter } from "@envisim/geojson-utils";
import { Matrix, Vector } from "@envisim/matrix";
import { type OptionsBase } from "./options.js";

/**
 * Get a numerical property as a Vector
 * @param collection
 * @param property
 */
function extractNumericalProperty<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  property: NumericalProperty<P>,
): Vector {
  return new Vector(
    Array.from(collection.features, (f) => f.getProperty(property.id) as number),
    true,
  );
}

/**
 * Get a categorical property as an array of Vectors, where the
 * length of the array is the number of non-all-zero categories.
 * @param collection
 * @param property
 */
function extractCategoricalProperty<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  property: CategoricalProperty<P>,
): Vector[] {
  const N = collection.size();
  const props: Vector[] = [];

  if (N === 0) return props;

  for (const rv of property.values) {
    let sum = 0;

    const cv = Array.from(collection.features, (f) => {
      if (f.getProperty(property.id) === rv) {
        sum += 1;
        return 1;
      } else {
        sum -= 1;
        return 0;
      }
    });

    if (-N < sum && sum < N) {
      props.push(new Vector(cv, true));
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
export function spreadMatrixFromLayer<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  properties: P[],
  spreadGeo: boolean = true,
): Matrix {
  const rec = collection.propertyRecord;

  const newprops: Vector[] = [];

  if (spreadGeo) {
    // For now use center of bbox for longitude and latitude
    const N = collection.size();
    const lon = Array.from<number>({ length: N });
    const lat = Array.from<number>({ length: N });
    const alt = Array.from<number>({ length: N }).fill(0.0);
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

    newprops.push(new Vector(lon, true).standardize(false, true));
    newprops.push(new Vector(lat, true).standardize(false, true));

    if (hasAlt) {
      newprops.push(new Vector(alt, true).standardize(false, true));
    }
  }

  properties.forEach((id) => {
    const prop = rec.getId(id);

    // Collect numerical properties and standardize
    // ignore constant variables.
    if (PropertyRecord.isNumerical(prop)) {
      const vec = extractNumericalProperty(collection, prop);
      if (vec.sd() > 0.0) {
        newprops.push(vec.standardize(false, true));
      }
    } else if (PropertyRecord.isCategorical(prop)) {
      // Collect categorical properties a set of 0-1 vectors
      const arr = extractCategoricalProperty(collection, prop);
      // skip last column
      for (let i = 0; i < arr.length - 1; i++) {
        newprops.push(arr[i]);
      }
    } else {
      throw new Error("all properties not present on property record");
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
 * @param collection
 * @param properties an array of properties to balance on.
 */
export function balancingMatrixFromLayer<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  properties: P[],
): Matrix {
  const rec = collection.propertyRecord;

  const newprops: Vector[] = [];

  // Always balance on a constant
  const N = collection.size();
  newprops.push(new Vector(Array.from<number>({ length: N }).fill(1.0), true));

  properties.forEach((id) => {
    const prop = rec.getId(id);

    // Collect numerical properties, no standardization here
    if (PropertyRecord.isNumerical(prop)) {
      const vec = extractNumericalProperty(collection, prop);
      // Ignore constant variable here
      if (vec.sd() > 0.0) {
        newprops.push(vec);
      }
    } else if (PropertyRecord.isCategorical(prop)) {
      // Collect categorical properties a set of 0-1 vectors
      const arr = extractCategoricalProperty(collection, prop);
      // skip last column
      for (let i = 0; i < arr.length - 1; i++) {
        newprops.push(arr[i]);
      }
    } else {
      throw new Error("all properties not present on property record");
    }
  });

  return Matrix.cbind(...newprops);
}

/**
 * Returns a vector of ones as the inclusion probabilities, if probabilitiesFrom is not set
 */
function probsFromLayer<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  { probabilities }: OptionsBase<P>, // already checked
): Vector {
  let probs: Vector;

  if (probabilities === "_measure") {
    // Probabilities from the size of the features
    const sizes: number[] = collection.features.map((f) => f.geometry.measure());
    probs = new Vector(sizes);
  } else {
    // Probabilities from numerical property

    const prop = collection.propertyRecord.getId(probabilities);

    if (prop === null) {
      return Vector.create(1.0, collection.size());
    } else if (!PropertyRecord.isNumerical(prop)) {
      throw new TypeError("probabilitiesFrom must be numerical");
    }

    probs = extractNumericalProperty(collection, prop);
  }

  // OR set to 0.0?
  if (!probs.every((e) => e >= 0.0)) throw new Error("the selected property has negative values");

  return probs;
}

/**
 * Computes the drawing propabilities from a layer and options.
 *
 * @param collection
 * @param options
 */
export function drawprobsFromLayer<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  options: OptionsBase<P>, // already checked
): Vector {
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
export function inclprobsFromLayer<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  options: OptionsBase<P>, // already checked
): number[] {
  const N = collection.size();

  if (options.probabilities === undefined) {
    return Array.from<number>({ length: N }).fill(options.sampleSize / N);
  }

  const x = probsFromLayer(collection, options);
  let n = Math.round(options.sampleSize);

  let sum: number;
  let failed: boolean = true;
  // The return vector
  const ips = new Vector(Array.from<number>({ length: N }).fill(0.0), true);

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

  return ips.slice();
}

export function returnCollectionFromSample<G extends PureObject, P extends string>(
  collection: FeatureCollection<G, P>,
  sample: number[],
  probabilities: number[],
): FeatureCollection<G, P> {
  const newCollection = collection.copyEmpty(false);

  sample.forEach((i) => {
    newCollection.addGeometry(
      collection.features[i].geometry,
      {
        ...collection.features[i].properties,
        _designWeight: collection.features[i].getSpecialPropertyDesignWeight() / probabilities[i],
      },
      false,
    );
  });

  return newCollection;
}
