import {
  CategoricalProperty,
  FeatureCollection,
  PropertyRecord,
  PureObject,
} from '@envisim/geojson-utils';

import {SAMPLE_ERROR_LIST, SampleError, throwRangeError} from './options.js';
import {SAMPLE_BALANCED_METHODS, SampleBalancedOptions, sampleBalanced} from './sample-balanced.js';
import {
  SAMPLE_DOUBLY_BALANCED_METHODS,
  SampleDoublyBalancedOptions,
  sampleDoublyBalanced,
} from './sample-doubly-balanced.js';
import {
  SAMPLE_FINITE_METHODS_WOR,
  SAMPLE_FINITE_METHODS_WR,
  SampleFiniteOptions,
  SampleFiniteOptionsWr,
  sampleFinite,
  sampleFiniteWr,
} from './sample-finite.js';
import {
  SAMPLE_SPATIALLY_BALANCED_METHODS,
  SampleSpatiallyBalancedOptions,
  sampleSpatiallyBalanced,
} from './sample-spatially-balanced.js';

type SampleFiniteOptionsUnion =
  | SampleFiniteOptions
  | SampleFiniteOptionsWr
  | SampleBalancedOptions
  | SampleSpatiallyBalancedOptions
  | SampleDoublyBalancedOptions;

export interface SampleFiniteStratifiedOptions<P extends string> {
  property: P;
  options: SampleFiniteOptionsUnion[];
}

export function sampleFiniteStratifiedOptionsCheck<P extends string>(
  options: SampleFiniteStratifiedOptions<P>,
  propertyRecord: PropertyRecord<P>,
): SampleError {
  const property = propertyRecord.getId(options.property);

  if (property === null) {
    // stratify must exist on propertyRecord
    return SAMPLE_ERROR_LIST.STRATIFY_MISSING;
  } else if (!PropertyRecord.isCategorical(property)) {
    // stratify prop must be categorical -- no stratification on numerical
    return SAMPLE_ERROR_LIST.STRATIFY_NOT_CATEGORICAL;
  } else if (property.values.length === 0) {
    // stratify prop must have values
    return SAMPLE_ERROR_LIST.STRATIFY_NO_VALUES;
  } else if (Array.isArray(options) && options.length !== property.values.length) {
    // if options is an array, the length must match the number of prop values
    return SAMPLE_ERROR_LIST.STRATIFY_OPTIONS_LENGTH_MISMATCH;
  }

  return null;
}

export function sampleFiniteStratified<T extends PureObject, P extends string>(
  collection: FeatureCollection<T, P>,
  options: SampleFiniteStratifiedOptions<P>,
): FeatureCollection<T, P> {
  throwRangeError(sampleFiniteStratifiedOptionsCheck(options, collection.propertyRecord));

  function getOption(i: number) {
    return options.options.at(i) ?? options.options[0];
  }

  // Already checked that it exists
  const property = collection.propertyRecord.getId(options.property) as CategoricalProperty<P>;
  const newCollection = collection.copyEmpty();

  property.values.forEach((v, i) => {
    const filteredCollection = collection.copyEmpty();
    collection.features.forEach((f) => {
      if (f.properties[options.property] !== v) return;
      filteredCollection.addFeature(f, true);
    });

    const o = getOption(i);

    if ((SAMPLE_FINITE_METHODS_WOR as ReadonlyArray<string>).includes(o.method)) {
      newCollection.appendFeatureCollection(
        sampleFinite(filteredCollection, o as SampleFiniteOptions<P>),
      );
    } else if ((SAMPLE_FINITE_METHODS_WR as ReadonlyArray<string>).includes(o.method)) {
      newCollection.appendFeatureCollection(
        sampleFiniteWr(filteredCollection, o as SampleFiniteOptionsWr<P>),
      );
    } else if ((SAMPLE_BALANCED_METHODS as ReadonlyArray<string>).includes(o.method)) {
      newCollection.appendFeatureCollection(
        sampleBalanced(filteredCollection, o as SampleBalancedOptions<P>),
      );
    } else if ((SAMPLE_SPATIALLY_BALANCED_METHODS as ReadonlyArray<string>).includes(o.method)) {
      newCollection.appendFeatureCollection(
        sampleSpatiallyBalanced(filteredCollection, o as SampleSpatiallyBalancedOptions<P>),
      );
    } else if ((SAMPLE_DOUBLY_BALANCED_METHODS as ReadonlyArray<string>).includes(o.method)) {
      newCollection.appendFeatureCollection(
        sampleDoublyBalanced(filteredCollection, o as SampleDoublyBalancedOptions<P>),
      );
    }
  });

  return newCollection;
}
