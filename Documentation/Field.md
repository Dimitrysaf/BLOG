# Field [​](#field)

A form field with a label, an input or control, and an optional validation message.

Label textShort description text

Longer help text to explain how to use this field

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| labelIcon |     |
| optional |     |
| hideLabel |     |
| isFieldset |     |
| disabled |     |
| status | default<br><br>error<br><br>warning<br><br>success |
| Slots |     |
| label |     |
| description |     |
| help-text |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

## Overview [​](#overview)

### When to use Field [​](#when-to-use-field)

Use the Field component to create form layouts with a variety of form inputs, such as:

*   TextInput and TextArea
*   Select
*   Combobox
*   Checkbox, Radio groups, and ToggleSwitch
*   ChipInput
*   Lookup and MultiselectLookup

If you do not need to collect user input, do not use Field. For example, Field is not necessary to display a SearchInput. Although SearchInput is built with a TextInput component, it triggers an action and is not a form item.

### About Field [​](#about-field)

Field provides features for building a form field to collect user input. Field includes the following elements.

#### Label [​](#label)

A `label` serves as a precise and informative title for the form field, indicating the type of information to be entered. Explore [Label](./label.html) to check its different properties.

*   Keep the Field’s label short, clear, and easy to scan. [_Consistent_](./../../style-guide/writing-for-copy.html#is-this-consistent) & [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear)
    
*   Label text is bold by default, but the label of nested fields should use the regular font weight to make the hierarchy clear.
*   Use a start icon next to the label to emphasize the required input in the form field.
*   Avoid using an icon next to the label if the input already contains an icon.

#### Optional indicator (optional) [​](#optional-indicator-optional)

Fields are assumed to be required by default. If a field is optional, it can be labeled as such.

*   Only indicate the optional Fields in the form, ensuring that the entire word "optional" is displayed for translation purposes.
*   Don't mark required labels with an asterisk or use abbreviations in the optional indicator.

#### Description (optional) [​](#description-optional)

A description can also be added below the label to provide more information about it. This description can include plain text and links.

#### Input(s) [​](#input-s)

The input element, or a group of inputs, where the user enters information. Field can use any form input such as TextInput, Select, Checkbox, etc.

#### Placeholder (when applicable) [​](#placeholder-when-applicable)

Labels indicate what the input should be. Placeholder text provides an example of what type of information is being requested in the input.

*   Placeholder text should further illustrate and support the label. [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear)
    
*   Placeholder text should never replace the label nor be the input's only description. [_Accessible_](./../../style-guide/writing-for-copy.html#is-this-accessible)
    

#### Help text (optional) [​](#help-text-optional)

Help text provides supplementary information or instructions to guide users in completing the field correctly. This text often clarifies formatting or indicates input restrictions. Help text can include plain text and links.

*   Give clear information about input restrictions. [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear) & [_Accessible_](./../../style-guide/writing-for-copy.html#is-this-accessible)
    

#### Validation message [​](#validation-message)

An inline validation message will appear to provide feedback about the status of the field.

## Examples [​](#examples)

For more detailed information about form fields, consult the guidelines for [constructing forms](./../../style-guide/constructing-forms.html).

### Validation messages [​](#validation-messages)

You can display a validation message based on the current status of the field.

### Developer notes

Set the `status` prop based on the field's validity, then pass in an object of `messages` keyed on [validation status type](./../types-and-constants.html#validationstatustype). If there is a message for the current status, it will be displayed. Children of the Field component will automatically display styles for that status.

Setting the status based on field validity is up to you. In the [error example](#error), it's done as you're changing the input. You could also validate on [blur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) to give the user a chance to finish filling out the field, as demonstrated in the [warning example](#warning) and the [success example](#success).

#### Error [​](#error)

Try entering a username into the field below that's longer than a single character to trigger the error state and error message.

*   Let a reader know exactly what to do to fix the issue. [_Relevant_](./../../style-guide/writing-for-copy.html#is-this-relevant) & [_Trustworthy_](./../../style-guide/writing-for-copy.html#is-this-trustworthy)
    
*   Don't give multiple options for fixing the issue. [_Concise_](./../../style-guide/writing-for-copy.html#is-this-concise)
    

Username Enter a unique username

Username cannot be longer than 1 character

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input v-model="inputValue" />
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
		<template #help-text>
			Username cannot be longer than 1 character
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithValidation',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const status = computed( () => inputValue.value.length > 1 ? 'error' : 'default' );
		const messages = { error: 'Your username is too long' };

		return {
			inputValue,
			status,
			messages
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input v-model="inputValue"></cdx-text-input>
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
		<template #help-text>
			Username cannot be longer than 1 character
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const {
	CdxField,
	CdxTextInput
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'FieldWithValidation',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const status = computed( () => inputValue.value.length > 1 ? 'error' : 'default' );
		const messages = { error: 'Your username is too long' };

		return {
			inputValue,
			status,
			messages
		};
	}
} );
</script>
```

#### Warning [​](#warning)

This example shows a warning message on blur if the username doesn't meet the criteria written in the help text. Note that form inputs do not display a "warning" state.

*   Keep messages short and precise. [_Concise_](./../../style-guide/writing-for-copy.html#is-this-concise) & [_Accessible_](./../../style-guide/writing-for-copy.html#is-this-accessible)
    
*   Don't write in a way that might cause a reader to panic or worry. [_Trustworthy_](./../../style-guide/writing-for-copy.html#is-this-trustworthy)
    

Username Enter a unique username

Username must be capitalized and have no spaces

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			@input="onInput"
			@blur="validate"
		/>
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
		<template #help-text>
			Username must be capitalized and have no spaces
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithWarning',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const originalName = ref( '' );
		const status = ref( 'default' );
		const messages = computed( () => ( {
			warning: `The username was automatically changed from "${ originalName.value }" to "${ inputValue.value }".`
		} ) );

		function onInput() {
			// Reset status when input changes.
			status.value = 'default';
		}

		function validate() {
			if ( inputValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			// Trim off spaces at the beginning and end; we don't
			// need to inform the user of this.
			inputValue.value = inputValue.value.trim();

			// Store the original username.
			originalName.value = inputValue.value;

			// Remove spaces.
			inputValue.value = inputValue.value.replace( /\s/g, '' );

			// Capitalize.
			inputValue.value = inputValue.value[ 0 ].toUpperCase() + inputValue.value.slice( 1 );

			// Set warning status if the original username
			// was changed.
			status.value = originalName.value === inputValue.value ? 'default' : 'warning';
		}

		return {
			inputValue,
			status,
			messages,
			onInput,
			validate
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			@input="onInput"
			@blur="validate"
		></cdx-text-input>
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
		<template #help-text>
			Username must be capitalized and have no spaces
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const {
	CdxField,
	CdxTextInput
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'FieldWithWarning',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const originalName = ref( '' );
		const status = ref( 'default' );
		const messages = computed( () => ( {
			warning: `The username was automatically changed from "${ originalName.value }" to "${ inputValue.value }".`
		} ) );

		function onInput() {
			// Reset status when input changes.
			status.value = 'default';
		}

		function validate() {
			if ( inputValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			// Trim off spaces at the beginning and end; we don't
			// need to inform the user of this.
			inputValue.value = inputValue.value.trim();

			// Store the original username.
			originalName.value = inputValue.value;

			// Remove spaces.
			inputValue.value = inputValue.value.replace( /\s/g, '' );

			// Capitalize.
			inputValue.value = inputValue.value[ 0 ].toUpperCase() + inputValue.value.slice( 1 );

			// Set warning status if the original username
			// was changed.
			status.value = originalName.value === inputValue.value ? 'default' : 'warning';
		}

		return {
			inputValue,
			status,
			messages,
			onInput,
			validate
		};
	}
} );
</script>
```

#### Success [​](#success)

This example shows a success message on blur when the username is unique. Note that form inputs do not display a "success" state.

*   Use clear, positive, short messages. [_Accessible_](./../../style-guide/writing-for-copy.html#is-this-accessible) & [_Concise_](./../../style-guide/writing-for-copy.html#is-this-concise)
    
*   Don't include too much information. [_Relevant_](./../../style-guide/writing-for-copy.html#is-this-relevant)
    

Username Enter a unique username

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			@input="onInput"
			@blur="validate"
		/>
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithSuccess',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = computed( () => ( {
			success: `The username "${ inputValue.value }" is available.`
		} ) );

		function onInput() {
			// Reset status when input changes.
			status.value = 'default';
		}

		function validate() {
			if ( inputValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			// If this were real, we'd check to see if the username
			// is actually unique. But this is just an example, so
			// we'll show the success message no matter what.
			status.value = 'success';
		}

		return {
			inputValue,
			status,
			messages,
			onInput,
			validate
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			@input="onInput"
			@blur="validate"
		></cdx-text-input>
		<template #label>
			Username
		</template>
		<template #description>
			Enter a unique username
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const {
	CdxField,
	CdxTextInput
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'FieldWithSuccess',
	components: {
		CdxField,
		CdxTextInput
	},
	setup() {
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = computed( () => ( {
			success: `The username "${ inputValue.value }" is available.`
		} ) );

		function onInput() {
			// Reset status when input changes.
			status.value = 'default';
		}

		function validate() {
			if ( inputValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			// If this were real, we'd check to see if the username
			// is actually unique. But this is just an example, so
			// we'll show the success message no matter what.
			status.value = 'success';
		}

		return {
			inputValue,
			status,
			messages,
			onInput,
			validate
		};
	}
} );
</script>
```

### Fieldset with radio group [​](#fieldset-with-radio-group)

Groups of [Radio](./radio.html) or [Checkbox](./checkbox.html) components are considered fieldsets.

*   Use a fieldset for groups of binary inputs.
    

Notifications Choose how often you'd like to receive notifications

Daily

Weekly

Monthly

Note that you can update this preference later

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
			name="radio-group"
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
		<template #help-text>
			Note that you can update this preference later
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
	name: 'FieldWithRadioGroup',
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
			name="radio-group"
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
		<template #help-text>
			Note that you can update this preference later
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
	name: 'FieldWithRadioGroup',
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

For fieldsets, set the `isFieldset` prop to `true`. This will output a `<fieldset>` element with a `<legend>` instead of a label.

### Field with multiple inputs [​](#field-with-multiple-inputs)

The following example is a fieldset with two inputs that depend on one another. Each input needs its own individual label, but in this case, the individual labels can be visually-hidden.

*   Use a fieldset for any field that contains multiple inputs or controls that depend on one another to form a single meaningful value or dataset.
*   Don't use a fieldset to group separate inputs or for layout purposes.

Coordinate location (optional)

Coordinates

to 1/1000 of an arcsecond

Please enter coordinates as decimal degrees.

Disable entire field

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field
		class="cdx-demo-complex-field"
		:label-icon="cdxIconMapPin"
		:is-fieldset="true"
		:optional="true"
		:disabled="disabled"
		:status="status"
		:messages="messages"
	>
		<template #label>
			Coordinate location
		</template>

		<div class="cdx-demo-complex-field__inputs">
			<!-- You can include a visually-hidden label via the Label component... -->
			<cdx-label :visually-hidden="true" input-id="coordinates-value">
				Coordinates
			</cdx-label>
			<cdx-text-input
				id="coordinates-value"
				v-model="coordinatesValue"
				@blur="validate"
			/>

			<!-- ...or just use `aria-label`. -->
			<cdx-select
				v-model:selected="precisionValue"
				aria-label="Precision"
				:menu-items="menuItems"
			/>
		</div>

		<template #help-text>
			Please enter coordinates as decimal degrees.
		</template>
	</cdx-field>

	<cdx-toggle-switch v-model="disabled">
		Disable entire field
	</cdx-toggle-switch>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
	CdxField,
	CdxLabel,
	CdxSelect,
	CdxTextInput,
	CdxToggleSwitch
} from '@wikimedia/codex';
import { cdxIconMapPin } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'FieldWithTwoInputs',
	components: {
		CdxField,
		CdxLabel,
		CdxSelect,
		CdxTextInput,
		CdxToggleSwitch
	},
	setup() {
		const coordinatesValue = ref( '' );

		const menuItems = [
			{ label: 'to 1/1000 of an arcsecond', value: '.001' },
			{ label: 'to 1/100 of an arcsecond', value: '.01' },
			{ label: 'to 1/10 of an arcsecond', value: '.1' },
			{ label: 'to an arcsecond', value: '1' }
		];
		const precisionValue = ref( '.001' );

		const messages = { error: 'Please enter a valid coordinate location.' };
		const status = ref( 'default' );

		function validate() {
			const regEx = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

			if ( coordinatesValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			status.value = regEx.test( coordinatesValue.value ) ? 'default' : 'error';
		}

		const disabled = ref( false );

		return {
			coordinatesValue,
			menuItems,
			precisionValue,
			messages,
			status,
			validate,
			disabled,
			cdxIconMapPin
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-complex-field {
	margin-bottom: @spacing-250;

	&__inputs {
		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			display: flex;
		}

		.cdx-text-input {
			margin-bottom: @spacing-50;

			@media screen and ( min-width: @min-width-breakpoint-desktop ) {
				margin-right: @spacing-50;
				margin-bottom: 0;
			}
		}
	}
}
</style>
```

vue

```
<template>
	<cdx-field
		class="cdx-demo-complex-field"
		:label-icon="cdxIconMapPin"
		:is-fieldset="true"
		:optional="true"
		:disabled="disabled"
		:status="status"
		:messages="messages"
	>
		<template #label>
			Coordinate location
		</template>

		<div class="cdx-demo-complex-field__inputs">
			<!-- You can include a visually-hidden label via the Label component... -->
			<cdx-label :visually-hidden="true" input-id="coordinates-value">
				Coordinates
			</cdx-label>
			<cdx-text-input
				id="coordinates-value"
				v-model="coordinatesValue"
				@blur="validate"
			></cdx-text-input>

			<!-- ...or just use `aria-label`. -->
			<cdx-select
				v-model:selected="precisionValue"
				aria-label="Precision"
				:menu-items="menuItems"
			></cdx-select>
		</div>

		<template #help-text>
			Please enter coordinates as decimal degrees.
		</template>
	</cdx-field>

	<cdx-toggle-switch v-model="disabled">
		Disable entire field
	</cdx-toggle-switch>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const {
	CdxField,
	CdxLabel,
	CdxSelect,
	CdxTextInput,
	CdxToggleSwitch
} = require( '@wikimedia/codex' );
const { cdxIconMapPin } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'FieldWithTwoInputs',
	components: {
		CdxField,
		CdxLabel,
		CdxSelect,
		CdxTextInput,
		CdxToggleSwitch
	},
	setup() {
		const coordinatesValue = ref( '' );

		const menuItems = [
			{ label: 'to 1/1000 of an arcsecond', value: '.001' },
			{ label: 'to 1/100 of an arcsecond', value: '.01' },
			{ label: 'to 1/10 of an arcsecond', value: '.1' },
			{ label: 'to an arcsecond', value: '1' }
		];
		const precisionValue = ref( '.001' );

		const messages = { error: 'Please enter a valid coordinate location.' };
		const status = ref( 'default' );

		function validate() {
			const regEx = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

			if ( coordinatesValue.value.length === 0 ) {
				status.value = 'default';
				return;
			}

			status.value = regEx.test( coordinatesValue.value ) ? 'default' : 'error';
		}

		const disabled = ref( false );

		return {
			coordinatesValue,
			menuItems,
			precisionValue,
			messages,
			status,
			validate,
			disabled,
			cdxIconMapPin
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-complex-field {
	margin-bottom: @spacing-250;

	&__inputs {
		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			display: flex;
		}

		.cdx-text-input {
			margin-bottom: @spacing-50;

			@media screen and ( min-width: @min-width-breakpoint-desktop ) {
				margin-right: @spacing-50;
				margin-bottom: 0;
			}
		}
	}
}
</style>
```

*   to 1/1000 of an arcsecond
*   to 1/100 of an arcsecond
*   to 1/10 of an arcsecond
*   to an arcsecond

### Developer notes

In the example below, the labels for the individual TextInput and Select components are included in two different ways:

*   For the TextInput, the [Label](./label.html) component is used with `hideLabel` set to `true`.
*   For the Select, an `aria-label` is applied.

Note: when you enter erroneous data in the TextInput below, error styles for both the TextInput and the Select will display since they are both contained in a single Field. If you need to show separate states for each input, refer to the [nested Fields example](#fieldset-with-nested-fields) below.

### Fieldset with nested Fields [​](#fieldset-with-nested-fields)

Nest Fields within a Field when each input needs its own visible label, description, validation status, and validation message.

*   Use a fieldset to group Fields that depend on one another to form a single meaningful value or dataset.
*   Don't use a fieldset to group separate Fields or for layout purposes.

Item weight

Weight value Numerical value of the weight

Unit Select a unit

Hint: try searching for "grams"

Disable entire field

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field
		class="cdx-demo-nested-fields"
		:status="fieldsetStatus"
		:messages="fieldsetMessages"
		:is-fieldset="true"
		:disabled="disabled"
	>
		<template #label>
			Item weight
		</template>

		<div class="cdx-demo-nested-fields__inputs">
			<cdx-field
				class="cdx-demo-nested-fields__inputs__weight"
				:status="weightStatus"
				:messages="weightMessages"
			>
				<template #label>
					Weight value
				</template>
				<template #description>
					Numerical value of the weight
				</template>

				<cdx-text-input
					v-model="weightValue"
					@blur="validateWeight"
				/>
			</cdx-field>
			<cdx-field
				class="cdx-demo-nested-fields__inputs__unit"
				:status="unitsStatus"
				:messages="unitsMessages"
			>
				<template #label>
					Unit
				</template>
				<template #description>
					Select a unit
				</template>
				<template #help-text>
					Hint: try searching for "grams"
				</template>

				<cdx-lookup
					v-model:selected="unitsValue"
					:menu-items="menuItems"
					@input="onLookupInput"
				/>
			</cdx-field>
		</div>
	</cdx-field>
	<cdx-toggle-switch v-model="disabled">
		Disable entire field
	</cdx-toggle-switch>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import {
	CdxField,
	CdxLookup,
	CdxTextInput,
	CdxToggleSwitch
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithFields',
	components: {
		CdxField,
		CdxLookup,
		CdxTextInput,
		CdxToggleSwitch
	},
	setup() {
		// Set up data for the weight value field.
		const weightValue = ref( '' );
		const weightStatus = ref( 'default' );
		const weightMessages = { error: 'Invalid weight value' };

		function validateWeight() {
			const weightTrimmed = weightValue.value.replace( / /g, '' );
			if ( weightTrimmed.length === 0 ) {
				weightStatus.value = 'default';
				return;
			}
			weightStatus.value = isNaN( Number( weightTrimmed ) ) ?
				'error' : 'default';
		}

		// Set up data for the unit field.
		const unitsValue = ref( '' );
		const unitsStatus = ref( 'default' );
		const unitsMessages = { error: 'No matching units found' };
		const units = [
			{ value: 'ounces' },
			{ value: 'pounds' },
			{ value: 'grams' },
			{ value: 'kilograms' }
		];
		const menuItems = ref( [] );

		/**
		 * Handle lookup input.
		 *
		 * @param {string} value
		 */
		function onLookupInput( value ) {
			if ( value ) {
				menuItems.value = units.filter( ( item ) => item.value.includes( value )
				);
				unitsStatus.value = menuItems.value.length === 0 ? 'error' : 'default';
			} else {
				unitsStatus.value = 'default';
			}
		}

		// Set up data for the wrapper Field component.
		const fieldsetMessages = { error: 'One of the values is invalid.' };
		const fieldsetStatus = computed( () => weightStatus.value === 'error' || unitsStatus.value === 'error' ?
			'error' : 'default'
		);

		const disabled = ref( false );

		return {
			weightValue,
			weightStatus,
			weightMessages,
			validateWeight,
			menuItems,
			onLookupInput,
			unitsValue,
			unitsStatus,
			unitsMessages,
			fieldsetMessages,
			fieldsetStatus,
			disabled
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-nested-fields {
	margin-bottom: @spacing-200;

	&__inputs {
		display: flex;
		flex-direction: column;
		gap: @spacing-50;

		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			flex-direction: row;
		}

		// Disable margin-top on all nested fields.
		.cdx-field {
			margin-top: 0;
		}
	}
}
</style>
```

vue

```
<template>
	<cdx-field
		class="cdx-demo-nested-fields"
		:status="fieldsetStatus"
		:messages="fieldsetMessages"
		:is-fieldset="true"
		:disabled="disabled"
	>
		<template #label>
			Item weight
		</template>

		<div class="cdx-demo-nested-fields__inputs">
			<cdx-field
				class="cdx-demo-nested-fields__inputs__weight"
				:status="weightStatus"
				:messages="weightMessages"
			>
				<template #label>
					Weight value
				</template>
				<template #description>
					Numerical value of the weight
				</template>

				<cdx-text-input
					v-model="weightValue"
					@blur="validateWeight"
				></cdx-text-input>
			</cdx-field>
			<cdx-field
				class="cdx-demo-nested-fields__inputs__unit"
				:status="unitsStatus"
				:messages="unitsMessages"
			>
				<template #label>
					Unit
				</template>
				<template #description>
					Select a unit
				</template>
				<template #help-text>
					Hint: try searching for "grams"
				</template>

				<cdx-lookup
					v-model:selected="unitsValue"
					:menu-items="menuItems"
					@input="onLookupInput"
				></cdx-lookup>
			</cdx-field>
		</div>
	</cdx-field>
	<cdx-toggle-switch v-model="disabled">
		Disable entire field
	</cdx-toggle-switch>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const {
	CdxField,
	CdxLookup,
	CdxTextInput,
	CdxToggleSwitch
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'FieldWithFields',
	components: {
		CdxField,
		CdxLookup,
		CdxTextInput,
		CdxToggleSwitch
	},
	setup() {
		// Set up data for the weight value field.
		const weightValue = ref( '' );
		const weightStatus = ref( 'default' );
		const weightMessages = { error: 'Invalid weight value' };

		function validateWeight() {
			const weightTrimmed = weightValue.value.replace( / /g, '' );
			if ( weightTrimmed.length === 0 ) {
				weightStatus.value = 'default';
				return;
			}
			weightStatus.value = isNaN( Number( weightTrimmed ) ) ?
				'error' : 'default';
		}

		// Set up data for the unit field.
		const unitsValue = ref( '' );
		const unitsStatus = ref( 'default' );
		const unitsMessages = { error: 'No matching units found' };
		const units = [
			{ value: 'ounces' },
			{ value: 'pounds' },
			{ value: 'grams' },
			{ value: 'kilograms' }
		];
		const menuItems = ref( [] );

		/**
		 * Handle lookup input.
		 *
		 * @param {string} value
		 */
		function onLookupInput( value ) {
			if ( value ) {
				menuItems.value = units.filter( ( item ) => item.value.includes( value )
				);
				unitsStatus.value = menuItems.value.length === 0 ? 'error' : 'default';
			} else {
				unitsStatus.value = 'default';
			}
		}

		// Set up data for the wrapper Field component.
		const fieldsetMessages = { error: 'One of the values is invalid.' };
		const fieldsetStatus = computed( () => weightStatus.value === 'error' || unitsStatus.value === 'error' ?
			'error' : 'default'
		);

		const disabled = ref( false );

		return {
			weightValue,
			weightStatus,
			weightMessages,
			validateWeight,
			menuItems,
			onLookupInput,
			unitsValue,
			unitsStatus,
			unitsMessages,
			fieldsetMessages,
			fieldsetStatus,
			disabled
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-nested-fields {
	margin-bottom: @spacing-200;

	&__inputs {
		display: flex;
		flex-direction: column;
		gap: @spacing-50;

		@media screen and ( min-width: @min-width-breakpoint-desktop ) {
			flex-direction: row;
		}

		// Disable margin-top on all nested fields.
		.cdx-field {
			margin-top: 0;
		}
	}
}
</style>
```

### Developer notes

This is a fieldset, so set `isFieldset` to `true`.

Note that each sub-field has its own status. This enables you to show error styles only for the input that contains the error, not the entire fieldset.

Nested fields will become disabled when their parent field is disabled.

### Custom help text content [​](#custom-help-text-content)

The `help-text` slot can contain markup, including other components and dynamic text. This is an example of a custom character counter embedded inside a Field.

*   Use a character counter only when it's necessary to limit the number of characters in a form input.
*   Display an inline error message if the character limit is exceeded.

Enter your message

Enter a message of 100 characters or less

100

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field
		class="cdx-demo-field-with-counter"
		:status="status"
		:messages="errorMessage"
	>
		<template #label>
			Enter your message
		</template>

		<cdx-text-area v-model="userMessageText" />

		<template #help-text>
			<div
				class="cdx-demo-field-with-counter__help-text"
				:class="dynamicClasses"
			>
				<!-- Display help text or error message depending on error status. -->
				<div class="cdx-demo-field-with-counter__help-text__message">
					<p>{{ helpText }}</p>
				</div>

				<!-- Display the remaining character count. -->
				<div class="cdx-demo-field-with-counter__help-text__counter">
					{{ charsRemaining }}
				</div>
			</div>
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxField, CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithCharacterCounter',
	components: {
		CdxField,
		CdxTextArea
	},
	setup() {
		const MAX_MESSAGE_LENGTH = 100;
		const helpText = `Enter a message of ${ MAX_MESSAGE_LENGTH } characters or less`;

		const errorMessage = { error: 'Message is too long' };
		const userMessageText = ref( '' );

		// This is a simplified example; support for other languages/scripts may
		// require more complex code.
		const charsRemaining = computed( () => MAX_MESSAGE_LENGTH - userMessageText.value.length );
		const status = computed( () => charsRemaining.value < 0 ? 'error' : 'default' );

		const dynamicClasses = computed( () => ( {
			'cdx-demo-field-with-counter__help-text--error': status.value === 'error'
		} ) );

		return {
			userMessageText,
			status,
			charsRemaining,
			errorMessage,
			helpText,
			dynamicClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-field-with-counter {
	&__help-text {
		display: flex;
		align-items: baseline;
		flex-direction: row no-wrap;
		justify-content: space-between;
		gap: @spacing-100;

		&--error &__counter {
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
		class="cdx-demo-field-with-counter"
		:status="status"
		:messages="errorMessage"
	>
		<template #label>
			Enter your message
		</template>

		<cdx-text-area v-model="userMessageText"></cdx-text-area>

		<template #help-text>
			<div
				class="cdx-demo-field-with-counter__help-text"
				:class="dynamicClasses"
			>
				<!-- Display help text or error message depending on error status. -->
				<div class="cdx-demo-field-with-counter__help-text__message">
					<p>{{ helpText }}</p>
				</div>

				<!-- Display the remaining character count. -->
				<div class="cdx-demo-field-with-counter__help-text__counter">
					{{ charsRemaining }}
				</div>
			</div>
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const { CdxField, CdxTextArea } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'FieldWithCharacterCounter',
	components: {
		CdxField,
		CdxTextArea
	},
	setup() {
		const MAX_MESSAGE_LENGTH = 100;
		const helpText = `Enter a message of ${ MAX_MESSAGE_LENGTH } characters or less`;

		const errorMessage = { error: 'Message is too long' };
		const userMessageText = ref( '' );

		// This is a simplified example; support for other languages/scripts may
		// require more complex code.
		const charsRemaining = computed( () => MAX_MESSAGE_LENGTH - userMessageText.value.length );
		const status = computed( () => charsRemaining.value < 0 ? 'error' : 'default' );

		const dynamicClasses = computed( () => ( {
			'cdx-demo-field-with-counter__help-text--error': status.value === 'error'
		} ) );

		return {
			userMessageText,
			status,
			charsRemaining,
			errorMessage,
			helpText,
			dynamicClasses
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-field-with-counter {
	&__help-text {
		display: flex;
		align-items: baseline;
		flex-direction: row no-wrap;
		justify-content: space-between;
		gap: @spacing-100;

		&--error &__counter {
			color: @color-error;
		}
	}
}
</style>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

This component can wrap the following:

*   A single form input or control
*   An input group (e.g. a group of Radios or Checkboxes)
*   A set of nested fields (inputs wrapped in their own Field components).

The following Codex components can be used inside the Field component:

*   Checkbox
*   ChipInput
*   Combobox
*   Lookup
*   MultiselectLookup
*   Radio
*   SearchInput
*   Select
*   TextArea
*   TextInput
*   ToggleSwitch

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `labelIcon` | Icon before the label text.  <br>  <br>Do not use this if including a start icon within the input component. | `[Icon](../types-and-constants.html#icon)` | `''` |
| `optional` | Whether the field is optional.  <br>  <br>This will add a flag next to the label indicating that the field is optional. | `boolean` | `false` |
| `optionalFlag` | Text to indicate that the field is optional.  <br>  <br>Omit this prop to use the default value, "(optional)". | `string` | `''` |
| `hideLabel` | Whether the label should be visually hidden.  <br>  <br>Note that this will also hide the description. | `boolean` | `false` |
| `isFieldset` | Whether this field contains a group of inputs.  <br>  <br>When true, this outputs a `<fieldset>` element with a semantic `<legend>`. When false, it outputs a `<div>` with a semantic `<label>`. | `boolean` | `false` |
| `disabled` | Whether the entire field is disabled. | `boolean` | `false` |
| `status` | `status` attribute of the input. This also determines which validation message is shown. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |
| `messages` | Message text keyed on validation status type. | `[ValidationMessages](../types-and-constants.html#validationmessages)` | `{}` |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| label | Label text. |     |
| description | Short description text. |     |
| default | Input, control, or input group. |     |
| help-text | Further explanation of how to use this field. |     |
| warning | Warning message content for messages containing HTML markup. |     |
| error | Error message content for messages containing HTML markup. |     |
| success | Success message content for messages containing HTML markup. |     |

### CSS-only version [​](#css-only-version)

Refer to the [CSS-only Label docs](./label.html#css-only-version) for instructions on making the label visually-hidden or adding a label icon.

#### Markup structure [​](#markup-structure)

##### Single input [​](#single-input)

Label text (optional) Short description text

Show codeCopy code

html

```
<!-- Outer element is a <div>. -->
<div class="cdx-field">
  <!-- Label. -->
  <div class="cdx-label">
    <!-- Label element. Include a `for` attribute to connect it with an input. -->
    <label class="cdx-label__label" for="cdx-demo-input-1">
      <!-- Label text. -->
      <span class="cdx-label__label__text">Label text</span>
      <!-- Optional flag. -->
      <span class="cdx-label__label__optional-flag"> (optional)</span>
    </label>
    <!-- Description. Include an `id` attribute so the input can have an `aria-describedby` attribute. -->
    <span id="cdx-demo-description-1" class="cdx-label__description">
      Short description text
    </span>
  </div>
  <!-- Input/control wrapper. -->
  <div class="cdx-field__control">
    <!-- Input or control. -->
    <div class="cdx-text-input">
      <!-- Has `id` and `aria-describedby` attributes. -->
      <input
        id="cdx-demo-input-1"
        class="cdx-text-input__input"
        type="text"
        aria-describedby="cdx-demo-description-1"
      />
    </div>
  </div>
</div>
```

##### Fieldset [​](#fieldset)

Inside a `<form>`, use a `<fieldset>` element for input groups.

When outputting a `<fieldset>`, the markup of this component is quite different:

*   The outer element is the `<fieldset>` instead of a `<div>`
*   A `<legend>` is used instead of a `<label>`. Refer to the docs on the [CSS-only Label](./label.html#css-only-version) for more info.
*   The description is included inside the `<legend>`
*   The `for` and `aria-describedby` attributes are not needed

Legend text (optional) Short description text

Radio 1

Radio 2

Help text with additional instructions

Show codeCopy code

html

```
<!-- Outer element is the <fieldset>. -->
<fieldset class="cdx-field">
  <!-- Legend. -->
  <legend class="cdx-label">
    <!-- Wrapper span for the first line of text (legend text + optional flag). -->
    <span class="cdx-label__label">
      <!-- Legend text. -->
      <span class="cdx-label__label__text">Legend text</span>
      <!-- Optional flag. -->
      <span class="cdx-label__label__optional-flag"> (optional)</span>
    </span>
    <!-- Description text, which must be included inside the <legend> element. -->
    <span class="cdx-label__description"> Short description text </span>
  </legend>
  <!-- Input/control wrapper. -->
  <div class="cdx-field__control">
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="cdx-docs-radio-1"
          class="cdx-radio__input"
          type="radio"
          name="radio-legend-demo"
          checked
        />
        <span class="cdx-radio__icon"></span>
        <label class="cdx-radio__label" for="cdx-docs-radio-1">Radio 1</label>
      </div>
    </div>
    <div class="cdx-radio">
      <div class="cdx-radio__wrapper">
        <input
          id="cdx-docs-radio-2"
          class="cdx-radio__input"
          type="radio"
          name="radio-legend-demo"
        />
        <span class="cdx-radio__icon"></span>
        <label class="cdx-radio__label" for="cdx-docs-radio-2">Radio 2</label>
      </div>
    </div>
  </div>
  <!-- Help text. -->
  <div class="cdx-field__help-text">Help text with additional instructions</div>
</fieldset>
```

#### Disabled [​](#disabled)

To display a disabled field:

*   Add the `.cdx-field--disabled` class to the outer element
*   Add the `.cdx-label--disabled` class to the `.cdx-label` element
*   Disable the input(s) or control(s) (in the example below, the `disabled` attribute is added to the `<input>` element)

This works with single fields and fieldsets.

Label text

Show codeCopy code

html

```
<div class="cdx-field cdx-field--disabled">
  <div class="cdx-label cdx-label--disabled">
    <label class="cdx-label__label" for="cdx-demo-input-3">
      <span class="cdx-label__label__text">Label text</span>
    </label>
  </div>
  <div class="cdx-field__control">
    <div class="cdx-text-input">
      <input
        id="cdx-demo-input-3"
        class="cdx-text-input__input"
        type="text"
        disabled
      />
    </div>
  </div>
</div>
```

#### Error status and message [​](#error-status-and-message)

To display error styles and show an error message:

*   Apply error styles to the input (in the example below, the `.cdx-text-input--status-error` class is applied to the text input wrapper)
*   Add the validation message below the control wrapper

Label text

Error message text

Show codeCopy code

html

```
<div class="cdx-field">
  <div class="cdx-label">
    <label class="cdx-label__label" for="cdx-demo-input-3">
      <span class="cdx-label__label__text">Label text</span>
    </label>
  </div>
  <div class="cdx-field__control">
    <div class="cdx-text-input cdx-text-input--status-error">
      <input id="cdx-demo-input-3" class="cdx-text-input__input" type="text" />
    </div>
  </div>
  <div class="cdx-field__validation-message">
    <div
      class="cdx-message cdx-message--inline cdx-message--error"
      role="alert"
    >
      <span class="cdx-message__icon"></span>
      <div class="cdx-message__content">Error message text</div>
    </div>
  </div>
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus to the next interactive element in tab order. |
| Shift + Tab | It moves the focus to the previous interactive element. |
| Enter | If the focus is placed on one of the interactive elements within the Field, it activates them. |

Pager

[Previous pageCombobox](/codex/latest/components/demos/combobox.html)

[Next pageLabel](/codex/latest/components/demos/label.html)