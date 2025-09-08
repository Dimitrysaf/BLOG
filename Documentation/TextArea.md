# TextArea [​](#textarea)

A TextArea is a multi-line text input that allows manual resizing if needed.

Show codeCopy code

Reset demo

```markup
<cdx-text-area v-model="textareaValue" />
```

| Name | Value |
| --- | --- |
| Props |     |
| status | default<br><br>error |
| autosize |     |
| startIcon |     |
| endIcon |     |
| placeholder |     |
| disabled |     |
| readonly |     |
| rows |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

## Overview [​](#overview)

### When to use TextArea [​](#when-to-use-textarea)

Use the TextArea component to let users enter long text that exceeds one line.

This form element is useful when the user needs to enter a sizable amount of free-form text, for example comments, reviews, feedback, or short essay responses. If the text is expected to be short, use [TextInput](./text-input.html) instead.

### About TextArea [​](#about-textarea)

TextArea includes the following elements.

#### Start icon (optional) [​](#start-icon-optional)

A start icon can be included to visually enhance the TextArea's purpose.

*   Use a simple icon that is easily understandable to users.

#### Textarea [​](#textarea-1)

The textarea element's has an optional grabber that allows vertical resizing, and a scrollbar will appear if the text exceeds the height of the textarea before resizing. If the autosize property is enabled, the height of the textarea adjusts automatically according to the length of the text.

##### Placeholder text (optional) [​](#placeholder-text-optional)

Placeholder text provides an example of what type of information is being requested in the TextArea.

*   Placeholder text should further illustrate and support the TextArea's label.
*   Placeholder text should never replace the label nor be the input's only description.

#### End icon (optional) [​](#end-icon-optional)

A secondary end icon can be included if needed.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

By default, the TextArea has a grabber that can be used to manually resize it.

Browser Support Warning

While Codex strives to provide a consistent experience across different platforms and browsers, it's important to be aware that the vertical resizing feature may not be available on iOS devices, including iPhones and iPads. This limitation is due to the default behavior of iOS Safari.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea default demo"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaDefault',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea default demo"
		></cdx-text-area>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextArea } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextAreaDefault',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
```

### Developer notes

The TextArea component uses `v-model` to two-way bind the reactive reference to the value of `<textarea>`. The reactive reference will automatically update when the value changes in the `<textarea>`.

### Custom rows [​](#custom-rows)

You can set a number of `rows` of text to display initially.

*   The number of rows shown should reflect the amount of text expected to be entered.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with rows"
			rows="8"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaWithRows',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with rows"
			rows="8"
		></cdx-text-area>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextArea } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextAreaWithRows',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
```

### With autosize [​](#with-autosize)

When the `autosize` property is enabled, the TextArea's height will automatically grow with the length of the text. The grabber and scrollbar are removed since the TextArea expands automatically and shows all of the text at once.

*   Use a TextArea with \`autosize\` when there is ample space in the layout for the TextArea to expand.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with autosize"
			:autosize="true"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaWithAutosize',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with autosize"
			:autosize="true"
		></cdx-text-area>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextArea } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextAreaWithAutosize',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
```

### With icons [​](#with-icons)

A TextArea can have a start icon, end icon, or both. Any Codex icon can be used.

*   Use simple icons that are easily understandable to users.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with icons"
			:start-icon="cdxIconSpeechBubbles"
			:end-icon="cdxIconInfoFilled"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';
import { cdxIconSpeechBubbles, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextAreaWithIcons',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue,
			cdxIconSpeechBubbles,
			cdxIconInfoFilled
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with icons"
			:start-icon="cdxIconSpeechBubbles"
			:end-icon="cdxIconInfoFilled"
		></cdx-text-area>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextArea } = require( '@wikimedia/codex' );
