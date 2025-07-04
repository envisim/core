/**
 * @module @envisim/geosampling/sample-continuous
 */

// Sampling methods
export {
  sampleDistancePoints,
  sampleDistancePointsCheck,
  type SampleDistancePointsOptions,
} from "./distance-points.js";
export {
  type SampleFeaturesOnAreasOptions,
  sampleAreaFeaturesOnAreas,
  sampleAreaFeaturesOnAreasCheck,
  sampleLineFeaturesOnAreas,
  sampleLineFeaturesOnAreasCheck,
  samplePointFeaturesOnAreas,
  samplePointFeaturesOnAreasCheck,
} from "./features-on-areas.js";
export {
  samplePointsOnAreas,
  samplePointsOnAreasCheck,
  type SamplePointsOnAreasOptions,
} from "./points-on-areas.js";
export {
  samplePointsOnLines,
  samplePointsOnLinesCheck,
  type SamplePointsOnLinesOptions,
} from "./points-on-lines.js";
export {
  sampleRelascopePoints,
  sampleRelascopePointsOptionsCheck,
  type SampleRelascopePointsOptions,
} from "./relascope-points.js";
export {
  sampleSystematicBeltsOnAreas,
  sampleSystematicBeltsOnAreasCheck,
  type SampleSystematicBeltsOnAreas,
} from "./systematic-belts-on-areas.js";
export {
  sampleSystematicDistanceLines,
  sampleSystematicDistanceLinesCheck,
  type SampleSystematicDistanceLinesOptions,
} from "./systematic-distance-lines.js";
export {
  sampleSystematicLinesOnAreas,
  sampleSystematicLinesOnAreasCheck,
  type SampleSystematicLinesOnAreas,
} from "./systematic-lines-on-areas.js";
export {
  sampleSystematicLinesOnLines,
  sampleSystematicLinesOnLinesCheck,
  type SampleSystematicLinesOnLines,
} from "./systematic-lines-on-lines.js";

// Distance sampling utils.
export {
  integrate,
  effectiveRadius,
  effectiveHalfWidth,
  uniformDetectionFunction,
  halfNormalDetectionFunction,
  type DetectionFunction,
  type IntegrateFunction,
} from "./distance-utils.js";

// Points in bbox
export {
  samplePositionsInBbox,
  samplePositionsInBboxCheck,
  type SamplePositionsInBbox,
} from "./points-in-bbox.js";
