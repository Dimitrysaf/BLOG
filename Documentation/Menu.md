# Menu [​](#menu)

A Menu displays a list of available options, suggestions, or actions. It expands from a control (e.g. a button, selector or input) after it is activated by a user.

Reset demo

| Name | Value |
| --- | --- |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

*   One
*   Two
*   Three
*   Four

## Overview [​](#overview)

### When to use Menu [​](#when-to-use-menu)

The Menu component is intended to be used within other components such as [Select](./select.html), [Lookup](./lookup.html), or [MenuButton](./menu-button.html). The Menu is displayed when the user interacts with the corresponding trigger element.

### About Menu [​](#about-menu)

Menu includes the following elements.

#### Menu items [​](#menu-items)

One or more menu items will appear within the Menu. Menu items can include selectable options or trigger actions and can be customized with different text or media elements. Refer to [MenuItem](./menu-item.html) to learn more about available display options.

*   Set a visible item limit when there are many menu items to enable scrolling.
*   When choosing a visible item limit, consider the layout, item types, and the number of items useful to view at once, depending on the triggering component.
*   Generally, 5–7 visible items are recommended. Refer to [The Magical Number Seven, Plus or Minus Two](https://en.wikipedia.org/wiki/The_Magical_Number_Seven%2C_Plus_or_Minus_Two).
    
*   Don't combine menu items that use both Icons and Thumbnails within the same Menu.
*   Organize menu items logically or alphabetically. [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear) & [_Translatable_](./../../style-guide/writing-for-copy.html#is-this-translatable)
    

#### Footer (optional) [​](#footer-optional)

An optional interactive footer can appear at the end of the menu items to display extra information or provide access to further results. This footer can optionally include a start icon.

When scrolling is enabled, the footer is "sticky" to the end of the Menu so it is always visible.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

This example has a TextInput as the trigger element. The `menuItems` use the default display, where each item's `label` is displayed if one exists, otherwise its `value` is shown.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenu',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' },
			{ label: 'Four', value: '4' }
		];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		></cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenu',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' },
			{ label: 'Four', value: '4' }
		];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   One
*   Two
*   Three
*   Four

### Menu item display [​](#menu-item-display)

