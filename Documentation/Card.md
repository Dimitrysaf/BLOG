# Card [​](#card)

A Card groups information related to a single topic.

Card titleDescriptionSupporting text

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| icon |     |
| url |     |
| Slots |     |
| title |     |
| description |     |
| supporting-text |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

## Overview [​](#overview)

### When to use Card [​](#when-to-use-card)

Use the Card component when you need to present individual pieces of information such as articles. Use them to create lists, grids or as standalone elements in the page. Cards can be clickable and offer a way to navigate to the content they represent.

Avoid using Cards when you have to display extensive content, multiple elements, or group unrelated topics together. In such cases, consider using a different component or layout.

### About Card [​](#about-card)

Card includes the following elements.

#### Visual element (optional) [​](#visual-element-optional)

They may include a Thumbnail or an Icon as a visual representation of its content.

*   Use a [Thumbnail](./thumbnail.html) when you intend to showcase articles and their associated images.
    
*   Use an [Icon](./icon.html) to help users quickly identify and associate Cards with specific actions or topics.
    

#### Title [​](#title)

A concise and descriptive title provides a brief description of the Card content.

#### Description [​](#description)

A description below the title provides more information about the element represented by the Card. If the Card itself is not a link, you can include links in the description.

*   Ensure that the content within the Card remains concise and pertinent.
    
*   Avoid overcrowding the Card with excessive content or unrelated topics.
    

#### Supporting text (optional) [​](#supporting-text-optional)

Supporting text can be included to provide additional context about the Card’s content. If the Card itself is not a link, you can include links in the supporting text.

#### Link (optional) [​](#link-optional)

As long as links are not included in the contents of the Card, the Card itself can be made a link.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

Card title Description Supporting text

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-card>
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
		<template #supporting-text>
			Supporting text
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CardDefault',
	components: { CdxCard }
} );
</script>
```

vue

```
<template>
	<cdx-card>
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
		<template #supporting-text>
			Supporting text
		</template>
	</cdx-card>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCard } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'CardDefault',
	components: { CdxCard }
} );
</script>
```

### With link [​](#with-link)

[Card title Description](https://www.example.com)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-card url="https://www.example.com">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CardWithLink',
	components: { CdxCard }
} );
</script>
```

vue

```
<template>
	<cdx-card url="https://www.example.com">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCard } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'CardWithLink',
	components: { CdxCard }
} );
</script>
```

### Developer notes

Adding the `url` prop will make the root element of the Card an anchor element.

### Media [​](#media)

A Card can have either a `thumbnail` or an `icon`. Card text will be aligned to the top of the media, unless there is only a title, which will be aligned to the center of the media.

*   Always use the same media for each Card in a group.

#### With Icon [​](#with-icon)

Card title Description

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-card :icon="cdxIconRobot">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';
import { cdxIconRobot } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'CardWithIcon',
	components: { CdxCard },
	setup() {
		return {
			cdxIconRobot
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-card :icon="cdxIconRobot">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCard } = require( '@wikimedia/codex' );
const { cdxIconRobot } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'CardWithIcon',
	components: { CdxCard },
	setup() {
		return {
			cdxIconRobot
		};
	}
} );
</script>
```

#### With Thumbnail [​](#with-thumbnail)

Card title Description

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-card :thumbnail="thumbnailData">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

export default defineComponent( {
	name: 'CardWithThumbnail',
	components: { CdxCard },
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
	<cdx-card :thumbnail="thumbnailData">
		<template #title>
			Card title
		</template>
		<template #description>
			Description
		</template>
	</cdx-card>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCard } = require( '@wikimedia/codex' );

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
};

module.exports = defineComponent( {
	name: 'CardWithThumbnail',
	components: { CdxCard },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
```

#### Media and title only [​](#media-and-title-only)

Card title

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-card :thumbnail="thumbnailData">
		<template #title>
			Card title
		</template>
	</cdx-card>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard } from '@wikimedia/codex';

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/200px-Juvenile_Ragdoll.jpg'
};

export default defineComponent( {
	name: 'CardWithThumbnailTitleOnly',
	components: { CdxCard },
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
	<cdx-card :thumbnail="thumbnailData">
		<template #title>
			Card title
		</template>
	</cdx-card>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCard } = require( '@wikimedia/codex' );

const thumbnailData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/200px-Juvenile_Ragdoll.jpg'
};

