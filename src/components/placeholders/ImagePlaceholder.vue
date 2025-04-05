<script setup lang="ts">
import { computed, ref } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

const props = defineProps<
	{
		imageProps?: /* @vue-ignore */ JSX.IntrinsicElements['img'];
		placeholderProps?: /* @vue-ignore */ JSX.IntrinsicElements['div'];
	} & /* @vue-ignore */ JSX.IntrinsicElements['div']
>();
// Récupérer les propriétés communes aux deux éléments
const commonProps = computed(() => {
	const { imageProps: _imageProps, placeholderProps: _placeholderProps, ...rest } = props;

	return rest;
});

const isLoading = ref<boolean>(true);

// Désactiver le placeholder quand l'image est chargée
function loadHandler() {
	isLoading.value = false;
}
</script>

<template>
	<div v-if="isLoading" v-bind="{ ...placeholderProps, ...commonProps }" class="image-placeholder"></div>
	<img
		v-bind="{ ...imageProps, ...commonProps }"
		@load="loadHandler"
		:class="`${isLoading ? 'image-isloading' : ''}`"
	/>
</template>

<style lang="scss" scoped>
.image-isloading {
	display: none;
}

@keyframes image-loading {
	from {
		left: 0%;
		transform: translateX(-100%);
	}
	to {
		left: 100%;
		transform: translateX(0%);
	}
}

.image-placeholder {
	background-color: var(--c-blackAlpha-100);
	border-radius: 6px;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgb(255, 255, 255, 0.5) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		left: 0%;
		transform: translateX(-100%);
		animation: image-loading 2s ease-out 2s infinite;
	}
}
</style>
