# Box-shadow [​](#box-shadow)

## Shadow (shorthand) [​](#shadow-shorthand)

Shadows are used to show depth on the surface of a page. Borders are used alongside shadows to further emphasize the edge of a shape, especially in dark mode, where shadows are far more subtle.

The "light source" for these shadows is oriented between the top and center of the object which has the shadow applied. There are two levels of shadows in Codex represented as `small`, `medium`, and `large`.

*   **Small** should be used for elements which other content disappears behind, and are on the lowest possible elevated plane, such as ProgressBars, toolbars, and collapsed headers.
*   **Medium** should be used for elements which appear overtop of other content, but are triggered from a directly related element on the page, such as Menus.
*   **Large** should be used for elements which appear overtop of an entire page or surface area, or require extra attention, such as Dialogs, Toasts, previews, and bottom sheets.

_Shadow levels should not change when a new plane is created. For example, a Menu which appears within a Dialog should still have a `medium` box-shadow._

|     |     |
| --- | --- |List of design token names, values and metadata for box-shadow
| Name | Value |
| --- | --- |
| `box-shadow-small`Copy | `0 0 0 1px #72777d`<br><br>`box-shadow.outset.small`<br><br>`box-shadow.color.base` |
| `box-shadow-small-top`Copy | `0 -1px 0 0 #72777d`<br><br>`box-shadow.outset.small-top`<br><br>`box-shadow.color.base` |
| `box-shadow-small-bottom`Copy | `0 1px 0 0 #72777d`<br><br>`box-shadow.outset.small-bottom`<br><br>`box-shadow.color.base` |
| `box-shadow-medium`Copy | `0 4px 4px 0 rgba( 0, 0, 0, 0.87 ), 0 0 8px 0 rgba( 0, 0, 0, 0.87 )`<br><br>`box-shadow.outset.medium-below`<br><br>`box-shadow.color.alpha-base`<br><br>`box-shadow.outset.medium-around`<br><br>`box-shadow.color.alpha-base` |
| `box-shadow-large`Copy | `0 4px 8px 0 rgba( 0, 0, 0, 0.87 ), 0 0 16px 0 rgba( 0, 0, 0, 0.87 )`<br><br>`box-shadow.outset.large-below`<br><br>`box-shadow.color.alpha-base`<br><br>`box-shadow.outset.large-around`<br><br>`box-shadow.color.alpha-base` |

## Inset shadow [​](#inset-shadow)

|     |     |
| --- | --- |List of design token names, values and metadata for box-shadow
| Name | Value |
| --- | --- |
| `box-shadow-inset-small`Copy | `inset 0 0 0 1px`<br><br>`box-shadow.25` |
| `box-shadow-inset-medium`Copy | `inset 0 0 0 2px`<br><br>`box-shadow.50` |
| `box-shadow-inset-medium-vertical`Copy | `inset 0 -2px 0 0`<br><br>`box-shadow.50-vertical` |

## Outset shadow [​](#outset-shadow)

|     |     |
| --- | --- |List of design token names, values and metadata for box-shadow
| Name | Value |
| --- | --- |
| `box-shadow-outset-small`Copy | `0 0 0 1px`<br><br>`box-shadow.25-outset` |
| `box-shadow-outset-small-top`Copy | `0 -1px 0 0`<br><br>`box-shadow.25-top` |
| `box-shadow-outset-small-bottom`Copy | `0 1px 0 0`<br><br>`box-shadow.25-bottom` |
| `box-shadow-outset-small-start`Copy | `-1px 0 0 0`<br><br>`box-shadow.25-start` |
| `box-shadow-outset-medium-below`Copy | `0 4px 4px 0`<br><br>`box-shadow.100` |
| `box-shadow-outset-medium-around`Copy | `0 0 8px 0`<br><br>`box-shadow.200` |
| `box-shadow-outset-large-below`Copy | `0 4px 8px 0`<br><br>`box-shadow.300` |
| `box-shadow-outset-large-around`Copy | `0 0 16px 0`<br><br>`box-shadow.400` |

## Box-shadow color [​](#box-shadow-color)

|     |     |
| --- | --- |List of design token names, values and metadata for --cdx-demo-box-shadow-color
| Name | Value |
| --- | --- |
| `box-shadow-color-base`Copy | `#72777d`<br><br>`color.gray500` |
| `box-shadow-color-progressive--active`Copy | `#233566`<br><br>`color.blue900` |
| `box-shadow-color-progressive--focus`Copy | `#6485d1`<br><br>`color.blue500` |
| `box-shadow-color-progressive-selected`Copy | `#88a3e8`<br><br>`color.blue400` |
| `box-shadow-color-progressive-selected--hover`Copy | `#a6bbf5`<br><br>`color.blue300` |
| `box-shadow-color-progressive-selected--active`Copy | `#b6d4fb`<br><br>`color.blue200` |
| `box-shadow-color-destructive--focus`Copy | `#6485d1`<br><br>`color.blue500` |
| `box-shadow-color-inverted`Copy | `#000`<br><br>`color.black` |
| `box-shadow-color-alpha-base`Copy | `rgba( 0, 0, 0, 0.87 )`<br><br>`color.opacity-high-dark` |
| `box-shadow-color-transparent`Copy | `transparent`<br><br>`color.transparent` |

## Drop shadow (deprecated) [​](#drop-shadow-deprecated)

_Drop shadows are deprecated, and [shadow shorthands](#shadow-shorthand) should be used instead._

|     |     |
| --- | --- |List of design token names, values and metadata for box-shadow
| Name | Value |
| --- | --- |
| `box-shadow-drop-small`Copy<br><br>**deprecated** | `0 0 0 1px #72777d`<br><br>`box-shadow.outset.small`<br><br>`box-shadow.color.base` |
| `box-shadow-drop-medium`Copy<br><br>**deprecated** | `0 4px 4px 0 rgba( 0, 0, 0, 0.87 ), 0 0 8px 0 rgba( 0, 0, 0, 0.87 )`<br><br>`box-shadow.outset.medium-below`<br><br>`box-shadow.color.alpha-base`<br><br>`box-shadow.outset.medium-around`<br><br>`box-shadow.color.alpha-base` |
| `box-shadow-drop-xx-large`Copy<br><br>**deprecated** | `0 20px 48px 0 rgba( 0, 0, 0, 0.2 )`<br><br>`box-shadow.500` |

Pager

[Previous pageBorder](/codex/main/design-tokens/border.html)

[Next pageBox-sizing](/codex/main/design-tokens/box-sizing.html)