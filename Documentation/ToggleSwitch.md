# ToggleSwitch [​](#toggleswitch)

A ToggleSwitch enables the user to instantly toggle between on and off states.

ToggleSwitch label

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| alignSwitch |     |
| hideLabel |     |
| disabled |     |
| Slots |     |
| default |     |
| description |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use ToggleSwitch [​](#when-to-use-toggleswitch)

Toggle switches must feature a descriptive label.

Use the ToggleSwitch component only where an instant change in the user-interface based on their assigned action is intended. For non-instant selections and selection groups, use [Checkbox](./checkbox.html) instead.

Avoid using a ToggleSwitch to control opposing options like Yes/No.

### About ToggleSwitch [​](#about-toggleswitch)

ToggleSwitch includes the following elements.

#### Label [​](#label)

The ToggleSwitch must always contain a label, with the text size matching the base font size for consistency with the body text. The label should be short, with text that clearly describes the state being toggled.

*   Use text formatting like bold and italic sparingly in the label.
*   Include standalone links within the label to provide additional information regarding a specific option when necessary.
*   Avoid linking the entire label as it could cause issues with the selection.

#### Switch [​](#switch)

Toggle switches make the on and off states visually distinct by using different colors and moving the grabber from left to right and vice versa.

#### Description (optional) [​](#description-optional)

If additional information about the label is required, a description can be included.

## Examples [​](#examples)

### Single switch [​](#single-switch)

Single switches can be used, such as turning a setting on or off.

Visual editing mode Turn on to use the visual editor. You can switch back to source mode at any time.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-toggle-switch v-model="switchValue" @update:model-value="onUpdate">
		Visual editing mode
		<template #description>
			Turn on to use the visual editor. You can switch back to source mode at any time.
		</template>
	</cdx-toggle-switch>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchWithDescription',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			switchValue,
			onUpdate
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-toggle-switch v-model="switchValue" @update:model-value="onUpdate">
		Visual editing mode
		<template #description>
			Turn on to use the visual editor. You can switch back to source mode at any time.
		</template>
	</cdx-toggle-switch>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxToggleSwitch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SwitchWithDescription',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			switchValue,
			onUpdate
		};
	}
} );
</script>
```

### Developer notes

Always include label text via the default slot. You can also add description text via the `#description` slot.

A single switch does not need an `inputValue` prop. `v-model` is bound to a boolean value: `true` for "on", `false` for "off".

In rare cases, a visible label is not necessary.

In rare cases where the purpose of the ToggleSwitch is made clear in context, a visible label is not necessary.

Use the toggle switch to show hidden content.

Show hidden content

