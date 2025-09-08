# TextInput [​](#textinput)

A TextInput is a form element that lets users input and edit a single-line text value.

Show codeCopy code

Reset demo

```markup
<cdx-text-input v-model="inputValue" />
```

| Name | Value |
| --- | --- |
| Props |     |
| startIcon |     |
| endIcon |     |
| clearable |     |
| inputType | text |
| status | default<br><br>error |
| disabled |     |
| readonly |     |
| placeholder |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

*   text
*   search
*   number
*   email
*   password
*   tel
*   url
*   week
*   month
*   date
*   datetime-local
*   time

## Overview [​](#overview)

### When to use TextInput [​](#when-to-use-textinput)

Use the TextInput component in forms when the user’s answer to a prompt can not easily be predicted, or when there is significant variability in potential inputs. For search queries, use [SearchInput](./search-input.html) instead.

You can provide autocomplete options that are tailored to the user’s input by using [Lookup](./lookup.html).

### About TextInput [​](#about-textinput)

With a TextInput, users can input text, numbers, symbols, or mixed-format strings like dates or email addresses. TextInput includes the following elements.

#### Start icon (optional) [​](#start-icon-optional)

A start icon can be included to visually enhance the input's purpose. For example, the "user avatar" icon might be used in a username field.

*   Use a simple icon that is easily understandable to users.

#### Input [​](#input)

The following input types can be used:

1.  Text (default)
2.  Search
3.  Number
4.  Email
5.  Password
6.  Telephone
7.  URL
8.  Week
9.  Month
10.  Date
11.  Date and time
12.  Time

##### Placeholder text (optional) [​](#placeholder-text-optional)

Placeholder text provides an example of what type of information is being requested in the input.

*   Placeholder text should further illustrate and support the TextInput's label.
*   Placeholder text should never replace the label nor be the input's only description.

#### End icon (optional) [​](#end-icon-optional)

A secondary end icon can be included if needed.

#### Clear button (optional) [​](#clear-button-optional)

