<template>
	<cdx-card :icon="icon" :url="url">
		<template #title>
			<slot name="title"></slot>
		</template>
		<template #description>
			<slot name="description"></slot>
		</template>
		<template #supporting-text>
			<slot name="supporting-text"></slot>
		</template>
	</cdx-card>
</template>

<script setup>
import { CdxCard } from '@wikimedia/codex';

defineProps( {
	icon: {
		type: Object,
		default: null
	},
	url: {
		type: String,
		default: ''
	}
} );
</script>

<style scoped>
:deep(.cdx-card--is-link:hover) {
  background-color: #f8f9fa; /* A light grey for hover */
}

:deep(.cdx-card--is-link:active) {
  background-color: #eaecf0; /* A slightly darker grey for active/click */
}
</style>