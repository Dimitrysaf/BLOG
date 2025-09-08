# Accordion [​](#accordion)

An Accordion is an expandable and collapsible section of content, often featured in a vertically stacked list with other Accordions. Accordions are commonly used to organize content into collapsed sections, making the interface easier to navigate.

### Customizable accordion component title

The default slot is the content of the accordion

Show codeCopy code

Reset demo

```markup
<cdx-accordion>The default slot is the content of the accordion
<template #description></template>
<template #title>Customizable accordion component title</template></cdx-accordion>
```

| Name | Value |
| --- | --- |
| Props |     |
| actionIcon |     |
| actionAlwaysVisible |     |
| Slots |     |
| default |     |
| description |     |
| title |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

## Overview [​](#overview)

### When to use Accordion [​](#when-to-use-accordion)

Use the Accordion component when you need to organize blocks of content into sections. Avoid using an Accordion when the user needs to read the content by default. In this case, use another component or group of elements instead.

Expanded Accordion content can be as long as needed, and the type of content can vary contextually. Headings should be used to label each section of content.

### About Accordion [​](#about-accordion)

Accordion includes the following elements.

#### Expand icon [​](#expand-icon)

An arrow icon is placed next to the accordion’s label to visually indicate that the Accordion can be expanded or collapsed.

#### Label [​](#label)

The title or label provides a brief description of the Accordion's content. Pressing on this section expands or collapses the Accordion.

*   Customize the label to other styles by applying any of the existing fonts, text sizes or formats defined in our [font design tokens](./../../design-tokens/font.html).
    
*   Always make sure to emphasize the label more prominently than the expanded content.
    
*   Avoid customizing the label color as it may lead to contrast issues with the various states of the Accordion.
    
*   Avoid combining different text styles within the labels of the same Accordion group.
    
*   Avoid including links in the Accordion label.
    

#### Description (optional) [​](#description-optional)

A description can be included to provide more information about the title or label.

#### Action (optional) [​](#action-optional)

An action (such as edit) could appear at the end of the heading section and it will affect the entire Accordion item.

#### Expanded content [​](#expanded-content)

The expanded content within the Accordion can include paragraph text, links, images, videos, tables, or form items. There are no restrictions on the minimum or maximum amount of content that can be included in the expanded section.

*   Use sub-headers to represent different subsections within Accordion content.
*   Avoid nesting additional Accordions within an Accordion item to create subsections.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

### Accordion title

The accordion content can be as longer as needed, and the type of content can vary according to the need of each use case.

Headings should be used to label each section of content

### This is a very long title which should be moved to the next line if there is not enough space

A paragraph can be added here with a short or long informative text.

Another paragraph can be added here with a short or long informative text. There is no limit to the length of the paragraphs.

### Open by default

This Accordion is open by default

