<script setup lang="ts">
type Length = `${string}${'%' | 'px'}`;
defineProps<{
	width?: Length;
}>();
</script>

<template>
	<div class="placeholder" :style="`width: ${width ?? '100%'}`"></div>
</template>

<style lang="scss" scoped>
@keyframes placeholder-loading {
	from {
		left: 0%;
		transform: translateX(-100%);
	}
	to {
		left: 100%;
		transform: translateX(0%);
	}
}

.placeholder {
	background-color: var(--c-blackAlpha-100);
	border-radius: 100vw;
	height: 1.25em;
	display: inline-block;
	position: relative;

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
		animation: placeholder-loading 2s ease-out 2s infinite;
	}
}
</style>
