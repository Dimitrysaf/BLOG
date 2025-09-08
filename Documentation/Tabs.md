# Tabs [​](#tabs)

Tabs consist of two or more tab items created for navigating between different sections of content.

ReadView sourceView history

## Sand cat

The **sand cat** (_Felis margarita_), also known as the **sand dune cat**, is a small wild [cat](# "Felis") that inhabits sandy and stony [deserts](# "Desert") far from water sources. With its sandy to light grey fur, it is well camouflaged in a desert environment.

## View source for Sand cat

`The '''sand cat''' (''Felis margarita''), also known as the '''sand dune cat''', is a small wild [[Felis|cat]] that inhabits sandy and stony [[deserts]] far from water sources. With its sandy to light grey fur, it is well camouflaged in a desert environment.`

## Sand cat: Revision history

### Revisions

*   Revision 3
*   Revision 2
*   Revision 1

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-tabs :framed="framed">
		<cdx-tab
			v-for="( tab, index ) in tabsData"
			:key="index"
			:name="tab.name"
			:label="tab.label"
		>
			<!-- Tab content -->
			<h2>{{ tab.heading }}</h2>

			<template v-if="tab.name === 'read'">
				<p>
					The <b>sand cat</b> (<i>Felis margarita</i>), also known as
					the <b>sand dune cat</b>, is a small wild
					<a href="#" title="Felis">cat</a> that inhabits
					sandy and stony <a href="#" title="Desert">deserts</a>
					far from water sources. With its sandy to light grey fur, it
					is well camouflaged in a desert environment.
				</p>
			</template>
			<template v-if="tab.name === 'source'">
				<code>
					The '''sand cat''' (''Felis margarita''), also known as the
					'''sand dune cat''', is a small wild [[Felis|cat]] that
					inhabits sandy and stony [[deserts]] far from water sources.
					With its sandy to light grey fur, it is well camouflaged in
					a desert environment.
				</code>
			</template>
			<template v-if="tab.name === 'history'">
				<h3>Revisions</h3>
				<ul>
					<li>Revision 3</li>
					<li>Revision 2</li>
					<li>Revision 1</li>
				</ul>
			</template>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
import { CdxTabs, CdxTab } from '@wikimedia/codex';
import { defineComponent } from 'vue';

export default defineComponent( {
	name: 'BasicTabs',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		framed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			tabsData: [ {
				name: 'read',
				label: 'Read',
				heading: 'Sand cat'
			}, {
				name: 'source',
				label: 'View source',
				heading: 'View source for Sand cat'
			}, {
				name: 'history',
				label: 'View history',
				heading: 'Sand cat: Revision history'
			} ]
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-tabs :framed="framed">
		<cdx-tab
			v-for="( tab, index ) in tabsData"
			:key="index"
			:name="tab.name"
			:label="tab.label"
		>
			<!-- Tab content -->
			<h2>{{ tab.heading }}</h2>

			<template v-if="tab.name === 'read'">
				<p>
					The <b>sand cat</b> (<i>Felis margarita</i>), also known as
					the <b>sand dune cat</b>, is a small wild
					<a href="#" title="Felis">cat</a> that inhabits
					sandy and stony <a href="#" title="Desert">deserts</a>
					far from water sources. With its sandy to light grey fur, it
					is well camouflaged in a desert environment.
				</p>
			</template>
			<template v-if="tab.name === 'source'">
				<code>
					The '''sand cat''' (''Felis margarita''), also known as the
					'''sand dune cat''', is a small wild [[Felis|cat]] that
					inhabits sandy and stony [[deserts]] far from water sources.
					With its sandy to light grey fur, it is well camouflaged in
					a desert environment.
				</code>
			</template>
			<template v-if="tab.name === 'history'">
				<h3>Revisions</h3>
				<ul>
					<li>Revision 3</li>
					<li>Revision 2</li>
					<li>Revision 1</li>
				</ul>
			</template>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
const { CdxTabs, CdxTab } = require( '@wikimedia/codex' );
const { defineComponent } = require( 'vue' );

module.exports = defineComponent( {
	name: 'BasicTabs',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		framed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			tabsData: [ {
				name: 'read',
				label: 'Read',
				heading: 'Sand cat'
			}, {
				name: 'source',
				label: 'View source',
				heading: 'View source for Sand cat'
			}, {
				name: 'history',
				label: 'View history',
				heading: 'Sand cat: Revision history'
			} ]
		};
	}
} );
</script>
```

| Name | Value |
| --- | --- |
| Props |     |
| framed |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Tabs [​](#when-to-use-tabs)

Use Tabs to navigate between different sections of content on the page. For filtering information on the screen or switching between views, use a [ToggleButtonGroup](./toggle-button-group.html) instead. Tabs can be visually styled as framed or quiet (by default). Framed Tabs should only be used when appearing within a box or module.

Avoid using Tabs to structure content meant to be consumed sequentially, like the sections within an article page.

### About Tabs [​](#about-tabs)

The Tabs component always contains two or more [Tab](./tab.html) items. Each Tab will display different sections within the same context. For example, Tabs can display different edit views or topics.

Tabs includes the following elements.

#### Selected tab [​](#selected-tab)

Within the Tabs component, only one tab item can be selected at a time.

#### Unselected tab [​](#unselected-tab)

The remaining tab items will remain unselected. Users can choose these tabs by clicking on them or navigating to them via the keyboard’s arrow keys.

#### Scroll button(s) [​](#scroll-button-s)

When there are many tab items or limited space, arrow buttons will appear to allow scrolling to all of the tab items.

## Examples [​](#examples)

### Header row scroll [​](#header-row-scroll)

When the width of the header row exceeds the width of its container, arrow buttons will appear to enable scrolling through Tab items.

First TabSecond Tab with a really really really really long nameThird TabFourth TabFifth TabSixth Tab

## Content for tab1

This is the content for the First Tab

## Content for tab2

This is the content for the Second Tab with a really really really really long name

## Content for tab3

This is the content for the Third Tab

## Content for tab4

This is the content for the Fourth Tab

## Content for tab5

This is the content for the Fifth Tab

## Content for tab6

This is the content for the Sixth Tab

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-tabs :framed="framed">
		<cdx-tab
			v-for="( tab, index ) in tabsData"
			:key="index"
			:name="tab.name"
			:label="tab.label"
			:disabled="tab.disabled"
		>
			<h2>Content for {{ tab.name }}</h2>
			<p>
				This is the content for the {{ tab.label }}
			</p>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
import { CdxTabs, CdxTab } from '@wikimedia/codex';
import { defineComponent } from 'vue';

const tabsData = [ {
	name: 'tab1',
	label: 'First Tab'
}, {
	name: 'tab2',
	label: 'Second Tab with a really really really really long name'
}, {
	name: 'tab3',
	label: 'Third Tab'
}, {
	name: 'tab4',
	label: 'Fourth Tab',
	disabled: true
}, {
	name: 'tab5',
	label: 'Fifth Tab'
}, {
	name: 'tab6',
	label: 'Sixth Tab'
} ];

export default defineComponent( {
	name: 'ManyTabs',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		framed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			tabsData
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-tabs :framed="framed">
		<cdx-tab
			v-for="( tab, index ) in tabsData"
			:key="index"
			:name="tab.name"
			:label="tab.label"
			:disabled="tab.disabled"
		>
			<h2>Content for {{ tab.name }}</h2>
			<p>
				This is the content for the {{ tab.label }}
			</p>
		</cdx-tab>
	</cdx-tabs>
</template>

<script>
const { CdxTabs, CdxTab } = require( '@wikimedia/codex' );
const { defineComponent } = require( 'vue' );

const tabsData = [ {
	name: 'tab1',
	label: 'First Tab'
}, {
	name: 'tab2',
	label: 'Second Tab with a really really really really long name'
}, {
	name: 'tab3',
	label: 'Third Tab'
}, {
	name: 'tab4',
	label: 'Fourth Tab',
	disabled: true
}, {
	name: 'tab5',
	label: 'Fifth Tab'
}, {
	name: 'tab6',
	label: 'Sixth Tab'
} ];

module.exports = defineComponent( {
	name: 'ManyTabs',
	components: {
		CdxTabs,
		CdxTab
	},
	props: {
		framed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			tabsData
		};
	}
} );
</script>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

One or more [Tab](./tab.html) components must be provided in the default slot of the Tabs component. Each child Tab component must have a `name` property. By default, the first tab will be active when the component renders.

#### Optional 2-way binding of active tab [​](#optional-2-way-binding-of-active-tab)

Optionally, the active tab can be bound in the parent scope using `v-model:active`. This is useful in situations where the Tabs need the ability to render with a Tab other than the first in the active state and is recommended if tabs are meant to respond to URL params. The value of `v-model:active` should correspond to the `name` property of the active tab.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `active` | The `name` of the currently active Tab in the layout.  <br>  <br>This prop is optional; if it is provided, it should be bound using a `v-model:active` directive in the parent component. Two-way binding the active tab is only necessary if some tab other than the first should be active as soon as the component renders (such as in cases where the active tab is bound to URL params). If this prop is not provided, then the first tab will be active by default. Regardless, the active tab can be changed normally by user interaction (clicking on tab headings) or by using the exposed methods "select", "next", and "prev". | `string` | `null` |
| `framed` | Whether or not the component should be displayed in a framed visual style. | `boolean` | `false` |

#### Methods [​](#methods)

| Method name | Description | Signature |
| --- | --- | --- |
| `select` | Programmatically select a tab based on its "name" prop | **Params:**<br><br>*   **tabName** `string` - The name of the tab to select<br>*   **setFocus** `boolean` - Whether or not to also set focus to the new tab<br><br>**Returns:** `void` |
| `next` | Set the next tab to active, if one exists | **Params:**<br><br>*   **setFocus** `boolean` -<br><br>**Returns:** `void` |
| `prev` | Set the previous tab to active, if one exists | **Params:**<br><br>*   **setFocus** `boolean` -<br><br>**Returns:** `void` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:active` | **active** `string` - The `name` of the current active tab | Emitted whenever the active tab changes, assuming that an `active` prop has been provided in the parent. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | One or more Tab components must be provided here |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The non-JS version of the Tabs component should be seen as a navigational tool. It relies on HTML form submission to trigger a change in the current active tab. When the user clicks on a tab button (or hits Enter while tab button is focused), the browser will load a new page.

##### Basic setup: [​](#basic-setup)

*   The outermost element should be a `<div>` element with the class `"cdx-tabs"`.
*   The `cdx-tabs__header` element should be a `<form>` with the following attributes:
    *   `method="get"`: we will send the form with a GET request
    *   `action="myURL"`: The value of `action` should be whatever URL the form data will be sent to; in this example it's simply the same URL as the page, but appended with a different URL query parameter based on the user's tab selection. In a real-world use-case, this might be a URL that can accept query parameters (say for performing a different kind of search based on which tab the user selects).
*   Within the `tablist` element, every tab label is represented by a `<button>` element (this is the same as in the Vue version). However, since we are submitting the data as a form, each tab button must contain a `name` and a `value` attribute. In a real application, this might correspond to key-value pairs used for a given query parameter.
*   The tab corresponding to the current view should contain the `aria-selected="true"` attribute. All other tabs should have `aria-selected="false"`. If you are using a server-side templating language like Mustache, this should be set there.
*   Each tab should also have an `aria-controls` attribute with a value of the ID of the corresponding `tabpanel`.
*   Don't mess with `<button>` `tabindex` – since the CSS-only version of this component has no way to bind left and right arrow keys to handler methods, the user is going to need to rely on the mouse or the tab key to navigate between tabs.
*   To disable a tab, simply add a `disabled` attribute to that tab's `<button>` in the tablist.

The Tabs below have long labels, making the tab list too long for its container. When this happens, you can horizontally scroll to reach the rest of the Tabs list.

WARNING

Keyboard navigation between tabs can only be done via the tab key. Arrow keys will not work here.

Tab number one Tab number two with a longer label Tab number three Tab number four

Tab 1 content

Tab 2 content

Tab 3 content

Tab 4 content

Show codeCopy code

html

```
	<!-- Wrapper div. -->
	<div class="cdx-tabs">
		<!-- Header with tab buttons -->
		<form class="cdx-tabs__header" method="get" action="https://doc.wikimedia.org/codex/latest/components/demos/tabs.html#css-only-version">
			<!-- List of tabs. -->
			<div class="cdx-tabs__list" tabindex="-1" role="tablist">
				<!-- Tab list item. -->
				<button
					id="form-tabs-1-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="true"
					aria-controls="form-tabs-1"
					value="form-tabs-1"
					name="tab"
				>
					Tab number one
				</button>
				<button
					id="form-tabs-2-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="false"
					aria-controls="form-tabs-2"
					value="form-tabs-2"
					name="tab"
				>
					Tab number two with a longer label
				</button>
				<button
					id="form-tabs-3-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="false"
					aria-controls="form-tabs-3"
					value="form-tabs-3"
					name="tab"
					disabled
				>
					Tab number three
				</button>
				<button
					id="form-tabs-4-label"
					class="cdx-tabs__list__item"
					role="tab"
					aria-selected="false"
					aria-controls="form-tabs-4"
					value="form-tabs-4"
					name="tab"
				>
					Tab number four
				</button>
			</div>
		</form>
		<!-- Tabs. -->
		<div class="cdx-tabs__content">
			<!-- <section> element for each tab, with any content inside. -->
			<section
				id="form-tabs-1"
				aria-hidden="false"
				aria-labelledby="form-tabs-1-label"
				class="cdx-tab"
				role="tabpanel"
				tabindex="-1"
			>
				Tab 1 content
			</section>
			<section
				id="form-tabs-2"
				aria-hidden="true"
				aria-labelledby="form-tabs-2-label"
				class="cdx-tab"
				role="tabpanel"
				tabindex="-1"
			>
				Tab 2 content
			</section>
			<section
				id="form-tabs-3"
				aria-hidden="true"
				aria-labelledby="form-tabs-3-label"
				class="cdx-tab"
				role="tabpanel"
				tabindex="-1"
			>
				Tab 3 content
			</section>
			<section
				id="form-tabs-4"
				aria-hidden="true"
				aria-labelledby="form-tabs-4-label"
				class="cdx-tab"
				role="tabpanel"
				tabindex="-1"
			>
				Tab 4 content
			</section>
		</div>
	</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus to the next interactive element in tab order. |
| Shift + Tab | It moves the focus to the previous interactive element. |
| Left arrow / Right arrow | When focusing on a Tab item, the arrow keys navigate between the rest of Tab items. |

Pager

[Previous pageLink](/codex/latest/components/mixins/link.html)

[Next pageTab](/codex/latest/components/demos/tab.html)