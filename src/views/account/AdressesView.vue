<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import InputControl from '@/components/inputs/InputControl.vue';
import { ArrowLeft } from 'lucide-vue-next';
import FormPopupWindow from '@/components/windows/FormPopupWindow.vue';
import usePopup from '@/assets/ts/usePopup';
import { useVillesStore } from '@/stores/api/villes';
import { usePaysStore } from '@/stores/api/pays';
import SelectControl from '@/components/inputs/SelectControl.vue';
import { AutocompleteType } from '@/assets/ts/utils';
import { useDepartementsStore } from '@/stores/api/departements';
import API from '@/assets/ts/api';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

const pays = usePaysStore();
const departements = useDepartementsStore();
const villes = useVillesStore();

type AdresseModel = {
	idpays: string;
	nomville: string;
	nomadresse: string;
	numerorue: string;
	nomrue: string;
	nomdepartement: string;
	codepostaladresse: string;
};

function stringOrNull(value: string) {
	return value.length > 0 ? value : null;
}

function saveAddress(address: AdresseModel, popup: ReturnType<typeof usePopup>, update: number | null = null) {
	if (!login.client) return (popup.isOpen.value = false);
	popup.isLoading.value = true;
	popup.error.value = null;

	const iddepartement = departements.list.find(
			(d) =>
				d.nomdepartement?.toUpperCase() ?? d.iddepartement.toString() === popupAdd.model.value.nomdepartement,
		)?.iddepartement,
		codeinsee = villes.list.find(
			(d) => d.nomville?.toUpperCase() ?? d.codeinsee.toString() === address.nomville,
		)?.codeinsee;

	if (!iddepartement || !codeinsee) {
		popup.isLoading.value = false;
		popup.error.value = 'Le département ou la ville ne sont pas corrects.';
		return;
	}

	const addressBody = {
		idclient: login.client.idclient,
		iddepartement,
		codeinsee,
		codepostaladresse: address.codepostaladresse,
		nomadresse: stringOrNull(address.nomadresse),
		numerorue: stringOrNull(address.numerorue),
		nomrue: address.nomrue,
		idpays: +address.idpays,
	};
	(update !== null ? API.addresses.update({ ...addressBody, idadresse: update }) : API.addresses.create(addressBody)).then(
		async (cb) => {
			if (cb) {
				await login.refresh();
				popup.isOpen.value = false;
				popup.error.value = null;
			} else popup.error.value = "Une erreur s'est produite.";

			popup.isLoading.value = false;
		},
	);
}

const popupAdd = usePopup(false, {
	idpays: '',
	nomville: '',
	nomdepartement: '',
	nomadresse: '',
	numerorue: '',
	nomrue: '',
	codepostaladresse: '',
} as AdresseModel);
function addAddressSubmit(event: SubmitEvent) {
	event.preventDefault();
	saveAddress(popupAdd.model.value, popupAdd);
}

const popupEdit = usePopup<null | number, AdresseModel>(null, {
	idpays: '',
	nomville: '',
	nomdepartement: '',
	nomadresse: '',
	numerorue: '',
	nomrue: '',
	codepostaladresse: '',
});
function editAddressSubmit(event: SubmitEvent) {
	event.preventDefault();
	if (!popupEdit.isOpen.value) return;
	saveAddress(popupEdit.model.value, popupEdit, popupEdit.isOpen.value);
}

// const popupRemove = usePopup<null | number, undefined>(null);
// async function deleteAddressSubmit(event: SubmitEvent) {
// 	event.preventDefault();
// 	if (!popupRemove.isOpen.value) return;
// 	popupRemove.isLoading.value = true;

// 	const ok = await API.addresses.delete(popupRemove.isOpen.value);

// 	popupRemove.isLoading.value = false;
// 	if (ok) popupRemove.isOpen.value = null;
// 	else popupRemove.error.value = "Une erreur s'est produite.";
// }
</script>

