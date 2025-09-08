# Icon [​](#icon)

An Icon is a graphical representation of an idea.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-icon
		v-if="icon"
		:icon="icon"
		:size="size"
		:lang="language"
	/>
	<p v-else>
		Select an icon
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SimpleIcon',
	components: { CdxIcon },
	props: {
		icon: {
			type: [ String, Object ],
			default: ''
		},
		language: {
			type: String,
			default: 'en'
		},
		size: {
			type: String,
			default: 'medium'
		}
	},
	setup() {
		return {
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-icon
		v-if="icon"
		:icon="icon"
		:size="size"
		:lang="language"
	></cdx-icon>
	<p v-else>
		Select an icon
	</p>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxIcon } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'SimpleIcon',
	components: { CdxIcon },
	props: {
		icon: {
			type: [ String, Object ],
			default: ''
		},
		language: {
			type: String,
			default: 'en'
		},
		size: {
			type: String,
			default: 'medium'
		}
	},
	setup() {
		return {
		};
	}
} );
</script>
```

| Name | Value |
| --- | --- |
| Props |     |
| icon |     |
| size | medium<br><br>small<br><br>x-small |
| language |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

*   cdxIconGlobe

## Overview [​](#overview)

### When to use Icon [​](#when-to-use-icon)

Icons are used to give the user additional context for understanding the interface. This component can be used inside other components, like a [Button](./button.html).

Codex contains a [list of icons](/codex/latest/icons/all-icons.html). Read more about how to [use and create Codex icons](/codex/latest/style-guide/icons.html).

### About Icon [​](#about-icon)

#### Size [​](#size)

Icons can be one of three sizes.

*   **By default**, Icons use `@size-125` (equivalent to `20px` in the default Codex theme) known as medium.
*   **In elements with a smaller height**, Icons should use `@size-100` (equivalent to `16px` in the default Codex theme) known as small.
*   **In specific cases**, Icons should use `@size-75` (equivalent to `12px` in the default Codex theme) known as x-small.

#### Color [​](#color)

*   **By default**, icons use `@color-base`.
*   **Decorative icons** should use `@color-subtle`.
*   **Icons in a placeholder state** should use `@color-placeholder`.
*   **Status-conveying icons** should use their associated status color, either `@color-notice`, `@color-error`, `@color-warning`, or `@color-success`.
*   **Icons as a part of an action or link** inherit the color of the accompanying label.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

Icon can be used inside other components, like [Button](./button.html#with-icon). Note that the icon will inherit the text color of that component—for instance, in a destructive primary button, the icon is white, like the button label.

Next  
  
Remove

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-button>
		<cdx-icon :icon="cdxIconNext" />
		Next
	</cdx-button>
	<br><br>
	<cdx-button weight="primary" action="destructive">
		<cdx-icon :icon="cdxIconTrash" />
		Remove
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon, CdxButton } from '@wikimedia/codex';
import { cdxIconNext, cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconInButton',
	components: { CdxIcon, CdxButton },
	setup() {
		return {
			cdxIconNext,
			cdxIconTrash
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-button>
		<cdx-icon :icon="cdxIconNext"></cdx-icon>
		Next
	</cdx-button>
	<br><br>
	<cdx-button weight="primary" action="destructive">
		<cdx-icon :icon="cdxIconTrash"></cdx-icon>
		Remove
	</cdx-button>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxIcon, CdxButton } = require( '@wikimedia/codex' );
const { cdxIconNext, cdxIconTrash } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'IconInButton',
	components: { CdxIcon, CdxButton },
	setup() {
		return {
			cdxIconNext,
			cdxIconTrash
		};
	}
} );
</script>
```

### Icon sizes [​](#icon-sizes)

Icons support a few different pre-defined size options. Right now the supported sizes are: `medium`, `small`, and `x-small`.

If no `size` property is provided, the `medium` size will be used by default.

