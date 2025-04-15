[**@envisim/geojson-utils**](../../README.md)

---

[@envisim/geojson-utils]() / [](../../README.md) / cutAreaGeometry

# Function: cutAreaGeometry()

## Call Signature

> **cutAreaGeometry**(`g`): [`Circle`](../../geojson/interfaces/Circle.md)

Cuts an AreaGeometry on the antimeridian

### Parameters

| Parameter | Type                                           | Description             |
| --------- | ---------------------------------------------- | ----------------------- |
| `g`       | [`Circle`](../../geojson/interfaces/Circle.md) | the AreaGeometry to cut |

### Returns

[`Circle`](../../geojson/interfaces/Circle.md)

the cut AreaGeometry

## Call Signature

> **cutAreaGeometry**(`g`): [`MultiCircle`](../../geojson/interfaces/MultiCircle.md)

Cuts an AreaGeometry on the antimeridian

### Parameters

| Parameter | Type                                                     | Description             |
| --------- | -------------------------------------------------------- | ----------------------- |
| `g`       | [`MultiCircle`](../../geojson/interfaces/MultiCircle.md) | the AreaGeometry to cut |

### Returns

[`MultiCircle`](../../geojson/interfaces/MultiCircle.md)

the cut AreaGeometry

## Call Signature

> **cutAreaGeometry**(`g`): [`Polygon`](../../geojson/type-aliases/Polygon.md) \| [`MultiPolygon`](../../geojson/type-aliases/MultiPolygon.md)

Cuts an AreaGeometry on the antimeridian

### Parameters

| Parameter | Type                                                                                                               | Description             |
| --------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `g`       | [`Polygon`](../../geojson/type-aliases/Polygon.md) \| [`MultiPolygon`](../../geojson/type-aliases/MultiPolygon.md) | the AreaGeometry to cut |

### Returns

[`Polygon`](../../geojson/type-aliases/Polygon.md) \| [`MultiPolygon`](../../geojson/type-aliases/MultiPolygon.md)

the cut AreaGeometry
