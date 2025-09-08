# ChipInput [​](#chipinput)

A ChipInput allows users to create chips to filter content or make selections.

chip 1

chip 2

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| separateInput |     |
| status | default<br><br>error |
| disabled |     |
| readonly |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use ChipInput [​](#when-to-use-chipinput)

Use the ChipInput component when users need to enter multiple custom values in a single field, for example when applying filters during a search process.

If only a single input value is anticipated, use [TextInput](./text-input.html) instead.

Avoid using ChipInput for simple filtering processes, or when you don't need to support entering custom values. To provide a set of static options to choose from, use a [Checkbox](./checkbox.html) group or [Select](./checkbox.html) instead. To provide a long, searchable list of predefined options to choose from, use [MultiselectLookup](./multiselect-lookup.html).

### About ChipInput [​](#about-chipinput)

ChipInput includes the following elements.

#### Input [​](#input)

The user can type within this input to create chips.

#### Chips [​](#chips)

The chips are stacked next to each other. Chips are editable and can be removed.

## Examples [​](#examples)

### Basic Usage [​](#basic-usage)

By default, the chips appear within the text input. Alternately, they can be placed in a separate container above the text input.

chip 1

chip 2

Hide codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputBasic',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'chip 1' },
			{ value: 'chip 2' }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
	></cdx-chip-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxChipInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'ChipInputBasic',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'chip 1' },
			{ value: 'chip 2' }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
```

### Developer notes

Pass an array of chip data to the input using `v-model:input-chips`. When the user adds or removes a chip, the array will automatically be updated.

### With chip icons [​](#with-chip-icons)

Chips added by the user cannot be added with icons, but icons can be included in chips provided by the parent component.

Camera

Article

Hide codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconArticle } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ChipInputWithIcons',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'Camera', icon: cdxIconCamera },
			{ value: 'Article', icon: cdxIconArticle }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
	></cdx-chip-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxChipInput } = require( '@wikimedia/codex' );
const { cdxIconCamera, cdxIconArticle } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'ChipInputWithIcons',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'Camera', icon: cdxIconCamera },
			{ value: 'Article', icon: cdxIconArticle }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
```

### Form field [​](#form-field)

A ChipInput can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Refer to the [Field](./field.html) page for more information.

You can place restrictions on what kind of chips can be added. In this example, each chip's label must have 10 characters or fewer.

Aliases Alternative names help others easily find the function

10

