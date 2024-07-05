interface PropertyBase {
  /** The UUID of the Features property using this category. */
  id: string;
  type: string;
  /** A human-friendly name */
  name?: string;
}

export interface NumericalProperty extends PropertyBase {
  type: 'numerical';
  /** Holds id and index of collected categorical variable */
  parent?: [string, number];
}

export interface CategoricalProperty extends PropertyBase {
  type: 'categorical';
  /** An ordered array of values defined on this category */
  values: string[];
}

export type Property = NumericalProperty | CategoricalProperty;

export type PropertyRecord = Record<string, Property>;

export const PropertySpecialKeys = [
  '_designWeight',
  '_distance',
  '_parent',
  '_randomRotation',
] as const;
