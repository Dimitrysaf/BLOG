# MenuItem [​](#menuitem)

A MenuItem is a selectable option within a [Menu](./menu.html).

*   Item labelDescription text

Show codeCopy code

Reset demo

```markup
<cdx-menu-item :icon="cdxIconGlobe" label="Item label" description="Description text" />
```

| Name | Value |
| --- | --- |
| Props |     |
| highlighted |     |
| active |     |
| selected |     |
| multiselect |     |
| disabled |     |
| icon |     |
| label |     |
| boldLabel |     |
| match |     |
| supportingText |     |
| description |     |
| hideDescriptionOverflow |     |
| searchQuery |     |
| action | default<br><br>destructive |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

*   cdxIconGlobe

## Overview [​](#overview)

### When to use MenuItem [​](#when-to-use-menuitem)

MenuItem is an “internal” component, used exclusively to represent content within a [Menu](./menu.html). It cannot be used by itself.

### About MenuItem [​](#about-menuitem)

MenuItems can have one of two functions:

1.  **Selectable options**  
    MenuItems in form elements like [Select](./select.html) or [Combobox](./combobox.html) are selectable.
2.  **Trigger actions**  
    MenuItems in [MenuButton](./menu-button.html) trigger actions. There are two types of actions:
    *   **Standard actions**  
        neutral actions such as "Edit" or "Share".
    *   **Destructive actions**  
        actions with potentially negative or irreversible impact, such as "Delete".

MenuItem includes the following elements.

#### Media (optional) [​](#media-optional)

An Icon or Thumbnail can be included in order to provide more context about the menu item content.

*   Use an Icon to visually reinforce the MenuItem content.
*   Use a Thumbnail to provide a preview of the MenuItem content.

#### Label [​](#label)

A clear and descriptive title for the MenuItem.

#### Supporting text (optional) [​](#supporting-text-optional)

Text that supports or explains the label. This is often used to indicate search redirects in a Menu of search results.

*   Keep supporting text short to avoid overcrowding the layout.
*   Include supporting text within brackets to explain where a search result is redirected from.

#### Search query match (optional) [​](#search-query-match-optional)

In the context of a search suggestions menu, this optional text displays the alternative label of an item that matches the search query (e.g. an alias).

#### Description (optional) [​](#description-optional)

Descriptive text that provides additional information about the menu item.

*   Keep description text concise to keep the Menu scannable and readable.

## Examples [​](#examples)

Note that these demos do not properly show some interactive states of MenuItems (like active or hovered/highlighted), since they display MenuItems as standalone or as part of an always-expanded, detached Menu. To understand the full interactivity of MenuItems, check out a component that contains a Menu, like [Select](./select.html), [Lookup](./lookup.html), or [TypeaheadSearch](./typeahead-search.html).

### Basic usage [​](#basic-usage)

By default, the MenuItem's `label` will be displayed in the regular font weight. This MenuItem has a bold `label` and a `description`.

*   Colorvisual perception of light wavelengths

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" :bold-label="true" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-with-description'
};

