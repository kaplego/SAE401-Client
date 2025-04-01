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

	function getCreditCard(numero: string) {
		if (!client.value) return null;
		return (
			client.value.cartesNavigation.find(
				(carte) => carte.numcartebancaire.replace(/ /g, '') === numero.replace(/ /g, ''),
			) ?? null
		);
	}

	async function removeCreditCard(id: ID) {
		if (!client.value) return false;
		const ok = await API.cartes.delete(id);
		if (ok) client.value.cartesNavigation = client.value.cartesNavigation.filter((c) => c.idcartebancaire !== id);
		return ok;
	}

	async function addCreditCard(
		card: Omit<CarteBancaire, 'idcartebancaire' | 'clientNavigation' | 'paiementsNavigation' | 'dateenregistement'>,
	) {
		if (!client.value) return false;
		const ok = await API.cartes.create(card);
		if (ok)
			client.value.cartesNavigation.push({
				...card,
				idcartebancaire: 0,
			} as CarteBancaire);
		return ok;
	}

	return { JWT, isLoggedIn, login, logout, client, clientReady, getCreditCard, removeCreditCard, addCreditCard };
});
