# MultiselectLookup [​](#multiselectlookup)

A MultiselectLookup is a predictive input that allows users to make multiple selections from a menu of options.

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| separateInput |     |
| status | default<br><br>error |
| disabled |     |
| readonly |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

*   No results found.

## Overview [​](#overview)

### When to use MultiselectLookup [​](#when-to-use-multiselectlookup)

Use the MultiselectLookup component to let users search through a set of options to choose predefined values for a form field or to filter information. A MultiselectLookup is useful when there are many options the user can choose from, so they need to filter the items via a text query.

**When to use:**

*   When users may only select values from a predefined list.
*   When there are many predefined options to choose from.
*   When users need to be able to select multiple items.

**When not to use:**

*   When users need to create custom values that cannot be selected from a menu. Use [ChipInput](./chip-input.html) instead.
*   When users need to select a single option from the menu. Instead, use [Lookup](./lookup.html) or [Select](./select.html).
*   When the filtering process is simple and involves a short list of options. For static options in a small list, consider using a [Checkbox](./checkbox.html) group instead.

### About MultiselectLookup [​](#about-multiselectlookup)

MultiselectLookup includes the following elements.

#### Input [​](#input)

A predictive text input where the user types to look for the suggested results.

#### Dropdown menu [​](#dropdown-menu)

Results matching the input text are displayed within the Menu, allowing users to select one or more options to include as chips.

*   Include an initial list of 2–5 suggestions if it's helpful to users.
*   Include a "no results" message if there are no results found for the current input value.

#### Chips [​](#chips)

Selected results from the menu are included as chips in the input. Individual chips can be removed to de-select their values. Chips can be placed within the input or in a separate section above the input.

Use the Field component

Wrap the MultiselectLookup within the [Field component](./field.html) to incorporate features such as a label, description, help text, and inline validation messages.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

The MultiselectLookup component emits an event when the user types in the input. The parent component can then fetch items matching that input and pass them to the MultiselectLookup to display in the Menu.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-basic"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup basic demo"
		@input="onInput"
		@update:selected="onUpdateSelected"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';
import vegetableItems from '../../lookup/examples/data.json';

export default defineComponent( {
	name: 'MultiselectLookupBasic',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				menuItems.value = [];
			}
		}

		function onUpdateSelected() {
			// eslint-disable-next-line no-console
			console.log( 'Current selection:', selection.value.join( ', ' ) );
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput,
			onUpdateSelected
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-basic"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup basic demo"
		@input="onInput"
		@update:selected="onUpdateSelected"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxMultiselectLookup } = require( '@wikimedia/codex' );
const vegetableItems = require( '../../lookup/examples/data.json' );

