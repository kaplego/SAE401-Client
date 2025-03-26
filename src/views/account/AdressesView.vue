<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
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
			<h1>Mes adresses</h1>
			<button id="add-address" class="button button-sm">Ajouter une adresse</button>
			<div></div>
			<div class="card-address" v-for="address in login.client.adressesNavigation" v-bind:key="address.idadresse">
				<div class="title-address">
					EEEEEE
					<!-- {{ address.nomadresse }} -->
				</div>
				<div>
					{{ address.numerorue }} {{ address.nomrue }}, {{ address.codepostaladresse }}
					{{ address.villeNavigation.nomville }}, {{ address.payNavigation.nompays }}
				</div>
				<div class="div-button-suppr-modif">
					<button class="button button-sm button-suppr">Supprimer l'adresse</button>
					<button class="button button-sm button-modif">Modifier l'adresse</button>
				</div>
			</div>
			<div></div>
			{{ login.client.adressesNavigation }}
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style scoped>
h1 {
	margin-bottom: 1rem;
}
.card-address {
	border: solid;
	padding: 1rem 2rem;
	display: inline-block;
	border-color: var(--t-border2);
	border-radius: 1rem;
	background-color: var(--t-background2);
}
.title-address {
	font-weight: 1000;
	margin-bottom: 1em;
}
#add-address {
	margin-bottom: 1em;
}
.button-suppr, .button-modif {
	margin-top: 1rem;
}
.div-button-suppr-modif {
	display: flex;
	flex-direction: row;
	gap: 1rem;
}
</style>