Here is the hidden content

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<p id="cdx-toggle-switch-hidden-label-description">
			Use the toggle switch to show hidden content.
		</p>
		<cdx-toggle-switch
			v-model="switchValue"
			:hide-label="true"
			aria-describedby="cdx-toggle-switch-hidden-label-description"
		>
			Show hidden content
		</cdx-toggle-switch>

		<p v-show="switchValue">
			Here is the hidden content
		</p>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchWithHiddenLabel',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		return {
			switchValue
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<p id="cdx-toggle-switch-hidden-label-description">
			Use the toggle switch to show hidden content.
		</p>
		<cdx-toggle-switch
			v-model="switchValue"
			:hide-label="true"
			aria-describedby="cdx-toggle-switch-hidden-label-description"
		>
			Show hidden content
		</cdx-toggle-switch>

		<p v-show="switchValue">
			Here is the hidden content
		</p>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxToggleSwitch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SwitchWithHiddenLabel',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		return {
			switchValue
		};
	}
} );
</script>
```

### Developer notes

You can use the `hideLabel` prop to visually hide the label, which will still appear in the markup for accessibility purposes.

### Form field [​](#form-field)

When used in a form, a single ToggleSwitch or group of ToggleSwitches can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Visit the [Field documentation](./field.html) for more information.

If using a ToggleSwitch or ToggleSwitch group outside of a form, follow the instructions in the next demo.

Editing options General option for editing

Enable section editing by right clicking on section titles

Edit pages on double click

Enable showing appreciation for other users with the WikiLove tab

Visit Special:Preferences for more editing options.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :is-fieldset="true">
		<cdx-toggle-switch
			v-for="toggleSwitch in toggleSwitches"
			:key="'switch-' + toggleSwitch.value"
			v-model="fieldValue"
			:input-value="toggleSwitch.value"
			:align-switch="true"
		>
			{{ toggleSwitch.label }}
		</cdx-toggle-switch>
		<template #label>
			Editing options
		</template>
		<template #description>
			General option for editing
		</template>
		<template #help-text>
			Visit Special:Preferences for more editing options.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchGroupField',
	components: { CdxToggleSwitch, CdxField },
	setup() {
		const fieldValue = ref( [ 'wikilove' ] );
		const toggleSwitches = [
			{
				label: 'Enable section editing by right clicking on section titles',
				value: 'rightClickTitle'
			},
			{
				label: 'Edit pages on double click',
				value: 'doubleClick'
			},
			{
				label: 'Enable showing appreciation for other users with the WikiLove tab',
				value: 'wikilove'
			}
		];

		return {
			fieldValue,
			toggleSwitches
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field :is-fieldset="true">
		<cdx-toggle-switch
			v-for="toggleSwitch in toggleSwitches"
			:key="'switch-' + toggleSwitch.value"
			v-model="fieldValue"
			:input-value="toggleSwitch.value"
			:align-switch="true"
		>
			{{ toggleSwitch.label }}
		</cdx-toggle-switch>
		<template #label>
			Editing options
		</template>
		<template #description>
			General option for editing
		</template>
		<template #help-text>
			Visit Special:Preferences for more editing options.
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxToggleSwitch, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SwitchGroupField',
	components: { CdxToggleSwitch, CdxField },
	setup() {
		const fieldValue = ref( [ 'wikilove' ] );
		const toggleSwitches = [
			{
				label: 'Enable section editing by right clicking on section titles',
				value: 'rightClickTitle'
			},
			{
				label: 'Edit pages on double click',
				value: 'doubleClick'
			},
			{
				label: 'Enable showing appreciation for other users with the WikiLove tab',
				value: 'wikilove'
			}
		];

		return {
			fieldValue,
			toggleSwitches
		};
	}
} );
</script>
```

### Developer notes

When building a ToggleSwitch field, **always set `isFieldset` to `true`**, even for a single ToggleSwitch, to ensure proper accessibility support. This wraps the group in a `<fieldset>` element and labels it with an associated `<legend>`.

### ToggleSwitch group [​](#toggleswitch-group)

ToggleSwitches can be used in groups.

*   Use ToggleSwitch groups vertically for a clear and organized layout.
    

ToggleSwitch group demo

Toggle switch 1

Toggle switch 2 with a longer label