Hide codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field
		class="cdx-demo-chip-input-limited"
		:status="status"
		:messages="messages"
	>
		<cdx-chip-input
			v-model:input-chips="exampleChips"
			v-model:input-value="inputValue"
			:chip-validator="chipValidator"
			placeholder="Add one or more aliases"
		/>
		<template #label>
			Aliases
		</template>
		<template #description>
			Alternative names help others easily find the function
		</template>
		<template #help-text>
			<span class="cdx-demo-chip-input-limited__char-count" :class="limitClass">
				{{ characterCount }}
			</span>
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxChipInput, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputWithLimit',
	components: { CdxChipInput, CdxField },
	setup() {
		const inputValue = ref( '' );
		const exampleChips = ref( [] );

		const chipValidator = ( value ) => value.length <= 10;

		const status = computed( () => chipValidator( inputValue.value ) ? 'default' : 'error'
		);
		const messages = { error: 'Chip text is too long' };

		const characterCount = computed( () => 10 - inputValue.value.length );
		const limitClass = computed( () => ( {
			'cdx-demo-chip-input-limited__char-count--error': status.value === 'error'
		} ) );

		return {
			inputValue,
			exampleChips,
			chipValidator,
			status,
			messages,
			characterCount,
			limitClass
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-chip-input-limited {
	&__char-count {
		float: right;

		&--error {
			color: @color-error;
		}
	}
}
</style>
```

vue

```
<template>
	<cdx-field
		class="cdx-demo-chip-input-limited"
		:status="status"
		:messages="messages"
	>
		<cdx-chip-input
			v-model:input-chips="exampleChips"
			v-model:input-value="inputValue"
			:chip-validator="chipValidator"
			placeholder="Add one or more aliases"
		></cdx-chip-input>
		<template #label>
			Aliases
		</template>
		<template #description>
			Alternative names help others easily find the function
		</template>
		<template #help-text>
			<span class="cdx-demo-chip-input-limited__char-count" :class="limitClass">
				{{ characterCount }}
			</span>
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const { CdxChipInput, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'ChipInputWithLimit',
	components: { CdxChipInput, CdxField },
	setup() {
		const inputValue = ref( '' );
		const exampleChips = ref( [] );

		const chipValidator = ( value ) => value.length <= 10;

		const status = computed( () => chipValidator( inputValue.value ) ? 'default' : 'error'
		);
		const messages = { error: 'Chip text is too long' };

		const characterCount = computed( () => 10 - inputValue.value.length );
		const limitClass = computed( () => ( {
			'cdx-demo-chip-input-limited__char-count--error': status.value === 'error'
		} ) );

		return {
			inputValue,
			exampleChips,
			chipValidator,
			status,
			messages,
			characterCount,
			limitClass
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-chip-input-limited {
	&__char-count {
		float: right;

		&--error {
			color: @color-error;
		}
	}
}
</style>
```

### Developer notes

To test chip text before a new chip is added, pass in a validation function via the `chipValidator` prop. If the chip text fails validation, a new chip will not be added and the "error" status will be set.

If you need access to the current value of the text input, for validation or other purposes, you can use `v-model` to bind a string ref to the ChipInput, just like you would with a [TextInput](./text-input.html#basic-usage).

In the example below, the input value is bound with `v-model` and is used to show the number of remaining characters allowed as the user is typing. A `chipValidator` is passed in that tests whether the text is 10 or fewer characters.

Placeholder and other attributes of the `<input>` element can be bound to the ChipInput component and will be passed down to the `<input>` element within.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `inputChips`(required) | Current chips present in the input.  <br>  <br>Provided by `v-model` binding in the parent component. | `[ChipInputItem](../types-and-constants.html#chipinputitem)[]` |     |
| `inputValue` | Current value of the text input. This prop is optional and should only be used if you need to keep track of the text input value for some reason (e.g. for validation).  <br>  <br>Optionally provided by `v-model:input-value` binding in the parent component. | `string\|number` | `null` |
| `separateInput` | Whether the text input should appear below the set of input chips.  <br>  <br>By default, the input chips are inline with the input. | `boolean` | `false` |
| `status` | `status` attribute of the input. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |
| `chipValidator` | Validation function for chip text. If it returns false, the chip will not be added and the error status will be set. | `[ChipValidator](../types-and-constants.html#chipvalidator)` | `( value: string\|number ) => true` |
| `disabled` | Whether the input is disabled. | `boolean` | `false` |
| `readonly` | Whether the ChipInput is readonly. | `boolean` | `false` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:input-chips` | **inputChips** `[ChipInputItem](../types-and-constants.html#chipinputitem)[]` - The new set of inputChips | When the input chips change. |
| `update:input-value` | **inputValue** `string\|number` - The new input value | When the input value changes. Only emitted if the inputValue prop is provided. |
| `chip-click` | **chip** `[ChipInputItem](../types-and-constants.html#chipinputitem)` - The clicked chip | When a chip is clicked. |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus between the chips within the input. When the focus is placed on the last chip, it moves the focus to the input to create more chips. While typing in the input, pressing it creates a chip with the typed text and then moves the focus to the next interactive element in tab order. |
| Shift + Tab | It moves the focus to the previous chip within the input or to the previous interactive element in the page. |
| Enter | While typing in the input, pressing Enter creates a chip with the typed text and keeps the input focused. If focused on a chip, pressing Enter makes the chip editable. |
| Esc | While typing in the input, pressing Esc creates a chip with the typed text. Once the chip is created, the input loses focus. When any of the chips or input is focused, pressing Esc removes the focus from the focused element. |
| backspace | If the focus is placed on a chip, this key removes the chip and moves the focus to the previous chip. If it removes the last chip, it moves the focus to the input. If the cursor is at the start of the input, it moves the focus to the last chip. |
| Left arrow / Right arrow | Arrow keys navigate between the chips within the input when they are focused. |