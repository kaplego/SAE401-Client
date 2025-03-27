<script setup lang="ts">
import { CARD_EXPIRATION_WARNING } from '@/assets/ts/utils';
import CardAccount from '@/components/CardAccount.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { Heart, IdCard, Landmark, MapPinHouse, MessageSquareQuote, ReceiptText } from 'lucide-vue-next';
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

const cardsExpiration = computed<['warning' | 'error', number]>(() => {
	if (login.client === null) return ['warning', 0];

	let status: 'warning' | 'error' = 'warning',
		count = 0;
	const now = new Date();
	now.setDate(0);
	now.setHours(0, 0, 0, 0);

	login.client.cartesNavigation.forEach((card) => {
		const expiration = new Date(card.dateexpirationcarte);
		expiration.setDate(0);
		expiration.setHours(0, 0, 0, 0);
		const expirationDiff = expiration.valueOf() - now.valueOf();
		if (expirationDiff < CARD_EXPIRATION_WARNING) {
			count++;
			if (expirationDiff < 0) status = 'error';
		}
	});

	return [status, count];
});
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<h1>Bienvenue, {{ login.client.prenomclient }}</h1>
			<button
				id="logout"
				class="button button-sm"
				@click="
					() => {
						login.logout();
						router.push('/');
					}
				"
			>
				Me déconnecter
			</button>
			<div id="cards-account">
				<CardAccount
					title="Informations personelles"
					subtitle="Nom, prénom, email..."
					link="/account/personnal-details"
				>
					<IdCard :stroke-width="1.5" />
				</CardAccount>
				<CardAccount
					title="Informations bancaires"
					:subtitle="`Vous avez ${login.client.cartesNavigation.length} carte${login.client.cartesNavigation.length === 1 ? '' : 's'} bancaire.`"
					link="/account/bank-details"
				>
					<div v-if="cardsExpiration[1] > 0" :class="`badge ${cardsExpiration[0]}`">
						{{ cardsExpiration[1] }}
					</div>
					<Landmark :stroke-width="1.5" />
				</CardAccount>
				<CardAccount
					title="Adresses"
					:subtitle="`Vous avez enregistré ${login.client.adressesNavigation.length} adresse${login.client.adressesNavigation.length === 1 ? '' : 's'}`"
					link="/account/addresses"
				>
					<MapPinHouse :stroke-width="1.5" />
				</CardAccount>
				<CardAccount
					title="Favoris"
					:subtitle="`Vous avez ajouté ${login.client.aimesNavigation.length} favoris`"
					link="/account/likes"
				>
					<Heart :stroke-width="1.5" />
				</CardAccount>
				<CardAccount
					title="Avis"
					:subtitle="`Vous avez posté ${login.client.avisNavigation.length} avis`"
					link="/account/reviews"
				>
					<MessageSquareQuote :stroke-width="1.5" />
				</CardAccount>
				<CardAccount
					title="Commandes"
					:subtitle="`Vous avez ${login.client.commandesNavigation.length} commande${login.client.commandesNavigation.length === 1 ? '' : 's'}`"
					link="/account/orders"
				>
					<ReceiptText :stroke-width="1.5" />
				</CardAccount>
			</div>
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style lang="scss" scoped>
#cards-account {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
}

h1 {
	margin-bottom: 0.5rem;
}

#logout {
	margin-bottom: 1rem;
}
</style>
