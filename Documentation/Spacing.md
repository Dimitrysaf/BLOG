# Spacing [​](#spacing)

`spacing` design tokens are applied in `padding` and `margin` properties. They are used to create a consistent spacing within and between components.

|     |     |
| --- | --- |List of design token names, values and metadata for
| Name | Value |
| --- | --- |
| `spacing-0`Copy | `0`<br><br>`dimension.0` |
| `spacing-6`Copy | `1px`<br><br>`dimension.6` |
| `spacing-12`Copy | `2px`<br><br>`dimension.12` |
| `spacing-25`Copy | `4px`<br><br>`dimension.25` |
| `spacing-30`Copy<br><br>This token is an exception to the scale. Used as vertical \`padding\` in inputs and controls to achieve the default 32px component height. | `5px`<br><br>`dimension.30` |
| `spacing-35`Copy<br><br>This token is an exception to the scale. Used as \`padding\` of the ToggleSwitch component. | `6px`<br><br>`dimension.35` |
| `spacing-50`Copy | `8px`<br><br>`dimension.50` |
| `spacing-65`Copy | `10px`<br><br>`dimension.65` |
| `spacing-75`Copy | `12px`<br><br>`dimension.75` |
| `spacing-100`Copy | `16px`<br><br>`dimension.100` |
| `spacing-125`Copy | `20px`<br><br>`dimension.125` |
| `spacing-150`Copy | `24px`<br><br>`dimension.150` |
| `spacing-200`Copy | `32px`<br><br>`dimension.200` |
| `spacing-250`Copy | `40px`<br><br>`dimension.250` |
| `spacing-300`Copy | `48px`<br><br>`dimension.300` |
| `spacing-400`Copy | `64px`<br><br>`dimension.400` |
| `spacing-half`Copy<br><br>From here on, spacing tokens which are used for positioning values. | `50%`<br><br>`dimension.half` |
| `spacing-full`Copy | `100%`<br><br>`dimension.full` |
| `spacing-horizontal-button`Copy<br><br>Padding should equal 12px of spacing minus the width of the border | `12px - 1px`<br><br>`spacing.75`<br><br>`border-width.base` |
| `spacing-horizontal-button-icon-only`Copy<br><br>Padding should equal 6px of spacing minus the width of the border | `6px - 1px`<br><br>`spacing.35`<br><br>`border-width.base` |
| `spacing-horizontal-button-small-icon-only`Copy<br><br>Padding should equal 2px of spacing minus the width of the border | `2px - 1px`<br><br>`spacing.12`<br><br>`border-width.base` |
| `spacing-horizontal-button-small`Copy<br><br>Padding should equal 6px of spacing minus the width of the border | `6px - 1px`<br><br>`spacing.35`<br><br>`border-width.base` |
| `spacing-horizontal-button-large`Copy<br><br>Padding should equal 16px of spacing minus the width of the border | `16px - 1px`<br><br>`spacing.100`<br><br>`border-width.base` |
| `spacing-horizontal-input-text-two-end-icons`Copy<br><br>Rely on \`calc()\` to make token output usable in all formats. When there are two end icons, (i.e. a clear icon and an end icon), we need to double the horizontal padding and account for the size of the extra icon. This token can be used to calculate the horizontal position of the clear icon and the padding-end of the text input. | `calc( 8px * 2 + 1rem )`<br><br>`spacing.50`<br><br>`size.icon-small` |
| `spacing-start-typeahead-search-figure`Copy<br><br>The amount of space between the TypeaheadSearch figure's parent component and the TypeaheadSearch figure (input icon container, search result thumbnail, and footer icon container). We want this space to be uniform so that the figures vertically line up nicely. We use the same horizontal padding as the MenuItem. | `12px`<br><br>`spacing.75` |
| `spacing-start-typeahead-search-icon`Copy<br><br>The padding required for the icon to center align with the menu item thumbnail. We calculate the difference in size and add it to the expected spacing. | `calc( 12px + ( 40px - 18px ) / 2 )`<br><br>`spacing.start-typeahead-search-figure`<br><br>`min-size.search-figure`<br><br>`min-size.icon-medium` |
| `spacing-typeahead-search-focus-addition`Copy<br><br>The amount the width of the input increases when it is focused to allow for the extra spacing around the search figures. The caret position should remain static. This calculates the padding-left of the input when expanded minus the padding-left of the input when not expanded. (Note that both padding values actually include \`@spacing-50\` as well, but it was left out of the calculation for simplicity's sake.) | `calc( ( 12px + 40px ) - ( 18px + 8px ) )`<br><br>`spacing.start-typeahead-search-figure`<br><br>`min-size.search-figure`<br><br>`min-size.icon-medium`<br><br>`spacing.50` |
| `spacing-toggle-switch-grip-start`Copy | `calc( 1rem * 0.375 )`<br><br>`font-size.medium` |
| `spacing-toggle-switch-grip-end`Copy | `calc( 1rem * 1.25 )`<br><br>`font-size.medium` |

Pager

[Previous pageSize](/codex/main/design-tokens/size.html)

[Next pageTransition](/codex/main/design-tokens/transition.html)