<template>
	<main class="container">
		<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
		<template v-if="login.client !== null && departements.loaded && villes.loaded">
			<!-- ADD ADDRESS -->
			<FormPopupWindow
				v-if="popupAdd.isOpen.value"
				:buttons="[
					{
						label: 'Annuler',
						style: 'secondary',
						value: 'cancel',
						type: 'button',
					},
					{
						label: 'Enregistrer',
						style: 'primary',
						value: 'save',
						type: 'submit',
					},
				]"
				:is-loading="popupAdd.isLoading.value"
				@close="(v) => (v !== 'save' ? (popupAdd.isOpen.value = false) : null)"
				@submit="(e) => addAddressSubmit(e as SubmitEvent)"
			>
				<InputControl name="nomadresse" label="Nom de l'adresse" v-model="popupAdd.model.value.nomadresse" />
				<InputControl
					name="numerorue"
					label="Numéro de la rue"
					required
					v-model="popupAdd.model.value.numerorue"
				/>
				<InputControl name="nomrue" label="Nom de la rue" required v-model="popupAdd.model.value.nomrue" />
				<SelectControl
					name="pays"
					label="Pays"
					:options="{
						groupped: false,
						values: pays.list.map((p) => ({
							label: p.nompays,
							value: p.idpays.toString(),
						})),
					}"
					v-model="popupAdd.model.value.idpays"
				/>
				<InputControl
					name="departement"
					label="Département"
					:autocomplete="{
						type: AutocompleteType.ExactWithFallback,
						values: departements.list.map((d) => d.nomdepartement ?? d.iddepartement.toString()),
					}"
					v-model="popupAdd.model.value.nomdepartement"
					required
				/>
				<InputControl
					name="ville"
					label="Ville"
					:autocomplete="{
						type: AutocompleteType.ExactWithFallback,
						values: villes.list.map((v) => v.nomville ?? v.codeinsee),
					}"
					v-model="popupAdd.model.value.nomville"
					required
				/>
				<InputControl
					name="codepostal"
					label="Code postal de l'adresse"
					required
					pattern="^\d{5}$"
					v-model="popupAdd.model.value.codepostaladresse"
				/>
				<p class="form-error" v-if="popupAdd.error.value">{{ popupAdd.error.value }}</p>
			</FormPopupWindow>
			<!-- EDIT ADRESSE -->
			<FormPopupWindow
				v-if="popupEdit.isOpen.value"
				:buttons="[
					{
						label: 'Annuler',
						style: 'secondary',
						value: 'cancel',
						type: 'button',
					},
					{
						label: 'Enregistrer',
						style: 'primary',
						value: 'save',
						type: 'submit',
					},
				]"
				:is-loading="popupEdit.isLoading.value"
				@close="(v) => (v !== 'save' ? (popupEdit.isOpen.value = null) : null)"
				@submit="(e) => editAddressSubmit(e as SubmitEvent)"
			>
				<InputControl name="nomadresse" label="Nom de l'adresse" v-model="popupEdit.model.value.nomadresse" />
				<InputControl
					name="numerorue"
					label="Numéro de la rue"
					required
					v-model="popupEdit.model.value.numerorue"
				/>
				<InputControl name="nomrue" label="Nom de la rue" required v-model="popupEdit.model.value.nomrue" />
				<SelectControl
					name="pays"
					label="Pays"
					:options="{
						groupped: false,
						values: pays.list.map((p) => ({
							label: p.nompays,
							value: p.idpays.toString(),
						})),
					}"
					v-model="popupEdit.model.value.idpays"
				/>
				<InputControl
					name="departement"
					label="Département"
					:autocomplete="{
						type: AutocompleteType.ExactWithFallback,
						values: departements.list.map((d) => d.nomdepartement ?? d.iddepartement.toString()),
					}"
					v-model="popupEdit.model.value.nomdepartement"
					required
				/>
				<InputControl
					name="ville"
					label="Ville"
					:autocomplete="{
						type: AutocompleteType.ExactWithFallback,
						values: villes.list.map((v) => v.nomville ?? v.codeinsee),
					}"
					v-model="popupEdit.model.value.nomville"
					required
				/>
				<InputControl
					name="codepostal"
					label="Code postal de l'adresse"
					required
					pattern="^\d{5}$"
					v-model="popupEdit.model.value.codepostaladresse"
				/>
				<p class="form-error" v-if="popupEdit.error.value">{{ popupEdit.error.value }}</p>
			</FormPopupWindow>
			<!-- <FormPopupWindow
				v-if="popupRemove.isOpen.value"
				title="Confirmer la suppression"
				:buttons="[
					{
						label: 'Annuler',
						style: 'secondary',
						value: 'cancel',
						type: 'button',
					},
					{
						label: 'Confirmer',
						style: 'danger',
						value: 'confirm',
						type: 'submit',
					},
				]"
				@close="
					(value) => {
						if (value !== 'confirm') popupRemove.isOpen.value = null;
					}
				"
				@submit="(e) => deleteAddressSubmit(e as SubmitEvent)"
			>
				<h2>Êtes-vous sûr(e) de vouloir supprimer cette adresse ?</h2>
			</FormPopupWindow> -->
			<h1>Mes adresses</h1>

			<button id="add-address" class="button button-sm" @click="() => (popupAdd.isOpen.value = true)">
				Ajouter une adresse
			</button>
			<div id="addresses-container">
				<div
					class="card-address"
					v-for="address in login.client.adressesNavigation"
					v-bind:key="address.idadresse"
				>
					<div class="title-address">
						{{ stringOrNull(address.nomadresse ?? '') ?? 'Aucun nom' }}
					</div>
					<div>
						<p>{{ address.numerorue }} {{ address.nomrue }},</p>
						<p>{{ address.codepostaladresse }} {{ address.villeNavigation.nomville }},</p>
						<p>{{ address.payNavigation.nompays }}</p>
					</div>
					<div class="buttons-actions">
						<!-- <button class="button button-sm button-suppr" @click="popupRemove.isOpen.value = address.idadresse">
							Supprimer l'adresse
						</button> -->
						<button
							class="button button-sm button-modif"
							@click="
								() => {
									const dep = departements.list.find(
											(d) => d.iddepartement === address.iddepartement,
										),
										ville = villes.list.find((v) => v.codeinsee === address.codeinsee);
									popupEdit.model.value = {
										nomadresse: address.nomadresse ?? '',
										numerorue: address.numerorue ?? '',
										nomrue: address.nomrue,
										idpays: address.idpays.toString(),
										nomdepartement: dep?.nomdepartement ?? dep?.iddepartement.toString() ?? '',
										nomville: ville?.nomville ?? ville?.codeinsee ?? '',
										codepostaladresse: address.codepostaladresse,
									};
									popupEdit.isOpen.value = address.idadresse;
								}
							"
						>
							Modifier l'adresse
						</button>
					</div>
				</div>
			</div>
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style scoped lang="scss">
h1 {
	margin-bottom: 1rem;
}

#addresses-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;

	.card-address {
		border: solid var(--t-border2);
		padding: 1rem 2rem;
		display: inline-block;
		border-radius: 1rem;
		background-color: var(--t-background1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.title-address {
			font-weight: bold;
			font-size: 1.5em;
		}
	}

	.buttons-actions {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	.adresse-form-content {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		// align-items: ;
		justify-content: space-around;
		height: 100%;
		gap: 1rem;

		button {
			margin-left: auto;
		}
	}
}

#add-address {
	margin-bottom: 1em;
}
</style>
