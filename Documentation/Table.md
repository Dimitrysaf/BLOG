# Table [​](#table)

A Table is a structural component used to arrange data in rows and columns to facilitate the comparison, analysis and management of information.

1912 Olympics — Men's marathon

|     |     |     |     |
| --- | --- | --- | --- |1912 Olympics — Men's marathon
| Athlete | Nation | Rank | Time |
| --- | --- | --- | --- |
| Ken McArthur | South Africa | 1   | 2:36:54.8 |
| Christian Gitsham | South Africa | 2   | 2:37:52.0 |
| Gaston Strobino | United States | 3   | 2:38:42.4 |
| Shizo Kanakuri | Japan | 36  | 54:08:06:05:32:20.3 |

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| caption |     |
| hideCaption |     |
| useRowHeaders |     |
| showVerticalBorders |     |
| Slots |     |
| header |     |
| footer |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use Table [​](#when-to-use-table)

The content within a Table needs to be well-structured and optimized for readability and scanning. Tables should be avoided if there is limited space, if the information is too complex, or if the data cannot be easily categorized. Also, consider different presentations for standalone information, or when detailed analysis isn't the primary goal.

**Use the Table component when:**

*   Users need a systematic representation of information that allows them to compare and analyze multiple data points across different categories.
*   Users need to perform specific actions to modify items within a dataset, such as editing, deleting, or organizing.
*   Users need to sort or filter data.

**Use lists, Cards, or text when or other simple layouts when:**

*   There aren't multiple data points to compare.
*   The information doesn't require sorting or filtering.

**Use charts or other data visualization methods when:**

*   The primary goal is to provide a high-level overview rather than detailed analysis of the data.
*   The data can't easily be laid out in a Table (e.g. when there are interdependencies between data points).

### About Table [​](#about-table)

Table includes the following elements.

#### Header (optional) [​](#header-optional)

Tables can feature a header section with elements such as a visible caption or actions that can be applied to Table rows in bulk.

#### Caption [​](#caption)

A caption provides a clear and concise description of the contents and the purpose of the Table. It is important for accessibility, and must always be provided for users of assistive technology. The caption can be visually hidden if a visible caption is not needed (e.g. if there is a heading above the Table that serves as a title).

*   A Table's caption should identify its content and context in a concise manner.

#### Actions (optional) [​](#actions-optional)

Actions that can be applied to all the items within a Table should be made available from the header.

*   Use normal or quiet Buttons to represent Table actions.
*   Use MenuButton to group and display table actions when space in the header is limited.
*   Don't use primary Buttons to represent Table actions, since they could compete with main page actions.
*   Avoid using Table actions in the header for Tables with 5 rows or fewer. Instead, use [inline actions](#custom-cell-content).
    

#### Row selection (optional) [​](#row-selection-optional)

Row selection allows users to target the items that will be affected by Table actions. A custom indicator of the number of selected rows can be included in the Table’s header for visibility (Refer to the [row selection demo](#with-selection)).

#### Headings [​](#headings)

Tables can feature column headings, row headings, or both. Headings are used to describe the type of information or the category of the data contained by the list of elements they label. Column headings are required.

*   Always include column headings.
*   Don't use icons as column headings.

#### Sorting (optional) [​](#sorting-optional)

Sorting allows users to organize data according to specific criteria (e.g. alphabetically). It facilitates the analysis of data, identification of patterns, and comparison of values within Tables.

#### Table data [​](#table-data)

Table cells are individual units of information, organized at the intersection of rows and columns. They can contain any sort of content, from simple text to iconography, images and components in any necessary order or combination.

Tables can also features a `<tfoot>` at the end of the data for things like totals.

*   By default, align cell content to the start of the cell. For cells containing numbers that need to be compared, like currencies, align the text to the right of the cell in both reading directionalities.
*   Match the alignment of column headings with their data.
*   Add vertical borders to Table data if needed for better readability.

#### Pagination (optional) [​](#pagination-optional)

Pagination controls can be included to allow users to page through long datasets. Pagination can be placed above the Table data, below it, or both.

*   Don't use pagination if all rows can easily be displayed on one page.

#### Footer (optional) [​](#footer-optional)

Tables can feature fully customizable footer content.

Learn more about tables

1.  [Web Typography: Designing Tables to be Read, Not Looked At](https://alistapart.com/article/web-typography-tables/) by Richard Rutter
2.  [Inclusive Components: Data Tables](https://inclusive-components.design/data-tables/), by Heydon Pickering

## Examples [​](#examples)

### Column sizing [​](#column-sizing)

By default, the width of each Table column will be determined by its content and the available space. If needed, you can set specific widths on some or all columns.

Waves of Feminism

|     |     |     |     |
| --- | --- | --- | --- |Waves of Feminism
| Wave | Years | Overview | Main figures |
| --- | --- | --- | --- |
| First wave | Late 19th to early 20th century | Focused on women's suffrage and legal rights, addressing inequalities in the public sphere. | Susan B. Anthony, Elizabeth Cady Stanton |
| Second wave | 1960s to 1980s | Centered on women's liberation and social equality, addressing issues such as reproductive rights, workplace discrimination, and sexual liberation. | Betty Friedan, Gloria Steinem, Simone de Beauvoir |
| Third wave | 1990s to early 2000s | Emphasized diversity and intersectionality, addressing issues of race, class, sexuality, and gender identity. Advocated for inclusivity and challenging stereotypes. | bell hooks, Kimberlé Crenshaw, Judith Butler |
| Fourth wave | Early 2010s to present | Characterized by a focus on the empowerment of women through the use of internet tools, and intersectionality. The fourth wave seeks greater gender equality by focusing on gendered norms and the marginalization of women in society. | Tarana Burke, Chimamanda Ngozi Adichie, Roxane Gay |

Latest update: April 10, 2024

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-table
		caption="Waves of Feminism"
		:columns="columns"
		:data="data"
		:use-row-headers="true"
	>
		<template #footer>
			Latest update: April 10, 2024
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TableColumnWidth',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'wave', label: 'Wave', minWidth: '112px' },
			{ id: 'years', label: 'Years', minWidth: '112px' },
			{ id: 'overview', label: 'Overview', minWidth: '320px' },
			{ id: 'figures', label: 'Main figures', minWidth: '160px' }
		];

		const data = [
			{
				wave: 'First wave',
				years: 'Late 19th to early 20th century',
				overview: 'Focused on women\'s suffrage and legal rights, addressing inequalities in the public sphere.',
				figures: 'Susan B. Anthony, Elizabeth Cady Stanton'
			},
			{
				wave: 'Second wave',
				years: '1960s to 1980s',
				overview: 'Centered on women\'s liberation and social equality, addressing issues such as reproductive rights, workplace discrimination, and sexual liberation.',
				figures: 'Betty Friedan, Gloria Steinem, Simone de Beauvoir'
			},
			{
				wave: 'Third wave',
				years: '1990s to early 2000s',
				overview: 'Emphasized diversity and intersectionality, addressing issues of race, class, sexuality, and gender identity. Advocated for inclusivity and challenging stereotypes.',
				figures: 'bell hooks, Kimberlé Crenshaw, Judith Butler'
			},
			{
				wave: 'Fourth wave',
				years: 'Early 2010s to present',
				overview: 'Characterized by a focus on the empowerment of women through the use of internet tools, and intersectionality. The fourth wave seeks greater gender equality by focusing on gendered norms and the marginalization of women in society.',
				figures: 'Tarana Burke, Chimamanda Ngozi Adichie, Roxane Gay'
			}
		];

		return {
			columns,
			data
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-table
		caption="Waves of Feminism"
		:columns="columns"
		:data="data"
		:use-row-headers="true"
	>
		<template #footer>
			Latest update: April 10, 2024
		</template>
	</cdx-table>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxTable } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TableColumnWidth',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'wave', label: 'Wave', minWidth: '112px' },
			{ id: 'years', label: 'Years', minWidth: '112px' },
			{ id: 'overview', label: 'Overview', minWidth: '320px' },
			{ id: 'figures', label: 'Main figures', minWidth: '160px' }
		];

		const data = [
			{
				wave: 'First wave',
				years: 'Late 19th to early 20th century',
				overview: 'Focused on women\'s suffrage and legal rights, addressing inequalities in the public sphere.',
				figures: 'Susan B. Anthony, Elizabeth Cady Stanton'
			},
			{
				wave: 'Second wave',
				years: '1960s to 1980s',
				overview: 'Centered on women\'s liberation and social equality, addressing issues such as reproductive rights, workplace discrimination, and sexual liberation.',
				figures: 'Betty Friedan, Gloria Steinem, Simone de Beauvoir'
			},
			{
				wave: 'Third wave',
				years: '1990s to early 2000s',
				overview: 'Emphasized diversity and intersectionality, addressing issues of race, class, sexuality, and gender identity. Advocated for inclusivity and challenging stereotypes.',
				figures: 'bell hooks, Kimberlé Crenshaw, Judith Butler'
			},
			{
				wave: 'Fourth wave',
				years: 'Early 2010s to present',
				overview: 'Characterized by a focus on the empowerment of women through the use of internet tools, and intersectionality. The fourth wave seeks greater gender equality by focusing on gendered norms and the marginalization of women in society.',
				figures: 'Tarana Burke, Chimamanda Ngozi Adichie, Roxane Gay'
			}
		];

		return {
			columns,
			data
		};
	}
} );
</script>
```

### Developer notes

The [TableColumn type](./../types-and-constants.html#tablecolumn) has optional properties for `width` and `minWidth` so you can customize each column's size. Include the units, e.g. `'120px'` or `'100%'`.

### Custom cell content [​](#custom-cell-content)

By default, the data provided for a cell will be rendered within it as-is. If needed, you can customize the contents of a whole column or individual cells. For example, you can include a MenuButton of actions to take on that row.

Active blocks

|     |     |     |     |
| --- | --- | --- | --- |Active blocks
| Timestamp | Target | Block parameters | Actions |
| --- | --- | --- | --- |
| 16:58, 2023-11-30 | Username1 | *   editing (sitewide)<br>*   account creation disabled |     |
| 15:16, 2023-11-23 | Username2 | *   account creation disabled |     |
| 11:13, 2023-11-12 | Username3 | *   autoblock disabled<br>*   account creation disabled |     |

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-table
		class="cdx-docs-table-custom-cells"
		caption="Active blocks"
		:columns="columns"
		:data="data"
	>
		<!-- Get cell data and output it in a specific format. -->
		<template #item-time="{ item }">
			{{ getFormattedDate( item ) }}
		</template>

		<!-- Get cell data, an array in this case, and output it as a list. -->
		<template #item-parameters="{ item }">
			<ul>
				<li v-for="( parameter, index ) in item" :key="index">
					{{ parameter }}
				</li>
			</ul>
		</template>

		<!-- Get data for the entire row so we can grab the block id and perform an action. -->
		<template #item-actions="{ row }">
			<div class="cdx-docs-table-custom-cells__actions">
				<cdx-button
					weight="quiet"
					aria-label="Edit"
					@click="editBlock( row.id )"
				>
					<cdx-icon :icon="cdxIconEdit" />
				</cdx-button>
				<cdx-button
					weight="quiet"
					action="destructive"
					aria-label="Remove"
					@click="removeBlock( row.id )"
				>
					<cdx-icon :icon="cdxIconTrash" />
				</cdx-button>
			</div>
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable, CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconTrash } from '@wikimedia/codex-icons';
import getFormattedDate from '../../../src/utils/getFormattedDate';

export default defineComponent( {
	name: 'TableCustomCells',
	components: { CdxTable, CdxButton, CdxIcon },
	setup() {
		const columns = [
			{ id: 'time', label: 'Timestamp' },
			{ id: 'target', label: 'Target' },
			{ id: 'parameters', label: 'Block parameters' },
			{ id: 'actions', label: 'Actions' }
		];

		const data = [
			{
				id: 1236,
				time: 1701363480000,
				target: 'Username1',
				parameters: [ 'editing (sitewide)', 'account creation disabled' ]
			},
			{
				id: 1235,
				time: 1700752560000,
				target: 'Username2',
				parameters: [ 'account creation disabled' ]
			},
			{
				id: 1234,
				time: 1699787580000,
				target: 'Username3',
				parameters: [ 'autoblock disabled', 'account creation disabled' ]
			}
		];

		function editBlock( blockId ) {
			// eslint-disable-next-line no-console
			console.log( 'Edit block ' + blockId );
		}

		function removeBlock( blockId ) {
			// eslint-disable-next-line no-console
			console.log( 'Remove block ' + blockId );
		}

		return {
			columns,
			data,
			cdxIconEdit,
			cdxIconTrash,
			editBlock,
			removeBlock,
			getFormattedDate
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-custom-cells {
	ul {
		margin: 0;
		padding-left: @spacing-100;
	}

	&__actions {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
```

vue

```
<template>
	<cdx-table
		class="cdx-docs-table-custom-cells"
		caption="Active blocks"
		:columns="columns"
		:data="data"
	>
		<!-- Get cell data and output it in a specific format. -->
		<template #item-time="{ item }">
			{{ getFormattedDate( item ) }}
		</template>

		<!-- Get cell data, an array in this case, and output it as a list. -->
		<template #item-parameters="{ item }">
			<ul>
				<li v-for="( parameter, index ) in item" :key="index">
					{{ parameter }}
				</li>
			</ul>
		</template>

		<!-- Get data for the entire row so we can grab the block id and perform an action. -->
		<template #item-actions="{ row }">
			<div class="cdx-docs-table-custom-cells__actions">
				<cdx-button
					weight="quiet"
					aria-label="Edit"
					@click="editBlock( row.id )"
				>
					<cdx-icon :icon="cdxIconEdit"></cdx-icon>
				</cdx-button>
				<cdx-button
					weight="quiet"
					action="destructive"
					aria-label="Remove"
					@click="removeBlock( row.id )"
				>
					<cdx-icon :icon="cdxIconTrash"></cdx-icon>
				</cdx-button>
			</div>
		</template>
	</cdx-table>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxTable, CdxButton, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconEdit, cdxIconTrash } = require( './icons.json' );
const getFormattedDate = require( '../../../src/utils/getFormattedDate' );

module.exports = defineComponent( {
	name: 'TableCustomCells',
	components: { CdxTable, CdxButton, CdxIcon },
	setup() {
		const columns = [
			{ id: 'time', label: 'Timestamp' },
			{ id: 'target', label: 'Target' },
			{ id: 'parameters', label: 'Block parameters' },
			{ id: 'actions', label: 'Actions' }
		];

		const data = [
			{
				id: 1236,
				time: 1701363480000,
				target: 'Username1',
				parameters: [ 'editing (sitewide)', 'account creation disabled' ]
			},
			{
				id: 1235,
				time: 1700752560000,
				target: 'Username2',
				parameters: [ 'account creation disabled' ]
			},
			{
				id: 1234,
				time: 1699787580000,
				target: 'Username3',
				parameters: [ 'autoblock disabled', 'account creation disabled' ]
			}
		];

		function editBlock( blockId ) {
			// eslint-disable-next-line no-console
			console.log( 'Edit block ' + blockId );
		}

		function removeBlock( blockId ) {
			// eslint-disable-next-line no-console
			console.log( 'Remove block ' + blockId );
		}

		return {
			columns,
			data,
			cdxIconEdit,
			cdxIconTrash,
			editBlock,
			removeBlock,
			getFormattedDate
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-table-custom-cells {
	ul {
		margin: 0;
		padding-left: @spacing-100;
	}

	&__actions {
		display: flex;
		gap: @spacing-50;
	}
}
</style>
```

### Developer notes

You can customize the contents of a cell by using the `item-[ columnId ]` slots. For example, for a column with the id `time`, there is a slot called `item-time`. This slot comes with 2 bindings:

*   `item`: the cell content
*   `row`: data for the entire row

### Custom table elements [​](#custom-table-elements)

The Table component outputs each section of the `<table>` element automatically. You can override the output of these elements to customize them. In this example, there is special formatting for the "users" column headings, plus a "total" section that displays sums at the bottom.

List of MediaWikis

|     |     |     |     |
| --- | --- | --- | --- |List of MediaWikis
| Project | No. of wikis | Users |     |
| --- | --- | --- | --- |
| Active | All |
| --- | --- | --- | --- |
| wikipedias | 342 | 292249 | 113556337 |
| wiktionaries | 193 | 5764 | 7275027 |
| wikiquotes | 96  | 2042 | 4261041 |
| Total: | 631 | 300055 | 125092405 |

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-table
		caption="List of MediaWikis"
		:columns="columns"
		:data="data"
		:show-vertical-borders="true"
	>
		<template #thead>
			<thead>
				<tr>
					<th scope="col" rowspan="2">
						Project
					</th>
					<th
						scope="col"
						rowspan="2"
						class="cdx-table__table__cell--align-number"
					>
						No. of wikis
					</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">
						Active
					</th>
					<th scope="col" class="cdx-table__table__cell--align-number">
						All
					</th>
				</tr>
			</thead>
		</template>

		<template #tfoot>
			<tfoot>
				<tr>
					<th scope="row">
						Total:
					</th>
					<td
						v-for="( total, index ) in totals"
						:key="index"
						class="cdx-table__table__cell--align-number"
					>
						{{ total }}
					</td>
				</tr>
			</tfoot>
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TableWithSlots',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'wiki' },
			{ id: 'nowikis', textAlign: 'number' },
			{ id: 'activeusers', textAlign: 'number' },
			{ id: 'users', textAlign: 'number' }
		];

		const data = [
			{
				wiki: 'wikipedias',
				nowikis: 342,
				activeusers: 292249,
				users: 113556337
			},
			{
				wiki: 'wiktionaries',
				nowikis: 193,
				activeusers: 5764,
				users: 7275027
			},
			{
				wiki: 'wikiquotes',
				nowikis: 96,
				activeusers: 2042,
				users: 4261041
			}
		];

		const totals = data.reduce( ( a, b ) => [
			a[ 0 ] + b.nowikis,
			a[ 1 ] + b.activeusers,
			a[ 2 ] + b.users
		], [ 0, 0, 0 ] );

		return {
			columns,
			data,
			totals
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-table
		caption="List of MediaWikis"
		:columns="columns"
		:data="data"
		:show-vertical-borders="true"
	>
		<template #thead>
			<thead>
				<tr>
					<th scope="col" rowspan="2">
						Project
					</th>
					<th
						scope="col"
						rowspan="2"
						class="cdx-table__table__cell--align-number"
					>
						No. of wikis
					</th>
					<th
						scope="colgroup"
						colspan="2"
						class="cdx-table__table__cell--align-center"
					>
						Users
					</th>
				</tr>
				<tr>
					<th scope="col" class="cdx-table__table__cell--align-number">
						Active
					</th>
					<th scope="col" class="cdx-table__table__cell--align-number">
						All
					</th>
				</tr>
			</thead>
		</template>

		<template #tfoot>
			<tfoot>
				<tr>
					<th scope="row">
						Total:
					</th>
					<td
						v-for="( total, index ) in totals"
						:key="index"
						class="cdx-table__table__cell--align-number"
					>
						{{ total }}
					</td>
				</tr>
			</tfoot>
		</template>
	</cdx-table>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxTable } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TableWithSlots',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'wiki' },
			{ id: 'nowikis', textAlign: 'number' },
			{ id: 'activeusers', textAlign: 'number' },
			{ id: 'users', textAlign: 'number' }
		];

		const data = [
			{
				wiki: 'wikipedias',
				nowikis: 342,
				activeusers: 292249,
				users: 113556337
			},
			{
				wiki: 'wiktionaries',
				nowikis: 193,
				activeusers: 5764,
				users: 7275027
			},
			{
				wiki: 'wikiquotes',
				nowikis: 96,
				activeusers: 2042,
				users: 4261041
			}
		];

		const totals = data.reduce( ( a, b ) => [
			a[ 0 ] + b.nowikis,
			a[ 1 ] + b.activeusers,
			a[ 2 ] + b.users
		], [ 0, 0, 0 ] );

		return {
			columns,
			data,
			totals
		};
	}
} );
</script>
```

### Developer notes

You can further customize the layout of your Table by using the `thead`, `tbody`, and `tfoot` slots. Using these slots will override the default implementation of that element within the Table component so you can include your own markup. This example uses the `thead` slot to add `th` elements with custom `colspan` and `rowspan` attributes, and the `tfoot` slot to add a `<tfoot>` with totals below the `<tbody>`.

You can use any combination of these slots. Note that in the example below, even though we are including custom `thead` markup, we are still passing in the `columns` prop so that the Table component can output the `data` in the `<tbody>`. Always pass in `columns`, unless you are using the slots to override both the `<thead>` and `<tbody>`.

Cell data is aligned to the start of the cell by default. You can use the following CSS classes to change the alignment of cell data:

*   `cdx-table__table__cell--align-center`: Align content to the center of the cell.
*   `cdx-table__table__cell--align-end`: Align content to the end of the cell (to the right in LTR and to the left in RTL).
*   `cdx-table__table__cell--align-number`: Align content to the right of the cell in both reading directionalities. This is recommended for columns that contain numerical values.

### Sorting [​](#sorting)

Any number of columns can be made sortable.

Contributions

|     |     |     |     |     |
| --- | --- | --- | --- | --- |Contributions (column headers with buttons are sortable).
| Username | Wiki project | Page title | Date | Size |
| --- | --- | --- | --- | --- |
| Username1 | [de.wikipedia](https://de.wikipedia.org) | Bahnstromleitung | 06:12, 2023-12-28 | +9  |
| Username2 | [commons.wikimedia](https://commons.wikimedia.org) | Xanthium.jpg | 11:12, 2024-01-02 | \-70 |
| Username3 | [de.wikipedia](https://de.wikipedia.org) | Berlin | 16:58, 2024-01-04 | +652 |
| Username4 | [en.wikipedia](https://en.wikipedia.org) | Stability Model | 16:25, 2023-12-14 | +42 |

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-table
		v-model:sort="sort"
		class="cdx-docs-table-with-sort"
		caption="Contributions"
		:columns="columns"
		:data="data"
		@update:sort="onSort"
	>
		<template #item-wiki="{ item }">
			<a :href="`https://${ item }.org`">{{ item }}</a>
		</template>

		<template #item-date="{ item }">
			{{ getFormattedDate( item ) }}
		</template>

		<template #item-size="{ item }">
			<span v-if="item > 0" class="cdx-docs-table-with-sort__size--positive">
				+{{ item }}
			</span>
			<span v-else-if="item === 0">
				{{ item }}
			</span>
			<span v-else class="cdx-docs-table-with-sort__size--negative">
				{{ item }}
			</span>
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTable } from '@wikimedia/codex';
import getFormattedDate from '../../../src/utils/getFormattedDate';

