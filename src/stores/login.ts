import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';

export const useLoggedInStore = defineStore('loggedin', () => {
	const JWT = ref(localStorage.getItem('jwt'));
	const clientId = ref(localStorage.getItem('clientid'));
	const client = ref<Client | null>(null);
	const clientReady = ref<boolean>(false);

	const isLoggedIn = computed(() => {
		return JWT.value !== null && clientId.value !== null;
	});

	watchEffect(() => {
		if (isLoggedIn.value) {
			API.clients.get(clientId.value!).then((c) => {
				client.value = c;
				clientReady.value = true;
			});
		} else clientReady.value = true;
	});

	function login(jwt: string, clientid: ID) {
		clientReady.value = false;
		localStorage.setItem('jwt', jwt);
		localStorage.setItem('clientid', clientid.toString());
		JWT.value = jwt;
		clientId.value = localStorage.getItem('clientid');
	}

	function logout() {
		clientReady.value = false;
		localStorage.removeItem('jwt');
		localStorage.removeItem('clientid');
		JWT.value = null;
		clientId.value = null;
	}

	async function removeBankCard(id: ID) {
		if (!client.value) return false;
		const ok = await API.cartes.delete(id);
		console.log(ok);

		if (ok) client.value.cartesNavigation = client.value.cartesNavigation.filter((c) => c.idcartebancaire !== id);
		return ok;
	}

	return { JWT, isLoggedIn, login, logout, client, clientReady, removeBankCard };
});
