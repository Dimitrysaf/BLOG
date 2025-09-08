# Using links and buttons [​](#using-links-and-buttons)

An overarching guide for when to use links, buttons, and groups of both.

## Links versus buttons [​](#links-versus-buttons)

Use a [Link](./../components/mixins/link.html) when navigating to a different resource or section on the same page, and use a [Button](./../components/demos/button.html) to perform an action.

Making the difference between Links and Buttons is important to help inform the user of an expected interaction, especially for keyboard and screen reader users. **A Button should not be styled as a Link and a Link should not be styled as a Button.**

*   Avoid styling an anchor tag `<a>` as a button and instead use a Codex [Button](./../components/demos/button.html).
    
*   Avoid styling a button tag `<button>` as a link and instead use a Codex [Link](./../components/mixins/link.html).
    

There are, however, exceptions to this guidance, where the visual style is absolutely necessary to emphasize a link. In such cases, such as “Donate” or “Register” actions which link to another page, [use these guidelines](./../components/demos/button.html#link-buttons-and-other-elements) to implement a Link which visually appears as a Button, but is semantically a different type of element.

Accessibility note

Links can be activated using only the Enter or Return key, while Buttons can be activated using both the Enter or Return key as well as the Space key.

## Group of links and buttons [​](#group-of-links-and-buttons)

Links and Buttons can be used in the same group next to one another.

**Be conscious of the fact that quiet progressive Buttons can look similar to Links, so avoid using them next to each other.**

### Spacing [​](#spacing)

A Button next to a Link or another Button should have `@spacing-75` (equivalent to 12px in the default Codex theme) as the default [spacing token](./../design-tokens/spacing.html). Links next to Links should also have `@spacing-75` as the default spacing token.

[Link](#)[Link](#) Button Button

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-demo-buttons-and-links">
		<a class="cdx-docs-link" href="#">Link</a>
		<a class="cdx-docs-link" href="#">Link</a>
		<cdx-button>
			Button
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Button
		</cdx-button>
		<cdx-button aria-label="More" @click="onClick">
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonsAndLinks',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconEllipsis,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-buttons-and-links {
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: @spacing-75;
}
</style>
```

vue

```
<template>
	<div class="cdx-demo-buttons-and-links">
		<a class="cdx-docs-link" href="#">Link</a>
		<a class="cdx-docs-link" href="#">Link</a>
		<cdx-button>
			Button
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Button
		</cdx-button>
		<cdx-button aria-label="More" @click="onClick">
			<cdx-icon :icon="cdxIconEllipsis"></cdx-icon>
		</cdx-button>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconEllipsis } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'ButtonsAndLinks',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconEllipsis,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-buttons-and-links {
	display: flex;
	align-items: center;
	flex-direction: row;
	gap: @spacing-75;
}
</style>
```

## Links [​](#links)

Use Link to provide users with a clickable element to navigate to other pages or to other sections of the same page (such as citations and other wiki pages).

Avoid using Link to perform an action (such as “hide” or "edit" when using VisualEditor). In the case of an action that appears as a button, but loads a different page, a link should still be used (such as “edit” when _not_ using VisualEditor).

**Links are not underlined by default.**

*   By default, links are only underlined when they are hovered over or pressed.
*   In MediaWiki, to suit user preferences and for accessibility reasons, having links underlined by default can be enabled within Preferences > Appearance > Advanced options.

**Links are used as text only.**

*   An exception to this is a Link that opens in a new tab or window, such as the [External links](https://en.wikipedia.org/wiki/Wikipedia#External_links) at the bottom of a Wikipedia article. These external links must use the external link icon, `cdxIconLinkExternal`, in addition to the text to denote a destination outside of the current domain.
*   Links should not be icons alone.

**Link font styling can be changed as needed.**

*   Any of the Codex font size tokens can be used.
*   Fonts should remain the size of the surrounding text when a part of other content.
*   Use the Regular weight by default for Links.
*   Links may be Bold or Italic when a part of surrounding text where that text is also Bold or Italic or when they need to be emphasized apart from default Links, such as in examples provided on the [main page](https://en.wikipedia.org/wiki/Main_Page) of Wikipedia.

### Base Link [​](#base-link)

Use [base Links](./../components/mixins/link.html#base-link) (blue) as the default Link type.

### Red Link [​](#red-link)

Use [red Links](./../components/mixins/link.html#red-link) only to represent wiki pages that do not exist yet.

## Group of links [​](#group-of-links)

When Link content is related, it's advisable to combine them into a group. A group of Links can include any number of Links.

### Spacing [​](#spacing-1)

Use `@spacing-75` as the default spacing token between Links in a group, both horizontal and vertical (stacked).

Group of multiple links can be presented in various ways:

1.  As a single vertical column, such as the Table of Contents on an [article page](https://en.wikipedia.org/wiki/Wikipedia).
    
2.  When there are too many links, they can be organized into different columns, such as the link groups within the languages panel on [wikipedia.org](https://www.wikipedia.org/).
    
3.  As a horizontal line, such as the footer links on an [article page](https://en.wikipedia.org/wiki/Wikipedia).
    

## Buttons [​](#buttons)

Use Button when you want to trigger an action.

Avoid using Button to navigate the user to a new page. In such case, use a Link instead.

### Type of action [​](#type-of-action)

A Button can convey one of three `action` types.

1.  **Neutral**  
    Use for neutral or secondary actions.
2.  **Progressive**  
    Use for main actions or actions that lead to the next step in a process.
3.  **Destructive**  
    Use only for actions that cannot be undone.

### Type of weight [​](#type-of-weight)

A Button can convey one of three `weight` types.

1.  **Primary**  
    Use for main actions.
2.  **Normal**  
    Use for secondary actions.
3.  **Quiet**  
    Use for tertiary actions or when you want to avoid distracting from the content.

Normal neutral Quiet neutral

Normal progressive Primary progressive Quiet progressive

Normal destructive Primary destructive Quiet destructive

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-demo-button-types">
		<div class="cdx-demo-button-types__neutral">
			<cdx-button>
				Normal neutral
			</cdx-button>
			<cdx-button weight="quiet">
				Quiet neutral
			</cdx-button>
		</div>
		<div class="cdx-demo-button-types__progressive">
			<cdx-button action="progressive">
				Normal progressive
			</cdx-button>
			<cdx-button action="progressive" weight="primary">
				Primary progressive
			</cdx-button>
			<cdx-button action="progressive" weight="quiet">
				Quiet progressive
			</cdx-button>
		</div>
		<div class="cdx-demo-button-types__destructive">
			<cdx-button action="destructive">
				Normal destructive
			</cdx-button>
			<cdx-button action="destructive" weight="primary">
				Primary destructive
			</cdx-button>
			<cdx-button action="destructive" weight="quiet">
				Quiet destructive
			</cdx-button>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ButtonTypes',
	components: { CdxButton }
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-button-types {
	display: flex;
	flex-direction: column;
	gap: @spacing-100;

	> div {
		display: flex;
		gap: @spacing-75;
	}
}
</style>
```

