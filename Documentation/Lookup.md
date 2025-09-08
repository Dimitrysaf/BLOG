# Lookup [​](#lookup)

A Lookup is a predictive text input that presents a dropdown menu with suggestions based on the current input value.

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| status | default<br><br>error |
| disabled |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

*   No results found.

## Overview [​](#overview)

### When to use Lookup [​](#when-to-use-lookup)

Use the Lookup component to let users search through a set of options to choose a predefined value for a form field. This can be useful when there are many options the user can choose from, so they need to filter the items via a text query.

Do not use Lookup to enable users to search for and navigate to content. Instead, use [SearchInput](./search-input.html) or [TypeaheadSearch](./typeahead-search.html).

### About Lookup [​](#about-lookup)

Lookup includes the following elements.

#### Input [​](#input)

A TextInput where the user types to look for options. This can optionally include a start icon, clear button, and placeholder text.

#### Dropdown menu [​](#dropdown-menu)

Suggested results are displayed via the Menu component.

*   Include an initial list of 2–5 suggestions if it's helpful to users.
*   Include a "no results" message if there are no results found for the current input value.

## Examples [​](#examples)

### Basic usage [​](#basic-usage)

The Lookup component emits an event when the user types in the input. The parent component can then fetch items matching that input and pass them to the Lookup to display in the Menu.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-lookup
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup basic demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupBasic',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true
		};

		/**
		 * Filter items on input.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			}
		}

		return {
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
	<cdx-lookup
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup basic demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxLookup } = require( '@wikimedia/codex' );
const vegetableItems = require( './data.json' );

module.exports = defineComponent( {
	name: 'LookupBasic',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true
		};

		/**
		 * Filter items on input.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			}
		}

		return {
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

The Lookup component emits an event on input. The parent component should react by computing or fetching menu items, then providing those items to the Lookup component for display by updating the `menu-items` prop. The user can then select an item from the menu.

There are 2 ways to listen for input changes:

1.  Listen for `input` events, like in the example below. Do this if you only need to know about the input when it changes.
2.  Use `v-model` to bind the `inputValue` prop and listen for either `input` or `update:input-value` events. Do this if you need to know the current input value at other times, or if you want to be able to set the input value. Refer to the [Vue usage](#vue-usage) tables for more information.

Items are displayed via the MenuItem component—see the [MenuItem docs](./menu-item.html) for more options. In this example, a `menuConfig` object is passed to the Lookup to bold the label text. Note that in this example, menu items are Wikidata items with a human-readable label and a Wikidata entity ID value.

WARNING

The parent component must update the `menu-items` prop after each `input` event, otherwise the Lookup component will stay in the pending state indefinitely. If there are no results for the given input, set the `menu-items` prop to an empty array (`[]`).

### With fetched results [​](#with-fetched-results)

Often, Lookup is used to fetch results from an API endpoint, and may display many results. You can control how many items to show in the menu at once, and other items can be reached by scrolling. You can also load more items when the user scrolls to the end of the menu.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			v-model:input-value="inputValue"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup with fetched results demo"
			@update:input-value="onUpdateInputValue"
			@load-more="onLoadMore"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LookupWithFetch',
	components: { CdxLookup },
	setup() {
		// Selected item, defaulting to null.
		const selection = ref( null );
		// Current input value. This is helpful to track so we can fetch results for the current
		// search term, and is bound to the Lookup via v-model.
		// Note that, on selection, the input updates to match the selected item.
		const inputValue = ref( '' );
		// Menu items to show. On input, results will be fetched and provided as menu items. When
		// the input is cleared, the menu items will be reset to an empty array.
		// On selection, since the input updates to match the selected item, the
		// `onUpdateInputValue` method runs and fetches new results based on the selected item.
		const menuItems = ref( [] );
		// Limit the height of the menu and enable scrolling.
		const menuConfig = {
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
		 * @param {string} value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if there is no input.
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
	<div>
		<cdx-lookup
			v-model:selected="selection"
			v-model:input-value="inputValue"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup with fetched results demo"
			@update:input-value="onUpdateInputValue"
			@load-more="onLoadMore"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxLookup } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'LookupWithFetch',
	components: { CdxLookup },
	setup() {
		// Selected item, defaulting to null.
		const selection = ref( null );
		// Current input value. This is helpful to track so we can fetch results for the current
		// search term, and is bound to the Lookup via v-model.
		// Note that, on selection, the input updates to match the selected item.
		const inputValue = ref( '' );
		// Menu items to show. On input, results will be fetched and provided as menu items. When
		// the input is cleared, the menu items will be reset to an empty array.
		// On selection, since the input updates to match the selected item, the
		// `onUpdateInputValue` method runs and fetches new results based on the selected item.
		const menuItems = ref( [] );
		// Limit the height of the menu and enable scrolling.
		const menuConfig = {
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
		 * @param {string} value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if there is no input.
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

Parent components should react to the `input` or `update:input-value` event emitted by Lookup to search for results, then pass back to the Lookup either an array of results to display as menu items or an empty array if there are no results. Between those two events, a pending animation will display in the input.

With scrolling enabled via the `visibleItemLimit` property of the `menuConfig` prop, when the user nears the end of the list of results, a `load-more` event is emitted. The parent component can react to this by fetching more results and appending them to the list of menu items provided to the Lookup. These new items will then be displayed within the menu.

### With suggestions [​](#with-suggestions)

You can show a list of 2–5 initial suggestions if it's helpful.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-lookup
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup with suggested items demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupWithSuggestions',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		// Set up a group of initial menu items to show as suggestions.
		const initialMenuItems = [
			{
				label: 'Suggested items',
				items: vegetableItems.slice( 0, 3 )
			}
		];
		const menuItems = ref( initialMenuItems );

		const menuConfig = {
			boldLabel: true
		};

		/**
		 * Filter items on input.
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
	<cdx-lookup
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup with suggested items demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxLookup } = require( '@wikimedia/codex' );
const vegetableItems = require( './data.json' );

module.exports = defineComponent( {
	name: 'LookupWithSuggestions',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		// Set up a group of initial menu items to show as suggestions.
		const initialMenuItems = [
			{
				label: 'Suggested items',
				items: vegetableItems.slice( 0, 3 )
			}
		];
		const menuItems = ref( initialMenuItems );

		const menuConfig = {
			boldLabel: true
		};

		/**
		 * Filter items on input.
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

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<cdx-lookup
		v-model:selected="selection"
		v-model:input-value="inputValue"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup demo with initial selection"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupWithInitialSelection',
	components: { CdxLookup },
	setup() {
		const selection = ref( 'Q81' );
		const inputValue = ref( 'carrot' );
		const menuItems = computed( () => vegetableItems.filter(
			( item ) => item.label.includes( inputValue.value )
		) );

		const menuConfig = {
			boldLabel: true
		};

		return {
			selection,
			inputValue,
			menuItems,
			menuConfig
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-lookup
		v-model:selected="selection"
		v-model:input-value="inputValue"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup demo with initial selection"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
const { defineComponent, ref, computed } = require( 'vue' );
const { CdxLookup } = require( '@wikimedia/codex' );
const vegetableItems = require( './data.json' );

module.exports = defineComponent( {
	name: 'LookupWithInitialSelection',
	components: { CdxLookup },
	setup() {
		const selection = ref( 'Q81' );
		const inputValue = ref( 'carrot' );
		const menuItems = computed( () => vegetableItems.filter(
			( item ) => item.label.includes( inputValue.value )
		) );

		const menuConfig = {
			boldLabel: true
		};

		return {
			selection,
			inputValue,
			menuItems,
			menuConfig
		};
	}
} );
</script>
```

*   carrotroot vegetable, usually orange in color

### Developer notes

To set an initial selection and input value, do the following:

1.  Set the `selected` prop to the value of the selected item.
2.  Use the optional `v-model:input-value` prop to set the input value to the label of the selected item (or the value, if there is no label).

You can also use `v-model:input-value` to set an initial input value without an initial selection.

### Form field [​](#form-field)

A Lookup can be wrapped in the Field component to add features like a semantic label, description and help text, validation messages, and more. Refer to the [Field](./field.html) page for more information.

*   Automatically display an inline warning message if the entered text doesn't match any item from the Lookup's menu, and show an error after form submission.
*   Provide an error message that provides guidance on fixing the issue.

Item lookup

Start typing the name of a Wikidata item to see suggestions

Submit

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<form class="cdx-docs-lookup-form">
		<cdx-field :status="status" :messages="messages">
			<cdx-lookup
				v-model:selected="selection"
				v-model:input-value="inputValue"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				placeholder="Search Wikidata items"
				@update:input-value="onUpdateInputValue"
				@load-more="onLoadMore"
				@update:selected="onSelection"
				@blur="validateInstantly"
				@keydown.enter="validateInstantly"
			>
				<template #no-results>
					No results found.
				</template>
			</cdx-lookup>
			<template #label>
				Item lookup
			</template>
			<template #help-text>
				Start typing the name of a Wikidata item to see suggestions
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-lookup-form__submit"
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
import { defineComponent, ref, nextTick } from 'vue';
import { CdxLookup, CdxField, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LookupField',
	components: { CdxLookup, CdxField, CdxButton },
	setup() {
		const selection = ref( null );
		const inputValue = ref( '' );
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
				// Set 'warning' status if there's input but no selection. This might happen if a
				// user types something but doesn't select an item from the menu.
				status.value = inputValue.value.length > 0 && selection.value === null ?
					'warning' :
					'default';
			} );
		}

		/**
		 * Show error message on submit if nothing is selected.
		 */
		function onSubmit() {
			if ( selection.value === null ) {
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
		 * @param {string} value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if there is no input.
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
			selection,
			inputValue,
			menuItems,
			menuConfig,
			status,
			messages,
			validateInstantly,
			onSubmit,
			onSelection,
			onUpdateInputValue,
			onLoadMore
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-lookup-form {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
```

vue

```
<template>
	<form class="cdx-docs-lookup-form">
		<cdx-field :status="status" :messages="messages">
			<cdx-lookup
				v-model:selected="selection"
				v-model:input-value="inputValue"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				placeholder="Search Wikidata items"
				@update:input-value="onUpdateInputValue"
				@load-more="onLoadMore"
				@update:selected="onSelection"
				@blur="validateInstantly"
				@keydown.enter="validateInstantly"
			>
				<template #no-results>
					No results found.
				</template>
			</cdx-lookup>
			<template #label>
				Item lookup
			</template>
			<template #help-text>
				Start typing the name of a Wikidata item to see suggestions
			</template>
		</cdx-field>
		<cdx-button
			class="cdx-docs-lookup-form__submit"
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
const { defineComponent, ref, nextTick } = require( 'vue' );
const { CdxLookup, CdxField, CdxButton } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'LookupField',
	components: { CdxLookup, CdxField, CdxButton },
	setup() {
		const selection = ref( null );
		const inputValue = ref( '' );
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
				// Set 'warning' status if there's input but no selection. This might happen if a
				// user types something but doesn't select an item from the menu.
				status.value = inputValue.value.length > 0 && selection.value === null ?
					'warning' :
					'default';
			} );
		}

		/**
		 * Show error message on submit if nothing is selected.
		 */
		function onSubmit() {
			if ( selection.value === null ) {
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
		 * @param {string} value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if there is no input.
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
			selection,
			inputValue,
			menuItems,
			menuConfig,
			status,
			messages,
			validateInstantly,
			onSubmit,
			onSelection,
			onUpdateInputValue,
			onLoadMore
		};
	}
} );
</script>

