# Dialog [​](#dialog)

A Dialog is a container that is overlaid on a web page or app in order to present necessary information and tasks. A Dialog is sometimes referred to as a modal or an overlay.

Open dialog

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| title |     |
| subtitle |     |
| hideTitle |     |
| useCloseButton |     |
| stackedActions |     |
| usePrimaryAction |     |
| primaryActionLabel |     |
| primaryActionType | progressive<br><br>destructive |
| primaryActionDisabled |     |
| useDefaultAction |     |
| defaultActionLabel |     |
| defaultActionDisabled |     |
| Slots |     |
| default |     |
| footer-text |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Dialog [​](#when-to-use-dialog)

Dialogs facilitate communication between the system and user. They perform best when used for urgent decisions or as a workflow within a bigger task, as they don’t require loading a new page and keep actions in context.

Dialogs are intentionally disruptive, since the user needs to interact with or close the Dialog before moving on. For this reason, they should be used sparingly and only when necessary.

**Use the Dialog component when:**

*   The user needs to make a decision or provide input to the system before continuing with the task at hand.
*   Additional information needs to be displayed and separated from the page content.
*   The user needs to provide additional confirmation before taking an action.

**Avoid using Dialog when:**

*   The information can be displayed within the main interface.
*   The information is not important enough to interrupt the user's flow.
*   The content is long or complex, like a form with numerous fields, and cannot be split into multiple steps within a Dialog.

### About Dialog [​](#about-dialog)

Dialog includes the following elements.

#### Header [​](#header)

The Dialog header must contain a title, though it can be visually-hidden if the Dialog's purpose is clear from context. A subtitle can be used to provide additional information about the Dialog.

A quiet, icon-only Button may be used to close the Dialog. It can also be replaced with a text Button in some cases.

#### Body [​](#body)

Any type of content or components can be included within the Dialog’s body.

*   Avoid using Cards or other elevated components within the Dialog.

#### Footer [​](#footer)

One to two action buttons should appear at the end of the Dialog. A primary Button (either progressive or destructive) is used to indicate the main action. A normal neutral Button can be used to indicate a default action (e.g. “Cancel”).

*   Include at least one action button.
*   Stack action buttons based on text length when needed, placing the primary button on top.
*   Don't stack action buttons when they can be placed side by side.

The Dialog footer can include text above the action buttons to provide additional information (e.g. terms and conditions to read before publishing).

A permanent action can be included (e.g. a "Don't show again" checkbox) (refer to the [Multi-step Dialog](#multi-step-dialog) for an example).

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

This example includes a title, close button, footer text, primary action, and default action.

*   Write short titles and simple calls to action to help users understand what to do. [_Concise_](./../../style-guide/writing-for-copy.html#is-this-concise) & [_Clear_](./../../style-guide/writing-for-copy.html#is-this-clear)
    

Open Dialog

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Save changes"
			:use-close-button="true"
			:primary-action="primaryAction"
			:default-action="defaultAction"
			@primary="onPrimaryAction"
			@default="open = false"
		>
			<p>Do you want to save your changes?</p>

			<template #footer-text>
				You are not signed in. If you <a href="#">log in</a> or
				<a href="#">create an account</a>, your edits will be attributed to a username.
			</template>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';

import {
	CdxButton,
	CdxDialog
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogBasic',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const primaryAction = {
			label: 'Save',
			actionType: 'progressive'
		};

		const defaultAction = {
			label: 'Cancel'
		};

		function onPrimaryAction() {
			open.value = false;
			// eslint-disable-next-line no-console
			console.log( 'Primary action taken' );
		}

		return {
			open,
			primaryAction,
			defaultAction,
			onPrimaryAction
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		title="Save changes"
		:use-close-button="true"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@primary="onPrimaryAction"
		@default="open = false"
	>
		<p>Do you want to save your changes?</p>

		<template #footer-text>
			You are not signed in. If you <a href="#">log in</a> or
			<a href="#">create an account</a>, your edits will be attributed to a username.
		</template>
	</cdx-dialog>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );

const {
	CdxButton,
	CdxDialog
} = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'DialogBasic',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const primaryAction = {
			label: 'Save',
			actionType: 'progressive'
		};

		const defaultAction = {
			label: 'Cancel'
		};

		function onPrimaryAction() {
			open.value = false;
			// eslint-disable-next-line no-console
			console.log( 'Primary action taken' );
		}

		return {
			open,
			primaryAction,
			defaultAction,
			onPrimaryAction
		};
	}
} );
</script>
```

`<client-only>` tag

The examples on this page are all wrapped with VitePress's built-in [`<client-only>` component](https://vitepress.dev/reference/runtime-api#clientonly), since the Codex documentation site (built with VitePress) uses SSR. Other SSRed applications will need to do something similar (only rendering Dialog after the `mounted` hook has been fired, etc.).

This tag has been removed from the MediaWiki examples, as `<client-only>` is meaningless there.

### With form inputs [​](#with-form-inputs)

A Dialog can be used to gather user input. For long forms with many inputs, consider splitting the Dialog into multiple steps or creating a separate page instead.

Open dialog

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			class="cdx-demo-dialog-form-inputs"
			title="Dialog with form inputs"
			:use-close-button="true"
			:default-action="defaultAction"
			:primary-action="primaryAction"
			@default="open = false"
		>
			<cdx-field>
				<template #label>
					Text
				</template>
				<cdx-text-input
					v-model="inputValue"
					class="cdx-demo-dialog-form-inputs__text-input"
				/>
			</cdx-field>
			<cdx-field>
				<template #label>
					Options
				</template>
				<cdx-select
					v-model:selected="selected"
					class="cdx-demo-dialog-form-inputs__select"
					:menu-items="menuItems"
					default-label="Select an option"
				/>
			</cdx-field>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, CdxField, CdxSelect, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogWithSelect',
	components: {
		CdxButton,
		CdxDialog,
		CdxField,
		CdxSelect,
		CdxTextInput
	},
	setup() {
		const open = ref( false );

		const defaultAction = {
			label: 'Close'
		};
		const primaryAction = {
			label: 'Submit',
			actionType: 'progressive'
		};

		const inputValue = ref( '' );

		const menuItems = [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' },
			{ label: 'Option C', value: 'c' },
			{ label: 'Option D', value: 'd' }
		];
		const selected = ref( null );

		return {
			open,
			defaultAction,
			primaryAction,
			menuItems,
			selected,
			inputValue
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-dialog-form-inputs {
	&__select {
		min-width: @size-full;
	}
}
</style>
```

vue

```
<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		class="cdx-demo-dialog-form-inputs"
		title="Dialog with form inputs"
		:use-close-button="true"
		:default-action="defaultAction"
		:primary-action="primaryAction"
		@default="open = false"
	>
		<cdx-field>
			<template #label>
				Text
			</template>
			<cdx-text-input
				v-model="inputValue"
				class="cdx-demo-dialog-form-inputs__text-input"
			></cdx-text-input>
		</cdx-field>
		<cdx-field>
			<template #label>
				Options
			</template>
			<cdx-select
				v-model:selected="selected"
				class="cdx-demo-dialog-form-inputs__select"
				:menu-items="menuItems"
				default-label="Select an option"
			></cdx-select>
		</cdx-field>
	</cdx-dialog>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxButton, CdxDialog, CdxField, CdxSelect, CdxTextInput } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'DialogWithSelect',
	components: {
		CdxButton,
		CdxDialog,
		CdxField,
		CdxSelect,
		CdxTextInput
	},
	setup() {
		const open = ref( false );

		const defaultAction = {
			label: 'Close'
		};
		const primaryAction = {
			label: 'Submit',
			actionType: 'progressive'
		};

		const inputValue = ref( '' );

		const menuItems = [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' },
			{ label: 'Option C', value: 'c' },
			{ label: 'Option D', value: 'd' }
		];
		const selected = ref( null );

		return {
			open,
			defaultAction,
			primaryAction,
			menuItems,
			selected,
			inputValue
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-dialog-form-inputs {
	&__select {
		min-width: @size-full;
	}
}
</style>
```

### Stacked actions [​](#stacked-actions)

Footer actions may stack depending on the length of the text.

Open dialog

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Delete all changes?"
			:use-close-button="true"
			:stacked-actions="true"
			:primary-action="primaryAction"
			:default-action="defaultAction"
			@primary="onPrimaryAction"
			@default="open = false"
		>
			If you delete these changes, you will no longer be able to recover them.
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogStackedActions',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const primaryAction = {
			label: 'Delete all changes and start over',
			actionType: 'destructive'
		};
		const defaultAction = {
			label: 'Cancel'
		};
		function onPrimaryAction() {
			// eslint-disable-next-line no-console
			console.log( 'Primary action taken' );
			open.value = false;
		}
		return {
			open,
			primaryAction,
			defaultAction,
			onPrimaryAction
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		title="Delete all changes?"
		:use-close-button="true"
		:stacked-actions="true"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@primary="onPrimaryAction"
		@default="open = false"
	>
		If you delete these changes, you will no longer be able to recover them.
	</cdx-dialog>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxButton, CdxDialog } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'DialogStackedActions',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const primaryAction = {
			label: 'Delete all changes and start over',
			actionType: 'destructive'
		};
		const defaultAction = {
			label: 'Cancel'
		};
		function onPrimaryAction() {
			// eslint-disable-next-line no-console
			console.log( 'Primary action taken' );
			open.value = false;
		}
		return {
			open,
			primaryAction,
			defaultAction,
			onPrimaryAction
		};
	}
} );
</script>
```

### Developer notes

When using the default Dialog footer, use the `stackedActions` prop to stack the action buttons vertically.

### Custom header and footer [​](#custom-header-and-footer)

By default, the Dialog displays a header with a `title` and optional `subtitle` and close button, and a footer with optional buttons and footer text.

The entire contents of the header and footer can be replaced with custom content, layout, and styles. You could:

*   Use a text button in place of the icon-only close button in the header.
*   Use icon-only action buttons in the footer (such as previous and next buttons in a multi-step Dialog).
*   Add a permanent action in the footer (such as a "Don't show again" checkbox), which should appear next to the buttons (or above them them, in the case of stacked actions).

*   Ensure the primary action button remains in the footer and place it after the default action, if there is one.
*   When stacking action buttons, ensure they are full-width.
*   Always use a quiet Button for the close button of the Dialog.

Open Dialog

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="My custom dialog"
			class="my-custom-dialog"
		>
			<template #header>
				<div>
					<h2>My custom dialog</h2>
				</div>
				<div>
					<cdx-button
						weight="quiet"
						@click="open = false"
					>
						Close
					</cdx-button>
				</div>
			</template>

			<p>
				The header and footer slots of this dialog have been
				completely customized with custom buttons, styles, and
				markup.
			</p>

			<template #footer>
				<cdx-checkbox v-model="checkboxValue" :inline="true">
					Footer checkbox
				</cdx-checkbox>

				<cdx-button
					weight="primary"
					action="progressive"
					aria-label="Next"
					@click="open = false"
				>
					<cdx-icon :icon="cdxIconNext" />
				</cdx-button>
			</template>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, CdxCheckbox, CdxIcon } from '@wikimedia/codex';
import { cdxIconNext } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'DialogCustomHeader',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox,
		CdxIcon
	},
	setup() {
		const open = ref( false );

		const checkboxValue = ref( false );

		return {
			open,
			checkboxValue,
			cdxIconNext
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.my-custom-dialog {
	header {
		background-color: @background-color-progressive-subtle;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		// Custom bigger height.
		height: @size-800;
		padding: @spacing-100;

		h2 {
			margin: 0;
			padding: 0;
			font-size: @font-size-large;
		}
	}

	footer {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-top: @border-style-base @border-width-base @border-color-subtle;
		padding: @spacing-100;
	}
}
</style>
```

