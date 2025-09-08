# Font [​](#font)

## Font family [​](#font-family)

When referring to `sans-serif` or `serif`, the font-family that will be used is dependent on the operating system. For example, the default sans-serif font in Windows is [Segoe UI](https://en.wikipedia.org/wiki/Segoe#Segoe_UI), and the default sans-serif font in macOS is [SF Pro](https://en.wikipedia.org/wiki/San_Francisco_(sans-serif_typeface)#SF_Pro/SF_UI). Other common system sans-serif fonts include [Arial](https://en.wikipedia.org/wiki/Arial), [Roboto](https://en.wikipedia.org/wiki/Roboto), and [Helvetica](https://en.wikipedia.org/wiki/Helvetica). Common system serif fonts include [Times New Roman](https://en.wikipedia.org/wiki/Times_New_Roman) and [Georgia](https://en.wikipedia.org/wiki/Georgia_(typeface)).

|     |     |
| --- | --- |List of design token names, values and metadata for font-family
| Name | Value |
| --- | --- |
| `font-family-base`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times.<br><br>Reference Vector's default fallback sans instead of the deprecated value \`font-family-sans\` in WikimediaUI Base. | `sans-serif`<br><br>`font-family.sans-10` |
| `font-family-sans`Copy<br><br>**deprecated**<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `'Helvetica Neue', 'Helvetica', 'Liberation Sans', 'Arial', sans-serif`<br><br>`font-family.sans-50` |
| `font-family-system-sans`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `-apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Inter', 'Helvetica', 'Arial', sans-serif`<br><br>`font-family.sans-100` |
| `font-family-sans--fallback`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `sans-serif`<br><br>`font-family.sans-10` |
| `font-family-serif`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif`<br><br>`font-family.serif-100` |
| `font-family-serif--fallback`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `serif`<br><br>`font-family.serif-10` |
| `font-family-monospace`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `'Menlo', 'Consolas', 'Liberation Mono', 'Fira Code', 'Courier New', monospace`<br><br>`font-family.monospace-100` |
| `font-family-monospace--fallback`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `monospace, monospace`<br><br>`font-family.monospace-10` |
| `font-family-heading-main`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times.<br><br>Legacy value from WikimediaUI Base. Use for first heading special treatment. | `'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif`<br><br>`font-family.serif-100` |

## Font size [​](#font-size)

TIP

Font size design tokens are referencing CSS custom properties rather than raw values. This means that the tokens will not work in various preprocessor functions (like Less `unit()`) and may require relying on CSS `calc()` function for basic calculations.

|     |     |
| --- | --- |List of design token names, values and metadata for font-size
| Name | Value |
| --- | --- |
| `font-size-x-small`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times.<br><br>\`x\` stands for extra. In this case extra small. | `0.75rem`<br><br>`font-size.75` |
| `font-size-small`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `0.875rem`<br><br>`font-size.90` |
| `font-size-medium`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1rem`<br><br>`font-size.100` |
| `font-size-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.125rem`<br><br>`font-size.110` |
| `font-size-x-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.25rem`<br><br>`font-size.125` |
| `font-size-xx-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.5rem`<br><br>`font-size.150` |
| `font-size-xxx-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.75rem`<br><br>`font-size.175` |

## Font weight [​](#font-weight)

|     |     |
| --- | --- |List of design token names, values and metadata for font-weight
| Name | Value |
| --- | --- |
| `font-weight-hairline`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `100`<br><br>`font-weight.25` |
| `font-weight-light`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `300`<br><br>`font-weight.75` |
| `font-weight-normal`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `400`<br><br>`font-weight.100` |
| `font-weight-semi-bold`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `600`<br><br>`font-weight.150` |
| `font-weight-bold`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `700`<br><br>`font-weight.175` |

## Line height [​](#line-height)

TIP

Line height design tokens are referencing CSS custom properties rather than raw values. This means that the tokens will not work in various preprocessor functions (like Less `unit()`) and may require relying on CSS `calc()` function for basic calculations.

|     |     |
| --- | --- |List of design token names, values and metadata for line-height
| Name | Value |
| --- | --- |
| `line-height-xxx-small`Copy<br><br>**deprecated**<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.4285714rem`<br><br>`line-height.80` |
| `line-height-xx-small`Copy<br><br>**deprecated**<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.5714285rem`<br><br>`line-height.90` |
| `line-height-x-small`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times.<br><br>\`x\` stands for extra. In this case extra small. | `1.25rem`<br><br>`line-height.125` |
| `line-height-small`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.375rem`<br><br>`line-height.140` |
| `line-height-medium`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.625rem`<br><br>`line-height.160` |
| `line-height-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.75rem`<br><br>`line-height.175` |
| `line-height-x-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `1.875rem`<br><br>`line-height.190` |
| `line-height-xx-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `2.125rem`<br><br>`line-height.210` |
| `line-height-xxx-large`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `2.375rem`<br><br>`line-height.240` |
| `line-height-content`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times.<br><br>Intended for user-generated content that comes from outside of the design system. Components and features should use the standard font-size and line-height tokens instead. | `1.625`<br><br>`line-height-unitless.163` |

## Text decoration [​](#text-decoration)

|     |     |
| --- | --- |List of design token names, values and metadata for text-decoration
| Name | Value |
| --- | --- |
| `text-decoration-none`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `none`<br><br>`text-decoration.0` |
| `text-decoration-line-through`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `line-through`<br><br>`text-decoration.150` |
| `text-decoration-underline`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `underline`<br><br>`text-decoration.200` |

## Text overflow [​](#text-overflow)

|     |     |
| --- | --- |List of design token names, values and metadata for text-overflow
| Name | Value |
| --- | --- |
| `text-overflow-clip`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `clip`<br><br>`text-overflow.100` |
| `text-overflow-ellipsis`Copy<br><br>The quick brown fox  <br>jumps over the lazy dog. Sometimes twice, sometimes three times. | `ellipsis`<br><br>`text-overflow.200` |

Pager

[Previous pageCursor](/codex/main/design-tokens/cursor.html)

[Next pageOpacity](/codex/main/design-tokens/opacity.html)