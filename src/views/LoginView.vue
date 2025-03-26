<script setup lang="ts">
import API from '@/assets/ts/api';
import { useLoggedInStore } from '@/stores/login';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

if (login.isLoggedIn) router.push('/account');

const form = ref<HTMLFormElement>();
const error = ref<string | null>(null);
const isLoading = ref<boolean>(false);

watchEffect((clean) => {
	if (form.value) {
		function submitHandler(event: SubmitEvent) {
			event.preventDefault();
			event.stopPropagation();
			const data = new FormData(form.value);
			const email = data.get('email'),
				pass = data.get('password');

			if (typeof email === 'string' && typeof pass === 'string') {
				isLoading.value = true;
				API.clients.login(email, pass).then((result) => {
					if (!result) error.value = "L'adresse email ou le mot de passe est incorrect.";
					else router.push('/account');
				});
			}
		}
		form.value?.addEventListener('submit', submitHandler);
		clean(() => form.value?.removeEventListener('submit', submitHandler));
	}
});
</script>

<template>
	<main class="container">
		<form ref="form" class="frame">
			<h2>Connexion</h2>
			<input class="input" type="email" placeholder="Email" required name="email" />
			<input class="input" type="password" placeholder="Mot de passe" required name="password" />
			<button class="button" :disabled="isLoading">
				<div class="loading-spinner" v-if="isLoading"></div>
				<template v-else>Se connecter</template>
			</button>
		</form>
	</main>
</template>

<style lang="scss" scoped>
main {
	display: flex;
	align-items: center;
	justify-content: center;
}
.frame {
	background-color: var(--t-background3);
	padding: 2rem;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

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
