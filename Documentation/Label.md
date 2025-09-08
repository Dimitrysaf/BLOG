# Label [​](#label)

A Label provides a descriptive title for an input or form field.

Label text Short description text

Show codeCopy code

Reset demo

```markup
<cdx-label>Label text
<template #description>Short description text</template></cdx-label>
```

| Name | Value |
| --- | --- |
| Props |     |
| icon |     |
| optional |     |
| visuallyHidden |     |
| isLegend |     |
| disabled |     |
| Slots |     |
| default |     |
| description |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

## Overview [​](#overview)

### When to use Label [​](#when-to-use-label)

Every input or form field must have an associated label. When creating a form, use the [Field](./field.html) component, which contains a Label. When creating an input outside of a form, such as a [SearchInput](./search-input.html)), use the Label component.

For more detailed information about form fields, consult the guidelines for [constructing forms](./../../style-guide/constructing-forms.html).

### About Label [​](#about-label)

Label includes the following elements.

#### Icon (optional) [​](#icon-optional)

A start icon can be included to visually enhance the label's context. Any Codex icon can be used.

*   Use a simple icon that is easily comprehensible to users.
*   Don't use an icon in the label if there is an icon in the input.

#### Label text [​](#label-text)

A clear and descriptive title for the input tells the user what information to enter.

*   Keep the label text short, clear, and easy to scan.
*   Label text is required, but can be visually-hidden if the context of an input is sufficient to identify it.
*   Label text is bold by default, but the label of nested fields should use the regular font weight to make the hierarchy clear.

#### Optional indicator (optional) [​](#optional-indicator-optional)

Fields are assumed to be required by default. If a field is optional, it can be labeled as such.

*   Ensure that the entire word "optional" is displayed for translation purposes.
*   Don't mark required labels with an asterisk.

#### Description (optional) [​](#description-optional)

The description provides additional information about the field.

## Examples [​](#examples)

TIP

Consider using the [Field](./field.html) component, which includes the Label component and handles accessibility features like ARIA attributes internally. If you need more custom behavior, use the Label component on its own.

### Basic usage [​](#basic-usage)

By default, the Label will be visible with the label text styled in bold.

Username

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-label input-id="username-input">
			Username
		</cdx-label>
		<cdx-text-input id="username-input" v-model="inputValue" />
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LabelBasic',
	components: { CdxTextInput, CdxLabel },
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
	<div>
		<cdx-label input-id="username-input">
			Username
		</cdx-label>
		<cdx-text-input id="username-input" v-model="inputValue"></cdx-text-input>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'LabelBasic',
	components: { CdxTextInput, CdxLabel },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

### Developer notes

When using the Label component with an input, make sure to add an `id` attribute to the input and use that to set the `for` attribute on the label. These attributes will be applied on the proper element within each component (in the example below, that's the `<label>` for the Label component, and the `<input>` for the TextInput).

### Visually-hidden label [​](#visually-hidden-label)

All inputs need a label to meet accessibility standards. In rare instances, you may not need a visible label if it's very clear from context how to use an input.

Sort results

Sort by: latest

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-label input-id="sort-order-select" :visually-hidden="true">
			Sort results
		</cdx-label>
		<cdx-select
			id="sort-order-select"
			v-model:selected="selection"
			:menu-items="menuItems"
		/>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect, CdxLabel } from '@wikimedia/codex';
