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

if (!login.isLoggedIn) router.replace('/auth/connexion');

watchEffect(() => {
	if (login.clientReady && login.client === null) {
		login.logout();
		router.replace('/auth/connexion');
	}
});

// Vérifier le statut de chaque carte bancaire
// afin d'afficher un message sur la tableau de bord du compte
const cardsExpiration = computed<{
	expired: CarteBancaire[];
	expiring: CarteBancaire[];
}>(() => {
	if (login.client === null) return { expired: [], expiring: [] };

	const expired: CarteBancaire[] = [],
		expiring: CarteBancaire[] = [];
	const now = new Date();
	now.setDate(0);
	now.setHours(0, 0, 0, 0);

	login.client.cartesNavigation.forEach((card) => {
		const expiration = new Date(card.dateexpirationcarte);
		expiration.setDate(0);
		expiration.setHours(0, 0, 0, 0);
		const expirationDiff = expiration.valueOf() - now.valueOf();
		// Si la carte est expirée ou expire prochainement,
		// l'ajouter à la liste correspondate
		if (expirationDiff < 0) {
			expired.push(card);
		} else if (expirationDiff < CARD_EXPIRATION_WARNING) {
			expiring.push(card);
		}
	});

	return { expired, expiring };
});
</script>

<template>
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
				link="/compte/informations-personelles"
			>
				<IdCard :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Informations bancaires"
				:subtitle="`Vous avez ${login.client.cartesNavigation.length} carte${login.client.cartesNavigation.length === 1 ? '' : 's'} bancaire.`"
				:error="
					cardsExpiration.expired.length > 0
						? `${cardsExpiration.expired.length} ${cardsExpiration.expired.length === 1 ? 'carte est expirée.' : 'cartes sont expirées.'}`
						: undefined
				"
				:warning="
					cardsExpiration.expiring.length > 0
						? `${cardsExpiration.expiring.length} ${cardsExpiration.expiring.length === 1 ? 'carte arrive à expiration.' : 'cartes arrivent à expiration.'}`
						: undefined
				"
				link="/compte/informations-bancaires"
			>
				<Landmark :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Adresses"
				:subtitle="`Vous avez enregistré ${login.client.adressesNavigation.length} adresse${login.client.adressesNavigation.length === 1 ? '' : 's'}`"
				link="/compte/adresses"
			>
				<MapPinHouse :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Favoris"
				:subtitle="`Vous avez ajouté ${login.client.aimesNavigation.length} favoris`"
				link="/compte/likes"
			>
				<Heart :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Avis"
				:subtitle="`Vous avez posté ${login.client.avisNavigation.length} avis`"
				link="/compte/avis"
			>
				<MessageSquareQuote :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Commandes"
				:subtitle="`Vous avez ${login.client.commandesNavigation.length} commande${login.client.commandesNavigation.length === 1 ? '' : 's'}`"
				link="/compte/orders"
			>
				<ReceiptText :stroke-width="1.5" />
			</CardAccount>
		</div>
	</template>
	<LoadingSpinner v-else />
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
