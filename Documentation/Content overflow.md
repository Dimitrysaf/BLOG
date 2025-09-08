# Content overflow [​](#content-overflow)

An overarching guide for managing text and element content overflow in layouts.

## Types of content overflow [​](#types-of-content-overflow)

Content overflow occurs when the content within a component or element exceeds the designated space. This overflow can include:

1.  **Text overflow:** When lengthy text exceeds the available space within a component, such as lengthy text within a button.
2.  **Element overflow:** When all elements within a component are not visible due to space constraints, such as items requiring scrolling within a container.

To address the challenges posed by content overflow, we can use the following solutions:

*   Wrap text or content onto multiple lines.
*   Use an ellipsis to truncate overlong text.
*   Implement a fade effect to indicate that content can be scrolled to reveal additional information.

![A mix of elements: Tabs using an ellipsis on one of the tabs and fade to indicate scroll in the rest of tabs, a paragraph, and a group of accordions, one with a long label wrapped.](/codex/main/assets/content-overflow-types.COLsCq4q.svg)

## Wrapping [​](#wrapping)

Content wrapping involves allowing text or elements to overflow onto multiple lines. It is suitable for components where the height is not fixed or where vertical expansion is acceptable.

![A group of accordions: one accordion has a label wrapping onto two lines.](/codex/main/assets/content-overflow-wrapping-do.DTWbFhJP.svg)

Do:

*   Use wrapping as the base solution to content overflow, enabling text to extend onto multiple lines when it doesn’t affect the fixed height of the component.

![A collection of form items where the Select component appears taller than the other elements due to inappropriate text wrapping.](/codex/main/assets/content-overflow-wrapping-dont.DRCdmbbC.svg)

Don't:

*   Use wrapping in elements where uniformity in height is crucial.

## Truncation with ellipses [​](#truncation-with-ellipses)

Ellipses truncation can condense text in cases where the text becomes longer than expected.

![A Select component with its label truncated by an ellipsis.](/codex/main/assets/content-overflow-ellipsis-do.DJwcsC17.svg)

Do:

*   Use an ellipsis to maintain consistency when component height is essential.
*   Use an ellipsis to prevent disparities in the heights of element groups, such as a collection of chips or a group of buttons.
*   Include tooltip support for truncated text, enabling users to access full content as needed.

![An article title wrongly truncated by an ellipsis.](/codex/main/assets/content-overflow-ellipsis-dont.DGSagUc_.svg)

Don't:

*   Use an ellipsis in elements where uniformity in height is not crucial.

### Optional ellipses truncation [​](#optional-ellipses-truncation)

Ellipses truncation can also be used to optionally customize the number of lines for lengthy descriptions in specific components, like [Card](./../components/demos/card.html) or [Menu](./../components/demos/menu.html). In such cases, tooltips are unnecessary for displaying the entire description, as they are primarily used to display the label's content.

![Two cards with ellipsis truncation when the description is longer than three lines.](/codex/main/assets/content-overflow-customizable-ellipsis.aLdC2epV.svg)

### Bidirectionality for ellipses truncation [​](#bidirectionality-for-ellipses-truncation)

In left-to-right (LTR) languages, the ellipsis typically appears on the right side of the truncated text. In right-to-left (RTL) languages, such as Arabic or Hebrew, the ellipsis is typically situated on the left side, aligning with the natural flow of reading.

Refer to the [Bidirectionality guidelines](./bidirectionality.html) for more information about handling LTR and RTL behaviors.

![A Button with lengthy text in left-to-right (LTR) direction, truncating its label with an ellipsis.](/codex/main/assets/content-overflow-ellipsis-LTR.4XP9FKwg.svg)![A Button with lengthy text in right-to-left (RTL) direction, truncating its label with an ellipsis.](/codex/main/assets/content-overflow-ellipsis-RTL.UYUH2Q1b.svg)

## Truncation with fade [​](#truncation-with-fade)

Fade effects can be used as visual indicators of scroll within a group of elements, and they should not be used to indicate text truncation.

![Tabs using a fade effect to indicate that there is a scroll to reveal the rest of the tabs.](/codex/main/assets/content-overflow-fade-do.CSClU4Y9.svg)

Do:

*   Reserve fade effects to indicate that a group of elements can be scrolled.

![A Popup using a fade effect for truncating the long text.](/codex/main/assets/content-overflow-fade-dont.D2ccW04F.svg)

Don't:

*   Use fade effects for truncating text. Instead, use an ellipsis for text truncation.

Pager

[Previous pageData visualization](/codex/main/style-guide/data-visualization.html)

[Next pageUsing links and buttons](/codex/main/style-guide/using-links-and-buttons.html)