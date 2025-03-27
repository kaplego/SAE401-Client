<script setup lang="ts">
import { phoneReverseFormat, phoneFormat } from '@/assets/ts/utils';
import InputControl from '@/components/inputs/InputControl.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import SelectControl from '@/components/inputs/SelectControl.vue';
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

const form = ref<HTMLFormElement>();
// const error = ref<string | null>(null);
// const isLoading = ref<boolean>(false);

watchEffect((clean) => {
	if (form.value) {
		function submitHandler(event: SubmitEvent) {
			event.preventDefault();
			event.stopPropagation();
			const data = new FormData(form.value);

			const newClient = { ...login.client };
			newClient.nomclient = data.get('nomclient') as string;
			newClient.prenomclient = data.get('prenomclient') as string;
			newClient.civiliteclient = data.get('civiliteclient') as string;
			if (newClient.civiliteclient === 'null') newClient.civiliteclient = null;
			newClient.emailclient = data.get('emailclient') as string;
			newClient.telportableclient = phoneReverseFormat(data.get('telportableclient') as string);
			newClient.telfixeclient = data.get('telfixeclient') as string;
			if (newClient.telfixeclient === '') newClient.telfixeclient = null;
			else newClient.telfixeclient = phoneReverseFormat(newClient.telfixeclient);

			console.log(newClient);

			// API.clients.create(newClient as Client).then((result) => {
			// 	console.log(result);

			// 	// if (!result) error.value = "L'adresse email ou le mot de passe est incorrect.";
			// 	// else {
			// 	// 	login.login(result.token, result.client.idclient);
			// 	// 	router.replace('/account');
			// 	// }
			// });
		}
		form.value?.addEventListener('submit', submitHandler);
		clean(() => form.value?.removeEventListener('submit', submitHandler));
	}
});
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
			<h1>Mes informations personnelles</h1>
			<form ref="form" class="grille-infos">
				<InputControl label="Nom" name="nomclient" :value="login.client.nomclient" required />
				<InputControl label="Prénom" name="prenomclient" :value="login.client.prenomclient" required />
				<SelectControl
					label="Civilité"
					name="civiliteclient"
					required
					:selected="login.client.civiliteclient"
					:options="{
						groups: false,
						values: [
							{
								label: 'Ne préfère pas répondre',
								value: 'null',
							},
							{
								label: 'Homme',
								value: 'h',
							},
							{
								label: 'Femme',
								value: 'f',
							},
							{
								label: 'Autre',
								value: 'x',
							},
						],
					}"
				/>
				<InputControl label="Adresse e-mail" name="emailclient" :value="login.client.emailclient" />
				<InputControl
					label="Téléphone portable"
					name="telportableclient"
					:value="phoneFormat(login.client.telportableclient)"
					type="tel"
					placeholder="01 23 45 67 89"
					required
					pattern="^0[0-9]( [0-9]{2}){4}$"
				/>
				<InputControl
					label="Téléphone fixe"
					name="telfixeclient"
					:value="login.client.telfixeclient ? phoneFormat(login.client.telfixeclient) : ''"
					type="tel"
					placeholder="01 23 45 67 89"
					pattern="^0[0-9]( [0-9]{2}){4}$"
				/>
				<input type="submit" value="Enregistrer" class="button" style="grid-column-end: span 2; width: 100%" />
			</form>
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style lang="scss" scoped>
.grille-infos {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2rem 1rem;
	width: 50%;
}
</style>
