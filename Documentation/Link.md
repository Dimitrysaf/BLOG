# Link [​](#link)

A Link navigates the user to another page, view or section, when the user presses it.

## Overview [​](#overview)

### When to use Link [​](#when-to-use-link)

Use the Link component when you need to provide users with a clickable element to navigate to a different page, resource, or section in the same page.

Apart from links that navigate to other pages, there are the following different links:

*   Links that open a modal instead of a new page (e.g. map links)
*   Links that open a file instead of a web page (e.g. PDF or document links)
*   Links that cause something to happen that the user would otherwise not expect (e.g. play a sound, like pronunciation links)
*   Links that open a new website instead of solely a new page [(external links)](https://en.wikipedia.org/wiki/Wikipedia:External_links)
*   Links that open a non-web protocol URI (e.g. `mailto:`, `tel:` links)

Several Wikimedia Movement projects provide extensive [“manuals of style”](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Linking) for applying and designing for links, for example English Wikipedia.

Avoid using Link when the user needs to perform an action. In such cases, use [Button](./../demos/button.html) instead. Learn more about the [usage of links and buttons](./../../style-guide/using-links-and-buttons.html).

### About Link [​](#about-link)

Link includes the following element.

#### Link text [​](#link-text)

The text that describes the link destination as clearly as possible.

By default, the Link text style is set to the base font in regular. However, it can be easily customized to other styles by applying any of the existing fonts, text sizes or formats defined in our [font design tokens](./../../design-tokens/font.html).

*   Highlight only the phrase that indicates the link destination. [_Translatable_](./../../style-guide/writing-for-copy.html#is-this-translatable)
    
*   Avoid using the words click, tap or here. Avoiding these terms makes things clear and precise, whether the reader is using an assistive device, a mobile device or a desktop experience. [_Accessible_](./../../style-guide/writing-for-copy.html#is-this-accessible)
    

## Examples [​](#examples)

Visit a link to check visited link styles.

### Base Link [​](#base-link)

Base Links signal to users the option to navigate to a different page, view, or resource.

The cat (Felis catus) is a [domestic species](https://en.wikipedia.org/wiki/Species) of small [carnivorous mammal](https://en.wikipedia.org/wiki/Carnivore).

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<p>
		The cat (Felis catus) is a <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Species">domestic species</a>
		of small <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Carnivore">carnivorous mammal</a>.
	</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

vue

```
<template>
	<p>
		The cat (Felis catus) is a <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Species">domestic species</a>
		of small <a class="cdx-docs-link" href="https://en.wikipedia.org/wiki/Carnivore">carnivorous mammal</a>.
	</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

### Underlined Link [​](#underlined-link)

By default, Links are only underlined when they are interacted with (hover over or pressed). To suit user preferences and for accessibility reasons, Links can always be underlined.

As a [predator](https://en.wikipedia.org/wiki/Predation), it is [crepuscular](https://en.wikipedia.org/wiki/Crepuscular_animal), i.e. most active at dawn and dusk.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<p>
		As a <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Predation">predator</a>,
		it is <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Crepuscular_animal">crepuscular</a>,
		i.e. most active at dawn and dusk.
	</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

vue

```
<template>
	<p>
		As a <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Predation">predator</a>,
		it is <a class="cdx-docs-link is-underlined" href="https://en.wikipedia.org/wiki/Crepuscular_animal">crepuscular</a>,
		i.e. most active at dawn and dusk.
	</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

### External Link [​](#external-link)

The external link icon indicates that the link will take the user to a different website. This icon cannot be replaced with other icons.

According to ["Living with a Cat"](https://archive.org/details/completebookofca00behr/page/28/mode/2up), cats are ready to go to new homes at about 12 weeks of age.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<p>
		According to
		<a class="cdx-docs-link is-underlined" href="https://archive.org/details/completebookofca00behr/page/28/mode/2up">
			"Living with a Cat" <cdx-icon :icon="cdxIconLinkExternal" />
		</a>,
		cats are ready to go to new homes at about 12 weeks of age.
	</p>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconLinkExternal } from '@wikimedia/codex-icons';

export default {
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLinkExternal
		};
	}
};
</script>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();

	// stylelint-disable-next-line selector-class-pattern
	.cdx-icon {
		color: inherit;
	}
}
</style>
```

vue

```
<template>
	<p>
		According to
		<a class="cdx-docs-link is-underlined" href="https://archive.org/details/completebookofca00behr/page/28/mode/2up">
			"Living with a Cat" <cdx-icon :icon="cdxIconLinkExternal"></cdx-icon>
		</a>,
		cats are ready to go to new homes at about 12 weeks of age.
	</p>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconLinkExternal } = require( '@wikimedia/codex-icons' );