You can customize the content of `menuItems`. In this example, the content is customized to show both the item's `label` and `value`.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-custom-item-display">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-custom-item-display__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		>
			<template #default="{ menuItem }">
				{{ menuItem.label }} (value: {{ menuItem.value }})
			</template>
		</cdx-menu>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuCustomItemDisplay',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: 1 },
			{ label: 'Two', value: 2, disabled: true },
			{ label: 'Three', value: 3 },
			{ label: 'Four', value: 4 }
		];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-custom-item-display {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-custom-item-display">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-custom-item-display__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		>
			<template #default="{ menuItem }">
				{{ menuItem.label }} (value: {{ menuItem.value }})
			</template>
		</cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuCustomItemDisplay',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: 1 },
			{ label: 'Two', value: 2, disabled: true },
			{ label: 'Three', value: 3 },
			{ label: 'Four', value: 4 }
		];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-custom-item-display {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   One (value: 1)
*   Two (value: 2)
*   Three (value: 3)
*   Four (value: 4)

### Developer notes

Use the default slot, which has a binding for `menuItem` data, to customize the output of each MenuItem. Note that doing so overrides all markup inside the MenuItem component, so you may need to recreate interactive styles (like the colors used for the selected `menuItem`).

### Menu footer [​](#menu-footer)

You can add an interactive `footer` to the end of the Menu. When scrolling is enabled, the `footer` item is pinned to the bottom of the Menu.

Refer to the [TypeaheadSearch](./typeahead-search.html) demos for a real-world example.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-footer">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-footer__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:footer="footer"
		>
			<template #default="{ menuItem }">
				<!-- Custom template just for the footer item. -->
				<template v-if="menuItem.value === 'menu-footer'">
					Footer item with value: {{ menuItem.value }}
				</template>
			</template>
		</cdx-menu>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuFooter',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: 1 },
			{ label: 'Two', value: 2, disabled: true },
			{ label: 'Three', value: 3 },
			{ label: 'Four', value: 4 }
		];

		const footer = {
			value: 'menu-footer'
		};

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			footer,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-footer {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-footer">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-footer__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:footer="footer"
		>
			<template #default="{ menuItem }">
				<!-- Custom template just for the footer item. -->
				<template v-if="menuItem.value === 'menu-footer'">
					Footer item with value: {{ menuItem.value }}
				</template>
			</template>
		</cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuFooter',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: 1 },
			{ label: 'Two', value: 2, disabled: true },
			{ label: 'Three', value: 3 },
			{ label: 'Four', value: 4 }
		];

		const footer = {
			value: 'menu-footer'
		};

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			footer,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-footer {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   One
*   Two
*   Three
*   Four
*   Footer item with value: menu-footer

### Developer notes

Use the `footer` prop to add a special menu item that will appear at the end of the Menu. The footer item can be customized via the `default` slot, just like regular `menuItems`.

### With scrolling enabled [​](#with-scrolling-enabled)

All `menuItems` will be shown by default and the height of the Menu will grow to accommodate the items. To limit the number of `menuItems` shown at once and enable scrolling within the Menu, set a `visibleItemLimit`.

This example includes a `footer` item, which is "sticky" to the bottom of the Menu.

Number of visible items in Menu (empty or 0 for show all):

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-scroll">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-scroll__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:footer="footer"
			:visible-item-limit="itemLimit ? parseInt( `${itemLimit}` ) : null"
		/>
		<div class="cdx-docs-input-with-menu-scroll__items">
			<label for="cdx-docs-input-with-menu-scroll__items-input">
				Number of visible items in Menu (empty or 0 for show all):
			</label>
			<!-- TODO: replace with NumberInput once it exists. -->
			<cdx-text-input
				id="cdx-docs-input-with-menu-scroll__items-input"
				v-model="itemLimit"
				class="cdx-docs-input-with-menu-scroll__items__input"
				type="number"
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuScroll',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
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
		const itemLimit = ref( '6' );

		const footer = {
			value: 'menu-footer',
			label: 'Sticky footer item'
		};

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			footer,
			itemLimit,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-scroll {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;

	&__items {
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-top: @spacing-100;

		&__input {
			margin-left: @spacing-50;

			input {
				min-width: @size-250;
				width: @size-250;
			}
		}
	}
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-scroll">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-scroll__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:footer="footer"
			:visible-item-limit="itemLimit ? parseInt( `${itemLimit}` ) : null"
		></cdx-menu>
		<div class="cdx-docs-input-with-menu-scroll__items">
			<label for="cdx-docs-input-with-menu-scroll__items-input">
				Number of visible items in Menu (empty or 0 for show all):
			</label>
			<!-- TODO: replace with NumberInput once it exists. -->
			<cdx-text-input
				id="cdx-docs-input-with-menu-scroll__items-input"
				v-model="itemLimit"
				class="cdx-docs-input-with-menu-scroll__items__input"
				type="number"
			></cdx-text-input>
		</div>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuScroll',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
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
		const itemLimit = ref( '6' );

		const footer = {
			value: 'menu-footer',
			label: 'Sticky footer item'
		};

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			footer,
			itemLimit,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-scroll {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;

	&__items {
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-top: @spacing-100;

		&__input {
			margin-left: @spacing-50;

			input {
				min-width: @size-250;
				width: @size-250;
			}
		}
	}
}
</style>
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
*   Sticky footer item

### Developer notes

Set the `visibleItemLimit` prop to the number of `menuItems` that should be visible at a time.

### No results message [​](#no-results-message)

For Menus where results are fetched and may vary, a "no results" message can be added. It can then be displayed under certain circumstances, such as when the user has entered text in a [Lookup](./lookup.html) but there are no matching `menuItems` to show.

In this simplified example, the "no results" message displays when you focus on the input.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-no-results">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-no-results__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		>
			<template #no-results>
				No results found
			</template>
		</cdx-menu>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuNoResults',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			menuId,
			menuItems,
			activeDescendant,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-no-results {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-no-results">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-no-results__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		>
			<template #no-results>
				No results found
			</template>
		</cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuNoResults',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			menuId,
			menuItems,
			activeDescendant,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-no-results {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   No results found

### Developer notes

If the `no-results` slot is populated, the Menu component will automatically display it when there are zero menu items. Further customization of this behavior should happen in the component using Menu.

### Menu groups [​](#menu-groups)

Menu items can be grouped together to make it easier to scan the contents of the Menu. Menu groups can have a title, a description, and icon.

*   Keep menu group titles concise.
*   Avoid mixing menu groups with individual menu items.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-groups">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuGroups',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menuItems = [
			{
				label: 'Group A',
				items: [
					{ label: 'One', value: '1' },
					{ label: 'Two', value: '2', disabled: true },
					{ label: 'Three', value: '3' }
				]
			},
			{
				label: 'Group B',
				items: [
					{ label: 'Four', value: '4' },
					{ label: 'Five', value: '5' },
					{ label: 'Six', value: '6' },
					{ label: 'Seven', value: '7' }
				]
			}
		];

		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-groups {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-groups">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		></cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuGroups',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menuItems = [
			{
				label: 'Group A',
				items: [
					{ label: 'One', value: '1' },
					{ label: 'Two', value: '2', disabled: true },
					{ label: 'Three', value: '3' }
				]
			},
			{
				label: 'Group B',
				items: [
					{ label: 'Four', value: '4' },
					{ label: 'Five', value: '5' },
					{ label: 'Six', value: '6' },
					{ label: 'Seven', value: '7' }
				]
			}
		];

		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-groups {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   Group A*   One
    *   Two
    *   Three
*   Group B*   Four
    *   Five
    *   Six
    *   Seven

### Developer notes

You can group menu items together by adding menu group definitions via the `menuItems` prop. Refer to the [MenuGroupData type](./../types-and-constants.html#menugroupdata) to learn about other menu group features.

A menu group should always have a title, but the title can be visually-hidden if it's obvious from context what the group represents. In such cases, dividers will separate the groups of menu items.

*   Avoid mixing menu groups with visible titles and menu groups with visually-hidden titles.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-groups">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuGroupsDividers',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menuItems = [
			{
				label: 'Group A',
				hideLabel: true,
				items: [
					{ label: 'One', value: '1' },
					{ label: 'Two', value: '2', disabled: true },
					{ label: 'Three', value: '3' }
				]
			},
			{
				label: 'Group B',
				hideLabel: true,
				items: [
					{ label: 'Four', value: '4' },
					{ label: 'Five', value: '5' },
					{ label: 'Six', value: '6' },
					{ label: 'Seven', value: '7' }
				]
			}
		];

		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-groups {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-groups">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		></cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuGroupsDividers',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menuItems = [
			{
				label: 'Group A',
				hideLabel: true,
				items: [
					{ label: 'One', value: '1' },
					{ label: 'Two', value: '2', disabled: true },
					{ label: 'Three', value: '3' }
				]
			},
			{
				label: 'Group B',
				hideLabel: true,
				items: [
					{ label: 'Four', value: '4' },
					{ label: 'Five', value: '5' },
					{ label: 'Six', value: '6' },
					{ label: 'Seven', value: '7' }
				]
			}
		];

		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-groups {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   Group A*   One
    *   Two
    *   Three
*   Group B*   Four
    *   Five
    *   Six
    *   Seven

### Pending state [​](#pending-state)

You can display an inline [ProgressBar](./progress-bar.html#inline) and a "pending" message when the Menu is in a pending state, such as when `menuItems` are being fetched. In the simplified example below, the pending state always displays when you focus on the input.

See [TypeaheadSearch](./typeahead-search.html#pending-state) for a real-world implementation of this.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-pending">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-pending__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="expanded = true"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="[]"
			:show-pending="true"
		>
			<template #pending>
				Loading results...
			</template>
		</cdx-menu>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuPending',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-pending {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-pending">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-pending__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="expanded = true"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="[]"
			:show-pending="true"
		>
			<template #pending>
				Loading results...
			</template>
		</cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuPending',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-pending {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   Loading results...

### Developer notes

Set the `pending` prop to `true` to show the inline ProgressBar and "pending" message, which can be populated via the `pending` slot.

When there are `menuItems` to show, only the inline ProgressBar will display.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-input-with-menu-pending-with-items">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-pending-with-items__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="expanded = true"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:show-pending="true"
		>
			<template #pending>
				Loading results...
			</template>
		</cdx-menu>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuPendingWithItems',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' },
			{ label: 'Four', value: '4' }
		];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-pending-with-items {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-input-with-menu-pending-with-items">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-pending-with-items__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="expanded = true"
			@blur="expanded = false"
			@keydown="onKeydown"
		></cdx-text-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:show-pending="true"
		>
			<template #pending>
				Loading results...
			</template>
		</cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxTextInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'InputWithMenuPendingWithItems',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();
		const menuItems = [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' },
			{ label: 'Four', value: '4' }
		];

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-input-with-menu-pending-with-items {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   One
*   Two
*   Three
*   Four

### Multiselect [​](#multiselect)

All of the examples above show Menus that allow a single selection at a time. The Menu component also supports multiple selections, or multiselect.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-multiselect-menu">
		<cdx-chip-input
			ref="chipInput"
			v-model:input-chips="chips"
			class="cdx-docs-multiselect-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			remove-button-label="Remove"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
			@update:input-chips="handleChipChange"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			@update:selected="handleSelection"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxChipInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiselectMenu',
	components: {
		CdxChipInput,
		CdxMenu
	},
	setup() {
		const chipInput = ref();
		const menu = ref();
		useFloatingMenu( chipInput, menu );

		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		const menuItems = [
			{ value: 'red' },
			{ value: 'orange' },
			{ value: 'yellow' },
			{ value: 'green' },
			{ value: 'blue' },
			{ value: 'indigo' },
			{ value: 'violet' }
		];

		const chips = ref( [] );
		const selectedValue = ref( [] );

		function handleChipChange( newChips ) {
			selectedValue.value = newChips.map( ( chip ) => chip.value );
		}

		function handleSelection( newSelected ) {
			chips.value = newSelected.map( ( value ) => ( { value } ) );
		}

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			chipInput,
			menu,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			chips,
			selectedValue,
			handleChipChange,
			handleSelection,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-multiselect-menu {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-multiselect-menu">
		<cdx-chip-input
			ref="chipInput"
			v-model:input-chips="chips"
			class="cdx-docs-multiselect-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			remove-button-label="Remove"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
			@update:input-chips="handleChipChange"
		></cdx-chip-input>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			@update:selected="handleSelection"
		></cdx-menu>
	</div>
</template>

<script>
const { defineComponent, ref, computed, useId } = require( 'vue' );
const { CdxMenu, CdxChipInput, useFloatingMenu } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'MultiselectMenu',
	components: {
		CdxChipInput,
		CdxMenu
	},
	setup() {
		const chipInput = ref();
		const menu = ref();
		useFloatingMenu( chipInput, menu );

		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		const menuItems = [
			{ value: 'red' },
			{ value: 'orange' },
			{ value: 'yellow' },
			{ value: 'green' },
			{ value: 'blue' },
			{ value: 'indigo' },
			{ value: 'violet' }
		];

		const chips = ref( [] );
		const selectedValue = ref( [] );

		function handleChipChange( newChips ) {
			selectedValue.value = newChips.map( ( chip ) => chip.value );
		}

		function handleSelection( newSelected ) {
			chips.value = newSelected.map( ( value ) => ( { value } ) );
		}

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			chipInput,
			menu,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			chips,
			selectedValue,
			handleChipChange,
			handleSelection,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-multiselect-menu {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
```

*   red
*   orange
*   yellow
*   green
*   blue
*   indigo
*   violet

### Developer notes

To enable multiple selections, set the `selected` prop to an array: an empty array when there are no selections, and an array of the selected menu items' values when there are selections.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

WARNING

This is not a standalone component. It's intended for use inside other components, mainly within Codex. For example, the [Select](./select.html), [Lookup](./lookup.html) and [MenuButton](./menu-button.html) components use this component internally.

Designed for use in components, like Select, Lookup and MenuButton, that display a Menu below another element (for example, a TextInput). This component renders a list of items, manages which item is selected, highlighted, and active, and handles keyboard navigation. It does not display the selected item or manage an input; the parent component needs to do that.

Components using a Menu should use the [useFloatingMenu](./../../composables/demos/use-floating-menu.html) composable to ensure the Menu is positioned correctly relative to the input (or other triggering element). The useFloatingMenu composable also manages the rounded corners on the Menu; if you are not using the useFloatingMenu composable, you will have to do this yourself, by setting `border-top-left-radius` and `border-top-right-radius` to the `border-radius-sharp` token.

The `selected` and `expanded` props must be bound with `v-model`, even if the parent component doesn't use them. Without these `v-model` bindings, the Menu won't function correctly.

The Menu itself is not focusable; for keyboard navigation to work, the parent component needs to provide a focusable element, listen for `keydown` events on that element, and pass those events to the Menu by calling the `delegateKeyNavigation` method.

For accessibility support, the parent component must set the following attributes on the focusable element:

*   `role="combobox"`
*   `aria-controls`, set to the ID of the Menu's `ul`
*   `aria-expanded`, set to `"true"` when the Menu is expanded and to `"false"` when it's closed (Vue's [useId](https://vuejs.org/api/composition-api-helpers#useid) function can be used to assign an ID to the Menu)
*   `aria-activedescendant`, set to the ID of the highlighted menu item (use the `.id` property of the object returned by the getHighlightedMenuItem method)
*   If the `menuItems` change in response to the user typing in a text input, `aria-autocomplete` should be set to the appropriate value. Visit [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete) for documentation on which value to set for this attribute.

In some environments, Menus might get cut off by other interface elements that are absolutely positioned. This can be remedied by teleporting menus to another place in the DOM. Teleportation for Menus is disabled by default, but can be enabled with `provide( 'CdxTeleportMenus', true );`. To control where Menus are teleported, provide the `'CdxTeleportTarget'` key; see [the Dialog documentation](./dialog.html#vue-usage). Teleportation can be disabled on a per-Menu basis by setting the `renderInPlace` prop, which prevents the Menu from being teleported even if `'CdxTeleportMenus'` is true.

Styling content in teleported Menus

When a Menu is teleported. its contents will not be descendants of the element that contains the `<cdx-menu>` tag. When styling the Menu or its MenuItems, be careful not to use CSS selectors that assume the Menu is inside its parent component.

For example, CSS selectors like `.my-component .cdx-menu` or `.my-component .cdx-menu-item` won't work. Instead, set e.g. `class="my-component-menu"` on the `<cdx-menu>` tag, and use that class to style the menu and its items.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `menuItems`(required) | Menu items and menu group definitions.  <br>  <br>Menu groups and individual menu items will be output in the order they appear here. | `([MenuItemData](../types-and-constants.html#menuitemdata)\|[MenuGroupData](../types-and-constants.html#menugroupdata))[]` |     |
| `footer` | Interactive footer item.  <br>  <br>This is a special menu item which is pinned to the bottom of the menu. When scrolling is enabled within the menu, the footer item will always be visible at the bottom of the menu. When scrolling is not enabled, the footer item will simply appear as the last menu item.  <br>  <br>The footer item is selectable, like other menu items. | `[MenuItemData](../types-and-constants.html#menuitemdata)` | `null` |
| `selected`(required) | Value(s) of the selected menu item(s). A single value for single-select, or an array of values for multi-select.  <br>  <br>Must be bound with `v-model:selected`.  <br>  <br>The property should be initialized to `null` (for single-select) or an empty array (for multi-select) rather than using a falsy value. | `[MenuItemValue](../types-and-constants.html#menuitemvalue)\|[MenuItemValue](../types-and-constants.html#menuitemvalue)[]\|null` |     |
| `expanded`(required) | Whether the menu is expanded. Must be bound with `v-model:expanded`. | `boolean` |     |
| `showPending` | Whether to display pending state indicators. Meant to indicate that new menu items are being fetched or computed.  <br>  <br>When true, the menu will expand if not already expanded, and an inline progress bar will display. If there are no menu items yet, a message can be displayed in the `pending` slot, e.g. "Loading results". | `boolean` | `false` |
| `visibleItemLimit` | Limit the number of menu items to display before scrolling.  <br>  <br>Setting this prop to anything falsy will show all menu items.  <br>  <br>By default, all menu items are shown. | `number\|null` | `null` |
| `showThumbnail` | Whether menu item thumbnails (or a placeholder icon) should be displayed. | `boolean` | `false` |
| `boldLabel` | Whether to bold menu item labels. | `boolean` | `false` |
| `hideDescriptionOverflow` | Whether to hide description text overflow via an ellipsis. | `boolean` | `false` |
| `searchQuery` | The search query to be highlighted within the menu items' titles. | `string` | `''` |
| `showNoResultsSlot` | Whether to show the `no-results` slot content.  <br>  <br>The Menu component automatically shows this slot when there is content in the `no-results` slot and there are zero menu items. However, some components may need to customize this behavior, e.g. to show the slot even when there is at least one menu item. This prop can be used to override the default Menu behavior.  <br>  <br>Possible values: `null` (default): the `no-results` slot will display only if there are zero menu items. `true`: the `no-results` slot will display, regardless of number of menu items. `false`: the `no-results` slot will not display, regardless of number of menu items. | `boolean\|null` | `null` |
| `renderInPlace` | Whether to disable the use of teleport and render the Menu in its original location in the document.  <br>  <br>Teleport is disabled by default for Menus, but it will be enabled if `'CdxTeleportMenus'` is provided and set to true. Setting this prop prevents the Menu from being teleported regardless of the value of `'CdxTeleportMenus'`. | `boolean` | `false` |

#### Methods [​](#methods)

| Method name | Description | Signature |
| --- | --- | --- |
| `getHighlightedMenuItem` | Get the highlighted menu item, if any.  <br>  <br>The parent component should set `aria-activedescendant` to the `.id` property of the object returned by this method. If this method returns null, `aria-activedescendant` should not be set. | **Returns:** `[MenuItemDataWithId](../types-and-constants.html#menuitemdatawithid)\|null` The highlighted menu item, or null if no item is highlighted or if the menu is closed. |
| `getHighlightedViaKeyboard` | Get whether the last highlighted item was highlighted via the keyboard. | **Returns:** `boolean` Whether the last highlighted menu item was highlighted via keyboard. |
| `getComputedMenuItems` | Get the computed menu items with IDs (without menu groups). | **Returns:** `[MenuItemDataWithId](../types-and-constants.html#menuitemdatawithid)[]` List of current menu items without menu groups. |
| `clearActive` | Ensure no menu item is active. This unsets the active item if there is one. | **Returns:** `void` |
| `delegateKeyNavigation` | Handles all necessary keyboard navigation.  <br>  <br>The parent component should listen for keydown events on its focusable element, and pass those events to this method. Events for arrow keys, tab and enter are handled by this method. If a different key was pressed, this method will return false to indicate that it didn't handle the event. | **Params:**<br><br>*   **event** `KeyboardEvent` - Keydown event object<br><br>**Returns:** `boolean` Whether the event was handled |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:selected` | **selectedValue** `[MenuItemValue](../types-and-constants.html#menuitemvalue)\|[MenuItemValue](../types-and-constants.html#menuitemvalue)[]\|null` - selected value or values | When the selected menu item changes.  <br>  <br>Property will be a single value or `null` in single-select mode, or an array of values or an empty array in multiselect mode. |
| `update:expanded` | **newValue** `boolean` - The new expanded state (true for open, false for closed) | When the menu opens or closes. |
| `menu-item-click` | **menuItem** `[MenuItemDataWithId](../types-and-constants.html#menuitemdatawithid)` - The menu item that was clicked | When a menu item is clicked.  <br>  <br>Typically, components with menus will respond to the selected value change, but occasionally, a component might want to react specifically when a menu item is clicked. |
| `menu-item-keyboard-navigation` | **highlightedMenuItem** `[MenuItemDataWithId](../types-and-constants.html#menuitemdatawithid)` - The menu item | When a menu item is highlighted via keyboard navigation. |
| `load-more` |     | When the user scrolls towards the bottom of the menu.  <br>  <br>If it is possible to add or load more menu items, then now would be a good moment so that the user can experience infinite scrolling. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| pending | Message to indicate pending state. |     |
| no-results | Message to show if there are no menu items to display. |     |
| default | Display of an individual item in the menu |     |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | When tabbing over a single-select menu, it selects the currently highlighted menu item. |
| Down arrow | When the focus is placed on the component that contains the menu, it opens the menu. When the menu is open, it navigates through the menu items. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| Up arrow | When the focus is placed on the component that contains the menu, it opens the menu. When the menu is open, it navigates through menu options. |
| Enter | It opens and closes the menu. When the focus is on an item within the menu, it selects that item. |
| Esc | It closes the menu when it is open. |
| Home | Optionally, it moves the focus to the first item within the menu. Optionally, in a single-select list box, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |
| End | Optionally, it moves the focus to the last option. Optionally, in a single-select listbox, selection may also move with focus. Supporting this key is strongly recommended for lists with more than five options. |

Pager

[Previous pageDialog](/codex/latest/components/demos/dialog.html)

[Next pageMenuItem](/codex/latest/components/demos/menu-item.html)