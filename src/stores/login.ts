import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';

export const useLoggedInStore = defineStore('loggedin', () => {
	const JWT = ref(localStorage.getItem('jwt'));
	const clientId = ref(localStorage.getItem('clientid'));
	const client = ref<Client | null>(null);
	const clientReady = ref<boolean>(false);

	/** Vérifie si l'utilisateur est connecté. */
	const isLoggedIn = computed(() => {
		return JWT.value !== null && clientId.value !== null;
	});

	// Met à jour l'utilisateur (`client`) lors d'un changement.
	watchEffect(() => {
		refresh();
	});

	/** Se connecter avec un JWT et l'ID du client. */
	function login(jwt: string, clientid: ID) {
		clientReady.value = false;
		localStorage.setItem('jwt', jwt);
		localStorage.setItem('clientid', clientid.toString());
		JWT.value = jwt;
		clientId.value = localStorage.getItem('clientid');
	}

	/** Se déconnecter. */
	function logout() {
		clientReady.value = false;
		localStorage.removeItem('jwt');
		localStorage.removeItem('clientid');
		JWT.value = null;
		clientId.value = null;
	}

	/** Mettre à jour les données de `client`. */
	async function refresh() {
		if (isLoggedIn.value) {
			API.clients.get(clientId.value!).then((c) => {
				client.value = c;
				clientReady.value = true;
			});
		} else clientReady.value = true;
	}

	return { JWT, isLoggedIn, login, logout, client, clientReady, refresh };
});
