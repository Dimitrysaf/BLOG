# Combobox [​](#combobox)

A Combobox is a text input with a dropdown menu of selectable options.

Show codeCopy code

Reset demo

```markup
<cdx-combobox />
```

| Name | Value |
| --- | --- |
| Props |     |
| status | default<br><br>error |
| disabled |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

*   a
*   b
*   c

## Overview [​](#overview)

### When to use Combobox [​](#when-to-use-combobox)

Use the Combobox component when it's difficult to predict the user's response to a prompt. It provides predefined input values as options, for example common responses, to make it easier to complete the field.

If users can only select a predefined option, use [Select](./select.html) (for a short list of options) or [Lookup](./lookup.html) (for a longer, searchable list).

### About Combobox [​](#about-combobox)

Combobox allows users to either input text or select a value from a menu of options to complete a form field. Combobox includes the following elements.

#### Start icon (optional) [​](#start-icon-optional)

A start icon can be included to visually enhance the Combobox's purpose.

*   Use a simple icon that is easily understandable to users.

#### Input [​](#input)

The user can type text into the [TextInput](./text-input.html). If they select an item from the menu, it will appear in the TextInput.

##### Placeholder text (optional) [​](#placeholder-text-optional)

Placeholder text provides an example of what type of information is being requested in the input.

*   Placeholder text should further illustrate and support the Combobox's label.
*   Placeholder text should never replace the label nor be the input's only description.

#### Menu [​](#menu)

When the Combobox is expanded, a [Menu](./menu.html) of options is displayed. These options can use all the features of the [MenuItem](./menu-item.html) component.

*   2–5 menu items are recommended for optimal usability.
*   When there are more items, consider setting a visible item limit to enable scrolling.

## Examples [​](#examples)

### Basic Usage [​](#basic-usage)

The Combobox component combines a menu of selectable items with a text box that can accept arbitrary input from the user.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';

const menuItems = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

