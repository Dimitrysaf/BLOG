# Radio [​](#radio)

A Radio is a binary input that is usually combined in a group of two or more options. They signal a pattern where users can only select one of the available options. Radios are also known as “radio buttons”.

Radio label

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| status | default<br><br>error |
| disabled |     |
| Slots |     |
| default |     |
| description |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Radio [​](#when-to-use-radio)

Radio must feature a descriptive label. They must be part of a Radio group of at least two elements. A Radio may also have sub-components or child Radio groups.

Use the Radio component to make a single selection from a list of options where only one choice is allowed. When multiple selections are needed, use [Checkbox](./checkbox.html) instead.

### About Radio [​](#about-radio)

Radio includes the following elements.

#### Radio [​](#radio-1)

Radio buttons make the selection visually distinct.

#### Label [​](#label)

The Radio must always contain a label, with the text size matching the base font size for consistency with the body text. Labels can include links and bold text and should be concise, clearly indicating the selected option.

*   Keep the choices short and mutually exclusive. [_Concise_](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-concise), [_Clear_](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear) & [_Trustworthy_](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-trustworthy)
    
*   Use text formatting like bold and italic sparingly in the label.
*   Include standalone links within the label to provide additional information regarding a specific option when necessary.
*   Avoid linking the entire label as it could cause issues with the selection.

#### Description (optional) [​](#description-optional)

If additional information about the label is required, a description can be included.

## Examples [​](#examples)

### Label and description [​](#label-and-description)

Radios must always have a label and can also feature a description.

Search completion

Default (recommended) Corrects up to two typos. Removes redirects that are very similar to the main title.

Strict mode (advanced) No typo correction. No accent folding. Strict matching.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :is-fieldset="true">
		<template #label>
			Search completion
		</template>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-descriptions"
			:input-value="radio.value"
		>
			{{ radio.label }}
			<template #description>
				{{ radio.description }}
			</template>
		</cdx-radio>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadiosWithDescriptions',
	components: { CdxRadio, CdxField },
	setup() {
		const radioValue = ref( 'default' );
		const radios = [
			{
				label: 'Default (recommended)',
				description: 'Corrects up to two typos. Removes redirects that are very similar to the main title.',
				value: 'default'
			},
			{
				label: 'Strict mode (advanced)',
				description: 'No typo correction. No accent folding. Strict matching.',
				value: 'strict'
			}
		];

		return {
			radioValue,
			radios
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :is-fieldset="true">
		<template #label>
			Search completion
		</template>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-descriptions"
			:input-value="radio.value"
		>
			{{ radio.label }}
			<template #description>
				{{ radio.description }}
			</template>
		</cdx-radio>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxRadio, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'RadiosWithDescriptions',
	components: { CdxRadio, CdxField },
	setup() {
		const radioValue = ref( 'default' );
		const radios = [
			{
				label: 'Default (recommended)',
				description: 'Corrects up to two typos. Removes redirects that are very similar to the main title.',
				value: 'default'
			},
			{
				label: 'Strict mode (advanced)',
				description: 'No typo correction. No accent folding. Strict matching.',
				value: 'strict'
			}
		];

		return {
			radioValue,
			radios
		};
	}
} );
</script>
```

### Developer notes

This demo uses the [Field](./field.html) component—usage of this component is described in the next section. Always include label text via the default slot. You can also add description text via the `#description` slot.

### Form field [​](#form-field)

When used in a form, a group of Radios can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Visit the [Field](./field.html) page for more information.

If using a Radio group outside of a form, follow the instructions in the next demo.

Notifications Choose how often you'd like to receive notifications

Daily

Weekly

Monthly

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :is-fieldset="true">
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-field"
			:input-value="radio.value"
		>
			{{ radio.label }}
		</cdx-radio>
		<template #label>
			Notifications
		</template>
		<template #description>
			Choose how often you'd like to receive notifications
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
	CdxField,
	CdxRadio
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadioGroupField',
	components: {
		CdxField,
		CdxRadio
	},
	setup() {
		const radioValue = ref( 'daily' );
		const radios = [
			{
				label: 'Daily',
				value: 'daily'
			},
			{
				label: 'Weekly',
				value: 'weekly'
			},
			{
				label: 'Monthly',
				value: 'monthly'
			}
		];

		return {
			radioValue,
			radios
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :is-fieldset="true">
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-field"
			:input-value="radio.value"
		>
			{{ radio.label }}
		</cdx-radio>
		<template #label>
			Notifications
		</template>
		<template #description>
			Choose how often you'd like to receive notifications
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const {
	CdxField,
	CdxRadio
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'RadioGroupField',
	components: {
		CdxField,
		CdxRadio
	},
	setup() {
		const radioValue = ref( 'daily' );
		const radios = [
			{
				label: 'Daily',
				value: 'daily'
			},
			{
				label: 'Weekly',
				value: 'weekly'
			},
			{
				label: 'Monthly',
				value: 'monthly'
			}
		];

		return {
			radioValue,
			radios
		};
	}
} );
</script>
```

### Developer notes

When building a Radio field, **always set `isFieldset` to `true`** to ensure proper accessibility support. This wraps the group in a `<fieldset>` element and labels it with an associated `<legend>`.

### Radio group [​](#radio-group)

Radios must be used in multiples.

Radio group demo

Radio 1

Radio 2 (initially selected)

Radio 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps

Radio 4 (disabled)

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<div role="radiogroup" aria-labelledby="cdx-demo-radio-group-label">
		<cdx-label id="cdx-demo-radio-group-label">
			Radio group demo
		</cdx-label>

		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group"
			:input-value="radio.value"
			:disabled="radio.disabled"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadioGroup',
	components: { CdxRadio, CdxLabel },
	setup() {
		const radioValue = ref( 'radio-2' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1',
				disabled: false
			},
			{
				label: 'Radio 2 (initially selected)',
				value: 'radio-2',
				disabled: false
			},
			{
				label: 'Radio 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps',
				value: 'radio-3',
				disabled: false
			},
			{
				label: 'Radio 4 (disabled)',
				value: 'radio-4',
				disabled: true
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
```

vue

```
<template>
	<div role="radiogroup" aria-labelledby="cdx-demo-radio-group-label">
		<cdx-label id="cdx-demo-radio-group-label">
			Radio group demo
		</cdx-label>

		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group"
			:input-value="radio.value"
			:disabled="radio.disabled"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxRadio, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'RadioGroup',
	components: { CdxRadio, CdxLabel },
	setup() {
		const radioValue = ref( 'radio-2' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1',
				disabled: false
			},
			{
				label: 'Radio 2 (initially selected)',
				value: 'radio-2',
				disabled: false
			},
			{
				label: 'Radio 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps',
				value: 'radio-3',
				disabled: false
			},
			{
				label: 'Radio 4 (disabled)',
				value: 'radio-4',
				disabled: true
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
```

### Developer notes

For a group of Radios, each Radio component's `v-model` will be bound to the same ref, which is equal to the `inputValue` prop of the selected Radio. Use the same `name` prop for all of the Radio components in a group.

This demo shows what to do when using a Radio group outside of a form:

1.  Wrap the group in an element with `role="radiogroup"`
2.  Connect the group with a label via the `aria-labelledby` attribute

### Inline Radios [​](#inline-radios)

Radios can be horizontally stacked if needed in some specific cases. However, the recommendation is to vertically stack them to keep consistency across forms.

*   Use inline Radios, but reserve its use for specific cases to prevent disruptions in the reading flow.
*   Avoid using inline Radios if there are too many radios per line.
*   Avoid using inline Radios if there is significant variation in the length of the radio labels.

Inline Radio group demo

Radio 1

Radio 2

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :is-fieldset="true" :hide-label="true">
		<template #label>
			Inline Radio group demo
		</template>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="inline-radios"
			:input-value="radio.value"
			:inline="true"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InlineRadios',
	components: { CdxRadio, CdxField },
	setup() {
		const radioValue = ref( 'radio-1' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1'
			},
			{
				label: 'Radio 2',
				value: 'radio-2'
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :is-fieldset="true" :hide-label="true">
		<template #label>
			Inline Radio group demo
		</template>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="inline-radios"
			:input-value="radio.value"
			:inline="true"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxRadio, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InlineRadios',
	components: { CdxRadio, CdxField },
	setup() {
		const radioValue = ref( 'radio-1' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1'
			},
			{
				label: 'Radio 2',
				value: 'radio-2'
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
```

### Developer notes

Use the `inline` prop to get an inline layout.

### With no initial selection [​](#with-no-initial-selection)

Radio group demo with no initial selection

Radio 1

Radio 2

Radio 3

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<div role="radiogroup" aria-labelledby="cdx-demo-radio-group-no-selection-label">
		<cdx-label id="cdx-demo-radio-group-no-selection-label">
			Radio group demo with no initial selection
		</cdx-label>

		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-no-selection"
			:input-value="radio.value"
			:disabled="radio.disabled"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadioGroupNoSelection',
	components: { CdxRadio, CdxLabel },
	setup() {
		const radioValue = ref( '' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1'
			},
			{
				label: 'Radio 2',
				value: 'radio-2'
			},
			{
				label: 'Radio 3',
				value: 'radio-3'
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
```

vue

```
<template>
	<div role="radiogroup" aria-labelledby="cdx-demo-radio-group-no-selection-label">
		<cdx-label id="cdx-demo-radio-group-no-selection-label">
			Radio group demo with no initial selection
		</cdx-label>

		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-no-selection"
			:input-value="radio.value"
			:disabled="radio.disabled"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxRadio, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'RadioGroupNoSelection',
	components: { CdxRadio, CdxLabel },
	setup() {
		const radioValue = ref( '' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1'
			},
			{
				label: 'Radio 2',
				value: 'radio-2'
			},
			{
				label: 'Radio 3',
				value: 'radio-3'
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
```

### With custom input [​](#with-custom-input)

An additional input field can be included within the Radio to allow the user to input a custom response. The custom input within the Radio can include any of the following form components designed to gather user input, including:

*   TextInput and TextArea
*   Select
*   Combobox
*   ChipInput
*   Lookup
*   A combination of more than one input

*   Display the custom input at the end of a Radio group whenever possible.
*   Disable the custom input unless its corresponding Radio is selected.
*   Design a layout where multiple Radios include custom inputs visible simultaneously.

Expiration When do you want the block to expire?

Preset duration

Specific date and time

Other duration

Submit

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<!-- Note: This form does not POST or GET on submit -->
	<form
		id="block-expiration"
		name="expiration-form"
	>
		<cdx-field
			:is-fieldset="true"
			:status="status"
			:messages="messages"
			form="block-expiration"
		>
			<template #label>
				Expiration
			</template>
			<template #description>
				When do you want the block to expire?
			</template>
			<cdx-radio
				v-for="radio in radios"
				:key="'radio-' + radio.value"
				v-model="radioValue"
				name="radio-with-custom-input-demo"
				:input-value="radio.value"
				@change="validate( $event )"
			>
				{{ radio.label }}
				<template v-if="radio.value === 'other'" #custom-input>
					<cdx-field
						:is-fieldset="true"
						:status="textFieldStatus"
						:messages="textFieldMessages"
						class="my-custom-input-field"
					>
						<cdx-text-input
							v-model="otherInputValue"
							aria-label="TextInput custom input"
							placeholder="Custom duration..."
							:disabled="radioValue !== 'other'"
						/>
					</cdx-field>
				</template>
			</cdx-radio>
		</cdx-field>
		<cdx-button
			class="my-button"
			action="progressive"
			weight="primary"
			form="block-expiration"
			name="submit-expiration"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { CdxRadio, CdxField, CdxTextInput, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadiosWithCustomInput',
	components: { CdxRadio, CdxField, CdxTextInput, CdxButton },
	setup() {
		const radioValue = ref( '' );
		const radios = [
			{
				label: 'Preset duration',
				value: 'preset'
			},
			{
				label: 'Specific date and time',
				value: 'specific'
			},
			{
				label: 'Other duration',
				value: 'other'
			}
		];
		const otherInputValue = ref( '' );

		// Validation
		const status = ref( 'default' );
		const textFieldStatus = ref( 'default' );
		const messages = { error: 'Please select an option' };
		const textFieldMessages = { error: '"Other" option must be provided' };
		function validate() {
			// When "other" radio is selected, ensure the custom input has a value.
			if ( radioValue.value === 'other' ) {
				return otherInputValue.value.length > 0;
			} else if ( radioValue.value.length > 0 ) {
				// When a radio other than "other" is selected.
				return true;
			} else {
				// When no radio is selected, validation fails.
				return false;
			}
		}

		function onSubmit() {
			// When validation is successful, show the success message.
			if ( validate() ) {
				status.value = 'default';
				textFieldStatus.value = 'default';
				// eslint-disable-next-line no-alert
				alert( 'Validation successful!' );
			// When validation is unsuccessful, show an error state.
			} else if ( radioValue.value === 'other' && otherInputValue.value.length === 0 ) {
				// When "other" is selected and text field is empty, show text field's error state.
				textFieldStatus.value = 'error';
			} else {
				// When validation is not successful (no selected radio), show the error state.
				status.value = 'error';
			}
		}

		watch( radioValue, () => {
			if ( validate() ) {
				// Reset the statuses when radio selection changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			} else if ( radioValue.value.length > 0 ) {
				// When validation is unsuceessful, reset the statuses when any radio
				// including "other" is selected.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		watch( otherInputValue, () => {
			if ( validate() ) {
				// Reset the statuses when input changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		return {
			radioValue,
			radios,
			otherInputValue,
			status,
			messages,
			validate,
			textFieldStatus,
			textFieldMessages,
			onSubmit
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.my-button {
	margin-top: @spacing-100;
}

.my-custom-input-field {
	.cdx-label {
		padding: 0;
	}

	.cdx-field__help-text {
		margin: 0;
	}
}

</style>
```

vue

```
<template>
	<!-- Note: This form does not POST or GET on submit -->
	<form
		id="block-expiration"
		name="expiration-form"
	>
		<cdx-field
			:is-fieldset="true"
			:status="status"
			:messages="messages"
			form="block-expiration"
		>
			<template #label>
				Expiration
			</template>
			<template #description>
				When do you want the block to expire?
			</template>
			<cdx-radio
				v-for="radio in radios"
				:key="'radio-' + radio.value"
				v-model="radioValue"
				name="radio-with-custom-input-demo"
				:input-value="radio.value"
				@change="validate( $event )"
			>
				{{ radio.label }}
				<template v-if="radio.value === 'other'" #custom-input>
					<cdx-field
						:is-fieldset="true"
						:status="textFieldStatus"
						:messages="textFieldMessages"
						class="my-custom-input-field"
					>
						<cdx-text-input
							v-model="otherInputValue"
							aria-label="TextInput custom input"
							placeholder="Custom duration..."
							:disabled="radioValue !== 'other'"
						></cdx-text-input>
					</cdx-field>
				</template>
			</cdx-radio>
		</cdx-field>
		<cdx-button
			class="my-button"
			action="progressive"
			weight="primary"
			form="block-expiration"
			name="submit-expiration"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
const { defineComponent, ref, watch } = require( 'vue' );
const { CdxRadio, CdxField, CdxTextInput, CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'RadiosWithCustomInput',
	components: { CdxRadio, CdxField, CdxTextInput, CdxButton },
	setup() {
		const radioValue = ref( '' );
		const radios = [
			{
				label: 'Preset duration',
				value: 'preset'
			},
			{
				label: 'Specific date and time',
				value: 'specific'
			},
			{
				label: 'Other duration',
				value: 'other'
			}
		];
		const otherInputValue = ref( '' );

		// Validation
		const status = ref( 'default' );
		const textFieldStatus = ref( 'default' );
		const messages = { error: 'Please select an option' };
		const textFieldMessages = { error: '"Other" option must be provided' };
		function validate() {
			// When "other" radio is selected, ensure the custom input has a value.
			if ( radioValue.value === 'other' ) {
				return otherInputValue.value.length > 0;
			} else if ( radioValue.value.length > 0 ) {
				// When a radio other than "other" is selected.
				return true;
			} else {
				// When no radio is selected, validation fails.
				return false;
			}
		}

		function onSubmit() {
			// When validation is successful, show the success message.
			if ( validate() ) {
				status.value = 'default';
				textFieldStatus.value = 'default';
				// eslint-disable-next-line no-alert
				alert( 'Validation successful!' );
			// When validation is unsuccessful, show an error state.
			} else if ( radioValue.value === 'other' && otherInputValue.value.length === 0 ) {
				// When "other" is selected and text field is empty, show text field's error state.
				textFieldStatus.value = 'error';
			} else {
				// When validation is not successful (no selected radio), show the error state.
				status.value = 'error';
			}
		}

		watch( radioValue, () => {
			if ( validate() ) {
				// Reset the statuses when radio selection changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			} else if ( radioValue.value.length > 0 ) {
				// When validation is unsuceessful, reset the statuses when any radio
				// including "other" is selected.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		watch( otherInputValue, () => {
			if ( validate() ) {
				// Reset the statuses when input changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		return {
			radioValue,
			radios,
			otherInputValue,
			status,
			messages,
			validate,
			textFieldStatus,
			textFieldMessages,
			onSubmit
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.my-button {
	margin-top: @spacing-100;
}

.my-custom-input-field {
	.cdx-label {
		padding: 0;
	}

	.cdx-field__help-text {
		margin: 0;
	}
}

</style>
```

### Developer notes

To add a custom input, use the `custom-input` slot to pass in an input like TextInput, TextArea, Select, Combobox, ChipInput, Lookup, or a combination of more than one input.

In the example below, the custom input is always visible but remains disabled until its parent Radio component is selected. Inside the custom input `<div>`, a Field wraps the TextInput to display its own validation message.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Typical use of this component will involve using `v-for` to loop through an array of items and output a Radio component for each one. Each Radio will have the same `v-model` binding and `name` prop, but different `inputValue` props and label content.  
The `v-model` value is the `inputValue` of the Radio that is currently on.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `modelValue` | Value of the currently selected radio.  <br>  <br>Provided by `v-model` binding in the parent component. | `string\|number\|boolean` | `''` |
| `inputValue` | HTML "value" attribute to assign to the input.  <br>  <br>Required for input groups. | `string\|number\|boolean` | `false` |
| `name`(required) | HTML "name" attribute to assign to the input. | `string` |     |
| `disabled` | Whether the disabled attribute should be added to the input. | `boolean` | `false` |
| `inline` | Whether the component should display inline.  <br>  <br>By default, `display: block` is set and a margin exists between sibling components, for a stacked layout. | `boolean` | `false` |
| `status` | Validation status of the Radio. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:modelValue` | **modelValue** `string\|number\|boolean` - The new model value | Emitted when modelValue changes. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Label text. |     |
| description | Short description text. |     |
| custom-input | Custom input. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

Radio 1

Show codeCopy code

html

```
<div class="cdx-radio">
  <div class="cdx-radio__wrapper">
    <!-- <input> element with id, type, name, and any other necessary
		attributes. The actual input is visually hidden. -->
    <input
      id="radio-css-only-1"
      class="cdx-radio__input"
      type="radio"
      name="radio-css-only"
    />
    <!-- Empty span that will be styled to look like a radio input. -->
    <span class="cdx-radio__icon"></span>
    <div class="cdx-radio__label cdx-label">
      <!-- Label with `for` attribute matching the input's id. -->
      <label for="radio-css-only-1" class="cdx-label__label">
        <span class="cdx-label__label__text"> Radio 1 </span>
      </label>
    </div>
  </div>
</div>
```

#### With description [​](#with-description)

To add a description below the label:

*   Add a `<span>` after the `<label>` element with an ID and class `cdx-label__description`. Include the description text here.
*   Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the description

Search completion

Default (recommended) Corrects up to two typos. Removes redirects that are very similar to the main title.

Strict mode (advanced) No typo correction. No accent folding. Strict matching.

Show codeCopy code

html

```
<fieldset class="cdx-field">
  <legend class="cdx-label">
    <span class="cdx-label__label__text">Search completion</span>
  </legend>
  <div class="cdx-field__control">
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-description-1"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only-description"
          aria-describedby="cdx-description-css-1"
          checked
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label
            for="radio-group-css-only-description-1"
            class="cdx-label__label"
          >
            <span class="cdx-label__label__text"> Default (recommended) </span>
          </label>
          <span id="cdx-description-css-1" class="cdx-label__description">
            Corrects up to two typos. Removes redirects that are very similar to
            the main title.
          </span>
        </div>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-description-2"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only-description"
          aria-describedby="cdx-description-css-2"
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label
            for="radio-group-css-only-description-2"
            class="cdx-label__label"
          >
            <span class="cdx-label__label__text"> Strict mode (advanced) </span>
          </label>
          <span id="cdx-description-css-2" class="cdx-label__description">
            No typo correction. No accent folding. Strict matching.
          </span>
        </div>
      </div>
    </div>
  </div>
</fieldset>
```

#### Radio group [​](#radio-group-1)

Native attributes of the `<input>` element can be used. For example:

*   Add the `checked` attribute to the `<input>` element if it should be selected initially.
*   Add the `disabled` attribute to the `<input>` element if it should be disabled.

Always include one of these two features for accessible grouping:

1.  If using the Radio group in a field, wrap the group in a `<fieldset>` element and add a `<legend>` element with the group label. This method is demonstrated below and requires some style resets on `<fieldset>` and `<legend>`. You can use the CSS-only [Field](./field.html#css-only-version) and [Label](./label.html#css-only-version) components to reset browser styles of these elements.
2.  If using the Radio group outside of a field, wrap the group in a `<div>` with `role="group"` and `aria-labelledby` set to the ID of the group label. Check an example of this [above](#radio-group).

CSS-only Radio group demo

Radio 1

Radio 2 (initially selected)

Radio 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps

Radio 4 (disabled)

Show codeCopy code

html

```
<fieldset class="cdx-field">
  <legend class="cdx-label">
    <span class="cdx-label__label__text">CSS-only Radio group demo</span>
  </legend>
  <div class="cdx-field__control">
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-1"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only"
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-group-css-only-1" class="cdx-label__label">
            <span class="cdx-label__label__text"> Radio 1 </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-2"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only"
          checked
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-group-css-only-2" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Radio 2 (initially selected)
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-3"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only"
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-group-css-only-3" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Radio 3, which has a very long label that spans onto a second line
              to demonstrate what happens when text wraps
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-4"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only"
          disabled
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-group-css-only-4" class="cdx-label__label">
            <span class="cdx-label__label__text"> Radio 4 (disabled) </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</fieldset>
```

#### Inline Radios [​](#inline-radios-1)

Add the `cdx-radio--inline` class to the root element to get an inline layout.

CSS-only inline Radio demo

Radio 1

Radio 2

Show codeCopy code

html

```
<fieldset class="cdx-field">
  <legend class="cdx-label">
    <span class="cdx-label__label__text">CSS-only inline Radio demo</span>
  </legend>
  <div class="cdx-field__control">
    <div class="cdx-radio cdx-radio--inline">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-inline-1"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only-inline"
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-group-css-only-inline-1" class="cdx-label__label">
            <span class="cdx-label__label__text"> Radio 1 </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-radio cdx-radio--inline">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-group-css-only-inline-2"
          class="cdx-radio__input"
          type="radio"
          name="radio-group-css-only-inline"
          checked
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-group-css-only-inline-2" class="cdx-label__label">
            <span class="cdx-label__label__text"> Radio 2 </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</fieldset>
```

#### With custom input [​](#with-custom-input-1)

To add a custom input, add a `<div>` element with the `cdx-radio__custom-input` class inside a Radio. Inside the custom input, add an input like TextInput, TextArea, Select, Combobox, ChipInput, Lookup, or a combination of more than one input.

CSS-only Radio custom input demo

Radio 1

Radio 2 (initially selected)

Radio 3, with custom input

Show codeCopy code

html

```
<fieldset class="cdx-field">
  <legend class="cdx-label">
    <span class="cdx-label__label__text">CSS-only Radio custom input demo</span>
  </legend>
  <div class="cdx-field__control">
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-custom-input-css-only-1"
          class="cdx-radio__input"
          type="radio"
          name="radio-custom-input-css-only"
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-custom-input-css-only-1" class="cdx-label__label">
            <span class="cdx-label__label__text"> Radio 1 </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-custom-input-css-only-2"
          class="cdx-radio__input"
          type="radio"
          name="radio-custom-input-css-only"
          checked
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-custom-input-css-only-2" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Radio 2 (initially selected)
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="radio-custom-input-css-only-3"
          class="cdx-radio__input"
          type="radio"
          name="radio-custom-input-css-only"
        />
        <span class="cdx-radio__icon"></span>
        <div class="cdx-radio__label cdx-label">
          <label for="radio-custom-input-css-only-3" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Radio 3 with custom input
            </span>
          </label>
        </div>
      </div>
      <div class="cdx-radio__custom-input">
        <div class="cdx-text-input">
          <input
            class="cdx-text-input__input"
            type="text"
            placeholder="Start typing..."
          />
        </div>
      </div>
    </div>
  </div>
</fieldset>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | The focus is placed on the next interactive element in tab order. |
| Shift + Tab | The focus is placed on the previous interactive element. |
| Up arrow / Down arrow / Left arrow / Right arrow | When the focus is placed on a Radio within a group, the arrow keys move the focus between the different Radios and select them. |

Pager

[Previous pageMultiselectLookup](/codex/latest/components/demos/multiselect-lookup.html)

[Next pageSelect](/codex/latest/components/demos/select.html)