|     |     |     |
| --- | --- | --- |Icon size examples for all supported `size` values.
| Example icon at medium size | Medium Icon | 20px |
| Example icon at small size | Small Icon | 16px |
| Example icon at extra-small size | Extra-small Icon | 12px |

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<table class="cdx-demo-icon-sizes">
		<caption>
			Icon size examples for all supported <code>size</code> values.
		</caption>
		<tbody>
			<tr>
				<th>
					<cdx-icon
						:icon="cdxIconLogoWikimedia"
						size="medium"
						icon-label="Example icon at medium size"
					/>
				</th>
				<td>
					<span>Medium Icon</span>
				</td>
				<td>
					<span>20px</span>
				</td>
			</tr>
			<tr>
				<th>
					<cdx-icon
						:icon="cdxIconLogoWikimedia"
						size="small"
						icon-label="Example icon at small size"
					/>
				</th>
				<td>
					<span>Small Icon</span>
				</td>
				<td>
					<span>16px</span>
				</td>
			</tr>
			<tr>
				<th>
					<cdx-icon
						:icon="cdxIconLogoWikimedia"
						size="x-small"
						icon-label="Example icon at extra-small size"
					/>
				</th>
				<td>
					<span>Extra-small Icon</span>
				</td>
				<td>
					<span>12px</span>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconLogoWikimedia } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconSizes',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLogoWikimedia
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-icon-sizes {
	width: @size-full;

	caption {
		margin-top: @spacing-25;
		text-align: left;
		caption-side: bottom;
	}
}
</style>
```

vue

```
<template>
	<table class="cdx-demo-icon-sizes">
		<caption>
			Icon size examples for all supported <code>size</code> values.
		</caption>
		<tbody>
			<tr>
				<th>
					<cdx-icon
						:icon="cdxIconLogoWikimedia"
						size="medium"
						icon-label="Example icon at medium size"
					></cdx-icon>
				</th>
				<td>
					<span>Medium Icon</span>
				</td>
				<td>
					<span>20px</span>
				</td>
			</tr>
			<tr>
				<th>
					<cdx-icon
						:icon="cdxIconLogoWikimedia"
						size="small"
						icon-label="Example icon at small size"
					></cdx-icon>
				</th>
				<td>
					<span>Small Icon</span>
				</td>
				<td>
					<span>16px</span>
				</td>
			</tr>
			<tr>
				<th>
					<cdx-icon
						:icon="cdxIconLogoWikimedia"
						size="x-small"
						icon-label="Example icon at extra-small size"
					></cdx-icon>
				</th>
				<td>
					<span>Extra-small Icon</span>
				</td>
				<td>
					<span>12px</span>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconLogoWikimedia } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'IconSizes',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLogoWikimedia
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-icon-sizes {
	width: @size-full;

	caption {
		margin-top: @spacing-25;
		text-align: left;
		caption-side: bottom;
	}
}
</style>
```

WARNING

`x-small` Icon size is only intended for use in certain special cases. Most components should use Icons in `small` or `medium` size.

### Icon colors [​](#icon-colors)

All icons are monochrome, meaning the entire icon is the same color. By default, Icon uses the base color (`#202122`), but this can be overridden by changing the `color` property of the `.cdx-icon` element in CSS.

