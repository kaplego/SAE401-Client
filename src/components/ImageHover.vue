<script setup lang="ts">
import { computed, ref } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

const props = defineProps<
	{
		primarySrc: string;
		primaryAlt?: string;
		hoveredSrc: string;
		hoveredAlt?: string;
		forceIsHovered?: boolean;
	} & /* @vue-ignore */ Exclude<JSX.IntrinsicElements['img'], 'src'>
>();

const imageProps = computed(() => {
	const { primarySrc: _1, hoveredSrc: _2, forceIsHovered: _3, ...rest } = props;
	return rest;
});

const isHovered = ref<boolean>(props.forceIsHovered ?? false);
</script>

<template>
	<img
		v-if="isHovered || forceIsHovered === true"
		v-bind="imageProps"
		@mouseleave="isHovered = false"
		:src="hoveredSrc"
		:alt="hoveredAlt"
	/>
	<img v-else v-bind="imageProps" @mouseenter="isHovered = true" :src="primarySrc" :alt="primaryAlt" />
</template>

<style lang="scss" scoped></style>
