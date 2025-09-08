# TypeaheadSearch [​](#typeaheadsearch)

TypeaheadSearch is a search input that provides a menu of options based on the current search query. It is meant to help users search for and navigate to content.

Reset demo

| Name | Value |
| --- | --- |
| Props |     |
| useButton |     |
| buttonLabel |     |
| highlightQuery |     |
| showThumbnail |     |
| autoExpandWidth |     |
| View |     |
| Reading direction | Left to right (LTR)<br><br>Right to left (RTL) |

## Overview [​](#overview)

### When to use TypeaheadSearch [​](#when-to-use-typeaheadsearch)

Use the TypeaheadSearch component to enable users to navigate to a new page and when you need a predictive list of options in a menu that updates as users type within the input field. To enable users to perform text-based searches to find specific content, such as locating results on a page, use [SearchInput](./search-input.html) instead.

TypeaheadSearch is not a form input. Avoid using TypeaheadSearch to enable users to search a dataset of options for a form field. Instead, use [Lookup](./lookup.html).

### About TypeaheadSearch [​](#about-typeaheadsearch)

TypeaheadSearch includes the following elements.

#### Input [​](#input)

A SearchInput where users can type their search queries. The input features the 'search' icon for clarity and can also include a placeholder to clarify its purpose.

#### Placeholder text (optional) [​](#placeholder-text-optional)

Placeholder text provides an example of what the user might type in the input.

*   Placeholder text should further explain what is being searched or sample search queries.
*   Placeholder text should never replace the label nor be the input's only description.
*   Placeholder text should not duplicate the button label.

#### Button (optional) [​](#button-optional)

The input can be accompanied by a button, in order to trigger the search action.

*   Use the term "Search" or its appropriate translation.
*   Don't use long button text or duplicate the placeholder text.

#### Menu [​](#menu)

When the user types within the input, a [Menu](./menu.html) component with results is displayed. By default, menu items will feature a label and an optional description. Thumbnails can also be included to show a preview of each result.

*   Limit visible menu items to a maximum of 10.
*   Enable scrolling if users need access to more than 10 results.

##### Menu footer [​](#menu-footer)

The final menu item at the end of the search results menu allows users to navigate to the search page.

## Examples [​](#examples)

### Search Wikipedia articles [​](#search-wikipedia-articles)

This implementation of TypeaheadSearch fetches articles from English Wikipedia. Like the search bar on English Wikipedia, thumbnails are included in search results, the input expands on focus to accommodate the width of the thumbnails, and the "Search" button is added. Results are limited to 10 items.