vue

```
<template>
	<div class="cdx-demo-button-types">
		<div class="cdx-demo-button-types__neutral">
			<cdx-button>
				Normal neutral
			</cdx-button>
			<cdx-button weight="quiet">
				Quiet neutral
			</cdx-button>
		</div>
		<div class="cdx-demo-button-types__progressive">
			<cdx-button action="progressive">
				Normal progressive
			</cdx-button>
			<cdx-button action="progressive" weight="primary">
				Primary progressive
			</cdx-button>
			<cdx-button action="progressive" weight="quiet">
				Quiet progressive
			</cdx-button>
		</div>
		<div class="cdx-demo-button-types__destructive">
			<cdx-button action="destructive">
				Normal destructive
			</cdx-button>
			<cdx-button action="destructive" weight="primary">
				Primary destructive
			</cdx-button>
			<cdx-button action="destructive" weight="quiet">
				Quiet destructive
			</cdx-button>
		</div>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'ButtonTypes',
	components: { CdxButton }
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-button-types {
	display: flex;
	flex-direction: column;
	gap: @spacing-100;

	> div {
		display: flex;
		gap: @spacing-75;
	}
}
</style>
```

### With icon [​](#with-icon)

Use an icon with the button label when you need to convey meaning through both textual and visual elements.

