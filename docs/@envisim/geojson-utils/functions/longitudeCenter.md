[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson-utils](../README.md) / [](../README.md) / longitudeCenter

# Function: longitudeCenter()

> **longitudeCenter**(`a`, `b`, `norm`): `number`

## Parameters

| Parameter | theme_type | theme_default_value | theme_description      |
| --------- | ---------- | ------------------- | ---------------------- |
| `a`       | `number`   | `undefined`         | the smallest longitude |
| `b`       | `number`   | `undefined`         | the largest longitude  |
| `norm`    | `number`   | `360.0`             | the normalizing factor |

## Returns

`number`

the midpoint of the longitudes `[a, b]` in `[-norm/2, norm/2]`
