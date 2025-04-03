<script setup lang="ts">
import { computed } from 'vue';
import StyledButton from '../StyledButton.vue';
import PopupWindow from './BasePopupWindow.vue';
import type { JSX } from 'vue/jsx-runtime';

interface Button {
	style: ButtonStyle;
	label: string;
	value: string;
	type: 'button' | 'submit' | 'reset';
}

const props = defineProps<
	{
		buttons: Button[];
		isLoading?: boolean;
		onClose: (value: string | null) => unknown;
	} & /* @vue-ignore */ JSX.IntrinsicElements['form']
>();
const formProps = computed(() => {
	const { buttons: _0, isLoading: _1, onClose: _2, ...rest } = props;
	return rest;
});

if (props.buttons.length === 0) throw new Error('Doit avoir minimum 1 bouton.');

function close(value: string | null) {
	if (props.isLoading) return;
	props.onClose(value);
}
</script>

<template>
	<PopupWindow @close="() => close(null)">
		<form v-bind="formProps" class="popup-content-form">
			<slot></slot>
			<div class="popup-buttons">
				<StyledButton
					v-for="button in buttons"
					v-bind:key="button.value"
					:button-style="button.style"
					:type="button.type"
					@click="() => close(button.value)"
					:is-loading="isLoading"
				>
					{{ button.label }}
				</StyledButton>
			</div>
		</form>
	</PopupWindow>
</template>

<style lang="scss">
.popup-content-form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
