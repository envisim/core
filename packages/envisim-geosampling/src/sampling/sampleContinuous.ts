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
import {type Random} from '@envisim/random';
import {copy} from '@envisim/utils';

import {
  type TsampleTractsOnAreasOpts,
  sampleFeaturesOnAreas,
} from '../sampleFeaturesOnAreas.js';
import {samplePointsOnLines} from '../samplePointsOnLines.js';
import {
  type TsampleBeltsOnAreasOpts,
  sampleSystematicBeltsOnAreas,
} from '../sampleSystematicBeltsOnAreas.js';
import {
  type TsampleLinesOnAreasOpts,
  sampleSystematicLinesOnAreas,
} from '../sampleSystematicLinesOnAreas.js';

interface ISampleAreaFeaturesOnAreasOpts extends TsampleTractsOnAreasOpts {
  modelFeature: GJ.AreaFeature;
  design: 'uniform' | 'systematic';
  sampleSize: number;
  methodName: 'areaFeature';
}

interface ISampleBeltsOnAreasOpts extends TsampleBeltsOnAreasOpts {
  distBetween: number;
  halfWidth: number;
  methodName: 'systematicBelt';
}

export type TsampleAreaToAreaOpts =
  | ISampleAreaFeaturesOnAreasOpts
  | ISampleBeltsOnAreasOpts;

export function sampleAreaToArea(
  layer: Layer<AreaCollection>,
  opts: TsampleAreaToAreaOpts,
): Layer<AreaCollection> {
  if (opts.methodName === 'systematicBelt') {
    return sampleSystematicBeltsOnAreas(
      layer,
      opts.distBetween,
      opts.halfWidth,
      opts,
    );
  }
  if (opts.methodName == 'areaFeature') {
    return sampleFeaturesOnAreas(
      layer,
      opts.design,
      opts.sampleSize,
      opts.modelFeature,
      opts,
    );
  }
  throw new Error(
    'methodName does not match available methods belt or areaFeature',
  );
}

interface ISampleLinesOnAreasOpts extends TsampleLinesOnAreasOpts {
  distBetween: number;
  methodName: 'systematicLine';
}

interface ISampleLineFeaturesOnAreasOpts extends TsampleTractsOnAreasOpts {
  modelFeature: GJ.LineFeature;
  design: 'uniform' | 'systematic';
  sampleSize: number;
  methodName: 'lineFeature';
}

export type TsampleAreaToLineOpts =
  | ISampleLineFeaturesOnAreasOpts
  | ISampleLinesOnAreasOpts;

export function sampleAreaToLine(
  layer: Layer<AreaCollection>,
  opts: TsampleAreaToLineOpts,
): Layer<LineCollection> {
  if (opts.methodName === 'systematicLine') {
    return sampleSystematicLinesOnAreas(layer, opts.distBetween, opts);
  }
  if (opts.methodName == 'lineFeature') {
    return sampleFeaturesOnAreas(
      layer,
      opts.design,
      opts.sampleSize,
      opts.modelFeature,
      opts,
    );
  }
  throw new Error(
    'methodName does not match available methods systematicLine or lineFeature',
  );
}

interface ISamplePointFeaturesOnAreasOpts extends TsampleTractsOnAreasOpts {
  modelFeature: GJ.PointFeature;
  design: 'uniform' | 'systematic';
  sampleSize: number;
}
export type TsampleAreaToPointOpts = ISamplePointFeaturesOnAreasOpts;

export function sampleAreaToPoint(
  layer: Layer<AreaCollection>,
  opts: TsampleAreaToPointOpts,
): Layer<PointCollection> {
  return sampleFeaturesOnAreas(
    layer,
    opts.design,
    opts.sampleSize,
    opts.modelFeature,
    opts,
  );
}

export type TsampleLineToPointOpts = {
  design: 'uniform' | 'systematic';
  sampleSize: number;
  rand?: Random;
};

export function sampleLineToPoint(
  layer: Layer<LineCollection>,
  opts: TsampleLineToPointOpts,
): Layer<PointCollection> {
  return samplePointsOnLines(layer, opts.design, opts.sampleSize, opts);
}

// Stratification for each method.

export function sampleLineToPointStratified(
  layer: Layer<LineCollection>,
  stratifyOn: string,
  opts: TsampleLineToPointOpts | TsampleLineToPointOpts[],
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

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new LineCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    const sampledFeatures = sampleLineToPoint(stratumLayer, fixedOpts[i])
      .collection.features;

    features = [...features, ...sampledFeatures];
  });

  return new Layer(
    new PointCollection({features}, true),
    copy(layer.propertyRecord),
    true,
  );
}

export function sampleAreaToPointStratified(
  layer: Layer<AreaCollection>,
  stratifyOn: string,
  opts: TsampleAreaToPointOpts | TsampleAreaToPointOpts[],
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

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new AreaCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    const sampledFeatures = sampleAreaToPoint(stratumLayer, fixedOpts[i])
      .collection.features;

    features = [...features, ...sampledFeatures];
  });

  return new Layer(
    new PointCollection({features}, true),
    copy(layer.propertyRecord),
    true,
  );
}

export function sampleAreaToAreaStratified(
  layer: Layer<AreaCollection>,
  stratifyOn: string,
  opts:
    | TsampleAreaToAreaOpts
    | ISampleAreaFeaturesOnAreasOpts[]
    | ISampleBeltsOnAreasOpts[],
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

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new AreaCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    const sampledFeatures = sampleAreaToArea(stratumLayer, fixedOpts[i])
      .collection.features;

    features = [...features, ...sampledFeatures];
  });

  return new Layer(
    new AreaCollection({features}, true),
    copy(layer.propertyRecord),
    true,
  );
}

export function sampleAreaToLineStratified(
  layer: Layer<AreaCollection>,
  stratifyOn: string,
  opts:
    | TsampleAreaToLineOpts
    | ISampleLineFeaturesOnAreasOpts[]
    | ISampleLinesOnAreasOpts[],
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

  propertyObj.values.forEach((_v, i) => {
    const stratumFeatures = layer.collection.features.filter(
      (f) => f.properties[stratifyOn] === i,
    );

    const stratumLayer = new Layer(
      new AreaCollection({features: stratumFeatures}, true),
      layer.propertyRecord,
      true,
    );

    const sampledFeatures = sampleAreaToLine(stratumLayer, fixedOpts[i])
      .collection.features;

    features = [...features, ...sampledFeatures];
  });

  return new Layer(
    new LineCollection({features}, true),
    copy(layer.propertyRecord),
    true,
  );
}
