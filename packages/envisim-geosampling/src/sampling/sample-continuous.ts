import {
  AreaCollection,
  AreaFeature,
  type GeoJSON as GJ,
  Layer,
  LineCollection,
  LineFeature,
  PointCollection,
  PointFeature,
} from '@envisim/geojson-utils';

import {
  type SampleBeltsOnAreasOptions,
  type SampleFeaturesOnAreasOptions,
  SamplePointsOnLinesOptions,
  type SampleSystematicLinesOnAreasOptions,
  sampleFeaturesOnAreas,
  samplePointsOnLines,
  sampleSystematicBeltsOnAreas,
  sampleSystematicLinesOnAreas,
} from '../sample-continuous/index.js';

interface SampleAreaToAreaFeatureOptions
  extends SampleFeaturesOnAreasOptions<GJ.AreaFeature> {
  methodName: 'area-feature';
}
interface SampleAreaToBeltOptions extends SampleBeltsOnAreasOptions {
  methodName: 'systematic-belt';
}

export type SampleAreaToAreaOptions =
  | SampleAreaToAreaFeatureOptions
  | SampleAreaToBeltOptions;

export function sampleAreaToArea(
  layer: Layer<AreaCollection>,
  opts: SampleAreaToAreaOptions,
): Layer<AreaCollection> {
  switch (opts.methodName) {
    case 'systematic-belt':
      return sampleSystematicBeltsOnAreas(layer, opts);
    case 'area-feature':
      return sampleFeaturesOnAreas(layer, opts);
    default:
      throw new Error('methodName does not match available methods');
  }
}

interface SampleAreaToLineFeatureOptions
  extends SampleFeaturesOnAreasOptions<GJ.LineFeature> {
  methodName: 'line-feature';
}
interface SampleAreaToSystematicLineOptions
  extends SampleSystematicLinesOnAreasOptions {
  methodName: 'systematic-line';
}

export type SampleAreaToLineOptions =
  | SampleAreaToLineFeatureOptions
  | SampleAreaToSystematicLineOptions;

export function sampleAreaToLine(
  layer: Layer<AreaCollection>,
  opts: SampleAreaToLineOptions,
): Layer<LineCollection> {
  switch (opts.methodName) {
    case 'systematic-line':
      return sampleSystematicLinesOnAreas(layer, opts);
    case 'line-feature':
      return sampleFeaturesOnAreas(layer, opts);
    default:
      throw new Error('methodName does not match available methods');
  }
}

export interface SampleAreaToPointOptions
  extends SampleFeaturesOnAreasOptions<GJ.PointFeature> {}

export function sampleAreaToPoint(
  layer: Layer<AreaCollection>,
  opts: SampleAreaToPointOptions,
): Layer<PointCollection> {
  return sampleFeaturesOnAreas(layer, opts);
}

export interface SampleLineToPointOptions extends SamplePointsOnLinesOptions {}

export function sampleLineToPoint(
  layer: Layer<LineCollection>,
  opts: SampleLineToPointOptions,
): Layer<PointCollection> {
  return samplePointsOnLines(layer, opts);
}

export interface SampleLineToPointStratified {
  stratifyOn: string;
  strataOptions: SampleLineToPointOptions | SampleLineToPointOptions[];
}

// Stratification for each method.

export function sampleLineToPointStratified(
  layer: Layer<LineCollection>,
  opts: SampleLineToPointStratified,
): Layer<PointCollection> {
  const stratifyOn = opts.stratifyOn;
  if (!(stratifyOn in layer.propertyRecord))
    throw new Error(
      'stratification is not possible as property record does not contain the required property',
    );

  // The current property object.
  const propertyObj = layer.propertyRecord[stratifyOn];

  // We only allow stratification on categorical variables.
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  // Make an array of opts if it is not provided as an array.
  const fixedOpts = Array.isArray(opts)
    ? opts
    : new Array(propertyObj.values.length).fill(opts);

  // Make sure it is of correct length.
  if (fixedOpts.length !== propertyObj.values.length) {
    throw new Error(
      'length of provided opts array does not match number of strata',
    );
  }

  /*
   * For each value of the property, run sampleLineToPoint.
   * Merge the returning features into a single array.
   */
  let features: PointFeature[] = [];
  let sampleLayer = new Layer(new PointCollection({features}, true), {}, true);

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new LineCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    sampleLayer = sampleLineToPoint(
      stratumLayer,
      fixedOpts[i] as SampleLineToPointOptions,
    );

    features = [...features, ...sampleLayer.collection.features];
  });
  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new PointCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}

