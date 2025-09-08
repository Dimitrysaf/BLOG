# MenuButton
The MenuButton component is a [ToggleButton](https://doc.wikimedia.org/codex/latest/components/demos/toggle-button.html) that, when toggled on, displays a [Menu](https://doc.wikimedia.org/codex/latest/components/demos/menu.html) with actions.

|Name|Value|
|---|---|
|Props||
|`disabled`|`disabled`|
|Slots||
|`default`|`More options`|
|View||
|Reading direction|LTR, RTL|

## Overview
### When to use MenuButton
Use the MenuButton component when the space is limited and you need to provide users with a set of related actions or options within a single button.

Avoid using MenuButton when there are only one or two actions to display. In that case, consider using separate buttons instead. Additionally, do not use MenuButton if the actions are essential and require immediate visibility without additional interaction.

The items within the Menu are meant to be actions. For a menu of selectable options, use [Select](https://doc.wikimedia.org/codex/latest/components/demos/select.html).

### About MenuButton
MenuButton includes the following elements.

### ToggleButton
A single button to display the Menu. It can include an icon, a text label, or both.

### Menu
A list of related actions. The Menu can be placed in a variety of positions relative to the button.

✅Make MenuItems more easily recognizable by including clear and relevant icons.
Don't use thumbnails within MenuItems, as they could make the Menu excessively large.<br>
⚠️MenuItems can represent two types of actions:

1. **Standard actions**
Neutral actions such as "Edit" or "Share".
2. **Destructive actions**
Actions with potentially negative or irreversible impact, such as "Delete".

### Examples
#### Basic usage
The ToggleButton that displays the Menu can be customized with text, an Icon, or both.

```vue
<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
	>
		More options
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';

const menuItems = [
	{ label: 'Edit', value: 'edit' },
	{ label: 'Download', value: 'download' },
	{ label: 'Print', value: 'print', disabled: true },
	{ label: 'Share', value: 'share' },
	{ label: 'Delete', value: 'delete', action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonBasic',
	components: { CdxMenuButton },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems
		};
	}
} );
</script>
```
**Developer notes**
MenuButton has two required props: `selected` and `menuItems`. The `selected` prop needs to be bound with `v-model`.

### Icon-only
To add an icon, insert the Icon component in the slot content. Refer to the Icon component and the overview of icons to learn more about using icons.

✅ When using an icon-only ToggleButton, add an `aria-label` to provide a label to users of assistive technology.

```vue
<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Help options"
	>
		<cdx-icon :icon="cdxIconHelp" />
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHelp } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Keyboard shortcuts', value: 'keyboard' },
	{ label: 'Leave feedback', value: 'feedback' },
	{ label: 'Read the user guide', value: 'read' }
];

export default defineComponent( {
	name: 'MenuButtonWithIconOnly',
	components: { CdxMenuButton, CdxIcon },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems,
			cdxIconHelp
		};
	}
} );
</script>
```

### MenuItems with icons
Refer to the [MenuItem](https://doc.wikimedia.org/codex/latest/components/demos/menu-item.html) component to learn about all features available for `menuItems`.

```vue
<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Change input type"
	>
		<cdx-icon :icon="cdxIconEllipsis" />
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis, cdxIconFunction, cdxIconLiteral, cdxIconInstance } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Function call', value: 'function call', icon: cdxIconFunction },
	{ label: 'Literal String', value: 'literal string', icon: cdxIconLiteral },
	{ label: 'Reference', value: 'reference', icon: cdxIconInstance }
];

export default defineComponent( {
	name: 'MenuButtonAndMenuItemsWithIcons',
	components: { CdxMenuButton, CdxIcon },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems,
			cdxIconEllipsis
		};
	}
} );
</script>
```
### Triggering actions
When the user selects a MenuItem, it can trigger an immediate action instead of (or in addition to) storing their choice as a persistent selection.

✅If an action is destructive, label it as such to inform users of its consequences.<br>
⚠️Don't include more than one destructive action within the menu.<br>
In this example, selecting a MenuItem causes a message to temporarily display.

```vue
<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Choose an option"
		@update:selected="onSelect"
	>
		<cdx-icon :icon="cdxIconEllipsis" />
	</cdx-menu-button>
	<cdx-message
		v-if="isMessageVisible"
		type="notice"
		:auto-dismiss="true"
		:display-time="3000"
		:fade-in="true"
	>
		{{ messageContent }}
	</cdx-message>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxMessage, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

const isMessageVisible = ref( false );
const messageContent = ref( '' );
const menuItems = [
	{ label: 'Edit Configuration', value: 'edit configuration' },
	{ label: 'View Phab Ticket', value: 'view phab ticket' },
	{ label: 'Contact Owner', value: 'contact owner' },
	{ label: 'Turn Instrument Off', value: 'turn instrument off' },
	{ label: 'Delete Instrument', value: 'delete instrument', action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonSelection',
	components: { CdxMenuButton, CdxMessage, CdxIcon },
	setup() {
		const selection = ref( null );

		function onSelect( newSelection ) {
			// Trigger a temporary message that shows the current selection.
			messageContent.value = `You chose ${ newSelection }.`;
			isMessageVisible.value = true;

			setTimeout( () => {
				// Auto-dismiss the message.
				isMessageVisible.value = false;
			}, 3000 );

			selection.value = null;
		}

		return {
			selection,
			menuItems,
			isMessageVisible,
			messageContent,
			onSelect,
			cdxIconEllipsis
		};
	}
} );
</script>
```
**Developer notes**
In this example, the component listens for `@update:selected` events from the MenuButton component, handles the selection change with the `onSelect` method, displays a temporary message using the [Message](https://doc.wikimedia.org/codex/latest/components/demos/message.html) component, and resets the selection after a few seconds.

### Other features
The MenuButton component has an internal ToggleButton and Menu. You can use the following features from those components in the MenuButton component:

* [Custom menu item display](https://doc.wikimedia.org/codex/latest/components/demos/menu.html#menu-item-display)
* [Limited height with scrolling](https://doc.wikimedia.org/codex/latest/components/demos/menu.html#with-scrolling-enabled)
* [Menu groups](https://doc.wikimedia.org/codex/latest/components/demos/menu.html#menu-groups)
* [MenuItem features](https://doc.wikimedia.org/codex/latest/components/demos/menu-item.html)

## Technical implementation
### Vue usage
#### Props
|Prop name|Description|Type|Default|
|---|---|---|---|
|`selected`(required)|Value of the current selection.<br>This prop should be initialized to `null` (for single-select) or an empty array (for multi-select) rather than using a falsy value.<br>Must be bound with `v-model:selected`.|`MenuItemValue|MenuItemValue[]|null`||
|`menuItems`(required)|Menu items and/or menu group definitions. Menu groups and individual menu items will be output in the order they appear here.|`(MenuButtonItemData|MenuGroupData)[]`||
|`menuConfig`|Configuration for various menu features. All properties default to false.<br>See the MenuConfig type.|`MenuConfig`|`{}`|
|`disabled`|Whether the dropdown is disabled.|`boolean`|`false`|
|`footer`|Interactive footer item.<br>This is a special menu item which is pinned to the bottom of the menu. When scrolling is enabled within the menu, the footer item will always be visible at the bottom of the menu. When scrolling is not enabled, the footer item will simply appear as the last menu item.<br>The footer item is selectable, like other menu items.|`MenuItemData`|`null`|

#### Events
|Event name|Properties|Description|
|---|---|---|
|`update:selected`|**selected** string|number - The new selected value|When the selected value changes.|

#### Slots
|Name|Description|Bindings|
|---|---|---|
|default|MenuButton content||
|menu-item|Display of an individual item in the menu|menu-item `MenuItemData` - The current menu item|

#### Keyboard navigation
|Key|Function|
|---|---|
|`Enter`|If the focus is placed on the button, it opens and closes the menu. If the focus is placed in any of the options within the displayed menu, it activates that option.|
|`Space`|If the focus is placed on the button, it opens and closes the menu.|
|`Down arrow` / `Up arrow`|If the menu is displayed, it navigates through menu options.|
|`Esc`|It closes the menu when it is open.|
|`Home`|Optionally, it moves the focus to the first option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options.|
|`End`|Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options.|