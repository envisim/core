[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/geojson](../README.md) / NumericalProperty

# Interface: NumericalProperty\<ID\>

## theme_extends

- `PropertyBase`\<`ID`\>

## Type Parameters

| Type Parameter          | theme_default_type |
| ----------------------- | ------------------ |
| `ID` _extends_ `string` | `string`           |

## Properties

| Property                      | theme_type             | theme_description                                      |
| ----------------------------- | ---------------------- | ------------------------------------------------------ |
| <a id="id-1"></a> `id`        | `ID`                   | The UUID of the Features property using this category. |
| <a id="name"></a> `name?`     | `string`               | A human-friendly name                                  |
| <a id="parent"></a> `parent?` | \[`string`, `number`\] | Holds id and index of collected categorical variable   |
| <a id="type"></a> `type`      | `"numerical"`          | -                                                      |
