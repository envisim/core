// Sampling methods
export {sampleDistancePoints} from './distance-points.js';
export {sampleFeaturesOnAreas} from './features-on-areas.js';
export {samplePointsOnAreas} from './points-on-areas.js';
export {samplePointsOnLines} from './points-on-lines.js';
export {sampleRelascopePoints} from './relascope-points.js';
export {sampleSystematicBeltsOnAreas} from './systematic-belts-on-areas.js';
export {sampleSystematicDistanceLines} from './systematic-distance-lines.js';
export {sampleSystematicLinesOnAreas} from './systematic-lines-on-areas.js';

// Distance sampling utils.
export {
  integrate,
  effectiveRadius,
  effectiveHalfWidth,
  uniformDetectionFunction,
  halfNormalDetectionFunction,
} from './distance-utils.js';

// Points in bbox
export {uniformPositionsInBBox} from './points-in-bbox.js';

// Options
export {
  type SampleBaseOptions,
  SAMPLE_BASE_OPTIONS,
  sampleBaseOptionsCheck,
  type SamplePointOptions,
  SAMPLE_POINT_OPTIONS,
  samplePointOptionsCheck,
  type SampleFeatureOptions,
  SAMPLE_FEATURE_OPTIONS,
  sampleFeatureOptionsCheck,
  type SampleSystematicLineOnAreaOptions,
  SAMPLE_SYSTEMATIC_LINE_ON_AREA_OPTIONS,
  sampleSystematicLineOnAreaOptionsCheck,
  type SampleBeltOnAreaOptions,
  SAMPLE_BELT_ON_AREA_OPTIONS,
  sampleBeltOnAreaOptionsCheck,
  SAMPLE_RELASCOPE_POINTS_OPTIONS,
  type SampleRelascopePointsOptions,
  sampleRelascopePointsOptionsCheck,
} from './options.js';