Success!

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<p>
		<cdx-icon class="cdx-demo-icon-success" :icon="cdxIconSuccess" />
		Success!
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconSuccess } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconColor',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconSuccess
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-icon-success {
	color: @color-icon-success;
}
</style>
```

vue

```
<template>
	<p>
		<cdx-icon class="cdx-demo-icon-success" :icon="cdxIconSuccess"></cdx-icon>
		Success!
	</p>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconSuccess } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'IconColor',
	components: { CdxIcon },
	setup() {
		return {
			cdxIconSuccess
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-icon-success {
	color: @color-icon-success;
}
</style>
```

### Developer notes

Note that the SVG inherits the Icon `color` by applying `fill: currentColor`. Some components style their icons to match the surrounding text color. For example, [Button](./button.html) features red icons matching the red (`#bf3c2c`) text in its destructive variant.

### Internationalization [​](#internationalization)

Many icons, like `cdxIconJournal`, have different versions for left-to-right (LTR) and right-to-left (RTL) contexts. The Icon component automatically detects the direction of its environment, and chooses the correct icon accordingly. For example, if the journal icon appears on a page that is RTL, or inside of a `<div dir="rtl">` tag, the RTL version of the icon will be displayed.

Show codeCopy code

Reset demo

template

```
<cdx-icon :icon="cdxIconJournal" />
```

| Name | Value |
| --- | --- |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

Similarly, some icons, like `cdxIconBold` have different versions for different languages. The icon component also automatically detects the language of its environment, so if for example the bold icon appears on a page that has `<html lang="fr">` at the root, or inside of a `<p lang="fr">`, the French version of the icon will be displayed.

Default

English

French

Arabic

Show codeCopy code

Reset demo

template

```
<p>
	<cdx-icon :icon="cdxIconBold" /> Default
</p>
<p lang="en">
	<cdx-icon :icon="cdxIconBold" /> English
</p>
<p lang="fr">
	<cdx-icon :icon="cdxIconBold" /> French
</p>
<p lang="ar">
	<cdx-icon :icon="cdxIconBold" /> Arabic
</p>
```

| Name | Value |
| --- | --- |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

### Developer notes

The automatic direction and language detection feature has limitations. It only detects the direction and language of the surrounding context when the icon component is initially mounted. If the surrounding context changes later, for example because the `lang` or `dir` attribute on the parent/ancestor is changed, the icon will not notice these changes and will not update to reflect them.

If you run into this limitation, or if the automatic direction/language detection isn't working for other reasons, you can set the direction and/or language explicitly through the `dir` and `lang` props:

template

```
Bold icon in German: <cdx-icon :icon="cdxIconBold" lang="de" />
Journal icon in RTL: <cdx-icon :icon="cdxIconJournal" dir="rtl" />
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

# [​](#)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `icon`(required) | The SVG path or an object containing that path plus other data. | `[Icon](../types-and-constants.html#icon)` |     |
| `iconLabel` | Accessible label for the icon. If not included, the icon will be hidden from screen readers via `aria-hidden="true"`. Browsers also display this label as a tooltip when the user hovers over the icon. Note that this label is not rendered as visible text next to the icon. | `string` | `''` |
| `lang` | Explicitly set the language code to use for the icon. See [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/lang). Defaults to the lang attribute of the nearest ancestor at mount time. | `string\|null` | `null` |
| `dir` | Explicitly set the direction to use for the icon. See [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir). Defaults to the computed direction at mount time. | `[HTMLDirection](../types-and-constants.html#htmldirection)\|null` | `null` |
| `size` | Specify icon size by choosing one of several pre-defined size options. See the type documentation for supported size options. The `medium` size is used by default if no size prop is provided. | `[IconSize](../types-and-constants.html#iconsize)` | `'medium'` |

### CSS-only version [​](#css-only-version)

You can use icons in a no-JavaScript context via the CSS icon Less mixin provided by the Codex library. To use this mixin, import the mixin file and apply `.cdx-mixin-css-icon()` to an empty `<span>` element. The parameters of the mixin are as follows:

| Param name | Description | Default |
| --- | --- | --- |
| `@param-icon` (required) | The icon to use, in the form of a Less variable. These variables are also provided by the mixin file. The syntax for the Less variable version of an icon name is `@cdx-icon-icon-name`, e.g. `@cdx-icon-info-filled`. Visit the list of [all icons](./../../icons/all-icons.html) for icon names. To use a custom icon, set this to `'none'`, check [how to use a custom icon](#custom-icon) below. |     |
| `@param-fill-color` | The hex code of the fill color of the icon | `@color-base` |
| `@param-size-icon` | The icon size | `@size-icon-medium` |
| `@param-is-button-icon` | Whether the icon is inside of a `<button>` element | `false` |

WARNING

Before importing the `css-icon` mixin, you must first import the design tokens. If you don't, you will get errors that look like `variable @color-base is undefined`.

TIP

Visit the [Button docs](./button.html#with-css-icon) for details on using CSS icons within buttons.

Code

Map pin

Show codeCopy code

html

```
<p>
  <span class="cdx-demo-css-icon--code"></span>
  Code
</p>
<p>
  <span class="cdx-demo-css-icon--map-pin"></span>
  Map pin
</p>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon {
  &--code {
    .cdx-mixin-css-icon( @cdx-icon-code );
  }

  &--map-pin {
    .cdx-mixin-css-icon( @cdx-icon-map-pin );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--code {
    .cdx-mixin-css-icon( @cdx-icon-code );
  }

  &--map-pin {
    .cdx-mixin-css-icon( @cdx-icon-map-pin );
  }
}
```

#### Icon color [​](#icon-color)

Use the second parameter of the `.cdx-mixin-css-icon()` mixin, `@param-fill-color`, to apply a hex code as the SVG fill color.

Delete

Show codeCopy code

html

```
<p>
  <span class="cdx-demo-css-icon--trash"></span>
  Delete
</p>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--trash {
  .cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon--trash {
  .cdx-mixin-css-icon( @cdx-icon-trash, @color-destructive );
}
```

#### Icon sizes [​](#icon-sizes-1)

Use the third parameter of the `.cdx-mixin-css-icon()` mixin, `@param-size-icon`, to use one of the pre-defined size options (`@size-icon-medium`, `@size-icon-small`, or `@size-icon-x-small`).

Bookmark (medium)

Bell (small)

Arrow next (extra-small)

Show codeCopy code

html

```
<p>
  <span class="cdx-demo-css-icon--bookmark"></span>
  Bookmark (medium)
</p>
<p>
  <span class="cdx-demo-css-icon--bell"></span>
  Bell (small)
</p>
<p>
  <span class="cdx-demo-css-icon--arrow-next"></span>
  Arrow next (extra-small)
</p>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon {
  &--bookmark {
    // No size parameter added, so default size of medium will be used.
    .cdx-mixin-css-icon( @cdx-icon-bookmark );
  }

  &--bell {
    // Size parameter included via a named parameter.
    .cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small );
  }

  &--arrow-next {
    .cdx-mixin-css-icon( @cdx-icon-arrow-next, @param-size-icon: @size-icon-x-small );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--bookmark {
    // No size parameter added, so default size of medium will be used.
    .cdx-mixin-css-icon( @cdx-icon-bookmark );
  }

  &--bell {
    // Size parameter included via a named parameter.
    .cdx-mixin-css-icon( @cdx-icon-bell, @param-size-icon: @size-icon-small );
  }

  &--arrow-next {
    .cdx-mixin-css-icon( @cdx-icon-arrow-next, @param-size-icon: @size-icon-x-small );
  }
}
```

#### Bidirectionality [​](#bidirectionality)

The CSS icon mixin supports icons that differ between the left-to-right (LTR) and right-to-left (RTL) reading directions. To take advantage of this behavior, in RTL contexts, one of the following is required:

*   A `dir="rtl"` attribute set **on the `<html>` element**.
*   A `dir="rtl"` attribute set **directly on the icon span**.

WARNING

In RTL contexts, ensure that a `dir="rtl"` attribute is set either on the `<html>` element or on the icon element itself.

Article (LTR)

Article (RTL)

Show codeCopy code

html

```
<p>
  <span dir="ltr" class="cdx-demo-css-icon cdx-demo-css-icon--article"></span>
  Article (LTR)
</p>
<p>
  <span dir="rtl" class="cdx-demo-css-icon cdx-demo-css-icon--article"></span>
  Article (RTL)
</p>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon {
  &--article {
    .cdx-mixin-css-icon( @cdx-icon-article );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--article {
    .cdx-mixin-css-icon( @cdx-icon-article );
  }
}
```

#### Language support [​](#language-support)

The CSS-only icons mixin supports icons with language-specific variants.

Strikethrough (German)

Strikethrough (English)

Strikethrough (Finnish)

Show codeCopy code

html

```
<p lang="de">
  <span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
  Strikethrough (German)
</p>
<p lang="en">
  <span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
  Strikethrough (English)
</p>
<p lang="fi">
  <span class="cdx-demo-css-icon cdx-demo-css-icon--strikethrough"></span>
  Strikethrough (Finnish)
</p>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon {
  &--strikethrough {
    .cdx-mixin-css-icon( @cdx-icon-strikethrough );
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon {
  &--strikethrough {
    .cdx-mixin-css-icon( @cdx-icon-strikethrough );
  }
}
```

#### Custom icon [​](#custom-icon)

To use a custom icon:

*   Set the first parameter of the `.cdx-mixin-css-icon()` mixin to `'none'`
*   Set `mask-image` and `-webkit-mask-image` to a URL that points to the icon image (this can be a data URL)

WARNING

You must set both `mask-image` and `-webkit-mask-image`, because many browsers only respect the latter. This may happen automatically if you use a tool like Autoprefixer.

Custom icon

Show codeCopy code

html

```
<p>
  <span class="cdx-demo-css-icon--custom"></span>
  Custom icon
</p>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--custom {
  .cdx-mixin-css-icon( "none", @color-progressive );
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>');
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>');
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon--custom {
  .cdx-mixin-css-icon( "none", @color-progressive );
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
  -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>');
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features,function-url-quotes */
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><mask id="inner"><circle cx="10" cy="10" r="10" fill="white"/><circle cx="10" cy="10" r="6" fill="black"/></mask><circle cx="10" cy="10" r="10" fill="black" mask="url(%23inner)"/></svg>');
}
```

Pager

[Previous pageProgressIndicator](/codex/latest/components/demos/progress-indicator.html)

[Next pageImage](/codex/latest/components/demos/image.html)