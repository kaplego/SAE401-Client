<script setup lang="ts">
import CarteBancaire from '@/components/CarteBancaire.vue';
import InputControl from '@/components/inputs/InputControl.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import PopupWindow from '@/components/PopupWindow.vue';
import { useLoggedInStore } from '@/stores/login';
import { ArrowLeft } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

const popup = ref<boolean>(false);
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
			<h1>Mes informations bancaires</h1>
			<p>Appuiez sur une carte pour voir ses informations.</p>
			<button class="button button-sm" @click="popup = true">Ajouter une carte bancaire</button>
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
	<PopupWindow v-if="popup" :onClose="() => (popup = false)" title="Ajouter une carte bancaire">
		<InputControl label="Titulaire de la carte" name="titulaire" required />
		<button class="button popup-confirm">Enregistrer</button>
	</PopupWindow>
</template>

<style lang="scss" scoped>
h1 {
	margin-bottom: 0;

	& + p {
		margin: 1rem 0;
	}
}

.grille-cartes {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 3rem;
	margin-top: 3rem;
}
</style>
