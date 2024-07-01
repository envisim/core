// Sampling methods callable from engine
export {
  sampleFinite,
  sampleFiniteStratified,
  sampleFiniteOptionsCheck,
} from './sample-finite.js';
export {
  sampleAreaToArea,
  sampleAreaToAreaStratified,
  sampleAreaToLine,
  sampleAreaToLineStratified,
  sampleAreaToPoint,
  sampleAreaToPointStratified,
  sampleLineToPoint,
  sampleLineToPointStratified,
} from './sample-continuous.js';
