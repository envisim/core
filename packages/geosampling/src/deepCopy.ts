/**
 * Deep copy of a javascript object.
 *
 * @param obj - An object to copy.
 * @returns - A deep copy  of the object.
 */
export const deepCopy = (obj: any): any => {
  let copy = Object.assign({}, obj);
  Object.keys(copy).forEach(
    (key) =>
      (copy[key] =
        typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]),
  );
  return Array.isArray(obj)
    ? (copy.length = obj.length) && Array.from(copy)
    : copy;
};
