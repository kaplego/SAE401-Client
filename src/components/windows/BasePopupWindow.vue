<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
	width?: `${number}${'%' | 'px'}`;
	title?: string;
	/** Exécuté lorsque la popup est fermée */
	onClose?: () => unknown;
}>();

const pwindow = ref<HTMLDivElement>();
const pwindowcontent = ref<HTMLDivElement>();

/** Fermer la popup */
function hideMenu() {
	props.onClose?.();
}
</script>

<template>
	<div
		ref="pwindow"
		class="popup-background"
		@click="
			(ev) => {
				if (ev.target && !pwindowcontent?.contains(ev.target as HTMLElement)) hideMenu();
			}
		"
	>
		<div
			class="popup-window"
			ref="pwindowcontent"
			:style="`width: clamp(150px, ${width ?? '500px'}, calc(100% - 2rem));`"
		>
			<div class="popup-header">
				<div class="popup-window-back" @click="hideMenu()"><ArrowLeft /> Retour</div>
				<p class="popup-title" v-if="title != null">{{ title }}</p>
			</div>
			<div class="popup-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.popup-background {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: var(--c-blackAlpha-100);
	z-index: 10000;
	backdrop-filter: blur(4px);
}

.theme-dark .popup-background {
	background-color: var(--c-whiteAlpha-200);
}

.popup-window {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transform-origin: center center;
	overflow: hidden auto;
	max-height: calc(100% - 2rem);

	.popup-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		background-color: var(--t-background2);
		border-radius: 1rem 1rem 0 0;
		padding: 0.5rem 1rem;

		.popup-window-back {
			display: flex;
			align-items: center;
			height: max-content;
			cursor: pointer;
			user-select: none;
			width: max-content;
			padding: 0.25rem 0.5rem;
			border-radius: 4px;

			.lucide {
				height: 1em;
			}

			&:hover {
				background-color: var(--c-blackAlpha-100);
			}
		}

		.popup-title {
			font-weight: bold;
			font-size: 1.1rem;
		}
	}

	.popup-content {
		background-color: var(--t-background1);
		border-radius: 0 0 1rem 1rem;
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.popup-buttons {
			display: flex;
			flex-direction: row;
			gap: 1rem;
			margin-left: auto;
		}
	}
}
</style>
