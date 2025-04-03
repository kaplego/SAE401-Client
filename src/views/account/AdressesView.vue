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

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

const pays = usePaysStore();
// const departements = useDepartementsStore();
const villes = useVillesStore();

const popupAdd = usePopup<
	{
		idpays: string;
		nomville: string;
		nomadresse: string;
		numerorue: string;
		nomrue: string;
		iddepartement: string;
		codepostaladresse: string;
	},
	boolean
>(false, {
	idpays: '',
	nomville: '',
	iddepartement: '',
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

	console.log(popupAdd.model.value);

	// const data = new FormData(event.target as HTMLFormElement);

	// API.addresses
	// 	.create({
	// 		idclient: login.client.idclient,
	// 		nomcartebancaire: data.get('name') as string,
	// 		titulairecartebancaire: data.get('titulaire') as string,
	// 		numcartebancaire: data.get('number') as string,
	// 		dateexpirationcarte: new Date(+(data.get('exp-year') as string), +(data.get('exp-month') as string) - 1),
	// 	})
	// 	.then(async (cb) => {
	// 		if (cb) {
	// 			await login.refresh();
	// 			popup.value = false;
	// 		}
	// 		isPopupLoading.value = false;
	// 		popupError.value = null;
	// 	});
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