Download

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button @click="onClick">
		<cdx-icon :icon="cdxIconDownload" />
		Download
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconDownload } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconDownload,
			onClick
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-button @click="onClick">
		<cdx-icon :icon="cdxIconDownload"></cdx-icon>
		Download
	</cdx-button>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconDownload } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconDownload,
			onClick
		};
	}
} );
</script>
```

### Icon-only button [​](#icon-only-button)

Use an icon-only button for actions that can be universally recognized through the icon alone. For an icon-only Button, the label is visually hidden but available to assistive technology users.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button aria-label="Back" @click="onClick">
		<cdx-icon :icon="cdxIconEdit" />
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEdit } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconEdit,
			onClick
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-button aria-label="Back" @click="onClick">
		<cdx-icon :icon="cdxIconEdit"></cdx-icon>
	</cdx-button>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconEdit } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'IconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconEdit,
			onClick
		};
	}
} );
</script>
```

### Disabled button [​](#disabled-button)

Buttons may be disabled, but disabled buttons should be used sparingly.

*   Use disabled Buttons only when one input or interaction will enable the Button.
*   Avoid using disabled Buttons at the end of a form with multiple fields. Instead, use inline validation to inform of what might be incomplete or incorrect.

URL or citation

URL's should use a format such as http://example.com

