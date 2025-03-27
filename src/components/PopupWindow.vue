<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';



defineProps<{
	width?: number;
	height?: number;
}>();

function hideMenu() {
	const addAddressMenu: HTMLDivElement = document.querySelector('.popup-window')!;
	addAddressMenu.style.display = 'none';
}
</script>

<template>
	<div :style="`width: ${width??50}%; height: ${height??50}%; top: ${(100-(height??50))/2}%; left: ${(100-(width??50))/2}%`" class="popup-window">
		<div>
			<div class="popup-window-back" @click="hideMenu()"><ArrowLeft /> Retour</div>
			<slot></slot>
		</div>
	</div>
</template>

<style scoped lang="scss">
.popup-window {
	position: fixed;
	// width: 50%;
	// height: 50%;
	// display: none;
	background-color: var(--t-background2);
	// top: 25%;
	// left: 25%;
	border: solid;
	border-color: var(--t-border1);
	border-radius: 1rem;
	padding: 1rem 2rem;
}
.popup-window-back {
	display: flex;
	align-items: center;
	height: max-content;
	cursor: pointer;
	user-select: none;

	.lucide {
		height: 1em;
	}
}
</style>
