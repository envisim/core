[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [@envisim/matrix](../README.md) / sequence

# Function: sequence()

> **sequence**(`from`, `to`, `by`): [`Vector`](../classes/Vector.md)

Generates a vector-like of a sequence of numbers.

## Parameters

| Parameter | theme_type | theme_default_value | theme_description                                                          |
| --------- | ---------- | ------------------- | -------------------------------------------------------------------------- |
| `from`    | `number`   | `undefined`         | The starting number in the sequence.                                       |
| `to`      | `number`   | `undefined`         | A number for which the sequence will not generate beyond.                  |
| `by`      | `number`   | `1.0`               | The incrementing (or decrementing) size of the sequence. Must be positive. |

## Returns

[`Vector`](../classes/Vector.md)

A vector of size needed to reach `to`, however not going over it.

## Example

```ts
const seq1 = ColumnVector.createSequence(0, 2, 0.5);
// seq1 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5, 2.0]
const seq2 = ColumnVector.createSequence(0, 1.9, 0.5);
// seq2 is a ColumnVector with elements [0.0, 0.5, 1.0, 1.5]
```
