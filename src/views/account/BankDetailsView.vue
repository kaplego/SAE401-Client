<script setup lang="ts">
import API from '@/assets/ts/api';
import usePopup from '@/assets/ts/usePopup';
import { cardNumberReverseFormat } from '@/assets/ts/utils';
import CarteBancaire from '@/components/CarteBancaire.vue';
import InputControl from '@/components/inputs/InputControl.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import StyledButton from '@/components/StyledButton.vue';
import FormPopupWindow from '@/components/windows/FormPopupWindow.vue';
import { useLoggedInStore } from '@/stores/login';
import { ArrowLeft } from 'lucide-vue-next';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

const popup = usePopup<
	boolean,
	{
		nom: string;
		titulaire: string;
		numero: string;
		expyear: string;
		expmonth: string;
	}
>(false, {
	nom: '',
	titulaire: '',
	numero: '',
	expyear: '',
	expmonth: '',
});
function addCard() {
	if (!login.client) return (popup.status.value = false);
	popup.isLoading.value = true;
	popup.error.value = null;

	// Vérifier que le nom de carte n'existe pas déjà pour ce compte
	if (login.client.cartesNavigation.find((c) => c.nomcartebancaire === popup.model.value.nom)) {
		popup.isLoading.value = false;
		popup.error.value = 'Une carte existe déjà avec ce nom.';
		return;
	}

	// Vérifier que la carte n'existe pas déjà pour ce compte
	if (
		login.client.cartesNavigation.find(
			(c) => c.numcartebancaire.replace(/ /g, '') === popup.model.value.numero.replace(/ /g, ''),
		)
	) {
		popup.isLoading.value = false;
		popup.error.value = 'La carte est déjà associée au compte.';
		return;
	}

	// Créer la carte dans l'API
	API.cartes
		.create({
			idclient: login.client.idclient,
			nomcartebancaire: popup.model.value.nom,
			titulairecartebancaire: popup.model.value.titulaire,
			numcartebancaire: cardNumberReverseFormat(popup.model.value.numero),
			dateexpirationcarte: new Date(+popup.model.value.expyear, +popup.model.value.expmonth - 1),
		})
		.then(async (cb) => {
			if (cb) {
				await login.refresh();
				popup.status.value = false;
				popup.error.value = null;
			} else popup.error.value = "Une erreur s'est produite.";
			popup.isLoading.value = false;
		});
}
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
			<h1>Mes informations bancaires</h1>
			<p>Appuiez sur une carte pour voir ses informations.</p>
			<StyledButton buttonSize="sm" @click="popup.status.value = true">Ajouter une carte bancaire</StyledButton>
			<div class="grille-cartes">
				<CarteBancaire
					v-for="card in login.client.cartesNavigation"
					v-bind:key="card.idcartebancaire"
					:card="card"
					deletable
				/>
			</div>
		</template>
		<LoadingSpinner v-else />
	</main>
	<FormPopupWindow
		v-if="popup.status.value"
		:onClose="(value) => value ?? (popup.status.value = false)"
		title="Ajouter une carte bancaire"
		:buttons="[
			{
				label: 'Enregistrer',
				style: 'primary',
				value: 'save',
				type: 'submit',
			},
		]"
		:is-loading="popup.isLoading.value"
		@submit="
			(event) => {
				event.preventDefault();
				addCard();
			}
		"
	>
		<InputControl label="Libellé de la carte" name="name" v-model="popup.model.value.nom" />
		<InputControl label="Titulaire de la carte" name="titulaire" required v-model="popup.model.value.titulaire" />
		<InputControl
			label="Numéro de carte"
			name="number"
			required
			pattern="^(\d{4} \d{4} \d{4} \d{4})|(\d{4}\d{4}\d{4}\d{4})$"
			v-model="popup.model.value.numero"
		/>
		<div class="flex-row">
			<InputControl
				label="Mois d'expiration"
				name="expmonth"
				required
				type="number"
				:min="1"
				:max="12"
				v-model="popup.model.value.expmonth"
			/>
			<InputControl
				label="Année d'expiration"
				name="expyear"
				required
				type="number"
				:min="new Date().getFullYear()"
				v-model="popup.model.value.expyear"
			/>
		</div>
		<p class="form-error" v-if="popup.error.value">{{ popup.error.value }}</p>
	</FormPopupWindow>
</template>

<style lang="scss" scoped>
h1 {
	margin-bottom: 0;

	& + p {
		margin: 1rem 0;
	}
}

.grille-cartes {
	width: 100%;
	// overflow: hidden;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 3rem;
	margin-top: 3rem;
	grid-auto-rows: 1fr;
}
</style>
