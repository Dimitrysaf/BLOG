# InfoChip [​](#infochip)

An InfoChip is a non-interactive indicator that provides information and/or conveys a status.

Info Chip

Show codeCopy code

Reset demo

```markup
<cdx-info-chip>Info Chip</cdx-info-chip>
```

| Name | Value |
| --- | --- |
| Props |     |
| icon |     |
| status | notice<br><br>warning<br><br>error<br><br>success |
| Slots |     |
| default |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |
| **Note**: For icon properties, the relevant icon also needs to be imported from the `@wikimedia/codex-icons` package. See [the usage documentation](../../using-codex/developing.html#using-icons) for more information. |     |

## Overview [​](#overview)

### When to use InfoChip [​](#when-to-use-infochip)

Use the InfoChip component to label, categorize, or organize information using keywords. This type of chip is informative so it cannot be clickable or removable.

Depending on the type of feedback conveyed to the user, InfoChips can be used to convey one of four statuses.

1.  **Notice**  
    Use to convey a general, neutral, and non-urgent status.
2.  **Warning**  
    Use to convey a cautionary status.
3.  **Error**  
    Use to convey a negative status.
4.  **Success**  
    Use to convey a positive status.

### About InfoChip [​](#about-infochip)

InfoChip includes the following elements.

#### Icon (optional) [​](#icon-optional)

For notice chips, the icon is optional and customizable, while for chips providing feedback (warning, error, and success), the icon is required to communicate the feedback status effectively.

*   Use a start icon in notice chips when needed to strengthen the text, or hide it if not required.
*   Avoid removing or replacing the icon in warning, error, and success chips, as it reinforces the meaning of their respective statuses.

#### Label [​](#label)

Descriptive text about the chip.

*   Use short text with the InfoChip. Long text content will be truncated with an ellipsis and lines will not be wrapped.
    

## Examples [​](#examples)

### With icon [​](#with-icon)

For notice chips, the icon can be customized.

Photos

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-info-chip :icon="cdxIconCamera">
			Photos
		</cdx-info-chip>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxInfoChip } from '@wikimedia/codex';
import { cdxIconCamera } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ChipWithIcon',
	components: {
		CdxInfoChip
	},
	setup() {
		return {
			cdxIconCamera
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-info-chip :icon="cdxIconCamera">
			Photos
		</cdx-info-chip>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxInfoChip } = require( '@wikimedia/codex' );
const { cdxIconCamera } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'ChipWithIcon',
	components: {
		CdxInfoChip
	},
	setup() {
		return {
			cdxIconCamera
		};
	}
} );
</script>
```

### Developer notes

Custom icons can only be used with the `notice` status. If they are passed with a different status, they will be ignored.

### Statuses [​](#statuses)

Use the `status` prop to create warning, error, and success InfoChips.

1 test has not run

2 tests are failing

All tests are passing

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div class="cdx-demo-info-chips">
		<div>
			<cdx-info-chip status="warning">
				1 test has not run
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="error">
				2 tests are failing
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="success">
				All tests are passing
			</cdx-info-chip>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxInfoChip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipsWithStatuses',
	components: {
		CdxInfoChip
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-info-chips {
	display: flex;
	flex-direction: column;
	gap: @spacing-100;
}
</style>
```

vue