Generate

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<form>
		<cdx-field>
			<cdx-text-input
				ref="textInput"
				v-model="inputValue"
				placeholder="e.g. http://example.com"
				input-type="url"
				@input="onInput"
			/>
			<template #label>
				URL or citation
			</template>
			<template #help-text>
				URL's should use a format such as http://example.com
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-demo-form-button"
			:disabled="isDisabled"
			@click.prevent="onSubmit"
		>
			Generate
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
	CdxButton,
	CdxField,
	CdxTextInput
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'FieldWithValidation',
	components: {
		CdxButton,
		CdxField,
		CdxTextInput
	},
	setup() {
		const textInput = ref();
		const inputValue = ref( '' );
		const isDisabled = ref( true );

		function onInput() {
			isDisabled.value = !textInput.value.checkValidity() || inputValue.value.length === 0;
		}

		function onSubmit() {
			// eslint-disable-next-line no-console
			console.log( 'Success!' );
		}

		return {
			textInput,
			inputValue,
			isDisabled,
			onInput,
			onSubmit
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-form-button {
	margin-top: @spacing-75;
}
</style>
```

vue

```
<template>
	<form>
		<cdx-field>
			<cdx-text-input
				ref="textInput"
				v-model="inputValue"
				placeholder="e.g. http://example.com"
				input-type="url"
				@input="onInput"
			></cdx-text-input>
			<template #label>
				URL or citation
			</template>
			<template #help-text>
				URL's should use a format such as http://example.com
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-demo-form-button"
			:disabled="isDisabled"
			@click.prevent="onSubmit"
		>
			Generate
		</cdx-button>
	</form>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const {
	CdxButton,
	CdxField,
	CdxTextInput
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'FieldWithValidation',
	components: {
		CdxButton,
		CdxField,
		CdxTextInput
	},
	setup() {
		const textInput = ref();
		const inputValue = ref( '' );
		const isDisabled = ref( true );

		function onInput() {
			isDisabled.value = !textInput.value.checkValidity() || inputValue.value.length === 0;
		}

		function onSubmit() {
			// eslint-disable-next-line no-console
			console.log( 'Success!' );
		}

		return {
			textInput,
			inputValue,
			isDisabled,
			onInput,
			onSubmit
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-form-button {
	margin-top: @spacing-75;
}
</style>
```

## Group of buttons [​](#group-of-buttons)

A group of Buttons usually includes 2 to 3 Buttons. When more actions are needed in a group of Buttons, use a [MenuButton](./../components/demos/menu-button.html), which triggers a menu with any additional actions.

Buttons should be combined in a group when they relate to the same affected general element, such as footer actions within a Dialog and actions at the end of a form or the top of a Table.

Download New item

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-demo-group-buttons">
		<!-- <cdx-button aria-label="More" @click="onClick">
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-button> -->
		<cdx-menu-button
			v-model:selected="selection"
			:menu-items="menuItems"
			aria-label="More options"
		>
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-menu-button>
		<cdx-button>
			<cdx-icon :icon="cdxIconDownload" /> Download
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			<cdx-icon :icon="cdxIconAdd" /> New item
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxIcon, CdxMenuButton } from '@wikimedia/codex';
import { cdxIconAdd, cdxIconCheck, cdxIconDownload, cdxIconEdit, cdxIconEllipsis, cdxIconSpeechBubble } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Edit', value: 'edit', icon: cdxIconEdit },
	{ label: 'Discuss', value: 'discuss', icon: cdxIconSpeechBubble },
	{ label: 'Done', value: 'done', icon: cdxIconCheck }
];

export default defineComponent( {
	name: 'GroupOfButtons',
	components: {
		CdxButton,
		CdxIcon,
		CdxMenuButton
	},
	setup() {
		const selection = ref( null );
		return {
			cdxIconAdd,
			cdxIconDownload,
			selection,
			menuItems,
			cdxIconEllipsis
		};
	}
} );
</script>
```

vue

```
<template>
	<div class="cdx-demo-group-buttons">
		<!-- <cdx-button aria-label="More" @click="onClick">
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-button> -->
		<cdx-menu-button
			v-model:selected="selection"
			:menu-items="menuItems"
			aria-label="More options"
		>
			<cdx-icon :icon="cdxIconEllipsis"></cdx-icon>
		</cdx-menu-button>
		<cdx-button>
			<cdx-icon :icon="cdxIconDownload"></cdx-icon> Download
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			<cdx-icon :icon="cdxIconAdd"></cdx-icon> New item
		</cdx-button>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxButton, CdxIcon, CdxMenuButton } = require( '@wikimedia/codex' );
const { cdxIconAdd, cdxIconCheck, cdxIconDownload, cdxIconEdit, cdxIconEllipsis, cdxIconSpeechBubble } = require( './icons.json' );

const menuItems = [
	{ label: 'Edit', value: 'edit', icon: cdxIconEdit },
	{ label: 'Discuss', value: 'discuss', icon: cdxIconSpeechBubble },
	{ label: 'Done', value: 'done', icon: cdxIconCheck }
];

module.exports = defineComponent( {
	name: 'GroupOfButtons',
	components: {
		CdxButton,
		CdxIcon,
		CdxMenuButton
	},
	setup() {
		const selection = ref( null );
		return {
			cdxIconAdd,
			cdxIconDownload,
			selection,
			menuItems,
			cdxIconEllipsis
		};
	}
} );
</script>
```

*   Edit
*   Discuss
*   Done

When actions are direct siblings of one another, affecting a more focused element, a [ButtonGroup](./../components/demos/button-group.html) should be used. An example of this is a set of actions to “Edit”, "Discuss", mark "Done", “Download”, or “Delete” the same element.

Edit Discuss Done Download Delete

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconDownload, cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonGroupWithIcons',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'edit', label: 'Edit', icon: cdxIconEdit },
			{ value: 'talk', label: 'Discuss', icon: cdxIconSpeechBubble },
			{ value: 'save', label: 'Done', icon: cdxIconCheck },
			{ value: 'download', label: 'Download', icon: cdxIconDownload },
			{ value: 'delete', label: 'Delete', icon: cdxIconTrash }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	></cdx-button-group>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButtonGroup } = require( '@wikimedia/codex' );
const { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconDownload, cdxIconTrash } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'ButtonGroupWithIcons',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'edit', label: 'Edit', icon: cdxIconEdit },
			{ value: 'talk', label: 'Discuss', icon: cdxIconSpeechBubble },
			{ value: 'save', label: 'Done', icon: cdxIconCheck },
			{ value: 'download', label: 'Download', icon: cdxIconDownload },
			{ value: 'delete', label: 'Delete', icon: cdxIconTrash }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
```

### Spacing [​](#spacing-2)

Use `@spacing-75` as the default spacing token between Buttons in a group, both horizontal and vertical (stacked). This spacing guidance does not pertain to [ButtonGroup](./../components/demos/button-group.html) or [ToggleButtonGroup](./../components/demos/toggle-button-group.html).

### Types and Order of Buttons [​](#types-and-order-of-buttons)

Using the right action, weight, and order of Buttons is important to help users understand the different actions they can take.

#### Hierarchy [​](#hierarchy)

1.  **Primary actions** should be represented by a primary progressive Button. Use only one primary progressive Button in a group of Buttons.
2.  **Secondary actions** can accompany the primary progressive Button as normal Buttons.
3.  **Tertiary actions** are less important or less used actions should appear as quiet Buttons.

*   A group of Buttons can include any combination of these levels. For example, for a group with a primary action and a less important tertiary action, use a primary progressive Button and a quiet Button. A group with no primary action will only have normal and quiet Buttons.
*   Avoid using only a progressive and destructive action together, without a neutral action, to prevent the user from having to make a polarizing, permanent decision.
*   When using a destructive Button, keep in mind that the color outweighs progressive and neutral colors (in the default Codex theme).

Cancel Save Submit

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-demo-group-buttons">
		<cdx-button weight="quiet">
			Cancel
		</cdx-button>
		<cdx-button>
			Save
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Submit
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ButtonHierarchy',
	components: {
		CdxButton
	}
} );
</script>
```

vue

```
<template>
	<div class="cdx-demo-group-buttons">
		<cdx-button weight="quiet">
			Cancel
		</cdx-button>
		<cdx-button>
			Save
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Submit
		</cdx-button>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'ButtonHierarchy',
	components: {
		CdxButton
	}
} );
</script>
```

#### Order [​](#order)

*   When stacking buttons (typically on smaller viewports), place the most important Button at the top.
*   Maintain the same order for a stacked group of Buttons in both left-to-right (LTR) and right-to-left (RTL) reading directions.
*   Avoid placing a destructive Button next to a progressive Button. Instead, consider separating them to opposite sides of the container or using a neutral Button for one of the actions.

INFO

The order of a stacking group of Buttons does not change with bidirectionality.

### Forward moving processes (forms, Dialogs, etc.) [​](#forward-moving-processes-forms-dialogs-etc)

*   When a group of buttons is part of a flow, place the most important Button at the end.
*   Buttons in the footer of a form, whether single step or multi-step should be aligned to the leftmost edge of the overall container for LTR and the rightmost edge of the overall container for RTL.
*   Buttons in the footer of a Dialog, whether single step or multi-step should be aligned to the rightmost edge of the overall container for LTR and the leftmost edge of the overall container for RTL.

#### Multi-step [​](#multi-step)

For multi-step processes, align a back Button next to the forward Button. The back Button should be of less visual hierarchy than the forward Button. Usually it comes second in the hierarchy. For example, “Next” is set as a progressive primary Button on the right for LTR or the left for RTL, next to that would be “Previous” set as a neutral normal Button, and next to that might be a tertiary action set as a neutral quiet Button (such as “Skip”). In Dialogs, the "Skip" action may also be in the header.

Skip Previous Next

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-demo-group-buttons">
		<cdx-button weight="quiet">
			Skip
		</cdx-button>
		<cdx-button>
			Previous
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Next
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiStepButtons',
	components: {
		CdxButton
	}
} );
</script>
```

vue

```
<template>
	<div class="cdx-demo-group-buttons">
		<cdx-button weight="quiet">
			Skip
		</cdx-button>
		<cdx-button>
			Previous
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			Next
		</cdx-button>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'MultiStepButtons',
	components: {
		CdxButton
	}
} );
</script>
```

Pager

[Previous pageContent overflow](/codex/main/style-guide/content-overflow.html)

[Next pageConstructing forms](/codex/main/style-guide/constructing-forms.html)