export default defineComponent( {
	name: 'TableWithSort',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'user', label: 'Username', allowSort: true },
			{ id: 'wiki', label: 'Wiki project', allowSort: true },
			{ id: 'title', label: 'Page title', allowSort: true },
			{ id: 'date', label: 'Date', allowSort: true, textAlign: 'number' },
			{ id: 'size', label: 'Size', allowSort: true, textAlign: 'number' }
		];

		// Data is a ref so we can change it on sort.
		const data = ref( [
			{
				user: 'Username1',
				wiki: 'de.wikipedia',
				title: 'Bahnstromleitung',
				date: 1703743920000,
				size: 9
			},
			{
				user: 'Username2',
				wiki: 'commons.wikimedia',
				title: 'Xanthium.jpg',
				date: 1704193920000,
				size: -70
			},
			{
				user: 'Username3',
				wiki: 'de.wikipedia',
				title: 'Berlin',
				date: 1704387480000,
				size: 652
			},
			{
				user: 'Username4',
				wiki: 'en.wikipedia',
				title: 'Stability Model',
				date: 1702571100000,
				size: 42
			}
		] );

		// Initially sort by username.
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<import('@wikimedia/codex').TableSort>} */
		const sort = ref( { user: 'asc' } );

		function onSort( newSort ) {
			const sortKey = Object.keys( newSort )[ 0 ];
			const sortOrder = newSort[ sortKey ];

			function sortNumerically( columnId, sortDir ) {
				return data.value.sort( ( a, b ) => {
					if ( sortDir === 'asc' ) {
						return b[ columnId ] - a[ columnId ];
					}
					return a[ columnId ] - b[ columnId ];
				} );
			}

			function sortAlphabetically( columnId, sortDir ) {
				return data.value.sort( ( a, b ) => {
					const multiplier = sortDir === 'asc' ? 1 : -1;
					return multiplier * ( a[ columnId ].localeCompare( b[ columnId ] ) );
				} );
			}

			// If the new sort order is 'none', go back to the initial sort.
			if ( sortOrder === 'none' ) {
				data.value = sortAlphabetically( 'user', 'asc' );
				sort.value = { user: 'asc' };
				return;
			}

			// Sort data.
			switch ( sortKey ) {
				case 'user':
				case 'wiki':
				case 'title':
					data.value = sortAlphabetically( sortKey, sortOrder );
					return;
				case 'date':
				case 'size':
					data.value = sortNumerically( sortKey, sortOrder );
					return;
				default:
					return;
			}
		}

		return {
			columns,
			data,
			sort,
			onSort,
			getFormattedDate
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-with-sort {
	&__size {
		&--positive {
			color: @color-success;
		}

		&--negative {
			color: @color-destructive;
		}
	}
}
</style>
```

vue

```
<template>
	<cdx-table
		v-model:sort="sort"
		class="cdx-docs-table-with-sort"
		caption="Contributions"
		:columns="columns"
		:data="data"
		@update:sort="onSort"
	>
		<template #item-wiki="{ item }">
			<a :href="`https://${ item }.org`">{{ item }}</a>
		</template>

		<template #item-date="{ item }">
			{{ getFormattedDate( item ) }}
		</template>

		<template #item-size="{ item }">
			<span v-if="item > 0" class="cdx-docs-table-with-sort__size--positive">
				+{{ item }}
			</span>
			<span v-else-if="item === 0">
				{{ item }}
			</span>
			<span v-else class="cdx-docs-table-with-sort__size--negative">
				{{ item }}
			</span>
		</template>
	</cdx-table>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTable } = require( '@wikimedia/codex' );
