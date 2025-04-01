<script setup lang="ts">
import { computed } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

const props = defineProps<
	{
		buttonStyle?: ButtonStyle;
		buttonSize?: 'sm' | 'md' | 'lg';
	} & /* @vue-ignore */ JSX.IntrinsicElements['button']
>();

const buttonProps = computed(() => {
	const { buttonStyle: _buttonStyle, buttonSize: _buttonSize, ...rest } = props;
	return rest;
});
</script>

<template>
	<button
		v-bind="buttonProps"
		:type="type"
		:class="`button button-${buttonStyle ?? 'secondary'} button-${buttonSize ?? 'md'}`"
	>
		<slot></slot>
	</button>
</template>