vue

```
<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		title="My custom dialog"
		class="my-custom-dialog"
	>
		<template #header>
			<div>
				<h2>My custom dialog</h2>
			</div>
			<div>
				<cdx-button
					weight="quiet"
					@click="open = false"
				>
					Close
				</cdx-button>
			</div>
		</template>

		<p>
			The header and footer slots of this dialog have been
			completely customized with custom buttons, styles, and
			markup.
		</p>

		<template #footer>
			<cdx-checkbox v-model="checkboxValue" :inline="true">
				Footer checkbox
			</cdx-checkbox>

			<cdx-button
				weight="primary"
				action="progressive"
				aria-label="Next"
				@click="open = false"
			>
				<cdx-icon :icon="cdxIconNext"></cdx-icon>
			</cdx-button>
		</template>
	</cdx-dialog>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxButton, CdxDialog, CdxCheckbox, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconNext } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'DialogCustomHeader',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox,
		CdxIcon
	},
	setup() {
		const open = ref( false );

		const checkboxValue = ref( false );

		return {
			open,
			checkboxValue,
			cdxIconNext
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.my-custom-dialog {
	header {
		background-color: @background-color-progressive-subtle;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		// Custom bigger height.
		height: @size-800;
		padding: @spacing-100;

		h2 {
			margin: 0;
			padding: 0;
			font-size: @font-size-large;
		}
	}

	footer {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-top: @border-style-base @border-width-base @border-color-subtle;
		padding: @spacing-100;
	}
}
</style>
```

