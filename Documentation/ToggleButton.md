# ToggleButton
A ToggleButton is a button that can be toggled on and off.

```vue
<cdx-toggle-button v-model="buttonValue">Button text</cdx-toggle-button>
```

|Name|Value|
|---|---|
|Props||
|`disabled`|`disabled`|
|`quiet`|`quiet`|
|Slots||
|`default`|`Button text`|
|View||
|Reading direction|LTR, RTL|

## Overview
### When to use ToggleButton
Use the ToggleButton component for options that require state persistence and are longer or more involved than a typical button click action. Avoid using ToggleButton if you need to trigger an immediate action; in this case use a [Button](https://doc.wikimedia.org/codex/latest/components/demos/button.html) instead.

There are two types of ToggleButtons: normal and quiet. Only use quiet ToggleButton for an easily recognizable action that does not detract focus from the content. There is no ToggleButton variant designed for progressive or destructive actions.

### About ToggleButton
ToggleButton includes the following elements.

### Label
Labels should be as short as possible, with text that clearly states what state is changed when toggling the ToggleButton (eg. show/hide).

ToggleButton label should ideally be fewer than 38 characters in English, as translations average 42 characters. Logographic and Arabic-script languages are generally shorter, while Romance, some Germanic, Slavic, Austronesian, and others like Greek and Finnish tend to be longer, averaging 45–53 characters.

✅Use the same text and icon in both off and on states.

✅Use descriptive, accessible verbs to encourage action. [Concise](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-concise) & [Accessible](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-accessible)

✅Write in sentence case, capitalising only the first word. [Consistent](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-consistent)

⚠️Avoid using similar words for different ToggleButtons. [Clear](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear)

⚠️Avoid verbs that imply visual or sensory abilities such as "see", or are idiomatic or vague. [Accessible](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-accessible) & [Translatable](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-translatable)

### Icon (optional)
Icons simplify user recognition and provide the ability to shorten labels to a minimum. For icon-only ToggleButtons, the label will be visually hidden while still available to screen reader users.

✅Ensure that icons used in ToggleButtons are relevant and easily recognizable.
⚠️Avoid using icons that are difficult to recognize or do not clearly convey their purpose.

## Examples
### Basic usage
ToggleButtons should always have a static label. This helps indicate to the user (including users of assistive technology) what it means for the ToggleButton to be on or off. If you want a button with a label that changes when it is pressed, use the [Button](https://doc.wikimedia.org/codex/latest/components/demos/button.html) component instead.

Press the ToggleButton to check the value change.

```vue
<template>
	<cdx-toggle-button
		v-model="buttonValue"
		@update:model-value="onUpdate"
	>
		Toggle
	</cdx-toggle-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleButton',
	components: { CdxToggleButton },
	setup() {
		const buttonValue = ref( false );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttonValue,
			onUpdate
		};
	}
} );
</script>
```
**Developer notes**<br>
Open up the console to check emitted events.

### With icon
Use an icon with the ToggleButton label when you need to convey meaning through both textual and visual elements.
```vue
<template>
	<cdx-toggle-button
		v-model="buttonValue"
		@update:model-value="onUpdate"
	>
		<cdx-icon :icon="cdxIconPlay" />
		Play
	</cdx-toggle-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPlay } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'SingleButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttonValue,
			onUpdate,
			cdxIconPlay
		};
	}
} );
</script>
```
### Icon-only button
When the ToggleButton includes only an icon and no text, add an aria-label to the ToggleButton to ensure the action is understandable to those using assistive technology.

```vue
<template>
	<cdx-toggle-button
		v-model="buttonValue"
		aria-label="Edit"
	>
		<cdx-icon :icon="cdxIconEdit" />
	</cdx-toggle-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
	components: { CdxToggleButton, CdxIcon },
	setup() {
		const buttonValue = ref( false );

		return {
			buttonValue,
			cdxIconEdit
		};
	}
} );
</script>
```

## Technical implementation
### Vue usage
The `v-model` value will be a boolean, it is `true` if the ToggleButton is currently toggled ("on") and `false` otherwise ("off").

#### Props
|Prop name|Description|Type|Default|
|---|---|---|---|
|`modelValue`|Whether the ToggleButton should be set to "on" (true) or "off" (false).<br>Provided by `v-model` binding in the parent component.|`boolean`|`false`|
|`disabled`|Whether the disabled attribute should be added to the ToggleButton, which prevents it from being clicked.|`boolean`|`false`|
|`quiet`|Whether the ToggleButton should be "quiet", which renders more minimally.|`boolean`|`false`|

#### Events
|Event name|Properties|Description|
|---|---|---|
|`update:modelValue`|**modelValue** `boolean` - The new model value|Emitted when modelValue changes (i.e. when the state is toggled)|

#### Slots
|Name|Description|Bindings|
|---|---|---|
|default|ToggleButton content||

#### Keyboard navigation
|Key|Function|
|---|---|
|`Tab`|It moves the focus to the next interactive element.|
|`Shift` + `Tab`|It moves the focus to the previous interactive element.|
|`Enter` / `Space`|If the focus is placed on the button, it toggles the ToggleButton on and off.|