Toggle switch 3

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div role="group" aria-labelledby="cdx-demo-switch-group-label">
		<cdx-label id="cdx-demo-switch-group-label">
			ToggleSwitch group demo
		</cdx-label>

		<cdx-toggle-switch
			v-for="toggleSwitch in toggleSwitches"
			:key="'switch-' + toggleSwitch.value"
			v-model="toggleSwitchValue"
			:input-value="toggleSwitch.value"
			:align-switch="true"
		>
			{{ toggleSwitch.label }}
		</cdx-toggle-switch>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchGroup',
	components: { CdxToggleSwitch, CdxLabel },
	setup() {
		const toggleSwitchValue = ref( [ 'switch-1' ] );
		const toggleSwitches = [
			{
				label: 'Toggle switch 1',
				value: 'switch-1'
			},
			{
				label: 'Toggle switch 2 with a longer label',
				value: 'switch-2'
			},
			{
				label: 'Toggle switch 3',
				value: 'switch-3'
			}
		];

		return {
			toggleSwitchValue,
			toggleSwitches
		};
	}
} );
</script>
```

vue

```
<template>
	<div role="group" aria-labelledby="cdx-demo-switch-group-label">
		<cdx-label id="cdx-demo-switch-group-label">
			ToggleSwitch group demo
		</cdx-label>

		<cdx-toggle-switch
			v-for="toggleSwitch in toggleSwitches"
			:key="'switch-' + toggleSwitch.value"
			v-model="toggleSwitchValue"
			:input-value="toggleSwitch.value"
			:align-switch="true"
		>
			{{ toggleSwitch.label }}
		</cdx-toggle-switch>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxToggleSwitch, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SwitchGroup',
	components: { CdxToggleSwitch, CdxLabel },
	setup() {
		const toggleSwitchValue = ref( [ 'switch-1' ] );
		const toggleSwitches = [
			{
				label: 'Toggle switch 1',
				value: 'switch-1'
			},
			{
				label: 'Toggle switch 2 with a longer label',
				value: 'switch-2'
			},
			{
				label: 'Toggle switch 3',
				value: 'switch-3'
			}
		];

		return {
			toggleSwitchValue,
			toggleSwitches
		};
	}
} );
</script>
```

### Developer notes

For a group of related ToggleSwitches, each ToggleSwitch component's `v-model` will be bound to an array of the `inputValue` props of the ToggleSwitches that are currently "on".

Use the `alignSwitch` prop to align all of the switches to the end of the container, creating a more streamlined look.

This demo shows what to do when using a ToggleSwitch group outside of a form:

1.  Wrap the group in an element with `role="group"`
2.  Connect the group with a label via the `aria-labelledby` attribute

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

For a single ToggleSwitch, the `v-model` value will be a boolean `true` when the switch is "on" and `false` when "off".  
For multiple ToggleSwitches, the `v-model` value will be an array of the `inputValue` props of any currently "on" switches (or an empty array if all switches are "off").

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `modelValue` | Current value of the toggle switch or toggle switch group.  <br>  <br>Provided by `v-model` binding in the parent component. | `boolean\|string[]\|number[]` | `false` |
| `inputValue` | HTML "value" attribute to assign to the input element.  <br>  <br>Required for groups of ToggleSwitches. Can be omitted for single true/false switches. | `string\|number\|boolean` | `false` |
| `alignSwitch` | Whether to align the switch to the end of the container.  <br>  <br>Useful for ToggleSwitch groups, where each switch should be aligned regardless of label length. | `boolean` | `false` |
| `hideLabel` | Whether the label should be visually hidden.  <br>  <br>Note that this will also hide the description. | `boolean` | `false` |
| `disabled` | Whether the disabled attribute should be added to the input. | `boolean` | `false` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:modelValue` | **modelValue** `boolean` - The new model value | Emitted when modelValue changes. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Label text. |     |
| description | Short description text. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

Label

Show codeCopy code

html

```
<!-- Wrapper <span>. -->
<span class="cdx-toggle-switch">
  <!-- <input> with type="checkbox" and ID. -->
  <input
    id="cdx-toggle-switch-css-1"
    class="cdx-toggle-switch__input"
    type="checkbox"
  />
  <!-- <span> elements that will be styled to look like the toggle switch. -->
  <span class="cdx-toggle-switch__switch">
    <span class="cdx-toggle-switch__switch__grip"></span>
  </span>
  <div class="cdx-toggle-switch__label cdx-label">
    <!-- Label with `for` attribute matching the input's id. -->
    <label for="cdx-toggle-switch-css-1" class="cdx-label__label">
      <span class="cdx-label__label__text"> Label </span>
    </label>
  </div>
</span>
```

#### With description [​](#with-description)

To add a description below the label:

*   Add a `<span>` after the `<label>` element with an ID and class `cdx-label__description`. Include the description text here.
*   Add an `aria-describedby` attribute to the `<input>` element with the value of the ID of the description

Visual editing mode Turn on to use the visual editor. You can switch back to source mode at any time.

Show codeCopy code

html

