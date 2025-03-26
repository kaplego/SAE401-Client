import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoggedInStore = defineStore('loggedin', () => {
	const JWT = ref(localStorage.getItem('jwt'));
	const clientId = ref(localStorage.getItem('clientid'));
	const client = ref<Client | null>(null);
	const clientReady = ref<boolean>(false);

	const isLoggedIn = computed(() => JWT.value !== null && clientId.value !== null);

	if (isLoggedIn.value) {
		API.clients.get(clientId.value!).then((c) => {
			client.value = c;
			clientReady.value = true;
		});
	} else clientReady.value = true;

	function login(jwt: string, clientid: ID) {
		localStorage.setItem('jwt', jwt);
		localStorage.setItem('clientid', clientid.toString());
		JWT.value = jwt;
		clientId.value = localStorage.getItem('clientid');
	}

	function logout() {
		localStorage.removeItem('jwt');
		localStorage.removeItem('clientid');
		JWT.value = null;
		clientId.value = null;
	}

	return { JWT, isLoggedIn, login, logout, client, clientReady };
});
