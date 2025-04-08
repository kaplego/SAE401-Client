<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
if (router.currentRoute.value.path === '/auth') router.replace('/auth/connexion');

const suffix = computed(() =>
	router.currentRoute.value.query['redirect'] ? `?redirect=${router.currentRoute.value.query['redirect']}` : '',
);
</script>

<template>
	<main class="container">
		<div class="tabs">
			<RouterLink class="tab" :to="`/auth/connexion${suffix}`" replace>Connexion</RouterLink>
			<RouterLink class="tab" :to="`/auth/inscription${suffix}`" replace>Inscription</RouterLink>
		</div>
		<RouterView />
	</main>
</template>

<style lang="scss" scoped>
main {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.tabs {
	width: clamp(200px, 400px, 100%);
	display: flex;

	.tab {
		flex: 1;
		padding: 0.5rem 1rem;
		text-decoration: none;
		text-align: center;
		border-radius: 4px 4px 0 0;
		border-bottom: 2px solid var(--t-border1-accent);
		transition: all 100ms;

		&.router-link-active {
			background-color: var(--t-background1-accent);
		}
	}
}
</style>

<style lang="scss">
.auth-frame {
	background-color: var(--t-background2);
	border: 2px solid var(--t-background3);
	border-top: none;
	padding: 2rem;
	border-radius: 0 0 6px 6px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: clamp(200px, 400px, 100%);

	& > * {
		width: 100%;
	}

	h2 {
		margin-top: 0;
		text-align: center;
	}

	.input-control,
	.select-control {
		--bg: var(--t-background2);
	}

	.loading-spinner {
		margin: 0 auto;
		color: white;
	}
}
</style>
