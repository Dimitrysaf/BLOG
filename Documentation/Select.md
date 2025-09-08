# Select [​](#select)

A Select is an input with a dropdown menu of predefined, selectable options.

Choose an option

Show codeCopy code

Reset demo

```markup
<cdx-select />
```

| Name | Value |
| --- | --- |
| Props |     |
| disabled |     |
| defaultLabel |     |
| defaultIcon |     |
| status | default<br><br>error |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

*   Cameraoptical device for recording or transmitting photographic images or videos
*   Bookwritten text that can be published in printed or electronic form
*   Clockinstrument that measures the passage of time

## Overview [​](#overview)

### When to use Select [​](#when-to-use-select)

Use the Select component when users need to choose an option from a short, predefined list.

**When not to use:**

*   If the list of options is too long, consider using [Lookup](./lookup.html) instead.
*   If users need to be able to select multiple options, use a [Checkbox group](./checkbox.html#checkbox-group) (for a short list of options) or [MultiselectLookup](./multiselect-lookup.html) (for a long list).
*   If users need to be able to select a predefined option or enter their own custom value, use [Combobox](./combobox.html).

### About Select [​](#about-select)

Select includes the following elements.

#### Default icon (optional) [​](#default-icon-optional)

A default icon can be included alongside the default label to visually enhance the Select's purpose.

*   Use a simple icon that is easily understandable to users.
*   Include an icon when the menu items also contain icons.

#### Label [​](#label)

The Select will display the label of its selected item. If nothing is selected, a default label can be displayed.

*   The default label text should clearly indicate the kinds of options that follow. [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear) & [_Trustworthy_](./../../style-guide/writing-for-copy.html#is-this-trustworthy)
    
*   Don't make the default label a part of a sentence that is completed by the options. [_Translatable_](./../../style-guide/writing-for-copy.html#is-this-translatable)
    

#### Menu [​](#menu)

When the Select is open, a [Menu with options](./menu.html) is displayed. These options can use all the features of the [MenuItem](./menu-item.html) component.

*   2–5 menu items are recommended for optimal usability.
*   When there are more items, consider setting a visible item limit to enable scrolling.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

Menu items must have a value, and can have a label that gets output in the Select component. If no label is provided (like the third menu item in this example), the value will be displayed.

Choose an option

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';
export default defineComponent( {
	name: 'BasicSelect',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{ label: 'Option A', value: 'a' },
				{ label: 'Option B', value: 'b' },
				{ value: 'c' },
				{ label: 'Option D', value: 'd', disabled: true }
			],
			selection: null
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	></cdx-select>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxSelect } = require( '@wikimedia/codex' );
module.exports = defineComponent( {
	name: 'BasicSelect',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{ label: 'Option A', value: 'a' },
				{ label: 'Option B', value: 'b' },
				{ value: 'c' },
				{ label: 'Option D', value: 'd', disabled: true }
			],
			selection: null
		};
	}
} );
</script>
```

*   Option A
*   Option B
*   c
*   Option D

### With icons [​](#with-icons)

The `defaultLabel` and `menuItems` can have icons.

Select a Wikimedia project

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:default-icon="cdxIconLogoWikimedia"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		default-label="Select a Wikimedia project"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';
import { cdxIconLogoWikimedia, cdxIconLogoWikimediaCommons, cdxIconLogoWikipedia, cdxIconLogoWiktionary } from '@wikimedia/codex-icons';

const menuItems = [
	{
		value: 'commons',
		label: 'Wikimedia Commons',
		description: 'Freely usable media files',
		icon: cdxIconLogoWikimediaCommons
	},
	{
		value: 'wikipedia',
		label: 'Wikipedia',
		description: 'The free encyclopedia',
		icon: cdxIconLogoWikipedia
	},
	{
		value: 'wiktionary',
		label: 'Wiktionary',
		description: 'The free dictionary',
		icon: cdxIconLogoWiktionary
	}
];

export default defineComponent( {
	name: 'SelectWithIcons',
	components: { CdxSelect },
	data() {
		return {
			menuItems,
			selection: null,
			menuConfig: {
				boldLabel: true,
				hideDescriptionOverflow: true
			},
			cdxIconLogoWikimedia
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:default-icon="cdxIconLogoWikimedia"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		default-label="Select a Wikimedia project"
	></cdx-select>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxSelect } = require( '@wikimedia/codex' );
const { cdxIconLogoWikimedia, cdxIconLogoWikimediaCommons, cdxIconLogoWikipedia, cdxIconLogoWiktionary } = require( './icons.json' );

const menuItems = [
	{
		value: 'commons',
		label: 'Wikimedia Commons',
		description: 'Freely usable media files',
		icon: cdxIconLogoWikimediaCommons
	},
	{
		value: 'wikipedia',
		label: 'Wikipedia',
		description: 'The free encyclopedia',
		icon: cdxIconLogoWikipedia
	},
	{
		value: 'wiktionary',
		label: 'Wiktionary',
		description: 'The free dictionary',
		icon: cdxIconLogoWiktionary
	}
];

module.exports = defineComponent( {
	name: 'SelectWithIcons',
	components: { CdxSelect },
	data() {
		return {
			menuItems,
			selection: null,
			menuConfig: {
				boldLabel: true,
				hideDescriptionOverflow: true
			},
			cdxIconLogoWikimedia
		};
	}
} );
</script>
```

