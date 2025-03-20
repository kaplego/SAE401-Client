<script setup lang="ts">
import { OctagonAlert } from 'lucide-vue-next';

defineProps<{
	title: string;
	subtitle: string;
	link: string;
}>();
</script>

<template>
	<RouterLink :to="link" class="card-account-link">
		<div class="card-account">
			<slot class="icon">
				<OctagonAlert />
			</slot>
			<h2 class="title">{{ title }}</h2>
			<p class="subtitle">{{ subtitle }}</p>
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

	&:hover {
		background-color: var(--t-background1-accent);
		border-color: var(--t-border1-accent);
	}

	.title {
		margin: 0;
		margin-bottom: 0.5em;
	}

	.subtitle {
		opacity: .4;
	}

	.lucide {
		position: absolute;
		opacity: 0.1;
		height: 3rem;
		width: 3rem;
		top: 50%;
		transform: translateY(-50%);
		right: 0.5rem;
	}
}
</style>
