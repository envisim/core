## Naming conventions
Naming is based on [Google Style Guide](https://google.github.io/styleguide/tsguide.html#naming), but can be summarized to:

| Style            | Category                                                           |
|------------------|--------------------------------------------------------------------|
| `UpperCamelCase` | class / interface / type / enum / decorator / type parameters      |
| `lowerCamelCase` | variable / parameter / function / method / property / module alias |
| `CONSTANT_CASE`  | global constant values, including enum values                      |
| `#ident`         | private identifiers are never used.                                |

### File names
Files and folders should be named in `kebab-case`.

Files may begin with a keyword specifier `class`, `interface`, `type`, `enum`.

Example:
```
calculate-height.ts
calculate/height.ts
class-height-calculator.ts
```

## Imports
Imports should be made through `index.ts`, if imported outside a module.

## Function arguments
Functions should have the following styles of arguments:

| Style              | Category                                            |
|--------------------|-----------------------------------------------------|
| Multiple argumnets | Simple cases, total 2 arguments, very few arguments |
| Hybrid             | Single, distinct argument + config object           |
| Object argument    | All other cases                                                    |

## String properties
String properties should be written in `kebab-case`.
Exception to this rule for GeoJSON type string properties, or other cases where
existing standards rule otherwise.

Example:
```
{ methodName: 'sample-finite' }
```

