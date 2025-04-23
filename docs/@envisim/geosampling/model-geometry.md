[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / model-geometry

# model-geometry

## Functions

### circleAreaGeometry()

> **circleAreaGeometry**(`diameter`): `Circle`

#### Parameters

| Parameter  | theme_type | theme_default_value | theme_description       |
| ---------- | ---------- | ------------------- | ----------------------- |
| `diameter` | `number`   | `10.0`              | the diameter in meters. |

#### Returns

`Circle`

a circle model geometry.

---

### circleLineGeometry()

> **circleLineGeometry**(`diameter`, `options?`): `LineString`

#### Parameters

| Parameter  | theme_type                 | theme_default_value | theme_description                     |
| ---------- | -------------------------- | ------------------- | ------------------------------------- |
| `diameter` | `number`                   | `1.0`               | the diameter of the circle in meters. |
| `options?` | `CirclesToPolygonsOptions` | `undefined`         | -                                     |

#### Returns

`LineString`

a circle-shaped line model geometry.

---

### ellLineGeometry()

> **ellLineGeometry**(`sideLength`): `LineString`

#### Parameters

| Parameter    | theme_type | theme_default_value | theme_description         |
| ------------ | ---------- | ------------------- | ------------------------- |
| `sideLength` | `number`   | `10.0`              | length of side in meters. |

#### Returns

`LineString`

an ell-shaped line model geometry.

---

### placeAreaGeometry()

> **placeAreaGeometry**(`position`, `__namedParameters`): `AreaObject`

Positions a modelGeometry at position and optionally rotates the coordinates around position.

#### Parameters

| Parameter           | theme_type                     | theme_description     |
| ------------------- | ------------------------------ | --------------------- |
| `position`          | `Position`                     | a position [lon,lat]. |
| `__namedParameters` | `PlaceOptions`\<`AreaObject`\> | -                     |

#### Returns

`AreaObject`

a GeoJSON Point/Line/AreaObject.

---

### placeLineGeometry()

> **placeLineGeometry**(`position`, `__namedParameters`): `LineObject`

#### Parameters

| Parameter           | theme_type                     |
| ------------------- | ------------------------------ |
| `position`          | `Position`                     |
| `__namedParameters` | `PlaceOptions`\<`LineObject`\> |

#### Returns

`LineObject`

---

### placePointGeometry()

> **placePointGeometry**(`position`, `__namedParameters`): `PointObject`

#### Parameters

| Parameter           | theme_type                      |
| ------------------- | ------------------------------- |
| `position`          | `Position`                      |
| `__namedParameters` | `PlaceOptions`\<`PointObject`\> |

#### Returns

`PointObject`

---

### pointGeometry()

> **pointGeometry**(): `Point`

#### Returns

`Point`

a single point model geometry.

---

### radiusOfModelGeometry()

> **radiusOfModelGeometry**(`geometry`): `number`

Computes the radius as maximum distance from (0,0) to any point in the given geometry.

#### Parameters

| Parameter  | theme_type         | theme_description                             |
| ---------- | ------------------ | --------------------------------------------- |
| `geometry` | `SingleTypeObject` | a GeoJSON geometry (not geometry collection). |

#### Returns

`number`

the maximum distance from (0,0) to any point in the given geometry.

---

### rectangularAreaGeometry()

> **rectangularAreaGeometry**(`width`, `height`): `Polygon`

#### Parameters

| Parameter | theme_type | theme_default_value | theme_description                     |
| --------- | ---------- | ------------------- | ------------------------------------- |
| `width`   | `number`   | `10.0`              | length of side west-east in meters.   |
| `height`  | `number`   | `width`             | length of side south-north in meters. |

#### Returns

`Polygon`

a rectangular-shaped area model geometry.

---

### rectangularCircleGeometry()

> **rectangularCircleGeometry**(`width`, `height`, `diameter`): `MultiCircle`

#### Parameters

| Parameter  | theme_type | theme_default_value | theme_description                                                                         |
| ---------- | ---------- | ------------------- | ----------------------------------------------------------------------------------------- |
| `width`    | `number`   | `10.0`              | length of side west-east in meters.                                                       |
| `height`   | `number`   | `width`             | length of side south-north in meters.                                                     |
| `diameter` | `number`   | `1.0`               | the diameter in meters. If diameter is smaller than width, diameter is replaced by width. |

#### Returns

`MultiCircle`

a circle model geometry in a rectangular formation.

---

### rectangularLineGeometry()

> **rectangularLineGeometry**(`width`, `height`): `LineString`

#### Parameters

| Parameter | theme_type | theme_default_value | theme_description                     |
| --------- | ---------- | ------------------- | ------------------------------------- |
| `width`   | `number`   | `10.0`              | length of side west-east in meters.   |
| `height`  | `number`   | `width`             | length of side south-north in meters. |

#### Returns

`LineString`

a rectangular-shaped line model geometry.

---

### rectangularPointGeometry()

> **rectangularPointGeometry**(`width`, `height`): `MultiPoint`

#### Parameters

| Parameter | theme_type | theme_default_value | theme_description                     |
| --------- | ---------- | ------------------- | ------------------------------------- |
| `width`   | `number`   | `10.0`              | length of side west-east in meters.   |
| `height`  | `number`   | `width`             | length of side south-north in meters. |

#### Returns

`MultiPoint`

a point model geometry in a rectangular formation.

---

### regularPolygonAreaGeometry()

> **regularPolygonAreaGeometry**(`sides`, `polygonDiameter`): `Polygon`

#### Parameters

| Parameter         | theme_type | theme_default_value | theme_description                                |
| ----------------- | ---------- | ------------------- | ------------------------------------------------ |
| `sides`           | `number`   | `3`                 | the number of sides/vertices.                    |
| `polygonDiameter` | `number`   | `1.0`               | the diameter of the containing circle in meters. |

#### Returns

`Polygon`

a regular polygon area model geometry.

---

### regularPolygonCircleGeometry()

> **regularPolygonCircleGeometry**(`sides`, `polygonDiameter`, `diameter`): `MultiCircle`

#### Parameters

| Parameter         | theme_type | theme_default_value | theme_description                                                                                                                                             |
| ----------------- | ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sides`           | `number`   | `3`                 | the number of sides/vertices.                                                                                                                                 |
| `polygonDiameter` | `number`   | `10.0`              | the diameter of the containing circle in meters.                                                                                                              |
| `diameter`        | `number`   | `1.0`               | the diameter of the circles in meters. If diameter is smaller than the distance between the points in the polygon, the diameter is replaced by this distance. |

#### Returns

`MultiCircle`

a circle model geometry in a regular polygon formation.

---

### regularPolygonLineGeometry()

> **regularPolygonLineGeometry**(`sides`, `polygonDiameter`): `LineString`

#### Parameters

| Parameter         | theme_type | theme_default_value | theme_description                                |
| ----------------- | ---------- | ------------------- | ------------------------------------------------ |
| `sides`           | `number`   | `3`                 | the number of sides/vertices.                    |
| `polygonDiameter` | `number`   | `1.0`               | the diameter of the containing circle in meters. |

#### Returns

`LineString`

a regular polygon line model geometry.

---

### regularPolygonPointGeometry()

> **regularPolygonPointGeometry**(`sides`, `polygonDiameter`): `MultiPoint`

#### Parameters

| Parameter         | theme_type | theme_default_value | theme_description                                |
| ----------------- | ---------- | ------------------- | ------------------------------------------------ |
| `sides`           | `number`   | `3`                 | the number of sides/vertices.                    |
| `polygonDiameter` | `number`   | `1.0`               | the diameter of the containing circle in meters. |

#### Returns

`MultiPoint`

a point model geometry in a regular polygon formation.

---

### sizeOfModelGeometry()

> **sizeOfModelGeometry**(`geometry`): `number`

Computes the size of a model geometry which has cartesian coordinates.
Size is either number of points, length or area depending on the
type of the geometry.

#### Parameters

| Parameter  | theme_type         | theme_description                             |
| ---------- | ------------------ | --------------------------------------------- |
| `geometry` | `SingleTypeObject` | a GeoJSON geometry (not geometry collection). |

#### Returns

`number`

the size of the geometry.

---

### straightLineGeometry()

> **straightLineGeometry**(`sideLength`): `LineString`

#### Parameters

| Parameter    | theme_type | theme_default_value | theme_description                 |
| ------------ | ---------- | ------------------- | --------------------------------- |
| `sideLength` | `number`   | `10.0`              | the length of the line in meters. |

#### Returns

`LineString`

a north-south straight line model geometry.
