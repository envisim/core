// Constants
const toDeg = 180 / Math.PI;
const PI_4 = Math.PI / 4;

/**
 * Converts coordinate from [longitude,latitude] to WebMercator [x,y].
 *
 * @param coord - Coordinates [longitude,latitude]
 * @returns - Coordinates [x,y]
 */
export const coordToWebMercator = (
  coord: GeoJSON.Position,
): GeoJSON.Position => {
  return [coord[0], Math.log(Math.tan((coord[1] / 90 + 1) * PI_4)) * toDeg];
};

/**
 * Converts coordinate from WebMercator [x,y] to [longitude,latitude].
 *
 * @param coord - Coordinates [x,y]
 * @returns - Coordinates [longitude,latitude]
 */
export const coordFromWebMercator = (
  coord: GeoJSON.Position,
): GeoJSON.Position => {
  return [coord[0], (Math.atan(Math.exp(coord[1] / toDeg)) / PI_4 - 1) * 90];
};
