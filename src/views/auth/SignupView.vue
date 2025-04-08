<script setup lang="ts">
import API from '@/assets/ts/api';
import { phoneInput, phoneKeydown, phoneReverseFormat } from '@/assets/ts/utils';
import InputControl from '@/components/inputs/InputControl.vue';
import SelectControl from '@/components/inputs/SelectControl.vue';
import { useDataStore } from '@/stores/data';
import { useLoggedInStore } from '@/stores/login';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();
const data = useDataStore();

const redirection = router.currentRoute.value.query.redirect?.toString() ?? '/compte';

if (login.isLoggedIn) router.push(redirection);

const isLoading = ref<boolean>(false);

const signupData = ref<
	Pick<Client, 'nomclient' | 'prenomclient' | 'emailclient' | 'telportableclient'> & {
		password: string;
		civiliteclient: 'H' | 'F' | 'X' | 'null';
	}
>({
	nomclient: '',
	prenomclient: '',
	emailclient: '',
	civiliteclient: 'null',
	telportableclient: '',
	password: '',
});
const signupError = ref<string | null>(null);
function signupHandler(event: Event) {
	event.preventDefault();
	event.stopPropagation();

	isLoading.value = true;
	API.clients
		.create({
			...signupData.value,
			telportableclient: phoneReverseFormat(signupData.value.telportableclient),
			civiliteclient: signupData.value.civiliteclient === 'null' ? null : signupData.value.civiliteclient,
		})
		.then((result) => {
			if (result.isSuccess()) {
				data.flash('signup', "Votre compte a bien été créé !");
				router.replace(`/auth/connexion?redirect=${encodeURIComponent(redirection)}`);
			} else {
				signupError.value = "Une erreur s'est produite.";
				isLoading.value = false;
			}
		});
}
</script>

<template>
	<form class="auth-frame" @submit="signupHandler">
		<h2>Inscription</h2>
		<div class="inline-inputs">
			<InputControl
				type="text"
				label="Nom"
				name="signup-nom"
				required
				autocomplete="family-name"
				v-model="signupData.nomclient"
			/>
			<InputControl
				type="text"
				label="Prénom"
				name="signup-prenom"
				required
				autocomplete="given-name"
				v-model="signupData.prenomclient"
			/>
		</div>
		<InputControl
			type="email"
			label="Email"
			name="signup-email"
			required
			autocomplete="email"
			v-model="signupData.emailclient"
		/>
		<InputControl
			type="password"
			label="Mot de passe"
			name="signup-password"
			required
			autocomplete="new-password"
			v-model="signupData.password"
		/>
		<InputControl
			label="Téléphone portable"
			name="signup-phone"
			required
			placeholder="01 23 45 67 89"
			pattern="^0[0-9]( [0-9]{2}){4}$"
			autocomplete="mobile"
			@input="phoneInput"
			@keydown="phoneKeydown"
			v-model="signupData.telportableclient"
		/>
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
			v-model="signupData.civiliteclient"
		/>
		<button class="button" :disabled="isLoading">
			<div class="loading-spinner" v-if="isLoading"></div>
			<template v-else>S'inscrire</template>
		</button>
	</form>
</template>

<style lang="scss" scoped>
.inline-inputs {
	display: flex;
	gap: 0.5rem;
}
</style>