Simply add the "open" boolean attribute to this component to have it initially render in the expanded state. All other behavior is unchanged.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-accordion>
		<template #title>
			Accordion title
		</template>
		<p>
			The accordion content can be as longer as needed, and the type of content can vary
			according to the need of each use case.
		</p>
		<p>Headings should be used to label each section of content</p>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			This is a very long title which should be moved to the next line if there is
			not enough space
		</template>
		<p>A paragraph can be added here with a short or long informative text.</p>
		<p>
			Another paragraph can be added here with a short or long informative text.
			There is no limit to the length of the paragraphs.
		</p>
	</cdx-accordion>
	<cdx-accordion open>
		<template #title>
			Open by default
		</template>
		<p>This Accordion is open by default</p>
		<p>
			Simply add the "open" boolean attribute to this component to have it
			initially render in the expanded state. All other behavior is unchanged.
		</p>
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDefault',
	components: { CdxAccordion }
} );
</script>
```

vue

```
<template>
	<cdx-accordion>
		<template #title>
			Accordion title
		</template>
		<p>
			The accordion content can be as longer as needed, and the type of content can vary
			according to the need of each use case.
		</p>
		<p>Headings should be used to label each section of content</p>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			This is a very long title which should be moved to the next line if there is
			not enough space
		</template>
		<p>A paragraph can be added here with a short or long informative text.</p>
		<p>
			Another paragraph can be added here with a short or long informative text.
			There is no limit to the length of the paragraphs.
		</p>
	</cdx-accordion>
	<cdx-accordion open>
		<template #title>
			Open by default
		</template>
		<p>This Accordion is open by default</p>
		<p>
			Simply add the "open" boolean attribute to this component to have it
			initially render in the expanded state. All other behavior is unchanged.
		</p>
	</cdx-accordion>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxAccordion } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'AccordionDefault',
	components: { CdxAccordion }
} );
</script>
```

### Developer notes

The Accordion component supports two different modes of usage:

1.  "Native" behavior – the component's embedded `<details>` element bears the responsibility for managing the open/closed state of the component. If desired, an initial `open` attribute can be provided to ensure that the component renders in the expanded state initially. Use this behavior if you don't care about controlling the state of Accordion component's programmatically. Refer to the [basic usage](#basic-usage) example for how to implement this behavior.
2.  `v-model` behavior – by binding a reactive value to the component using `v-model`, programmatic control can be achieved. Use this approach if something outside of the Accordion (URL, another component, etc) needs to be able to open or close the component based on some criteria. Refer to the [programmatically controlled section](#programmatically-controlled) for an example of how to implement this behavior.

### With action button [​](#with-action-button)

By default, action buttons display when the Accordion is open.

### Accordion title

Accordion content

### Accordion title which is very long and will be properly wrapped to the next line

Accordion content

  

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title which is very long and will be properly wrapped to the next line
		</template>
		Accordion content
	</cdx-accordion>
	<br>
	<p v-if="showHandleButtonClickResult">
		Action button clicked
	</p>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';
import { cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'AccordionActionButton',
	components: { CdxAccordion },
	setup() {
		const showHandleButtonClickResult = ref( false );
		const handleButtonClick = () => {
			showHandleButtonClickResult.value = true;
			setTimeout( () => {
				showHandleButtonClickResult.value = false;
			}, 2000 );
		};

		return {
			cdxIconEdit,
			handleButtonClick,
			showHandleButtonClickResult
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title which is very long and will be properly wrapped to the next line
		</template>
		Accordion content
	</cdx-accordion>
	<br>
	<p v-if="showHandleButtonClickResult">
		Action button clicked
	</p>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxAccordion } = require( '@wikimedia/codex' );
const { cdxIconEdit } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'AccordionActionButton',
	components: { CdxAccordion },
	setup() {
		const showHandleButtonClickResult = ref( false );
		const handleButtonClick = () => {
			showHandleButtonClickResult.value = true;
			setTimeout( () => {
				showHandleButtonClickResult.value = false;
			}, 2000 );
		};

		return {
			cdxIconEdit,
			handleButtonClick,
			showHandleButtonClickResult
		};
	}
} );
</script>
```

### Developer notes

To add an action button to the Accordion, pass the `actionButton` prop. The button is placed in the top right corner of the Accordion, and it emits an event `actionButtonClicked` when clicked.

If you are displaying an action button, make sure to provide a label for this button for accessibility purposes by using the `actionButtonLabel` prop.

### With always visible action [​](#with-always-visible-action)

### Accordion title

Edit

Accordion content

### Accordion title

Edit

Accordion content

### Accordion title

Edit

Accordion content

  

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<br>
	<p v-if="showHandleButtonClickResult">
		Action button clicked
	</p>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';
import { cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'AccordionActionVisible',
	components: { CdxAccordion },
	setup() {
		const showHandleButtonClickResult = ref( false );
		const handleButtonClick = () => {
			showHandleButtonClickResult.value = true;
			setTimeout( () => {
				showHandleButtonClickResult.value = false;
			}, 2000 );
		};

		return {
			cdxIconEdit,
			handleButtonClick,
			showHandleButtonClickResult
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<cdx-accordion
		:action-icon="cdxIconEdit"
		action-always-visible
		action-button-label="Edit"
		@action-button-click="handleButtonClick"
	>
		<template #title>
			Accordion title
		</template>
		Accordion content
	</cdx-accordion>
	<br>
	<p v-if="showHandleButtonClickResult">
		Action button clicked
	</p>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxAccordion } = require( '@wikimedia/codex' );
const { cdxIconEdit } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'AccordionActionVisible',
	components: { CdxAccordion },
	setup() {
		const showHandleButtonClickResult = ref( false );
		const handleButtonClick = () => {
			showHandleButtonClickResult.value = true;
			setTimeout( () => {
				showHandleButtonClickResult.value = false;
			}, 2000 );
		};

		return {
			cdxIconEdit,
			handleButtonClick,
			showHandleButtonClickResult
		};
	}
} );
</script>
```

### Developer notes

To show the icon even when the Accordion is collapsed, set the `actionAlwaysVisible` prop.

### With different content [​](#with-different-content)

The Accordion can be used with different elements, including images, tables, or form items..

### Accordion with an image

![mediawiki logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png)

### Accordion with a table

|     |     |     |     |
| --- | --- | --- | --- |Dogs
|     | Rex | Bella | Max |
| --- | --- | --- | --- |
| Breed | German Shepherd | Golden Retriever | Bulldog |
| Age | 5   | 3   | 7   |
| Owner | John | Sarah | Michael |
| Eating habits | Healthy appetite | Picky eater | Enjoys treats |

### Accordion with a textarea

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-accordion>
		<template #title>
			Accordion with an image
		</template>
		<img
			alt="mediawiki logo"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png"
		>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a table
		</template>
		<cdx-table
			caption="Dogs"
			:columns="columns"
			:data="data"
			:hide-caption="true"
			:use-row-headings="true"
		/>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a textarea
		</template>
		<cdx-text-area placeholder="Start typing..." />
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion, CdxTextArea, CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionDifferentContent',
	components: { CdxAccordion, CdxTextArea, CdxTable },
	setup() {
		const columns = [
			{ id: 'trait', label: '' },
			{ id: 'rex', label: 'Rex' },
			{ id: 'bella', label: 'Bella' },
			{ id: 'max', label: 'Max' }
		];
		const data = [
			{ trait: 'Breed', rex: 'German Shepherd', bella: 'Golden Retriever', max: 'Bulldog' },
			{ trait: 'Age', rex: 5, bella: 3, max: 7 },
			{ trait: 'Owner', rex: 'John', bella: 'Sarah', max: 'Michael' },
			{ trait: 'Eating habits', rex: 'Healthy appetite', bella: 'Picky eater', max: 'Enjoys treats' }
		];

		return {
			columns,
			data
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-accordion>
		<template #title>
			Accordion with an image
		</template>
		<img
			alt="mediawiki logo"
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/MediaWiki-2020-logo.svg/1920px-MediaWiki-2020-logo.svg.png"
		>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a table
		</template>
		<cdx-table
			caption="Dogs"
			:columns="columns"
			:data="data"
			:hide-caption="true"
			:use-row-headings="true"
		></cdx-table>
	</cdx-accordion>
	<cdx-accordion>
		<template #title>
			Accordion with a textarea
		</template>
		<cdx-text-area placeholder="Start typing..."></cdx-text-area>
	</cdx-accordion>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxAccordion, CdxTextArea, CdxTable } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'AccordionDifferentContent',
	components: { CdxAccordion, CdxTextArea, CdxTable },
	setup() {
		const columns = [
			{ id: 'trait', label: '' },
			{ id: 'rex', label: 'Rex' },
			{ id: 'bella', label: 'Bella' },
			{ id: 'max', label: 'Max' }
		];
		const data = [
			{ trait: 'Breed', rex: 'German Shepherd', bella: 'Golden Retriever', max: 'Bulldog' },
			{ trait: 'Age', rex: 5, bella: 3, max: 7 },
			{ trait: 'Owner', rex: 'John', bella: 'Sarah', max: 'Michael' },
			{ trait: 'Eating habits', rex: 'Healthy appetite', bella: 'Picky eater', max: 'Enjoys treats' }
		];

		return {
			columns,
			data
		};
	}
} );
</script>
```

