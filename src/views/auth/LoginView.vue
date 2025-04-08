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
	API.clients.login(loginData.value.email, loginData.value.email).then((result) => {
		if (!result) loginError.value = "L'adresse email ou le mot de passe est incorrect.";
		else {
			login.login(result.token, result.client.idclient);
			router.replace(redirection);
		}
	});
}
</script>

<template>
	<div id="login">
		<form class="frame" @submit="loginHandler">
			<h2>Connexion</h2>
			<InputControl type="email" label="Email" name="email" required />
			<InputControl type="password" label="Mot de passe" name="password" required />
			<button class="button" :disabled="isLoading">
				<div class="loading-spinner" v-if="isLoading"></div>
				<template v-else>Se connecter</template>
			</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
#login {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rem;
	flex-wrap: wrap;
}

.frame {
	// background-color: var(--t-background3);
	border: 2px solid var(--t-background3);
	padding: 2rem;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	& > * {
		width: 100%;
	}

	h2 {
		margin-top: 0;
		text-align: center;
	}

	.loading-spinner {
		margin: 0 auto;
		color: white;
	}
}
</style>
