# ProgressIndicator [​](#progressindicator)

A ProgressIndicator is a visual element used to indicate the ongoing, indefinite progress of an action or process.

ProgressIndicator label

Show codeCopy code

Reset demo

```markup
<cdx-progress-indicator>ProgressIndicator label</cdx-progress-indicator>
```

| Name | Value |
| --- | --- |
| Props |     |
| showLabel |     |
| Slots |     |
| default |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use ProgressIndicator [​](#when-to-use-progressindicator)

ProgressIndicator animates continuously to indicate that an action or content loading is in progress, helping users understand when the system is actively working on a task with unknown completion time.

**Use ProgressIndicator when:**

*   Indicating asynchronous processes with an unknown completion time.
*   Displaying inline with text to represent ongoing background processes.
*   Loading section-level content where preserving layout isn't essential.
*   Providing immediate feedback for user-initiated actions.
*   Offering a compact, animated visual cue to indicate ongoing activity.

**Avoid using ProgressIndicator when:**

*   Loading states need to maintain content layout. In such cases, use an inline [ProgressBar](./progress-bar.html) instead.

### About ProgressIndicator [​](#about-progressindicator)

ProgressIndicator includes the following elements.

#### Spinner indicator [​](#spinner-indicator)

A rotating element that represents an ongoing process or loading state. It helps users understand that an action is in progress.

*   Use for indeterminate, short-duration processes.
*   Don't modify the spinner's color or size.

#### Label (optional) [​](#label-optional)

A brief message providing additional context about the loading process, such as a description of the action being performed or an estimated wait time.

*   Include a label when additional clarification is needed for the loading context.
*   Don't use lengthy or unclear loading messages.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

By default, the spinner appears without text, serving as a simple visual indicator of a loading process.

*   Center the spinner in its loading area.

ProgressIndicator label

Show codeCopy code

template

```
<cdx-progress-indicator>
	ProgressIndicator label
</cdx-progress-indicator>
```

WARNING

ProgressIndicator require one of the following: Label via default slot or set the `aria-hidden` attribute.

When either is set the ProgressIndicator is understandable to assistive technology users.

### With label [​](#with-label)

A spinner can be accompanied by text in cases where additional context is needed to clarify the loading process.

*   Use clear, concise text to describe the loading process.
*   Don't use long or multi-line text.
*   Don't add ellipsis (…) to loading text - the spinner already communicates the ongoing process.

ProgressIndicator label

Show codeCopy code

template

```
<cdx-progress-indicator show-label>
	ProgressIndicator label
</cdx-progress-indicator>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `showLabel` | Whether the label should be visible.  <br>  <br>This will show or hide the text carrying `<span>` element next to the progress indicator. | `boolean` | `false` |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | ProgressIndicator label text. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The most common usage of ProgressIndicators is without a label. In the CSS-only version, there is a small deviation from the Vue version. The `aria-label` attribute is used to provide a description of the progress indicator to assistive technologies – instead of a label element to ensure leaner markup.

Show codeCopy code

html

```
<!-- Wrapper `<div>` element. -->
<div class="cdx-progress-indicator">
  <!-- The animated element itself. -->
  <div class="cdx-progress-indicator__indicator">
    <!-- The `<progress>` element itself, visually hidden, with ARIA label. -->
    <progress
      class="cdx-progress-indicator__indicator__progress"
      aria-label="ProgressIndicator label"
    ></progress>
  </div>
</div>
```

#### With visible label [​](#with-visible-label)

ProgressIndicator label

Show codeCopy code

html

```
<!-- Wrapper `<div>` element. -->
<div class="cdx-progress-indicator">
  <!-- The animated element itself. -->
  <div class="cdx-progress-indicator__indicator">
    <!-- The `<progress>` element itself, visually hidden, with `id` to connect with label. -->
    <progress
      class="cdx-progress-indicator__indicator__progress"
      id="cdx-demo-progress-indicator-0"
    ></progress>
  </div>
  <!-- Label wrapper `<div>` element. -->
  <div class="cdx-label cdx-progress-indicator__label">
    <!-- Actual `<label>` element with `for` attribute to establish connection. -->
    <label class="cdx-label__label" for="cdx-demo-progress-indicator-0">
      <span class="cdx-label__label__text">ProgressIndicator label</span>
    </label>
  </div>
</div>
```

Pager

[Previous pageProgressBar](/codex/latest/components/demos/progress-bar.html)

[Next pageIcon](/codex/latest/components/demos/icon.html)