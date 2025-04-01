<script setup lang="ts">
import type { Ref } from 'vue';
import StyledButton from '../StyledButton.vue';
import PopupWindow from './BasePopupWindow.vue';

interface Button {
	style: ButtonStyle;
	label: string;
	value: string;
}

const props = defineProps<{
	buttons: Button[];
	isLoading?: boolean;
	formRef?: Ref<HTMLFormElement>;
	onClose: (value: string | null) => unknown;
}>();

if (props.buttons.length === 0) throw new Error('Doit avoir minimum 1 bouton.');

function close(value: string | null) {
	if (props.isLoading) return;
	props.onClose(value);
}
</script>

<template>
	<PopupWindow @close="() => close(null)">
		<slot></slot>
		<div class="popup-buttons">
			<StyledButton
				v-for="button in buttons"
				v-bind:key="button.value"
				:button-style="button.style"
				@click="() => close(button.value)"
				:is-loading="isLoading"
			>
				{{ button.label }}
			</StyledButton>
		</div>
	</PopupWindow>
</template>
