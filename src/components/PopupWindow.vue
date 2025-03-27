<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';

defineProps<{
	width?: number;
	height?: number;
}>();

const pwindow = ref<HTMLDivElement>();
const pwindowcontent = ref<HTMLDivElement>();

function hideMenu() {
	if (pwindow.value)
		pwindow.value.style.display = 'none';
}
</script>

<template>
	<div ref="pwindow" class="popup-window-background" @click="(ev) => {
		if (ev.target && !pwindowcontent?.contains(ev.target as HTMLElement))
			hideMenu();
	}">
		<div
			:style="`width: ${width ?? 50}%; height: ${height ?? 50}%; top: ${(100 - (height ?? 50)) / 2}%; left: ${(100 - (width ?? 50)) / 2}%`"
			class="popup-window"
			ref="pwindowcontent"
		>
			<div style="height: 100%;">
				<div class="popup-window-back" @click="hideMenu()"><ArrowLeft /> Retour</div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.popup-window-background {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: var(--c-blackAlpha-500);
	z-index: 10000;
}
.popup-window {
	position: fixed;
	// width: 50%;
	// height: 50%;
	// display: none;
	background-color: var(--t-background1);
	// top: 25%;
	// left: 25%;
	// border: solid;
	// border-color: var(--t-border1);
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
