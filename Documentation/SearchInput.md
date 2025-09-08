# SearchInput [​](#searchinput)

A SearchInput allows users to enter and submit a search query.

Show codeCopy code

Reset demo

```markup
<cdx-search-input v-model="inputValue" />
```

| Name | Value |
| --- | --- |
| Props |     |
| useButton |     |
| buttonLabel |     |
| status | default<br><br>error |
| disabled |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use SearchInput [​](#when-to-use-searchinput)

Use the SearchInput component to enable users to perform text-based searches for specific content, like finding results on a page.

To include a predictive list of options in a menu while users type within the input field, use [TypeaheadSearch](./typeahead-search.html) instead.

Avoid using SearchInput to enable users to search a dataset of options for a form field. Instead, use [Lookup](./lookup.html).

### About SearchInput [​](#about-searchinput)

SearchInput includes the following elements.

#### Input [​](#input)

A TextInput where users can type their search queries. The input features the 'search' icon for clarity and can also include a placeholder to clarify its purpose.

##### Placeholder text (optional) [​](#placeholder-text-optional)

Placeholder text provides an example of what the user might type in the SearchInput.

*   Placeholder text should further explain what is being searched or sample search queries.
*   Placeholder text should never replace the label nor be the input's only description.
*   Placeholder text should not duplicate the search button label.

#### Button (optional) [​](#button-optional)

The input can be accompanied with a text button in order to trigger the search action.

*   Use the term "Search" or its appropriate translation.
*   Don't use long button text or duplicate the placeholder text.

## Examples [​](#examples)

Open the console to review emitted events.

### Basic usage [​](#basic-usage)

This SearchInput features a placeholder and does not include the search button.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-search-input
		v-model="inputValue"
		aria-label="SearchInput default demo"
		placeholder="Search"
		@update:model-value="onUpdateModelValue"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputDefault',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		const onUpdateModelValue = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			inputValue,
			onUpdateModelValue
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-search-input
		v-model="inputValue"
		aria-label="SearchInput default demo"
		placeholder="Search"
		@update:model-value="onUpdateModelValue"
	></cdx-search-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxSearchInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SearchInputDefault',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		const onUpdateModelValue = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			inputValue,
			onUpdateModelValue
		};
	}
} );
</script>
```

### Developer notes

The `placeholder` attribute will be passed down to the `<input>` element. Open up the console to view `update:modelValue` events.

### With button [​](#with-button)

The SearchInput has the option to feature a text button to initiate the search process. Use the default button label, "Search" (or its translation).

Search

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-search-input
		v-model="inputValue"
		:use-button="true"
		aria-label="SearchInput with Button demo"
		@update:model-value="onEvent( 'update:modelValue', $event )"
		@submit-click="onEvent( 'submit-click', $event )"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputWithButton',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		/**
		 * @param {string} eventName
		 * @param {string} value
		 */
		const onEvent = function ( eventName, value ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value: ' + value );
		};

		return {
			inputValue,
			onEvent
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-search-input
		v-model="inputValue"
		:use-button="true"
		aria-label="SearchInput with Button demo"
		@update:model-value="onEvent( 'update:modelValue', $event )"
		@submit-click="onEvent( 'submit-click', $event )"
	></cdx-search-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxSearchInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SearchInputWithButton',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		/**
		 * @param {string} eventName
		 * @param {string} value
		 */
		const onEvent = function ( eventName, value ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value: ' + value );
		};

		return {
			inputValue,
			onEvent
		};
	}
} );
</script>
```

### Developer notes

Use the `useButton` prop to enable the submit button. The default button label is "Search" (or its translation if an internationalization system is being used).

You can customize the button label via the `buttonLabel` prop. This is only recommended if you're using the SearchInput somewhere that does not have an internationalization system (e.g. outside of MediaWiki) and you want to provide a translation for a single language.

### Other features [​](#other-features)

The SearchInput component has an internal TextInput. You can use the following features from TextInput in the SearchInput component:

*   [Clearable](./text-input.html#clearable)

A SearchInput can be wrapped in a Field component, but this is not recommended. Although SearchInput uses a TextInput, it's not a form item intended to collect user input; instead, it triggers an action. Refer to the [Field](./field.html) guidelines for more information.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

This component contains a [TextInput](./text-input.html) with a preset start icon and input type. A button can be added by providing the `useButton` prop.

The default slot allows you to pass in an options menu that can be absolutely positioned to line up with the text input, e.g. a list of autocomplete options. This is used by [TypeaheadSearch](./typeahead-search.html), which you should use if you need a search input with a menu of options.

TextInput props apply

This component contains a TextInput component. You can bind [TextInput props](./text-input.html#props) to this component and they will be passed to the TextInput within.

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `modelValue` | Value of the search input, provided by `v-model` binding in the parent component. | `string\|number` | `''` |
| `useButton` | Whether to display the search button. | `boolean` | `false` |
| `hideIcon` | Whether to hide the start icon. | `boolean` | `false` |
| `clearable` | `clearable` property of the TextInput component | `boolean` | `false` |
| `buttonLabel` | Search button text.  <br>  <br>Omit this prop to use the default value, "Search". | `string` | `''` |
| `disabled` | Whether the search input is disabled. | `boolean` | `false` |
| `status` | `status` property of the TextInput component | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |

#### Methods [​](#methods)

| Method name | Description | Signature |
| --- | --- | --- |
| `focus` | Focus the component's input element. | **Returns:** `void` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `input` | **event** `InputEvent` | When the input value changes via direct use of the input |
| `change` | **event** `Event` | When an input value change is committed by the user (e.g. on blur) |
| `focus` | **event** `FocusEvent` | When the input comes into focus |
| `blur` | **event** `FocusEvent` | When the input loses focus |
| `update:modelValue` | **value** `string\|number` - The new value | When the input value changes |
| `submit-click` | **value** `string\|number` - The current input | When the submit button is clicked. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | A slot for passing in an options menu that needs to be positioned |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The basic CSS-only SearchInput component is a CSS-only TextInput with `type="search"` and a start icon, wrapped in a `<div>` with the CSS class `.cdx-search-input`. The CSS-only search icon is set up for you, so you do not need to include it in your Less code.

Show codeCopy code

html

```
<!-- Wrapper div. -->
<div class="cdx-search-input">
  <!-- CSS-only TextInput with start icon. -->
  <div class="cdx-text-input cdx-text-input--has-start-icon">
    <!-- Input with type="search". -->
    <input class="cdx-text-input__input" type="search" placeholder="Search" />
    <!-- Start icon span. -->
    <span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
  </div>
</div>
```

#### With button [​](#with-button-1)

To add a button to the CSS-only SearchInput, do the following:

*   Add the `.cdx-search-input--has-end-button` class to the root element
*   Wrap the CSS-only TextInput component in a div with the class `.cdx-search-input__input-wrapper`
*   Add a CSS-only button with the classes `.cdx-button` and `.cdx-search-input__end-button`

Search

Show codeCopy code

html

```
<div class="cdx-search-input cdx-search-input--has-end-button">
  <div class="cdx-search-input__input-wrapper">
    <div class="cdx-text-input cdx-text-input--has-start-icon">
      <input class="cdx-text-input__input" type="search" placeholder="Search" />
      <span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
    </div>
  </div>
  <button class="cdx-button cdx-search-input__end-button">Search</button>
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Enter | It submits the search query or performs the search action when the focus is placed on the search button. |
| Esc | It clears the input when there is typed text there. |

Pager

[Previous pageTab](/codex/latest/components/demos/tab.html)

[Next pageTypeaheadSearch](/codex/latest/components/demos/typeahead-search.html)