const { cdxIconSpeechBubbles, cdxIconInfoFilled } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'TextAreaWithIcons',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue,
			cdxIconSpeechBubbles,
			cdxIconInfoFilled
		};
	}
} );
</script>
```

### Form field [​](#form-field)

A TextArea can be wrapped in the Field component to add features like a semantic label, description and help text, and validation messages. A [character counter](./field.html#custom-help-text-content) can also be added via the Field component. Refer to the [Field](./field.html) page for more information.

Comments

Enter a message of 100 characters or less

100

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field
		class="cdx-demo-textarea-field"
		:status="status"
		:messages="messages"
	>
		<cdx-text-area v-model="messageText" placeholder="Post your reply" />
		<template #label>
			Comments
		</template>
		<template #help-text>
			<div
				class="cdx-demo-textarea-field__help-text"
				:class="dynamicClasses"
			>
				<!-- Display help text or error message depending on error status. -->
				<div class="cdx-demo-textarea-field__help-text__message">
					<p>{{ helpText }}</p>
				</div>

				<!-- Display the remaining character count. -->
				<div class="cdx-demo-textarea-field__help-text__counter">
					{{ charsRemaining }}
				</div>
			</div>
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxTextArea, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaField',
	components: { CdxTextArea, CdxField },
	setup() {
		const MAX_MESSAGE_LENGTH = 100;
		const helpText = `Enter a message of ${ MAX_MESSAGE_LENGTH } characters or less`;

		const messages = { error: 'Message is too long' };
		const messageText = ref( '' );

		// This is a simplified example; support for other languages/scripts may
		// require more complex code.
		const charsRemaining = computed( () => MAX_MESSAGE_LENGTH - messageText.value.length );
		const status = computed( () => charsRemaining.value < 0 ? 'error' : 'default' );

		const dynamicClasses = computed( () => ( {
			'cdx-demo-field-with-counter__help-text--error': status.value === 'error'
		} ) );

		return {
			messageText,
			status,
			charsRemaining,
			messages,
			helpText,
			dynamicClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-textarea-field {
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
		class="cdx-demo-textarea-field"
		:status="status"
		:messages="messages"
	>
		<cdx-text-area v-model="messageText" placeholder="Post your reply"></cdx-text-area>
		<template #label>
			Comments
		</template>
		<template #help-text>
			<div
				class="cdx-demo-textarea-field__help-text"
				:class="dynamicClasses"
			>
				<!-- Display help text or error message depending on error status. -->
				<div class="cdx-demo-textarea-field__help-text__message">
					<p>{{ helpText }}</p>
				</div>

				<!-- Display the remaining character count. -->
				<div class="cdx-demo-textarea-field__help-text__counter">
					{{ charsRemaining }}
				</div>
			</div>
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const { CdxTextArea, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextAreaField',
	components: { CdxTextArea, CdxField },
	setup() {
		const MAX_MESSAGE_LENGTH = 100;
		const helpText = `Enter a message of ${ MAX_MESSAGE_LENGTH } characters or less`;

		const messages = { error: 'Message is too long' };
		const messageText = ref( '' );

		// This is a simplified example; support for other languages/scripts may
		// require more complex code.
		const charsRemaining = computed( () => MAX_MESSAGE_LENGTH - messageText.value.length );
		const status = computed( () => charsRemaining.value < 0 ? 'error' : 'default' );

		const dynamicClasses = computed( () => ( {
			'cdx-demo-field-with-counter__help-text--error': status.value === 'error'
		} ) );

		return {
			messageText,
			status,
			charsRemaining,
			messages,
			helpText,
			dynamicClasses
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-textarea-field {
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

### Native validation [​](#native-validation)

The TextArea component exposes [native constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) methods. Refer to the [methods](#methods) below to review all of the supported features.

This demo sets the `required` attribute on the textarea and validates it when the form is submitted. When the textarea is invalid, it sets the Field's status to "error" and passes the native validation message to the Field component for display. Submit the form while leaving the TextArea blank.

Message

Submit

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<form class="cdx-docs-text-area-native-validation">
		<cdx-field :status="status" :messages="messages">
			<cdx-text-area
				ref="textarea"
				v-model="textareaValue"
				required
				@invalid="onInvalid"
				@input="onInput"
			/>
			<template #label>
				Message
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-text-area-native-validation__submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea, CdxField, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaNativeValidation',
	components: { CdxTextArea, CdxField, CdxButton },
	setup() {
		const textarea = ref();
		const textareaValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref( {
			success: 'Submitted successfully!',
			error: ''
		} );

		/**
		 * On submit, validate the textarea.
		 */
		function onSubmit() {
			const isValid = textarea.value.checkValidity();
			if ( isValid ) {
				status.value = 'success';
			}
		}

		/**
		 * When the textarea is found to be invalid, set the Field status to
		 * error and show the native validation message via the Field component.
		 *
		 * @param {Event} event
		 */
		function onInvalid( event ) {
			status.value = 'error';
			if ( event.target ) {
				messages.value.error = event.target.validationMessage;
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value.error = '';
		}

		return {
			textarea,
			textareaValue,
			status,
			messages,
			onSubmit,
			onInvalid,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-text-area-native-validation {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
```

vue