const getFormattedDate = require( '../../../src/utils/getFormattedDate' );

module.exports = defineComponent( {
	name: 'TableWithSort',
	components: { CdxTable },
	setup() {
		const columns = [
			{ id: 'user', label: 'Username', allowSort: true },
			{ id: 'wiki', label: 'Wiki project', allowSort: true },
			{ id: 'title', label: 'Page title', allowSort: true },
			{ id: 'date', label: 'Date', allowSort: true, textAlign: 'number' },
			{ id: 'size', label: 'Size', allowSort: true, textAlign: 'number' }
		];

		// Data is a ref so we can change it on sort.
		const data = ref( [
			{
				user: 'Username1',
				wiki: 'de.wikipedia',
				title: 'Bahnstromleitung',
				date: 1703743920000,
				size: 9
			},
			{
				user: 'Username2',
				wiki: 'commons.wikimedia',
				title: 'Xanthium.jpg',
				date: 1704193920000,
				size: -70
			},
			{
				user: 'Username3',
				wiki: 'de.wikipedia',
				title: 'Berlin',
				date: 1704387480000,
				size: 652
			},
			{
				user: 'Username4',
				wiki: 'en.wikipedia',
				title: 'Stability Model',
				date: 1702571100000,
				size: 42
			}
		] );

		// Initially sort by username.
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<import('@wikimedia/codex').TableSort>} */
		const sort = ref( { user: 'asc' } );

		function onSort( newSort ) {
			const sortKey = Object.keys( newSort )[ 0 ];
			const sortOrder = newSort[ sortKey ];

			function sortNumerically( columnId, sortDir ) {
				return data.value.sort( ( a, b ) => {
					if ( sortDir === 'asc' ) {
						return b[ columnId ] - a[ columnId ];
					}
					return a[ columnId ] - b[ columnId ];
				} );
			}

			function sortAlphabetically( columnId, sortDir ) {
				return data.value.sort( ( a, b ) => {
					const multiplier = sortDir === 'asc' ? 1 : -1;
					return multiplier * ( a[ columnId ].localeCompare( b[ columnId ] ) );
				} );
			}

			// If the new sort order is 'none', go back to the initial sort.
			if ( sortOrder === 'none' ) {
				data.value = sortAlphabetically( 'user', 'asc' );
				sort.value = { user: 'asc' };
				return;
			}

			// Sort data.
			switch ( sortKey ) {
				case 'user':
				case 'wiki':
				case 'title':
					data.value = sortAlphabetically( sortKey, sortOrder );
					return;
				case 'date':
				case 'size':
					data.value = sortNumerically( sortKey, sortOrder );
					return;
				default:
					return;
			}
		}

		return {
			columns,
			data,
			sort,
			onSort,
			getFormattedDate
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-table-with-sort {
	&__size {
		&--positive {
			color: @color-success;
		}

		&--negative {
			color: @color-destructive;
		}
	}
}
</style>
```

### Developer notes

To enable sorting, pass in the `sort` prop via `v-model`, and make at least one Table column sortable by adding `allowSort: true` to its definition.

You can initialize the `sort` ref to an empty object if there is no initial sort order, or to an initial sort order as in the Table below, where the initial sort order is `{ user: 'asc' }`.

### Row selection [​](#row-selection)

Rows can be made selectable. This is useful for selecting rows then choosing a Table action.

Tests

0 items selected Rerun Disconnect

|     |     |     |     |
| --- | --- | --- | --- |Tests
| Select all rows | Name | Status | English verb to agent noun |
| --- | --- | --- | --- |
| Select row 1 of 4 | ["illustrate" -> "illustrator"](https://www.wikifunctions.org/view/en/Z11401) | Connected | Failed |
| Select row 2 of 4 | ["listen" -> "listener"](https://www.wikifunctions.org/view/en/Z11405) | Connected | Passed |
| Select row 3 of 4 | ["mentor" -> "mentor"](https://www.wikifunctions.org/view/en/Z11402) | Connected | Passed |
| Select row 4 of 4 | ["swim" -> "swimmer"](https://www.wikifunctions.org/view/en/Z11404) | Connected | Failed |

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-table
		v-model:selected-rows="selectedRows"
		class="cdx-docs-table-with-selection"
		caption="Tests"
		:columns="columns"
		:data="data"
		:use-row-selection="true"
	>
		<template #header>
			<div class="cdx-docs-table-with-selection__header-content">
				<span>
					{{ selectedRows.length }} items selected
				</span>
				<span class="cdx-docs-table-with-selection__header-content__buttons">
					<cdx-button @click="handleRerun">
						Rerun
					</cdx-button>
					<cdx-button @click="handleDisconnect">
						Disconnect
					</cdx-button>
				</span>
			</div>
		</template>

		<template #item-name="{ item }">
			<a :href="item.url">{{ item.label }}</a>
		</template>

		<template #item-status="{ item }">
			<cdx-info-chip :status="item ? 'success' : 'warning'">
				{{ item ? 'Connected' : 'Disconnected' }}
			</cdx-info-chip>
		</template>

		<template #item-result="{ item }">
			<cdx-icon
				:class="getIconClass( item )"
				:icon="item ? cdxIconCheck : cdxIconClose"
			/>
			{{ item ? 'Passed' : 'Failed' }}
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTable, CdxButton, CdxInfoChip, CdxIcon } from '@wikimedia/codex';
import { cdxIconCheck, cdxIconClose } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TableWithSelection',
	components: { CdxTable, CdxButton, CdxInfoChip, CdxIcon },
	setup() {
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<number[]>} */
		const selectedRows = ref( [] );

		const columns = [
			{ id: 'name', label: 'Name', minWidth: '200px' },
			{ id: 'status', label: 'Status' },
			{ id: 'result', label: 'English verb to agent noun' }
		];

		const data = ref( [
			{
				name: {
					label: '"illustrate" -> "illustrator"',
					url: 'https://www.wikifunctions.org/view/en/Z11401'
				},
				status: true,
				result: false
			},
			{
				name: {
					label: '"listen" -> "listener"',
					url: 'https://www.wikifunctions.org/view/en/Z11405'
				},
				status: true,
				result: true
			},
			{
				name: {
					label: '"mentor" -> "mentor"',
					url: 'https://www.wikifunctions.org/view/en/Z11402'
				},
				status: true,
				result: true
			},
			{
				name: {
					label: '"swim" -> "swimmer"',
					url: 'https://www.wikifunctions.org/view/en/Z11404'
				},
				status: true,
				result: false
			}
		] );

		/**
		 * Rerun the test. In this simple example, this just changes any failing
		 * tests to passing.
		 */
		function handleRerun() {
			for ( const index of selectedRows.value ) {
				data.value[ index ].result = true;
			}
		}

		/**
		 * Disconnect selected tests.
		 */
		function handleDisconnect() {
			for ( const index of selectedRows.value ) {
				data.value[ index ].status = false;
			}
		}

		function getIconClass( result ) {
			const iconClassModifier = result ? 'pass' : 'fail';
			return {
				[ `cdx-docs-table-with-selection__icon--${ iconClassModifier }` ]: true
			};
		}

		return {
			selectedRows,
			columns,
			data,
			handleRerun,
			handleDisconnect,
			getIconClass,
			cdxIconCheck,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-with-selection {
	&__header-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: @spacing-50;

		&__buttons {
			display: flex;
			gap: @spacing-50;
		}
	}

	& &__icon {
		&--pass {
			color: @color-success;
		}

		&--fail {
			color: @color-error;
		}
	}
}
</style>
```

vue

```
<template>
	<cdx-table
		v-model:selected-rows="selectedRows"
		class="cdx-docs-table-with-selection"
		caption="Tests"
		:columns="columns"
		:data="data"
		:use-row-selection="true"
	>
		<template #header>
			<div class="cdx-docs-table-with-selection__header-content">
				<span>
					{{ selectedRows.length }} items selected
				</span>
				<span class="cdx-docs-table-with-selection__header-content__buttons">
					<cdx-button @click="handleRerun">
						Rerun
					</cdx-button>
					<cdx-button @click="handleDisconnect">
						Disconnect
					</cdx-button>
				</span>
			</div>
		</template>

		<template #item-name="{ item }">
			<a :href="item.url">{{ item.label }}</a>
		</template>

		<template #item-status="{ item }">
			<cdx-info-chip :status="item ? 'success' : 'warning'">
				{{ item ? 'Connected' : 'Disconnected' }}
			</cdx-info-chip>
		</template>

		<template #item-result="{ item }">
			<cdx-icon
				:class="getIconClass( item )"
				:icon="item ? cdxIconCheck : cdxIconClose"
			></cdx-icon>
			{{ item ? 'Passed' : 'Failed' }}
		</template>
	</cdx-table>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTable, CdxButton, CdxInfoChip, CdxIcon } = require( '@wikimedia/codex' );
const { cdxIconCheck, cdxIconClose } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'TableWithSelection',
	components: { CdxTable, CdxButton, CdxInfoChip, CdxIcon },
	setup() {
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<number[]>} */
		const selectedRows = ref( [] );

		const columns = [
			{ id: 'name', label: 'Name', minWidth: '200px' },
			{ id: 'status', label: 'Status' },
			{ id: 'result', label: 'English verb to agent noun' }
		];

		const data = ref( [
			{
				name: {
					label: '"illustrate" -> "illustrator"',
					url: 'https://www.wikifunctions.org/view/en/Z11401'
				},
				status: true,
				result: false
			},
			{
				name: {
					label: '"listen" -> "listener"',
					url: 'https://www.wikifunctions.org/view/en/Z11405'
				},
				status: true,
				result: true
			},
			{
				name: {
					label: '"mentor" -> "mentor"',
					url: 'https://www.wikifunctions.org/view/en/Z11402'
				},
				status: true,
				result: true
			},
			{
				name: {
					label: '"swim" -> "swimmer"',
					url: 'https://www.wikifunctions.org/view/en/Z11404'
				},
				status: true,
				result: false
			}
		] );

		/**
		 * Rerun the test. In this simple example, this just changes any failing
		 * tests to passing.
		 */
		function handleRerun() {
			for ( const index of selectedRows.value ) {
				data.value[ index ].result = true;
			}
		}

		/**
		 * Disconnect selected tests.
		 */
		function handleDisconnect() {
			for ( const index of selectedRows.value ) {
				data.value[ index ].status = false;
			}
		}

		function getIconClass( result ) {
			const iconClassModifier = result ? 'pass' : 'fail';
			return {
				[ `cdx-docs-table-with-selection__icon--${ iconClassModifier }` ]: true
			};
		}

		return {
			selectedRows,
			columns,
			data,
			handleRerun,
			handleDisconnect,
			getIconClass,
			cdxIconCheck,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-table-with-selection {
	&__header-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: @spacing-50;

		&__buttons {
			display: flex;
			gap: @spacing-50;
		}
	}

	& &__icon {
		&--pass {
			color: @color-success;
		}

		&--fail {
			color: @color-error;
		}
	}
}
</style>
```

### Developer notes

To enable row selection, set the `useRowSelection` prop to `true`, and use `v-model` to bind the `selectedRows` prop.

#### Row selection and sort [​](#row-selection-and-sort)

Tests

0 items selected Rerun Disconnect

|     |     |     |     |
| --- | --- | --- | --- |Tests (column headers with buttons are sortable).
| Select all rows | Name | Status | English verb to agent noun |
| --- | --- | --- | --- |
| Select row 1 of 4 | ["illustrate" -> "illustrator"](https://www.wikifunctions.org/view/en/Z11401) | Connected | Failed |
| Select row 2 of 4 | ["listen" -> "listener"](https://www.wikifunctions.org/view/en/Z11405) | Connected | Passed |
| Select row 3 of 4 | ["mentor" -> "mentor"](https://www.wikifunctions.org/view/en/Z11402) | Connected | Passed |
| Select row 4 of 4 | ["swim" -> "swimmer"](https://www.wikifunctions.org/view/en/Z11404) | Connected | Failed |

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-table
		v-model:selected-rows="selectedRows"
		v-model:sort="sort"
		class="cdx-docs-table-with-selection"
		caption="Tests"
		:columns="columns"
		:data="data"
		:use-row-selection="true"
		@update:sort="onSort"
	>
		<template #header>
			<div class="cdx-docs-table-with-selection__header-content">
				<span>
					{{ selectedRows.length }} items selected
				</span>
				<span class="cdx-docs-table-with-selection__header-content__buttons">
					<cdx-button @click="handleRerun">
						Rerun
					</cdx-button>
					<cdx-button @click="handleDisconnect">
						Disconnect
					</cdx-button>
				</span>
			</div>
		</template>

		<template #item-name="{ item }">
			<a :href="item.url">{{ item.label }}</a>
		</template>

		<template #item-status="{ item }">
			<cdx-info-chip :status="item ? 'success' : 'warning'">
				{{ item ? 'Connected' : 'Disconnected' }}
			</cdx-info-chip>
		</template>

		<template #item-result="{ item }">
			<cdx-icon
				:class="getIconClass( item )"
				:icon="item ? cdxIconCheck : cdxIconClose"
			/>
			{{ item ? 'Passed' : 'Failed' }}
		</template>
	</cdx-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTable, CdxButton, CdxInfoChip, CdxIcon, TableRowIdentifier } from '@wikimedia/codex';
import { cdxIconCheck, cdxIconClose } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TableWithSelection',
	components: { CdxTable, CdxButton, CdxInfoChip, CdxIcon },
	setup() {
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<string[]>} */
		const selectedRows = ref( [] );

		const sort = ref( { name: 'asc' } );

		const columns = [
			{ id: 'name', label: 'Name', minWidth: '200px', allowSort: true },
			{ id: 'status', label: 'Status' },
			{ id: 'result', label: 'English verb to agent noun' }
		];

		const data = ref( [
			{
				[ TableRowIdentifier ]: 'Z11401',
				name: {
					label: '"illustrate" -> "illustrator"',
					url: 'https://www.wikifunctions.org/view/en/Z11401'
				},
				status: true,
				result: false
			},
			{
				[ TableRowIdentifier ]: 'Z11405',
				name: {
					label: '"listen" -> "listener"',
					url: 'https://www.wikifunctions.org/view/en/Z11405'
				},
				status: true,
				result: true
			},
			{
				[ TableRowIdentifier ]: 'Z11402',
				name: {
					label: '"mentor" -> "mentor"',
					url: 'https://www.wikifunctions.org/view/en/Z11402'
				},
				status: true,
				result: true
			},
			{
				[ TableRowIdentifier ]: 'Z11404',
				name: {
					label: '"swim" -> "swimmer"',
					url: 'https://www.wikifunctions.org/view/en/Z11404'
				},
				status: true,
				result: false
			}
		] );

		/**
		 * Rerun the test. In this simple example, this just changes any failing
		 * tests to passing.
		 */
		function handleRerun() {
			data.value.forEach( ( row, index ) => {
				if ( selectedRows.value.includes( row[ TableRowIdentifier ] ) ) {
					data.value[ index ].result = true;
				}
			} );
		}

		/**
		 * Disconnect selected tests.
		 */
		function handleDisconnect() {
			data.value.forEach( ( row, index ) => {
				if ( selectedRows.value.includes( row[ TableRowIdentifier ] ) ) {
					data.value[ index ].status = false;
				}
			} );
		}

		function onSort( newSort ) {
			const sortOrder = newSort.name;

			function sortAlphabetically( sortDir ) {
				data.value.sort( ( a, b ) => {
					const multiplier = sortDir === 'asc' ? 1 : -1;
					return multiplier * ( a.name.label.localeCompare( b.name.label ) );
				} );
			}

			// Reset default sort order.
			if ( sortOrder === 'none' ) {
				sortAlphabetically( 'asc' );
				sort.value = { name: 'asc' };
				return;
			}

			sortAlphabetically( sortOrder );
		}

		function getIconClass( result ) {
			const iconClassModifier = result ? 'pass' : 'fail';
			return {
				[ `cdx-docs-table-with-selection__icon--${ iconClassModifier }` ]: true
			};
		}

		return {
			selectedRows,
			sort,
			columns,
			data,
			handleRerun,
			handleDisconnect,
			onSort,
			getIconClass,
			cdxIconCheck,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-table-with-selection {
	&__header-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: @spacing-50;

		&__buttons {
			display: flex;
			gap: @spacing-50;
		}
	}

	& &__icon {
		&--pass {
			color: @color-success;
		}

		&--fail {
			color: @color-error;
		}
	}
}
</style>
```

vue

```
<template>
	<cdx-table
		v-model:selected-rows="selectedRows"
		v-model:sort="sort"
		class="cdx-docs-table-with-selection"
		caption="Tests"
		:columns="columns"
		:data="data"
		:use-row-selection="true"
		@update:sort="onSort"
	>
		<template #header>
			<div class="cdx-docs-table-with-selection__header-content">
				<span>
					{{ selectedRows.length }} items selected
				</span>
				<span class="cdx-docs-table-with-selection__header-content__buttons">
					<cdx-button @click="handleRerun">
						Rerun
					</cdx-button>
					<cdx-button @click="handleDisconnect">
						Disconnect
					</cdx-button>
				</span>
			</div>
		</template>

		<template #item-name="{ item }">
			<a :href="item.url">{{ item.label }}</a>
		</template>

		<template #item-status="{ item }">
			<cdx-info-chip :status="item ? 'success' : 'warning'">
				{{ item ? 'Connected' : 'Disconnected' }}
			</cdx-info-chip>
		</template>

		<template #item-result="{ item }">
			<cdx-icon
				:class="getIconClass( item )"
				:icon="item ? cdxIconCheck : cdxIconClose"
			></cdx-icon>
			{{ item ? 'Passed' : 'Failed' }}
		</template>
	</cdx-table>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTable, CdxButton, CdxInfoChip, CdxIcon, TableRowIdentifier } = require( '@wikimedia/codex' );
const { cdxIconCheck, cdxIconClose } = require( './icons.json' );

module.exports = defineComponent( {
	name: 'TableWithSelection',
	components: { CdxTable, CdxButton, CdxInfoChip, CdxIcon },
	setup() {
		// eslint-disable-next-line jsdoc/valid-types
		/** @type {import('vue').Ref<string[]>} */
		const selectedRows = ref( [] );

		const sort = ref( { name: 'asc' } );

		const columns = [
			{ id: 'name', label: 'Name', minWidth: '200px', allowSort: true },
			{ id: 'status', label: 'Status' },
			{ id: 'result', label: 'English verb to agent noun' }
		];

		const data = ref( [
			{
				[ TableRowIdentifier ]: 'Z11401',
				name: {
					label: '"illustrate" -> "illustrator"',
					url: 'https://www.wikifunctions.org/view/en/Z11401'
				},
				status: true,
				result: false
			},
			{
				[ TableRowIdentifier ]: 'Z11405',
				name: {
					label: '"listen" -> "listener"',
					url: 'https://www.wikifunctions.org/view/en/Z11405'
				},
				status: true,
				result: true
			},
			{
				[ TableRowIdentifier ]: 'Z11402',
				name: {
					label: '"mentor" -> "mentor"',
					url: 'https://www.wikifunctions.org/view/en/Z11402'
				},
				status: true,
				result: true
			},
			{
				[ TableRowIdentifier ]: 'Z11404',
				name: {
					label: '"swim" -> "swimmer"',
					url: 'https://www.wikifunctions.org/view/en/Z11404'
				},
				status: true,
				result: false
			}
		] );

		/**
		 * Rerun the test. In this simple example, this just changes any failing
		 * tests to passing.
		 */
		function handleRerun() {
			data.value.forEach( ( row, index ) => {
				if ( selectedRows.value.includes( row[ TableRowIdentifier ] ) ) {
					data.value[ index ].result = true;
				}
			} );
		}

		/**
		 * Disconnect selected tests.
		 */
		function handleDisconnect() {
			data.value.forEach( ( row, index ) => {
				if ( selectedRows.value.includes( row[ TableRowIdentifier ] ) ) {
					data.value[ index ].status = false;
				}
			} );
		}

		function onSort( newSort ) {
			const sortOrder = newSort.name;

			function sortAlphabetically( sortDir ) {
				data.value.sort( ( a, b ) => {
					const multiplier = sortDir === 'asc' ? 1 : -1;
					return multiplier * ( a.name.label.localeCompare( b.name.label ) );
				} );
			}

			// Reset default sort order.
			if ( sortOrder === 'none' ) {
				sortAlphabetically( 'asc' );
				sort.value = { name: 'asc' };
				return;
			}

			sortAlphabetically( sortOrder );
		}

		function getIconClass( result ) {
			const iconClassModifier = result ? 'pass' : 'fail';
			return {
				[ `cdx-docs-table-with-selection__icon--${ iconClassModifier }` ]: true
			};
		}

		return {
			selectedRows,
			sort,
			columns,
			data,
			handleRerun,
			handleDisconnect,
			onSort,
			getIconClass,
			cdxIconCheck,
			cdxIconClose
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-table-with-selection {
	&__header-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: @spacing-50;

		&__buttons {
			display: flex;
			gap: @spacing-50;
		}
	}

	& &__icon {
		&--pass {
			color: @color-success;
		}

		&--fail {
			color: @color-error;
		}
	}
}
</style>
```

### Developer notes

To use both row selection and sorting, you must add a unique identifier to each row:

*   Import the `TableRowIdentifier` constant from Codex
*   Add a property to each row object keyed on `TableRowIdentifier` with a unique ID, e.g. `[ TableRowIdentifier ]: 'Q123'`

### Pagination [​](#pagination)

When pagination is enabled, the pager elements will display below the `<table>` by default, but can also be displayed above it or in both locations.

Paginated table example

|     |     |
| --- | --- |Paginated table example
| Record Name | Record ID |
| --- | --- |
| AAAAA | 1001 |
| BBBBB | 1002 |
| CCCCC | 1003 |
| DDDDD | 1004 |
| EEEEE | 1005 |
| FFFFF | 1006 |
| GGGGG | 1007 |
| HHHHH | 1008 |
| IIIII | 1009 |
| JJJJJ | 1010 |

10 rows

Showing results 1–10 of 521–10 of 52

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-table
		caption="Paginated table example"
		:columns="paginatedColumns"
		:data="paginatedData"
		:paginate="true"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxTable } from '@wikimedia/codex';

// pagination example
const paginatedColumns = [
	{ id: 'name', label: 'Record Name' },
	{ id: 'id', label: 'Record ID' }
];

// Set up table data in excess of what is displayed
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const paginatedData = [];
let counter = 1001;

alpha.split( '' ).forEach( ( letter ) => {
	paginatedData.push( {
		id: counter,
		name: letter.repeat( 5 )
	} );
	counter++;
} );

export default defineComponent( {
	name: 'TableWithPagination',
	components: {
		CdxTable
	},

	setup() {
		return {
			paginatedColumns,
			paginatedData
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-table
		caption="Paginated table example"
		:columns="paginatedColumns"
		:data="paginatedData"
		:paginate="true"
	></cdx-table>
</template>

<script>
const { defineComponent } = require( 'vue' );
const { CdxTable } = require( '@wikimedia/codex' );

// pagination example
const paginatedColumns = [
	{ id: 'name', label: 'Record Name' },
	{ id: 'id', label: 'Record ID' }
];

// Set up table data in excess of what is displayed
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const paginatedData = [];
let counter = 1001;

alpha.split( '' ).forEach( ( letter ) => {
	paginatedData.push( {
		id: counter,
		name: letter.repeat( 5 )
	} );
	counter++;
} );

module.exports = defineComponent( {
	name: 'TableWithPagination',
	components: {
		CdxTable
	},

	setup() {
		return {
			paginatedColumns,
			paginatedData
		};
	}
} );
</script>
```

*   10
*   20
*   50

### Developer notes

To enable pagination, set the `paginate` prop to true. The pagination interface will display below the `<table>` by default, but the controls can also be moved to the top (or shown in both places at once) via the `paginationPosition` prop.

Additional configuration is also possible. A `paginationSizeOptions` prop can be used to provide different options for the number of rows to display per page, and `paginationSizeDefault` can set the default number of rows that are displayed prior to the user making a selection. By default, a paginated Table will show 10 results per page and will allow the user to choose between page sizes of 10, 20, and 50.

### Empty state [​](#empty-state)

An empty state message can be displayed via the `empty-state` slot.

Table Caption

Table CaptionThere is no data available

Show codeCopy code

vue

```
<template v-slot:demo>
  <cdx-table caption="Table Caption">
    <template #empty-state> There is no data available </template>
  </cdx-table>
</template>
```

### Developer notes

If the `empty-state` slot is populated, this slot will automatically display the slot content when there are no items in the `data` array and the `tbody` slot is not overridden.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `caption`(required) | Table caption.  <br>  <br>Required to support users of assistive technology, but can be visually hidden. | `string` |     |
| `hideCaption` | Whether to visually hide the caption. | `boolean` | `false` |
| `columns` | Column definitions. | `[TableColumn](../types-and-constants.html#tablecolumn)[]` | `[]` |
| `data` | Table data.  <br>  <br>An array of objects, with each object representing the data for a table row. Item keys should align with column IDs, as defined in the `columns` prop. | `[TableRow](../types-and-constants.html#tablerow)[]\|[TableRowWithIdentifier](../types-and-constants.html#tablerowwithidentifier)[]` | `[]` |
| `useRowHeaders` | Whether to use `<th>` for the first cell in each row. | `boolean` | `false` |
| `showVerticalBorders` | Whether vertical borders separating columns should be rendered. | `boolean` | `false` |
| `useRowSelection` | Whether to enable row selection. | `boolean` | `false` |
| `selectedRows` | An array of selected row indices. Must be bound with `v-model:selected-rows`.  <br>  <br>If sorting is also enabled, this will be an array of TableRowIdentifiers. | `(number\|string)[]` | `[]` |
| `sort` | Definition of sort order. Column(s) can be sorted ascending, descending, or not sorted. To display data unsorted initially, set to an empty object initially. Must be bound with v-model:sort | `[TableSort](../types-and-constants.html#tablesort)` | `{}` |
| `pending` | Whether the table is waiting for data to be fetched. | `boolean` | `false` |
| `paginate` | Whether to enable pagination. | `boolean` | `false` |
| `serverPagination` | Whether the table is paginating through remote data. Setting this to "true" will cause the table to emit events indicating that more data should be loaded when the user navigates between pages. | `boolean` | `false` |
| `totalRows` | The total number of rows/results available on the server that the user can access via pagination. Providing this value will make for a better user experience when navigating through pages of remote data, but it is not required. | `number` | `NaN` |
| `paginationPosition` | Where the pagination controls should appear relative to the table body. | `[TablePaginationPosition](../types-and-constants.html#tablepaginationposition)` | `'bottom'` |
| `paginationSizeOptions` | Pre-defined options for how may rows should be displayed per page. The value of these menu items must be a number. | `[TablePaginationSizeOption](../types-and-constants.html#tablepaginationsizeoption)[]` | `[ { value: 10 }, { value: 20 }, { value: 50 } ]` |
| `paginationSizeDefault` | The default number of rows to show per page. For basic pagination, this will default to the value of the first of the pagination options if not provided. For server-side pagination, this will default to the initial number of rows if no default is provided. | `number` | `paginationSizeOptions[ 0 ].value` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `update:selectedRows` | **selectedRows** `string[]` - The new selected rows. | When the selected row(s) changes. |
| `update:sort` | **sort** `[Object](../types-and-constants.html#object)` - The new sort order. | When the sort order changes emit an event to update the sort order. |
| `load-more` | **offset** `number` - Index of the first visible row on the new page. **rows** `number` - Number of rows to display. | When the user requests another page of data from the server. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| header | Header content. Not to be confused with <thead>; use the thead slot to customize that. |     |
| thead | Custom <thead>. |     |
| tbody | Custom <tbody>. |     |
| 'item-' + column.id | Table cell content, per column. | **item** `any` - Data for the cell  <br>**row** `TableRow, TableRowWithIdentifier` - Data for the row |
| empty-state | Empty state content. |     |
| tfoot | Custom <tfoot>. |     |
| footer | Footer content. Not to be confused with <tfoot>; use the tfoot slot to add that. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The CSS-only Table consists of a `<table>` element and its child elements, plus some wrapper elements and CSS classes needed to ensure proper styles and accessibility. Refer to the code sample below for details.

Cell data is aligned to the start of the cell by default. You can use the following CSS classes to change the alignment of cell data:

*   `cdx-table__table__cell--align-center`: Align content to the center of the cell
*   `cdx-table__table__cell--align-end`: Align content to the end of the cell (to the right in LTR and to the left in RTL)
*   `cdx-table__table__cell--align-number`: Align content to the right of the cell in both reading directionalities. This is recommended for columns that contain numerical values.

Note that all cells in a column, including the `<th>` in the `<thead>`, should have the same text alignment.

1912 Olympics — Men's marathon

|     |     |     |     |
| --- | --- | --- | --- |1912 Olympics — Men's marathon
| Athlete | Nation | Rank | Time |
| --- | --- | --- | --- |
| Ken McArthur | South Africa | 1   | 2:36:54.8 |
| Christian Gitsham | South Africa | 2   | 2:37:52.0 |
| Gaston Strobino | United States | 3   | 2:38:42.4 |
| Shizo Kanakuri | Japan | 36  | 54:08:06:05:32:20.3 |

Read more on [Wikipedia](https://en.wikipedia.org/wiki/Athletics_at_the_1912_Summer_Olympics_%E2%80%93_Men%27s_marathon).

Show codeCopy code

html

```
<!-- Wrapper div. -->
<div class="cdx-table">
  <!-- Header content. -->
  <div class="cdx-table__header">
    <!-- Visible table caption. It is hidden from assistive technology since
		there is an accessible <caption> in the <table> element. If you add
		content to the header content div below, remove `aria-hidden` here to
		ensure the caption is announced first. -->
    <div class="cdx-table__header__caption" aria-hidden="true">
      1912 Olympics — Men's marathon
    </div>
    <!-- Additional header content goes here if needed. -->
    <div class="cdx-table__header__header-content"></div>
  </div>
  <!-- Wrapper around the table element. Needed for horizontal scroll. -->
  <div class="cdx-table__table-wrapper">
    <!-- Table element. -->
    <table class="cdx-table__table">
      <!-- Visually-hidden caption element, for assistive technology.
				Do not omit this! -->
      <caption>
        1912 Olympics — Men's marathon
      </caption>
      <thead>
        <tr>
          <th scope="col">
            <span class="cdx-table__th-content">Athlete</span>
          </th>
          <th scope="col">
            <span class="cdx-table__th-content">Nation</span>
          </th>
          <!-- <th> with class to align cell content to the end. -->
          <th scope="col" class="cdx-table__table__cell--align-number">
            <span class="cdx-table__th-content">Rank</span>
          </th>
          <th scope="col" class="cdx-table__table__cell--align-number">
            <span class="cdx-table__th-content">Time</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ken McArthur</td>
          <td>South Africa</td>
          <!-- <th> with class to align cell content to the end. -->
          <td class="cdx-table__table__cell--align-number">1</td>
          <td class="cdx-table__table__cell--align-number">2:36:54.8</td>
        </tr>
        <tr>
          <td>Christian Gitsham</td>
          <td>South Africa</td>
          <td class="cdx-table__table__cell--align-number">2</td>
          <td class="cdx-table__table__cell--align-number">2:37:52.0</td>
        </tr>
        <tr>
          <td>Gaston Strobino</td>
          <td>United States</td>
          <td class="cdx-table__table__cell--align-number">3</td>
          <td class="cdx-table__table__cell--align-number">2:38:42.4</td>
        </tr>
        <tr>
          <td>Shizo Kanakuri</td>
          <td>Japan</td>
          <td class="cdx-table__table__cell--align-number">36</td>
          <td class="cdx-table__table__cell--align-number">
            54:08:06:05:32:20.3
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

#### Visually hidden caption [​](#visually-hidden-caption)

To visually hide the header's caption, simply do not add it to the header element (`<div class="cdx-table__header">`). If you have no other header content, the entire header element can be removed, as in the example below. Make sure to always include the `<caption>` element inside the `<table>`, which is visually hidden by default.

|     |     |     |     |
| --- | --- | --- | --- |List of MediaWikis
| Project | No. of wikis | Active users | All users |
| --- | --- | --- | --- |
| wikipedias | 342 | 292249 | 113556337 |
| wiktionaries | 193 | 5764 | 7275027 |
| wikiquotes | 96  | 2042 | 4261041 |
| Total: | 631 | 300055 | 125092405 |

Show codeCopy code

html

```
<div class="cdx-table">
  <!-- Header has been omitted since there is no header content. -->
  <div class="cdx-table__table-wrapper">
    <table class="cdx-table__table">
      <caption>
        List of MediaWikis
      </caption>
      <thead>
        <tr>
          <th scope="col">Project</th>
          <th scope="col" class="cdx-table__table__cell--align-number">
            No. of wikis
          </th>
          <th scope="col" class="cdx-table__table__cell--align-number">
            Active users
          </th>
          <th scope="col" class="cdx-table__table__cell--align-number">
            All users
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>wikipedias</td>
          <td class="cdx-table__table__cell--align-number">342</td>
          <td class="cdx-table__table__cell--align-number">292249</td>
          <td class="cdx-table__table__cell--align-number">113556337</td>
        </tr>
        <tr>
          <td>wiktionaries</td>
          <td class="cdx-table__table__cell--align-number">193</td>
          <td class="cdx-table__table__cell--align-number">5764</td>
          <td class="cdx-table__table__cell--align-number">7275027</td>
        </tr>
        <tr>
          <td>wikiquotes</td>
          <td class="cdx-table__table__cell--align-number">96</td>
          <td class="cdx-table__table__cell--align-number">2042</td>
          <td class="cdx-table__table__cell--align-number">4261041</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total:</td>
          <td class="cdx-table__table__cell--align-number">631</td>
          <td class="cdx-table__table__cell--align-number">300055</td>
          <td class="cdx-table__table__cell--align-number">125092405</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
```

#### Vertical borders [​](#vertical-borders)

To display vertical borders that separate the columns, apply the `cdx-table__table--borders-vertical` class to table element. This class may not cover all use cases, therefore apply additional border styles to the element as needed.

List of MediaWikis

|     |     |     |     |
| --- | --- | --- | --- |List of MediaWikis
| Project | No. of wikis | Users |     |
| --- | --- | --- | --- |
| Active | All |
| --- | --- | --- | --- |
| wikipedias | 342 | 292249 | 113556337 |
| wiktionaries | 193 | 5764 | 7275027 |
| wikiquotes | 96  | 2042 | 4261041 |
| Total: | 631 | 300055 | 125092405 |

Show codeCopy code

html

```
<div class="cdx-table">
  <div class="cdx-table__header">
    <div class="cdx-table__header__caption" aria-hidden="true">
      List of MediaWikis
    </div>
  </div>
  <div class="cdx-table__table-wrapper">
    <!-- <table> with the class to add vertical borders/rulers to separate the columns. -->
    <table class="cdx-table__table cdx-table__table--borders-vertical">
      <caption>
        List of MediaWikis
      </caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2">Project</th>
          <th
            scope="col"
            rowspan="2"
            class="cdx-table__table__cell--align-number"
          >
            No. of wikis
          </th>
          <th
            scope="colgroup"
            colspan="2"
            class="cdx-table__table__cell--align-center"
          >
            Users
          </th>
        </tr>
        <tr>
          <th scope="col" class="cdx-table__table__cell--align-number">
            Active
          </th>
          <th scope="col" class="cdx-table__table__cell--align-number">All</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>wikipedias</td>
          <td class="cdx-table__table__cell--align-number">342</td>
          <td class="cdx-table__table__cell--align-number">292249</td>
          <td class="cdx-table__table__cell--align-number">113556337</td>
        </tr>
        <tr>
          <td>wiktionaries</td>
          <td class="cdx-table__table__cell--align-number">193</td>
          <td class="cdx-table__table__cell--align-number">5764</td>
          <td class="cdx-table__table__cell--align-number">7275027</td>
        </tr>
        <tr>
          <td>wikiquotes</td>
          <td class="cdx-table__table__cell--align-number">96</td>
          <td class="cdx-table__table__cell--align-number">2042</td>
          <td class="cdx-table__table__cell--align-number">4261041</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <!-- <th> as a row header cell with the scope attribute. -->
          <th scope="row">Total:</th>
          <td class="cdx-table__table__cell--align-number">631</td>
          <td class="cdx-table__table__cell--align-number">300055</td>
          <td class="cdx-table__table__cell--align-number">125092405</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
```

#### Row headers [​](#row-headers)

In some cases, header information can be found in the top row and first column. All header cells are marked up as `th` elements with the appropriate `scope` attribute. The scope attribute helps to describe the relationship between header and data cells. Refer to [WAI](https://www.w3.org/WAI/tutorials/tables/two-headers/) to learn more about Table header row and header column.

List of MediaWikis

|     |     |     |     |
| --- | --- | --- | --- |List of MediaWikis
| Project | No. of wikis | Users |     |
| --- | --- | --- | --- |
| Active | All |
| --- | --- | --- | --- |
| wikipedias | 342 | 292249 | 113556337 |
| wiktionaries | 193 | 5764 | 7275027 |
| wikiquotes | 96  | 2042 | 4261041 |
| Total: | 631 | 300055 | 125092405 |

Show codeCopy code

html

```
<div class="cdx-table">
  <div class="cdx-table__header">
    <div class="cdx-table__header__caption" aria-hidden="true">
      List of MediaWikis
    </div>
  </div>
  <div class="cdx-table__table-wrapper">
    <table class="cdx-table__table cdx-table__table--borders-vertical">
      <caption>
        List of MediaWikis
      </caption>
      <thead>
        <tr>
          <th scope="col" rowspan="2">Project</th>
          <th
            scope="col"
            rowspan="2"
            class="cdx-table__table__cell--align-number"
          >
            No. of wikis
          </th>
          <th
            scope="colgroup"
            colspan="2"
            class="cdx-table__table__cell--align-center"
          >
            Users
          </th>
        </tr>
        <tr>
          <th scope="col" class="cdx-table__table__cell--align-number">
            Active
          </th>
          <th scope="col" class="cdx-table__table__cell--align-number">All</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- <th> as a row header cell with the scope attribute. -->
          <th scope="row">wikipedias</th>
          <td class="cdx-table__table__cell--align-number">342</td>
          <td class="cdx-table__table__cell--align-number">292249</td>
          <td class="cdx-table__table__cell--align-number">113556337</td>
        </tr>
        <tr>
          <!-- <th> as a row header cell with the scope attribute. -->
          <th scope="row">wiktionaries</th>
          <td class="cdx-table__table__cell--align-number">193</td>
          <td class="cdx-table__table__cell--align-number">5764</td>
          <td class="cdx-table__table__cell--align-number">7275027</td>
        </tr>
        <tr>
          <!-- <th> as a row header cell with the scope attribute. -->
          <th scope="row">wikiquotes</th>
          <td class="cdx-table__table__cell--align-number">96</td>
          <td class="cdx-table__table__cell--align-number">2042</td>
          <td class="cdx-table__table__cell--align-number">4261041</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <!-- <th> as a row header cell with the scope attribute. -->
          <th scope="row">Total:</th>
          <td class="cdx-table__table__cell--align-number">631</td>
          <td class="cdx-table__table__cell--align-number">300055</td>
          <td class="cdx-table__table__cell--align-number">125092405</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
```

#### With row selection [​](#with-row-selection)

Row selection can be done without JavaScript by following these steps:

*   Use a `<form>` element as the outermost element with the class `cdx-table`
*   Add a submit button to the header to handle the row selection data
*   Omit the "select all" checkbox in the `<thead>`
*   Give each row's checkbox the same `name` and a unique `value`

Note that the Table below doesn't actually do anything when you click "Sign up" besides submit the form and reload the page.

Sessions

Sign up

|     |     |     |
| --- | --- | --- |Tests
|     | Name | Time |
| --- | --- | --- |
| Select row 1 of 3 | Introduction to Semantic MediaWiki | 11:00 EEST |
| Select row 2 of 3 | Wikisource intro session | 11:30 EEST |
| Select row 3 of 3 | Introduction to Wikibase Suite | 12:00 EEST |

Show codeCopy code

html

```
<!-- Use a <form> element instead of a <div>. -->
<form class="cdx-table" action="">
  <div class="cdx-table__header">
    <!-- When there is header content (e.g. this "Sign up" button), do
		not use `aria-hidden` on the visible caption. This way, the caption
		will be announced before the header content. -->
    <div class="cdx-table__header__caption">Sessions</div>
    <div class="cdx-table__header__header-content">
      <!-- Include a submit button. -->
      <button class="cdx-button" type="submit">Sign up</button>
    </div>
  </div>
  <div class="cdx-table__table-wrapper">
    <table class="cdx-table__table">
      <caption>
        Tests
      </caption>
      <thead>
        <tr>
          <!-- Empty <th> since we are omitting the "select all" option. -->
          <th></th>
          <th scope="col">Name</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="cdx-checkbox">
              <div class="cdx-checkbox__wrapper">
                <!-- Include the proper attributes on each checkbox input. -->
                <input
                  id="session-1"
                  class="cdx-checkbox__input"
                  type="checkbox"
                  name="sessions"
                  value="session-1"
                />
                <span class="cdx-checkbox__icon"></span>
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label class="cdx-label__label" for="session-1">
                    <span class="cdx-label__label__text"
                      >Select row 1 of 3</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </td>
          <td>Introduction to Semantic MediaWiki</td>
          <td>11:00 EEST</td>
        </tr>
        <tr>
          <td>
            <div class="cdx-checkbox">
              <div class="cdx-checkbox__wrapper">
                <input
                  id="session-2"
                  class="cdx-checkbox__input"
                  type="checkbox"
                  name="sessions"
                  value="session-2"
                />
                <span class="cdx-checkbox__icon"></span>
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label class="cdx-label__label" for="session-2">
                    <span class="cdx-label__label__text"
                      >Select row 2 of 3</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </td>
          <td>Wikisource intro session</td>
          <td>11:30 EEST</td>
        </tr>
        <tr>
          <td>
            <div class="cdx-checkbox">
              <div class="cdx-checkbox__wrapper">
                <input
                  id="session-3"
                  class="cdx-checkbox__input"
                  type="checkbox"
                  name="sessions"
                  value="session-3"
                />
                <span class="cdx-checkbox__icon"></span>
                <div
                  class="cdx-label cdx-label--visually-hidden cdx-checkbox__label"
                >
                  <label class="cdx-label__label" for="session-3">
                    <span class="cdx-label__label__text"
                      >Select row 3 of 3</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </td>
          <td>Introduction to Wikibase Suite</td>
          <td>12:00 EEST</td>
        </tr>
      </tbody>
    </table>
  </div>
</form>
```

#### Empty state [​](#empty-state-1)

You can use the CSS classes, `cdx-table__table__empty-state` and `cdx-table__table__empty-state-content`, to style the empty state message that indicates that there's no data available. The `<td>` element here should also have a `colspan` attribute with a value equal to the number of columns in the table, but this can be omitted if the table only has a single column.

List of MediaWikis

List of MediaWikisThere is no data available

Show codeCopy code

html

```
<div class="cdx-table">
  <div class="cdx-table__header">
    <div class="cdx-table__header__caption" aria-hidden="true">
      List of MediaWikis
    </div>
  </div>
  <div class="cdx-table__table-wrapper">
    <table class="cdx-table__table">
      <caption>
        List of MediaWikis
      </caption>
      <!-- <tbody> with the class for an empty table that has no data available. -->
      <tbody>
        <tr class="cdx-table__table__empty-state">
          <td class="cdx-table__table__empty-state-content">
            There is no data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

#### Pagination [​](#pagination-1)

This example demonstrates the markup structure that should be used for visual parity with the Vue.js version of the paginated Table component. In a real-world scenario, the `<form>``action` and `<button>` values will need to be set in a way that corresponds with whatever back-end is being used. Typical usage will involve a GET request to the URL specified in the form `action`, with the select and button values mapped to specific URL parameters.

Buttons for first, next, previous, and last pages use the `cdx-button--icon-only` class. The icon images are added automatically.

F1 Racing Teams

|     |     |     |     |
| --- | --- | --- | --- |F1 Racing Teams
| Team | Driver One | Driver Two | Constructors' Points |
| --- | --- | --- | --- |
| Mercedes | Lewis Hamilton | George Russell | 213 |
| Red Bull | Max Verstappen | Sergio Perez | 234 |
| McLaren | Lando Norris | Oscar Piastri | 123 |
| Ferrari | Carlos Sainz | Charles Leclerc | 100 |
| Alpine | Esteban Ocon | Pierre Gasly | 85  |
| Alfa Romeo | Valtteri Bottas | Guanyu Zhou | 60  |
| Aston Martin | Fernando Alonso | Lance Stroll | 95  |
| Haas | Kevin Magnussen | Mick Schumacher | 50  |
| Williams | Alexander Albon | Logan Sargeant | 30  |
| AlphaTauri | Yuki Tsunoda | Nyck de Vries | 40  |

10 rows25 rows50 rows

Showing results 1 - 10 of 52

Show codeCopy code

html

```
	<div class="cdx-table">
		<div class="cdx-table__header">
			<div class="cdx-table__header__caption" aria-hidden="true">
				F1 Racing Teams
			</div>
			<div class="cdx-table__header__header-content"></div>
		</div>
		<div class="cdx-table__table-wrapper">
			<table class="cdx-table__table">
				<caption>
					F1 Racing Teams
				</caption>
				<thead>
					<tr>
						<th scope="col">
							<span class="cdx-table__th-content">Team</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Driver One</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Driver Two</span>
						</th>
						<th scope="col">
							<span class="cdx-table__th-content">Constructors' Points</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Mercedes</td>
						<td>Lewis Hamilton</td>
						<td>George Russell</td>
						<td>213</td>
					</tr>
					<tr>
						<td>Red Bull</td>
						<td>Max Verstappen</td>
						<td>Sergio Perez</td>
						<td>234</td>
					</tr>
					<tr>
						<td>McLaren</td>
						<td>Lando Norris</td>
						<td>Oscar Piastri</td>
						<td>123</td>
					</tr>
					<tr>
						<td>Ferrari</td>
						<td>Carlos Sainz</td>
						<td>Charles Leclerc</td>
						<td>100</td>
					</tr>
					<tr>
						<td>Alpine</td>
						<td>Esteban Ocon</td>
						<td>Pierre Gasly</td>
						<td>85</td>
					</tr>
					<tr>
						<td>Alfa Romeo</td>
						<td>Valtteri Bottas</td>
						<td>Guanyu Zhou</td>
						<td>60</td>
					</tr>
					<tr>
						<td>Aston Martin</td>
						<td>Fernando Alonso</td>
						<td>Lance Stroll</td>
						<td>95</td>
					</tr>
					<tr>
						<td>Haas</td>
						<td>Kevin Magnussen</td>
						<td>Mick Schumacher</td>
						<td>50</td>
					</tr>
					<tr>
						<td>Williams</td>
						<td>Alexander Albon</td>
						<td>Logan Sargeant</td>
						<td>30</td>
					</tr>
					<tr>
						<td>AlphaTauri</td>
						<td>Yuki Tsunoda</td>
						<td>Nyck de Vries</td>
						<td>40</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- Table pager form. -->
		<form method="get" :action="url">
			<div class="cdx-table-pager cdx-table__pagination--bottom">
				<div class="cdx-table-pager__start">
				<!-- Rows per page select. -->
		 			<select class="cdx-select" name="rows">
						<option value="10">10 rows</option>
						<option value="25">25 rows</option>
						<option value="50">50 rows</option>
					</select>
				</div>
				<!-- Pagination status. -->
				<div class="cdx-table-pager__center">
					<div class="cdx-table__pagination-status--long">
						Showing results 1 - 10 of 52
					</div>
				</div>
				<!-- Pagination buttons. -->
				<div class="cdx-table-pager__end">
					<!-- Button with ARIA label. -->
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="First Page">
						<!-- Empty span with icon classes and `aria-hidden`. -->
						<span class="cdx-table-pager__icon--first cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Previous Page">
						<span class="cdx-table-pager__icon--previous cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Next Page">
						<span class="cdx-table-pager__icon--next cdx-button__icon" aria-hidden="true"></span>
					</button>
	 				<button class="cdx-button cdx-button--icon-only cdx-button--weight-quiet" aria-label="Last Page">
						<span class="cdx-table-pager__icon--last cdx-button__icon" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		</form>
	</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus to the next interactive element within the Table. |
| Shift+Tab | It moves the focus to the previous interactive element within the Table. |
| Up arrow, Down arrow | For assistive technology users, these keys move between the column cells. |
| Left arrow, Right arrow | For assistive technology users, these keys move between the row cells. |

Pager

[Previous pagePopover](/codex/latest/components/demos/popover.html)

[Next pageTooltip](/codex/latest/components/directives/tooltip.html)