```
<span class="cdx-toggle-switch">
  <input
    id="cdx-toggle-switch-css-7"
    class="cdx-toggle-switch__input"
    type="checkbox"
    aria-describedby="cdx-description-css-1"
  />
  <span class="cdx-toggle-switch__switch">
    <span class="cdx-toggle-switch__switch__grip"></span>
  </span>
  <div class="cdx-toggle-switch__label cdx-label">
    <label for="cdx-toggle-switch-css-7" class="cdx-label__label">
      <span class="cdx-label__label__text"> Visual editing mode </span>
    </label>
    <span id="cdx-description-css-1" class="cdx-label__description">
      Turn on to use the visual editor. You can switch back to source mode at
      any time.
    </span>
  </div>
</span>
```

#### With visually-hidden label [​](#with-visually-hidden-label)

For a visually-hidden label, add the `cdx-label--visually-hidden` class to the `<div>` that has the `cdx-label` class.

Label text

Show codeCopy code

html

```
<span class="cdx-toggle-switch">
  <input
    id="cdx-toggle-switch-css-8"
    class="cdx-toggle-switch__input"
    type="checkbox"
  />
  <span class="cdx-toggle-switch__switch">
    <span class="cdx-toggle-switch__switch__grip"></span>
  </span>
  <div class="cdx-toggle-switch__label cdx-label cdx-label--visually-hidden">
    <label for="cdx-toggle-switch-css-8" class="cdx-label__label">
      <span class="cdx-label__label__text"> Label text </span>
    </label>
  </div>
</span>
```

#### Initially on [​](#initially-on)

The ToggleSwitch appears "on" when the hidden checkbox is checked. To initially set the switch to "on", add the `checked` attribute to the `<input>`.

Initially on

Show codeCopy code

html

```
<span class="cdx-toggle-switch">
  <input
    id="cdx-toggle-switch-css-2"
    class="cdx-toggle-switch__input"
    type="checkbox"
    checked
  />
  <span class="cdx-toggle-switch__switch">
    <span class="cdx-toggle-switch__switch__grip"></span>
  </span>
  <div class="cdx-toggle-switch__label cdx-label">
    <label for="cdx-toggle-switch-css-2" class="cdx-label__label">
      <span class="cdx-label__label__text"> Initially on </span>
    </label>
  </div>
</span>
```

#### Disabled [​](#disabled)

To disable the ToggleSwitch, add the `disabled` attribute to the `<input>` element.

Disabled, off

  

Disabled, on

Show codeCopy code

html

```
<span class="cdx-toggle-switch">
  <input
    id="cdx-toggle-switch-css-5"
    class="cdx-toggle-switch__input"
    type="checkbox"
    disabled
  />
  <span class="cdx-toggle-switch__switch">
    <span class="cdx-toggle-switch__switch__grip"></span>
  </span>
  <div class="cdx-toggle-switch__label cdx-label">
    <label for="cdx-toggle-switch-css-5" class="cdx-label__label">
      <span class="cdx-label__label__text"> Disabled, off </span>
    </label>
  </div>
</span>
<br />
<span class="cdx-toggle-switch">
  <input
    id="cdx-toggle-switch-css-6"
    class="cdx-toggle-switch__input"
    type="checkbox"
    checked
    disabled
  />
  <span class="cdx-toggle-switch__switch">
    <span class="cdx-toggle-switch__switch__grip"></span>
  </span>
  <div class="cdx-toggle-switch__label cdx-label">
    <label for="cdx-toggle-switch-css-6" class="cdx-label__label">
      <span class="cdx-label__label__text"> Disabled, on </span>
    </label>
  </div>
</span>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus to the next ToggleSwitch within a group or to the next interactive element in tab order when the focus is placed on the last ToggleSwitch of a group. |
| Shift + Tab | It moves the focus to the previous button within the group or to the previous interactive element when the focus is placed on the first button of the group. |
| Enter / Space | If the focus is placed on the ToggleSwitch, it toggles the switch on and off. |

Pager

[Previous pageTextInput](/codex/latest/components/demos/text-input.html)

[Next pageAccordion](/codex/latest/components/demos/accordion.html)