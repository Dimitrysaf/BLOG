# Popover [​](#popover)

A Popover is a non-disruptive container that is overlaid on a web page or app, positioned near its trigger, in order to present necessary information and tasks.

Open Popover

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| title |     |
| icon |     |
| useCloseButton |     |
| placement | bottom |
| stackedActions |     |
| usePrimaryAction |     |
| primaryActionLabel |     |
| primaryActionType | progressive<br><br>destructive |
| useDefaultAction |     |
| defaultActionLabel |     |
| Slots |     |
| default |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

*   bottom
*   bottom-start
*   bottom-end
*   top
*   top-start
*   top-end
*   right
*   right-start
*   right-end
*   left
*   left-start
*   left-end

## Overview [​](#overview)

### When to use Popover [​](#when-to-use-popover)

The Popover component is intended to be used with other components such as a [ToggleButton](./toggle-button.html) or [Link](./../mixins/link.html). The Popover is displayed when the user interacts with the corresponding trigger element.

*   Use a ToggleButton as a trigger to emphasize what opened the Popover, setting the ToggleButton into its toggled state when triggering the Popover.
    
*   Use a Link as a trigger when the Popover is meant to serve as a preview for what pressing the link will present.
    

Popovers facilitate communication between the system and user. They perform best when used for additional information or as a workflow within a bigger task, as they don’t require loading a new page and keep actions in context.

Popovers differ from Dialogs as they are not as disruptive, since the context of the page around the Popover remains, as there is no visual overlay on the page. That being said, they should be used sparingly and only when necessary, since they inherently hide content and require an additional action to reveal it.

**Use the Popover component when:**

*   Additional information needs to be displayed and separated from the page content.
*   It is helpful to have the context of the page still within view.

**Avoid using Popover when:**

*   The information can be displayed within the main interface.
*   The content is long or complex, like a form with numerous fields.
*   Typed input is required from the user.
*   Components that take up a large amount of space need to be used in the content.
*   The information being shown is a very brief message or explanation for an element on the page. Instead, use [Tooltip](./../directives/tooltip.html).

### About Popover [​](#about-popover)

Popover includes the following elements.

#### Header [​](#header)

The Popover header can contain a decorative icon, title, or standard text. A quiet, icon-only Button may be used to close the Popover.

#### Body [​](#body)

Interactive types of content or components can be included within the Popover’s body—typically Fields or other form element types of components.

*   Avoid using Cards, other elevated components, or components requiring a lot of space within the Popover.
    

#### Footer [​](#footer)

Action buttons should appear at the start of the Popover. A primary Button (either progressive or destructive) is used to indicate the main action. A normal neutral Button can be used to indicate a default action (e.g. “Cancel”). Additionally, icon-only Buttons can be used as needed.

*   Stack action buttons based on text length when needed, placing the primary button on top.
    
*   Don't stack action buttons when they can be placed side by side.
    

#### Arrow [​](#arrow)

Popovers have an arrow which points to the trigger.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

This example includes text, a custom placement, and the ability to manually dismiss the Popover.

