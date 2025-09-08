# Checkbox
A Checkbox is a binary input that can appear by itself or in a multiselect group. Checkboxes can be selected, unselected or in an indeterminate state.

|Name|Value|
|---|---|
|Props||
|`status`|`default` `error`|
|`disabled`|`disabled`|
|`indeterminate`|`indeterminate`|
|Slots||
|`default`|`Checkbox label`|
|`description`|``|
|View||
|Reading direction|LTR, RTL|

## Overview
### When to use Checkbox
Checkbox must feature a descriptive label. They may appear alone, such as in a disclaimer, or as a part of a group. A Checkbox may also have sub-options or child Checkboxes.

Use the Checkbox component when you want users to make one or more selections from a list of options. A Checkbox can also be used to accept terms and conditions. Avoid using Checkbox when only one selection is allowed; in such cases, use [Radio](https://doc.wikimedia.org/codex/latest/components/demos/radio.html) instead.

### About Checkbox
Checkbox includes the following elements.

### Checkbox
The Checkbox’s input makes the selection visually distinct.

### Label
The Checkbox must always contain a label, with the text size matching the base font size for consistency with the body text. Labels can include links and bold text and should be concise, clearly indicating the selected option.

✅Keep the choices short and mutually exclusive. [Concise](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-concise), [Clear](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear) & [Trustworthy](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-trustworthy)<br>
✅Use text formatting like bold and italic sparingly in the label.<br>
✅Include standalone links within the label to provide additional information regarding a specific option when necessary.<br>
⚠️Avoid linking the entire label as it could cause issues with the selection.<br>

### Description (optional)
If additional information about the label is required, a description can be included.

## Examples
### Label and description
Checkboxes must always have a label and can also feature a description.

```vue
<template>
	<cdx-checkbox v-model="checkboxValue" @update:model-value="onUpdate">
		Send password reset emails only when both email address and username are provided.
		<template #description>
			This improves privacy and helps prevent unsolicited emails.
		</template>
	</cdx-checkbox>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxWithDescription',
	components: { CdxCheckbox },
	setup() {
		const checkboxValue = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkboxValue,
			onUpdate
		};
	}
} );
</script>
```
**Developer notes**
Always include label text via the default slot. You can also add description text via the `#description` slot.
A single Checkbox does not need an `inputValue` prop. `v-model` is bound to a boolean value: `true` for checked, `false` for unchecked.

### Form field
When used in a form, a single Checkbox or group of Checkboxes can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. See the [Field](https://doc.wikimedia.org/codex/latest/components/demos/field.html) page for more information.

✅Create a direct question or a complete sentence to precede the Checkboxes. [Translatable](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-translatable) & [Clear](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear)

✅Include inline error messages for both individual and groups of Checkboxes to inform users and guide them in fixing issues.

If using a Checkbox or Checkbox group outside of a form, follow the instructions in the next demo.

```vue
<template>
	<cdx-field :is-fieldset="true">
		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="'checkbox-' + checkbox.value"
			v-model="checkboxValue"
			:input-value="checkbox.value"
		>
			{{ checkbox.label }}
		</cdx-checkbox>
		<template #label>
			Discussion pages
		</template>
		<template #description>
			These options are provided for the Discussion Tools Beta Feature.
			Learn more about these features at the <a href="#">feature summary</a>.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxField',
	components: { CdxCheckbox, CdxField },
	setup() {
		const checkboxValue = ref( [ 'quickReply', 'quickTopic' ] );
		const checkboxes = [
			{
				label: 'Enable quick replying',
				value: 'quickReply'
			},
			{
				label: 'Enable quick topic adding',
				value: 'quickTopic'
			},
			{
				label: 'Automatically subscribe to topics',
				value: 'autoSubscribe'
			}
		];

		return {
			checkboxValue,
			checkboxes
		};
	}
} );
</script>
```
**Developer notes**
When building a Checkbox field, always set `isFieldset` to `true`, even for a single Checkbox, to ensure accessibility support. This wraps the group in a `<fieldset>` element and labels it with an associated `<legend>`.

### Checkbox group
Checkboxes are most typically used in groups.

```vue
<template>
	<div role="group" aria-labelledby="cdx-demo-checkbox-group-label">
		<cdx-label id="cdx-demo-checkbox-group-label">
			Checkbox group demo
		</cdx-label>

		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="'checkbox-' + checkbox.value"
			v-model="checkboxValue"
			:input-value="checkbox.value"
			:disabled="checkbox.disabled"
			:indeterminate="checkbox.indeterminate"
			@update:model-value="onUpdate"
		>
			{{ checkbox.label }}
		</cdx-checkbox>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxGroup',
	components: { CdxCheckbox, CdxLabel },
	setup() {
		const checkboxValue = ref( [ 'checkbox-2', 'checkbox-6' ] );
		const checkboxes = [
			{
				label: 'Checkbox 1',
				value: 'checkbox-1',
				disabled: false
			},
			{
				label: 'Checkbox 2 (initially selected)',
				value: 'checkbox-2',
				disabled: false
			},
			{
				label: 'Checkbox 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps',
				value: 'checkbox-3',
				disabled: false
			},
			{
				label: 'Checkbox 4 (indeterminate)',
				value: 'checkbox-4',
				indeterminate: true,
				disabled: false
			},
			{
				label: 'Checkbox 5 (disabled)',
				value: 'checkbox-5',
				disabled: true
			},
			{
				label: 'Checkbox 6 (initially selected, disabled)',
				value: 'checkbox-6',
				disabled: true
			}
		];

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkboxValue,
			checkboxes,
			onUpdate
		};
	}
} );
</script>
```
**Developer notes**
For a group of related Checkboxes, each Checkbox component's `v-model` will be bound to an array of the `inputValue` props of the Checkboxes that are currently "on".

This demo shows what to do when using a Checkbox group outside of a form:

Wrap the group in an element with `role="group"`
Connect the group with a label via the `aria-labelledby` attribute

### Inline Checkboxes
Checkboxes can be horizontally stacked if needed in some specific cases. However, the recommendation is to vertically stack them to maintain visual flow.

✅Use inline Checkboxes for specific cases to prevent disruptions in the reading flow.<br>
✅Avoid using inline Checkboxes if there are too many Checkboxes per line.<br>
⚠️Avoid using inline Checkboxes if there is significant variation in the length of the Checkbox labels.

```vue
<template>
	<div>
		<cdx-checkbox
			v-model="checkbox1Value"
			input-value="checkbox-1"
			:inline="true"
			@update:model-value="onUpdate"
		>
			Checkbox 1
		</cdx-checkbox>
		<cdx-checkbox
			v-model="checkbox2Value"
			input-value="checkbox-2"
			:inline="true"
			@update:model-value="onUpdate"
		>
			Checkbox 2
		</cdx-checkbox>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InlineCheckboxes',
	components: { CdxCheckbox },
	setup() {
		const checkbox1Value = ref( true );
		const checkbox2Value = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkbox1Value,
			checkbox2Value,
			onUpdate
		};
	}
} );
</script>
```
**Developer notes**
Use the inline prop to get an inline layout.

### Indeterminate state
In addition to selected and unselected, a Checkbox can be in an indeterminate state. This state is common for checkboxes to present a number of sub-options (which are also checkboxes). If all of the sub-options are checked, the main checkbox will also be checked, and if they're all unchecked, the main checkbox would be unchecked. If any one or more of the sub-options have a different state than the others, the main checkbox would present an [indeterminate state checkbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes).

✅Use the indeterminate Checkbox when there is a long list of sub-checkboxes to select.<br>
✅Align secondary Checkboxes with the label of the indeterminate Checkbox.

```vue
<template>
	<cdx-field
		class="cdx-demo-indeterminate"
		:is-fieldset="true"
	>
		<template #label>
			Availability
		</template>
		<template #description>
			Select the days on which you are available.
		</template>

		<cdx-checkbox
			v-model="selectAllValue"
			:indeterminate="isIndeterminate"
			@update:model-value="onSelectAll"
		>
			Select all
		</cdx-checkbox>

		<div class="cdx-demo-indeterminate__group">
			<cdx-checkbox
				v-for="checkbox in daysCheckboxes"
				:key="'checkbox-' + checkbox.value"
				v-model="daysValue"
				:input-value="checkbox.value"
				@update:model-value="onSelectDay"
			>
				{{ checkbox.label }}
			</cdx-checkbox>
		</div>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxCheckbox, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'IndeterminateState',
	components: { CdxCheckbox, CdxField },
	setup() {
		const selectAllValue = ref( false );
		const daysValue = ref( [ 'mon', 'tue', 'wed' ] );
		const daysCheckboxes = [
			{
				label: 'Monday',
				value: 'mon'
			},
			{
				label: 'Tuesday',
				value: 'tue'
			},
			{
				label: 'Wednesday',
				value: 'wed'
			},
			{
				label: 'Thursday',
				value: 'thur'
			},
			{
				label: 'Friday',
				value: 'fri'
			}
		];

		// Set the top checkbox to indeterminate when the days checkboxes are
		// not all the same (all un-checked or all checked).
		const isIndeterminate = computed( () => daysValue.value.length > 0 &&
			daysValue.value.length < daysCheckboxes.length );

		/**
		 * Handle interaction with the "select all" checkbox.
		 *
		 * @param value New value of the "select all" box
		 */
		function onSelectAll( value ) {
			if ( value ) {
				// If the "select all" box is checked, check all days.
				daysValue.value = daysCheckboxes.map( ( day ) => day.value );
			} else {
				// If "select all" is unchecked, un-check all days.
				daysValue.value = [];
			}
		}

		/**
		 * Handle interaction with the day checkboxes.
		 */
		function onSelectDay() {
			// If all days are checked, check "select all".
			if ( daysValue.value.length === daysCheckboxes.length ) {
				selectAllValue.value = true;
			}
			// If no days are checked, un-check "select all".
			if ( daysValue.value.length === 0 ) {
				selectAllValue.value = false;
			}
		}

		return {
			selectAllValue,
			daysValue,
			daysCheckboxes,
			isIndeterminate,
			onSelectAll,
			onSelectDay
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-indeterminate {
	&__group {
		// Align sub-checkboxes with the label of the top-level checkbox.
		// Equal to `26px` in `16px` base at default font size mode.
		padding-left: calc( @font-size-medium + 10px );
	}
}

</style>
```
**Developer notes**
The parent component must house the logic to set a Checkbox to the `indeterminate` state via this prop (e.g. in the case of a set of nested checkboxes where some boxes are checked and some are not, making the parent checkbox neither fully on nor fully off).

This prop is independent of the value provided by `v-model`. If `indeterminate` is set to `true`, the indeterminate visual state will display, but the value will not be affected. Nor will the value affect the visual state: indeterminate overrides the checked and unchecked visual states. If `indeterminate` changes to `false`, the visual state will reflect the current `v-model` value.

### With custom input
An additional input field can be included within the Checkbox to allow the user to input a custom response. The custom input within the Checkbox can include any of the following form components designed to gather user input, including:

* TextInput and TextArea
* Select
* Combobox
* ChipInput
* Lookup
* A combination of more than one input
✅Display the custom input at the end of a Checkbox group whenever possible.<br>
✅Disable the custom input unless its corresponding Checkbox is selected.<br>
⚠️Don't design a layout where multiple Checkboxes include custom inputs visible simultaneously.

```vue
<template>
	<!-- Note: This form does not POST or GET on submit -->
	<form
		id="discussion-pages"
		name="discussion-form"
	>
		<cdx-field
			:is-fieldset="true"
			:status="status"
			:messages="messages"
			form="discussion-pages"
		>
			<cdx-checkbox
				v-for="checkbox in checkboxes"
				:key="'checkbox-' + checkbox.value"
				v-model="checkboxValue"
				name="checkbox-with-custom-input-demo"
				:input-value="checkbox.value"
				@change="validate( $event )"
			>
				{{ checkbox.label }}
				<template v-if="checkbox.value === 'other'" #custom-input>
					<cdx-field
						:is-fieldset="true"
						:status="textFieldStatus"
						:messages="textFieldMessages"
						class="my-custom-input-field"
					>
						<cdx-text-input
							v-model="inputValue"
							:disabled="!checkboxValue.includes( 'other' )"
							aria-label="TextInput custom input"
							placeholder="Custom option..."
						/>
					</cdx-field>
				</template>
			</cdx-checkbox>
			<template #label>
				Discussion pages
			</template>
			<template #description>
				These options are provided for the Discussion Tools Beta Feature.
			</template>
			<template #help-text>
				Learn more about these features at the <a href="#">feature summary</a>.
				These tools require JavaScript to be enabled in your browser.
			</template>
		</cdx-field>
		<cdx-button
			class="my-button"
			action="progressive"
			weight="primary"
			form="discussion-pages"
			name="submit-discussion-pages"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { CdxCheckbox, CdxField, CdxTextInput, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxWithCustomInput',
	components: { CdxCheckbox, CdxField, CdxTextInput, CdxButton },
	setup() {
		const checkboxValue = ref( [ 'quickReply', 'quickTopic' ] );
		const checkboxes = [
			{
				label: 'Enable quick replying',
				value: 'quickReply'
			},
			{
				label: 'Enable quick topic adding',
				value: 'quickTopic'
			},
			{
				label: 'Automatically subscribe to topics',
				value: 'autoSubscribe'
			},
			{
				label: 'Other',
				value: 'other'
			}
		];

		const inputValue = ref( '' );

		// Capture form data.
		const formData = computed( () => ( {
			options: checkboxValue,
			otherValue: inputValue
		} ) );

		// Validation
		const status = ref( 'default' );
		const textFieldStatus = ref( 'default' );
		const messages = { error: 'Please select at least one option' };
		const textFieldMessages = { error: '"Other" option must be provided' };
		function validate() {
			if ( checkboxValue.value.includes( 'other' ) ) {
				// When "other" checkbox is checked, ensure the custom input has a value.
				return inputValue.value.length > 0;
			} else if ( checkboxValue.value.length > 0 ) {
				// When a checkbox other than "other" is checked.
				return true;
			} else {
				// When no checkbox is checked, validation fails.
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
				// eslint-disable-next-line no-console
				console.log( formData.value );
			// When validation is unsuccessful, show an error state.
			} else if ( checkboxValue.value.includes( 'other' ) && inputValue.value.length === 0 ) {
				// When "other" is checked and text field is empty, show text field's error state.
				textFieldStatus.value = 'error';
			} else {
				// When validation is not successful (no checked checkbox), show the error state.
				status.value = 'error';
			}
		}

		watch( checkboxValue, () => {
			if ( validate() ) {
				// Reset the statuses when checkbox selection changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			} else if ( checkboxValue.value.length > 0 ) {
				// When validation is unsuceessful, reset the statuses when any checkbox
				// including "other" is selected.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		watch( inputValue, () => {
			if ( validate() ) {
				// Reset the statuses when input changes.
				status.value = 'default';
				textFieldStatus.value = 'default';
			}
		} );

		return {
			checkboxValue,
			checkboxes,
			inputValue,
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
**Developer notes**
To add a custom input, use the `custom-input` slot to pass in an input like TextInput, TextArea, Select, Combobox, ChipInput, Lookup, or a combination of more than one input.

In the example below, the custom input is always visible but remains disabled until the parent Checkbox is selected. Inside the custom input `<div>`, a Field wraps the TextInput to display its own validation message.

Open the console to review form data on submission.

## Technical implementation
### Vue usage
Typical use of this component will involve using `v-for` to loop through an array of items and output a Checkbox component for each one. Each Checkbox will have the same `v-model` prop, but different `inputValue` props and label content.

For a single Checkbox, the `v-model` value will be a boolean `true` when the checkbox is checked and `false` when unchecked.

For multiple Checkboxes, the `v-model` value will be an array of the `inputValue` props of any currently checked checkboxes (or an empty array if no checkboxes are checked).

#### Props
|Prop name|Description|Type|Default|
|---|---|---|---|
|`modelValue`|Value of the checkbox or checkbox group.<br>Provided by `v-model` binding in the parent component.|`boolean|( string|number )[]`|`false`|
|`inputValue`|HTML "value" attribute to assign to the input.<br>Required for input groups.|`string|number|boolean`|`false`|
|`name`|HTML "name" attribute to assign to the input.|`string`|`null`|
|`disabled`|Whether the disabled attribute should be added to the input.|`boolean`|`false`|
|`indeterminate`|Whether the indeterminate visual state should be displayed.<br>This is unrelated to the value provided by `v-model`, and the indeterminate visual state will override the checked or unchecked visual state.|`boolean`|`false`|
|`inline`|Whether the component should display inline.<br>By default, `display: block` is set and a margin exists between sibling components, for a stacked layout.|`boolean`|`false`|
|`hideLabel`|Whether the label should be visually hidden.<br>When true, the label will remain accessible to assistive technology.|`boolean`|`false`|
|`status`|Validation status of the Checkbox.|`ValidationStatusType`|`'default'`|

#### Events
|Event name|Properties|Description|
|---|---|---|
|`update:modelValue`|**modelValue** `boolean|string[]|number[]` - The new model value|Emitted when modelValue changes.|

#### Slots
|Name|Description|Bindings|
|---|---|---|
|default|Label text.||	
|description|Short description text.||
|custom-input|Custom input.||

### CSS-only version
#### Markup structure
```html
<div class="cdx-checkbox">
  <div class="cdx-checkbox__wrapper">
    <!-- <input> element with id, type, and any other necessary attributes.
		The actual input is visually hidden. -->
    <input
      id="checkbox-css-only-1"
      class="cdx-checkbox__input"
      type="checkbox"
    />
    <!-- Empty span that will be styled to look like a checkbox input. -->
    <span class="cdx-checkbox__icon"></span>
    <div class="cdx-checkbox__label cdx-label">
      <!-- Label with `for` attribute matching the input's id. -->
      <label for="checkbox-css-only-1" class="cdx-label__label">
        <span class="cdx-label__label__text"> Checkbox 1 </span>
      </label>
    </div>
  </div>
</div>
```

#### With description
To add a description below the label:

* Add a `<span>` after the `<label>` element with an ID and class `cdx-label__description`. Include the description text here.
* Add an `aria-describedby` attribute to the `<input> `element whose value is the ID of the description

```html
<div class="cdx-checkbox">
  <div class="cdx-checkbox__wrapper">
    <input
      id="checkbox-description-css-only-1"
      class="cdx-checkbox__input"
      type="checkbox"
      aria-describedby="cdx-description-css-1"
    />
    <span class="cdx-checkbox__icon"></span>
    <div class="cdx-checkbox__label cdx-label">
      <label for="checkbox-description-css-only-1" class="cdx-label__label">
        <span class="cdx-label__label__text">
          Send password reset emails only when both email address and username
          are provided.
        </span>
      </label>
      <span id="cdx-description-css-1" class="cdx-label__description">
        This improves privacy and helps prevent unsolicited emails.
      </span>
    </div>
  </div>
</div>
```

#### Checkbox group
Native attributes of the `<input>` element can be used. For example:

* Add the `checked` attribute to the `<input>` element if it should be selected initially.
* Add the `disabled` attribute to the `<input>` element if it should be disabled.<br>
Note that `indeterminate` is not supported in the CSS-only version since it cannot be set without JavaScript.

Always include one of these two features for accessible grouping:

1. If using the Checkbox group in a field, wrap the group in a `<fieldset>` element and add a `<legend>` element with the group label. This method is demonstrated below and requires some style resets on `<fieldset>` and `<legend>`. You can use the CSS-only [Field](https://doc.wikimedia.org/codex/latest/components/demos/field.html#css-only-version) and [Label](https://doc.wikimedia.org/codex/latest/components/demos/label.html#css-only-version) components to reset browser styles of these elements.
2. If using the Checkbox group outside of a field, wrap the group in a `<div>` with `role="group"` and `aria-labelledby` set to the ID of the group label. Check an example of this [above](https://doc.wikimedia.org/codex/latest/components/demos/checkbox.html#checkbox-group).

```html
<fieldset class="cdx-field">
  <legend class="cdx-label">
    <span class="cdx-label__label__text">CSS-only Checkbox group demo</span>
  </legend>
  <div class="cdx-field__control">
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-group-css-only-1"
          class="cdx-checkbox__input"
          type="checkbox"
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label for="checkbox-group-css-only-1" class="cdx-label__label">
            <span class="cdx-label__label__text"> Checkbox 1 </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-group-css-only-2"
          class="cdx-checkbox__input"
          type="checkbox"
          checked
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label for="checkbox-group-css-only-2" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Checkbox 2 (initially selected)
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-group-css-only-3"
          class="cdx-checkbox__input"
          type="checkbox"
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label for="checkbox-group-css-only-3" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Checkbox 3, which has a very long label that spans onto a second
              line to demonstrate what happens when text wraps
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-group-css-only-4"
          class="cdx-checkbox__input"
          type="checkbox"
          disabled
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label for="checkbox-group-css-only-4" class="cdx-label__label">
            <span class="cdx-label__label__text"> Checkbox 4 (disabled) </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-group-css-only-5"
          class="cdx-checkbox__input"
          type="checkbox"
          checked
          disabled
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label for="checkbox-group-css-only-5" class="cdx-label__label">
            <span class="cdx-label__label__text">
              Checkbox 5 (initially selected, disabled)
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</fieldset>
```

#### Inline Checkboxes
Add the `cdx-checkbox--inline` class to the root element to get an inline layout.


```html
<div class="cdx-checkbox cdx-checkbox--inline">
  <div class="cdx-checkbox__wrapper">
    <input
      id="checkbox-group-inline-css-only-1"
      class="cdx-checkbox__input"
      type="checkbox"
    />
    <span class="cdx-checkbox__icon"></span>
    <div class="cdx-checkbox__label cdx-label">
      <label for="checkbox-group-inline-css-only-1" class="cdx-label__label">
        <span class="cdx-label__label__text"> Checkbox 1 </span>
      </label>
    </div>
  </div>
</div>
<div class="cdx-checkbox cdx-checkbox--inline">
  <div class="cdx-checkbox__wrapper">
    <input
      id="checkbox-group-inline-css-only-2"
      class="cdx-checkbox__input"
      type="checkbox"
    />
    <span class="cdx-checkbox__icon"></span>
    <div class="cdx-checkbox__label cdx-label">
      <label for="checkbox-group-inline-css-only-2" class="cdx-label__label">
        <span class="cdx-label__label__text"> Checkbox 2 </span>
      </label>
    </div>
  </div>
</div>
```

#### With custom input
To add a custom input, add a `<div>` element with the `cdx-radio__custom-input` class inside a Checkbox. Inside the custom input, add an input like TextInput, TextArea, Select, Combobox, ChipInput, Lookup, or a combination of more than one input.

```html
<fieldset class="cdx-field">
  <legend class="cdx-label">
    <span class="cdx-label__label__text"
      >CSS-only Checkbox custom input demo</span
    >
  </legend>
  <div class="cdx-field__control">
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-custom-input-css-only-1"
          class="cdx-checkbox__input"
          type="checkbox"
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label
            for="checkbox-custom-input-css-only-1"
            class="cdx-label__label"
          >
            <span class="cdx-label__label__text"> Checkbox 1 </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-custom-input-css-only-2"
          class="cdx-checkbox__input"
          type="checkbox"
          checked
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label
            for="checkbox-custom-input-css-only-2"
            class="cdx-label__label"
          >
            <span class="cdx-label__label__text">
              Checkbox 2 (initially selected)
            </span>
          </label>
        </div>
      </div>
    </div>
    <div class="cdx-checkbox">
      <div class="cdx-checkbox__wrapper">
        <input
          id="checkbox-custom-input-css-only-3"
          class="cdx-checkbox__input"
          type="checkbox"
        />
        <span class="cdx-checkbox__icon"></span>
        <div class="cdx-checkbox__label cdx-label">
          <label
            for="checkbox-custom-input-css-only-3"
            class="cdx-label__label"
          >
            <span class="cdx-label__label__text">
              Checkbox 3, with custom input
            </span>
          </label>
        </div>
      </div>
      <div class="cdx-checkbox__custom-input">
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

#### Keyboard navigation

|Key|Function|
|---|---|
|`Tab`|It moves the focus to the next Checkbox within a group or to the next interactive element in tab order.|
|`Shift` + `Tab`|It moves the focus to the previous Checkbox within a group or to the previous interactive element.|
|`Space`|If the focus is placed on the Checkbox, it toggles the Checkbox state.|

