# Breadcrumb [​](#breadcrumb)

WARNING

This component is still under development. It is not yet available in releases of Codex.

Breadcrumb is a list of links to the parent pages of the current page in hierarchical order.

### Configurable [​](#configurable)

1.  [Home](/)
2.  [Components](/components/overview.html)
3.  Breadcrumb

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| maxVisible |     |
| truncateLength |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Breadcrumb [​](#when-to-use-breadcrumb)

Breadcrumbs are used to provide a clear navigation path within a hierarchical structure, showing the user's current location and allowing easy navigation to parent or sibling sections.

Use Breadcrumb to display where the user is within a hierarchy by showing a structured navigation path within the hierarchy.

Avoid using Breadcrumb for single-level navigation or flat structures. If a navigation menu alone suffices for the structure, a breadcrumb trail may not be necessary.

### About Breadcrumb [​](#about-breadcrumb)

Breadcrumb contains the following elements.

#### Breadcrumb items [​](#breadcrumb-items)

Each visible item in the trail will be displayed as a link. The current page is displayed last in bold text. Items should appear in order from top level to the current page.

#### Overflow menu [​](#overflow-menu)

If there are more breadcrumb items than the visible item limit, the rest of the items will be displayed in a MenuButton.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

*   Align breadcrumbs to the start of the page, above the content and below the main navigation.
*   Ensure breadcrumbs follow the logical page hierarchy.

1.  [Wikimedia …](https://doc.wikimedia.org/)
    
    Wikimedia Open Source
    
2.  [Codex](https://doc.wikimedia.org/codex/latest)
3.  [Designing …](https://doc.wikimedia.org/codex/latest/contributing/designing-components.html)
    
    Designing Components
    
4.  Visual Sty…
    
    Visual Style and Interaction
    

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-breadcrumb
		:items="breadcrumbItems"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxBreadcrumb } from '@wikimedia/codex';

export default defineComponent( {
	name: 'BreadcrumbBasic',
	components: { CdxBreadcrumb },
	setup() {
		const breadcrumbItems = [
			{ label: 'Wikimedia Open Source', url: 'https://doc.wikimedia.org/' },
			{ label: 'Codex', url: 'https://doc.wikimedia.org/codex/latest' },
			{ label: 'Designing Components', url: 'https://doc.wikimedia.org/codex/latest/contributing/designing-components.html' },
			{ label: 'Visual Style and Interaction', url: '' }
		];

		return {
			breadcrumbItems
		};
	}
} );

</script>
```

vue

```
<template>
	<cdx-breadcrumb
		:items="breadcrumbItems"
	></cdx-breadcrumb>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxBreadcrumb } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'BreadcrumbBasic',
	components: { CdxBreadcrumb },
	setup() {
		const breadcrumbItems = [
			{ label: 'Wikimedia Open Source', url: 'https://doc.wikimedia.org/' },
			{ label: 'Codex', url: 'https://doc.wikimedia.org/codex/latest' },
			{ label: 'Designing Components', url: 'https://doc.wikimedia.org/codex/latest/contributing/designing-components.html' },
			{ label: 'Visual Style and Interaction', url: '' }
		];

		return {
			breadcrumbItems
		};
	}
} );

</script>
```

### With overflow menu [​](#with-overflow-menu)

*   Limit visible items to ensure breadcrumbs display on a single line.

2.  [Designing Co…](https://doc.wikimedia.org/codex/latest/contributing/designing-components.html)
    
    Designing Components
    
3.  Visual Style…
    
    Visual Style and Interaction
    

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-breadcrumb
		:items="breadcrumbItems"
		:max-visible="2"
		:truncate-length="12"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxBreadcrumb } from '@wikimedia/codex';

export default defineComponent( {
	name: 'BreadcrumbOverflow',
	components: { CdxBreadcrumb },
	setup() {
		const breadcrumbItems = [
			{ label: 'Wikimedia Open Source', url: 'https://doc.wikimedia.org/' },
			{ label: 'Codex', url: 'https://doc.wikimedia.org/codex/latest' },
			{ label: 'Designing Components', url: 'https://doc.wikimedia.org/codex/latest/contributing/designing-components.html' },
			{ label: 'Visual Style and Interaction', url: '' }
		];

		return {
			breadcrumbItems
		};
	}
} );

</script>
```

vue

```
<template>
	<cdx-breadcrumb
		:items="breadcrumbItems"
		:max-visible="2"
		:truncate-length="12"
	></cdx-breadcrumb>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxBreadcrumb } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'BreadcrumbOverflow',
	components: { CdxBreadcrumb },
	setup() {
		const breadcrumbItems = [
			{ label: 'Wikimedia Open Source', url: 'https://doc.wikimedia.org/' },
			{ label: 'Codex', url: 'https://doc.wikimedia.org/codex/latest' },
			{ label: 'Designing Components', url: 'https://doc.wikimedia.org/codex/latest/contributing/designing-components.html' },
			{ label: 'Visual Style and Interaction', url: '' }
		];

		return {
			breadcrumbItems
		};
	}
} );

</script>
```

*   [Wikimedia Open Source](https://doc.wikimedia.org/)
*   [Codex](https://doc.wikimedia.org/codex/latest)

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `items`(required) | An array of breadcrumb items. Items will be displayed in the order they appear. The final item should be the current page. | `[BreadcrumbItem](../types-and-constants.html#breadcrumbitem)[]` |     |
| `truncateLength` | The minimum number of characters before truncation occurs. This allows you to configure the length at which breadcrumb item texts are truncated. | `number` | `10` |
| `maxVisible` | The maximum number of visible breadcrumb items. Extra items will be moved into an overflow menu. | `number` | `6` |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | Moves the focus to the next breadcrumb item within the breadcrumb list or to the next interactive element in tab order when the focus is placed on the last link in the group. |
| Shift + Tab | Moves the focus to the previous breadcrumb item within the breadcrumb list or to the next interactive element in tab order when the focus is placed on the first link in the group. |

Pager

[Previous pageThumbnail](/codex/main/components/demos/thumbnail.html)

[Next pageLink](/codex/main/components/mixins/link.html)