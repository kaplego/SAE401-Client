<script setup lang="ts">
import { OctagonAlert } from 'lucide-vue-next';

defineProps<{
	title: string;
	subtitle: string;
	error?: string;
	warning?: string;
	link: string;
	wip?: boolean;
}>();
</script>

<template>
	<component :is="wip ? 'div' : 'RouterLink'" :to="link" class="card-account-link">
		<div :class="`card-account ${wip ? 'disabled' : ''}`">
			<slot>
				<OctagonAlert />
			</slot>
			<h2 class="title">{{ title }}</h2>
			<p class="subtitle">{{ subtitle }}</p>
			<p class="error" v-if="error">{{ error }}</p>
			<p class="warning" v-if="warning">{{ warning }}</p>
			<template v-if="wip">
				<div class="wip wip-back"></div>
				<div class="wip wip-front">Bientôt disponible !</div>
			</template>
		</div>
	</component>
</template>

<style lang="scss">
.card-account-link {
	text-decoration: none;
}

.card-account {
	border-radius: 6px;
	background-color: var(--t-background2);
	border: 2px solid var(--t-border1);
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	transition: all 100ms;
	height: 100%;
	overflow: hidden;

	&.disabled {
		cursor: not-allowed;
		user-select: none;
	}

	&:hover:not(.disabled) {
		background-color: var(--t-background1-accent);
		border-color: var(--t-border1-accent);
	}

	.badge {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(30%, -30%);
		background-color: black;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30px;
		width: 30px;
		padding: 0.5rem;
		border-radius: 100vw;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;

		&.error {
			background-color: var(--c-red-500);
		}

		&.warning {
			background-color: var(--c-yellow-500);
		}

		.lucide {
			font-size: 1.5rem;
		}
	}

	.title {
		margin: 0;
		margin-bottom: 0.5em;
	}

	.subtitle {
		opacity: 0.4;
	}

	.error {
		color: var(--c-red-500);
	}

	.warning {
		color: var(--c-yellow-500);
	}

	& > .lucide {
		position: absolute;
		opacity: 0.1;
		height: 3rem;
		width: 3rem;
		top: 1rem;
		right: 0.5rem;
	}

	.wip {
		position: absolute;
		transform-origin: center center;
		top: 50%;
		left: 50%;
		height: 1lh;
		width: 150%;
		background: repeating-linear-gradient(
			45deg,
			rgba(0, 0, 0, 1) 0px,
			rgba(0, 0, 0, 1) 10px,
			rgba(255, 216, 0, 1) 10px,
			rgba(255, 216, 0, 1) 20px
		);
		box-shadow: 0 0 3px black;

		&.wip-back {
			transform: translate(-50%, -50%) rotateZ(15deg);
		}

		&.wip-front {
			transform: translate(-50%, -50%) rotateZ(-10deg);
			text-align: center;
			font-weight: bold;
			color: white;
			text-shadow:
				2px 2px 0 #000,
				2px -2px 0 #000,
				-2px 2px 0 #000,
				-2px -2px 0 #000,
				2px 0px 0 #000,
				0px 2px 0 #000,
				-2px 0px 0 #000,
				0px -2px 0 #000;
		}
	}
}
</style>
