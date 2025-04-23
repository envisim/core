[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [point-processes](../README.md) / uniformPoissonPointProcess

# Function: uniformPoissonPointProcess()

> **uniformPoissonPointProcess**(`collection`, `opts`): `FeatureCollection`\<`Point`, `never`\>

Generates points from a uniform Poisson point process
on areas of input collection. Given the (Poisson distributed)
random number of points, the points are generated uniformly
on a spherical model of the earth.

## Parameters

| Parameter    | theme_type                          |
| ------------ | ----------------------------------- |
| `collection` | `FeatureCollection`\<`AreaObject`\> |
| `opts`       | `UniformPoissonProcessOptions`      |

## Returns

`FeatureCollection`\<`Point`, `never`\>