### Developer notes

Override the default header and footer via the `header` and `footer` slots.

### Multi-step Dialog [​](#multi-step-dialog)

You can make a multi-step Dialog by customizing the header and footer and showing different content in the body section.

This example is based on the Growth Team's [Add a Link Dialog](https://doc.wikimedia.org/GrowthExperiments/master/js/frontend/demos/add-link-dialog.html).

Open Dialog

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Onboarding dialog"
			class="cdx-demo-onboarding-dialog"
		>
			<template #header>
				<div class="cdx-demo-onboarding-dialog__header-top">
					<h2>Introduction</h2>
					<cdx-button
						weight="quiet"
						@click="onClose"
					>
						Skip all
					</cdx-button>
				</div>

				<div class="cdx-demo-onboarding-dialog__stepper">
					<div class="cdx-demo-onboarding-dialog__stepper__label">
						{{ ( currentStep + 1 ) + ' of 3' }}
					</div>
					<div class="cdx-demo-onboarding-dialog__stepper__steps" aria-hidden>
						<span
							v-for="step of [ 0, 1, 2 ]"
							:key="step"
							class="cdx-demo-onboarding-dialog__stepper__step"
							:class="getStepClass( step )"
						/>
					</div>
				</div>
			</template>

			<div class="cdx-demo-onboarding-dialog__image">
				<img :src="images[ currentStep ]" alt="">
			</div>

			<div class="cdx-demo-onboarding-dialog__text">
				<template v-if="currentStep === 0">
					<strong>Adding links will help people learn faster.</strong>
					<p>You'll decide whether words in one article should link to other articles.</p>
					<p>No special knowledge about the article is needed to do this task.</p>
				</template>

				<template v-if="currentStep === 1">
					<strong>Suggested links are machine-generated, and can be incorrect.</strong>
					<p>
						The suggestions might be on words that don’t need them, or might link to the
						wrong article. Use your judgment to decide whether they are right or wrong.
					</p>
				</template>

				<template v-if="currentStep === 2">
					<strong>Guidelines</strong>
					<ul>
						<li>Link concepts that a reader might want to learn more about.</li>
						<li>Make sure the link is going to the right article.</li>
						<li>Don't link common words, years, or dates.</li>
						<li>If you're not sure, skip.</li>
					</ul>
				</template>
			</div>

			<template #footer>
				<cdx-checkbox v-model="checkboxValue" :inline="true">
					Don't show again
				</cdx-checkbox>

				<div class="cdx-demo-onboarding-dialog__actions">
					<cdx-button
						v-if="currentStep > 0"
						aria-label="Previous"
						@click="onDefaultAction"
					>
						<cdx-icon :icon="cdxIconPrevious" />
					</cdx-button>

					<cdx-button
						weight="primary"
						action="progressive"
						aria-label="Next"
						@click="onPrimaryAction"
					>
						<cdx-icon v-if="currentStep < 2" :icon="cdxIconNext" />
						<template v-if="currentStep === 2">
							Get started
						</template>
					</cdx-button>
				</div>
			</template>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, CdxCheckbox, CdxIcon } from '@wikimedia/codex';
