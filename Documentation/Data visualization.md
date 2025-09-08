# Data visualization [​](#data-visualization)

Data visualization is the representation of data using charts, graphs, maps, or infographics. It helps make complicated data easier to understand and more visually engaging to the reader. Good data visualizations tell a story, highlight patterns, and make it simple to compare different pieces of information.

The following guidelines reference [color design tokens](./../design-tokens/color.html) are applied in the [MediaWiki Chart extension](https://mediawiki.org/wiki/Extension:Chart#Types_of_chart).

## About data visualization [​](#about-data-visualization)

Charts are powerful tools for visualizing data, making it easier to interpret trends, compare values, and communicate insights. Effective chart design involves understanding the key components of a chart, choosing the right type for the data, and following best practices for clarity and usability.

### Anatomy [​](#anatomy)

A well-structured chart consists of the following key elements.

#### Title & Context [​](#title-context)

A clear, descriptive title and any necessary subtitles or contextual information help define what the chart is showing.

*   `@color-emphasized` should be used in chart titles.
*   `@color-subtle` should be used for any necesary chart descriptions.

#### Plot Area [​](#plot-area)

The space where data points, gridlines, and other graphical elements are displayed.

*   `@background-color-base` should be used for the background area of charts.
*   `@border-color-subtle` can be used to frame the entire chart, separating it from other elements on the page.

#### Data Points [​](#data-points)

The individual elements that represent data within the chart.

*   Read more about [using color for data](#using-color-for-data).

#### Axes, Labels, Grid Lines & Ticks [​](#axes-labels-grid-lines-ticks)

These elements provide scale, proportion, and reference points to make the data easier to interpret. Axes should be labeled clearly, and grid lines should be used sparingly to avoid visual clutter.

*   `@border-color-emphasized` should be used for axis baselines and ticks.
*   `@border-color-muted` should be used for grid lines.
*   Ticks should be aligned to the center of the data point or label.

#### Baseline [​](#baseline)

Often representing zero, the baseline provides a key reference point. Bar charts should always start at zero, while line charts may not, as long as this is clearly indicated.

#### Legends [​](#legends)

Used to identify different data series, legends should be placed close to the chart for easy reference and limited to a maximum of five colors for clarity.

*   Legends should be oriented horizontally, inline, and wrap to the next line as needed on most charts.
*   For charts which take up less space, such as pie or donut, legends can be oriented vertically.

#### Interactive Annotations & Reference Lines [​](#interactive-annotations-reference-lines)

Annotations (e.g., tooltips or popups on hover) provide additional information, while reference lines highlight specific values or targets.

*   If available, tooltips and popups in charts should align to the styles of [Tooltip](./../components/directives/tooltip.html) and [Popover](./../components/demos/popover.html), using the same colors and styles.

## Choosing a chart [​](#choosing-a-chart)

Different types of charts are best suited for different kinds of data and insights. The main chart types can be grouped by the following functions.

*   **Comparison Charts** – Show differences between categories (e.g., bar charts, grouped bars, multi-line charts).
*   **Trend Charts** – Illustrate changes over time (e.g., line charts, area charts, histograms, sparklines).
*   **Part-to-Whole Charts** – Display how values contribute to a total (e.g., pie charts, stacked bars, treemaps).
*   **Correlation Charts** – Highlight relationships between variables (e.g., scatterplots, heatmaps).
*   **Ranking Charts** – Order data by value (e.g., ordered bar charts, parallel coordinates).

### Chart Design Guidelines [​](#chart-design-guidelines)

*   [**Bar Charts**](https://www.mediawiki.org/wiki/Extension:Chart#Bar) – Simple bar charts are ideal for comparing individual values. Grouped and stacked bars allow for more detailed comparisons but should be used carefully to avoid complexity.
*   [**Line Charts**](https://www.mediawiki.org/wiki/Extension:Chart#Line) – Best for showing trends over time, with multiple lines to compare different data sets.
*   [**Pie**](https://www.mediawiki.org/wiki/Extension:Chart#Pie) **& Donut Charts** – Used for part-to-whole comparisons but should be used sparingly, as bar charts often communicate the same data more effectively.
*   [**Area Charts**](https://www.mediawiki.org/wiki/Extension:Chart#Area) – Combine elements of line and bar charts to show total values with breakdowns. Stacked area charts emphasize part-to-whole relationships.
*   **Sparklines** – Compact, label-free charts useful for showing trends in small spaces, such as inline text or tables.
*   **Display Statistics** – Highlight a single, key data point for emphasis.

By selecting the appropriate chart type and following best practices, data can be presented in a clear, engaging, and insightful manner.

## Using color for data [​](#using-color-for-data)

Color plays an important role in data visualization by helping to differentiate categories, highlight key insights, and guide interpretation. However, it should be used strategically. The goal is to enhance readability and comprehension without overwhelming the viewer.

Different types of data require different approaches to color selection. By choosing the right color strategy, charts can effectively communicate data in a way that is both visually appealing and easy to understand.

INFO

The following color palettes are designed to be used in both light and dark modes.

### Categorical [​](#categorical)

Use for distinct, unrelated categories, such a countries or days of the week. Each category has a unique, distinguishable color.

With a categorical palette, the colors are meant to be used in order. For example, if only three data points need to be represented, the first three colors should be used.

1.  `blue600``#4b77d6`
2.  `yellow300``#edb537`
3.  `red400``#fd7865`
4.  `green300``#80cdb3`
5.  `lime500``#259948`
6.  `blue300``#a6bbf5`
7.  `purple500``#8d7ebd`
8.  `pink300``#d9b4cd`
9.  `yellow500``#ab7f2a`
10.  `gray400``#a2a9b1`

### Sequential [​](#sequential)

Use for data that follows a natural order, such as ranking. These palettes use a single hue that increases in intensity to represent higher values.

With a sequential palette, the colors used changes depending on how many data points need to be represented in a given chart.

INFO

The following example is blue, but any color from the [color palette](./colors.html) can be used in the same pattern.

#### 1 color [​](#_1-color)

1.  `blue600``#4b77d6`

#### 2 colors [​](#_2-colors)

1.  `blue600``#4b77d6`
2.  `blue400``#88a3e8`

#### 3 colors [​](#_3-colors)

1.  `blue600``#4b77d6`
2.  `blue400``#88a3e8`
3.  `blue200``#b6d4fb`

#### 4 colors [​](#_4-colors)

1.  `blue800``#3056a9`
2.  `blue600``#4b77d6`
3.  `blue400``#88a3e8`
4.  `blue200``#b6d4fb`

#### 5 colors [​](#_5-colors)

1.  `blue800``#3056a9`
2.  `blue600``#4b77d6`
3.  `blue500``#6485d1`
4.  `blue400``#88a3e8`
5.  `blue200``#b6d4fb`

#### 6 colors [​](#_6-colors)

1.  `blue800``#3056a9`
2.  `blue700``#36c`
3.  `blue600``#4b77d6`
4.  `blue500``#6485d1`
5.  `blue400``#88a3e8`
6.  `blue200``#b6d4fb`

#### 7 colors [​](#_7-colors)

1.  `blue800``#3056a9`
2.  `blue700``#36c`
3.  `blue600``#4b77d6`
4.  `blue500``#6485d1`
5.  `blue400``#88a3e8`
6.  `blue300``#a6bbf5`
7.  `blue200``#b6d4fb`

#### 8 colors [​](#_8-colors)

1.  `blue900``#233566`
2.  `blue800``#3056a9`
3.  `blue700``#36c`
4.  `blue600``#4b77d6`
5.  `blue500``#6485d1`
6.  `blue400``#88a3e8`
7.  `blue300``#a6bbf5`
8.  `blue200``#b6d4fb`

#### 9 colors [​](#_9-colors)

1.  `blue900``#233566`
2.  `blue800``#3056a9`
3.  `blue700``#36c`
4.  `blue600``#4b77d6`
5.  `blue500``#6485d1`
6.  `blue400``#88a3e8`
7.  `blue300``#a6bbf5`
8.  `blue200``#b6d4fb`
9.  `blue100``#d9e2ff`

#### 10 colors [​](#_10-colors)

1.  `blue1000``#1b223d`
2.  `blue900``#233566`
3.  `blue800``#3056a9`
4.  `blue700``#36c`
5.  `blue600``#4b77d6`
6.  `blue500``#6485d1`
7.  `blue400``#88a3e8`
8.  `blue300``#a6bbf5`
9.  `blue200``#b6d4fb`
10.  `blue100``#d9e2ff`

### Divergent [​](#divergent)

Use for data with a meaningful midpoint, such as temperature. These palettes use two contrasting colors that meet at a neutral middle shade.

With a divergent palette, colors are used from the entire spectrum of the palette as needed to represent specific data points, in whatever order is needed.

#### Blue Red [​](#blue-red)

1.  `blue600``#4b77d6`
2.  `blue500``#6485d1`
3.  `blue400``#88a3e8`
4.  `green300``#80cdb3`
5.  `lime200``#b9debc`
6.  `yellow200``#ffcf4f`
7.  `orange300``#ffa758`
8.  `red400``#fd7865`
9.  `red500``#f54739`
10.  `red600``#d74032`

## Accessibility [​](#accessibility)

By nature, charts which rely solely on colors to distinguish between values fall short of visible accessibility and inclusion, particularly when it comes to various types of color vision deficiencies. To increase accessibility compliance and inclusion, symbols can be used either as nodes (e.g. line, plot, etc.) or as patterns (e.g. bar, pie, etc.).

### Symbols [​](#symbols)

The following symbols were created to be used in the order provided, to ensure as much contrast in shape when viewed at small sizes.

[Download collection](../assets/visual-styles/data-visualization/codex-dataviz-symbols.zip)

circle

cross

triangle

square

wishbone

diamond

asterisk

moon

caret

twinkle

Pager

[Previous pageIllustrations](/codex/main/style-guide/illustrations.html)

[Next pageContent overflow](/codex/main/style-guide/content-overflow.html)