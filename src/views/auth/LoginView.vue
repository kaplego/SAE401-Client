<script setup lang="ts">
import API from '@/assets/ts/api';
import InputControl from '@/components/inputs/InputControl.vue';
import { useLoggedInStore } from '@/stores/login';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

const redirection = router.currentRoute.value.query.redirect?.toString() ?? '/compte';

if (login.isLoggedIn) router.push(redirection);

const isLoading = ref<boolean>(false);

const loginData = ref<{
	email: string;
	password: string;
}>({
	email: '',
	password: '',
});
const loginError = ref<string | null>(null);
function loginHandler(event: Event) {
	event.preventDefault();
	event.stopPropagation();

	isLoading.value = true;
	API.clients.login(loginData.value.email, loginData.value.password).then((result) => {
		if (!result) loginError.value = "L'adresse email ou le mot de passe est incorrect.";
		else {
			login.login(result.token, result.client.idclient);
			router.replace(redirection);
		}
	});
}
</script>

<template>
	<form class="auth-frame" @submit="loginHandler">
		<h2>Connexion</h2>
		<InputControl type="email" label="Email" name="email" required v-model="loginData.email" />
		<InputControl type="password" label="Mot de passe" name="password" required v-model="loginData.password" />
		<button class="button" :disabled="isLoading">
			<div class="loading-spinner" v-if="isLoading"></div>
			<template v-else>Se connecter</template>
		</button>
	</form>
</template>

<style lang="scss" scoped>
</style>