export default defineComponent( {
	name: 'ComboBoxBasic',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
	></cdx-combobox>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCombobox } = require( '@wikimedia/codex' );

const menuItems = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

module.exports = defineComponent( {
	name: 'ComboBoxBasic',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
```

*   a
*   b
*   c

### Developer notes

The component should receive a `v-model:selected` binding from its parent as well as an array of `menuItems` (which can be empty).

### With configurable scroll [​](#with-configurable-scroll)

By default, all menu items are displayed when the menu is expanded. You can configure a `visibleItemLimit` to limit the height of the menu and enable scrolling.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';

const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4' },
	{ label: 'Five', value: '5' },
	{ label: 'Six', value: '6' },
	{ label: 'Seven', value: '7' },
	{ label: 'Eight', value: '8' },
	{ label: 'Nine', value: '9' },
	{ label: 'Ten', value: '10' },
	{ label: 'Eleven', value: '11' },
	{ label: 'Twelve', value: '12' }
];

export default defineComponent( {
	name: 'ComboboxWithScroll',
	components: { CdxCombobox },

	data() {
		return {
			menuConfig: {
				visibleItemLimit: 6
			},
			menuItems,
			selection: ''
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
	></cdx-combobox>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCombobox } = require( '@wikimedia/codex' );

const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4' },
	{ label: 'Five', value: '5' },
	{ label: 'Six', value: '6' },
	{ label: 'Seven', value: '7' },
	{ label: 'Eight', value: '8' },
	{ label: 'Nine', value: '9' },
	{ label: 'Ten', value: '10' },
	{ label: 'Eleven', value: '11' },
	{ label: 'Twelve', value: '12' }
];

module.exports = defineComponent( {
	name: 'ComboboxWithScroll',
	components: { CdxCombobox },

	data() {
		return {
			menuConfig: {
				visibleItemLimit: 6
			},
			menuItems,
			selection: ''
		};
	}
} );
</script>
```

*   One
*   Two
*   Three
*   Four
*   Five
*   Six
*   Seven
*   Eight
*   Nine
*   Ten
*   Eleven
*   Twelve

### Developer notes

To limit the height of the menu and enable scrolling, use the `visibleItemLimit` property of the `menuConfig` prop.

### With filtering [​](#with-filtering)

When there are many options, you can filter items depending on the current input.

*   Include a "no results" message when no matching items are found.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		class="cdx-demo-combobox-with-filtering"
		aria-label="Favorite vegetable"
		placeholder="Enter a vegetable"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-combobox>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'ComboboxWithFiltering',
	components: { CdxCombobox },
	setup() {
		const selection = ref( '' );
		const menuItems = ref( vegetableItems );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * Filter items on input.
		 *
		 * @param {InputEvent} event
		 */
		function onInput( event ) {
			if ( event.target ) {
				// If there's a value in the input, set menu items to matching items.
				menuItems.value = vegetableItems.filter( ( item ) => item.value.includes(
					event.target.value
				) );
			} else {
				// Otherwise, reset menu items to include all items.
				menuItems.value = vegetableItems;
			}
		}

		return {
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-combobox-with-filtering {
	min-width: @size-2800;
}
</style>
```

vue

```
<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		class="cdx-demo-combobox-with-filtering"
		aria-label="Favorite vegetable"
		placeholder="Enter a vegetable"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-combobox>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxCombobox } = require( '@wikimedia/codex' );
const vegetableItems = require( './data.json' );

module.exports = defineComponent( {
	name: 'ComboboxWithFiltering',
	components: { CdxCombobox },
	setup() {
		const selection = ref( '' );
		const menuItems = ref( vegetableItems );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * Filter items on input.
		 *
		 * @param {InputEvent} event
		 */
		function onInput( event ) {
			if ( event.target ) {
				// If there's a value in the input, set menu items to matching items.
				menuItems.value = vegetableItems.filter( ( item ) => item.value.includes(
					event.target.value
				) );
			} else {
				// Otherwise, reset menu items to include all items.
				menuItems.value = vegetableItems;
			}
		}

		return {
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-combobox-with-filtering {
	min-width: @size-2800;
}
</style>
```

*   potatoroot vegetable
*   carrotroot vegetable, usually orange in color
*   zucchiniEdible summer squash, typically green in colour
*   eggplantplant species Solanum melongena
*   broccoliedible green plant in the cabbage family
*   cauliflowervegetable, for the plant see Q7537 (Brassica oleracea var. botrytis)
*   brussels sproutsvegetable
*   cassava rootroot vegetable
*   plantainbanana-like vegetable, less sweet
*   cabbageVegetable, the generic term for several varieties.
*   napa cabbagea type of Chinese cabbage

### Developer notes

Add a "no results" message via the `no-results` slot. If populated, this slot will automatically display when there are zero menu items.

### Form field [​](#form-field)

A Combobox can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Refer to the [Field](./field.html) page for more information.

Input type What kind of data does the function accept?

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-field>
		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
			placeholder="Type or select an input type"
		/>
		<template #label>
			Input type
		</template>
		<template #description>
			What kind of data does the function accept?
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCombobox, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ComboboxField',
	components: { CdxCombobox, CdxField },
	setup() {
		const selection = ref( '' );
		const menuItems = [
			{ value: 'boolean' },
			{ value: 'function' },
			{ value: 'object' },
			{ value: 'string' }
		];

		return {
			selection,
			menuItems
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-field>
		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
			placeholder="Type or select an input type"
		></cdx-combobox>
		<template #label>
			Input type
		</template>
		<template #description>
			What kind of data does the function accept?
		</template>
	</cdx-field>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxCombobox, CdxField } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'ComboboxField',
	components: { CdxCombobox, CdxField },
	setup() {
		const selection = ref( '' );
		const menuItems = [
			{ value: 'boolean' },
			{ value: 'function' },
			{ value: 'object' },
			{ value: 'string' }
		];

		return {
			selection,
			menuItems
		};
	}
} );
</script>
```

*   boolean
*   function
*   object
*   string

### Other features [​](#other-features)

The Combobox component has an internal TextInput and Menu. You can use the following features from those components in the Combobox component:

*   [Start and end icons](./text-input.html#with-icons)
*   [Clearable](./text-input.html#clearable)
*   [Custom menu item display](./menu.html#menu-item-display)
*   [Limited height with scrolling](./menu.html#with-scrolling-enabled)
*   [Menu groups](./menu.html#menu-groups)
*   [MenuItem features](./menu-item.html)

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

TextInput props apply

This component contains a TextInput component. You can bind [TextInput props](./text-input.html#props) to this component and they will be passed to the TextInput within.

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `menuItems`(required) | Menu items and/or menu group definitions.  <br>  <br>Menu groups and individual menu items will be output in the order they appear here. | `([MenuItemData](../types-and-constants.html#menuitemdata)\|[MenuGroupData](../types-and-constants.html#menugroupdata))[]` |     |
| `selected`(required) | Value of the current selection.  <br>  <br>Must be bound with `v-model:selected`. | `string\|number` |     |
| `disabled` | Whether the dropdown is disabled. | `boolean` | `false` |
| `menuConfig` | Configuration for various menu features. All properties default to false.  <br>  <br>See the MenuConfig type. | `[MenuConfig](../types-and-constants.html#menuconfig)` | `{}` |
| `status` | `status` property of the TextInput component | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `input` | **event** `InputEvent` | When the input value changes via direct use of the input |
| `change` | **event** `Event` | When an input value change is committed by the user (e.g. on blur) |
| `load-more` |     | When the user scrolls towards the bottom of the menu.  <br>  <br>If it is possible to add or load more menu items, then now would be a good moment so that the user can experience infinite scrolling. |
| `update:selected` | **selected** `string\|number` - The new selected value | When the selected value changes. |
| `focus` | **event** `FocusEvent` | When the input comes into focus |
| `blur` | **event** `FocusEvent` | When the input loses focus |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| menu-item | Display of an individual item in the menu | **menu-item** `MenuItemData` - The current menu item |
| no-results | Message to show if there are no menu items to display. |     |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It places the focus within the input of the Combobox and opens its menu. It also moves the focus to the next interactive element in tab order. |
| Shift + Tab | When the focus is placed within the Combobox input, it moves the focus to the previous interactive element. |
| Down arrow | When the Combobox is focused, it opens the menu. When the menu is open, it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| Up arrow | When the Combobox is focused, it opens the menu. When the menu is open, it navigates through menu options. |
| Enter | It opens the menu when the focus is placed on the Combobox. If the menu is open, it closes the menu. If the focus is placed in any of the options within the menu, the focused option is selected. |
| Esc | When the menu it’s open, it closes the menu. |
| Home | Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| End | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |

Pager

[Previous pageChipInput](/codex/latest/components/demos/chip-input.html)

[Next pageField](/codex/latest/components/demos/field.html)