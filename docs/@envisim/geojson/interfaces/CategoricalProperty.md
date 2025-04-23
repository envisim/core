[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / CategoricalProperty

# Interface: CategoricalProperty\<ID\>

## theme_extends

- `PropertyBase`\<`ID`\>

## Type Parameters

| Type Parameter          | theme_default_type |
| ----------------------- | ------------------ |
| `ID` _extends_ `string` | `string`           |

## Properties

| Property                     | theme_type      | theme_description                                      |
| ---------------------------- | --------------- | ------------------------------------------------------ |
| <a id="id-1"></a> `id`       | `ID`            | The UUID of the Features property using this category. |
| <a id="name"></a> `name?`    | `string`        | A human-friendly name                                  |
| <a id="type"></a> `type`     | `"categorical"` | -                                                      |
| <a id="values"></a> `values` | `string`[]      | An ordered array of values defined on this category    |
