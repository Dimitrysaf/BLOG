# Button
A Button triggers an action when the user clicks or taps on it.

| Name | Value |
|---|---|
|Props||
|`action`|`default` `progressive` `destructive`|
|`weight`|`normal` `primary` `quite`|
|`size`|`small` `medium` `large`|
|`disabled`|`disabled`|
|Slots||
|`default`|`Click me`|
|View||
|Reading direction|LTR, RTL|

## Overview
### When to use Button
Use the Button component when you want to trigger an action or toggle something in the user's current context.

Avoid using Button when:

* The action is to navigate the user to a new resource, which would take them away from the current context. In such cases, consider [Link](https://doc.wikimedia.org/codex/latest/components/mixins/link.html) instead. Learn more about [using links and buttons](https://doc.wikimedia.org/codex/latest/style-guide/using-links-and-buttons.html).<br>
* You need to represent state-persistent user actions. In this case, use [ToggleButton](https://doc.wikimedia.org/codex/latest/components/demos/toggle-button.html) instead.

### About Button
Button includes the following elements.

### Label
Button labels should be as short as possible, with text that clearly states what action follows clicking the button (e.g. download, submit form, search).

Buttons labels should ideally be fewer than 38 characters in English, as translations average 42 characters. Logographic and Arabic-script languages are generally shorter, while Romance, some Germanic, Slavic, Austronesian, and others like Greek and Finnish tend to be longer, averaging 45–53 characters.

✅Use descriptive, accessible verbs to encourage action. [Concise](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-concise) & [Accessible](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-accessible)

✅Write in sentence case, capitalizing only the first word. [Consistent](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-consistent)

✅Answer direct questions in titles or body copy using the same terminology. [Clear](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear)

⚠️Avoid using similar words for different actions. [Clear](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-clear)

⚠️Avoid verbs that imply visual or sensory abilities such as "see", or are idiomatic or vague. [Accessible](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-accessible) & [Translatable](https://doc.wikimedia.org/codex/latest/style-guide/writing-for-copy.html#is-this-translatable)

### Icon (optional)
Icons simplify user recognition and provide the ability to shorten Button labels to a minimum. When the Button includes a label, the icon is optional and should be used to add a clear visual reinforcement to the label. If the Button is icon-only, it should use a universally recognizable icon, such as the “edit” action.

✅Ensure that icons used in buttons are relevant and easily recognizable.<br>
⚠️Avoid using icons that are difficult to recognize or do not clearly convey their purpose.

## Examples
### Button types
#### Button action
A Button can convey one of three action types.

1. Neutral<br>
Use neutral buttons for actions that are neutral or secondary in importance.
2. Progressive<br>
Use progressive buttons for actions that lead to the next step in the process.
3. Destructive<br>
Reserve destructive buttons for actions that involve removal or limitation, such as deleting a page or blocking a user. Avoid using them for actions like cancel buttons.

#### Button weight
A Button can convey one of three `weight` types.

1. Normal<br>
When designing a project, normal buttons are the default choice.
2. Primary<br>
Primary buttons signal the main action in a given view – a page or a dialog. As they should guide the user to the most important action (“call to action”), there should only be one primary button per view.
3. Quiet<br>
Use quiet buttons for an easily recognizable action that does not detract focus from the content. For example, the icon-only edit buttons alongside sections in an article on mobile Wikipedia.

```vue
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

#### Button sizes
Buttons can be small, medium (default) or large `size`.

1. Small
Use the small size only when space is tight: for example, inline with text or in compact layouts.<br>
✅Use lowercase letters to make the button fit better with surrounding text.<br>
⚠️Avoid using small buttons on touchable screens.
2. Medium
Use medium as the standard button size.
3. Large
Use the large size to support accessibility on touchscreens by increasing the touch area.

By default, the width of a Button with text is determined by the width of the text until reaching a max-width. However, on mobile, Buttons should span the full-width of the container, except for icon-only Buttons, which will maintain their fixed square proportions.

```vue
<template>
	<table class="cdx-demo-button-sizes">
		<caption>
			Button size examples for all supported <code>size</code> values.
		</caption>
		<thead>
			<tr>
				<th>Size</th>
				<th>Min-size</th>
				<th>Text button</th>
				<th>Icon-only button</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					<span>Small</span>
				</td>
				<td>
					<span>24px</span>
				</td>
				<td>
					<cdx-button size="small" @click="onClick">
						small button
					</cdx-button>
				</td>
				<td>
					<cdx-button
						aria-label="Small button example"
						size="small"
						@click="onClick">
						<cdx-icon size="small" :icon="cdxIconBell" />
					</cdx-button>
				</td>
			</tr>
			<tr>
				<td>
					<span>Medium</span>
				</td>
				<td>
					<span>32px</span>
				</td>
				<td>
					<cdx-button @click="onClick">
						Medium button
					</cdx-button>
				</td>
				<td>
					<cdx-button aria-label="Medium button example" @click="onClick">
						<cdx-icon :icon="cdxIconBell" />
					</cdx-button>
				</td>
			</tr>
			<tr>
				<td>
					<span>Large</span>
				</td>
				<td>
					<span>44px</span>
				</td>
				<td>
					<cdx-button size="large" @click="onClick">
						Large button
					</cdx-button>
				</td>
				<td>
					<cdx-button
						aria-label="Large button example"
						size="large"
						@click="onClick"
					>
						<cdx-icon :icon="cdxIconBell" />
					</cdx-button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconBell } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonSizes',
	components: { CdxButton, CdxIcon },
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconBell,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-button-sizes {
	table {
		width: @size-full;
	}

	caption {
		margin-top: @spacing-25;
		text-align: left;
		caption-side: bottom;
	}
}
</style>
```
Developer notes
Set min-width manually on Buttons with extremely short labels. Buttons with text labels of only 1-2 characters in length may fall below size of the target area described above. In these cases, set a minimum width of @min-size-interactive-pointer in your own CSS.

#### With icon
Use an icon with the button label when you need to convey meaning through both textual and visual elements.

```vue
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

#### Icon-only button
Use an icon-only button for actions that can be universally recognized through the icon alone. For an icon-only Button, the label is visually hidden but available to assistive technology users.

**WARNING**<br>
Due to the lack of descriptive text, icon-only buttons require one of the following attributes: `aria-label` or `aria-hidden`.<br>
The attribute `aria-label` has to be used on icon-only buttons to be understandable by assistive technology users. Exceptions are buttons in component combinations, e.g. the button in the [Combobox component](https://doc.wikimedia.org/codex/latest/components/demos/combobox.html), that are skipped by adding `aria-hidden` without negatively impacting the component's functionality.

```vue
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

#### Disabled button
Buttons may be disabled, but disabled buttons should be used sparingly.

✅Use disabled Buttons when they are related to a single input, therefore implying what must be completed to enable the Button.<br>
⚠️Avoid using disabled Buttons to prevent a user from attmepting to continue forward. Instead, rely on providing validation as a response to what might be incomplete or incorrect.

```vue
<button class="cdx-button" disabled>Disabled button</button>
```

## Technical implementation
### Vue usage
#### Props

|Prop name|Description|Type|Values|Default|
|---|---|---|---|---|
|`action`|The kind of action that will be taken on click|`ButtonAction`|`'default'`, `'progressive'`, `'destructive'`|`default`|
|`weight`|Visual prominence of Button.|`ButtonWeight`|`'normal'`, `'primary'`, `'quiet'`|`normal`|
|`size`|Button size.<br>Medium: Default for most cases. Large: Use rarely, mainly for icon-only buttons on touchscreens. Small: Use in tight spaces or inline with text. Avoid on touchscreens - prefer medium for better accessibility.|`ButtonSize`|`'small'`, `'medium'`, `'large'`|`medium`|

#### Events
|Event name|Properties|Description|
|---|---|---|
|`click`|||

#### Slots
|Name|Description|Bindings|
|---|---|---|
|default|Button content||

### CSS-only version
#### Markup structure
The CSS Button component uses the `<button>` element and the `.cdx-button` class.
```vue
<!-- Button element with CSS class(es). -->
<button class="cdx-button">Click me</button>
```
#### Button actions
There are three Button actions: default, progressive, and destructive. Use the following classes to apply these actions:

* Default: `cdx-button--action-default` (class can be omitted since this is the default)
* Progressive: `cdx-button--action-progressive`
* Destructive: `cdx-button--action-destructive`

```vue
<div>
  <button class="cdx-button cdx-button--action-default">Default button</button>
</div>
<div>
  <button class="cdx-button cdx-button--action-progressive">
    Progressive button
  </button>
</div>
<div>
  <button class="cdx-button cdx-button--action-destructive">
    Destructive button
  </button>
</div>
```

#### Button weights
There are three Button weights: normal, primary, and quiet. Use the following classes to apply these actions:

* Normal: `cdx-button--weight-normal` (class can be omitted since this is the default)
* Primary: `cdx-button--weight-primary`
* Quiet: `cdx-button--weight-quiet`
```vue
<div>
  <button class="cdx-button cdx-button--action-progressive">
    Progressive normal button
  </button>
</div>
<div>
  <button
    class="cdx-button cdx-button--action-progressive cdx-button--weight-primary"
  >
    Progressive primary button
  </button>
</div>
<div>
  <button
    class="cdx-button cdx-button--action-progressive cdx-button--weight-quiet"
  >
    Progressive quiet button
  </button>
</div>
```

#### Disabled
Add the `disabled` attribute to the `<button>` element to get a disabled element with appropriate styles.
```vue
<button class="cdx-button" disabled>Disabled button</button>
```

#### With CSS icon
You can use CSS icons within button content. To set up an icon within a CSS-only button, do the following.

1. Add an empty span inside the button before the label with the class `cdx-button__icon`.
2. Use the `.cdx-mixin-css-icon()` mixin with the `@param-is-button-icon` parameter set to `true`.

Note that in Firefox version 52 and below, full color support for icons inside CSS-only buttons is not available, and the icon will fall back to a single color.

**WARNING**
Be sure to add `aria-hidden="true"` to the icon element to hide it from assistive technology.

```html
<button class="cdx-button">
  <span
    class="cdx-button__icon cdx-demo-css-icon--arrow-previous"
    aria-hidden="true"
  ></span>
  Go back
</button>
```
```less
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--arrow-previous {
  .cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```
#### Icon-only Button
Add the `cdx-button--icon-only` class for an icon-only Button.

**WARNING**
Be sure to add an `aria-label` attribute to the button element so it can be understandable to screen reader users.

```html
<button class="cdx-button cdx-button--icon-only" aria-label="Back">
  <span class="cdx-button__icon cdx-demo-css-icon--arrow-previous"></span>
</button>
```
```less
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--arrow-previous {
  .cdx-mixin-css-icon( @cdx-icon-arrow-previous, @param-is-button-icon: true );
}
```
#### Button sizes
There are three Button sizes: small, medium (default) and large.

* **medium** is the standard button size and should be used in most cases.
* **large** buttons are intended for accessibility, such as increasing the touch area for icon-only buttons on touchscreens.
* Use **small** buttons only when space is tight - for example, inline with text or in compact layouts. In these cases, avoid capital letters to help the button blend naturally with surrounding text. If you're using a small button, make sure to also use a small icon inside it.
* Avoid using small buttons on touchscreens. If possible, use the medium size to maintain touch accessibility.<br>
Use the following classes to apply these actions:<br>
* Small: `cdx-button--size-small`
* Medium: `cdx-button--size-medium` (class can be omitted since this is the default)
* Large: `cdx-button--size-large`

```html
<div>
  <button
    class="cdx-button cdx-button--icon-only cdx-button--size-small"
    aria-label="Notifications"
  >
    <span
      class="cdx-button__icon cdx-demo-css-icon--bell cdx-demo-css-icon--bell--small"
    ></span>
  </button>
</div>
<div>
  <button class="cdx-button cdx-button--icon-only" aria-label="Notifications">
    <span class="cdx-button__icon cdx-demo-css-icon--bell"></span>
  </button>
</div>
<div>
  <button
    class="cdx-button cdx-button--icon-only cdx-button--size-large"
    aria-label="Notifications"
  >
    <span class="cdx-button__icon cdx-demo-css-icon--bell"></span>
  </button>
</div>
```
```less
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--bell {
  .cdx-mixin-css-icon( @cdx-icon-bell, @param-is-button-icon: true );
}

.cdx-demo-css-icon--bell--small {
  .cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small, @param-is-button-icon: true );
}
```

#### Link buttons and other elements
**DANGER**<br>
Do not do this unless you absolutely have to. Use a `<button>` element styled like a button for an action, and use an `<a>` element styled like a link for navigation.

There are rare occasions where an inline element other than `<button>` needs to be styled to look like a button. To achieve this, add the following classes to your inline element:

* The classes detailed above: `cdx-button`, plus any other classes needed for action, weight, or size
* cdx-button--fake-button
* Either `cdx-button--fake-button--enabled` for an enabled button or `cdx-button--fake-button--disabled` for a disabled button. **You must include one of these classes to get the proper button styles.**<br>
If your element behaves like a button (triggering an action or event), you should also add `role="button"` to the element if that role is allowed. Visit the [ARIA Authoring Practices Guide on buttons](https://www.w3.org/WAI/ARIA/apg/patterns/button/) for more information.

```html
<div>
  <a
    class="cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--action-progressive"
    href="#"
  >
    Progressive link button
  </a>
</div>
<div>
  <a
    class="cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--action-progressive cdx-button--weight-quiet"
    href="#"
  >
    <span class="cdx-button__icon cdx-demo-css-icon--language"></span>
    Quiet progressive link button
  </a>
</div>
```
```vue
// Note: you must import the design tokens before importing the css-icon mixin.
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--language {
  .cdx-mixin-css-icon( @cdx-icon-language, @param-is-button-icon: true );
}
```

#### Keyboard navigation
|Key |Function|
|---|---|
|`Enter` / `Space`|If the focus is placed on the Button, it activates the Button.