export default defineComponent( {
	name: 'MenuItemDefault',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" :bold-label="true"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 5921,
	label: 'Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-with-description'
};

module.exports = defineComponent( {
	name: 'MenuItemDefault',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### With link [​](#with-link)

If a `url` property is included, the MenuItem will be wrapped in an anchor tag.

*   [Colorvisual perception of light wavelengths](https://en.wikipedia.org/wiki/Color)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-with-url'
};

export default defineComponent( {
	name: 'MenuItemWithUrl',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-with-url'
};

module.exports = defineComponent( {
	name: 'MenuItemWithUrl',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### With icon [​](#with-icon)

*   Colorvisual perception of light wavelengths

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';
import { cdxIconTag } from '@wikimedia/codex-icons';

const menuItem = {
	value: 5921,
	label: 'Color',
	description: 'visual perception of light wavelengths',
	icon: cdxIconTag,
	id: 'menu-item-with-icon'
};

export default defineComponent( {
	name: 'MenuItemWithIcon',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );
const { cdxIconTag } = require( './icons.json' );

const menuItem = {
	value: 5921,
	label: 'Color',
	description: 'visual perception of light wavelengths',
	icon: cdxIconTag,
	id: 'menu-item-with-icon'
};

module.exports = defineComponent( {
	name: 'MenuItemWithIcon',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### With thumbnail [​](#with-thumbnail)

*   [Colorvisual perception of light wavelengths](https://en.wikipedia.org/wiki/Color)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" :show-thumbnail="true" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	thumbnail: {
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
	},
	id: 'menu-item-with-thumbnail'
};

export default defineComponent( {
	name: 'MenuItemWithThumbnail',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" :show-thumbnail="true"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	thumbnail: {
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
	},
	id: 'menu-item-with-thumbnail'
};

module.exports = defineComponent( {
	name: 'MenuItemWithThumbnail',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### Search query highlight [​](#search-query-highlight)

When a MenuItem displays a search result, the current `searchQuery` can be provided and will be visually differentiated within the MenuItem's `label`. The `searchQuery` text will have a normal font weight, while the rest of the `label` will be bold, which is meant to bring attention to the available suggestions based on the current `searchQuery`.

In the example below, the `searchQuery` is "Co".

*   [Colorvisual perception of light wavelengths](https://en.wikipedia.org/wiki/Color)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item
			v-bind="menuItem"
			search-query="Co"
			:highlight-query="true"
		/>
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-highlight-query'
};

export default defineComponent( {
	name: 'MenuItemHighlightQuery',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item
			v-bind="menuItem"
			search-query="Co"
			:highlight-query="true"
		></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-highlight-query'
};

module.exports = defineComponent( {
	name: 'MenuItemHighlightQuery',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### Developer notes

To highlight the search query within the label text, set `highlightQuery` to `true` and provide the current `searchQuery` text.

### Search query match [​](#search-query-match)

For search results, a `match` property may be included that represents the text related to that item that matched the `searchQuery` (e.g. a [Wikidata alias](https://www.wikidata.org/wiki/Help:Aliases)). The `match` will be displayed after the `label`.

In the example below, the `searchQuery` is "felis margarita," an alias of the Wikidata item "sand cat." The `match` is included when highlighting the search query within a result's title.

*   sand cat (Felis margarita)species of the only cat living foremost in true deserts

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="felis margarita" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 'Q175329',
	label: 'sand cat',
	match: '(Felis margarita)',
	description: 'species of the only cat living foremost in true deserts',
	id: 'menu-item-with-match'
};

export default defineComponent( {
	name: 'MenuItemWithMatch',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="felis margarita"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 'Q175329',
	label: 'sand cat',
	match: '(Felis margarita)',
	description: 'species of the only cat living foremost in true deserts',
	id: 'menu-item-with-match'
};

module.exports = defineComponent( {
	name: 'MenuItemWithMatch',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### Supporting text [​](#supporting-text)

Text that supports or explains the `label` can be added via the `supportingText` prop. This text will be displayed after the `label` in a more subtle color, and is not included when highlighting a search query within the title.

The example below shows a result for the search term "Corn," which redirects to the article for "Maize" on English Wikipedia.

*   [Maize (redirected from Corn)Genus of grass cultivated as a food crop](https://en.wikipedia.org/wiki/Maize)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="corn" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 20656228,
	label: 'Maize',
	supportingText: '(redirected from Corn)',
	url: 'https://en.wikipedia.org/wiki/Maize',
	description: 'Genus of grass cultivated as a food crop',
	thumbnail: {
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg/147px-Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg'
	},
	id: 'menu-item-with-supporting-text'
};

export default defineComponent( {
	name: 'MenuItemWithSupportingText',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="corn"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 20656228,
	label: 'Maize',
	supportingText: '(redirected from Corn)',
	url: 'https://en.wikipedia.org/wiki/Maize',
	description: 'Genus of grass cultivated as a food crop',
	thumbnail: {
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg/147px-Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg'
	},
	id: 'menu-item-with-supporting-text'
};

module.exports = defineComponent( {
	name: 'MenuItemWithSupportingText',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### Multiple languages [​](#multiple-languages)

The MenuItem component can support different languages for different text elements. The example below demonstrates a search result in a Greek interface for the English word "moon."

*   Σελήνη (moon)ο μοναδικός φυσικός δορυφόρος της Γης

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="moon" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 'Q405',
	label: 'Σελήνη',
	match: '(moon)',
	description: 'ο μοναδικός φυσικός δορυφόρος της Γης',
	language: {
		label: 'el',
		match: 'en',
		description: 'el'
	},
	id: 'menu-item-multiple-langs'
};

export default defineComponent( {
	name: 'MenuItemMultipleLangs',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

vue

```
<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="moon"></cdx-menu-item>
	</ul>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxMenuItem } = require( '@wikimedia/codex' );

const menuItem = {
	value: 'Q405',
	label: 'Σελήνη',
	match: '(moon)',
	description: 'ο μοναδικός φυσικός δορυφόρος της Γης',
	language: {
		label: 'el',
		match: 'en',
		description: 'el'
	},
	id: 'menu-item-multiple-langs'
};

module.exports = defineComponent( {
	name: 'MenuItemMultipleLangs',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
```

### Developer notes

Individual `lang` attributes can be set for the `label`, `description`, `match`, and `supportingText` props via the `language` prop, which is an object of `lang` attributes for those props.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

WARNING

This is not a standalone component, nor will it typically be directly used. It's intended for use by the Menu component, which will provide it with props and menu state information. Visit [Menu](./menu.html) for more details.

A value must be provided, and various optional elements can be displayed:

*   A human-readable label
*   A description
*   A thumbnail or icon

Alternately, the entire content and layout of the MenuItem can be customized via the default slot.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `id`(required) | ID for HTML `id` attribute. | `string` |     |
| `value`(required) | The value provided to the parent menu component when this menu item is selected. | `[MenuItemValue](../types-and-constants.html#menuitemvalue)` |     |
| `disabled` | Whether the menu item is disabled. | `boolean` | `false` |
| `selected` | Whether this menu item is selected. | `boolean` | `false` |
| `active` | Whether this menu item is being pressed. | `boolean` | `false` |
| `highlighted` | Whether this menu item is visually highlighted due to hover or keyboard navigation. | `boolean` | `false` |
| `label` | Label for the menu item. If this isn't provided, the value will be displayed instead. | `string` | `''` |
| `match` | Text that matches current search query. Only used for search results and will be displayed after the label. | `string` | `''` |
| `supportingText` | Text that supports the label. Supporting text will appear next to the label in a more subtle color. | `string` | `''` |
| `url` | URL for the menu item. If provided, the content of the menu item will be wrapped in an anchor tag. | `string` | `''` |
| `icon` | Icon for the menu item. | `[Icon](../types-and-constants.html#icon)` | `''` |
| `showThumbnail` | Whether a thumbnail (or a placeholder icon) should be displayed. | `boolean` | `false` |
| `thumbnail` | Thumbnail for the menu item. | `[Thumbnail](../types-and-constants.html#thumbnail)\|null` | `null` |
| `description` | Description of the menu item. | `string\|null` | `''` |
| `searchQuery` | The search query to be highlighted within the menu item's title. | `string` | `''` |
| `boldLabel` | Whether to bold menu item labels. | `boolean` | `false` |
| `hideDescriptionOverflow` | Whether to hide description text overflow via an ellipsis. | `boolean` | `false` |
| `language` | Optional language codes for label, match, supporting text, and description.  <br>  <br>If included, that language code will be added as a `lang` attribute to the element wrapping that text node. | `[MenuItemLanguageData](../types-and-constants.html#menuitemlanguagedata)` | `{}` |
| `action` | MenuItems inside a MenuButton can also support an "action" prop | `[ButtonAction](../types-and-constants.html#buttonaction)` | `'default'` |
| `multiselect` | Whether this menu is in multiselect mode. | `boolean` | `false` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `change` | **menuState** `[MenuState](../types-and-constants.html#menustate)` - State to change **setState** `boolean` - Whether to set that state to this menu item | Emitted when the menu item becomes selected, active or highlighted in response to user interaction. Handled in the Menu component. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Custom menu item content. |     |

Pager

[Previous pageMenu](/codex/latest/components/demos/menu.html)

[Next pagePopover](/codex/latest/components/demos/popover.html)