# ProgressBar [​](#progressbar)

A ProgressBar is a visual element used to indicate the progress of an action or process.

Show codeCopy code

Reset demo

```markup
<cdx-progress-bar aria-label="ProgressBar example" />
```

| Name | Value |
| --- | --- |
| Props |     |
| inline |     |
| ariaLabel |     |
| disabled |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use ProgressBar [​](#when-to-use-progressbar)

Use a ProgressBar when you want to provide real-time feedback on the progress of ongoing operations, such as file uploads or form submissions. There are different types of ProgressBars, depending on your intended use.

1.  **Default ProgressBar** indicates that the ongoing system process will affect an entire view or page area.
2.  **Inline ProgressBar** is available to indicate progress within other components, such as [Menu](./menu.html) or [Dialog](./dialog.html).

Avoid using a ProgressBar if the progress of a task is not crucial to user understanding or if the task is expected to complete quickly.

### About ProgressBar [​](#about-progressbar)

ProgressBar includes the following elements.

#### Progress element [​](#progress-element)

Visual representation of the progress displayed as a filled blue bar.

#### Bar container [​](#bar-container)

Background container that holds the progress bar.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

Show codeCopy code

template

```
<cdx-progress-bar aria-label="Indeterminate progress bar" />
```

WARNING

Due to the lack of descriptive text, a default ProgressBar requires one of the following attributes: `aria-label` or `aria-hidden`.

The `aria-label` attribute must be applied to the ProgressBar to ensure it is accessible to assistive technology users. An exception is an inline ProgressBar used within another component, such as the [Menu component](./menu.html), where they are excluded from the accessibility tree by adding `aria-hidden` attribute.

### Inline [​](#inline)

An inline version is available for use within other components. See [Menu](./menu.html#pending-state) for sample usage.

Show codeCopy code

template

```
<cdx-progress-bar :inline="true" />
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `inline` | Whether this is the smaller, inline variant. | `boolean` | `false` |
| `disabled` | Whether the progress bar is disabled. | `boolean` | `false` |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

Show codeCopy code

html

```
<!-- Wrapper div with ARIA attributes -->
<div
  class="cdx-progress-bar"
  role="progressbar"
  aria-label="ProgressBar example"
>
  <!-- Empty inner div -->
  <div class="cdx-progress-bar__bar" />
</div>
```

#### Inline [​](#inline-1)

For an inline ProgressBar, add the `cdx-progress-bar--inline` class to the root `<div>`.

Show codeCopy code

html

```
<div class="cdx-progress-bar cdx-progress-bar--inline" role="progressbar">
  <div class="cdx-progress-bar__bar" />
</div>
```

#### Disabled [​](#disabled)

For a disabled ProgressBar, add the `cdx-progress-bar--disabled` class to the root `<div>`.

Show codeCopy code

html

```
<div class="cdx-progress-bar cdx-progress-bar--disabled" role="progressbar">
  <div class="cdx-progress-bar__bar" />
</div>
```

Show codeCopy code

html

```
<div
  class="cdx-progress-bar cdx-progress-bar--inline cdx-progress-bar--disabled"
  role="progressbar"
>
  <div class="cdx-progress-bar__bar" />
</div>
```

Pager

[Previous pageMessage](/codex/latest/components/demos/message.html)

[Next pageProgressIndicator](/codex/latest/components/demos/progress-indicator.html)