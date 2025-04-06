<script setup lang="ts">
import { computed } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

const props = defineProps<
	{
		buttonStyle?: ButtonStyle;
		buttonSize?: 'sm' | 'md' | 'lg';
		isLoading?: boolean;
		to?: string;
	} & /* @vue-ignore */ JSX.IntrinsicElements['button']
>();

// Récupérer les propriétés par défaut du bouton
const buttonProps = computed(() => {
	const { buttonStyle: _buttonStyle, buttonSize: _buttonSize, ...rest } = props;
	return rest;
});
</script>

<template>
	<component
		v-bind:is="to ? 'RouterLink' : 'button'"
		v-bind="buttonProps"
		:disabled="isLoading || buttonProps.disabled"
		:type="type"
		:class="`button button-${buttonStyle ?? 'primary'} button-${buttonSize ?? 'md'} ${buttonProps.disabled ? 'disabled' : ''}`"
	>
		<div class="loading-spinner" style="height: 1.5em" v-if="isLoading"></div>
		<slot v-else></slot>
	</component>
</template>
