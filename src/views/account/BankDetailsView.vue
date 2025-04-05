<script setup lang="ts">
import API from '@/assets/ts/api';
import usePopup from '@/assets/ts/usePopup';
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

const popup = usePopup(false);
function addCard(event: SubmitEvent) {
	if (!login.client) return (popup.isOpen.value = false);
	popup.isLoading.value = true;
	popup.error.value = null;

	const data = new FormData(event.target as HTMLFormElement);

	if (
		login.client.cartesNavigation.find(
			(c) => c.numcartebancaire.replace(/ /g, '') === (data.get('number') as string).replace(/ /g, ''),
		)
	) {
		popup.isLoading.value = false;
		popup.error.value = 'La carte est déjà associée au compte.';
		return;
	}

	API.cartes
		.create({
			idclient: login.client.idclient,
			nomcartebancaire: data.get('name') as string,
			titulairecartebancaire: data.get('titulaire') as string,
			numcartebancaire: data.get('number') as string,
			dateexpirationcarte: new Date(+(data.get('exp-year') as string), +(data.get('exp-month') as string) - 1),
		})
		.then(async (cb) => {
			if (cb) {
				await login.refresh();
				popup.isOpen.value = false;
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
			<StyledButton buttonSize="sm" @click="popup.isOpen.value = true">Ajouter une carte bancaire</StyledButton>
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
		v-if="popup.isOpen.value"
		:onClose="(value) => value ?? (popup.isOpen.value = false)"
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
				addCard(event as SubmitEvent);
			}
		"
	>
		<InputControl label="Libellé de la carte" name="name" />
		<InputControl label="Titulaire de la carte" name="titulaire" required />
		<InputControl
			label="Numéro de carte"
			name="number"
			required
			pattern="^(\d{4} \d{4} \d{4} \d{4})|(\d{4}\d{4}\d{4}\d{4})$"
		/>
		<div class="flex-row">
			<InputControl label="Mois d'expiration" name="exp-month" required type="number" :min="1" :max="12" />
			<InputControl
				label="Année d'expiration"
				name="exp-year"
				required
				type="number"
				:min="new Date().getFullYear()"
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
