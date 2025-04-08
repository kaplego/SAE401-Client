<script setup lang="ts">
import { phoneReverseFormat, phoneFormat, phoneInput, phoneKeydown } from '@/assets/ts/utils';
import InputControl from '@/components/inputs/InputControl.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SelectControl from '@/components/inputs/SelectControl.vue';
import { useLoggedInStore } from '@/stores/login';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import API from '@/assets/ts/api';
import StyledButton from '@/components/StyledButton.vue';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/auth/connexion');

watchEffect(() => {
	if (login.clientReady && login.client === null) {
		login.logout();
		router.push('/auth/connexion');
	}
});

const form = ref<HTMLFormElement>();
// const error = ref<string | null>(null);
// const isLoading = ref<boolean>(false);

type ClientModel = {
	nom: string;
	prenom: string;
	civilite: 'H' | 'F' | 'X' | 'null';
	email: string;
	telportable: string;
	telfixe: string;
};

const newClient = ref<ClientModel>({
	nom: '',
	prenom: '',
	civilite: 'null',
	email: '',
	telportable: '',
	telfixe: '',
});
const error = ref<string | null>(null);

watchEffect(() => {
	newClient.value = {
		nom: login.client?.nomclient ?? '',
		prenom: login.client?.prenomclient ?? '',
		civilite: login.client?.civiliteclient ?? 'null',
		email: login.client?.emailclient ?? '',
		telportable: phoneFormat(login.client?.telportableclient ?? ''),
		telfixe: phoneFormat(login.client?.telportableclient ?? ''),
	};
});

/** Sauvegarder les informations personnelles du client */
function save(event: Event) {
	event.preventDefault();
	event.stopPropagation();

	// Vérifier que le client est toujours connecté
	if (!login.client) {
		login.logout();
		router.push('/auth/connexion');
		return;
	}

	// Modifier le client dans l'API
	API.clients
		.update({
			idclient: login.client.idclient,
			nomclient: newClient.value.nom,
			prenomclient: newClient.value.prenom,
			emailclient: newClient.value.email,
			civiliteclient: newClient.value.civilite === 'null' ? null : newClient.value.civilite,
			telportableclient: phoneReverseFormat(newClient.value.telportable),
			telfixeclient: newClient.value.telfixe ? phoneReverseFormat(newClient.value.telfixe) : null,
			newslettermiliboo: login.client.newslettermiliboo,
			newsletterpartenaires: login.client.newsletterpartenaires,
			pointfideliteclient: login.client.pointfideliteclient,
		})
		.then((res) => {
			if (res.isSuccess()) {
				console.log(res.value);
			} else {
				error.value = Object.values((res.value as APIResponseError).errors)[0][0] ?? 'Une erreur est survenue.';
			}
		});
}
</script>

<template>
	<template v-if="login.client !== null">
		<h1>Mes informations personnelles</h1>
		<form ref="form" class="grille-infos" @submit="save">
			<InputControl label="Nom" v-model="newClient.nom" required />
			<InputControl label="Prénom" v-model="newClient.prenom" required />
			<SelectControl
				label="Civilité"
				required
				:options="{
					groupped: false,
					values: [
						{
							label: 'Ne préfère pas répondre',
							value: 'null',
						},
						{
							label: 'Homme',
							value: 'H',
						},
						{
							label: 'Femme',
							value: 'F',
						},
						{
							label: 'Autre',
							value: 'X',
						},
					],
				}"
				v-model="newClient.civilite"
			/>
			<InputControl label="Adresse e-mail" type="email" v-model="newClient.email" required />
			<InputControl
				label="Téléphone portable"
				v-model="newClient.telportable"
				type="tel"
				placeholder="01 23 45 67 89"
				required
				pattern="^0[0-9]( [0-9]{2}){4}$"
				@input="phoneInput"
				@keydown="phoneKeydown"
			/>
			<InputControl
				label="Téléphone fixe"
				v-model="newClient.telfixe"
				type="tel"
				placeholder="01 23 45 67 89"
				pattern="^0[0-9]( [0-9]{2}){4}$"
				@input="phoneInput"
				@keydown="phoneKeydown"
			/>
			<p class="form-error" v-if="error">{{ error }}</p>
			<StyledButton button-style="primary" type="submit" style="grid-column-end: span 2; width: 100%">
				Enregistrer
			</StyledButton>
		</form>
	</template>
	<LoadingSpinner v-else />
</template>

<style lang="scss" scoped>
.grille-infos {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem 1rem;
	width: 50%;
}
</style>