module.exports = defineComponent( {
	name: 'MultiselectLookupBasic',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				menuItems.value = [];
			}
		}

		function onUpdateSelected() {
			// eslint-disable-next-line no-console
			console.log( 'Current selection:', selection.value.join( ', ' ) );
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput,
			onUpdateSelected
		};
	}
} );
</script>
```

*   No results found.

### Developer notes

The MultiselectLookup component emits an event on input. The parent component should react by computing or fetching menu items, then providing those items to the MultiselectLookup component for display by updating the `menu-items` prop. The user can then select an item from the menu.

The MultiselectLookup component is similar to the [Lookup](./lookup.html) component, but there are some key differences to enable the selection of multiple items:

1.  The `selected` prop, which is bound with `v-model`, is an array of selected values (or an empty array if there are no selections).
2.  The `inputChips` prop must be bound via `v-model` and is an array of chips representing each selected item (or an empty array if there are no selections).

There are 2 ways to listen for input changes:

1.  Listen for `input` events, like in the example below. Do this if you only need to know about the input when it changes.
2.  Use `v-model` to bind the `inputValue` prop and listen for either `input` or `update:input-value` events. Do this if you need to know the current input value at other times, or if you want to be able to set the input value. Refer to the [Vue usage](#vue-usage) tables for more information.

Items are displayed via the MenuItem component—refer to the [MenuItem docs](./menu-item.html) for more options. In this example, a `menuConfig` object is passed to the MultiselectLookup to bold the label text. Note that in this example, menu items are Wikidata items with a human-readable label and a Wikidata entity ID value.

WARNING

The parent component must update the `menu-items` prop after each `input` event, otherwise the MultiselectLookup component will stay in the pending state indefinitely. If there are no results for the given input, set the `menu-items` prop to an empty array (`[]`).

Open the console, where the current selection is output each time an item is selected or de-selected.

### With keep input on selection [​](#with-keep-input-on-selection)

By default, when the user makes a selection, the input will be cleared and the menu will be closed. Sometimes, it might be more helpful to enable users to select multiple items based on the same search term. In these cases, use the `keepInputOnSelection` prop, which will keep the same input and make the menu stay open on selection.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-namespaces-keep-input"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		:keep-input-on-selection="true"
		aria-label="MultiselectLookup with keep input"
		placeholder="Select namespaces"
		@input="onInput"
		@update:selected="onUpdateSelected"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';
import namespaces from '../../multiselect-lookup/examples/namespaces.json';

export default defineComponent( {
	name: 'MultiselectLookupWithKeepInput',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				const searchValue = value.toLowerCase();
				menuItems.value = namespaces.filter( ( item ) => item.label
					.toLowerCase().includes( searchValue ) );
			} else {
				menuItems.value = [];
			}
		}

		function onUpdateSelected() {
			// eslint-disable-next-line no-console
			console.log( 'Current selection:', selection.value.join( ', ' ) );
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput,
			onUpdateSelected
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-namespaces-keep-input"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		:keep-input-on-selection="true"
		aria-label="MultiselectLookup with keep input"
		placeholder="Select namespaces"
		@input="onInput"
		@update:selected="onUpdateSelected"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxMultiselectLookup } = require( '@wikimedia/codex' );
const namespaces = require( '../../multiselect-lookup/examples/namespaces.json' );

module.exports = defineComponent( {
	name: 'MultiselectLookupWithKeepInput',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				const searchValue = value.toLowerCase();
				menuItems.value = namespaces.filter( ( item ) => item.label
					.toLowerCase().includes( searchValue ) );
			} else {
				menuItems.value = [];
			}
		}

		function onUpdateSelected() {
			// eslint-disable-next-line no-console
			console.log( 'Current selection:', selection.value.join( ', ' ) );
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput,
			onUpdateSelected
		};
	}
} );
</script>
```

*   No results found.

### With fetched results [​](#with-fetched-results)