A 'clear' button can be included to remove the typed content within the input field.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-text-input
		v-model="inputValue"
		aria-label="TextInput basic usage demo"
		@update:model-value="onEvent( 'update:modelValue', $event )"
		@input="onEvent( 'input', $event )"
		@change="onEvent( 'change', $event )"
		@focus="onEvent( 'focus', $event )"
		@blur="onEvent( 'blur', $event )"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputBasic',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		/**
		 * @param {string} eventName
		 * @param {Event|string} event
		 */
		const onEvent = function ( eventName, event ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value:', event );
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
	<cdx-text-input
		v-model="inputValue"
		aria-label="TextInput basic usage demo"
		@update:model-value="onEvent( 'update:modelValue', $event )"
		@input="onEvent( 'input', $event )"
		@change="onEvent( 'change', $event )"
		@focus="onEvent( 'focus', $event )"
		@blur="onEvent( 'blur', $event )"
	></cdx-text-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextInputBasic',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		/**
		 * @param {string} eventName
		 * @param {Event|string} event
		 */
		const onEvent = function ( eventName, event ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value:', event );
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

This simple example demonstrates how to bind a reactive reference to the input's value via `v-model`. The reactive reference will automatically update when the input value changes.

Open up the browser console to review events emitted on input, change, focus, and blur.

### With initial value [​](#with-initial-value)

  
Reset

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-text-input v-model="inputValue" aria-label="TextInput with initial value demo" />
		<br>
		<cdx-button @click="resetInput">
			Reset
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputInitialValue',
	components: { CdxButton, CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value, and set it to
		// the initial value of the input.
		const initialValue = 'Initial value';
		const inputValue = ref( initialValue );

		const resetInput = () => {
			inputValue.value = initialValue;
		};

		return {
			inputValue,
			resetInput
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-text-input v-model="inputValue" aria-label="TextInput with initial value demo"></cdx-text-input>
		<br>
		<cdx-button @click="resetInput">
			Reset
		</cdx-button>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxButton, CdxTextInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextInputInitialValue',
	components: { CdxButton, CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value, and set it to
		// the initial value of the input.
		const initialValue = 'Initial value';
		const inputValue = ref( initialValue );

		const resetInput = () => {
			inputValue.value = initialValue;
		};

		return {
			inputValue,
			resetInput
		};
	}
} );
</script>
```

### Input type [​](#input-type)

Any of the [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) can be used. Some types may result in a browser-provided user interface, like a date picker for a date input.

Input value:

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<p>Input value: {{ inputValue }}</p>

		<cdx-text-input
			v-model="inputValue"
			aria-label="TextInput date demo"
			input-type="date"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputDate',
	components: { CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<p>Input value: {{ inputValue }}</p>

		<cdx-text-input
			v-model="inputValue"
			aria-label="TextInput date demo"
			input-type="date"
		></cdx-text-input>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextInputDate',
	components: { CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

### Developer notes

Use the `inputType` prop to set the native `<input>` type attribute.

### Clearable [​](#clearable)

A clearable TextInput will have a clear button when there is text in the input. When clicked, the clear button will set the input value to an empty string.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-text-input
		v-model="inputValue"
		:clearable="true"
		aria-label="Clearable TextInput demo"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputWithClearable',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-text-input
		v-model="inputValue"
		:clearable="true"
		aria-label="Clearable TextInput demo"
	></cdx-text-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextInputWithClearable',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

### With icons [​](#with-icons)

A TextInput can have a start icon, end icon, or both. Any Codex icon can be used.

*   Use simple icons that are easily understandable to users.

Note that a clearable TextInput with an end icon will display both the clear button and the end icon when the input is not empty. To review this behavior, type in the input below.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-text-input
		v-model="inputValue"
		input-type="search"
		:start-icon="cdxIconSearch"
		:end-icon="cdxIconInfoFilled"
		:clearable="true"
		aria-label="Clearable TextInput with icons demo"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';
import { cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputWithIcons',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		return {
			cdxIconSearch,
			cdxIconInfoFilled,
			inputValue
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-text-input
		v-model="inputValue"
		input-type="search"
		:start-icon="cdxIconSearch"
		:end-icon="cdxIconInfoFilled"
		:clearable="true"
		aria-label="Clearable TextInput with icons demo"
	></cdx-text-input>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput } = require( '@wikimedia/codex' );
const { cdxIconSearch, cdxIconInfoFilled } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'TextInputWithIcons',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		return {
			cdxIconSearch,
			cdxIconInfoFilled,
			inputValue
		};
	}
} );
</script>
```

### Form field [​](#form-field)

A TextInput can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Refer to the [Field](./field.html) page for more information.

Username This username will be visible to other users.

Username must be between 4 and 20 characters.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			v-model="inputValue"
			:start-icon="cdxIconUserAvatar"
			placeholder="Enter your username"
			@blur="onBlur"
			@input="onInput"
		/>
		<template #label>
			Username
		</template>
		<template #description>
			This username will be visible to other users.
		</template>
		<template #help-text>
			Username must be between 4 and 20 characters.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxField } from '@wikimedia/codex';
import { cdxIconUserAvatar } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextInputField',
	components: { CdxTextInput, CdxField },
	setup() {
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref();

		/**
		 * On blur, validate the input.
		 */
		function onBlur() {
			const inputLength = inputValue.value.length;
			if ( inputLength > 0 && inputLength < 4 ) {
				status.value = 'error';
				messages.value = { error: 'Your username is too short.' };
			} else if ( inputLength > 20 ) {
				status.value = 'error';
				messages.value = { error: 'Your username is too long.' };
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value = null;
		}

		return {
			inputValue,
			status,
			messages,
			onBlur,
			onInput,
			cdxIconUserAvatar
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
			:start-icon="cdxIconUserAvatar"
			placeholder="Enter your username"
			@blur="onBlur"
			@input="onInput"
		></cdx-text-input>
		<template #label>
			Username
		</template>
		<template #description>
			This username will be visible to other users.
		</template>
		<template #help-text>
			Username must be between 4 and 20 characters.
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput, CdxField } = require( '@wikimedia/codex' );
const { cdxIconUserAvatar } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'TextInputField',
	components: { CdxTextInput, CdxField },
	setup() {
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref();

		/**
		 * On blur, validate the input.
		 */
		function onBlur() {
			const inputLength = inputValue.value.length;
			if ( inputLength > 0 && inputLength < 4 ) {
				status.value = 'error';
				messages.value = { error: 'Your username is too short.' };
			} else if ( inputLength > 20 ) {
				status.value = 'error';
				messages.value = { error: 'Your username is too long.' };
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value = null;
		}

		return {
			inputValue,
			status,
			messages,
			onBlur,
			onInput,
			cdxIconUserAvatar
		};
	}
} );
</script>
```

### Native validation [​](#native-validation)

The TextInput component exposes [native constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) methods. Refer to the [methods](#methods) below to review all of the supported features.

This demo sets the input type to "email" and validates the input on blur. When the input is invalid, it sets the Field's status to "error" and passes the native validation message to the Field component for display.

Email

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field :status="status" :messages="messages">
		<cdx-text-input
			ref="textInput"
			v-model="inputValue"
			input-type="email"
			@blur="onBlur"
			@invalid="onInvalid"
			@input="onInput"
		/>
		<template #label>
			Email
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputNativeValidation',
	components: { CdxTextInput, CdxField },
	setup() {
		const textInput = ref();
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref();

		/**
		 * On blur, validate the email input.
		 */
		function onBlur() {
			textInput.value.checkValidity();
		}

		/**
		 * When the input is found to be invalid, set the Field status to error
		 * and show the native validation message via the Field component.
		 *
		 * @param {Event} event
		 */
		function onInvalid( event ) {
			status.value = 'error';
			if ( event.target ) {
				messages.value = { error: event.target.validationMessage };
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value = null;
		}

		return {
			textInput,
			inputValue,
			status,
			messages,
			onBlur,
			onInvalid,
			onInput
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
			ref="textInput"
			v-model="inputValue"
			input-type="email"
			@blur="onBlur"
			@invalid="onInvalid"
			@input="onInput"
		></cdx-text-input>
		<template #label>
			Email
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextInputNativeValidation',
	components: { CdxTextInput, CdxField },
	setup() {
		const textInput = ref();
		const inputValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref();

		/**
		 * On blur, validate the email input.
		 */
		function onBlur() {
			textInput.value.checkValidity();
		}

		/**
		 * When the input is found to be invalid, set the Field status to error
		 * and show the native validation message via the Field component.
		 *
		 * @param {Event} event
		 */
		function onInvalid( event ) {
			status.value = 'error';
			if ( event.target ) {
				messages.value = { error: event.target.validationMessage };
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value = null;
		}

		return {
			textInput,
			inputValue,
			status,
			messages,
			onBlur,
			onInvalid,
			onInput
		};
	}
} );
</script>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

`v-model` is used to track the current value of the input. Refer to the events table for details on emitted events and their properties.

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Values | Default |
| --- | --- | --- | --- | --- |
| `modelValue` | Current value of the input.  <br>  <br>Provided by `v-model` binding in the parent component. | `string\|number` | \-  | `''` |
| `inputType` | `type` attribute of the input. | `[TextInputType](../types-and-constants.html#textinputtype)` | `'text'`, `'search'`, `'number'`, `'email'`, `'password'`, `'tel'`, `'url'`, `'week'`, `'month'`, `'date'`, `'datetime-local'`, `'time'` | `'text'` |
| `status` | `status` attribute of the input. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | \-  | `'default'` |
| `disabled` | Whether the input is disabled. | `boolean` | \-  | `false` |
| `startIcon` | An icon at the start of the input element. Similar to a `::before` pseudo-element. | `[Icon](../types-and-constants.html#icon)\|undefined` | \-  | `undefined` |
| `endIcon` | An icon at the end of the input element. Similar to an `::after` pseudo-element. | `[Icon](../types-and-constants.html#icon)\|undefined` | \-  | `undefined` |
| `clearable` | Add a clear button at the end of the input element.  <br>  <br>When the clear button is pressed, the input's value is set to an empty string. The clear button is displayed when input text is present. | `boolean` | \-  | `false` |

#### Methods [​](#methods)

| Method name | Description | Signature |
| --- | --- | --- |
| `focus` | Focus the component's input element. | **Returns:** `void` |
| `blur` | Blur the component's input element. | **Returns:** `void` |
| `checkValidity` | Check the validity of the input element according to its constraint attributes. Emits an 'invalid' event if the input is invalid. See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity) | **Returns:** `boolean` Whether the input is valid |
| `reportValidity` | Check the validity of the input element and report it as a pop up on the UI. See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity) | **Returns:** `boolean` Whether the input is valid |
| `setCustomValidity` | Set custom validity and message for the input element. See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity) | **Params:**<br><br>*   **message** `string` - The custom validation message to set<br><br>**Returns:** `void` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:modelValue` | **modelValue** `string\|number` - The new model value | When the input value changes |
| `keydown` | **undefined** `KeyboardEvent` | When the user presses a key.  <br>  <br>This event is not emitted when the user presses the Home or End key (T314728), but is emitted for Ctrl/Cmd+Home and Ctrl/Cmd+End. |
| `input` | **event** `InputEvent` | When the input value changes via direct use of the input |
| `change` | **event** `Event` | When an input value change is committed by the user (e.g. on blur) |
| `focus` | **event** `FocusEvent` | When the input comes into focus |
| `blur` | **event** `FocusEvent` | When the input loses focus |
| `clear` | **event** `MouseEvent` | When the input value is cleared through the use of the clear button |
| `invalid` | **event** `Event` | When the input value is invalid according to the input's constraint attributes (e.g. min, max, pattern). See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid\_event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The CSS-only TextInput component consists of a `<div>` wrapping an `<input>` element.

Show codeCopy code

html

```
<!-- Wrapper div. -->
<div class="cdx-text-input">
  <!-- Input element with CSS class and attributes. -->
  <input
    class="cdx-text-input__input"
    type="text"
    placeholder="Start typing..."
  />
