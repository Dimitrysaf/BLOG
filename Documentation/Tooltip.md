# Tooltip [​](#tooltip)

A Tooltip is a brief message that shows up when a user hovers over a specific part of the user interface, providing additional information.

Button with Tooltip

Tooltip text

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| placement | bottom |
| textContent |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

*   bottom
*   bottom-start
*   bottom-end
*   top
*   top-start
*   top-end
*   right
*   right-start
*   right-end
*   left
*   left-start
*   left-end

## Overview [​](#overview)

### When to use Tooltip [​](#when-to-use-tooltip)

Use the Tooltip component to add a small piece of information to its associated element. Tooltips can be used to explain the meaning or purpose of interface elements like icons and buttons where the initial element might not be clear, or to show the full version of truncated text where space is not available.

### About Tooltip [​](#about-tooltip)

The Tooltip will be shown on hover or focus of its trigger. On touchable screens, the Tooltip can be shown by long pressing on the trigger. By default, the Tooltip appears beneath its trigger, but automatically moves based on the placement of the trigger and the edge of the viewport.

The Tooltip component is purely informational and includes text-only content.

*   Use punctuation for more than one sentence.
*   Don't provide significant details or information in Tooltips, such as errors — Tooltips can be easily overlooked.
*   Don't include interactive elements like links or buttons within a Tooltip.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

Apply a Tooltip to a component or native HTML element. When you hover over the component or element, the Tooltip displays additional information.

TIP

Tooltip is implemented as a custom Vue directive, `v-tooltip` that can be directly applied to a component or HTML element.

Button with tooltip

This is a tooltip

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button v-tooltip="'This is a tooltip'">
		Button with tooltip
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxTooltip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TooltipBasic',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
</script>
```

vue

```
<template>
	<cdx-button v-tooltip="'This is a tooltip'">
		Button with tooltip
	</cdx-button>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton, CdxTooltip } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TooltipBasic',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
</script>
```

### Custom placement [​](#custom-placement)

The default placement of the Tooltip is `bottom`. Specify the placement by using an argument in your directive like `v-tooltip:top`. The `top` argument places the Tooltip on top of the reference element.

The Tooltip can appear in the following places:

*   `bottom`, `bottom-start`, `bottom-end`
*   `top`, `top-start`, `top-end`
*   `right`, `right-start`, `right-end`
*   `left`, `left-start`, `left-end`

Button with tooltip

This is a tooltip

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button v-tooltip:top="'This is a tooltip'">
		Button with tooltip
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxTooltip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TooltipPlacement',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
</script>
```

vue

```
<template>
	<cdx-button v-tooltip:top="'This is a tooltip'">
		Button with tooltip
	</cdx-button>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton, CdxTooltip } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TooltipPlacement',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
</script>
```

## Technical implementation [​](#technical-implementation)

### Vue Usage [​](#vue-usage)

The Tooltip component is implemented as a Vue.js [custom directive](https://vuejs.org/guide/reusability/custom-directives.html#custom-directives). This means that rather than existing as a stand-alone component, it can be added to any component or markup element inside of a Vue.js template.

To use the Tooltip, register it under the `directives` property instead of the `components` property:

js

```
import { defineComponent } from 'vue';
import { CdxButton, CdxTooltip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MyComponent',
	components: { CdxButton },
	directives: {
		tooltip: CdxTooltip
	}
} );
```

In the example above, a directive registered under the name `tooltip` can be used in templates as `v-tooltip`.

If the Tooltip directive is needed across multiple components, consider registering it globally when the Vue app is mounted:

js

```
import { createApp } from 'vue';
import MyApp from './App.vue';
import { CdxTooltip } from '@wikimedia/codex';

const app = createApp( App )
    .directive( 'tooltip', CdxTooltip )
	.mount( '#my-app' );
```

Not directly usable on all components

Vue directives work best when they are applied directly on HTML elements inside another component's template, like `<button>` or `<input>`.

A directive can also be used on another Vue component, but it will always be applied to the outermost element of that component's own template. The Tooltip directive will function as expected when used with the `CdxButton` component (because the outermost element of that component is a `<button>` element), but it will _not_ behave correctly when used with the `CdxTextInput` component (which has a `<div>` as the outermost element).

Future Codex releases may update components like `CdxTextInput` so that the tooltip functionality is built-in. Check the Vue docs about custom directives for more information about how to work with custom directives.

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Esc | Dismisses the Tooltip. |

Pager

[Previous pageTable](/codex/latest/components/demos/table.html)

[Next pageInfoChip](/codex/latest/components/demos/info-chip.html)