*   Use the header to align standard text content to the dismiss action.
    

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-toggle-button
		ref="triggerElement"
		v-model="showPopover"
		aria-label="Alert notification"
		@update:model-value="onUpdate"
	>
		<cdx-icon :icon="cdxIconBell" />
	</cdx-toggle-button>
	<cdx-popover
		v-model:open="showPopover"
		:anchor="triggerElement"
		placement="bottom-start"
		:render-in-place="true"
		title="Alerts"
		:use-close-button="true"
		:icon="cdxIconBell"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@primary="showPopover = false"
		@default="showPopover = false"
	>
		2 alerts from Wikitech and MediaWiki.
	</cdx-popover>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxPopover, CdxToggleButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconBell } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'PopoverBasic',
	components: {
		CdxPopover,
		CdxToggleButton,
		CdxIcon
	},
	setup() {
		// Template ref for the Popover's trigger element needed to properly position the Popover.
		const triggerElement = ref();
		// Toggle the button's state and popover visibility.
		const showPopover = ref( false );
		// When the toggle button's state changes, an event is emitted to update
		// the state in the parent component.
		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		// Footer action buttons.
		const defaultAction = { label: 'Cancel' };
		const primaryAction = { label: 'View notifications', actionType: 'progressive' };

		return {
			showPopover,
			onUpdate,
			triggerElement,
			cdxIconBell,
			defaultAction,
			primaryAction
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-toggle-button
		ref="triggerElement"
		v-model="showPopover"
		aria-label="Alert notification"
		@update:model-value="onUpdate"
	>
		<cdx-icon :icon="cdxIconBell"></cdx-icon>
	</cdx-toggle-button>
	<cdx-popover
		v-model:open="showPopover"
		:anchor="triggerElement"
		placement="bottom-start"
		:render-in-place="true"
		title="Alerts"
		:use-close-button="true"
		:icon="cdxIconBell"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@primary="showPopover = false"
		@default="showPopover = false"
	>
		2 alerts from Wikitech and MediaWiki.
	</cdx-popover>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxPopover, CdxToggleButton, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconBell } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'PopoverBasic',
	components: {
		CdxPopover,
		CdxToggleButton,
		CdxIcon
	},
	setup() {
		// Template ref for the Popover's trigger element needed to properly position the Popover.
		const triggerElement = ref();
		// Toggle the button's state and popover visibility.
		const showPopover = ref( false );
		// When the toggle button's state changes, an event is emitted to update
		// the state in the parent component.
		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		// Footer action buttons.
		const defaultAction = { label: 'Cancel' };
		const primaryAction = { label: 'View notifications', actionType: 'progressive' };

		return {
			showPopover,
			onUpdate,
			triggerElement,
			cdxIconBell,
			defaultAction,
			primaryAction
		};
	}
} );
</script>
```

### Developer notes

Create a template ref for the trigger element, and then pass that ref to the `anchor` prop. The `anchor` prop is required to correctly position the Popover.

Ensure the toggle button's on/off state and the popover's visibility is synchronized via `v-model`.

Usage in TypeScript

Vue 3.5 introduced the `useTemplateRef()` composable to simplify the creation of template refs in Vue components using the Composition API. If you are using TypeScript, consider annotating the types for any template refs like this:

ts

```
// Basic component typing with ComponentPublicInstance.
const anchorRef = useTemplateRef<ComponentPublicInstance>("my-anchor-id");
```

More information on typing component template refs can be found in the [Vue.js docs.](https://vuejs.org/guide/typescript/composition-api#typing-component-template-refs)

### Article preview [​](#article-preview)

This example uses the `hover` trigger since a link leads to a new page or section.

*   Use images and other media as needed to convey visual information in the Popover.
    
*   Use `hover` as a trigger only for elements which have a separate `press` action, such as a link.
    

# Did you know?

*   ... that in 1994 [Kazuyoshi Akiyama](https://en.wikipedia.org/wiki/Kazuyoshi_Akiyama "Kazuyoshi Akiyama") conducted the [Tokyo Symphony Orchestra](https://en.wikipedia.org/wiki/Tokyo_Symphony_Orchestra "Tokyo Symphony Orchestra") in the first performance of Schoenberg's [Moses und Aron](https://en.wikipedia.org/wiki/Moses_und_Aron "Moses und Aron") with Japanese musicians?
*   ... that the impact of the [Charlottetown meteorite](https://en.wikipedia.org/wiki/Charlottetown_meteorite "Charlottetown meteorite") was the first to be recorded on video and audio?
*   ... that the [Fun Lounge police raid](https://en.wikipedia.org/wiki/Fun_Lounge_police_raid "Fun Lounge police raid") is considered the main cause for the formation of [Mattachine Midwest](https://en.wikipedia.org/wiki/Mattachine_Midwest "Mattachine Midwest") , a gay rights group in Chicago?
*   ... that [the 8-Bit Big Band](https://en.wikipedia.org/wiki/The_8-Bit_Big_Band "The 8-Bit Big Band") won Nintendo their first Grammy Award?
*   ... that a person required intensive care after being [splashed with salt water](https://en.wikipedia.org/wiki/Salt_water_aspiration_syndrome "Salt water aspiration syndrome") by a beluga whale?
*   ... that [Alia Fischer](https://en.wikipedia.org/wiki/Alia_Fischer "Alia Fischer") led the first women's college basketball team to achieve back-to-back undefeated seasons?

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<h1>Did you know?</h1>
	<ul>
		<li>
			... that in 1994
			<a
				:ref="el => triggerElements[ 0 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Kazuyoshi_Akiyama"
				title="Kazuyoshi Akiyama"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Kazuyoshi Akiyama
			</a>
			conducted the
			<a
				:ref="el => triggerElements[ 1 ] = el"
				class="cdx-docs-link"
				href="https://en.wikipedia.org/wiki/Tokyo_Symphony_Orchestra"
				title="Tokyo Symphony Orchestra"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Tokyo Symphony Orchestra
			</a>
			in the first performance of Schoenberg's
			<a
				:ref="el => triggerElements[ 2 ] = el"
				class="cdx-docs-link cdx-docs-link-italic"
				href="https://en.wikipedia.org/wiki/Moses_und_Aron"
				title="Moses und Aron"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Moses und Aron
			</a>
			with Japanese musicians?
		</li>

		<li>
			... that the impact of the
			<a
				:ref="el => triggerElements[ 3 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Charlottetown_meteorite"
				title="Charlottetown meteorite"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Charlottetown meteorite
			</a>
			was the first to be recorded on video and audio?
		</li>

		<li>
			... that the
			<a
				:ref="el => triggerElements[ 4 ] = el"
				class="cdx-docs-link"
				href="https://en.wikipedia.org/wiki/Fun_Lounge_police_raid"
				title="Fun Lounge police raid"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Fun Lounge police raid
			</a>
			is considered the main cause for the formation of
			<a
				:ref="el => triggerElements[ 5 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Mattachine_Midwest"
				title="Mattachine Midwest"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Mattachine Midwest
			</a>
			, a gay rights group in Chicago?
		</li>

		<li>
			... that
			<a
				:ref="el => triggerElements[ 6 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/The_8-Bit_Big_Band"
				title="The 8-Bit Big Band"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				the 8-Bit Big Band
			</a>
			won Nintendo their first Grammy Award?
		</li>

		<li>
			... that a person required intensive care after being
			<a
				:ref="el => triggerElements[ 7 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Salt_water_aspiration_syndrome"
				title="Salt water aspiration syndrome"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				splashed with salt water
			</a>
			by a beluga whale?
		</li>

		<li>
			... that
			<a
				:ref="el => triggerElements[ 8 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Alia_Fischer"
				title="Alia Fischer"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Alia Fischer
			</a>
			led the first women's college basketball team to achieve back-to-back
			undefeated seasons?
		</li>
	</ul>

	<cdx-popover
		v-model:open="isOpen"
		:anchor="currentTrigger"
		:render-in-place="true"
		:title="currentTitle"
	>
		{{ currentPreview }}
	</cdx-popover>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxPopover } from '@wikimedia/codex';
import articlePreviews from './article-previews.json';

export default defineComponent( {
	name: 'PopoverArticlePreview',
	components: {
		CdxPopover
	},
	setup() {
		// Provide a template ref for the trigger element to properly position the Popover.
		// Store multiple template refs for anchor tags.
		const triggerElements = ref( [] );
		// Currently hovered anchor tag.
		const currentTrigger = ref( null );
		const currentTitle = ref( '' );
		const currentPreview = ref( '' );

		// Control popover's visibility.
		const isOpen = ref( false );

		// Open the Popover on hover/focus.
		const openPopover = function ( event ) {
			// eslint-disable-next-line no-console
			console.log( 'The title hovered or focused is:', event.target.title );
			const title = event.target.title;
			const foundArticle = articlePreviews.find( ( article ) => article.title === title );
			currentTrigger.value = event.target;
			currentTitle.value = foundArticle.title;
			currentPreview.value = foundArticle.preview;
			isOpen.value = true;
		};

		const closePopover = function () {
			isOpen.value = false;
		};

		return {
			isOpen,
			triggerElements,
			openPopover,
			closePopover,
			currentTitle,
			currentPreview,
			currentTrigger
		};
	}
} );
</script>

<style lang="less" scoped>
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	&-bold {
		font-weight: @font-weight-bold;
	}

	&-italic {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		font-style: italic;
	}
}

h1 {
	margin: @spacing-50 0;
	border: @border-base;
	padding: @spacing-12 @spacing-35;
	font-size: @font-size-x-large;
	font-weight: @font-weight-bold;
}
</style>
```

