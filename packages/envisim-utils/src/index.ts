/**
 * @module @envisim/utils
 */
export { copy } from "./copy.js";
export {
  EnvisimError,
  ValidationError,
  type ValidationCause,
  type ValidationErrorCodes,
} from "./errors.js";
export { inClosedInterval, inOpenInterval } from "./numeric.js";
export { reducedRowEchelonForm } from "./reducedRowEchelonForm.js";
export { swap } from "./swap.js";
export { throwRangeError } from "./throw.js"; // REMOVE

// Types
export type { OptionalParam } from "./types.js";