```
<template>
	<div class="cdx-demo-info-chips">
		<div>
			<cdx-info-chip status="warning">
				1 test has not run
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="error">
				2 tests are failing
			</cdx-info-chip>
		</div>
		<div>
			<cdx-info-chip status="success">
				All tests are passing
			</cdx-info-chip>
		</div>
	</div>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxInfoChip } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'ChipsWithStatuses',
	components: {
		CdxInfoChip
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-demo-info-chips {
	display: flex;
	flex-direction: column;
	gap: @spacing-100;
}
</style>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Values | Default |
| --- | --- | --- | --- | --- |
| `status` | Status type. | `[StatusType](../types-and-constants.html#statustype)` | `'notice'`, `'warning'`, `'error'`, `'success'` | `'notice'` |
| `icon` | Custom icon to use for "notice" chips. Chips with other status types (warning, etc) do not allow custom icons and will ignore this option. | `[Icon](../types-and-constants.html#icon)` | \-  | `null` |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Chip content. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

##### Text only [​](#text-only)

A simple chip with text content and no icon is straightforward.

Info Chip

Show codeCopy code

html

```
<!-- Outer element is a <div>. -->
<div class="cdx-info-chip">
  <!-- Text element. -->
  <span class="cdx-info-chip__text">
    <!-- Chip text -->
    Info Chip
  </span>
</div>
```

#### Status types [​](#status-types)

There are four status types, "notice", "warning", "error", and "success".

Apply the following classes to the root element to define the status styles:

*   Notice: `cdx-info-chip--notice` (class can be omitted since this is the default)
*   Warning: `cdx-info-chip--warning`
*   Error: `cdx-info-chip--error`
*   Success: `cdx-info-chip--success`

#### Status icons [​](#status-icons)

Each status has a corresponding default icon (`cdxIconInfoFilled` for "notice" status, `cdxIconAlert` for "warning" status, `cdxIconError` for "error" status, and `cdxIconSuccess` for "success" status). Examples of the default icons can be found below.

To use the default icon for a given chip status, simply include an empty `<span>` element with the class `cdx-info-chip__icon` inside the chip element.

Notice

Warning

Error

Success

Show codeCopy code

html

```
<!-- Outer element is a <div> with the default "notice" class. -->
<div class="cdx-info-chip cdx-info-chip--notice">
  <!-- Icon element. -->
  <span class="cdx-info-chip__icon"></span>
  <!-- Text element. -->
  <span class="cdx-info-chip__text">
    <!-- Chip text -->
    Notice
  </span>
</div>
<!-- Outer element is a <div> with the "warning" class. -->
<div class="cdx-info-chip cdx-info-chip--warning">
  <span class="cdx-info-chip__icon"></span>
  <span class="cdx-info-chip__text"> Warning </span>
</div>
<!-- Outer element is a <div> with the "error" class. -->
<div class="cdx-info-chip cdx-info-chip--error">
  <span class="cdx-info-chip__icon"></span>
  <span class="cdx-info-chip__text"> Error </span>
</div>
<!-- Outer element is a <div> with the "success" class. -->
<div class="cdx-info-chip cdx-info-chip--success">
  <span class="cdx-info-chip__icon"></span>
  <span class="cdx-info-chip__text"> Success </span>
</div>
```

#### Custom icons [​](#custom-icons)

You can customize the icon by using the CSS-only Icon Less mixin (`.cdx-mixin-css-icon`) to apply the icon styles, passing the appropriate parameters to the mixin.

Custom icons should only be used with "notice" status InfoChips.

Notice

Photos

Users

Articles

Show codeCopy code

html

```
<div class="cdx-info-chip cdx-info-chip--notice">
  <!-- Custom icon element. -->
  <span class="cdx-demo-css-icon--heart"></span>
  <span class="cdx-info-chip__text"> Notice </span>
</div>
<div class="cdx-info-chip cdx-info-chip--notice">
  <!-- Custom icon element. -->
  <span class="cdx-demo-css-icon--camera"></span>
  <span class="cdx-info-chip__text"> Photos </span>
</div>
<div class="cdx-info-chip cdx-info-chip--notice">
  <!-- Custom icon element. -->
  <span class="cdx-demo-css-icon--user"></span>
  <span class="cdx-info-chip__text"> Users </span>
</div>
<div class="cdx-info-chip cdx-info-chip--notice">
  <!-- Custom icon element. -->
  <span class="cdx-demo-css-icon--article"></span>
  <span class="cdx-info-chip__text"> Articles </span>
</div>
```

NPMMediaWiki

less

```
// Note: Import the design tokens before importing the css-icon mixin
@import (reference) "@wikimedia/codex-design-tokens/theme-wikimedia-ui.less";
@import (reference) "@wikimedia/codex/mixins/css-icon.less";

.cdx-demo-css-icon--heart {
  .cdx-mixin-css-icon( @cdx-icon-heart, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--camera {
  .cdx-mixin-css-icon( @cdx-icon-camera, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--user {
  .cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--article {
  .cdx-mixin-css-icon( @cdx-icon-article, @color-icon-notice, @size-icon-small );
}
```

less

```
@import "mediawiki.skin.variables.less";

.cdx-demo-css-icon--heart {
  .cdx-mixin-css-icon( @cdx-icon-heart, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--camera {
  .cdx-mixin-css-icon( @cdx-icon-camera, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--user {
  .cdx-mixin-css-icon( @cdx-icon-user-avatar, @color-icon-notice, @size-icon-small );
}

.cdx-demo-css-icon--article {
  .cdx-mixin-css-icon( @cdx-icon-article, @color-icon-notice, @size-icon-small );
}
```

Pager

[Previous pageTooltip](/codex/latest/components/directives/tooltip.html)

[Next pageMessage](/codex/latest/components/demos/message.html)