vue

```
<template>
	<h1>Did you know?</h1>
	<ul>
		<li>
			... that in 1994
			<a
				:ref="el => triggerElements[ 0 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Kazuyoshi_Akiyama"
				title="Kazuyoshi Akiyama"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Kazuyoshi Akiyama
			</a>
			conducted the
			<a
				:ref="el => triggerElements[ 1 ] = el"
				class="cdx-docs-link"
				href="https://en.wikipedia.org/wiki/Tokyo_Symphony_Orchestra"
				title="Tokyo Symphony Orchestra"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Tokyo Symphony Orchestra
			</a>
			in the first performance of Schoenberg's
			<a
				:ref="el => triggerElements[ 2 ] = el"
				class="cdx-docs-link cdx-docs-link-italic"
				href="https://en.wikipedia.org/wiki/Moses_und_Aron"
				title="Moses und Aron"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Moses und Aron
			</a>
			with Japanese musicians?
		</li>

		<li>
			... that the impact of the
			<a
				:ref="el => triggerElements[ 3 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Charlottetown_meteorite"
				title="Charlottetown meteorite"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Charlottetown meteorite
			</a>
			was the first to be recorded on video and audio?
		</li>

		<li>
			... that the
			<a
				:ref="el => triggerElements[ 4 ] = el"
				class="cdx-docs-link"
				href="https://en.wikipedia.org/wiki/Fun_Lounge_police_raid"
				title="Fun Lounge police raid"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Fun Lounge police raid
			</a>
			is considered the main cause for the formation of
			<a
				:ref="el => triggerElements[ 5 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Mattachine_Midwest"
				title="Mattachine Midwest"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Mattachine Midwest
			</a>
			, a gay rights group in Chicago?
		</li>

		<li>
			... that
			<a
				:ref="el => triggerElements[ 6 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/The_8-Bit_Big_Band"
				title="The 8-Bit Big Band"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				the 8-Bit Big Band
			</a>
			won Nintendo their first Grammy Award?
		</li>

		<li>
			... that a person required intensive care after being
			<a
				:ref="el => triggerElements[ 7 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Salt_water_aspiration_syndrome"
				title="Salt water aspiration syndrome"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				splashed with salt water
			</a>
			by a beluga whale?
		</li>

		<li>
			... that
			<a
				:ref="el => triggerElements[ 8 ] = el"
				class="cdx-docs-link cdx-docs-link-bold"
				href="https://en.wikipedia.org/wiki/Alia_Fischer"
				title="Alia Fischer"
				@mouseover="openPopover"
				@focus="openPopover"
				@mouseleave="closePopover"
				@blur="closePopover"
			>
				Alia Fischer
			</a>
			led the first women's college basketball team to achieve back-to-back
			undefeated seasons?
		</li>
	</ul>

	<cdx-popover
		v-model:open="isOpen"
		:anchor="currentTrigger"
		:render-in-place="true"
		:title="currentTitle"
	>
		{{ currentPreview }}
	</cdx-popover>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxPopover } = require( '@wikimedia/codex' );
const articlePreviews = require( './article-previews.json' );

module.exports = defineComponent( {
	name: 'PopoverArticlePreview',
	components: {
		CdxPopover
	},
	setup() {
		// Provide a template ref for the trigger element to properly position the Popover.
		// Store multiple template refs for anchor tags.
		const triggerElements = ref( [] );
		// Currently hovered anchor tag.
		const currentTrigger = ref( null );
		const currentTitle = ref( '' );
		const currentPreview = ref( '' );

		// Control popover's visibility.
		const isOpen = ref( false );

		// Open the Popover on hover/focus.
		const openPopover = function ( event ) {
			// eslint-disable-next-line no-console
			console.log( 'The title hovered or focused is:', event.target.title );
			const title = event.target.title;
			const foundArticle = articlePreviews.find( ( article ) => article.title === title );
			currentTrigger.value = event.target;
			currentTitle.value = foundArticle.title;
			currentPreview.value = foundArticle.preview;
			isOpen.value = true;
		};

		const closePopover = function () {
			isOpen.value = false;
		};

		return {
			isOpen,
			triggerElements,
			openPopover,
			closePopover,
			currentTitle,
			currentPreview,
			currentTrigger
		};
	}
} );
</script>

<style lang="less" scoped>
// Note: you must import the design tokens before importing the link mixin
@import 'mediawiki.skin.variables.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	&-bold {
		font-weight: @font-weight-bold;
	}

	&-italic {
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		font-style: italic;
	}
}

h1 {
	margin: @spacing-50 0;
	border: @border-base;
	padding: @spacing-12 @spacing-35;
	font-size: @font-size-x-large;
	font-weight: @font-weight-bold;
}
</style>
```