export default defineComponent( {
	name: 'LabelVisuallyHidden',
	components: { CdxSelect, CdxLabel },
	data() {
		return {
			menuItems: [
				{ label: 'Sort by: latest', value: 'recency' },
				{ label: 'Sort by: alphabetical', value: 'alphabetical' }
			],
			selection: 'recency'
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-label input-id="sort-order-select" :visually-hidden="true">
			Sort results
		</cdx-label>
		<cdx-select
			id="sort-order-select"
			v-model:selected="selection"
			:menu-items="menuItems"
		></cdx-select>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxSelect, CdxLabel } = require( '@wikimedia/codex' );
module.exports = defineComponent( {
	name: 'LabelVisuallyHidden',
	components: { CdxSelect, CdxLabel },
	data() {
		return {
			menuItems: [
				{ label: 'Sort by: latest', value: 'recency' },
				{ label: 'Sort by: alphabetical', value: 'alphabetical' }
			],
			selection: 'recency'
		};
	}
} );
</script>
```

*   Sort by: latest
*   Sort by: alphabetical

### Developer notes

To achieve this, you can use the Label component to create a semantic label for assistive technology, but visually hide the label.

Note that this will hide the entire output of the component, including the description.

### With description [​](#with-description)

Description text can include markup. Only links and text formatting are recommended as description text should be concise.

Muted users Do not display notifications from these users. [Learn more about how this works](https://www.mediawiki.org/wiki/Help:Notifications#mute).

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-label input-id="muted-users-input">
			Muted users
			<template #description>
				Do not display notifications from these users.
				<a href="https://www.mediawiki.org/wiki/Help:Notifications#mute">Learn more about how this works</a>.
			</template>
		</cdx-label>
		<cdx-text-input
			id="muted-users-input"
			v-model="inputValue"
			placeholder="Add users..."
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LabelWithRichText',
	components: { CdxTextInput, CdxLabel },
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
	<div>
		<cdx-label input-id="muted-users-input">
			Muted users
			<template #description>
				Do not display notifications from these users.
				<a href="https://www.mediawiki.org/wiki/Help:Notifications#mute">Learn more about how this works</a>.
			</template>
		</cdx-label>
		<cdx-text-input
			id="muted-users-input"
			v-model="inputValue"
			placeholder="Add users..."
		></cdx-text-input>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'LabelWithRichText',
	components: { CdxTextInput, CdxLabel },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

### Label vs. legend [​](#label-vs-legend)

This component outputs a different HTML element depending on whether it is a label for a single input or for a group of inputs. Below are examples of a label and a legend with an associated description.

Name Enter your preferred name

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-label input-id="name-input">
			Name
			<template #description>
				Enter your preferred name
			</template>
		</cdx-label>
		<cdx-text-input id="name-input" v-model="inputValue" />
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LabelWithDescription',
	components: { CdxTextInput, CdxLabel },
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
	<div>
		<cdx-label input-id="name-input">
			Name
			<template #description>
				Enter your preferred name
			</template>
		</cdx-label>
		<cdx-text-input id="name-input" v-model="inputValue"></cdx-text-input>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTextInput, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'LabelWithDescription',
	components: { CdxTextInput, CdxLabel },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
```

Notifications Choose how often you'd like to receive notifications

Daily

Weekly

Monthly

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<fieldset class="cdx-demo-legend">
		<cdx-label :is-legend="true">
			Notifications
			<template #description>
				Choose how often you'd like to receive notifications
			</template>
		</cdx-label>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group"
			:input-value="radio.value"
		>
			{{ radio.label }}
		</cdx-radio>
	</fieldset>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LegendWithDescription',
	components: { CdxRadio, CdxLabel },
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

<style lang="less">
.cdx-demo-legend {
	// Remove <fieldset> border and padding.
	border: 0;
	padding: 0;
}
</style>
```

vue

```
<template>
	<fieldset class="cdx-demo-legend">
		<cdx-label :is-legend="true">
			Notifications
			<template #description>
				Choose how often you'd like to receive notifications
			</template>
		</cdx-label>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group"
			:input-value="radio.value"
		>
			{{ radio.label }}
		</cdx-radio>
	</fieldset>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxRadio, CdxLabel } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'LegendWithDescription',
	components: { CdxRadio, CdxLabel },
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

<style lang="less">
.cdx-demo-legend {
	// Remove <fieldset> border and padding.
	border: 0;
	padding: 0;
}
</style>
```

### Developer notes

Label outputs a `<label>` element by default. When the `isLegend` prop is set to `true`, it will instead output a `<legend>` element. Use this within a `<fieldset>` element.

There is a named slot in the Label component, `description`, for including more information about the field. It's important to note that, when `isLegend` is `true`, the description will be rendered inside the `<legend>` element to ensure it will be read by assistive technology.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `icon` | Icon before the label text.  <br>  <br>Do not use this if including a start icon within the input component. | `[Icon](../types-and-constants.html#icon)\|null` | `null` |
| `optional` | Whether the field is optional.  <br>  <br>This will add a flag next to the label indicating that the field is optional. | `boolean` | `false` |
| `optionalFlag` | Text to indicate that the field is optional.  <br>  <br>Omit this prop to use the default value, "(optional)". | `string` | `''` |
| `visuallyHidden` | Whether the label should be visually hidden. | `boolean` | `false` |
| `isLegend` | Whether this component should output a `<legend>` element.  <br>  <br>Always set this to true when this component is used inside a `<fieldset>` element. Do not set it to true otherwise. | `boolean` | `false` |
| `inputId` | The ID of the input/control this label is for.  <br>  <br>Will be added as the `for` attribute of the `<label>`. Not needed for `<legend>`. | `string` | `''` |
| `descriptionId` | The ID of the description element.  <br>  <br>This ID can be used for the `aria-describedby` attribute of the input. | `string` | `''` |
| `disabled` | Whether this label is for a disabled field or input. | `boolean` | `false` |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Label text. |     |
| description | Short description text. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

Examples are shown with inputs to demonstrate the ARIA attributes required to connect the label and input.

##### Label [​](#label-1)

Use a `<label>` element for a single input.

Label text (optional) Short description text

Show codeCopy code

html

```
<!-- Outer element is a <div>. -->
<div class="cdx-label">
  <!-- Label element. Include a `for` attribute to connect it with an input. -->
  <label class="cdx-label__label" for="cdx-demo-input-1">
    <!-- Label text. -->
    <span class="cdx-label__label__text">Label text</span>
    <!-- Optional flag. -->
    <span class="cdx-label__label__optional-flag"> (optional)</span>
  </label>
  <!-- Description. Include an `id` attribute so the input can have an
	`aria-describedby` attribute. -->
  <span id="cdx-demo-description-1" class="cdx-label__description">
    Short description text
  </span>
</div>
<!-- Input for demo purposes. -->
<div class="cdx-text-input">
  <!-- Has `id` and `aria-describedby` attributes. -->
  <input
    id="cdx-demo-input-1"
    class="cdx-text-input__input"
    type="text"
    aria-describedby="cdx-demo-description-1"
  />
</div>
```

##### Legend [​](#legend)

Inside a `<form>`, use a `<legend>` element within a `<fieldset>` for input groups.

When outputting a `<legend>` rather than a `<label>`, the markup of this component is quite different:

*   There is no wrapper `<div>`—`<legend>` must be a direct child of `<fieldset>`
*   The description is included inside the `<legend>`
*   The `for` and `aria-describedby` attributes are not needed

Legend text (optional) Short description text

Radio 1Radio 2

Show codeCopy code

html

```
<!-- Note that the `cdx-field` class will remove browser fieldset styles. -->
<fieldset class="cdx-field">
  <!-- Outer element is the <legend> element. -->
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
  <!-- Radio group for demo purposes. -->
  <div>
    <span class="cdx-radio">
      <input
        id="cdx-docs-radio-1"
        class="cdx-radio__input"
        type="radio"
        name="radio-legend-demo"
        checked
      />
      <span class="cdx-radio__icon"></span>
      <label class="cdx-radio__label" for="cdx-docs-radio-1">Radio 1</label>
    </span>
    <span class="cdx-radio">
      <input
        id="cdx-docs-radio-2"
        class="cdx-radio__input"
        type="radio"
        name="radio-legend-demo"
      />
      <span class="cdx-radio__icon"></span>
      <label class="cdx-radio__label" for="cdx-docs-radio-2">Radio 2</label>
    </span>
  </div>
</fieldset>
```

#### With icon [​](#with-icon)

To add an icon to the label:

*   Add an empty `<span>` before the label text with the classes `.cdx-label__label__icon` and a custom class that you can target to add the CSS-only icon
*   Apply the [CSS-only icon mixin](./icon.html#css-only-version) to that `<span>`

This works for `<label>` and `<legend>`.

Signature Enter your signature using plain text or wikitext

Show codeCopy code

html

```
<div class="cdx-label">
  <label class="cdx-label__label" for="cdx-demo-input-2">
    <span class="cdx-label__label__icon cdx-demo-css-icon--wiki-text"></span>
    <span class="cdx-label__label__text">Signature</span>
  </label>
  <span id="cdx-demo-description-2" class="cdx-label__description">
    Enter your signature using plain text or wikitext
  </span>
</div>
<div class="cdx-text-input">
  <input
    id="cdx-demo-input-2"
    class="cdx-text-input__input"
    type="text"
    aria-describedby="cdx-demo-description-2"
  />
</div>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--wiki-text {
  .cdx-mixin-css-icon( @cdx-icon-wikitext );
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon--wiki-text {
  .cdx-mixin-css-icon( @cdx-icon-wikitext );
}
```

#### Visually-hidden [​](#visually-hidden)

Occasionally, there may be a [use case](./field.html#field-with-multiple-inputs) for the label to be visually hidden. In these cases, it should still be present in the DOM with appropriate elements and ARIA attributes.

To visually hide the label, add the `.cdx-label--visually-hidden` class to the outer element. This works for `<label>` and `<legend>`.

Field with invisible label

Show codeCopy code

html

```
<div class="cdx-label cdx-label--visually-hidden">
  <label class="cdx-label__label" for="cdx-demo-input-3">
    <span class="cdx-label__label__text">Field with invisible label</span>
  </label>
</div>
<div class="cdx-text-input">
  <input
    id="cdx-demo-input-3"
    class="cdx-text-input__input"
    type="text"
    placeholder="Do not actually use placeholders as labels!"
  />
</div>
```

#### Disabled [​](#disabled)

Add the `.cdx-label--disabled` class to the outer element to get disabled styles. This works for `<label>` and `<legend>`.

Label text

Show codeCopy code

html

```
<div class="cdx-label cdx-label--disabled">
  <label class="cdx-label__label" for="cdx-demo-input-4">
    <span class="cdx-label__label__text">Label text </span>
  </label>
</div>
<div class="cdx-text-input">
  <input
    id="cdx-demo-input-4"
    class="cdx-text-input__input"
    type="text"
    disabled
  />
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Enter | If the focus is placed on one of the interactive elements within the Label, it activates them. |

Pager

[Previous pageField](/codex/latest/components/demos/field.html)

[Next pageLookup](/codex/latest/components/demos/lookup.html)