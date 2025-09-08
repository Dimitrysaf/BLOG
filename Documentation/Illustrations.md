# Illustrations [​](#illustrations)

Illustrations are found in Wikimedia projects as visual elements, used to engage with and help communicate a message to individuals.

![Set of illustrations representing language translation.](/codex/main/assets/illustration-header.jegfVp1n.svg)

## Usage [​](#usage)

Illustrations should be used as a supporting element alongside text and should never appear alone. Illustrations should be relevant and context-aware of their surroundings: do not include illustrations solely for decoration. Empty states, onboarding, or modals containing messaging are the primary use cases for using illustrations. Use the appropriate illustration style depending on the background that the illustration will be presented on.

Illustrations should never appear pixelated. Test the resolution of your illustration for the specific dimensions you will be using it in.

## Visual style [​](#visual-style)

![Set of illustrations representing messaging bubbles.](/codex/main/assets/illustration-style.Cxz6xnpe.svg)

### Colored backgrounds [​](#colored-backgrounds)

Illustrations that appear on a colored background should not include an outline stroke. Elements inside of the illustration should also not contain an outline stroke. Any lines inside of the illustration should have a weight of 2 dp. Illustrations can use any of the [colors](./colors.html) available in the Style Guide excluding Black.

### White background [​](#white-background)

Illustrations that appear on a white background should include a 2 dp outline stroke in `color-gray500`. Elements inside of the illustration can contain an outline stroke, this stroke should also be a 2 dp stroke in `color-gray500`. Illustrations can use any of the [colors](./colors.html) available in the Style Guide excluding Black.

### Grayscale [​](#grayscale)

Grayscale illustrations (for use in empty states) should include a 2 dp outline stroke in `color-gray400`. Elements inside of the illustration can contain an outline stroke, this stroke should also be a 2 dp stroke in `color-gray400`. Illustrations should only include [grayscale colors](./colors.html#Gray) available in the excluding Black.

## Creating illustrations [​](#creating-illustrations)

![Set of illustrations representing a map, an analytics report, and a newspaper.](/codex/main/assets/illustration-creating.Cc7gNyBw.svg)

Illustrations should fit within a 200 dp by 200 dp square. Some illustrations may need to be taller than they are wide (and vice versa) but overall illustrations should look balanced within their 200 dp boundary.

Illustrations must adhere to the [colors](./colors.html) outlined in this Style Guide, however no illustrations should use Black. Illustrations may include transparent elements or cut outs, however no elements may be depicted as semi-transparent or with a reduced opacity. All elements should either be transparent or displayed at 100% opacity.

When designing a new illustration, focus on legibility. Illustrations consist of a single element or focused composition. Illustrations should be simple, clear, universal and memorable.

Illustrations should be simple. They use monochromatic vector-based shapes with the following properties:

*   Filled areas. Shapes are defined by filled areas as opposed to outlines.
*   Rounded corners. Corners are slightly rounded (2 dp) to make shapes more friendly and welcoming, but not too much to look goofy.
*   2 dp outline stroke, except for illustrations that appear on colored backgrounds.

As a general recommendation, an illustration should use no more than 3 accent or supplementary colors (eg. `color-blue700`, `color-red600`, `color-green400` and `color-yellow200`) to avoid visual complexity. Additionally, special care should be taken when using reds with greens or blues in the same composition. Users with red-green color blindness may have difficulty differentiating between red and green elements, especially if they are overlapping. Red and blue elements should also be treated with care so as to avoid the visual illusion of [chromostereopsis](https://en.wikipedia.org/wiki/Chromostereopsis). Illustrations may include transparent elements or cut outs, however all elements should be shown as either 0 or 100% opacity.

## Resources [​](#resources)

Illustrations can be found in and exported as SVG from the [Codex Figma library](https://www.figma.com/design/KoDuJMadWBXtsOtzGS4134/Codex?node-id=20598-51408&node-type=canvas&t=plW1hmguHVWs3fWZ-11).

Pager

[Previous pageImages](/codex/main/style-guide/images.html)

[Next pageData visualization](/codex/main/style-guide/data-visualization.html)