*   Wikimedia CommonsFreely usable media files
*   WikipediaThe free encyclopedia
*   WiktionaryThe free dictionary

### With custom label display [​](#with-custom-label-display)

You can customize how the label of the selected item appears.

Choose an option

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	>
		<template #label="{ selectedMenuItem, defaultLabel }">
			<span v-if="selectedMenuItem">
				<span>You have selected: {{ selectedMenuItem.label }}</span>
			</span>
			<span v-else>
				{{ defaultLabel }}
			</span>
		</template>
	</cdx-select>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SelectCustomLabel',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{ label: 'Option A', value: 'a' },
				{ label: 'Option B', value: 'b' },
				{ label: 'Option C', value: 'c' },
				{ label: 'Option D', value: 'd' }
			],
			selection: null
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	>
		<template #label="{ selectedMenuItem, defaultLabel }">
			<span v-if="selectedMenuItem">
				<span>You have selected: {{ selectedMenuItem.label }}</span>
			</span>
			<span v-else>
				{{ defaultLabel }}
			</span>
		</template>
	</cdx-select>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxSelect } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SelectCustomLabel',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{ label: 'Option A', value: 'a' },
				{ label: 'Option B', value: 'b' },
				{ label: 'Option C', value: 'c' },
				{ label: 'Option D', value: 'd' }
			],
			selection: null
		};
	}
} );
</script>
```

*   Option A
*   Option B
*   Option C
*   Option D

### Developer notes

The `label` scoped slot enables you to customize the display of the label, with bindings for the `selectedMenuItem` and the `defaultLabel`.

### With menu groups [​](#with-menu-groups)

You can group `menuItems` to improve organization. Groups can be customized to add a description or an icon.

Choose an option

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SelectWithMenuGroups',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{
					label: 'Group A',
					items: [
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2', disabled: true },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' }
					]
				},
				{
					label: 'Group B',
					items: [
						{ label: 'Five', value: '5' },
						{ label: 'Six', value: '6' },
						{ label: 'Seven', value: '7' }
					]
				}
			],
			selection: null
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	></cdx-select>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxSelect } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SelectWithMenuGroups',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{
					label: 'Group A',
					items: [
						{ label: 'One', value: '1' },
						{ label: 'Two', value: '2', disabled: true },
						{ label: 'Three', value: '3' },
						{ label: 'Four', value: '4' }
					]
				},
				{
					label: 'Group B',
					items: [
						{ label: 'Five', value: '5' },
						{ label: 'Six', value: '6' },
						{ label: 'Seven', value: '7' }
					]
				}
			],
			selection: null
		};
	}
} );
</script>
```

*   Group A*   One
    *   Two
    *   Three
    *   Four
*   Group B*   Five
    *   Six
    *   Seven

### Developer notes

You can add optgroup-like groupings within the Select via the `menuItems` prop. Refer to the [MenuGroupData type](./../types-and-constants.html#menugroupdata) for more information about the configuration options for each menu group.

### Form field [​](#form-field)

A Select can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Refer to the [Field](./field.html) page for more information.

Search interface Select a search interface to use by default

Choose an option

Special:Search is better for searching text-based items like articles. Special:MediaSearch provides a better interface for searching files.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field>
		<cdx-select
			v-model:selected="selection"
			:menu-items="menuItems"
			default-label="Choose an option"
		/>
		<template #label>
			Search interface
		</template>
		<template #description>
			Select a search interface to use by default
		</template>
		<template #help-text>
			Special:Search is better for searching text-based items like articles.
			Special:MediaSearch provides a better interface for searching files.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect, CdxField } from '@wikimedia/codex';