export interface SampleAreaToPointStratified {
  stratifyOn: string;
  strataOptions: SampleAreaToPointOptions | SampleAreaToPointOptions[];
}

export function sampleAreaToPointStratified(
  layer: Layer<AreaCollection>,
  opts: SampleAreaToPointStratified,
): Layer<PointCollection> {
  const stratifyOn = opts.stratifyOn;
  if (!(stratifyOn in layer.propertyRecord))
    throw new Error(
      'stratification is not possible as property record does not contain the required property',
    );

  // The current property object.
  const propertyObj = layer.propertyRecord[stratifyOn];

  // We only allow stratification on categorical variables.
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  // Make an array of opts if it is not provided as an array.
  const fixedOpts = Array.isArray(opts)
    ? opts
    : new Array(propertyObj.values.length).fill(opts);

  // Make sure it is of correct length.
  if (fixedOpts.length !== propertyObj.values.length) {
    throw new Error(
      'length of provided opts array does not match number of strata',
    );
  }

  /*
   * For each value of the property, run sampleAreaToPoint.
   * Merge the returning features into a single array.
   */
  let features: PointFeature[] = [];
  let sampleLayer = new Layer(new PointCollection({features}, true), {}, true);

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new AreaCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    sampleLayer = sampleAreaToPoint(
      stratumLayer,
      fixedOpts[i] as SampleAreaToPointOptions,
    );

    features = [...features, ...sampleLayer.collection.features];
  });

  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new PointCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}

export interface SampleAreaToAreaStratifiedOptions {
  stratifyOn: string;
  strataOptions: SampleAreaToAreaOptions | SampleAreaToAreaOptions[];
}

export function sampleAreaToAreaStratified(
  layer: Layer<AreaCollection>,
  opts: SampleAreaToAreaStratifiedOptions,
): Layer<AreaCollection> {
  const stratifyOn = opts.stratifyOn;
  if (!(stratifyOn in layer.propertyRecord))
    throw new Error(
      'stratification is not possible as property record does not contain the required property',
    );

  // The current property object.
  const propertyObj = layer.propertyRecord[stratifyOn];

  // We only allow stratification on categorical variables.
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  // Make an array of opts if it is not provided as an array.
  const fixedOpts = Array.isArray(opts)
    ? opts
    : new Array(propertyObj.values.length).fill(opts);

  // Make sure it is of correct length.
  if (fixedOpts.length !== propertyObj.values.length) {
    throw new Error(
      'length of provided opts array does not match number of strata',
    );
  }

  /*
   * For each value of the property, run sampleAreaToArea.
   * Merge the returning features into a single array.
   */
  let features: AreaFeature[] = [];
  let sampleLayer = new Layer(new AreaCollection({features}, true), {}, true);

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new AreaCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    sampleLayer = sampleAreaToArea(
      stratumLayer,
      fixedOpts[i] as SampleAreaToAreaOptions,
    );

    features = [...features, ...sampleLayer.collection.features];
  });

  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new AreaCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}

export interface SampleAreaToLineStratified {
  stratifyOn: string;
  strataOptions: SampleAreaToLineOptions | SampleAreaToLineOptions[];
}

export function sampleAreaToLineStratified(
  layer: Layer<AreaCollection>,
  opts: SampleAreaToLineStratified,
): Layer<LineCollection> {
  const stratifyOn = opts.stratifyOn;
  if (!(stratifyOn in layer.propertyRecord))
    throw new Error(
      'stratification is not possible as property record does not contain the required property',
    );

  // The current property object.
  const propertyObj = layer.propertyRecord[stratifyOn];

  // We only allow stratification on categorical variables.
  if (propertyObj.type !== 'categorical')
    throw new Error(
      'stratification is only possible to perform on categorical properties',
    );

  // Make an array of opts if it is not provided as an array.
  const fixedOpts = Array.isArray(opts)
    ? opts
    : new Array(propertyObj.values.length).fill(opts);

  // Make sure it is of correct length.
  if (fixedOpts.length !== propertyObj.values.length) {
    throw new Error(
      'length of provided opts array does not match number of strata',
    );
  }

  /*
   * For each value of the property, run sampleAreaToLine.
   * Merge the returning features into a single array.
   */
  let features: LineFeature[] = [];
  let sampleLayer = new Layer(new LineCollection({features}, true), {}, true);

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new AreaCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    sampleLayer = sampleAreaToLine(
      stratumLayer,
      fixedOpts[i] as SampleAreaToLineOptions,
    );

    features = [...features, ...sampleLayer.collection.features];
  });

  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new LineCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}
