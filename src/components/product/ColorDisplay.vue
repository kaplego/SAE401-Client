<script setup lang="ts">
import { computed } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

const props = withDefaults(
	defineProps<
		{
			color: Couleur;
			size?: string;
			selected?: boolean;
			clickable?: boolean;
		} & /* @vue-ignore */ Omit<JSX.IntrinsicElements['div'], 'color' | 'size' | 'selected'>
	>(),
	{
		size: 'auto',
	},
);
// Récupérer les propriétés de la div
const divProps = computed(() => {
	const { color: _1, size: _2, selected: _3, ...rest } = props;

	return rest;
});
</script>

<template>
	<div
		v-bind="divProps"
		:class="`color-display ${selected ? 'selected' : ''} ${clickable ? 'clickable' : ''}`"
		:style="`height: ${size};`"
	>
		<div class="color" :style="`background-color: #${color.rgbcouleur}`"></div>
		<p class="nom">{{ color.nomcouleur }}</p>
	</div>
</template>

<style lang="scss" scoped>
.color-display {
	display: flex;
	align-items: center;
	border: 2px solid var(--t-background3);
	border-radius: 4px;
	width: max-content;
	cursor: default;

	&.selected {
		border-color: var(--t-border2);
	}

	&.clickable {
		cursor: pointer;
	}

	.color {
		height: 100%;
		aspect-ratio: 1;
		background-color: var(--couleur);
		border-radius: 2px 0 0 2px;
	}

	.nom {
		padding: 0.125rem 0.75rem;
		background-color: var(--t-background3);
		border-radius: 0 2px 2px 0;
		height: 100%;
		display: flex;
		align-items: center;
	}
}
</style>