### Developer notes

The example has multiple anchor tags that displays Popover content when hovered or focused. The trigger element and Popover content is dynamically updated based on where the event took place.

*   Assign each trigger element e.g. anchor tag a template ref, and store them in the `triggerElements` array.
*   To show and hide the Popover on hover and focus, add `mouseover`, `focus`, `mouseleave`, and `blur` event listeners to the anchor tags that trigger a Popover.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Popover and `<teleport>`

Popovers rely on Vue's built-in [`<teleport>`](https://vuejs.org/guide/built-ins/teleport.html) feature. By default, Popovers will be teleported to the `<body>` element on the page, but this can be changed using Vue's [provide/inject](https://vuejs.org/guide/components/provide-inject.html) feature, with `provide( 'CdxTeleportTarget', '#my-teleport-target' )`. If Popover is being used with SSR, a dedicated teleport target should be provided.

Popover teleportation can be disabled by setting the `renderInPlace` prop.

Styling content in teleported Popovers

When a Popover is teleported (which is the default unless the `renderInPlace` prop is set), its contents will not be descendants of the element that contains the `<cdx-popover>` tag. When styling the contents of a Dialog, be careful not to use CSS selectors that assume the Dialog is inside its parent component.

For example, CSS selectors like `.my-component .cdx-popover` or `.my-component .something-inside-the-popover` won't work. Instead, set e.g. `class="my-component-popover"` on the `<cdx-popover>` tag, and use that class to style the dialog and things inside it.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `anchor` | The triggering element that opens and closes the popover. This should be a template ref, which can be either an HTML element or a Vue component.  <br>  <br>This must be provided so the popover can be positioned relative to the triggering element. | `HTMLElement\|ComponentPublicInstance\|null` | `null` |
| `open` | Whether the popover is visible. Should be provided via a v-model:open binding in the parent scope. | `boolean` | `false` |
| `title` | Title text at the top of the popover. | `string` | `''` |
| `icon` | Icon displayed at the start of the popover. | `[Icon](../types-and-constants.html#icon)` | `''` |
| `useCloseButton` | Add an icon-only close button to the popover header. | `boolean` | `false` |
| `closeButtonLabel` | Visually-hidden label text for the icon-only close button in the header.  <br>  <br>Omit this prop to use the default value, "Close". | `string` | `'Close'` |
| `primaryAction` | Primary user action. This will display a primary button with the specified action (progressive or destructive). | `[PrimaryModalAction](../types-and-constants.html#primarymodalaction)` | `null` |
| `defaultAction` | Default user action. This will display a normal button. | `[ModalAction](../types-and-constants.html#modalaction)` | `null` |
| `stackedActions` | Whether action buttons should be vertically stacked and 100% width. | `boolean` | `false` |
| `renderInPlace` | Whether to disable the use of teleport and render the Popover in its original location in the document. | `boolean` | `false` |
| `placement` | Positioning options for the Popover. | `[Placement](../types-and-constants.html#placement)` | `'bottom'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `primary` |     | When the primary action button is clicked. |
| `default` |     | When the default action button is clicked. |
| `update:open` | **newValue** `boolean` - The new open/close state (true for open, false for closed) | When the open/close state changes, e.g. when the close button is clicked. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| header | Customizable Popover header. |     |
| default | Popover body content. |     |
| footer | Customizable Popover footer. |     |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves focus to the next interactive element and, if that element is outside the Popover, it closes the Popover. |
| Shift + Tab | It moves focus to the previous interactive element and, if that element is outside the Popover, it closes the Popover. |
| Esc | It closes the Popover. |

Pager

[Previous pageMenuItem](/codex/latest/components/demos/menu-item.html)

[Next pageTable](/codex/latest/components/demos/table.html)