### Heading levels [​](#heading-levels)

By default, the title of an Accordion is an `<h3>` element. You can customize the heading level if level 3 is not appropriate for the context. You can also change the text style of the Accordion title using Codex design tokens.

In the example below, the heading level is set to 2 and the font size is increased.

## Accordion with h2 title

Accordion content 1

## Accordion with h2 title

Accordion content 2

## Accordion with h2 title

Accordion content 3

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 1
	</cdx-accordion>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 2
	</cdx-accordion>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 3
	</cdx-accordion>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxAccordion } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionHeadings',
	components: { CdxAccordion }
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-accordion-heading-2 {
	.cdx-accordion__header {
		font-size: @font-size-large;
	}
}
</style>
```

vue

```
<template>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 1
	</cdx-accordion>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 2
	</cdx-accordion>
	<cdx-accordion heading-level="h2" class="cdx-demo-accordion-heading-2">
		<template #title>
			Accordion with h2 title
		</template>
		Accordion content 3
	</cdx-accordion>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxAccordion } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'AccordionHeadings',
	components: { CdxAccordion }
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-accordion-heading-2 {
	.cdx-accordion__header {
		font-size: @font-size-large;
	}
}
</style>
```

### Developer notes

The Accordion heading can be changed to any heading level by passing the `headingLevel` prop.

### Programmatically controlled [​](#programmatically-controlled)

It is possible to control the Accordion component programmatically, using a `v-model` binding in the parent scope. Use this approach if something outside of the Accordion needs to be able to trigger or respond to changes in the component's state.

Accordion is Closed  
  

### Accordion controlled using v-model

Accordion content

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-toggle-button v-model="isExpanded">
			{{ isExpanded ? 'Accordion is Open' : 'Accordion is Closed' }}
		</cdx-toggle-button>

		<br><br>

		<cdx-accordion v-model="isExpanded">
			<template #title>
				Accordion controlled using v-model
			</template>

			Accordion content
		</cdx-accordion>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxAccordion, CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'AccordionProgrammaticControl',
	components: {
		CdxAccordion,
		CdxToggleButton
	},

	setup() {
		const isExpanded = ref( false );

		return {
			isExpanded
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-toggle-button v-model="isExpanded">
			{{ isExpanded ? 'Accordion is Open' : 'Accordion is Closed' }}
		</cdx-toggle-button>

		<br><br>

		<cdx-accordion v-model="isExpanded">
			<template #title>
				Accordion controlled using v-model
			</template>

			Accordion content
		</cdx-accordion>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxAccordion, CdxToggleButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'AccordionProgrammaticControl',
	components: {
		CdxAccordion,
		CdxToggleButton
	},

	setup() {
		const isExpanded = ref( false );

		return {
			isExpanded
		};
	}
} );
</script>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

`open` Attribute supported

The Accordion component uses a HTML `<details>` element under the hood. Adding an [`open` boolean attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#open) to this component will cause it to render in the expanded state initially. All other behavior will be unchanged.

#### Props [​](#props)

| Prop name | Description | Type | Values | Default |
| --- | --- | --- | --- | --- |
| `modelValue` | This component accepts an optional v-model binding; use it if you want to programmatically control the Accordion's open/closed state. If this feature is not needed, you can omit `v-model` and just use the "open" attribute if you want the component to render in the expanded state. | `boolean\|null` | \-  | `null` |
| `actionAlwaysVisible` | Forces the accordion to show the action icon. | `boolean` | \-  | `false` |
| `actionIcon` | The icon that will be displayed on the right side of the accordion header when expanded. | `[Icon](../types-and-constants.html#icon)` | \-  | `null` |
| `actionButtonLabel` | Label for the action button. If an action icon is being used, then a label for that icon should be provided for ARIA support. | `string` | \-  | `''` |
| `headingLevel` | The heading level of the accordion title. | `[HeadingLevel](../types-and-constants.html#headinglevel)` | `'h1'`, `'h2'`, `'h3'`, `'h4'`, `'h5'`, `'h6'` | `'h3'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `action-button-click` |     | When the action button is clicked. |
| `update:modelValue` | **newVal** `boolean` | When the "open" state changes. Only emitted if v-model binding is used in the parent scope. |
| `toggle` | **isOpen** `boolean` | When the Accordion is toggled open or closed. Always emitted regardless of v-model binding. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| title | Customizable Accordion title |     |
| description | Customizable Accordion description |     |
| default | Customizable Accordion content |     |

### CSS-only version [​](#css-only-version)

#### Markup Structure [​](#markup-structure)

The CSS-only Accordion component is a `<details>` element with some custom styling.

### CSS-only Accordion Title CSS-only Accordion Description

Lorem ipsum dolor sic amet...

Show codeCopy code

html

```
<details class="cdx-accordion">
  <!-- The <summary> element must be the first child, and is required -->
  <summary>
    <!-- <summary> should contain a header; can be any heading level -->
    <h3 class="cdx-accordion__header">
      <!-- If using only a title, no <span> tags are required here;
		however, if you want a title and a description to appear on
		separate lines, you should wrap them in spans as below and
		use the appropriate class names -->
      <span class="cdx-accordion__header__title">
        CSS-only Accordion Title
      </span>
      <span class="cdx-accordion__header__description">
        CSS-only Accordion Description
      </span>
    </h3>
  </summary>
  <!-- The <details> element will treat all other children besides
	<summary> as collapsible content; it is recommended to wrap
	this content in a div with the .cdx-accordion__content class
	to get content which is aligned with the heading above. -->
  <div class="cdx-accordion__content">
    <p>Lorem ipsum dolor sic amet...</p>
  </div>
</details>
```

#### Stacked [​](#stacked)

As with the Vue version, multiple Accordion components can be stacked.

### Accordion 1

Lorem ipsum dolor sic amet...

### Accordion 2

Lorem ipsum dolor sic amet...

### Accordion 3

Lorem ipsum dolor sic amet...

Show codeCopy code

html

```
<details class="cdx-accordion">
  <summary>
    <h3 class="cdx-accordion__header">
      <span class="cdx-accordion__header__title"> Accordion 1 </span>
    </h3>
  </summary>
  <div class="cdx-accordion__content">
    <p>Lorem ipsum dolor sic amet...</p>
  </div>
</details>
<details class="cdx-accordion">
  <summary>
    <h3 class="cdx-accordion__header">
      <span class="cdx-accordion__header__title"> Accordion 2 </span>
    </h3>
  </summary>
  <div class="cdx-accordion__content">
    <p>Lorem ipsum dolor sic amet...</p>
  </div>
</details>
<details class="cdx-accordion">
  <summary>
    <h3 class="cdx-accordion__header">
      <span class="cdx-accordion__header__title"> Accordion 2 </span>
    </h3>
  </summary>
  <div class="cdx-accordion__content">
    <p>Lorem ipsum dolor sic amet...</p>
  </div>
</details>
```

##### Open by default [​](#open-by-default)

As with the Vue version, the Accordion component can default to the expanded state by using the boolean `open` attribute.

### Open by default This Accordion component is open by default

Lorem ipsum dolor sic amet...

Show codeCopy code

html

```
<details class="cdx-accordion" open>
  <summary>
    <h3 class="cdx-accordion__header">
      <span class="cdx-accordion__header__title">
        CSS-only Accordion Title
      </span>
      <span class="cdx-accordion__header__description">
        CSS-only Accordion Description
      </span>
    </h3>
  </summary>
  <div class="cdx-accordion__content">
    <p>Lorem ipsum dolor sic amet...</p>
  </div>
</details>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus to the next interactive element within the Accordion or to the next Accordion in a group. |
| Shift + Tab | It moves the focus to the previous interactive element within the Accordion or to the previous Accordion in a group. |
| Enter / Space | It expands and collapses the Accordion content. |

Pager

[Previous pageToggleSwitch](/codex/latest/components/demos/toggle-switch.html)

[Next pageCard](/codex/latest/components/demos/card.html)