Search

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-wikipedia"
			form-action="https://en.wikipedia.org/w/index.php"
			:use-button="true"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:show-thumbnail="true"
			:highlight-query="true"
			:auto-expand-width="true"
			placeholder="Search Wikipedia"
			@input="onInput"
			@search-result-click="onSearchResultClick"
			@submit="onSubmit"
		>
			<template #default>
				<input
					type="hidden"
					name="language"
					value="en"
				>
				<input
					type="hidden"
					name="title"
					value="Special:Search"
				>
			</template>
			<template #search-footer-text="{ searchQuery }">
				Search Wikipedia for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TypeaheadSearchWikipedia',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onInput( value ) {
			// eslint-disable-next-line no-console
			console.log( 'input event emitted with value:', value );

			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			/**
			 * Format search results for consumption by TypeaheadSearch.
			 *
			 * @param pages
			 * @return
			 */
			function adaptApiResponse( pages ) {
				return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
					label: title,
					value: id,
					description: description,
					url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
					thumbnail: thumbnail ? {
						url: thumbnail.url,
						width: thumbnail.width,
						height: thumbnail.height
					} : undefined
				} ) );
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// If there are results, format them into an array of
						// SearchResults to be passed into TypeaheadSearch for
						// display as a menu of suggestions.
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						// Set the search footer URL to a link to the search
						// page for the current search query.
						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		function onSearchResultClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'search-result-click event emitted with value:', value );
		}

		function onSubmit( value ) {
			// eslint-disable-next-line no-console
			console.log( 'submit event emitted with value:', value );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput,
			onSearchResultClick,
			onSubmit
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-wikipedia"
			form-action="https://en.wikipedia.org/w/index.php"
			:use-button="true"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:show-thumbnail="true"
			:highlight-query="true"
			:auto-expand-width="true"
			placeholder="Search Wikipedia"
			@input="onInput"
			@search-result-click="onSearchResultClick"
			@submit="onSubmit"
		>
			<template #default>
				<input
					type="hidden"
					name="language"
					value="en"
				>
				<input
					type="hidden"
					name="title"
					value="Special:Search"
				>
			</template>
			<template #search-footer-text="{ searchQuery }">
				Search Wikipedia for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTypeaheadSearch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TypeaheadSearchWikipedia',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onInput( value ) {
			// eslint-disable-next-line no-console
			console.log( 'input event emitted with value:', value );

			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			/**
			 * Format search results for consumption by TypeaheadSearch.
			 *
			 * @param pages
			 * @return
			 */
			function adaptApiResponse( pages ) {
				return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
					label: title,
					value: id,
					description: description,
					url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
					thumbnail: thumbnail ? {
						url: thumbnail.url,
						width: thumbnail.width,
						height: thumbnail.height
					} : undefined
				} ) );
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// If there are results, format them into an array of
						// SearchResults to be passed into TypeaheadSearch for
						// display as a menu of suggestions.
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						// Set the search footer URL to a link to the search
						// page for the current search query.
						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		function onSearchResultClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'search-result-click event emitted with value:', value );
		}

		function onSubmit( value ) {
			// eslint-disable-next-line no-console
			console.log( 'submit event emitted with value:', value );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput,
			onSearchResultClick,
			onSubmit
		};
	}
} );
</script>
```

### Developer notes

The `showThumbnails` prop is set to true, along with the `autoExpandWidth` prop to expand the input on focus. The `useButton` prop enables the search button.

Open up the console to review emitted events.

### Search Wikidata items [​](#search-wikidata-items)

In this example, results are fetched from Wikidata. To support Wikidata items as results, Thumbnails are not shown and the input does not expand on focus. This example also includes a `visibleItemLimit` of 5 items—further items can be access by scrolling.

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-wikidata"
			form-action="https://www.wikidata.org/w/index.php"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:highlight-query="true"
			:visible-item-limit="5"
			placeholder="Search Wikidata"
			@input="onInput"
			@search-result-click="onSearchResultClick"
			@submit="onSubmit"
			@load-more="onLoadMore"
		>
			<template #default>
				<input
					type="hidden"
					name="language"
					value="en"
				>
				<input
					type="hidden"
					name="title"
					value="Special:Search"
				>
			</template>
			<template #search-footer-text="{ searchQuery }">
				Search Wikidata for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TypeaheadSearchWikidata',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function fetchResults( searchTerm, offset ) {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				uselang: 'en',
				type: 'item',
				search: searchTerm
			} );
			if ( offset ) {
				params.set( 'continue', `${ offset }` );
			}
			return fetch( `https://www.wikidata.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages ) {
			return pages.map( ( { id, label, url, match, description, display = {} } ) => ( {
				value: id,
				label,
				match: match.type === 'alias' ? `(${ match.text })` : '',
				description,
				url,
				language: {
					label: display && display.label && display.label.language,
					match: match.type === 'alias' ? match.language : undefined,
					description: display && display.description && display.description.language
				}
			} ) );
		}

		function onInput( value ) {
			// eslint-disable-next-line no-console
			console.log( 'input event emitted with value:', value );

			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			fetchResults( value ).then( ( data ) => {
				// Make sure this data is still relevant first.
				if ( currentSearchTerm.value === value ) {
					// If there are results, format them into an array of
					// SearchResults to be passed into TypeaheadSearch for
					// display as a menu of search results.
					searchResults.value = data.search && data.search.length > 0 ?
						adaptApiResponse( data.search ) :
						[];

					// Set the search footer URL to a link to the search
					// page for the current search query.
					searchFooterUrl.value = `https://www.wikidata.org/w/index.php?search=${ encodeURIComponent( value ) }&title=Special%3ASearch&fulltext=1`;
				}
			} ).catch( () => {
				// On error, reset search results and search footer URL.
				searchResults.value = [];
				searchFooterUrl.value = '';
			} );
		}

		function deduplicateResults( results ) {
			const seen = new Set( searchResults.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		function onLoadMore() {
			// eslint-disable-next-line no-console
			console.log( 'load-more event emitted' );

			if ( !currentSearchTerm.value ) {
				return;
			}

			fetchResults( currentSearchTerm.value, searchResults.value.length ).then( ( data ) => {
				const results = data.search && data.search.length > 0 ?
					adaptApiResponse( data.search ) :
					[];

				const deduplicatedResults = deduplicateResults( results );
				searchResults.value.push( ...deduplicatedResults );
			} );
		}

		function onSearchResultClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'search-result-click event emitted with value:', value );
		}

		function onSubmit( value ) {
			// eslint-disable-next-line no-console
			console.log( 'submit event emitted with value:', value );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput,
			onLoadMore,
			onSearchResultClick,
			onSubmit
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-wikidata"
			form-action="https://www.wikidata.org/w/index.php"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:highlight-query="true"
			:visible-item-limit="5"
			placeholder="Search Wikidata"
			@input="onInput"
			@search-result-click="onSearchResultClick"
			@submit="onSubmit"
			@load-more="onLoadMore"
		>
			<template #default>
				<input
					type="hidden"
					name="language"
					value="en"
				>
				<input
					type="hidden"
					name="title"
					value="Special:Search"
				>
			</template>
			<template #search-footer-text="{ searchQuery }">
				Search Wikidata for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTypeaheadSearch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TypeaheadSearchWikidata',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function fetchResults( searchTerm, offset ) {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				uselang: 'en',
				type: 'item',
				search: searchTerm
			} );
			if ( offset ) {
				params.set( 'continue', `${ offset }` );
			}
			return fetch( `https://www.wikidata.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages ) {
			return pages.map( ( { id, label, url, match, description, display = {} } ) => ( {
				value: id,
				label,
				match: match.type === 'alias' ? `(${ match.text })` : '',
				description,
				url,
				language: {
					label: display && display.label && display.label.language,
					match: match.type === 'alias' ? match.language : undefined,
					description: display && display.description && display.description.language
				}
			} ) );
		}

		function onInput( value ) {
			// eslint-disable-next-line no-console
			console.log( 'input event emitted with value:', value );

			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			fetchResults( value ).then( ( data ) => {
				// Make sure this data is still relevant first.
				if ( currentSearchTerm.value === value ) {
					// If there are results, format them into an array of
					// SearchResults to be passed into TypeaheadSearch for
					// display as a menu of search results.
					searchResults.value = data.search && data.search.length > 0 ?
						adaptApiResponse( data.search ) :
						[];

					// Set the search footer URL to a link to the search
					// page for the current search query.
					searchFooterUrl.value = `https://www.wikidata.org/w/index.php?search=${ encodeURIComponent( value ) }&title=Special%3ASearch&fulltext=1`;
				}
			} ).catch( () => {
				// On error, reset search results and search footer URL.
				searchResults.value = [];
				searchFooterUrl.value = '';
			} );
		}

		function deduplicateResults( results ) {
			const seen = new Set( searchResults.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		function onLoadMore() {
			// eslint-disable-next-line no-console
			console.log( 'load-more event emitted' );

			if ( !currentSearchTerm.value ) {
				return;
			}

			fetchResults( currentSearchTerm.value, searchResults.value.length ).then( ( data ) => {
				const results = data.search && data.search.length > 0 ?
					adaptApiResponse( data.search ) :
					[];

				const deduplicatedResults = deduplicateResults( results );
				searchResults.value.push( ...deduplicatedResults );
			} );
		}

		function onSearchResultClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'search-result-click event emitted with value:', value );
		}

		function onSubmit( value ) {
			// eslint-disable-next-line no-console
			console.log( 'submit event emitted with value:', value );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput,
			onLoadMore,
			onSearchResultClick,
			onSubmit
		};
	}
} );
</script>
```

### Developer notes

Open up the console to review emitted events.

### With initial input value [​](#with-initial-input-value)

An `initialInputValue` can be included. This is useful when replacing a server-rendered interface where the user may have started typing a search query, or for pre-populating the search term when a user navigates back to a page where they had previously entered one.

*   [ColorPerception caused by wavelengths of light](https://en.wikipedia.org/wiki/Color)
*   [ColoradoU.S. state](https://en.wikipedia.org/wiki/Colorado)
*   [Colorectal cancerCancer of the colon or rectum](https://en.wikipedia.org/wiki/Colorectal_cancer)
*   [Color blindnessDecreased ability to see color or color differences](https://en.wikipedia.org/wiki/Color_blindness)
*   [Colorado Springs, ColoradoHome-rule city in El Paso County, Colorado, USA](https://en.wikipedia.org/wiki/Colorado_Springs%2C_Colorado)
*   [Colorado RiverMajor river in the western United States and Mexico](https://en.wikipedia.org/wiki/Colorado_River)
*   [Colorado State UniversityPublic university in Fort Collins, Colorado, U.S.](https://en.wikipedia.org/wiki/Colorado_State_University)
*   [Colour revolutionSeries of non-violent protests and political campaigns in the former Soviet Union](https://en.wikipedia.org/wiki/Colour_revolution)
*   [Colorado Buffaloes footballFootball team of University of Colorado Boulder](https://en.wikipedia.org/wiki/Colorado_Buffaloes_football)
*   [Colorado RockiesMajor League Baseball franchise in Denver, Colorado, US](https://en.wikipedia.org/wiki/Colorado_Rockies)
*   [Search Wikipedia for pages containing **Color**](https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=Color)

Search

Show codeCopy code

Reset demo

NPMMediaWiki

vue

```
<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-default"
			form-action="https://en.wikipedia.org/w/index.php"
			:use-button="true"
			:initial-input-value="initialInputValue"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:show-thumbnail="true"
			:highlight-query="true"
			placeholder="Search Wikipedia"
			@input="onInput"
		>
			<template #search-footer-text="{ searchQuery }">
				Search Wikipedia for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TypeaheadSearchInitialValue',
	components: { CdxTypeaheadSearch },
	props: {
		/**
		 * For demo purposes, the initial input value "Color" has been passed in
		 * as a prop.
		 */
		initialInputValue: {
			type: String,
			default: ''
		}
	},
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onInput( value ) {
			currentSearchTerm.value = value;

			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			/**
			 * Format search results for consumption by TypeaheadSearch.
			 *
			 * @param pages
			 * @return
			 */
			function adaptApiResponse( pages ) {
				return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
					label: title,
					value: id,
					description: description,
					url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
					thumbnail: thumbnail ? {
						url: thumbnail.url,
						width: thumbnail.width,
						height: thumbnail.height
					} : undefined
				} ) );
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					if ( currentSearchTerm.value === value ) {
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
```

vue

```
<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-default"
			form-action="https://en.wikipedia.org/w/index.php"
			:use-button="true"
			:initial-input-value="initialInputValue"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:show-thumbnail="true"
			:highlight-query="true"
			placeholder="Search Wikipedia"
			@input="onInput"
		>
			<template #search-footer-text="{ searchQuery }">
				Search Wikipedia for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTypeaheadSearch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TypeaheadSearchInitialValue',
	components: { CdxTypeaheadSearch },
	props: {
		/**
		 * For demo purposes, the initial input value "Color" has been passed in
		 * as a prop.
		 */
		initialInputValue: {
			type: String,
			default: ''
		}
	},
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onInput( value ) {
			currentSearchTerm.value = value;

			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			/**
			 * Format search results for consumption by TypeaheadSearch.
			 *
			 * @param pages
			 * @return
			 */
			function adaptApiResponse( pages ) {
				return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
					label: title,
					value: id,
					description: description,
					url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
					thumbnail: thumbnail ? {
						url: thumbnail.url,
						width: thumbnail.width,
						height: thumbnail.height
					} : undefined
				} ) );
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					if ( currentSearchTerm.value === value ) {
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
```

### Developer notes

On mount, TypeaheadSearch will fetch search results for the `initialInputValue` if it's provided. After that, the input value is tracked internally and will be emitted up to the parent component when the value changes.

### Pending state [​](#pending-state)

Pending state indicators, including an inline ProgressBar and a message stating that results are pending, can be displayed to users with slower connections while search results are being fetched.

The pending state indicators will display when a search takes longer than half a second, so you may need to throttle your connection to review them in the demo below.

Search

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-typeahead-search
		id="typeahead-search-pending-state"
		form-action="https://en.wikipedia.org/w/index.php"
		:use-button="true"
		:search-results="searchResults"
		:search-footer-url="searchFooterUrl"
		:show-thumbnail="true"
		:highlight-query="true"
		:auto-expand-width="true"
		placeholder="Search Wikipedia"
		@input="onInput"
	>
		<template #default>
			<input
				type="hidden"
				name="language"
				value="en"
			>
			<input
				type="hidden"
				name="title"
				value="Special:Search"
			>
		</template>
		<template #search-results-pending>
			Loading search results...
		</template>
		<template #search-footer-text="{ searchQuery }">
			Search Wikipedia for pages containing
			<strong class="cdx-typeahead-search__search-footer__query">
				{{ searchQuery }}
			</strong>
		</template>
	</cdx-typeahead-search>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TypeaheadSearchPendingState',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages ) {
			return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
				label: title,
				value: id,
				description: description,
				url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
				thumbnail: thumbnail ? {
					url: thumbnail.url,
					width: thumbnail.width,
					height: thumbnail.height
				} : undefined
			} ) );
		}

		function onInput( value ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// If there are results, format them into an array of
						// SearchResults to be passed into TypeaheadSearch for
						// display as a menu of suggestions.
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						// Set the search footer URL to a link to the search
						// page for the current search query.
						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-typeahead-search
		id="typeahead-search-pending-state"
		form-action="https://en.wikipedia.org/w/index.php"
		:use-button="true"
		:search-results="searchResults"
		:search-footer-url="searchFooterUrl"
		:show-thumbnail="true"
		:highlight-query="true"
		:auto-expand-width="true"
		placeholder="Search Wikipedia"
		@input="onInput"
	>
		<template #default>
			<input
				type="hidden"
				name="language"
				value="en"
			>
			<input
				type="hidden"
				name="title"
				value="Special:Search"
			>
		</template>
		<template #search-results-pending>
			Loading search results...
		</template>
		<template #search-footer-text="{ searchQuery }">
			Search Wikipedia for pages containing
			<strong class="cdx-typeahead-search__search-footer__query">
				{{ searchQuery }}
			</strong>
		</template>
	</cdx-typeahead-search>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTypeaheadSearch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TypeaheadSearchPendingState',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages ) {
			return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
				label: title,
				value: id,
				description: description,
				url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
				thumbnail: thumbnail ? {
					url: thumbnail.url,
					width: thumbnail.width,
					height: thumbnail.height
				} : undefined
			} ) );
		}

		function onInput( value ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// If there are results, format them into an array of
						// SearchResults to be passed into TypeaheadSearch for
						// display as a menu of suggestions.
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						// Set the search footer URL to a link to the search
						// page for the current search query.
						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
```

### Developer notes

To enable pending state indicators, provide content in the `search-results-pending` slot.

### No results message [​](#no-results-message)

You can show a message when no search results were found.

Search

Show codeCopy code

NPMMediaWiki

vue

```
<template>
	<cdx-typeahead-search
		id="typeahead-search-no-result"
		form-action="https://en.wikipedia.org/w/index.php"
		:use-button="true"
		:search-results="searchResults"
		:search-footer-url="searchFooterUrl"
		:show-thumbnail="true"
		:highlight-query="true"
		:auto-expand-width="true"
		placeholder="Search Wikipedia"
		@input="onInput"
	>
		<template #default>
			<input
				type="hidden"
				name="language"
				value="en"
			>
			<input
				type="hidden"
				name="title"
				value="Special:Search"
			>
		</template>
		<template #search-no-results-text>
			No results found
		</template>
		<template #search-footer-text="{ searchQuery }">
			Search Wikipedia for pages containing
			<strong class="cdx-typeahead-search__search-footer__query">
				{{ searchQuery }}
			</strong>
		</template>
	</cdx-typeahead-search>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TypeaheadSearchNoResult',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages ) {
			return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
				label: title,
				value: id,
				description: description,
				url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
				thumbnail: thumbnail ? {
					url: thumbnail.url,
					width: thumbnail.width,
					height: thumbnail.height
				} : undefined
			} ) );
		}

		function onInput( value ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// If there are results, format them into an array of
						// SearchResults to be passed into TypeaheadSearch for
						// display as a menu of suggestions.
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						// Set the search footer URL to a link to the search
						// page for the current search query.
						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
```

vue

```
<template>
	<cdx-typeahead-search
		id="typeahead-search-no-result"
		form-action="https://en.wikipedia.org/w/index.php"
		:use-button="true"
		:search-results="searchResults"
		:search-footer-url="searchFooterUrl"
		:show-thumbnail="true"
		:highlight-query="true"
		:auto-expand-width="true"
		placeholder="Search Wikipedia"
		@input="onInput"
	>
		<template #default>
			<input
				type="hidden"
				name="language"
				value="en"
			>
			<input
				type="hidden"
				name="title"
				value="Special:Search"
			>
		</template>
		<template #search-no-results-text>
			No results found
		</template>
		<template #search-footer-text="{ searchQuery }">
			Search Wikipedia for pages containing
			<strong class="cdx-typeahead-search__search-footer__query">
				{{ searchQuery }}
			</strong>
		</template>
	</cdx-typeahead-search>
</template>

<script>
const { defineComponent, ref } = require( 'vue' );
const { CdxTypeaheadSearch } = require( '@wikimedia/codex' );

module.exports = defineComponent( {
	name: 'TypeaheadSearchNoResult',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages ) {
			return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
				label: title,
				value: id,
				description: description,
				url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
				thumbnail: thumbnail ? {
					url: thumbnail.url,
					width: thumbnail.width,
					height: thumbnail.height
				} : undefined
			} ) );
		}

		function onInput( value ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// If there are results, format them into an array of
						// SearchResults to be passed into TypeaheadSearch for
						// display as a menu of suggestions.
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						// Set the search footer URL to a link to the search
						// page for the current search query.
						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
```

### Developer notes

To enable the no results message, provide content in the `search-no-results-text` slot.

## Technical implementation [​](#technical-implementation)

### Vue usage [​](#vue-usage)

TypeaheadSearch contains a form with a text input, a submit button, and a slot for hidden inputs. The parent component must listen for changes in the search query (which are debounced by default), fetch or calculate search results, then provide them as an array of search results for display to the user in a dropdown menu.

At the end of the list of search results, a final option to go to the search page for the current search query is provided.

Events are emitted to the parent when a search result is selected and when the form is submitted, with data about the selected item (e.g. for analytics).

TextInput props apply

This component contains a TextInput component. You can bind [TextInput props](./text-input.html#props) to this component and they will be passed to the TextInput within.

Attributes passed to input

This component will pass any HTML attributes applied to it, except for CSS class, to the `<input>` element within the component.

#### Props [​](#props)

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| `id`(required) | ID attribute for the form. | `string` |     |
| `formAction`(required) | Action attribute for form. | `string` |     |
| `searchResults`(required) | List of search results. See the SearchResult type. | `[SearchResult](../types-and-constants.html#searchresult)[]` |     |
| `useButton` | Whether to display a submit button. | `boolean` | `false` |
| `buttonLabel` | Custom label for the submit button.  <br>  <br>Omit this prop to use the default value, "Search". | `string` | `''` |
| `initialInputValue` | Initial value for the text input.  <br>  <br>Triggers an initial `input` event on mount. | `string` | `''` |
| `searchFooterUrl` | Link for the final menu item.  <br>  <br>This will typically be a link to the search page for the current search query. | `string` | `''` |
| `debounceInterval` | Time interval for debouncing input events, in ms. | `number` | `[DebounceInterval](../types-and-constants.html#debounceinterval)` |
| `highlightQuery` | Whether the search query should be highlighted within a search result's title. | `boolean` | `false` |
| `showThumbnail` | Whether to show search results' thumbnails (or a placeholder icon). | `boolean` | `false` |
| `autoExpandWidth` | Contract the width of the input when unfocused and expand the width of the input when focused to accommodate the extra width of the thumbnails.  <br>  <br>This prop is ignored if showThumbnail is false. | `boolean` | `false` |
| `visibleItemLimit` | Limit the number of menu items to display before scrolling.  <br>  <br>Setting this prop to anything falsy will show all menu items.  <br>  <br>By default, all menu items are shown. | `number\|null` | `null` |
| `showEmptyQueryResults` | By default, search results will be shown only when the query is not empty. When this prop is set to true, search results will be shown even if the query is empty This is used for empty search recommendations in Vector & MinervaNeue | `boolean` | `false` |
| `isMobileView` | When this prop is set to true, the UI will be modified to accommodate mobile devices, including making the button clearable and the removal of the search icon to save space | `boolean` | `false` |

#### Methods [​](#methods)

| Method name | Description | Signature |
| --- | --- | --- |
| `focus` | Focus the component's input element. | **Returns:** `void` |

#### Events [​](#events)

| Event name | Properties | Description |
| --- | --- | --- |
| `load-more` |     | When the user scrolls towards the bottom of the menu.  <br>  <br>If it is possible to add or load more menu items, then now would be a good moment so that the user can experience infinite scrolling. |
| `input` | **value** `string` - The new input value | When the text input value changes. Debounced by default. |
| `search-result-click` | **event** `[SearchResultClickEvent](../types-and-constants.html#searchresultclickevent)` - Data for the selected result | When a search result is selected. |
| `submit` | **event** `[SearchResultClickEvent](../types-and-constants.html#searchresultclickevent)` - Data for the selected result | When the form is submitted. |

#### Slots [​](#slots)

| Name | Description | Bindings |
| --- | --- | --- |
| search-results-pending | A slot for a translated "Loading search results" message. |     |
| search-no-results-text | A slot for passing in a translated "no results" message. |     |
| search-footer-text | A slot for passing in translated search footer text. | **search-query** `string` - Input text entered by the user |
| default | A slot for passing hidden inputs, i.e. |     |

### CSS-only version [​](#css-only-version)

#### Markup structure [​](#markup-structure)

The CSS-only version of TypeaheadSearch is simply a SearchInput component styled to look like the Vue version of TypeaheadSearch. It will have no menu of results and is meant to be replaced by the Vue component once JavaScript has loaded. If you only need a SearchInput, check out the [CSS-only version of the SearchInput component](./search-input.html#css-only-version). Note that the search icon is automatically added for you.

Search

Show codeCopy code

html

```
<div class="cdx-typeahead-search">
  <div class="cdx-search-input cdx-search-input--has-end-button">
    <div class="cdx-search-input__input-wrapper">
      <div class="cdx-text-input cdx-text-input--has-start-icon">
        <input
          class="cdx-text-input__input"
          type="search"
          placeholder="Search Wikipedia"
        />
        <span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
      </div>
    </div>
    <button class="cdx-button cdx-search-input__end-button">Search</button>
  </div>
</div>
```

#### With thumbnails [​](#with-thumbnails)

When your CSS-only TypeaheadSearch component will be swapped out for a Vue version that shows thumbnails (refer to the ["With initial input value" demo](#with-initial-input-value) above), apply the `.cdx-typeahead-search--show-thumbnail` class to the wrapper `<div>` to expand the start icon width.

Search

Show codeCopy code

html

```
<div class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail">
  <div class="cdx-search-input cdx-search-input--has-end-button">
    <div class="cdx-search-input__input-wrapper">
      <div class="cdx-text-input cdx-text-input--has-start-icon">
        <input
          class="cdx-text-input__input"
          type="search"
          placeholder="Search Wikipedia"
        />
        <span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
      </div>
    </div>
    <button class="cdx-button cdx-search-input__end-button">Search</button>
  </div>
</div>
```

#### With thumbnails and auto-expand width [​](#with-thumbnails-and-auto-expand-width)

When your CSS-only TypeaheadSearch component will be swapped out for a Vue version that shows thumbnails and expands when results are shown (refer to the ["Search Wikipedia articles" demo](#search-wikipedia-articles) above), apply the `.cdx-typeahead-search--show-thumbnail` and `.cdx-typeahead-search--auto-expand-width` classes to the wrapper `<div>` to reduce the starting size of the input.

Search

Show codeCopy code

html

```
<div
  class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail cdx-typeahead-search--auto-expand-width"
>
  <div class="cdx-search-input cdx-search-input--has-end-button">
    <div class="cdx-search-input__input-wrapper">
      <div class="cdx-text-input cdx-text-input--has-start-icon">
        <input
          class="cdx-text-input__input"
          type="search"
          placeholder="Search Wikipedia"
        />
        <span class="cdx-text-input__icon cdx-text-input__start-icon"></span>
      </div>
    </div>
    <button class="cdx-button cdx-search-input__end-button">Search</button>
  </div>
</div>
```

### Keyboard navigation [​](#keyboard-navigation)

| Key | Function |
| --- | --- |
| Down arrow / Up arrow | When the menu is displayed, it navigates through the menu items. |
| Enter | If the focus is placed in any of the options within the menu, the focused option is selected. |
| Esc | This key closes the menu when it is open. |

Pager

[Previous pageSearchInput](/codex/latest/components/demos/search-input.html)