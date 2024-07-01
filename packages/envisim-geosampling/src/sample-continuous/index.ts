// Sampling methods
export {
  sampleDistancePoints,
  type SampleDistancePointsOptions,
} from './distance-points.js';
export {
  sampleFeaturesOnAreas,
  type SampleFeaturesOnAreasOptions,
} from './features-on-areas.js';
export {
  samplePointsOnAreas,
  type SamplePointsOnAreasOptions,
} from './points-on-areas.js';
export {
  samplePointsOnLines,
  type SamplePointsOnLinesOptions,
} from './points-on-lines.js';
export {
  sampleRelascopePoints,
  type SampleRelascopePointsOptions,
} from './relascope-points.js';
export {
  sampleSystematicBeltsOnAreas,
  type SampleBeltsOnAreasOptions,
} from './systematic-belts-on-areas.js';
export {
  sampleSystematicDistanceLines,
  type SampleSystematicDistanceLinesOptions,
} from './systematic-distance-lines.js';
export {
  sampleSystematicLinesOnAreas,
  type SampleSystematicLinesOnAreasOptions,
} from './systematic-lines-on-areas.js';

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
