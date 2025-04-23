[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / point-processes

# point-processes

## Contents

- [Functions](#functions)
  - [maternClusterProcess()](#maternclusterprocess)
  - [thomasClusterProcess()](#thomasclusterprocess)
  - [uniformBinomialPointProcess()](#uniformbinomialpointprocess)
  - [uniformPoissonPointProcess()](#uniformpoissonpointprocess)

## Functions

### maternClusterProcess()

> **maternClusterProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generates points from a Matérn cluster point process
on an area collection.

#### Parameters

| Parameter    | Type                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)> |
| `opts`       | `MaternClusterProcessOptions`                                                                    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### thomasClusterProcess()

> **thomasClusterProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generates points from a Thomas cluster point process
on areas of input area collection.

#### Parameters

| Parameter    | Type                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)> |
| `opts`       | `ThomasClusterProcessOptions`                                                                    |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### uniformBinomialPointProcess()

> **uniformBinomialPointProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generate points from a uniform Binomial point process
on areas of input area collection. The points are generated
uniformly on a spherical model of the earth.

#### Parameters

| Parameter    | Type                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)> |
| `opts`       | `UniformBinomialPointProcessOptions`                                                             |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

---

### uniformPoissonPointProcess()

> **uniformPoissonPointProcess**(`collection`, `opts`): [`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>

Generates points from a uniform Poisson point process
on areas of input collection. Given the (Poisson distributed)
random number of points, the points are generated uniformly
on a spherical model of the earth.

#### Parameters

| Parameter    | Type                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `collection` | [`FeatureCollection`](../geojson.md#featurecollection)<[`AreaObject`](../geojson.md#areaobject)> |
| `opts`       | `UniformPoissonProcessOptions`                                                                   |

#### Returns

[`FeatureCollection`](../geojson.md#featurecollection)<[`Point`](../geojson.md#point), `never`>
