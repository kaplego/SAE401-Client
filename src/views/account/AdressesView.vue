<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PopupWindow from '@/components/windows/BasePopupWindow.vue';
import InputControl from '@/components/inputs/InputControl.vue';
import { ArrowLeft } from 'lucide-vue-next';

const router = useRouter();
const login = useLoggedInStore();
let selectedNomAdresse: string | null = '';
let selectedNumRue: string | null = '';
let selectedNomRue: string | null = '';
let selectedCodePostal: string | null = '';

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

function showAddAddressMenu() {
	popupAdd.value = true;
}
function showModifyAddressMenu(address: Adresse) {
	selectedNomAdresse = address.nomadresse;
	selectedNumRue = address.numerorue;
	selectedNomRue = address.nomrue;
	selectedCodePostal = address.codepostaladresse;
	popupModify.value = true;
}

const popupAdd = ref<boolean>(false);
const popupModify = ref<boolean>(false);
</script>

<template>
	<main class="container">
		<RouterLink to="/account" class="button-text"><ArrowLeft /> Retour</RouterLink>
		<template v-if="login.client !== null">
			<!-- ADD ADDRESS -->
			<PopupWindow v-if="popupAdd" :onClose="() => (popupAdd = false)" title="Ajouter une adresse">
				<div class="adresse-form-content">
					<!-- <SelectControl :name="'paysadresse'" :label="'Nom de l\'adresse'" /> -->
					<InputControl name="nomadresse" label="Nom de l'adresse" required />
					<InputControl name="numerorue" label="Numéro de la rue" required />
					<InputControl name="nomrue" label="Nom de la rue" required />
					<InputControl name="codepostal" label="Code postal de l'adresse" required />
					<div id="button-add-address-div">
						<button class="button button add-address-validate">Valider</button>
					</div>
				</div>
			</PopupWindow>
			<!-- MODIFY ADDRESS -->
			<PopupWindow v-if="popupModify" :onClose="() => (popupModify = false)">
				<div class="adresse-form-content">
					<!-- <SelectControl :name="'paysadresse'" :label="'Nom de l\'adresse'" /> -->
					<InputControl name="nomadresse" label="Nom de l'adresse" :value="selectedNomAdresse" required />
					<InputControl name="numerorue" label="Numéro de la rue" :value="selectedNumRue" required />
					<InputControl name="nomrue" label="Nom de la rue" :value="selectedNomRue" required />
					<InputControl name="codepostal" label="Code postal de l'adresse" :value="selectedCodePostal" required />
					<button class="button">Valider</button>
				</div>
			</PopupWindow>
			<h1>Mes adresses</h1>

			<button id="add-address" class="button button-sm" @click="showAddAddressMenu()">Ajouter une adresse</button>
			<div></div>
			<div class="card-address" v-for="address in login.client.adressesNavigation" v-bind:key="address.idadresse">
				<div class="title-address">
					EEEEEE
					{{ address.nomadresse }}
				</div>
				<div>
					{{ address.numerorue }} {{ address.nomrue }}, {{ address.codepostaladresse }}
					{{ address.villeNavigation.nomville }}, {{ address.payNavigation.nompays }}
				</div>
				<div class="div-button-suppr-modif">
					<button class="button button-sm button-suppr">Supprimer l'adresse</button>
					<button class="button button-sm button-modif" @click="showModifyAddressMenu(address)">
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
