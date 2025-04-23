[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/sampling](../README.md) / NearestNeighbour

# Class: NearestNeighbour

## Constructors

### Constructor

> **new NearestNeighbour**(`dt`, `bucketSize`): `NearestNeighbour`

Constructs a nearest neighbour searcher, using k-d-trees

#### Parameters

| Parameter    | theme_type | theme_default_value | theme_description                        |
| ------------ | ---------- | ------------------- | ---------------------------------------- |
| `dt`         | `Matrix`   | `undefined`         | the data to search within.               |
| `bucketSize` | `number`   | `40`                | the bucket size of the k-d-tree's nodes. |

#### Returns

`NearestNeighbour`

a nearest neighbour searcher.

## Methods

### findNearestDistance()

> **findNearestDistance**(`unit`): `number`

#### Parameters

| Parameter | theme_type             | theme_description                                                              |
| --------- | ---------------------- | ------------------------------------------------------------------------------ |
| `unit`    | `number` \| `number`[] | if a number $i$, the unit is assumed to be the $i$th row in the provided data. |

#### Returns

`number`

the distance to the nearest neighbour(s) of the unit in the
provided data.

---

### findNearestNeighbours()

> **findNearestNeighbours**(`unit`): `number`[]

#### Parameters

| Parameter | theme_type             | theme_description                                                              |
| --------- | ---------------------- | ------------------------------------------------------------------------------ |
| `unit`    | `number` \| `number`[] | if a number $i$, the unit is assumed to be the $i$th row in the provided data. |

#### Returns

`number`[]

the nearest neighbour(s) of the unit in the provided data.
