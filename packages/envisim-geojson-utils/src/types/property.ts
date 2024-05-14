interface IPropertyBase {
  /** The UUID of the Features property using this category. */
  id: string;
  type: string;
  /** A human-friendly name */
  name?: string;
}

export interface INumericalProperty extends IPropertyBase {
  type: 'numerical';
}

export interface ICategoricalProperty extends IPropertyBase {
  type: 'categorical';
  /** An ordered array of values defined on this category */
  values: string[];
}

export type IProperty = INumericalProperty | ICategoricalProperty;

export type IPropertyRecord = Record<string, IProperty>;

export const PropertySpecialKeys = [
  '_designWeight',
  '_parent',
  '_randomRotation',
  '_distance',
];
