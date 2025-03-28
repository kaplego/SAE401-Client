<script setup lang="ts">
type Length = `${string}${'%' | 'px'}`;
defineProps<{
	width?: Length;
}>();
</script>

<template>
	<div class="placeholder" :style="`width: ${width ?? '100%'}`"></div>
</template>

<style lang="scss">
.placeholder {
	background-color: var(--c-blackAlpha-100);
	border-radius: 100vw;
	height: 1.25em;
	display: inline-block;
}
</style>
