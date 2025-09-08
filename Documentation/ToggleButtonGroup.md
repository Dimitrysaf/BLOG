# ToggleButtonGroup
A ToggleButtonGroup is a group of [ToggleButtons](https://doc.wikimedia.org/codex/latest/components/demos/toggle-button.html) that allows users to select one or multiple buttons from the group.

|Name|Value|
|---|---|
|Props||
|`disabled`|`disabled`|
|View||
|Reading direction|LTR, RTL|

## Overview
### When to use ToggleButtonGroup
Use the ToggleButtonGroup component when you require users to select either one or multiple options from a group. If you want users to choose from a set of actions, with the restriction that only one can be active at a time, use the [ButtonGroup](https://doc.wikimedia.org/codex/latest/components/demos/button-group.html) instead.

Use the ToggleButtonGroup to filter information on the screen or switch between views. To navigate between different sections of content on the page, use [Tabs](https://doc.wikimedia.org/codex/latest/components/demos/tabs.html) instead.

### About ToggleButtonGroup
ToggleButtonGroup consists of a minimum of two ToggleButtons, which include the following elements.

### Label
Each button within the ToggleButtonGroup must have a label. Button labels should be as short as possible, with text that clearly states what option will be selected when the button is toggled on.

✅Customize the content of each button, allowing for superscript, subscript, or special characters.<br>
✅Use numbers instead of text if needed.

### Icon (optional)
Icons simplify user recognition and provide the ability to shorten button labels to a minimum. In the case of icon-only buttons, the label will be available only to screen reader users.

✅Mix text-only and icon-only buttons exclusively when using the ‘ellipsis‘ icon to indicate additional actions.<br>
⚠️In order to ensure consistency, avoid mixing different types of button contents within the same ButtonGroup.<br>
✅Icon-only buttons may be used to form a ToggleButtonGroup but only if the icons used are [universally understood](https://doc.wikimedia.org/codex/latest/style-guide/icons.html#universal-rather-than-culturally-specific) and do not require accompanying text.

## Examples
### Single value
In this example, one button can be selected at a time.

```vue
<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
		:disabled="disabled"
		@update:model-value="onUpdate"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
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

		// Initializing to null indicates that this is a single-select group
		const selectedValue = ref( null );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttons,
			selectedValue,
			onUpdate
		};
	}
} );
</script>
```
**Developer notes**
To allow only a single value to be selected, initialize `v-model` to `null`. Open up the console to review emitted events.

### Initially selected
The ToggleButtonGroup can have an initial selection.

```vue
<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';
import {
	cdxIconImageLayoutBasic,
	cdxIconImageLayoutFrame,
	cdxIconImageLayoutFrameless,
	cdxIconImageLayoutThumbnail
} from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'InitiallySelectedSingleValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'basic', label: 'Basic', icon: cdxIconImageLayoutBasic },
			{ value: 'framed', label: 'Framed', icon: cdxIconImageLayoutFrame },
			{ value: 'frameless', label: 'Frameless', icon: cdxIconImageLayoutFrameless },
			{ value: 'thumbnail', label: 'Thumbnail', icon: cdxIconImageLayoutThumbnail }
		];

		// Initially select the 'Framed' button
		const selectedValue = ref( 'framed' );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
```
**Developer notes**
To start with one button already selected, initialize `v-model` to that value.

Use the `icon` property to add an icon before the text of a button. Use the `disabled` property to disable individual buttons. For more information on how to control the appearance of each button, visit the [ButtonGroup documentation](https://doc.wikimedia.org/codex/latest/components/demos/button-group.html).

### Multiple values
In this example, multiple buttons can be selected at a time.

```vue
<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
		@update:model-value="onUpdate"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';
import { cdxIconBell, cdxIconCalendar, cdxIconUserAvatar } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'MultiValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'notification', label: null, icon: cdxIconBell, ariaLabel: 'Notification' },
			{ value: 'calendar', label: null, icon: cdxIconCalendar, ariaLabel: 'Calendar' },
			{ value: 'user', label: null, icon: cdxIconUserAvatar, ariaLabel: 'User' }
		];

		// Initializing to an array indicates that this is a multi-select group
		const selectedValue = ref( [] );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttons,
			selectedValue,
			onUpdate
		};
	}
} );
</script>
```
**Developer notes**
To allow multiple values to be selected, initialize `v-model` to an empty array (`[]`). To start with some of buttons already selected, initialize `v-model` to an array of the values of those buttons. Open up the console to review emitted events.

### Disabled
You can disable the entire ToggleButtonGroup or individual buttons.

```vue
<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
		:disabled="true"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four', disabled: true },
			{ value: 5, label: 'Five' }
		];

		const selectedValue = ref( null );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
```
**Developer notes**
The entire component can be disabled by setting the `disabled` prop. Individual buttons can be disabled by setting their `disabled` property.

### Overflowing buttons
When the button group is too large to fit on one line, the buttons overflow to the next line.

```vue
<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MaximumToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'First button' },
			{ value: 2, label: 'Second button' },
			{ value: 3, label: 'Third button with a long label' },
			{ value: 4, label: 'Fourth button with a long label' },
			{ value: 5, label: 'Fifth button' }
		];

		const selectedValue = ref( [] );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
```

### Custom button display
The contents of the buttons can be customized using the default slot.

```vue
<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	>
		<template #default="{ button }">
			{{ button.label }}
			<span>
				(value: {{ button.value }})
			</span>
		</template>
	</cdx-toggle-button-group>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToggleButtonGroupWithSlot',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' }
		];

		const selectedValue = ref( 2 );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
```
**Developer notes**
The `ButtonGroupItem` object for each button is available through the `button` binding, and the selected state of each button is available through the `selected` binding. In this example, the value of the button is displayed after its label, but only if the button is selected.

## Technical implementation
### Vue usage
Whether the group is single-select or multi-select is automatically detected based on the value bound to v-model: if it's an array, the group allows multiple selections; otherwise, it only allows a single selection. To initially select nothing, initialize the v-model value to null (for single-select groups) or [] (for multi-select groups).
#### Props
|Prop name|Description|Type|Default|
|---|---|---|---|
|`buttons`(required)|Buttons to display. See the ButtonGroupItem type.|`ButtonGroupItem[]`||
|`modelValue`(required)|Selected value, or array of selected values.<br>If this is a string or number, the button whose value equals that string or number is selected, and only a single selection is allowed. If this is an array, the buttons whose values equal any of the values in the array are selected, and multiple selections are allowed. To select none of the buttons initially, set this to `null` (for single-selection groups) or to `[]` (for multi-selection groups).<br>Must be bound with `v-model`.|`string|number|null|( string|number )[]`||
|`disabled`|Whether the entire group is disabled.<br>If this is set to true, all buttons in the group are disabled. Buttons can also be disabled individually by setting their `disabled` property to true.|`boolean`|`false`|

#### Events
|Event name|Properties|Description|
|---|---|---|
|`update:modelValue`|**modelValue** `string|number|( string|number )[]` - The new model value|Emitted when modelValue changes.|

#### Slots
|Key|Function|
|---|---|
|`Tab`|It moves the focus to the next button within the group or to the next interactive element in tab order when the focus is placed on the last button of the group.|
|`Shift` + `Tab`|It moves the focus to the previous button within the group or to the previous interactive element when the focus is placed on the first button of the group.|
|`Enter` / `Space`|If the focus is placed on one of the ToggleButtons within the group, it toggles that button on and off.|