module.exports = defineComponent( {
	name: 'CardWithThumbnailTitleOnly',
	components: { CdxCard },
	setup() {
		return {
			thumbnailData
		};
	}
} );
</script>
```

### Card groups [​](#card-groups)

Cards will often be displayed in groups. The height and width of cards can be customized as needed, and when multiple cards are aligned together, their heights should adjust to match the tallest card in the set.

Nearby Pages

[Golden Gate National Recreation AreaU.S. National Recreation Area surrounding San Francisco Bay Area Distance: 170m](https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area)[Internet ArchiveAmerican non-profit organization providing archives of digital media since 1996 Distance: 300m](https://en.wikipedia.org/wiki/Internet_Archive)[Green Apple Books & MusicBookstore in San Francisco Distance: 350m](https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music)[Mountain Lake ParkPark in San Francisco, California Distance: 570m](https://en.wikipedia.org/wiki/Mountain_Lake_Park)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-docs-card-group">
		<p>Nearby Pages</p>
		<div class="cdx-docs-card-group__cards">
			<cdx-card
				v-for="card in cards"
				:key="card.pageid"
				class="cdx-docs-card-group__card"
				:url="card.url"
				:force-thumbnail="true"
				:thumbnail="card.thumbnail"
			>
				<template #title>
					{{ card.title }}
				</template>
				<template #description>
					{{ card.description }}
				</template>
				<template #supporting-text>
					<cdx-icon :icon="cdxIconMapPin" size="small" /> Distance: {{ card.distance }}
				</template>
			</cdx-card>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCard, CdxIcon } from '@wikimedia/codex';
import { cdxIconMapPin } from '@wikimedia/codex-icons';

// Simulation of results from a MediaWiki API.
const cards = [
	{
		pageid: 3613583,
		url: 'https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area',
		title: 'Golden Gate National Recreation Area',
		description: 'U.S. National Recreation Area surrounding San Francisco Bay Area',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg'
		},
		distance: '170m'
	},
	{
		pageid: 176931,
		url: 'https://en.wikipedia.org/wiki/Internet_Archive',
		title: 'Internet Archive',
		description: 'American non-profit organization providing archives of digital media since 1996',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png'
		},
		distance: '300m'
	},
	{
		pageid: 11002203,
		url: 'https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music',
		title: 'Green Apple Books & Music',
		description: 'Bookstore in San Francisco',
		distance: '350m'
	},
	{
		pageid: 6761105,
		url: 'https://en.wikipedia.org/wiki/Mountain_Lake_Park',
		title: 'Mountain Lake Park',
		description: 'Park in San Francisco, California',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Mountain_Lake_%28468742548%29.jpg/150px-Mountain_Lake_%28468742548%29.jpg'
		},
		distance: '570m'
	}
];

export default defineComponent( {
	name: 'CardGroupWithThumbnails',
	components: { CdxCard, CdxIcon },
	setup() {
		return {
			cards,
			cdxIconMapPin
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-card-group {
	// The application implementing Cards must handle Card group layout styles.
	&__cards {
		display: flex;
		flex-wrap: wrap;
		gap: @spacing-100;
	}

	&__card {
		flex-basis: calc( 50% - @spacing-50 );
		box-sizing: @box-sizing-base;
	}

	p {
		margin-top: 0;
		font-weight: @font-weight-bold;
	}
}
</style>
```

vue

```
<template>
	<div class="cdx-docs-card-group">
		<p>Nearby Pages</p>
		<div class="cdx-docs-card-group__cards">
			<cdx-card
				v-for="card in cards"
				:key="card.pageid"
				class="cdx-docs-card-group__card"
				:url="card.url"
				:force-thumbnail="true"
				:thumbnail="card.thumbnail"
			>
				<template #title>
					{{ card.title }}
				</template>
				<template #description>
					{{ card.description }}
				</template>
				<template #supporting-text>
					<cdx-icon :icon="cdxIconMapPin" size="small"></cdx-icon> Distance: {{ card.distance }}
				</template>
			</cdx-card>
		</div>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxCard, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconMapPin } = require( './icons.json' );

// Simulation of results from a MediaWiki API.
const cards = [
	{
		pageid: 3613583,
		url: 'https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area',
		title: 'Golden Gate National Recreation Area',
		description: 'U.S. National Recreation Area surrounding San Francisco Bay Area',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg'
		},
		distance: '170m'
	},
	{
		pageid: 176931,
		url: 'https://en.wikipedia.org/wiki/Internet_Archive',
		title: 'Internet Archive',
		description: 'American non-profit organization providing archives of digital media since 1996',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png'
		},
		distance: '300m'
	},
	{
		pageid: 11002203,
		url: 'https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music',
		title: 'Green Apple Books & Music',
		description: 'Bookstore in San Francisco',
		distance: '350m'
	},
	{
		pageid: 6761105,
		url: 'https://en.wikipedia.org/wiki/Mountain_Lake_Park',
		title: 'Mountain Lake Park',
		description: 'Park in San Francisco, California',
		thumbnail: {
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Mountain_Lake_%28468742548%29.jpg/150px-Mountain_Lake_%28468742548%29.jpg'
		},
		distance: '570m'
	}
];

module.exports = defineComponent( {
	name: 'CardGroupWithThumbnails',
	components: { CdxCard, CdxIcon },
	setup() {
		return {
			cards,
			cdxIconMapPin
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-card-group {
	// The application implementing Cards must handle Card group layout styles.
	&__cards {
		display: flex;
		flex-wrap: wrap;
		gap: @spacing-100;
	}

	&__card {
		flex-basis: calc( 50% - @spacing-50 );
		box-sizing: @box-sizing-base;
	}

	p {
		margin-top: 0;
		font-weight: @font-weight-bold;
	}
}
</style>
```