```
<template>
	<form class="cdx-docs-text-area-native-validation">
		<cdx-field :status="status" :messages="messages">
			<cdx-text-area
				ref="textarea"
				v-model="textareaValue"
				required
				@invalid="onInvalid"
				@input="onInput"
			></cdx-text-area>
			<template #label>
				Message
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-text-area-native-validation__submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextArea, CdxField, CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TextAreaNativeValidation',
	components: { CdxTextArea, CdxField, CdxButton },
	setup() {
		const textarea = ref();
		const textareaValue = ref( '' );
		const status = ref( 'default' );
		const messages = ref( {
			success: 'Submitted successfully!',
			error: ''
		} );

		/**
		 * On submit, validate the textarea.
		 */
		function onSubmit() {
			const isValid = textarea.value.checkValidity();
			if ( isValid ) {
				status.value = 'success';
			}
		}

		/**
		 * When the textarea is found to be invalid, set the Field status to
		 * error and show the native validation message via the Field component.
		 *
		 * @param {Event} event
		 */
		function onInvalid( event ) {
			status.value = 'error';
			if ( event.target ) {
				messages.value.error = event.target.validationMessage;
			}
		}

		/**
		 * Reset the status and messages when the input changes. This is
		 * important since the user may be trying to correct an error.
		 */
		function onInput() {
			status.value = 'default';
			messages.value.error = '';
		}

		return {
			textarea,
			textareaValue,
			status,
			messages,
			onSubmit,
			onInvalid,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-text-area-native-validation {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

`v-model` is used to track the current value of the textarea. Refer to the events docs for details on emitted events and their properties.

Attributes passed to textarea

This component will pass any HTML attributes applied to it, except for CSS class, to the `<textarea>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `modelValue` | Current value of the textarea.  <br>  <br>Provided by `v-model` binding in the parent component. | `string` | `''` |
| `status` | `status` attribute of the textarea. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |
| `disabled` | Whether the textarea is disabled. | `boolean` | `false` |
| `autosize` | Describes whether the textarea grows vertically to show all text.  <br>  <br>When autosize is true, the textarea automatically grows in height (vertically). The height of the textarea expands while the user types in the textarea. The content inside the textarea is visible and there's no scroll. | `boolean` | `false` |
| `startIcon` | An icon at the start of the textarea element. Similar to a `::before` pseudo-element. | `[Icon](../types-and-constants.html#icon)\|undefined` | `undefined` |
| `endIcon` | An icon at the end of the textarea element. Similar to an `::after` pseudo-element. | `[Icon](../types-and-constants.html#icon)\|undefined` | `undefined` |

#### Methods [​](#methods)

| Method name | Description | Signature |
| --- | --- | --- |
| `focus` | Focus the component's textarea element. | **Returns:** `void` |
| `blur` | Blur the component's textarea element. | **Returns:** `void` |
| `checkValidity` | Check the validity of the textarea element according to its constraint attributes. Emits an 'invalid' event if the textarea is invalid. See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/checkValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/checkValidity) | **Returns:** `boolean` Whether the textarea is valid |
| `reportValidity` | Check the validity of the textarea element and report it as a pop up on the UI. See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/reportValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/reportValidity) | **Returns:** `boolean` Whether the textarea is valid |
| `setCustomValidity` | Set custom validity and message for the textarea element. See: [https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/setCustomValidity](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/setCustomValidity) | **Params:**<br><br>*   **message** `string` - The custom validation message to set<br><br>**Returns:** `void` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:modelValue` | **modelValue** `string` - The new model value | When the textarea value changes. |
| `input` | **event** `InputEvent` | When the input value changes via direct use of the input |
| `change` | **event** `Event` | When an input value change is committed by the user (e.g. on blur) |
| `focus` | **event** `FocusEvent` | When the input comes into focus |
| `blur` | **event** `FocusEvent` | When the input loses focus |
| `invalid` | **event** `Event` | When the textarea value is invalid according to the textarea's constraint attributes (e.g. minlength, maxlength, or required). See: [https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint\_validation#validation-related\_attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#validation-related_attributes) |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The CSS-only TextArea component consists of a `<div>` wrapping a `<textarea>` element.

Show codeCopy code

html

```
<!-- Wrapper div. -->
<div class="cdx-text-area">
  <!-- Textarea element with CSS class and attributes. -->
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  ></textarea>
</div>
```

#### With icons [​](#with-icons-1)

You can use [CSS-only icons](./icon.html#css-only-version) to add start and end icons to the textarea.

##### Using CSS-only icons [​](#using-css-only-icons)

I. Add classes to elements.

You'll need the following CSS classes on the root element:

*   Start icon: `.cdx-text-area--has-start-icon`
*   End icon: `.cdx-text-area--has-end-icon`

The icons will be `<span>` elements with the `.cdx-text-area__icon` class, plus:

*   Start icon: `.cdx-text-area__start-icon`
*   End icon: `.cdx-text-area__end-icon`

You will need to add your own CSS classes to set the icon styles and background image.

II. Choose an icon ([list of all icons](/codex/latest/icons/all-icons.html#list-of-all-icons)) to set the background image.

You'll set the background image of the `<span>` with the icon of your choosing by utilizing a Less mixin built into Codex called `.cdx-mixin-css-icon-background-image`.

In the example below, we've chosen cdxIconNotBright as the start icon and added a class called `cdx-demo-css-icon--not-bright` to the `<span>`. In your stylesheet, the selector, `cdx-demo-css-icon--not-bright`, will call the background image mixin and pass in the icon name of your choice. The icon name is passed in the mixin as a argument and is in lower-case and separated by hyphens: `.cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );`.

Show codeCopy code

html

```
<div
  class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
  ></textarea>
  <span
    class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"
  ></span>
  <span
    class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"
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
  &--not-bright {
    .cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
  }

  &--info-filled {
    .cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--not-bright {
    .cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
  }

  &--info-filled {
    .cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
  }
}
```

#### Disabled [​](#disabled)

Add the `disabled` attribute to the `<textarea>` element for a disabled textarea. This also works for the `readonly` attribute.

Show codeCopy code

html

```
<div
  class="cdx-text-area cdx-text-area--has-start-icon cdx-text-area--has-end-icon"
