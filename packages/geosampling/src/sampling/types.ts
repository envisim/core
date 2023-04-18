import type {IPropertyRecord} from '@envisim/geojson-utils';
import type {Random} from '@envisim/random';

export interface ISampleStratification {
  collection: GeoJSON.FeatureCollection;
  validProps: IPropertyRecord;
}

interface ISampleOptionsBase {
  rand: Random;
  sampleSize: number;
  probabilitiesFrom?: string | null;
}

export interface ISampleOptionsFinite extends ISampleOptionsBase {
  spreadOn?: string[];
  balanceOn?: string[];
}

export interface ISampleOptionsContinuous extends ISampleOptionsBase {
  shape?: GeoJSON.Feature;
  shapeRotationRandom?: boolean;
}

export interface IPropsStratification {
  /** The {@link ILayer.propCategories} to perform the stratification on. */
  stratify: string;
  /** An array with expected sample size for each value defined on the {@link ILayerCategory}. */
  sampleSize: number[];
}
