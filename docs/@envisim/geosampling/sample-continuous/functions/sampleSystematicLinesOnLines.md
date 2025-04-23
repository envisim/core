[**Documentation**](../../../../README.md)

---

[Documentation](../../../../README.md) / [@envisim/geosampling](../../README.md) / [sample-continuous](../README.md) / sampleSystematicLinesOnLines

# Function: sampleSystematicLinesOnLines()

> **sampleSystematicLinesOnLines**(`collection`, `options`): `FeatureCollection`\<`LineString`, `never`\>

Selects systematic line dashes along a line layer. Each LineString recieves its
own random starting position of the dashes.

## Parameters

| Parameter    | theme_type                                                                        |
| ------------ | --------------------------------------------------------------------------------- |
| `collection` | `FeatureCollection`\<`LineObject`\>                                               |
| `options`    | [`SampleSystematicLinesOnLines`](../type-aliases/SampleSystematicLinesOnLines.md) |

## Returns

`FeatureCollection`\<`LineString`, `never`\>
