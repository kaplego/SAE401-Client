<script setup lang="ts">
import API from '@/assets/ts/api';
import InputControl from '@/components/inputs/InputControl.vue';
import SelectControl from '@/components/inputs/SelectControl.vue';
import SwitchControl from '@/components/inputs/SwitchControl.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import StyledButton from '@/components/StyledButton.vue';
import { useVillesStore } from '@/stores/api/villes';
import { useCartStore } from '@/stores/cart';
import { useLoggedInStore } from '@/stores/login';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const login = useLoggedInStore();
if (!login.isLoggedIn) router.replace(`/auth/connexion?redirect=/paiement`);
watch(login, () => {
	if (login.clientReady && login.client === null) {
		login.logout();
		router.replace(`/auth/connexion?redirect=/paiement`);
	}
});

const cart = useCartStore();

const dataModel = ref<{
	idtypepaiement: string;
	idcartebancaire: string;
	idadresselivr: string;
	idadressefact: string;
	avecassurance: boolean;
	aveclivraisonexpress: boolean;
	idtransporteur: string;
	instructionlivraison: string;
}>({
	idtypepaiement: '1',
	idcartebancaire: 'null',
	idadresselivr: '',
	idadressefact: 'same-delivery',
	avecassurance: false,
	aveclivraisonexpress: false,
	idtransporteur: '',
	instructionlivraison: '',
});

watch(dataModel.value, () => {
	if (dataModel.value.idtypepaiement !== '1') dataModel.value.idcartebancaire = 'null';
});

const status = ref<string | null>(null);

function submitHandler(event: Event) {
	event.preventDefault();
	event.stopPropagation();

	if (!login.client) return;

	status.value = 'Création de la commande...';

	API.commandes
		.create({
			idclient: login.client.idclient,
			idadresseLivr: +dataModel.value.idadresselivr,
			idtransporteur: +dataModel.value.idtransporteur,
			instructionlivraison:
				dataModel.value.instructionlivraison.length > 0 ? dataModel.value.instructionlivraison : null,
			aveclivraisonexpress: dataModel.value.aveclivraisonexpress,
			idadresseFact:
				dataModel.value.idadressefact === 'same-delivery'
					? +dataModel.value.idadresselivr
					: +dataModel.value.idadressefact,
			avecassurance: dataModel.value.avecassurance,
			idcodepromo: null,
			idstatut: 2,
		})
		.then((commande) => {
			if (commande.isSuccess()) {
				status.value = 'Ajout des produits...';
				Promise.all(
					cart.list.map((item) =>
						API.detailsCommande.create({
							idcommande: commande.value.idcommande,
							idcouleur: item.idcouleur,
							idproduit: item.idproduit,
							quantitecommande: item.quantitepanier,
						}),
					),
				).then(() => {
					status.value = 'Paiement en cours...';
					API.paiements
						.create({
							idcommande: commande.value.idcommande,
							idtypepaiement: +dataModel.value.idtypepaiement,
							idcartebancaire:
								dataModel.value.idtypepaiement === '1' ? +dataModel.value.idcartebancaire : null,
							montantpaiement: cart.price,
						})
						.then(() => {
							cart.clear();
							router.push(`/compte/commandes/${commande.value.idcommande}`);
						});
				});
			}
		});
}

const typesPaiement = ref<TypePaiement[] | null>(null);
API.typesPaiement.list().then((res) => {
	typesPaiement.value = res;
});
const transporteurs = ref<Transporteur[] | null>(null);
API.transporteurs.list().then((res) => {
	transporteurs.value = res;
});
const villes = useVillesStore();
</script>

<template>
	<main class="container" id="order-container">
		<h1>Finalisation de votre commande</h1>
		<form
			id="order-form"
			v-if="typesPaiement !== null && transporteurs !== null && login.client !== null && villes.loaded"
			@submit="submitHandler"
		>
			<div class="separator">Livraison</div>
			<SelectControl
				label="Adresse de livraison"
				id="idadresselivr"
				:options="{
					groupped: false,
					values: login.client.adressesNavigation.map((a) => ({
						label: `${a.nomadresse && a.nomadresse.length > 0 ? a.nomadresse : `${a.numerorue} ${a.nomrue}`}, ${villes.find(a.codeinsee)?.nomville ?? a.codeinsee}`,
						value: a.idadresse.toString(),
					})),
				}"
				required
				v-model="dataModel.idadresselivr"
			/>
			<SelectControl
				label="Transporteur"
				id="idtransporteur"
				:options="{
					groupped: false,
					values: transporteurs.map((t) => ({
						label: t.nomtransporteur,
						value: t.idtransporteur.toString(),
					})),
				}"
				required
				v-model="dataModel.idtransporteur"
			/>
			<InputControl
				label="Instructions supplémentaires"
				v-model="dataModel.instructionlivraison"
				id="instructionlivraison"
			/>
			<SwitchControl label="Livraison Express" name="express" v-model="dataModel.aveclivraisonexpress" />
			<div class="separator">Facturation et Assurance</div>
			<SelectControl
				label="Adresse de facturation"
				:options="{
					groupped: false,
					values: [
						{
							label: 'Même que l\'adresse de livraison',
							value: 'same-delivery',
						},
						...login.client.adressesNavigation.map((a) => ({
							label: `${a.nomadresse && a.nomadresse.length > 0 ? a.nomadresse : `${a.numerorue} ${a.nomrue}`}, ${villes.find(a.codeinsee)?.nomville ?? a.codeinsee}`,
							value: a.idadresse.toString(),
						})),
					],
				}"
				required
				v-model="dataModel.idadressefact"
			/>
			<SwitchControl label="Assurance" name="assurance" v-model="dataModel.avecassurance" />
			<div class="separator">Paiement</div>
			<SelectControl
				label="Type de paiement"
				:options="{
					groupped: false,
					values: typesPaiement.map((t) => ({
						label: t.nomtypepaiement,
						value: t.idtypepaiement.toString(),
					})),
				}"
				required
				v-model="dataModel.idtypepaiement"
			/>
			<SelectControl
				label="Carte bancaire"
				v-if="dataModel.idtypepaiement === '1'"
				:options="{
					groupped: false,
					values: login.client.cartesNavigation.map((cb) => ({
						label: `${cb.nomcartebancaire} (•••• •••• •••• ${cb.numcartebancaire.toString().slice(-4)})`,
						value: cb.idcartebancaire.toString(),
					})),
				}"
				required
				v-model="dataModel.idcartebancaire"
			/>
			<StyledButton type="submit" :disabled="status !== null">{{ status ?? 'Payer' }}</StyledButton>
		</form>
		<LoadingSpinner v-else />
	</main>
</template>

<style lang="scss">
#order-container {
	width: clamp(300px, 500px, 100%);
	padding-bottom: 3rem;

	#order-form {
		--gap: 1rem;
		display: flex;
		flex-direction: column;
		gap: var(--gap);

		.separator {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin: 1rem 0;

			&:first-child {
				margin-top: 0;
			}

			&::before,
			&::after {
				content: '';
				height: 1px;
				background-color: currentColor;
				flex: 1;
				opacity: 0.25;
			}
		}

		.input-control,
		.select-control {
			flex: 1 100%;
		}

		.button {
			width: 100%;
		}
	}
}
</style>
