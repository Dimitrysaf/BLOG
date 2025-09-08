# ButtonGroup
A ButtonGroup consists of a set of two or more normal buttons. Buttons in such a group signal a number of equally important actions that will occur when the user taps on them.

|Name|Value|
|---|---|
|Props||
|`disabled`|`disabled`|
|View||
|Reading direction|LTR, RTL|

## Overview
### When to use ButtonGroup
Use the ButtonGroup component when you want users to choose actions from a set of actions, with the restriction that only one can be active at a time. If you want to enable users to select one or multiple options from a set of options, use [ToggleButtonGroup](https://doc.wikimedia.org/codex/latest/components/demos/toggle-button-group.html) instead.

### About ButtonGroup
ButtonGroup consists of a minimum of two neutral normal Buttons, which include the following elements.

### Label
Each button within the ButtonGroup must have a label. Button labels should be as short as possible, with text that clearly states what action will be taken once the button is pressed (e.g. download, submit form, search).

✅Customize the content of each button, allowing for superscript, subscript, or special characters.<br>
⚠️Use numbers instead of text if needed.

### Icon (optional)
Icons simplify user recognition and provide the ability to shorten button labels to a minimum.

✅Mix text-only and icon-only buttons exclusively when using the ‘ellipsis‘ icon to indicate additional actions.<br>
⚠️In order to ensure consistency, avoid mixing different types of button contents within the same ButtonGroup.

## Examples
### Basic usage
```vue
<template>
	<cdx-button-group
		:buttons="buttons"
		:disabled="disabled"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'BasicButtonGroup',
	components: {
		CdxButtonGroup
	},
	props: {
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four' },
			{ value: 5, label: 'Five' }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```
**Developer notes**
Describe the buttons in the group with an array of `ButtonGroupItem` objects. The text in the `label` property will be displayed in the buttons. When a button is clicked, a `click` event will be emitted with the `value` property of the clicked button. Values must be unique within a button group.

If the `label` property is omitted, the `value` property will be used as the label. This allows using `{ value: 'Foo' }` as a shorthand for `{ label: 'Foo', value: 'Foo' }`.

### With icons
Use an icon with the button label when you need to convey meaning through both textual and visual elements.

```vue
<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconDownload, cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonGroupWithIcons',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'edit', label: 'Edit', icon: cdxIconEdit },
			{ value: 'talk', label: 'Discuss', icon: cdxIconSpeechBubble },
			{ value: 'save', label: 'Done', icon: cdxIconCheck },
			{ value: 'download', label: 'Download', icon: cdxIconDownload },
			{ value: 'delete', label: 'Delete', icon: cdxIconTrash }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```

### Icon-only buttons
For icon-only buttons, the label will be visually hidden and available only to users of assistive technology.

✅Icon-only buttons may be used to form a ButtonGroup but only if the icons used are [universally understood](https://doc.wikimedia.org/codex/latest/style-guide/icons.html#universal-rather-than-culturally-specific) and do not require accompanying text.

```vue
<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconDownload, cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'edit', label: null, icon: cdxIconEdit, ariaLabel: 'Edit' },
			{ value: 'talk', label: null, icon: cdxIconSpeechBubble, ariaLabel: 'Discuss' },
			{ value: 'save', label: null, icon: cdxIconCheck, ariaLabel: 'Done' },
			{ value: 'download', label: null, icon: cdxIconDownload, ariaLabel: 'Download' },
			{ value: 'delete', label: null, icon: cdxIconTrash, ariaLabel: 'Delete' }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```
**Developer notes**
To display an icon as the only content of a button, use the `icon` property to specify an icon, and set the `label` property to `null`.

### Disabled
You can disable the entire ButtonGroup or individual buttons.

```vue
<template>
	<cdx-button-group
		:buttons="buttons"
		:disabled="true"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DisabledButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four', disabled: true },
			{ value: 5, label: 'Five' }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```
**Developer notes**
The entire component can be disabled by setting the `disabled` prop. Individual buttons can be disabled by setting their `disabled` property. Clicking a disabled button does not emit a `click` event.

### Overflowing buttons
When the ButtonGroup is too large to fit on one line, the buttons overflow to the next line.

```vue
<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MaximumButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'First button' },
			{ value: 2, label: 'Second button' },
			{ value: 3, label: 'Third button with a long label' },
			{ value: 4, label: 'Fourth button with a long label' },
			{ value: 5, label: 'Fifth button' }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```

### Custom button display
The contents of the buttons can be customized using the default slot.

```vue
<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	>
		<template #default="{ button }">
			{{ button.label }}
			<sup>
				({{ button.value }})
			</sup>
		</template>
	</cdx-button-group>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ButtonGroupWithSlot',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```
**Developer notes**
The `ButtonGroupItem` object for each button is available through the `button` binding. In this example, the value of the button is displayed in superscript after its label.

## Technical implementation
### Vue usage
#### Props
|Prop name|Description|Type|Default|
|---|---|---|---|
|`button`(required)|Objects describing the buttons in the group. See the ButtonGroupItem type.|`ButtonGroupItem[]`||
|`disabled`|Whether the entire group is disabled. <br>If this is set to true, all buttons in the group are disabled. Buttons can also be disabled individually by setting their disabled property to true.|`boolean`|`false`|

#### Events
|Event name|Properties|Description|
|---|---|---|
|`click`|**value** `string|number` - The `value` property of the button that was clicked|Emitted when a button is clicked

#### Slot
|Name|Description|Bindings|
|---|---|---|
|default|Content of an individual button|**button** `ButtonGroupItem` - Object describing the button to display|

#### Keyboard navigation
|Key|Function|
|---|---|
|`Tab`|It moves the focus to the next Button within the group or to the next interactive element in tab order when the focus is placed on the last Button of the group.|
|`Shift` + `Tab`|It moves the focus to the previous Button within the group or to the previous interactive element when the focus is placed on the first Button of the group.|
|`Enter` / `Space`|If the focus is placed on one of the buttons, it activates that Button.|