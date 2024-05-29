import {
  AreaCollection,
  type GeoJSON as GJ,
  Layer,
  LineCollection,
  PointCollection,
} from '@envisim/geojson-utils';
import {type Random} from '@envisim/random';

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
  methodName: 'belt';
}

export type TsampleAreaToAreaOpts =
  | ISampleAreaFeaturesOnAreasOpts
  | ISampleBeltsOnAreasOpts;

export function sampleAreaToArea(
  layer: Layer<AreaCollection>,
  opts: TsampleAreaToAreaOpts,
): Layer<AreaCollection> {
  if (opts.methodName === 'belt') {
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
  methodName: 'line';
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
  if (opts.methodName === 'line') {
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
    'methodName does not match available methods line or lineFeature',
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

// TODO: Add support for stratification for each method