### Developer notes

There are two considerations for Card groups:

*   **Layout:** Layout styles for groups of Cards, e.g. margins or grid layout, must be added by the application. The example above adds some simple layout styles to a group of Cards. Consider using flexbox or CSS grid to lay out Cards consistently.
*   **Media consistency:** As shown above, adding a `thumbnail` prop will display the Thumbnail. For groups of Cards, you may want to display a Thumbnail for each Card if available, and otherwise display a placeholder. To enable this behavior, add the `forceThumbnail` prop, as demonstrated below. The third item has no Thumbnail and display a placeholder Icon instead.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `url` | If provided, the Card will be a link to this URL. | `string` | `''` |
| `icon` | Icon displayed at the start of the Card. | `[Icon](../types-and-constants.html#icon)` | `''` |
| `thumbnail` | Thumbnail image data for the Card. | `[Thumbnail](../types-and-constants.html#thumbnail)\|null` | `null` |
| `forceThumbnail` | Option to force a thumbnail layout.  <br>  <br>When set to `true`, the Card will display a Thumbnail. If a `thumbnail` prop was also provided, the thumbnail image will display. Otherwise, a placeholder icon will display.  <br>  <br>This is useful when displaying groups of Cards when some of the cards have thumbnail images but some do not. `forceThumbnail` will provide a consistent layout for that group.  <br>  <br>Note that this prop is not needed to display a thumbnail image: if the `thumbnail` prop is provided, it will display. This prop is only needed to enable the display of the thumbnail placeholder icon when the `thumbnail` prop is not provided. | `boolean` | `false` |
| `customPlaceholderIcon` | Optional custom icon for the placeholder shown when `forceThumbnail` is true but no thumbnail is provided.  <br>  <br>Defaults to the default placeholder icon set in the Thumbnail component. | `[Icon](../types-and-constants.html#icon)` | `undefined` |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| title | Card title |     |
| description | Card description |     |
| supporting-text | Short supporting text |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

Card titleDescriptionSupporting text

Show codeCopy code

html

```
<!-- Wrapper element (can be <span> or <a>). -->
<span class="cdx-card">
  <!-- Card text. -->
  <span class="cdx-card__text">
    <!-- Title. -->
    <span class="cdx-card__text__title">Card title</span>
    <!-- Optional description. -->
    <span class="cdx-card__text__description">Description</span>
    <!-- Optional supporting text. -->
    <span class="cdx-card__text__supporting-text">Supporting text</span>
  </span>
</span>
```

#### With link [​](#with-link-1)

To make the entire Card a link, use an `<a>` element and include the class `cdx-card--is-link`.

