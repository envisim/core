[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / [](../README.md) / getPositionsForCircle

# Function: getPositionsForCircle()

> **getPositionsForCircle**(`point`, `radius`): [`Position`](../geojson/type-aliases/Position.md)[]

Computes positions needed to find bounding box of a PointCircle.

## Parameters

| Parameter | theme_type                                        | theme_description     |
| --------- | ------------------------------------------------- | --------------------- |
| `point`   | [`Position`](../geojson/type-aliases/Position.md) | A position.           |
| `radius`  | `number`                                          | The radius in meters. |

## Returns

[`Position`](../geojson/type-aliases/Position.md)[]

- An array with four positions [top,right,bottom,left].
