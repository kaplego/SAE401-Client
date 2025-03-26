<script setup lang="ts">
import { phoneFormat } from '@/assets/ts/utils';
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
			<h1>Mes informations personnelles</h1>
			<div class="grille-infos">
				<div class="input-control">
					<label for="nomclient">Nom</label>
					<input
						type="text"
						name="nomclient"
						id="nomclient"
						:value="login.client.nomclient"
						placeholder=" "
					/>
				</div>
				<div class="input-control">
					<label for="prenomclient">Prénom</label>
					<input
						type="text"
						name="prenomclient"
						id="prenomclient"
						:value="login.client.prenomclient"
						placeholder=" "
					/>
				</div>
				<div class="input-control">
					<label for="telportableclient">Téléphone portable</label>
					<input
						type="tel"
						name="telportableclient"
						id="telportableclient"
						:value="phoneFormat(login.client.telportableclient)"
						placeholder=" "
					/>
				</div>
				<div class="input-control">
					<label for="telfixeclient">Téléphone fixe</label>
					<input
						type="tel"
						name="telfixeclient"
						id="telfixeclient"
						:value="login.client.telfixeclient ? phoneFormat(login.client.telfixeclient) : ''"
						placeholder=" "
					/>
				</div>
				<div class="input-control">
					<label for="emailclient">Adresse E-mail</label>
					<input
						type="tel"
						name="emailclient"
						id="emailclient"
						:value="login.client.emailclient"
						placeholder=" "
					/>
				</div>
			</div>
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