[Card titleDescription](https://www.example.com)

Show codeCopy code

html

```
<a class="cdx-card cdx-card--is-link" href="https://www.example.com">
  <span class="cdx-card__text">
    <span class="cdx-card__text__title">Card title</span>
    <span class="cdx-card__text__description">Description</span>
  </span>
</a>
```

#### With media [​](#with-media)

##### Image [​](#image)

To add an image, add the following markup:

*   A `<span>` with the classes `cdx-card--thumbnail` and `cdx-thumbnail`
*   Inside of that `<span>`, add an empty `<span>` element with the class `cdx-thumbnail__image`, plus a custom CSS class that you can use to add a `background-image` rule (alternately, you can add the `background-image` rule via a `style` attribute on this `<span>`)

See the [CSS-only Thumbnail](./thumbnail.html#css-only-version) documentation for more examples.

Card titleDescriptionSupporting text

Show codeCopy code

html

```
<span class="cdx-card">
  <span class="cdx-card__thumbnail cdx-thumbnail">
    <span class="cdx-thumbnail__image cdx-demo-colored-pencils"></span>
  </span>
  <span class="cdx-card__text">
    <span class="cdx-card__text__title">Card title</span>
    <span class="cdx-card__text__description">Description</span>
    <span class="cdx-card__text__supporting-text">Supporting text</span>
  </span>
</span>
```

less

```
.cdx-demo-colored-pencils {
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg);
}
```

##### Icon [​](#icon)

To add an Icon, add a `<span>` element with the class `cdx-card__icon`, plus a custom class that you can use to add a [CSS-only Icon](./icon.html#css-only-version).

Card titleDescriptionSupporting text

Show codeCopy code

html

```
<span class="cdx-card">
  <span class="cdx-card__icon cdx-demo-css-icon--robot"></span>
  <span class="cdx-card__text">
    <span class="cdx-card__text__title">Card title</span>
    <span class="cdx-card__text__description">Description</span>
    <span class="cdx-card__text__supporting-text">Supporting text</span>
  </span>
</span>
```

NPMMediaWiki

less

```
// Note: you must import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--robot {
  .cdx-mixin-css-icon( @cdx-icon-robot );
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon--robot {
  .cdx-mixin-css-icon( @cdx-icon-robot );
}
```

#### Card groups [​](#card-groups-1)

See the [documentation above](#card-groups) for UX guidelines.

Nearby Pages

[Golden Gate National Recreation AreaU.S. National Recreation Area surrounding San Francisco Bay Area Distance: 170m](https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area) [Internet ArchiveAmerican non-profit organization providing archives of digital media since 1996 Distance: 300m](https://en.wikipedia.org/wiki/Internet_Archive) [Green Apple Books & MusicBookstore in San Francisco Distance: 350m](https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music)

Show codeCopy code

html

```
<div class="cdx-docs-card-group-with-thumbnails">
  <p>Nearby Pages</p>
  <a
    href="https://en.wikipedia.org/wiki/Golden_Gate_National_Recreation_Area"
    class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card"
  >
    <span class="cdx-thumbnail cdx-card__thumbnail">
      <span
        style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg/150px-Golden_Gate_-_Lands_End_-_Point_Lobos_2009.jpg );"
        class="cdx-thumbnail__image"
      ></span>
    </span>
    <span class="cdx-card__text">
      <span class="cdx-card__text__title">
        Golden Gate National Recreation Area
      </span>
      <span class="cdx-card__text__description">
        U.S. National Recreation Area surrounding San Francisco Bay Area
      </span>
      <span class="cdx-card__text__supporting-text">
        <span class="cdx-demo-css-icon--map-pin"></span> Distance: 170m
      </span>
    </span>
  </a>
  <a
    href="https://en.wikipedia.org/wiki/Internet_Archive"
    class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card"
  >
    <span class="cdx-thumbnail cdx-card__thumbnail">
      <span
        style="background-image: url( https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Internet_Archive_logo_and_wordmark.svg/150px-Internet_Archive_logo_and_wordmark.svg.png );"
        class="cdx-thumbnail__image"
      ></span>
    </span>
    <span class="cdx-card__text">
      <span class="cdx-card__text__title"> Internet Archive </span>
      <span class="cdx-card__text__description">
        American non-profit organization providing archives of digital media
        since 1996
      </span>
      <span class="cdx-card__text__supporting-text">
        <span class="cdx-demo-css-icon--map-pin"></span> Distance: 300m
      </span>
    </span>
  </a>
  <a
    href="https://en.wikipedia.org/wiki/Green_Apple_Books_%26_Music"
    class="cdx-card cdx-card--is-link cdx-docs-card-group-with-thumbnails__card"
  >
    <span class="cdx-thumbnail cdx-card__thumbnail">
      <span class="cdx-thumbnail__placeholder">
        <span class="cdx-thumbnail__placeholder__icon"></span>
      </span>
    </span>
    <span class="cdx-card__text">
      <span class="cdx-card__text__title"> Green Apple Books & Music </span>
      <span class="cdx-card__text__description">
        Bookstore in San Francisco
      </span>
      <span class="cdx-card__text__supporting-text">
        <span class="cdx-demo-css-icon--map-pin"></span> Distance: 350m
      </span>
    </span>
  </a>
</div>
```

NPMMediaWiki

less

```
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";

.cdx-docs-card-group-with-thumbnails {
  p {
    margin-top: 0;
    font-weight: @font-weight-bold;
  }

  // The application implementing Cards must handle Card group layout styles.
  &__card {
    margin-bottom: @spacing-100;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-docs-card-group-with-thumbnails {
  p {
    margin-top: 0;
    font-weight: @font-weight-bold;
  }

  // The application implementing Cards must handle Card group layout styles.
  &__card {
    margin-bottom: @spacing-100;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | If the Card is interactive, it places the focus on the Card. If a non-interactive Card contains a link, this key places the focus in that link. When the focus is placed within an interactive Card or within the link of a non-interactive Card, it moves the focus to the next interactive element in tab order. |
| Shift + Tab | It moves the focus to the previous interactive element. |
| Enter | If the focus is on an interactive Card, it will open its hyperlink. When the focus is on a link within a Card, it will open the link. |

Pager

[Previous pageAccordion](/codex/latest/components/demos/accordion.html)

[Next pageDialog](/codex/latest/components/demos/dialog.html)