Often, MultiselectLookup is used to fetch results from an API endpoint, and may display many results. You can control how many items to show in the menu at once, and other items can be reached by scrolling. You can also load more items when the user scrolls to the end of the menu.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-wikidata"
		v-model:input-chips="chips"
		v-model:selected="selection"
		v-model:input-value="inputValue"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		placeholder="Search wikidata items"
		aria-label="MultiselectLookup with fetched results demo"
		@update:input-value="onUpdateInputValue"
		@load-more="onLoadMore"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiselectLookupWithFetch',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		// Chips to display in the input, representing selected items.
		const chips = ref( [] );
		// Array of selected values.
		const selection = ref( [] );
		// Current input value. This is helpful to track so we can fetch results for the current
		// search term, and is bound to the MultiselectLookup via v-model.
		const inputValue = ref( '' );
		// Menu items to show. On input, results will be fetched and provided as menu items. When
		// the input is cleared, the menu items will be reset to an empty array.
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * Get search results.
		 *
		 * @param {string} searchTerm
		 * @param {number} offset Optional result offset
		 *
		 * @return {Promise}
		 */
		function fetchResults( searchTerm, offset ) {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				search: searchTerm
			} );
			if ( offset ) {
				params.set( 'continue', String( offset ) );
			}
			return fetch( `https://www.wikidata.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Handle lookup input.
		 *
		 * TODO: this should be debounced.
		 *
		 * @param {string} value The new input value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if the input was cleared.
			if ( !value ) {
				menuItems.value = [];
				return;
			}

			fetchResults( value )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( inputValue.value !== value ) {
						return;
					}

					// Reset the menu items if there are no results.
					if ( !data.search || data.search.length === 0 ) {
						menuItems.value = [];
						return;
					}

					// Build an array of menu items.
					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					menuItems.value = results;
				} )
				.catch( () => {
					// On error, set results to empty.
					menuItems.value = [];
				} );
		}

		function deduplicateResults( results ) {
			const seen = new Set( menuItems.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		function onLoadMore() {
			if ( !inputValue.value ) {
				return;
			}

			fetchResults( inputValue.value, menuItems.value.length )
				.then( ( data ) => {
					if ( !data.search || data.search.length === 0 ) {
						return;
					}

					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					const deduplicatedResults = deduplicateResults( results );
					menuItems.value.push( ...deduplicatedResults );
				} );
		}

		return {
			chips,
			selection,
			inputValue,
			menuItems,
			menuConfig,
			onUpdateInputValue,
			onLoadMore
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-wikidata"
		v-model:input-chips="chips"
		v-model:selected="selection"
		v-model:input-value="inputValue"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		placeholder="Search wikidata items"
		aria-label="MultiselectLookup with fetched results demo"
		@update:input-value="onUpdateInputValue"
		@load-more="onLoadMore"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxMultiselectLookup } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'MultiselectLookupWithFetch',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		// Chips to display in the input, representing selected items.
		const chips = ref( [] );
		// Array of selected values.
		const selection = ref( [] );
		// Current input value. This is helpful to track so we can fetch results for the current
		// search term, and is bound to the MultiselectLookup via v-model.
		const inputValue = ref( '' );
		// Menu items to show. On input, results will be fetched and provided as menu items. When
		// the input is cleared, the menu items will be reset to an empty array.
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * Get search results.
		 *
		 * @param {string} searchTerm
		 * @param {number} offset Optional result offset
		 *
		 * @return {Promise}
		 */
		function fetchResults( searchTerm, offset ) {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				search: searchTerm
			} );
			if ( offset ) {
				params.set( 'continue', String( offset ) );
			}
			return fetch( `https://www.wikidata.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Handle lookup input.
		 *
		 * TODO: this should be debounced.
		 *
		 * @param {string} value The new input value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if the input was cleared.
			if ( !value ) {
				menuItems.value = [];
				return;
			}

			fetchResults( value )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( inputValue.value !== value ) {
						return;
					}

					// Reset the menu items if there are no results.
					if ( !data.search || data.search.length === 0 ) {
						menuItems.value = [];
						return;
					}

					// Build an array of menu items.
					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					menuItems.value = results;
				} )
				.catch( () => {
					// On error, set results to empty.
					menuItems.value = [];
				} );
		}

		function deduplicateResults( results ) {
			const seen = new Set( menuItems.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		function onLoadMore() {
			if ( !inputValue.value ) {
				return;
			}

			fetchResults( inputValue.value, menuItems.value.length )
				.then( ( data ) => {
					if ( !data.search || data.search.length === 0 ) {
						return;
					}

					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					const deduplicatedResults = deduplicateResults( results );
					menuItems.value.push( ...deduplicatedResults );
				} );
		}

		return {
			chips,
			selection,
			inputValue,
			menuItems,
			menuConfig,
			onUpdateInputValue,
			onLoadMore
		};
	}
} );
</script>
```

*   No results found.

### Developer notes

Parent components should react to the `input` or `update:input-value` event emitted by MultiselectLookup to search for results, then pass back to the MultiselectLookup either an array of results to display as menu items or an empty array if there are no results. After the input changes and until the menuItems are updated, a pending animation will display in the input.

Scrolling is enabled by setting the `visibleItemLimit` property of the `menuConfig` prop.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user nears the end of the list of results, a `load-more` event is emitted. The parent component can react to this by fetching more results and appending them to the list of menu items provided to the MultiselectLookup. These new items will then be displayed within the menu.

### With suggestions [​](#with-suggestions)

You can show a list of 2–5 initial suggestions if it's helpful.

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-suggestions"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup with suggestions demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';
import vegetableItems from '../../lookup/examples/data.json';

export default defineComponent( {
	name: 'MultiselectLookupWithSuggestions',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		// Set up an array of initial menu items to show as suggestions.
		const initialMenuItems = [
			{
				label: 'Suggested items',
				items: vegetableItems.slice( 0, 3 )
			}
		];
		const menuItems = ref( initialMenuItems );
		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				// When the input is cleared, show the suggestions again.
				menuItems.value = initialMenuItems;
			}
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-suggestions"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup with suggestions demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxMultiselectLookup } = require( '@wikimedia/codex' );
const vegetableItems = require( '../../lookup/examples/data.json' );

module.exports = defineComponent( {
	name: 'MultiselectLookupWithSuggestions',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		// Set up an array of initial menu items to show as suggestions.
		const initialMenuItems = [
			{
				label: 'Suggested items',
				items: vegetableItems.slice( 0, 3 )
			}
		];
		const menuItems = ref( initialMenuItems );
		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				// When the input is cleared, show the suggestions again.
				menuItems.value = initialMenuItems;
			}
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
```

