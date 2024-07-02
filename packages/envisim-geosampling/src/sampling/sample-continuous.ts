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
  type SampleBeltOnAreaOptions,
  type SampleFeatureOptions,
  type SamplePointOptions,
  type SampleSystematicLineOnAreaOptions,
  sampleFeaturesOnAreas,
  samplePointsOnLines,
  sampleSystematicBeltsOnAreas,
  sampleSystematicLinesOnAreas,
} from '../sample-continuous/index.js';

interface SampleStratified<O> {
  stratifyOn: string;
  strataOptions: O | O[];
}

interface SampleOptions<M extends string, O> {
  method: M;
  options: O;
}

type SampleAreaToAreaOptions =
  | SampleOptions<'area-feature', SampleFeatureOptions<GJ.AreaFeature>>
  | SampleOptions<'systematic-belt', SampleBeltOnAreaOptions>;

export function sampleAreaToArea(
  layer: Layer<AreaCollection>,
  {method, options}: SampleAreaToAreaOptions,
): Layer<AreaCollection> {
  switch (method) {
    case 'area-feature':
      return sampleFeaturesOnAreas(layer, options);
    case 'systematic-belt':
      return sampleSystematicBeltsOnAreas(layer, options);
    default:
      throw new Error('method does not match available methods');
  }
}

type SampleAreaToLineOptions =
  | SampleOptions<'line-feature', SampleFeatureOptions<GJ.LineFeature>>
  | SampleOptions<'systematic-line', SampleSystematicLineOnAreaOptions>;

export function sampleAreaToLine(
  layer: Layer<AreaCollection>,
  {method, options}: SampleAreaToLineOptions,
): Layer<LineCollection> {
  switch (method) {
    case 'line-feature':
      return sampleFeaturesOnAreas(layer, options);
    case 'systematic-line':
      return sampleSystematicLinesOnAreas(layer, options);
    default:
      throw new Error('methodName does not match available methods');
  }
}

export function sampleAreaToPoint(
  layer: Layer<AreaCollection>,
  opts: SampleFeatureOptions<GJ.PointFeature>,
): Layer<PointCollection> {
  return sampleFeaturesOnAreas(layer, opts);
}

export function sampleLineToPoint(
  layer: Layer<LineCollection>,
  opts: SamplePointOptions,
): Layer<PointCollection> {
  return samplePointsOnLines(layer, opts);
}

// Stratification for each method.

export function sampleLineToPointStratified(
  layer: Layer<LineCollection>,
  {stratifyOn, strataOptions}: SampleStratified<SamplePointOptions>,
): Layer<PointCollection> {
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
  const fixedOpts = Array.isArray(strataOptions)
    ? strataOptions
    : Array.from<SamplePointOptions>({length: propertyObj.values.length}).fill(
        strataOptions,
      );

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

    sampleLayer = sampleLineToPoint(stratumLayer, fixedOpts[i]);

    features = [...features, ...sampleLayer.collection.features];
  });
  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new PointCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}

export function sampleAreaToPointStratified(
  layer: Layer<AreaCollection>,
  {
    stratifyOn,
    strataOptions,
  }: SampleStratified<SampleFeatureOptions<GJ.PointFeature>>,
): Layer<PointCollection> {
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
  const fixedOpts = Array.isArray(strataOptions)
    ? strataOptions
    : Array.from<SampleFeatureOptions<GJ.PointFeature>>({
        length: propertyObj.values.length,
      }).fill(strataOptions);

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

    sampleLayer = sampleAreaToPoint(stratumLayer, fixedOpts[i]);

    features = [...features, ...sampleLayer.collection.features];
  });

  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new PointCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}

export function sampleAreaToAreaStratified(
  layer: Layer<AreaCollection>,
  {stratifyOn, strataOptions}: SampleStratified<SampleAreaToAreaOptions>,
): Layer<AreaCollection> {
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
  const fixedOpts = Array.isArray(strataOptions)
    ? strataOptions
    : Array.from<SampleAreaToAreaOptions>({
        length: propertyObj.values.length,
      }).fill(strataOptions);

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

    sampleLayer = sampleAreaToArea(stratumLayer, fixedOpts[i]);

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
  {stratifyOn, strataOptions}: SampleStratified<SampleAreaToLineOptions>,
): Layer<LineCollection> {
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
  const fixedOpts = Array.isArray(strataOptions)
    ? strataOptions
    : Array.from<SampleAreaToLineOptions>({
        length: propertyObj.values.length,
      }).fill(strataOptions);

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

    sampleLayer = sampleAreaToLine(stratumLayer, fixedOpts[i]);

    features = [...features, ...sampleLayer.collection.features];
  });

  // Recieves propertyRecord from the last sample layer
  return new Layer(
    new LineCollection({features}, true),
    sampleLayer.propertyRecord,
    true,
  );
}