<style lang="less">
@import 'mediawiki.skin.variables.less';

.cdx-docs-lookup-form {
	&__submit {
		margin-top: @spacing-100;
	}
}
</style>
```

*   No results found.

### Other features [​](#other-features)

The Lookup component has an internal TextInput and Menu. You can use the following features from those components in the Lookup component:

*   [Start and end icons](./text-input.html#with-icons)
*   [Clearable](./text-input.html#clearable)
*   [Custom menu item display](./menu.html#menu-item-display)
*   [Limited height with scrolling](./menu.html#with-scrolling-enabled)
*   [Menu groups](./menu.html#menu-groups) (demonstrated above)
*   [MenuItem features](./menu-item.html)

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

TextInput props apply

This component contains a TextInput component. You can bind [TextInput props](./text-input.html#props) to this component and they will be passed to the TextInput within.

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `selected`(required) | Value of the current selection.  <br>  <br>Must be bound with `v-model:selected`.  <br>  <br>The property should be initialized to `null` rather than using a falsy value. | `string\|number\|null` |     |
| `menuItems`(required) | Menu items and/or menu group definitions.  <br>  <br>Menu groups and individual menu items will be output in the order they appear here. | `([MenuItemData](../types-and-constants.html#menuitemdata)\|[MenuGroupData](../types-and-constants.html#menugroupdata))[]` |     |
| `inputValue` | Current value of the input. This prop is optional and should only be used if you need to keep track of the input value for some reason (e.g. to set an initial value).  <br>  <br>Optionally provided by `v-model:input-value` binding in the parent component. | `string\|number` | `null` |
| `disabled` | Whether the entire component is disabled. | `boolean` | `false` |
| `menuConfig` | Configuration for various menu features. All properties default to false.  <br>  <br>See the MenuConfig type. | `[MenuConfig](../types-and-constants.html#menuconfig)` | `{}` |
| `status` | `status` property of the TextInput component | `[ValidationStatusType](../types-and-constants.html#validationstatustype)` | `'default'` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `change` | **event** `Event` | When an input value change is committed by the user (e.g. on blur) |
| `load-more` |     | When the user scrolls towards the bottom of the menu.  <br>  <br>If it is possible to add or load more menu items, then now would be a good moment so that the user can experience infinite scrolling. |
| `update:selected` | **selected** `string\|number\|null` - The new selected value | When the selected value changes. |
| `update:input-value` | **inputValue** `string\|number` - The new input value | When the input value changes. Only emitted if the inputValue prop is provided. |
| `input` | **value** `string\|number` - The new value | When the text input value changes. |
| `focus` | **event** `FocusEvent` | When the input comes into focus |
| `blur` | **event** `FocusEvent` | When the input loses focus |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| menu-item | Display of an individual item in the menu | **menu-item** `MenuItemData` - The current menu item |
| no-results | Message to show if there are no results to display. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

There is no true CSS-only version of the Lookup component. However, a [CSS-only TextInput component](./text-input.html#css-only-version) can be used instead, since it has visual parity with the Lookup component with its menu collapsed. For example, you could display a CSS-only TextInput on page load while a Vue app loads, then replace it with the Vue Lookup component once the Vue app has mounted.

The example below is a simple text input with a placeholder, but icons and different states are supported—refer to the [TextInput docs](./text-input.html#css-only-version) for more information.

Show codeCopy code

html

```
<!-- Wrapper div. -->
<div class="cdx-text-input">
  <!-- Input element with CSS class and attributes. -->
  <input
    class="cdx-text-input__input"
    type="text"
    placeholder="Start typing a vegetable name..."
  />
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Down arrow | When the focus is placed on the Lookup, it opens the menu. When the menu is open, pressing it navigates through menu options. If pressed at the last visible option, it scrolls to the next "hidden" menu item. |
| Up arrow | When the focus is placed on the Lookup, it opens the menu. When the menu is open, it navigates through menu options. |
| Esc | When the menu is open, it closes the menu. |
| Enter | It opens the menu when the focus is placed on the Lookup. If the menu is open, it closes the menu. If the focus is placed in any of the options within the menu, the focused option is selected. |

Pager

[Previous pageLabel](/codex/latest/components/demos/label.html)

[Next pageMultiselectLookup](/codex/latest/components/demos/multiselect-lookup.html)