>
  <textarea
    class="cdx-text-area__textarea"
    placeholder="Start typing..."
    disabled
  ></textarea>
  <span
    class="cdx-text-area__icon cdx-text-area__start-icon cdx-demo-css-icon--not-bright"
  ></span>
  <span
    class="cdx-text-area__icon cdx-text-area__end-icon cdx-demo-css-icon--info-filled"
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
  &--not-bright {
    .cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
  }

  &--info-filled {
    .cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--not-bright {
    .cdx-mixin-css-icon-background-image( @cdx-icon-not-bright );
  }

  &--info-filled {
    .cdx-mixin-css-icon-background-image( @cdx-icon-info-filled );
  }
}
```

#### Error state [​](#error-state)

Add the `cdx-text-area--status-error` class to the root element to show error styles.

Show codeCopy code

html

```
<div class="cdx-text-area cdx-text-area--status-error">
  <textarea
    class="cdx-text-area__textarea"
    value="Something's wrong"
  ></textarea>
</div>
```

#### Form field [​](#form-field-1)

The CSS-only Field component can wrap the CSS-only TextArea to add features like a semantic label, description, optional flag, and help text. Refer to the [Field](./field.html) for more information.

Edit summary Briefly describe your changes

By saving changes, you agree to the [Terms of Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use), and you irrevocably agree to release your contribution under the [CC BY-SA 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/deed.en) and the [GFDL](https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License). You agree that a hyperlink or URL is sufficient attribution under the Creative Commons license.

Show codeCopy code

html

```
<!-- Outer element is a <div>. -->
<div class="cdx-field">
  <!-- Label. -->
  <div class="cdx-label">
    <!-- Label element. Include a `for` attribute to connect it with an textarea. -->
    <label class="cdx-label__label" for="cdx-demo-textarea">
      <!-- Label text. -->
      <span class="cdx-label__label__text">Edit summary</span>
    </label>
    <!-- Description. Include an `id` attribute so the textarea can have an `aria-describedby` attribute. -->
    <span id="cdx-demo-description-1" class="cdx-label__description">
      Briefly describe your changes
    </span>
  </div>
  <!-- Textarea/control wrapper. -->
  <div class="cdx-field__control">
    <!-- Textarea or control. -->
    <div class="cdx-text-textarea">
      <!-- Has `id` and `aria-describedby` attributes. -->
      <textarea
        id="cdx-demo-textarea"
        class="cdx-text-area__textarea"
        placeholder="Describe what you changed"
        aria-describedby="cdx-demo-description-1"
      >
      </textarea>
    </div>
  </div>
  <div class="cdx-field__help-text">
    By saving changes, you agree to the
    <a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use"
      >Terms of Use</a
    >, and you irrevocably agree to release your contribution under the
    <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
      >CC BY-SA 4.0 License</a
    >
    and the
    <a
      href="https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_GNU_Free_Documentation_License"
      >GFDL</a
    >. You agree that a hyperlink or URL is sufficient attribution under the
    Creative Commons license.
  </div>
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Left arrow / Right arrow | The left and right arrows navigate through the text content within the input. |
| Up arrow / Down arrow | Up arrow moves the focus from the last position of the input to the first one, while down arrow moves it from the first position to the last. |

Pager

[Previous pageSelect](/codex/latest/components/demos/select.html)

[Next pageTextInput](/codex/latest/components/demos/text-input.html)