<script setup lang="ts">
import { OctagonAlert } from 'lucide-vue-next';

defineProps<{
	title: string;
	subtitle: string;
	error?: string;
	warning?: string;
	link: string;
}>();
</script>

<template>
	<RouterLink :to="link" class="card-account-link">
		<div class="card-account">
			<slot>
				<OctagonAlert />
			</slot>
			<h2 class="title">{{ title }}</h2>
			<p class="subtitle">{{ subtitle }}</p>
			<p class="error" v-if="error">{{ error }}</p>
			<p class="warning" v-if="warning">{{ warning }}</p>
		</div>
	</RouterLink>
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

	&:hover {
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
}
</style>
