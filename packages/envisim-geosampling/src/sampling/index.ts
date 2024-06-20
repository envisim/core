// Sampling methods callable from engine
export {
  sampleFinite,
  sampleFiniteStratified,
  sampleFiniteOptionsCheck,
} from './sampleFinite.js';
export {
  sampleAreaToArea,
  sampleAreaToAreaStratified,
  sampleAreaToLine,
  sampleAreaToLineStratified,
  sampleAreaToPoint,
  sampleAreaToPointStratified,
  sampleLineToPoint,
  sampleLineToPointStratified,
} from './sampleContinuous.js';
