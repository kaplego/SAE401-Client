<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import InputControl from '@/components/inputs/InputControl.vue';
import { ArrowLeft } from 'lucide-vue-next';
import FormPopupWindow from '@/components/windows/FormPopupWindow.vue';
import PopupWindow from '@/components/windows/PopupWindow.vue';
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

const popupAdd = usePopup<
	{
		idpays: string;
		nomville: string;
		nomadresse: string;
		numerorue: string;
		nomrue: string;
		nomdepartement: string;
		codepostaladresse: string;
	},
	boolean
>(false, {
	idpays: '',
	nomville: '',
	nomdepartement: '',
	nomadresse: '',
	numerorue: '',
	nomrue: '',
	codepostaladresse: '',
});

const popupEdit = ref<Adresse | null>(null);
const removeAddress = ref<Adresse | null>(null);

function addAddressSubmit(event: SubmitEvent) {
	event.preventDefault();
	if (!login.client) return (popupAdd.isOpen.value = false);
	popupAdd.isLoading.value = true;
	popupAdd.error.value = null;

	const iddepartement = departements.list.find(
			(d) =>
				d.nomdepartement?.toUpperCase() ?? d.iddepartement.toString() === popupAdd.model.value.nomdepartement,
		)?.iddepartement,
		codeinsee = villes.list.find(
			(d) => d.nomville?.toUpperCase() ?? d.codeinsee.toString() === popupAdd.model.value.nomville,
		)?.codeinsee;

	if (!iddepartement || !codeinsee) {
		popupAdd.isLoading.value = false;
		popupAdd.error.value = 'Le département ou la ville ne sont pas corrects.';
		return;
	}

	API.addresses
		.create({
			idclient: login.client.idclient,
			iddepartement,
			codeinsee,
			codepostaladresse: popupAdd.model.value.codepostaladresse,
			nomadresse: popupAdd.model.value.nomadresse,
			numerorue: popupAdd.model.value.numerorue,
			nomrue: popupAdd.model.value.nomrue,
			idpays: +popupAdd.model.value.idpays,
		})
		.then(async (cb) => {
			if (cb) {
				await login.refresh();
				popupAdd.isOpen.value = false;
				popupAdd.error.value = null;
			} else popupAdd.error.value = "Une erreur s'est produite.";

			popupAdd.isLoading.value = false;
		});
}
</script>

<template>
	<main class="container">
		<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
		<template v-if="login.client !== null">
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
				v-if="popupEdit"
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
				@close="() => (popupEdit = null)"
			>
				<InputControl name="nomadresse" label="Nom de l'adresse" :value="popupEdit.nomadresse" />
				<InputControl name="numerorue" label="Numéro de la rue" :value="popupEdit.numerorue" required />
				<InputControl name="nomrue" label="Nom de la rue" :value="popupEdit.nomrue" required />
				<InputControl
					name="codepostal"
					label="Code postal de l'adresse"
					:value="popupEdit.codepostaladresse"
					required
				/>
			</FormPopupWindow>
			<PopupWindow
				v-if="removeAddress"
				:buttons="[
					{
						label: 'Annuler',
						style: 'secondary',
						value: 'cancel',
					},
					{
						label: 'Confirmer',
						style: 'danger',
						value: 'confirm',
					},
				]"
				@close="
					(value) => {
						if (value === 'cancel') removeAddress = null;
					}
				"
			>
			</PopupWindow>
			<h1>Mes adresses</h1>

			<button id="add-address" class="button button-sm" @click="() => (popupAdd.isOpen.value = true)">
				Ajouter une adresse
			</button>
			<div></div>
			<div class="card-address" v-for="address in login.client.adressesNavigation" v-bind:key="address.idadresse">
				<div class="title-address">
					{{ address.nomadresse ?? 'Aucun nom' }}
				</div>
				<div>
					{{ address.numerorue }} {{ address.nomrue }}, {{ address.codepostaladresse }}
					{{ address.villeNavigation.nomville }}, {{ address.payNavigation.nompays }}
				</div>
				<div class="div-button-suppr-modif">
					<button class="button button-sm button-suppr">Supprimer l'adresse</button>
					<button class="button button-sm button-modif" @click="() => (popupEdit = address)">
						Modifier l'adresse
					</button>
				</div>
			</div>
			<div></div>
			{{ login.client.adressesNavigation }}
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style scoped lang="scss">
h1 {
	margin-bottom: 1rem;
}
.card-address {
	border: solid;
	padding: 1rem 2rem;
	display: inline-block;
	border-color: var(--t-border2);
	border-radius: 1rem;
	background-color: var(--t-background1);
}
.title-address {
	font-weight: 1000;
	margin-bottom: 1em;
}
#add-address {
	margin-bottom: 1em;
}
.button-suppr,
.button-modif {
	margin-top: 1rem;
}
.div-button-suppr-modif {
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
#button-add-address-div {
	display: flex;
	justify-content: center;
}
</style>
