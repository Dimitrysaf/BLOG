# Message [​](#message)

A Message provides system feedback for users. Messages can be provided as a prominently-displayed banner with a longer explanation, or as inline validation feedback.

Message text

Show codeCopy code

Reset demo

```markup
<cdx-message>Message text</cdx-message>
```

| Name | Value |
| --- | --- |
| Props |     |
| type | notice<br><br>warning<br><br>error<br><br>success |
| inline |     |
| allowUserDismiss |     |
| Slots |     |
| default |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Message [​](#when-to-use-message)

Use the Message component to display system feedback, respond to user actions, or provide information. Use inline Messages to offer feedback on the validation of form inputs.

Depending on the type of feedback conveyed to the user, Messages can be used to convey one of four statuses.

1.  **Notice**  
    Use to provide general, neutral and non-urgent information or recommendations.
2.  **Warning**  
    Use to provide important information about circumstances that require caution.
3.  **Error**  
    Use to alert the user only in situation where their immediate attention is needed. Error Messages have the strongest visual priority of all system messages.
4.  **Success**  
    Use to deliver feedback of a successful user interaction, like publishing an article.

### About Message [​](#about-message)

Message includes the following elements.

#### Icon [​](#icon)

Icons simplify user recognition and provide the ability to shorten message text. A specific icon is matched with each message type (e.g., "success") to ensure recognition.

*   Customize the icon in notice Messages, or hide it if needed.
*   Avoid removing or replacing the icon in warning, error, and success Messages, as it reinforces the meaning of their respective statuses.

#### Message text [​](#message-text)

The message text should be as clear and concise as possible, offering feedback to users. If applicable, it may also suggest next steps.

*   Keep messages short and simple, with one or two solutions, to reduce cognitive load. [_Concise_](./../../style-guide/writing-for-copy.html#is-this-concise) & [_Accessible_](./../../style-guide/writing-for-copy.html#is-this-accessible)
    
*   Incorporate various text formats and links within the Message text as necessary.
    
*   Avoid bolding all the message text.
    

#### Close button (optional) [​](#close-button-optional)

To allow for the message to be dismissed, an optional icon-only quiet button can be included.

## Examples [​](#examples)

### Fade in [​](#fade-in)

We can apply a transition when a Message is dynamically added to the user interface.

Show message

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
  <cdx-button :disabled="showMessage" @click="showMessage = true">
    Show message
  </cdx-button>
  <cdx-message v-if="showMessage" type="warning" :fade-in="true">
    <p><strong>Warning!</strong> Here's some information you should know.</p>
  </cdx-message>
</template>

<script>
import { defineComponent } from "vue";
import { CdxMessage, CdxButton } from "@wikimedia/codex";

export default defineComponent({
  name: "MessageFadeIn",
  components: { CdxMessage, CdxButton },
  data() {
    return {
      showMessage: false,
    };
  },
});
</script>
```

vue

```
<template>
  <cdx-button :disabled="showMessage" @click="showMessage = true">
    Show message
  </cdx-button>
  <cdx-message v-if="showMessage" type="warning" :fade-in="true">
    <p><strong>Warning!</strong> Here's some information you should know.</p>
  </cdx-message>
</template>

<script>
const { defineComponent } = require("vue");
const { CdxMessage, CdxButton } = require("@wikimedia/codex");

module.exports = defineComponent({
  name: "MessageFadeIn",
  components: { CdxMessage, CdxButton },
  data() {
    return {
      showMessage: false,
    };
  },
});
</script>
```

### Developer notes

Use the `fadeIn` prop to enable a transition.

### Dismiss button [​](#dismiss-button)

Messages can be dismissed by using the close button within the Message. Note that inline Messages cannot be dismissable.

Notice message with dismiss button

Show codeCopy code

Reset demo

template

```
<cdx-message dismiss-button-label="Close">
	Notice message with dismiss button
</cdx-message>
```

### Developer notes

Messages can be made dismissable by setting the `allowUserDismiss` prop to `true`.

When the dismiss button is pressed, the Message component hides itself, and a 'user-dismissed' event is emitted to the parent component in case the parent component needs to react to the Message dismissal in some way.

### Auto-dismiss [​](#auto-dismiss)

Messages can be auto-dismissable. Auto-dismiss can be used with or without the manual dismiss button.

*   Use for very short Messages to ensure that they can be read and understood before disappearing.
*   Avoid using with error Messages to prevent the message from disappearing before users fix the error.

Show message

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
  <cdx-button :disabled="showMessage" @click="showMessage = true">
    Show message
  </cdx-button>
  <cdx-message
    v-if="showMessage"
    type="success"
    :fade-in="true"
    :auto-dismiss="true"
    :display-time="3000"
  >
    Success! This message will disappear...
  </cdx-message>
</template>

<script>
import { defineComponent } from "vue";
import { CdxMessage, CdxButton } from "@wikimedia/codex";

export default defineComponent({
  name: "MessageAutoDismiss",
  components: { CdxMessage, CdxButton },
  data() {
    return {
      showMessage: false,
    };
  },
});
</script>
```

vue

```
<template>
  <cdx-button :disabled="showMessage" @click="showMessage = true">
    Show message
  </cdx-button>
  <cdx-message
    v-if="showMessage"
    type="success"
    :fade-in="true"
    :auto-dismiss="true"
    :display-time="3000"
  >
    Success! This message will disappear...
  </cdx-message>
</template>

<script>
const { defineComponent } = require("vue");
const { CdxMessage, CdxButton } = require("@wikimedia/codex");

module.exports = defineComponent({
  name: "MessageAutoDismiss",
  components: { CdxMessage, CdxButton },
  data() {
    return {
      showMessage: false,
    };
  },
});
</script>
```

### Developer notes

The `autoDismiss` prop can be used to automatically remove the Message after a period of time. Set this prop to `true` to use the default display time of 4000 milliseconds (4 seconds). To customize the display time, set the `autoDismiss` prop to a number of milliseconds.

This feature should only be used for very short messages to ensure they can be read and understood before disappearing. When in doubt, do not use auto-dismiss. Auto-dismiss cannot be used for error Messages: if the `type` prop is set to `error`, the `autoDismiss` prop will be ignored and a warning will be thrown if it's set.

### Multiline [​](#multiline)

Message content can contain multiple lines. Message text can incorporate various text formats and links.

**An error has occurred.**

Comprehensive explanation of the error.

[Link](#) to more information.

Show codeCopy code

template

```
<cdx-message type="error">
	<p><strong>An error has occurred.</strong></p>
	<p>Comprehensive explanation of the error.</p>
	<p><a href="#">Link</a> to more information.</p>
</cdx-message>
```

### With custom icon [​](#with-custom-icon)

Only notice Messages may have a custom icon.

Notice message with custom icon

Show codeCopy code

template

```
<cdx-message :icon="cdxIconArticle">
	Notice message with custom icon
</cdx-message>
```

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Message styles and icon will vary depending on the message type (notice, warning, error or success). Messages are block style by default, but can be displayed as inline Messages via the `inline` prop.

Block-style Messages can be made dismissable in the following ways:

*   By using the `allowUserDismiss` prop, which adds a dismiss button.
*   By using the `autoDismiss` prop. This can be set to `true` to use the default display time of 4000 milliseconds (4 seconds), or the display time can be customized by setting `autoDismiss` to a number of milliseconds. Error Messages cannot auto-dismiss: if the `type` prop is set to `error`, then the `autoDismiss` prop will be ignored.

#### Props [​](#props)

| Prop name | Description | Type | Values | Default |
| --- | --- | --- | --- | --- |
| `type` | Status type of Message. | `[StatusType](../types-and-constants.html#statustype)` | `'notice'`, `'warning'`, `'error'`, `'success'` | `'notice'` |
| `inline` | Whether this message follows the inline design (no padding, background color, or border). | `boolean` | \-  | `false` |
| `icon` | Custom message icon. Only allowed for notice messages. | `[Icon](../types-and-constants.html#icon)` | \-  | `null` |
| `fadeIn` | Whether the message should fade in. Should be used for messages that are dynamically displayed, not present on page load. | `boolean` | \-  | `false` |
| `allowUserDismiss` | Allow the message to be dismissed by the user. Adds an icon-only dismiss button. | `boolean` | \-  | `false` |
| `dismissButtonLabel` | Visually-hidden label text for the dismiss button for user-dismissable messages.  <br>  <br>Omit this prop to use the default value, "Close". | `string` | \-  | `''` |
| `autoDismiss` | Enable automatic dismissal of message after a period of time.  <br>  <br>This prop can be set to `true` to use the default display time of 4000 milliseconds. To customize the display time, set this prop to a number of milliseconds.  <br>  <br>Error messages cannot be automatically dismissed. If the `type` prop is set to `error`, this prop will be ignored.  <br>  <br>TODO: consider adding a stricter validator to set limits on this. If the time is too short, the message may not be readable. If the time is too long, the message probably shouldn't be auto-dismissed. | `boolean\|number` | \-  | `false` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `user-dismissed` |     | Emitted when the message is dismissed by the user via the dismiss button. |
| `auto-dismissed` |     | Emitted when the message is automatically dismissed after the display time. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| default | Message content. |     |

### CSS-only version [​](#css-only-version)

Note that some features of the Vue component require JavaScript and are therefore not supported in the CSS-only version (fade in, dismiss button, and auto-dismiss).

#### Markup structure [​](#markup-structure)

TIP

The outer `<div>` should have one of the following ARIA attributes:

*   For notice, warning, and success Messages: `aria-live="polite"`
*   For error Messages: `role="alert"`

Message content (can include markup)

Show codeCopy code

html

```
<!-- Root element with layout and type classes, and additional attribute(s). -->
<div
  class="cdx-message cdx-message--block cdx-message--notice"
  aria-live="polite"
>
  <!-- Empty span for message icon. -->
  <span class="cdx-message__icon"></span>
  <!-- Div for content. -->
  <div class="cdx-message__content">Message content (can include markup)</div>
</div>
```

#### Message layout [​](#message-layout)

There are two layout styles for Messages: block and inline. Use the following classes to apply these layouts.

*   Block: `cdx-message--block` (class can be omitted since this is the default)
*   Inline: `cdx-message--inline`

This is a block-style message.

This is an inline-style message.

Show codeCopy code

html

```
<div
  class="cdx-message cdx-message--block cdx-message--notice"
  aria-live="polite"
>
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">This is a block-style message.</div>
</div>
<div
  class="cdx-message cdx-message--inline cdx-message--notice"
  aria-live="polite"
>
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">This is an inline-style message.</div>
</div>
```

#### Message types [​](#message-types)

There are 4 Message types, which change the colors and icon depending on the message's purpose. Use these classes to apply the different Message type styles:

*   Notice: `cdx-message--notice` (class can be omitted since this is the default)
*   Warning: `cdx-message--warning`
*   Error: `cdx-message--error`
*   Success: `cdx-message--success`

This is a notice message.

This is a warning message.

This is an error message.

This is a success message.

Show codeCopy code

html

```
<div
  class="cdx-message cdx-message--block cdx-message--notice"
  aria-live="polite"
>
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">This is a notice message.</div>
</div>
<div
  class="cdx-message cdx-message--block cdx-message--warning"
  aria-live="polite"
>
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">This is a warning message.</div>
</div>
<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">This is an error message.</div>
</div>
<div
  class="cdx-message cdx-message--block cdx-message--success"
  aria-live="polite"
>
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">This is a success message.</div>
</div>
```

#### Multiline message [​](#multiline-message)

Message content can contain markup like bold text and links.

**An error has occurred.**

Comprehensive explanation of the error.

[Link](#) to more information.

Show codeCopy code

html

```
<div class="cdx-message cdx-message--block cdx-message--error" role="alert">
  <span class="cdx-message__icon"></span>
  <div class="cdx-message__content">
    <p><strong>An error has occurred.</strong></p>
    <p>Comprehensive explanation of the error.</p>
    <p><a href="#">Link</a> to more information.</p>
  </div>
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Enter | When the Message is closable and the focus is placed on its close button, it closes the Message. If the focus is placed on a link within the Message, it activates the link. |

Pager

[Previous pageInfoChip](/codex/latest/components/demos/info-chip.html)

[Next pageProgressBar](/codex/latest/components/demos/progress-bar.html)