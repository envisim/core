[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geosampling](README.md) / model-geometry

# model-geometry

## Functions

### circleAreaGeometry()

> **circleAreaGeometry**(`diameter`): [`Circle`](../geojson-utils/geojson.md#circle)

#### Parameters

| Parameter  | Type     | Default value | Description             |
| ---------- | -------- | ------------- | ----------------------- |
| `diameter` | `number` | `10.0`        | the diameter in meters. |

#### Returns

[`Circle`](../geojson-utils/geojson.md#circle)

a circle model geometry.

---

### circleLineGeometry()

> **circleLineGeometry**(`diameter`, `options?`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

| Parameter  | Type                                                                 | Default value | Description                           |
| ---------- | -------------------------------------------------------------------- | ------------- | ------------------------------------- |
| `diameter` | `number`                                                             | `1.0`         | the diameter of the circle in meters. |
| `options?` | [`CirclesToPolygonsOptions`](../geojson.md#circlestopolygonsoptions) | `undefined`   | -                                     |

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a circle-shaped line model geometry.

---

### ellLineGeometry()

> **ellLineGeometry**(`sideLength`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

| Parameter    | Type     | Default value | Description               |
| ------------ | -------- | ------------- | ------------------------- |
| `sideLength` | `number` | `10.0`        | length of side in meters. |

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

an ell-shaped line model geometry.

---

### placeAreaGeometry()

> **placeAreaGeometry**(`position`, `__namedParameters`): [`AreaObject`](../geojson.md#areaobject)

Positions a modelGeometry at position and optionally rotates the coordinates around position.

#### Parameters

| Parameter           | Type                                                                     | Description           |
| ------------------- | ------------------------------------------------------------------------ | --------------------- |
| `position`          | [`Position`](../geojson-utils/geojson.md#position)                       | a position [lon,lat]. |
| `__namedParameters` | `PlaceOptions`\<[`AreaObject`](../geojson-utils/geojson.md#areaobject)\> | -                     |

#### Returns

[`AreaObject`](../geojson.md#areaobject)

a GeoJSON Point/Line/AreaObject.

---

### placeLineGeometry()

> **placeLineGeometry**(`position`, `__namedParameters`): [`LineObject`](../geojson.md#lineobject)

#### Parameters

| Parameter           | Type                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| `position`          | [`Position`](../geojson-utils/geojson.md#position)                       |
| `__namedParameters` | `PlaceOptions`\<[`LineObject`](../geojson-utils/geojson.md#lineobject)\> |

#### Returns

[`LineObject`](../geojson.md#lineobject)

---

### placePointGeometry()

> **placePointGeometry**(`position`, `__namedParameters`): [`PointObject`](../geojson.md#pointobject)

#### Parameters

| Parameter           | Type                                                                       |
| ------------------- | -------------------------------------------------------------------------- |
| `position`          | [`Position`](../geojson-utils/geojson.md#position)                         |
| `__namedParameters` | `PlaceOptions`\<[`PointObject`](../geojson-utils/geojson.md#pointobject)\> |

#### Returns

[`PointObject`](../geojson.md#pointobject)

---

### pointGeometry()

> **pointGeometry**(): [`Point`](../geojson-utils/geojson.md#point)

#### Returns

[`Point`](../geojson-utils/geojson.md#point)

a single point model geometry.

---

### radiusOfModelGeometry()

> **radiusOfModelGeometry**(`geometry`): `number`

Computes the radius as maximum distance from (0,0) to any point in the given geometry.

#### Parameters

| Parameter  | Type                                                               | Description                                   |
| ---------- | ------------------------------------------------------------------ | --------------------------------------------- |
| `geometry` | [`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject) | a GeoJSON geometry (not geometry collection). |

#### Returns

`number`

the maximum distance from (0,0) to any point in the given geometry.

---

### rectangularAreaGeometry()

> **rectangularAreaGeometry**(`width`, `height`): [`Polygon`](../geojson-utils/geojson.md#polygon)

#### Parameters

| Parameter | Type     | Default value | Description                           |
| --------- | -------- | ------------- | ------------------------------------- |
| `width`   | `number` | `10.0`        | length of side west-east in meters.   |
| `height`  | `number` | `width`       | length of side south-north in meters. |

#### Returns

[`Polygon`](../geojson-utils/geojson.md#polygon)

a rectangular-shaped area model geometry.

---

### rectangularCircleGeometry()

> **rectangularCircleGeometry**(`width`, `height`, `diameter`): [`MultiCircle`](../geojson-utils/geojson.md#multicircle)

#### Parameters

| Parameter  | Type     | Default value | Description                                                                               |
| ---------- | -------- | ------------- | ----------------------------------------------------------------------------------------- |
| `width`    | `number` | `10.0`        | length of side west-east in meters.                                                       |
| `height`   | `number` | `width`       | length of side south-north in meters.                                                     |
| `diameter` | `number` | `1.0`         | the diameter in meters. If diameter is smaller than width, diameter is replaced by width. |

#### Returns

[`MultiCircle`](../geojson-utils/geojson.md#multicircle)

a circle model geometry in a rectangular formation.

---

### rectangularLineGeometry()

> **rectangularLineGeometry**(`width`, `height`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

| Parameter | Type     | Default value | Description                           |
| --------- | -------- | ------------- | ------------------------------------- |
| `width`   | `number` | `10.0`        | length of side west-east in meters.   |
| `height`  | `number` | `width`       | length of side south-north in meters. |

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a rectangular-shaped line model geometry.

---

### rectangularPointGeometry()

> **rectangularPointGeometry**(`width`, `height`): [`MultiPoint`](../geojson-utils/geojson.md#multipoint)

#### Parameters

| Parameter | Type     | Default value | Description                           |
| --------- | -------- | ------------- | ------------------------------------- |
| `width`   | `number` | `10.0`        | length of side west-east in meters.   |
| `height`  | `number` | `width`       | length of side south-north in meters. |

#### Returns

[`MultiPoint`](../geojson-utils/geojson.md#multipoint)

a point model geometry in a rectangular formation.

---

### regularPolygonAreaGeometry()

> **regularPolygonAreaGeometry**(`sides`, `polygonDiameter`): [`Polygon`](../geojson-utils/geojson.md#polygon)

#### Parameters

| Parameter         | Type     | Default value | Description                                      |
| ----------------- | -------- | ------------- | ------------------------------------------------ |
| `sides`           | `number` | `3`           | the number of sides/vertices.                    |
| `polygonDiameter` | `number` | `1.0`         | the diameter of the containing circle in meters. |

#### Returns

[`Polygon`](../geojson-utils/geojson.md#polygon)

a regular polygon area model geometry.

---

### regularPolygonCircleGeometry()

> **regularPolygonCircleGeometry**(`sides`, `polygonDiameter`, `diameter`): [`MultiCircle`](../geojson-utils/geojson.md#multicircle)

#### Parameters

| Parameter         | Type     | Default value | Description                                                                                                                                                   |
| ----------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sides`           | `number` | `3`           | the number of sides/vertices.                                                                                                                                 |
| `polygonDiameter` | `number` | `10.0`        | the diameter of the containing circle in meters.                                                                                                              |
| `diameter`        | `number` | `1.0`         | the diameter of the circles in meters. If diameter is smaller than the distance between the points in the polygon, the diameter is replaced by this distance. |

#### Returns

[`MultiCircle`](../geojson-utils/geojson.md#multicircle)

a circle model geometry in a regular polygon formation.

---

### regularPolygonLineGeometry()

> **regularPolygonLineGeometry**(`sides`, `polygonDiameter`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

| Parameter         | Type     | Default value | Description                                      |
| ----------------- | -------- | ------------- | ------------------------------------------------ |
| `sides`           | `number` | `3`           | the number of sides/vertices.                    |
| `polygonDiameter` | `number` | `1.0`         | the diameter of the containing circle in meters. |

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a regular polygon line model geometry.

---

### regularPolygonPointGeometry()

> **regularPolygonPointGeometry**(`sides`, `polygonDiameter`): [`MultiPoint`](../geojson-utils/geojson.md#multipoint)

#### Parameters

| Parameter         | Type     | Default value | Description                                      |
| ----------------- | -------- | ------------- | ------------------------------------------------ |
| `sides`           | `number` | `3`           | the number of sides/vertices.                    |
| `polygonDiameter` | `number` | `1.0`         | the diameter of the containing circle in meters. |

#### Returns

[`MultiPoint`](../geojson-utils/geojson.md#multipoint)

a point model geometry in a regular polygon formation.

---

### sizeOfModelGeometry()

> **sizeOfModelGeometry**(`geometry`): `number`

Computes the size of a model geometry which has cartesian coordinates.
Size is either number of points, length or area depending on the
type of the geometry.

#### Parameters

| Parameter  | Type                                                               | Description                                   |
| ---------- | ------------------------------------------------------------------ | --------------------------------------------- |
| `geometry` | [`SingleTypeObject`](../geojson-utils/geojson.md#singletypeobject) | a GeoJSON geometry (not geometry collection). |

#### Returns

`number`

the size of the geometry.

---

### straightLineGeometry()

> **straightLineGeometry**(`sideLength`): [`LineString`](../geojson-utils/geojson.md#linestring)

#### Parameters

| Parameter    | Type     | Default value | Description                       |
| ------------ | -------- | ------------- | --------------------------------- |
| `sideLength` | `number` | `10.0`        | the length of the line in meters. |

#### Returns

[`LineString`](../geojson-utils/geojson.md#linestring)

a north-south straight line model geometry.
