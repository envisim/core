[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / [@envisim/geojson-utils](README.md) / geojson

# geojson

## Contents

- [Interfaces](#interfaces)
  - [BaseFeature\<G, P>](#basefeatureg-p)
  - [BaseFeatureCollection\<F>](#basefeaturecollectionf)
  - [BaseGeometryCollection\<G>](#basegeometrycollectiong)
  - [BaseObject\<T, C>](#baseobjectt-c)
  - [Circle](#circle)
  - [GeoJsonObject\<T>](#geojsonobjectt)
  - [MultiCircle](#multicircle)
- [Type Aliases](#type-aliases)
  - [AreaFeature](#areafeature)
  - [AreaFeatureCollection](#areafeaturecollection)
  - [AreaGeometry](#areageometry)
  - [AreaGeometryCollection](#areageometrycollection)
  - [AreaObject](#areaobject)
  - [BaseGeometry](#basegeometry)
  - [BBox](#bbox)
  - [BBox2](#bbox2)
  - [BBox3](#bbox3)
  - [Feature\<G>](#featureg)
  - [FeatureCollection\<F>](#featurecollectionf)
  - [FeatureProperties\<P, ID>](#featurepropertiesp-id)
  - [Geometry](#geometry)
  - [GeometryCollection\<O>](#geometrycollectiono)
  - [LineFeature](#linefeature)
  - [LineFeatureCollection](#linefeaturecollection)
  - [LineGeometry](#linegeometry)
  - [LineGeometryCollection](#linegeometrycollection)
  - [LineObject](#lineobject)
  - [LineString](#linestring)
  - [MultiLineString](#multilinestring)
  - [MultiPoint](#multipoint)
  - [MultiPolygon](#multipolygon)
  - [Point](#point)
  - [PointFeature](#pointfeature)
  - [PointFeatureCollection](#pointfeaturecollection)
  - [PointGeometry](#pointgeometry)
  - [PointGeometryCollection](#pointgeometrycollection)
  - [PointObject](#pointobject)
  - [Polygon](#polygon)
  - [Position](#position)
  - [Position2](#position2)
  - [Position3](#position3)
  - [SingleTypeObject](#singletypeobject)

## Interfaces

### BaseFeature\<G, P>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`"Feature"`>

#### Type Parameters

| Type Parameter                                | Default type |
| --------------------------------------------- | ------------ | ------------------------------- |
| `G` _extends_ [`BaseGeometry`](#basegeometry) | `null`       | [`BaseGeometry`](#basegeometry) |
| `P`                                           | `unknown`    |

#### Properties

| Property                             | Type              |
| ------------------------------------ | ----------------- | -------------------------------------------------------- |
| <a id="bbox"></a> `bbox?`            | [`BBox`](#bbox-7) |
| <a id="geometry"></a> `geometry`     | `G`               |
| <a id="properties"></a> `properties` | `null`            | [`FeatureProperties`](#featureproperties)<`P`, `string`> |
| <a id="type"></a> `type`             | `"Feature"`       |

---

### BaseFeatureCollection\<F>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`"FeatureCollection"`>

#### Type Parameters

| Type Parameter                              | Default type                  |
| ------------------------------------------- | ----------------------------- |
| `F` _extends_ [`BaseFeature`](#basefeature) | [`BaseFeature`](#basefeature) |

#### Properties

| Property                         | Type                  |
| -------------------------------- | --------------------- |
| <a id="bbox-1"></a> `bbox?`      | [`BBox`](#bbox-7)     |
| <a id="features"></a> `features` | `F`\[]                |
| <a id="type-1"></a> `type`       | `"FeatureCollection"` |

---

### BaseGeometryCollection\<G>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`"GeometryCollection"`>

#### Type Parameters

| Type Parameter                                | Default type                    |
| --------------------------------------------- | ------------------------------- |
| `G` _extends_ [`BaseGeometry`](#basegeometry) | [`BaseGeometry`](#basegeometry) |

#### Properties

| Property                             | Type                   |
| ------------------------------------ | ---------------------- |
| <a id="bbox-2"></a> `bbox?`          | [`BBox`](#bbox-7)      |
| <a id="geometries"></a> `geometries` | `G`\[]                 |
| <a id="type-2"></a> `type`           | `"GeometryCollection"` |

---

### BaseObject\<T, C>

#### Extends

- [`GeoJsonObject`](#geojsonobject)<`T`>

#### Extended by

- [`Circle`](#circle)
- [`MultiCircle`](#multicircle)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `T` _extends_ `string` |
| `C`                    |

#### Properties

| Property                               | Type              |
| -------------------------------------- | ----------------- |
| <a id="bbox-3"></a> `bbox?`            | [`BBox`](#bbox-7) |
| <a id="coordinates"></a> `coordinates` | `C`               |
| <a id="type-3"></a> `type`             | `T`               |

---

### Circle

#### Extends

- [`BaseObject`](#baseobject)<`"Point"`, [`Position`](#position)>

#### Properties

| Property                                 | Type                    |
| ---------------------------------------- | ----------------------- |
| <a id="bbox-4"></a> `bbox?`              | [`BBox`](#bbox-7)       |
| <a id="coordinates-1"></a> `coordinates` | [`Position`](#position) |
| <a id="radius"></a> `radius`             | `number`                |
| <a id="type-4"></a> `type`               | `"Point"`               |

---

### GeoJsonObject\<T>

#### Extended by

- [`BaseObject`](#baseobject)
- [`BaseGeometryCollection`](#basegeometrycollection)
- [`BaseFeature`](#basefeature)
- [`BaseFeatureCollection`](#basefeaturecollection)

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `T` _extends_ `string` |

#### Properties

| Property                    | Type              |
| --------------------------- | ----------------- |
| <a id="bbox-5"></a> `bbox?` | [`BBox`](#bbox-7) |
| <a id="type-5"></a> `type`  | `T`               |

---

### MultiCircle

#### Extends

- [`BaseObject`](#baseobject)<`"MultiPoint"`, [`Position`](#position)\[]>

#### Properties

| Property                                 | Type                       |
| ---------------------------------------- | -------------------------- |
| <a id="bbox-6"></a> `bbox?`              | [`BBox`](#bbox-7)          |
| <a id="coordinates-2"></a> `coordinates` | [`Position`](#position)\[] |
| <a id="radius-1"></a> `radius`           | `number`                   |
| <a id="type-6"></a> `type`               | `"MultiPoint"`             |

## Type Aliases

### AreaFeature

> **AreaFeature** = [`Feature`](#feature)<[`AreaGeometry`](#areageometry)>

---

### AreaFeatureCollection

> **AreaFeatureCollection** = [`FeatureCollection`](#featurecollection)<[`AreaFeature`](#areafeature)>

---

### AreaGeometry

> **AreaGeometry** = [`AreaObject`](#areaobject) | [`AreaGeometryCollection`](#areageometrycollection)

---

### AreaGeometryCollection

> **AreaGeometryCollection** = [`GeometryCollection`](#geometrycollection)<[`AreaObject`](#areaobject)>

---

### AreaObject

> **AreaObject** = [`Polygon`](#polygon) | [`MultiPolygon`](#multipolygon) | [`Circle`](#circle) | [`MultiCircle`](#multicircle)

---

### BaseGeometry

> **BaseGeometry** = [`SingleTypeObject`](#singletypeobject) | [`BaseGeometryCollection`](#basegeometrycollection)

---

### BBox

> **BBox** = [`BBox2`](#bbox2) | [`BBox3`](#bbox3)

---

### BBox2

> **BBox2** = \[`number`, `number`, `number`, `number`]

---

### BBox3

> **BBox3** = \[`number`, `number`, `number`, `number`, `number`, `number`]

---

### Feature\<G>

> **Feature**<`G`> = [`BaseFeature`](#basefeature)<`G`, `number` | `string`>

#### Type Parameters

| Type Parameter                          | Default type              |
| --------------------------------------- | ------------------------- |
| `G` _extends_ [`Geometry`](#geometry-1) | [`Geometry`](#geometry-1) |

---

### FeatureCollection\<F>

> **FeatureCollection**<`F`> = [`BaseFeatureCollection`](#basefeaturecollection)<`F`>

#### Type Parameters

| Type Parameter                      | Default type          |
| ----------------------------------- | --------------------- |
| `F` _extends_ [`Feature`](#feature) | [`Feature`](#feature) |

---

### FeatureProperties\<P, ID>

> **FeatureProperties**<`P`, `ID`> = `Record`<`ID`, `P`>

#### Type Parameters

| Type Parameter          | Default type |
| ----------------------- | ------------ | -------- |
| `P`                     | `number`     | `string` |
| `ID` _extends_ `string` | `string`     |

---

### Geometry

> **Geometry** = [`PointGeometry`](#pointgeometry) | [`LineGeometry`](#linegeometry) | [`AreaGeometry`](#areageometry)

---

### GeometryCollection\<O>

> **GeometryCollection**<`O`> = [`BaseGeometryCollection`](#basegeometrycollection)<`O`>

#### Type Parameters

| Type Parameter                                        |
| ----------------------------------------------------- |
| `O` _extends_ [`SingleTypeObject`](#singletypeobject) |

---

### LineFeature

> **LineFeature** = [`Feature`](#feature)<[`LineGeometry`](#linegeometry)>

---

### LineFeatureCollection

> **LineFeatureCollection** = [`FeatureCollection`](#featurecollection)<[`LineFeature`](#linefeature)>

---

### LineGeometry

> **LineGeometry** = [`LineObject`](#lineobject) | [`LineGeometryCollection`](#linegeometrycollection)

---

### LineGeometryCollection

> **LineGeometryCollection** = [`GeometryCollection`](#geometrycollection)<[`LineObject`](#lineobject)>

---

### LineObject

> **LineObject** = [`LineString`](#linestring) | [`MultiLineString`](#multilinestring)

---

### LineString

> **LineString** = [`BaseObject`](#baseobject)<`"LineString"`, [`Position`](#position)\[]>

---

### MultiLineString

> **MultiLineString** = [`BaseObject`](#baseobject)<`"MultiLineString"`, [`Position`](#position)\[]\[]>

---

### MultiPoint

> **MultiPoint** = [`BaseObject`](#baseobject)<`"MultiPoint"`, [`Position`](#position)\[]>

---

### MultiPolygon

> **MultiPolygon** = [`BaseObject`](#baseobject)<`"MultiPolygon"`, [`Position`](#position)\[]\[]\[]>

---

### Point

> **Point** = [`BaseObject`](#baseobject)<`"Point"`, [`Position`](#position)>

---

### PointFeature

> **PointFeature** = [`Feature`](#feature)<[`PointGeometry`](#pointgeometry)>

---

### PointFeatureCollection

> **PointFeatureCollection** = [`FeatureCollection`](#featurecollection)<[`PointFeature`](#pointfeature)>

---

### PointGeometry

> **PointGeometry** = [`PointObject`](#pointobject) | [`PointGeometryCollection`](#pointgeometrycollection)

---

### PointGeometryCollection

> **PointGeometryCollection** = [`GeometryCollection`](#geometrycollection)<[`PointObject`](#pointobject)>

---

### PointObject

> **PointObject** = [`Point`](#point) | [`MultiPoint`](#multipoint)

---

### Polygon

> **Polygon** = [`BaseObject`](#baseobject)<`"Polygon"`, [`Position`](#position)\[]\[]>

---

### Position

> **Position** = [`Position2`](#position2) | [`Position3`](#position3)

---

### Position2

> **Position2** = \[`number`, `number`]

---

### Position3

> **Position3** = \[`number`, `number`, `number`]

---

### SingleTypeObject

> **SingleTypeObject** = [`PointObject`](#pointobject) | [`LineObject`](#lineobject) | [`AreaObject`](#areaobject)