*   Suggested items*   potatoroot vegetable
    *   carrotroot vegetable, usually orange in color
    *   zucchiniEdible summer squash, typically green in colour

### Developer notes

To show a list of suggestions, pass in an array of menu items initially. The parent component must handle resetting the menu items to this list of suggestions when the input is cleared.

### With initial value [​](#with-initial-value)

carrot

eggplant

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-initial-selection"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup with initial selection demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';
import vegetableItems from '../../lookup/examples/data.json';

export default defineComponent( {
	name: 'MultiselectLookupWithInitialSelection',
	components: { CdxMultiselectLookup },
	setup() {
		const chips = ref( [
			{ label: 'carrot', value: 'Q81' },
			{ label: 'eggplant', value: 'Q7540' }
		] );
		const selection = ref( [ 'Q81', 'Q7540' ] );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				menuItems.value = [];
			}
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-initial-selection"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup with initial selection demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxMultiselectLookup } = require( '@wikimedia/codex' );
const vegetableItems = require( '../../lookup/examples/data.json' );

module.exports = defineComponent( {
	name: 'MultiselectLookupWithInitialSelection',
	components: { CdxMultiselectLookup },
	setup() {
		const chips = ref( [
			{ label: 'carrot', value: 'Q81' },
			{ label: 'eggplant', value: 'Q7540' }
		] );
		const selection = ref( [ 'Q81', 'Q7540' ] );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				menuItems.value = [];
			}
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
```

*   No results found.

### Developer notes

To set an initial selection, do the following:

1.  Set the `selected` prop to an array of selected values.
2.  Set the `inputChips` prop to a set of chips matching the selected values.

### Form field [​](#form-field)

A MultiselectLookup can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Refer to the [Field](./field.html) page for more information.

*   Automatically display an inline warning message if the entered text doesn't match any item from the MultiselectLookup's menu, and show an error after form submission.
*   Provide an error message that provides guidance on fixing the issue.

Namespaces Filter results by namespace

Category

Submit

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<form class="cdx-docs-multiselect-lookup-form">
		<cdx-field :status="status" :messages="messages">
			<cdx-multiselect-lookup
				id="cdx-demo-namespaces"
				v-model:input-chips="chips"
				v-model:selected="selection"
				v-model:input-value="inputValue"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				placeholder="Add a namespace..."
				@input="onInput"
				@update:selected="onSelection"
				@blur="validateInstantly"
				@keydown.enter="validateInstantly"
			>
				<template #no-results>
					No matching namespaces.
				</template>
			</cdx-multiselect-lookup>
			<template #label>
				Namespaces
			</template>
			<template #description>
				Filter results by namespace
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-multiselect-lookup-form__submit"
			action="progressive"
			weight="primary"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
import { defineComponent, onMounted, ref, nextTick } from 'vue';
import { CdxField, CdxMultiselectLookup, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiselectLookupField',
	components: {
		CdxField, CdxMultiselectLookup, CdxButton
	},
	setup() {
		const chips = ref( [
			{ label: 'Category', value: '14' }
		] );
		const selection = ref( [ '14' ] );
		const inputValue = ref( '' );

		const namespaces = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			visibleItemLimit: 6
		};

		const status = ref( 'default' );

		const messages = {
			warning: 'This entry is invalid. Please select an option from the menu.',
			error: 'This entry is invalid. Please select an option from the menu.'
		};

		/**
		 * Maybe set a warning message when the user moves out of the field or hits enter.
		 */
		function validateInstantly() {
			// Await nextTick in case the user has selected a menu item via the Enter key - this
			// will ensure the selection ref has been updated.
			nextTick( () => {
				// Set warning status if there's input. This might happen if a user types something
				// but doesn't select an item from the menu.
				status.value = inputValue.value.length > 0 ? 'warning' : 'default';
			} );
		}

		/**
		 * Maybe set an error message on submit.
		 */
		function onSubmit() {
			// Set an error message if there's input left in the field, or if there's no selection.
			if ( inputValue.value.length > 0 || selection.value.length === 0 ) {
				status.value = 'error';
			} else {
				status.value = 'default';
				// eslint-disable-next-line no-alert
				alert( 'Validation successful!' );
			}
		}

		/**
		 * Clear warning or error after a selection is made.
		 */
		function onSelection() {
			if ( selection.value !== null ) {
				status.value = 'default';
			}
		}

		/**
		 * Handle lookup input.
		 *
		 * @param {string} value The new input value
		 */
		function onInput( value ) {
			// Reset menu items if the input was cleared.
			if ( !value ) {
				menuItems.value = namespaces.value;
				return;
			}

			// Make sure this data is still relevant first.
			if ( inputValue.value !== value ) {
				return;
			}

			// Update menuItems.
			menuItems.value = namespaces.value.filter(
				( namespace ) => namespace.label.toLowerCase().includes( value.toLowerCase() )
			);
		}

		/**
		 * Get a list of namespaces from English Wikipedia.
		 *
		 * @return {Promise}
		 */
		function getNamespaces() {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'query',
				meta: 'siteinfo',
				siprop: 'namespaces',
				format: 'json',
				language: 'en'
			} );
			return fetch( `https://en.wikipedia.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		function formatData( namespaceData ) {
			const formattedData = [];
			for ( const namespaceId of Object.keys( namespaceData ) ) {
				if ( 'canonical' in namespaceData[ namespaceId ] ) {
					formattedData.push( {
						value: namespaceId,
						label: namespaceData[ namespaceId ].canonical
					} );
				}
			}
			return formattedData;
		}

		onMounted( () => {
			getNamespaces()
				.then( ( data ) => {
					// Store formatted namespaces.
					namespaces.value = formatData( data.query.namespaces );
					// Set initial menu items.
					menuItems.value = namespaces.value;
				} );
		} );

		return {
			chips,
			selection,
			inputValue,
			menuItems,
			menuConfig,
			status,
			messages,
			validateInstantly,
			onSubmit,
			onSelection,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-multiselect-lookup-form {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
```

vue

```
<template>
	<form class="cdx-docs-multiselect-lookup-form">
		<cdx-field :status="status" :messages="messages">
			<cdx-multiselect-lookup
				id="cdx-demo-namespaces"
				v-model:input-chips="chips"
				v-model:selected="selection"
				v-model:input-value="inputValue"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				placeholder="Add a namespace..."
				@input="onInput"
				@update:selected="onSelection"
				@blur="validateInstantly"
				@keydown.enter="validateInstantly"
			>
				<template #no-results>
					No matching namespaces.
				</template>
			</cdx-multiselect-lookup>
			<template #label>
				Namespaces
			</template>
			<template #description>
				Filter results by namespace
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-multiselect-lookup-form__submit"
			action="progressive"
			weight="primary"
			type="submit"
			@click.prevent="onSubmit"
		>
			Submit
		</cdx-button>
	</form>
</template>

<script>
const { defineComponent, onMounted, ref, nextTick } = require( 'vue' );
const { CdxField, CdxMultiselectLookup, CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'MultiselectLookupField',
	components: {
		CdxField, CdxMultiselectLookup, CdxButton
	},
	setup() {
		const chips = ref( [
			{ label: 'Category', value: '14' }
		] );
		const selection = ref( [ '14' ] );
		const inputValue = ref( '' );

		const namespaces = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			visibleItemLimit: 6
		};

		const status = ref( 'default' );

		const messages = {
			warning: 'This entry is invalid. Please select an option from the menu.',
			error: 'This entry is invalid. Please select an option from the menu.'
		};

		/**
		 * Maybe set a warning message when the user moves out of the field or hits enter.
		 */
		function validateInstantly() {
			// Await nextTick in case the user has selected a menu item via the Enter key - this
			// will ensure the selection ref has been updated.
			nextTick( () => {
				// Set warning status if there's input. This might happen if a user types something
				// but doesn't select an item from the menu.
				status.value = inputValue.value.length > 0 ? 'warning' : 'default';
			} );
		}

		/**
		 * Maybe set an error message on submit.
		 */
		function onSubmit() {
			// Set an error message if there's input left in the field, or if there's no selection.
			if ( inputValue.value.length > 0 || selection.value.length === 0 ) {
				status.value = 'error';
			} else {
				status.value = 'default';
				// eslint-disable-next-line no-alert
				alert( 'Validation successful!' );
			}
		}

		/**
		 * Clear warning or error after a selection is made.
		 */
		function onSelection() {
			if ( selection.value !== null ) {
				status.value = 'default';
			}
		}

		/**
		 * Handle lookup input.
		 *
		 * @param {string} value The new input value
		 */
		function onInput( value ) {
			// Reset menu items if the input was cleared.
			if ( !value ) {
				menuItems.value = namespaces.value;
				return;
			}

			// Make sure this data is still relevant first.
			if ( inputValue.value !== value ) {
				return;
			}

			// Update menuItems.
			menuItems.value = namespaces.value.filter(
				( namespace ) => namespace.label.toLowerCase().includes( value.toLowerCase() )
			);
		}

		/**
		 * Get a list of namespaces from English Wikipedia.
		 *
		 * @return {Promise}
		 */
		function getNamespaces() {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'query',
				meta: 'siteinfo',
				siprop: 'namespaces',
				format: 'json',
				language: 'en'
			} );
			return fetch( `https://en.wikipedia.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		function formatData( namespaceData ) {
			const formattedData = [];
			for ( const namespaceId of Object.keys( namespaceData ) ) {
				if ( 'canonical' in namespaceData[ namespaceId ] ) {
					formattedData.push( {
						value: namespaceId,
						label: namespaceData[ namespaceId ].canonical
					} );
				}
			}
			return formattedData;
		}

		onMounted( () => {
			getNamespaces()
				.then( ( data ) => {
					// Store formatted namespaces.
					namespaces.value = formatData( data.query.namespaces );
					// Set initial menu items.
					menuItems.value = namespaces.value;
				} );
		} );

		return {
			chips,
			selection,
			inputValue,
			menuItems,
			menuConfig,
			status,
			messages,
			validateInstantly,
			onSubmit,
			onSelection,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-multiselect-lookup-form {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
```

*   Talk
*   User
*   User talk
*   Project
*   Project talk
*   File
*   File talk
*   MediaWiki
*   MediaWiki talk
*   Template
*   Template talk
*   Help
*   Help talk
*   Category
*   Category talk
*   Portal
*   Portal talk
*   Draft
*   Draft talk
*   MOS
*   MOS talk
*   TimedText
*   TimedText talk
*   Module
*   Module talk
*   Event
*   Event talk
*   Media
*   Special

### Other features [​](#other-features)

The MultiselectLookup component has an internal Menu and ChipInput. You can use the following features from those components in the MultiselectLookup component:

*   [Custom menu item display](./menu.html#menu-item-display)
*   [Limited height with scrolling](./menu.html#with-scrolling-enabled)
*   [Menu groups](./menu.html#menu-groups)
*   [MenuItem features](./menu-item.html)

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `inputChips`(required) | Current chips present in the input.  <br>  <br>Must be bound with `v-model:input-chips`. Initialize to an empty array if there are no initial selections. If there are, initialize to an array of input chips matching those selections. | `[ChipInputItem](../types-and-constants.html#chipinputitem)[]` |     |
| `selected`(required) | Value(s) of the current selection(s).  <br>  <br>Must be bound with `v-model:selected`. Initialize to an empty array if there are no initial selections. | `[MenuItemValue](../types-and-constants.html#menuitemvalue)[]` |     |
| `menuItems`(required) | Menu items and/or menu group definitions. Initialize to an empty array if there are no initial menu items.  <br>  <br>Menu groups and individual menu items will be output in the order they appear here. | `([MenuItemData](../types-and-constants.html#menuitemdata)\|[MenuGroupData](../types-and-constants.html#menugroupdata))[]` |     |
| `inputValue` | Current value of the text input. This prop is optional and should only be used if you need to keep track of the text input value for some reason (e.g. for validation).  <br>  <br>Optionally provided by `v-model:input-value` binding in the parent component. | `string\|number` | `null` |
| `separateInput` | Whether the text input should appear below the set of input chips.  <br>  <br>By default, the input chips are inline with the input. | `boolean` | `false` |
| `disabled` | Whether the entire component is disabled. | `boolean` | `false` |
| `readonly` | Whether the MultiselectLookup is readonly. | `boolean` | `false` |
| `status` | `status` attribute of the input. | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |
| `menuConfig` | Configuration for various menu features. All properties default to false.  <br>  <br>See the MenuConfig type. | `[MenuConfig](../types-and-constants.html#menuconfig)` | `{}` |
| `keepInputOnSelection` | Whether to keep the search term in the input after selection. | `boolean` | `false` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `chip-click` | **chip** `[ChipInputItem](../types-and-constants.html#chipinputitem)` - The clicked chip | When a chip is clicked. |
| `load-more` |     | When the user scrolls towards the bottom of the menu.  <br>  <br>If it is possible to add or load more menu items, then now would be a good moment so that the user can experience infinite scrolling. |
| `update:input-chips` | **inputChips** `[ChipInputItem](../types-and-constants.html#chipinputitem)[]` - The new set of inputChips | When the input chips change. |
| `update:selected` | **selected** `[MenuItemValue](../types-and-constants.html#menuitemvalue)[]` - The new set of selected values | When the selected value changes. |
| `update:input-value` | **inputValue** `string\|number` - The new input value | When the input value changes. Only emitted if the inputValue prop is provided.  <br>  <br>This event is emitted both when the user changes the input and when the input is changed or cleared automatically (e.g. on selection). |
| `input` | **value** `string\|number` - The new value | When the user changes the value of the input. Not emitted when the input is changed automatically (e.g. on selection). |
| `change` | **event** `Event` | When an input value change is committed by the user (e.g. on blur) |
| `focus` | **event** `FocusEvent` | When the input comes into focus |
| `blur` | **event** `FocusEvent` | When the input loses focus |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| menu-item | Display of an individual item in the menu | **menu-item** `MenuItemData` - The current menu item |
| no-results | Message to show if there are no results to display. |     |

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Tab | It moves the focus between the chips within the input. When the focus is placed on the last chip, it places the focus to the input. When an item from the menu is hovered, pressing Tab selects or deselects it. |
| Shift + Tab | It moves the focus to the previous chip within the input or to the previous interactive element in the page. |
| Left arrow + Right arrow | Arrow keys navigate between the chips within the input when they are focused. |
| Up arrow + Down arrow | When the focus is placed on the input, it opens the menu. When the menu is open, pressing it navigates through menu options. |
| Enter | When a chip is focused, it removes the chip. When an item from the menu is hovered, pressing Enter selects it. |
| Esc | When any of the chips or input is focused, pressing Esc removes the focus from the focused element. When the menu is open, it closes the menu. |
| Backspace | If the focus is placed on a chip, this key removes the chip and moves the focus to the previous chip. When the last chip is removed, it places the focus to the input. |

Pager

[Previous pageLookup](/codex/latest/components/demos/lookup.html)

[Next pageRadio](/codex/latest/components/demos/radio.html)