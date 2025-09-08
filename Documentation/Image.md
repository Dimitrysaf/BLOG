# Image [​](#image)

An Image is a visual element used to display content in various formats and states, supporting features like aspect ratios, placeholders, and responsive sizing.

![Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park.](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg)

Show codeCopy code

Reset demo

```markup
<cdx-image />
```

| Name | Value |
| --- | --- |
| Props |     |
| aspectRatio | 16:9<br><br>3:2<br><br>4:3<br><br>1:1<br><br>3:4<br><br>2:3 |
| objectFit | fill<br><br>contain<br><br>cover<br><br>none<br><br>scale-down |
| objectPosition | top<br><br>bottom<br><br>left<br><br>right<br><br>center |
| position | left<br><br>center<br><br>right |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Image [​](#when-to-use-image)

Use the Image component to display visual content like photos or illustrations that enhance context and meaning of surrounding content.

Avoid using the Image component for small previews. Use the [Thumbnail](./thumbnail.html) component instead.

Accessibility

Always provide meaningful `alt` text in Image to ensure accessibility.

### About Image [​](#about-image)

Image includes the following elements.

#### Image [​](#image-1)

The Image component displays an image element if an image has been provided.

*   Use contextually relevant, neutral, high-quality images that accurately represent the subject and respect copyright requirements. Refer to the [Style Guide](./../../style-guide/images.html) to learn more about how to use images.
    

#### Placeholder icon [​](#placeholder-icon)

If the image is missing or loading, a placeholder icon on a background is displayed.

*   Customize the icon if needed.
*   Use an icon that provides clear context for the use of the Image.

## Examples [​](#examples)

### Default [​](#default)

By default, the Image component displays an image in its original dimensions.

![Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxImage } from '@wikimedia/codex';

const imageData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
	alt: 'Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park',
	width: 400,
	height: 220,
	position: 'center'
};

export default defineComponent( {
	name: 'ImageDefault',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	></cdx-image>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxImage } = require( '@wikimedia/codex' );

const imageData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
	alt: 'Olive-bellied Sunbird flying from a flower to another at Kibale forest National Park',
	width: 400,
	height: 220,
	position: 'center'
};

module.exports = defineComponent( {
	name: 'ImageDefault',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
```

### Aspect ratio [​](#aspect-ratio)

The component supports aspect ratios to preserve layout structure.

![An example image with aspect ratio 16:9](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg)

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:aspect-ratio="aspectRatio"
		:object-fit="objectFit"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxImage } from '@wikimedia/codex';

const imageData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
	alt: 'An example image with aspect ratio 16:9',
	width: 400,
	height: 220,
	position: 'center'
};

const aspectRatio = '3:4';
const objectFit = 'cover';

export default defineComponent( {
	name: 'ImageAspectRatio',
	components: { CdxImage },
	setup() {
		return {
			imageData,
			aspectRatio,
			objectFit
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:aspect-ratio="aspectRatio"
		:object-fit="objectFit"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	></cdx-image>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxImage } = require( '@wikimedia/codex' );

const imageData = {
	url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/2560px-003_Olive-bellied_Sunbird_in_flight_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg',
	alt: 'An example image with aspect ratio 16:9',
	width: 400,
	height: 220,
	position: 'center'
};

const aspectRatio = '3:4';
const objectFit = 'cover';

module.exports = defineComponent( {
	name: 'ImageAspectRatio',
	components: { CdxImage },
	setup() {
		return {
			imageData,
			aspectRatio,
			objectFit
		};
	}
} );
</script>
```

### Placeholder [​](#placeholder)

The placeholder serves two purposes:

1.  To display while the image is loading, improving the experience of those with slower connections.
2.  To display when an image is not provided.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxImage } from '@wikimedia/codex';

const imageData = {
	url: '',
	alt: 'This is an example of an image placeholder',
	width: 400,
	height: 220,
	position: 'center'
};

export default defineComponent( {
	name: 'ImagePlaceholder',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-image
		:src="imageData.url"
		:alt="imageData.alt"
		:width="imageData.width"
		:height="imageData.height"
		:position="imageData.position"
	></cdx-image>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxImage } = require( '@wikimedia/codex' );

const imageData = {
	url: '',
	alt: 'This is an example of an image placeholder',
	width: 400,
	height: 220,
	position: 'center'
};

module.exports = defineComponent( {
	name: 'ImagePlaceholder',
	components: { CdxImage },
	setup() {
		return {
			imageData
		};
	}
} );
</script>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Values | Default |
| --- | --- | --- | --- | --- |
| `src` | The source URL of the image. | `string` | \-  | `''` |
| `alt`(required) | Alternative text for the image.  <br>  <br>Descriptive text must be provided unless the image is decorative or described elsewhere. | `string` | \-  | `''` |
| `aspectRatio` | The aspect ratio of the image.  <br>  <br>Accepts one of the predefined aspect ratios. | `[ImageAspectRatio](../types-and-constants.html#imageaspectratio)` | \-  | `null` |
| `objectPosition` | The object-position of the image when cropping with an aspect ratio.  <br>  <br>Accepts 'top', 'bottom', 'left', 'right', or 'center'. | `typeof ObjectPositions[number]` | \-  | `'center'` |
| `objectFit` | Specifies how the image should be resized to fit its container. Accepts 'fill', 'contain', 'cover', 'none', or 'scale-down'. | `typeof ObjectFitOptions[number]` | \-  | `'cover'` |
| `position` | Image position on a page | `string` | `left`, `center`, `right` | `''` |
| `width` | The width of the image in pixels. | `string\|number` | \-  | `undefined` |
| `height` | The height of the image in pixels. | `string\|number` | \-  | `undefined` |
| `loadingPriority` | The loading priority of the image.  <br>  <br>Accepts 'lazy' or 'eager'. | `string` | `lazy`, `eager` | `'lazy'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `error` | **event** `Event` - The error event object. | Emitted when an error occurs loading the image. |

Pager

[Previous pageIcon](/codex/latest/components/demos/icon.html)

[Next pageThumbnail](/codex/latest/components/demos/thumbnail.html)