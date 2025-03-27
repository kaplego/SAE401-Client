<script setup lang="ts">
import CarteBancaire from '@/components/CarteBancaire.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { ArrowLeft } from 'lucide-vue-next';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
			<h1>Mes informations bancaires</h1>
			<p>Appuiez sur une carte pour voir ses informations.</p>
			<div class="grille-cartes">
				<CarteBancaire
					v-for="card in login.client.cartesNavigation"
					v-bind:key="card.idcartebancaire"
					:card="card"
					deletable
				/>
			</div>
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style lang="scss" scoped>
h1 {
	margin-bottom: 0;
}

.grille-cartes {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 3rem;
	margin-top: 3rem;
}
</style>