</div>
```

#### With icons [​](#with-icons-1)

You can use [CSS-only icons](./icon.html#css-only-version) to add start and end icons to the input.

You'll need the following CSS classes on the root element:

*   Start icon: `.cdx-text-input--has-start-icon`
*   End icon: `.cdx-text-input--has-end-icon`

The icons will be `<span>` elements with the `.cdx-text-input__icon` class, plus:

*   Start icon: `.cdx-text-input__start-icon`
*   End icon: `.cdx-text-input__end-icon`

You will need to add your own CSS classes to set the icon styles and background image.

Show codeCopy code

html

```
<div
  class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon"
>
  <input class="cdx-text-input__input" type="text" />
  <span
    class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"
  ></span>
  <span
    class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"
  ></span>
</div>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon {
  &--search {
    .cdx-mixin-css-icon( @cdx-icon-search );
  }

  &--info-filled {
    .cdx-mixin-css-icon( @cdx-icon-info-filled );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--search {
    .cdx-mixin-css-icon( @cdx-icon-search );
  }

  &--info-filled {
    .cdx-mixin-css-icon( @cdx-icon-info-filled );
  }
}
```

#### Disabled [​](#disabled)

Add the `disabled` attribute to the `<input>` element for a disabled text input. This also works for the `readonly` attribute.

Show codeCopy code

html

```
<div
  class="cdx-text-input cdx-text-input--has-start-icon cdx-text-input--has-end-icon"
>
  <input
    class="cdx-text-input__input"
    type="text"
    placeholder="Start typing..."
    disabled
  />
  <span
    class="cdx-text-input__icon cdx-text-input__start-icon cdx-demo-css-icon--search"
  ></span>
  <span
    class="cdx-text-input__icon cdx-text-input__end-icon cdx-demo-css-icon--info-filled"
  ></span>
</div>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon {
  &--search {
    .cdx-mixin-css-icon( @cdx-icon-search );
  }

  &--info-filled {
    .cdx-mixin-css-icon( @cdx-icon-info-filled );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--search {
    .cdx-mixin-css-icon( @cdx-icon-search );
  }

  &--info-filled {
    .cdx-mixin-css-icon( @cdx-icon-info-filled );
  }
}
```

#### Error state [​](#error-state)

Add the `.cdx-text-input--status-error` class to the root element to show error styles.

Show codeCopy code

html

```
<div class="cdx-text-input cdx-text-input--status-error">
  <input class="cdx-text-input__input" type="text" value="Something's wrong" />
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Left arrow / Right arrow | The left and right arrows navigate through the text content within the input. |
| Up arrow / Down arrow | Up arrow moves the focus from the last position of the input to the first one, while down arrow moves it from the first position to the last. |

Pager

[Previous pageTextArea](/codex/latest/components/demos/text-area.html)

[Next pageToggleSwitch](/codex/latest/components/demos/toggle-switch.html)