export default defineComponent( {
	name: 'SelectField',
	components: { CdxSelect, CdxField },
	data() {
		return {
			menuItems: [
				{ label: 'Special:Search', value: 'search' },
				{ label: 'Special:MediaSearch', value: 'mediasearch' }
			],
			selection: null
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field>
		<cdx-select
			v-model:selected="selection"
			:menu-items="menuItems"
			default-label="Choose an option"
		></cdx-select>
		<template #label>
			Search interface
		</template>
		<template #description>
			Select a search interface to use by default
		</template>
		<template #help-text>
			Special:Search is better for searching text-based items like articles.
			Special:MediaSearch provides a better interface for searching files.
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxSelect, CdxField } = require( '@wikimedia/codex' );
module.exports = defineComponent( {
	name: 'SelectField',
	components: { CdxSelect, CdxField },
	data() {
		return {
			menuItems: [
				{ label: 'Special:Search', value: 'search' },
				{ label: 'Special:MediaSearch', value: 'mediasearch' }
			],
			selection: null
		};
	}
} );
</script>
```

*   Special:Search
*   Special:MediaSearch

### Other features [​](#other-features)

The Select component has an internal Menu. You can use the following features from Menu in the Select component:

*   [Custom menu item display](./menu.html#menu-item-display)
*   [Limited height with scrolling](./menu.html#with-scrolling-enabled)
*   [Menu groups](./menu.html#menu-groups) (demonstrated above)
*   [MenuItem features](./menu-item.html)

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Menu items are provided as an array of MenuItemData types, and `v-model` is used to bind the current selection's value.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `menuItems`(required) | Menu items and/or menu group definitions.  <br>  <br>Menu groups and individual menu items will be output in the order they appear here. | `([MenuItemData](../types-and-constants.html#menuitemdata)\|[MenuGroupData](../types-and-constants.html#menugroupdata))[]` |     |
| `selected`(required) | Value of the current selection.  <br>  <br>Must be bound with `v-model:selected`.  <br>  <br>The property should be initialized to `null` rather than using a falsy value. | `string\|number\|null` |     |
| `defaultLabel` | Label to display when no selection has been made. | `string` | `''` |
| `name` | Name of the input, used for forms. | `string` | `undefined` |
| `disabled` | Whether the dropdown is disabled. | `boolean` | `false` |
| `menuConfig` | Configuration for various menu features. All properties default to false.  <br>  <br>See the MenuConfig type. | `[MenuConfig](../types-and-constants.html#menuconfig)` | `{}` |
| `defaultIcon` | An icon at the start of the select element displayed when no selection has been made. | `[Icon](../types-and-constants.html#icon)\|undefined` | `undefined` |
| `status` | `status` attribute of the input. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `load-more` |     | When the user scrolls towards the bottom of the menu.  <br>  <br>If it is possible to add or load more menu items, then now would be a good moment so that the user can experience infinite scrolling. |
| `update:selected` | **modelValue** `string\|number\|null` - The new model value | When the selection value changes. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| label | Display of the current selection or default label | **selected-menu-item** `MenuItemData, undefined` - The currently selected menu  <br>**default-label** `string` - The default label, provided via a prop |
| menu-item | Display of an individual item in the menu | **menu-item** `MenuItemData` - The current menu item |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The CSS-only version of this component uses the native `<select>` element. This element will be styled to match the Vue version, but the menu will use native browser styles.

Choose an optionOption AOption BOption COption DOption EOption F

Show codeCopy code

html

```
<!-- The CSS-only version uses the `<select>` element. -->
<select class="cdx-select">
  <!-- Use <option> and <optgroup> elements as needed. -->
  <option value="">Choose an option</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
  <option value="c">Option C</option>
  <!-- You can disable options by applying the `disabled` attribute. -->
  <option value="d" disabled>Option D</option>
  <optgroup label="Other options">
    <option value="e">Option E</option>
    <option value="f">Option F</option>
  </optgroup>
</select>
```

#### Disabled [​](#disabled)

Add the `disabled` attribute to the `<select>` element to get a disabled element with appropriate styles.

Choose an optionOption AOption BOption COption D

Show codeCopy code

html

```
<select class="cdx-select" disabled>
  <option value="">Choose an option</option>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
  <option value="c">Option C</option>
  <option value="d" disabled>Option D</option>
</select>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Down arrow | When the focus is placed on the input, it opens the menu. When the menu is open, it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| Up arrow | When the focus is placed on the input, it opens the menu. When the menu is open, it navigates through menu options. |
| Enter | It expands and collapses the menu when the focus is placed on the Select. If the focus is placed in any of the options within the menu, the focused option is selected. |
| Esc | This key closes the menu when it is open. |
| Home | Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| End | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |

Pager

[Previous pageRadio](/codex/latest/components/demos/radio.html)

[Next pageTextArea](/codex/latest/components/demos/text-area.html)