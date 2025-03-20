<script setup lang="ts">
import CardAccount from '@/components/CardAccount.vue';
import { Heart, IdCard, Landmark, MapPinHouse, MessageSquareQuote, ReceiptText } from 'lucide-vue-next';

const client: Client = {
	idclient: 0,
	nomclient: 'JEAN',
	prenomclient: 'Michel',
	emailclient: 'michel.jean@www.impots.gouv.fr',
	civiliteclient: 'X',
	datecreationcompte: new Date(2025, 2, 21),
	telportableclient: '33696969690',
	telfixeclient: null,
	hashmdp: 'fniezlorghlezksnd',
	pointfideliteclient: 0,
	newslettermiliboo: true,
	newsletterpartenaires: true,
	adressesNavigation: [],
	avisNavigation: [],
	cartesNavigation: [],
	codesNavigation: [],
	commandesNavigation: [],
	paniersProduitNavigation: [],
	aimesNavigation: [],
	paniersCompositionNavigation: [],
	historiquesNavigation: [],
	messagesNavigation: [],
	professionelNavigation: null,
};
</script>

<template>
	<main class="container">
		<h1>Bienvenue, {{ client.prenomclient }}</h1>
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
				:subtitle="`Vous avez ${client.cartesNavigation.length} carte${client.cartesNavigation.length === 1 ? '' : 's'} bancaire.`"
				link="/account/bank-details"
			>
				<Landmark :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Adresses"
				:subtitle="`Vous avez enregistré ${client.adressesNavigation.length} adresse${client.adressesNavigation.length === 1 ? '' : 's'}`"
				link="/account/addresses"
			>
				<MapPinHouse :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Favoris"
				:subtitle="`Vous avez ajouté ${client.aimesNavigation.length} favoris`"
				link="/account/likes"
			>
				<Heart :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Avis"
				:subtitle="`Vous avez posté ${client.avisNavigation.length} avis`"
				link="/account/reviews"
			>
				<MessageSquareQuote :stroke-width="1.5" />
			</CardAccount>
			<CardAccount
				title="Commandes"
				:subtitle="`Vous avez ${client.commandesNavigation.length} commande${client.commandesNavigation.length === 1 ? '' : 's'}`"
				link="/account/orders"
			>
				<ReceiptText :stroke-width="1.5" />
			</CardAccount>
		</div>
	</main>
</template>

<style lang="scss">
#cards-account {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
}
</style>
