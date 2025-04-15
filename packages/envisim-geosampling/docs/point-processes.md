[**@envisim/geosampling**](README.md)

---

[@envisim/geosampling]() / point-processes

# @envisim/geosampling

## Functions

### maternClusterProcess()

> **maternClusterProcess**(`collection`, `opts`): `FeatureCollection`\<`Point`, `never`\>

Generates points from a Matérn cluster point process
on an area collection.

#### Parameters

| Parameter    | Type                                | Description |
| ------------ | ----------------------------------- | ----------- |
| `collection` | `FeatureCollection`\<`AreaObject`\> |             |
| `opts`       | `MaternClusterProcessOptions`       |             |

#### Returns

`FeatureCollection`\<`Point`, `never`\>

---

### thomasClusterProcess()

> **thomasClusterProcess**(`collection`, `opts`): `FeatureCollection`\<`Point`, `never`\>

Generates points from a Thomas cluster point process
on areas of input area collection.

#### Parameters

| Parameter    | Type                                | Description |
| ------------ | ----------------------------------- | ----------- |
| `collection` | `FeatureCollection`\<`AreaObject`\> |             |
| `opts`       | `ThomasClusterProcessOptions`       |             |

#### Returns

`FeatureCollection`\<`Point`, `never`\>

---

### uniformBinomialPointProcess()

> **uniformBinomialPointProcess**(`collection`, `opts`): `FeatureCollection`\<`Point`, `never`\>

Generate points from a uniform Binomial point process
on areas of input area collection. The points are generated
uniformly on a spherical model of the earth.

#### Parameters

| Parameter    | Type                                 | Description |
| ------------ | ------------------------------------ | ----------- |
| `collection` | `FeatureCollection`\<`AreaObject`\>  |             |
| `opts`       | `UniformBinomialPointProcessOptions` |             |

#### Returns

`FeatureCollection`\<`Point`, `never`\>

---

### uniformPoissonPointProcess()

> **uniformPoissonPointProcess**(`collection`, `opts`): `FeatureCollection`\<`Point`, `never`\>

Generates points from a uniform Poisson point process
on areas of input collection. Given the (Poisson distributed)
random number of points, the points are generated uniformly
on a spherical model of the earth.

#### Parameters

| Parameter    | Type                                | Description |
| ------------ | ----------------------------------- | ----------- |
| `collection` | `FeatureCollection`\<`AreaObject`\> |             |
| `opts`       | `UniformPoissonProcessOptions`      |             |

#### Returns

`FeatureCollection`\<`Point`, `never`\>
