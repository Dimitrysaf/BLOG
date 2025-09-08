# Tab [​](#tab)

A Tab is one of the selectable items included within [Tabs](./tabs.html).

First Tabtab2

Content for first tab

Content for second tab

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-tabs v-model:active="currentTab">
		<cdx-tab
			:name="tabName"
			:disabled="disabled"
			:label="label"
		>
			<p>
				<slot />
			</p>
		</cdx-tab>

		<cdx-tab name="tab2">
			<p>
				Content for second tab
			</p>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
import { CdxTab, CdxTabs } from '@wikimedia/codex';
import { defineComponent } from 'vue';

export default defineComponent( {
	name: 'ConfigurableTabDemo',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		tabName: {
			type: String,
			required: true
		},

		disabled: {
			type: Boolean,
			default: false
		},

		label: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			currentTab: ''
		};
	},

	watch: {
		tabName( newVal, oldVal ) {
			if ( this.currentTab === oldVal ) {
				this.currentTab = newVal;
			}
		}
	},

	mounted() {
		this.currentTab = this.tabName;
	}
} );
</script>
```

vue

```
<template>
	<cdx-tabs v-model:active="currentTab">
		<cdx-tab
			:name="tabName"
			:disabled="disabled"
			:label="label"
		>
			<p>
				<slot></slot>
			</p>
		</cdx-tab>

		<cdx-tab name="tab2">
			<p>
				Content for second tab
			</p>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
const { CdxTab, CdxTabs } = require( '@wikimedia/codex' );
const { defineComponent } = require( 'vue' );

module.exports = defineComponent( {
	name: 'ConfigurableTabDemo',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		tabName: {
			type: String,
			required: true
		},

		disabled: {
			type: Boolean,
			default: false
		},

		label: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			currentTab: ''
		};
	},

	watch: {
		tabName( newVal, oldVal ) {
			if ( this.currentTab === oldVal ) {
				this.currentTab = newVal;
			}
		}
	},

	mounted() {
		this.currentTab = this.tabName;
	}
} );
</script>
```

| Name | Value |
| --- | --- |
| Props |     |
| disabled |     |
| tabName |     |
| label |     |
| Slots |     |
| default |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Tab [​](#when-to-use-tab)

Two or more Tab items are grouped to create a [Tabs](./tabs.html) component. Tab items cannot be used individually. For example, different Tab items can represent the different sections of an article.

### About Tab [​](#about-tab)

Tab includes the following elements.

#### Label [​](#label)

*   Limit Tab names to one or two words. [_Concise_](./../../style-guide/writing-for-copy.html#is-this-concise) & [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear)
    
*   Avoid mixing verbs and nouns for the labels. [_Consistent_](./../../style-guide/writing-for-copy.html#is-this-consistent) & [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear)
    

#### Content [​](#content)

Tab content appears underneath the Tab when selected, and can include any type of content or components.

## Technical implementations [​](#technical-implementations)

### Vue usage [​](#vue-usage)

This component can display arbitrary content, including markup, via its default slot. The provided content is wrapped in a `<section>` tag and given an HTML ID.

Must be used with Tabs component

This component is only meant to be used inside the default `<slot>` of the `<Tabs>` component. It cannot be used as a standalone component. Visit the [Tabs documentation](./tabs.html) for more information.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `name`(required) | String name of the tab, used for programmatic selection. Each Tab inside a layout must have a unique name. This prop will also be used as the tab label if no "label" prop is provided. | `string` |     |
| `label` | Label that corresponds to this Tab in the Tabs component's header. Lengthy labels will be truncated. | `string` | `''` |
| `disabled` | Whether or not the tab is disabled. Disabled tabs cannot be accessed via label clicks or keyboard navigation. | `boolean` | `false` |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Tab content |     |

### CSS-only version [​](#css-only-version)

See the [Tabs page](./tabs.html#css-only-version) to learn how to build a CSS-only tabbed layout.

Pager

[Previous pageTabs](/codex/latest/components/demos/tabs.html)

[Next pageSearchInput](/codex/latest/components/demos/search-input.html)