import { cdxIconNext, cdxIconPrevious } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'MultistepDialog',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox,
		CdxIcon
	},
	setup() {
		const open = ref( false );

		const checkboxValue = ref( false );

		const currentStep = ref( 0 );
		const images = [
			'../../../assets/components/dialog-onboarding-image1-ltr.svg',
			'../../../assets/components/dialog-onboarding-image2-ltr.svg',
			'../../../assets/components/dialog-onboarding-image3-ltr.svg'
		];

		/**
		 * Close the dialog and reset to step 1.
		 */
		function onClose() {
			currentStep.value = 0;
			open.value = false;
		}

		/**
		 * If this is step 1 or 2, go to the next step. Otherwise, close the dialog.
		 */
		function onPrimaryAction() {
			if ( currentStep.value < 2 ) {
				currentStep.value++;
			} else {
				onClose();
			}
		}

		/**
		 * Go back a step.
		 */
		function onDefaultAction() {
			currentStep.value--;
		}

		function getStepClass( step ) {
			return {
				'cdx-demo-onboarding-dialog__stepper__step--active': step <= currentStep.value
			};
		}

		return {
			open,
			checkboxValue,
			currentStep,
			images,
			onClose,
			onPrimaryAction,
			onDefaultAction,
			getStepClass,
			cdxIconNext,
			cdxIconPrevious
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-onboarding-dialog {
	// Attempt to keep all 3 slides the same height.
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	min-height: 530px;

	header {
		padding: @spacing-100 @spacing-150;

		h2 {
			margin: 0;
			padding: 0;
			font-size: @font-size-large;
		}
	}

	&__header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__stepper {
		display: flex;
		align-items: center;
		gap: @spacing-50;

		&__label {
			color: @color-subtle;
			font-size: @font-size-small;
		}

		&__steps {
			display: flex;
			gap: @spacing-50;
		}

		&__step {
			// TODO: rebase onto main to get @background-color-interactive--active
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			background-color: #c8ccd1;
			display: block;
			width: @size-75;
			height: @size-75;
			border-radius: @border-radius-circle;

			&--active {
				background-color: @color-base;
			}
		}
	}

	.cdx-dialog__body {
		padding: 0 0 @spacing-100;
	}

	&__image {
		background-color: @background-color-progressive-subtle;
		display: flex;
		justify-content: center;

		img {
			display: block;
		}
	}

	&__text {
		padding: @spacing-100 @spacing-150;

		p {
			margin: @spacing-50 0 0;
			font-size: @font-size-small;
		}

		ul {
			margin: 0;
			padding-left: @spacing-150;
		}

		li {
			font-size: @font-size-small;
		}
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: @border-subtle;
		padding: @spacing-100 @spacing-150;
	}

	&__actions {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
```

vue

```
<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		title="Onboarding dialog"
		class="cdx-demo-onboarding-dialog"
	>
		<template #header>
			<div class="cdx-demo-onboarding-dialog__header-top">
				<h2>Introduction</h2>
				<cdx-button
					weight="quiet"
					@click="onClose"
				>
					Skip all
				</cdx-button>
			</div>

			<div class="cdx-demo-onboarding-dialog__stepper">
				<div class="cdx-demo-onboarding-dialog__stepper__label">
					{{ ( currentStep + 1 ) + ' of 3' }}
				</div>
				<div class="cdx-demo-onboarding-dialog__stepper__steps" aria-hidden>
					<span
						v-for="step of [ 0, 1, 2 ]"
						:key="step"
						class="cdx-demo-onboarding-dialog__stepper__step"
						:class="getStepClass( step )"
					></span>
				</div>
			</div>
		</template>

		<div class="cdx-demo-onboarding-dialog__image">
			<img :src="images[ currentStep ]" alt="">
		</div>

		<div class="cdx-demo-onboarding-dialog__text">
			<template v-if="currentStep === 0">
				<strong>Adding links will help people learn faster.</strong>
				<p>You'll decide whether words in one article should link to other articles.</p>
				<p>No special knowledge about the article is needed to do this task.</p>
			</template>

			<template v-if="currentStep === 1">
				<strong>Suggested links are machine-generated, and can be incorrect.</strong>
				<p>
					The suggestions might be on words that don’t need them, or might link to the
					wrong article. Use your judgment to decide whether they are right or wrong.
				</p>
			</template>

			<template v-if="currentStep === 2">
				<strong>Guidelines</strong>
				<ul>
					<li>Link concepts that a reader might want to learn more about.</li>
					<li>Make sure the link is going to the right article.</li>
					<li>Don't link common words, years, or dates.</li>
					<li>If you're not sure, skip.</li>
				</ul>
			</template>
		</div>

		<template #footer>
			<cdx-checkbox v-model="checkboxValue" :inline="true">
				Don't show again
			</cdx-checkbox>

			<div class="cdx-demo-onboarding-dialog__actions">
				<cdx-button
					v-if="currentStep > 0"
					aria-label="Previous"
					@click="onDefaultAction"
				>
					<cdx-icon :icon="cdxIconPrevious"></cdx-icon>
				</cdx-button>

				<cdx-button
					weight="primary"
					action="progressive"
					aria-label="Next"
					@click="onPrimaryAction"
				>
					<cdx-icon v-if="currentStep < 2" :icon="cdxIconNext"></cdx-icon>
					<template v-if="currentStep === 2">
						Get started
					</template>
				</cdx-button>
			</div>
		</template>
	</cdx-dialog>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxButton, CdxDialog, CdxCheckbox, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconNext, cdxIconPrevious } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'MultistepDialog',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox,
		CdxIcon
	},
	setup() {
		const open = ref( false );

		const checkboxValue = ref( false );

		const currentStep = ref( 0 );
		const images = [
			'../../../assets/components/dialog-onboarding-image1-ltr.svg',
			'../../../assets/components/dialog-onboarding-image2-ltr.svg',
			'../../../assets/components/dialog-onboarding-image3-ltr.svg'
		];

		/**
		 * Close the dialog and reset to step 1.
		 */
		function onClose() {
			currentStep.value = 0;
			open.value = false;
		}

		/**
		 * If this is step 1 or 2, go to the next step. Otherwise, close the dialog.
		 */
		function onPrimaryAction() {
			if ( currentStep.value < 2 ) {
				currentStep.value++;
			} else {
				onClose();
			}
		}

		/**
		 * Go back a step.
		 */
		function onDefaultAction() {
			currentStep.value--;
		}

		function getStepClass( step ) {
			return {
				'cdx-demo-onboarding-dialog__stepper__step--active': step <= currentStep.value
			};
		}

		return {
			open,
			checkboxValue,
			currentStep,
			images,
			onClose,
			onPrimaryAction,
			onDefaultAction,
			getStepClass,
			cdxIconNext,
			cdxIconPrevious
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-onboarding-dialog {
	// Attempt to keep all 3 slides the same height.
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	min-height: 530px;

	header {
		padding: @spacing-100 @spacing-150;

		h2 {
			margin: 0;
			padding: 0;
			font-size: @font-size-large;
		}
	}

	&__header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__stepper {
		display: flex;
		align-items: center;
		gap: @spacing-50;

		&__label {
			color: @color-subtle;
			font-size: @font-size-small;
		}

		&__steps {
			display: flex;
			gap: @spacing-50;
		}

		&__step {
			// TODO: rebase onto main to get @background-color-interactive--active
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			background-color: #c8ccd1;
			display: block;
			width: @size-75;
			height: @size-75;
			border-radius: @border-radius-circle;

			&--active {
				background-color: @color-base;
			}
		}
	}

	.cdx-dialog__body {
		padding: 0 0 @spacing-100;
	}

	&__image {
		background-color: @background-color-progressive-subtle;
		display: flex;
		justify-content: center;

		img {
			display: block;
		}
	}

	&__text {
		padding: @spacing-100 @spacing-150;

		p {
			margin: @spacing-50 0 0;
			font-size: @font-size-small;
		}

		ul {
			margin: 0;
			padding-left: @spacing-150;
		}

		li {
			font-size: @font-size-small;
		}
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: @border-subtle;
		padding: @spacing-100 @spacing-150;
	}

	&__actions {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

The parent component controls whether the Dialog is open via `v-model:open`.

A Dialog can offer two kinds of actions (represented by buttons of the appropriate type): primary action (can be progressive or destructive), and default action (typically a safe option like "cancel").

When open, the Dialog adds a class to the document body to prevent scrolling; this is applied whether or not teleport is used.

Attributes passed to inner element

This component forwards any attributes applied by the user to the inner `.cdx-dialog` element, instead of applying them to the outermost backdrop element.

Dialog and `<teleport>`

Dialogs rely on Vue's built-in [`<teleport>`](https://vuejs.org/guide/built-ins/teleport.html) feature. By default, Dialogs will be teleported to the `<body>` element on the page, but this can be changed using Vue's [provide/inject](https://vuejs.org/guide/components/provide-inject.html) feature, with `provide( 'CdxTeleportTarget', '#my-teleport-target' )`. If Dialog is being used with SSR, a dedicated teleport target should be provided.

Dialog teleportation can be disabled by setting the `renderInPlace` prop.

Styling content in teleported Dialogs

When a Dialog is teleported (which is the default unless the `renderInPlace` prop is set), its contents will not be descendants of the element that contains the `<cdx-dialog>` tag. When styling the contents of a Dialog, be careful not to use CSS selectors that assume the Dialog is inside its parent component.

For example, CSS selectors like `.my-component .cdx-dialog` or `.my-component .something-inside-the-dialog` won't work. Instead, set e.g. `class="my-component-dialog"` on the `<cdx-dialog>` tag, and use that class to style the dialog and things inside it.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `open` | Whether the dialog is visible. Should be provided via a v-model:open binding in the parent scope. | `boolean` | `false` |
| `title`(required) | Title for the dialog header. Used for ARIA purposes even if no visible header element is displayed. | `string` |     |
| `subtitle` | Optional subtitle for the dialog. | `string` | `null` |
| `hideTitle` | Whether the dialog header should hide the title & subtitle | `boolean` | `false` |
| `useCloseButton` | Add an icon-only close button to the dialog header. | `boolean` | `false` |
| `closeButtonLabel` | Visually-hidden label text for the icon-only close button in the header.  <br>  <br>Omit this prop to use the default value, "Close". | `string` | `''` |
| `primaryAction` | Primary user action. This will display a primary button with the specified action (progressive or destructive). | `[PrimaryModalAction](../types-and-constants.html#primarymodalaction)` | `null` |
| `defaultAction` | Default user action. This will display a normal button. | `[ModalAction](../types-and-constants.html#modalaction)` | `null` |
| `stackedActions` | Whether action buttons should be vertically stacked and 100% width. | `boolean` | `false` |
| `target` | Selector or DOM element identifying the container the dialog should be rendered in. The dialog will be `<teleport>`ed to this element. An ID selector is recommended, e.g. `#foo-bar`, but providing an actual element is also supported.  <br>  <br>If this prop is not set, and the parent or one of its ancestors provides a teleport target using `provide( 'CdxTeleportTarget', '#foo-bar' )`, the provided target will be used. If there is no provided target, the dialog will be teleported to the end of the `<body>` element. | `string\|HTMLElement\|null` | `null` |
| `renderInPlace` | Whether to disable the use of teleport and render the Dialog in its original location in the document. If this is true, the `target` prop is ignored. | `boolean` | `false` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `primary` |     | When the primary action button is clicked. |
| `default` |     | When the default action button is clicked. |
| `update:open` | **newValue** `boolean` - The new open/close state (true for open, false for closed) | When the open/close state changes, e.g. when the close button is clicked. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| header | Customizable Dialog header |     |
| default | Dialog content |     |
| footer | Customizable Dialog footer |     |
| footer-text | Optional footer text |     |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus to the next interactive element in tab order within the Dialog. |
| Shift + Tab | It moves the focus to the previous interactive element within the Dialog. |
| Enter | If the focus is placed on one of the Dialog’s buttons, it activates the button. |
| Esc | It closes the Dialog. |

Pager

[Previous pageCard](/codex/latest/components/demos/card.html)

[Next pageMenu](/codex/latest/components/demos/menu.html)