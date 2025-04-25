/**
 * @module @envisim/geojson-utils/type-guards
 */
export {
  isPoint,
  isMultiPoint,
  isPointish,
  isCircle,
  isMultiCircle,
  isCircleish,
  isAreaGeometry,
  isPointGeometry,
  isLineGeometry,
  isBaseGeometry,
  isSingleTypeGeometry,
} from "./objects.js";
export { isBaseFeature, isSingleTypeFeature, checkProperties } from "./feature.js";
export { isBaseCollection, isSingleTypeCollection, isUniformCollection } from "./collection.js";