module.exports = defineComponent( {
	components: { CdxIcon },
	setup() {
		return {
			cdxIconLinkExternal
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();

	// stylelint-disable-next-line selector-class-pattern
	.cdx-icon {
		color: inherit;
	}
}
</style>
```

### Red Link [​](#red-link)

[Red links](https://en.wikipedia.org/wiki/Wikipedia:Red_link#When_to_create_red_links) navigate to pages that do not exist yet.

Websites for cat lovers include [The Catnip Times](https://en.wikipedia.org/w/index.php?title=The_Catnip_Times) and [Vanggy](https://en.wikipedia.org/w/index.php?title=Vanggy).

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<p>
		Websites for cat lovers include <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=The_Catnip_Times">The Catnip Times</a>
		and <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=Vanggy">Vanggy</a>.
	</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

vue

```
<template>
	<p>
		Websites for cat lovers include <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=The_Catnip_Times">The Catnip Times</a>
		and <a class="cdx-docs-link is-red-link" href="https://en.wikipedia.org/w/index.php?title=Vanggy">Vanggy</a>.
	</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

## Technical implementation [​](#technical-implementation)

### Less mixin usage [​](#less-mixin-usage)

Less mixin

This component has been implemented as a [Less mixin](https://lesscss.org/features/#mixins-feature), not a Vue component. This mixin must be imported separately in your Less styles. Check below for [usage information](#usage).

WARNING

Before importing the Link mixin, you must first import the design tokens. If you don't, you will get errors that look like `variable @color-progressive is undefined`.

### Default usage [​](#default-usage)

To use base, underlined, and red Link styles, apply the `.cdx-mixin-link()` mixin to a link class or to all anchor elements. This will automatically apply underline styles to links with the `.is-underlined` class, and red link styles to links with the `.is-red-link` class.

In [ancient Egypt](#), cats were worshipped.

In [ancient Egypt](#), cats were worshipped.

In [ancient Egypt](#), cats were worshipped.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<p>In <a class="cdx-docs-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-underlined" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-red-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

vue

```
<template>
	<p>In <a class="cdx-docs-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-underlined" href="#">ancient Egypt</a>, cats were worshipped.</p>
	<p>In <a class="cdx-docs-link is-red-link" href="#">ancient Egypt</a>, cats were worshipped.</p>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link {
	.cdx-mixin-link();
}
</style>
```

### With custom CSS selectors [​](#with-custom-css-selectors)

Alternately, you can apply sub-mixins directly to your own CSS selectors. The sub-mixins are:

*   `.cdx-mixin-link-base()`
*   `.cdx-mixin-link-underlined()`
*   `.cdx-mixin-link-red()`

The domestic cat is a [cosmopolitan species](https://en.wikipedia.org/wiki/Cosmopolitan_distribution).

The domestic cat is a [cosmopolitan species](https://en.wikipedia.org/wiki/Cosmopolitan_distribution).

The domestic cat is a [cosmopolitan species](https://en.wikipedia.org/wiki/Cosmopolitan_distribution).

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-link-wrapper">
		<p>The domestic cat is a <a href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-link-with-underline" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-red-link" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
	</div>
</template>

<style lang="less">
// Note: you must import the design tokens before importing the link mixin
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '@wikimedia/codex/mixins/link.less';

.cdx-docs-link-wrapper {
	a {
		.cdx-mixin-link-base();
	}

	.cdx-docs-link-with-underline {
		.cdx-mixin-link-underlined();
	}

	.cdx-docs-red-link {
		.cdx-mixin-link-red();
	}
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-link-wrapper">
		<p>The domestic cat is a <a href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-link-with-underline" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
		<p>The domestic cat is a <a class="cdx-docs-red-link" href="https://en.wikipedia.org/wiki/Cosmopolitan_distribution">cosmopolitan species</a>.</p>
	</div>
</template>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-link-wrapper {
	a {
		.cdx-mixin-link-base();
	}

	.cdx-docs-link-with-underline {
		.cdx-mixin-link-underlined();
	}

	.cdx-docs-red-link {
		.cdx-mixin-link-red();
	}
}
</style>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Enter | If the Link is focused, it opens the Link. |

Pager

[Previous pageThumbnail](/codex/latest/components/demos/thumbnail.html)

[Next pageTabs](/codex/latest/components/demos/tabs.html)