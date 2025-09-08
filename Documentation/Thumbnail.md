# Thumbnail [​](#thumbnail)

A Thumbnail is a visual element used to display a small preview of an image. Thumbnails provide users with a quick glimpse of the associated content.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-thumbnail :thumbnail="thumbnailData" />
</template>

<script>
import { defineComponent } from 'vue';
import { CdxThumbnail } from '@wikimedia/codex';

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

export default defineComponent( {
	name: 'ThumbnailDefault',
	components: { CdxThumbnail },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-thumbnail :thumbnail="thumbnailData"></cdx-thumbnail>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxThumbnail } = require( '@wikimedia/codex' );

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

module.exports = defineComponent( {
	name: 'ThumbnailDefault',
	components: { CdxThumbnail },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
```

| Name | Value |
| --- | --- |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Thumbnail [​](#when-to-use-thumbnail)

Use the Thumbnail component to display small previews of images that can provide context or support the meaning of the content included in components such as [Card](./card.html) or [MenuItem](./menu-item.html).

Avoid using the Thumbnail component for high-resolution images. Use the [Image](./image.html) component instead.

### About Thumbnail [​](#about-thumbnail)

Thumbnail includes the following elements.

#### Image [​](#image)

The Thumbnail displays a preview of an image if one has been uploaded.

#### Placeholder icon [​](#placeholder-icon)

If the Thumbnail's image is missing or loading, a placeholder icon on a light background is displayed.

*   Customize the icon within placeholder Thumbnails.
*   Use icons that provide clear context for the use of the Thumbnail.

#### Size [​](#size)

Thumbnails have a minimum width and height of `size-250` (equivalent to `40px` in the default Codex theme). A larger Thumbnail size can be specified using CSS if desired (the [Card](./card.html) component uses `size-300` for its Thumbnail dimensions, for example).

## Examples [​](#examples)

### Placeholder [​](#placeholder)

The placeholder serves two purposes:

1.  To display while a Thumbnail image is loading, improving the experience of those with slower connections.
2.  To display when a Thumbnail image is not provided.

The second case may occur in a group of components, like Cards or MenuItems, when some items have a thumbnail image but some do not. In this case, the placeholder icon helps maintain a consistent layout for all items. Refer to the [Card groups demo](./card.html#card-groups) for an example.

#### Default placeholder [​](#default-placeholder)

Show codeCopy code

template

```
<cdx-thumbnail :thumbnail="null" />
```

#### Custom placeholder icon [​](#custom-placeholder-icon)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-thumbnail :thumbnail="null" :placeholder-icon="cdxIconArticle" />
</template>

<script>
import { defineComponent } from 'vue';
import { CdxThumbnail } from '@wikimedia/codex';
import { cdxIconArticle } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ThumbnailCustomIcon',
	components: { CdxThumbnail },
	setup() {
		return {
			cdxIconArticle
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-thumbnail :thumbnail="null" :placeholder-icon="cdxIconArticle"></cdx-thumbnail>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxThumbnail } = require( '@wikimedia/codex' );
const { cdxIconArticle } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'ThumbnailCustomIcon',
	components: { CdxThumbnail },
	setup() {
		return {
			cdxIconArticle
		};
	}
} );
</script>
```

### Developer notes

To customize the placeholder icon, use the `placeholderIcon` prop.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `thumbnail` | Thumbnail data. | `[Thumbnail](../types-and-constants.html#thumbnail)\|null` | `null` |
| `placeholderIcon` | Thumbnail placeholder icon. | `[Icon](../types-and-constants.html#icon)` | `cdxIconImageLayoutFrameless` |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

For the CSS-only version, a `background-image` rule must be set on the inner span. You can do this via a `style` attribute (like in the example below), or by adding a custom CSS class to the inner span and adding the `background-image` rule in your styles.

Show codeCopy code

html

```
<!-- Wrapper <span>. -->
<span class="cdx-thumbnail">
  <!-- Image span. -->
  <span
    class="cdx-thumbnail__image"
    style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg );"
  ></span>
</span>
```

#### Placeholder [​](#placeholder-1)

##### Default placeholder [​](#default-placeholder-1)

To show the default placeholder icon, add two nested `<span>` elements inside the wrapper `<span>`:

1.  An outer `<span>` with the class `cdx-thumbnail__placeholder`
2.  An inner `<span>` with the class `cdx-thumbnail__placeholder__icon`

The default placeholder icon will automatically be added as a background image to the inner `<span>`.

Show codeCopy code

html

```
<span class="cdx-thumbnail">
  <span class="cdx-thumbnail__placeholder">
    <span class="cdx-thumbnail__placeholder__icon"></span>
  </span>
</span>
```

##### Custom placeholder icon [​](#custom-placeholder-icon-1)

To show a custom placeholder icon, add two nested `<span>` elements inside the wrapper `<span>`:

1.  An outer `<span>` with the class `cdx-thumbnail__placeholder`
2.  An inner `<span>` with your own custom CSS class

In your Less code, use your custom CSS class to add a [CSS-only icon](./icon.html#css-only-version). Be sure to use `@color-placeholder` as the fill color.

Show codeCopy code

html

```
<span class="cdx-thumbnail">
  <span class="cdx-thumbnail__placeholder">
    <span class="cdx-demo-css-icon--article"></span>
  </span>
</span>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--article {
  .cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon--article {
  .cdx-mixin-css-icon( @cdx-icon-article, @color-placeholder );
}
```

Pager

[Previous pageImage](/codex/latest/components/demos/image.html)

[Next pageLink](/codex/latest/components/mixins/link.html)