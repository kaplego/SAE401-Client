<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PopupWindow from '@/components/PopupWindow.vue';
import InputControl from '@/components/inputs/InputControl.vue';
import SelectControl from '@/components/inputs/SelectControl.vue';

const router = useRouter();
const login = useLoggedInStore();
let selectedNomAdresse: string | null = "";
let selectedNumRue: string | null = "";
let selectedNomRue: string | null = "";
let selectedCodePostal: string | null = "";


if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});

function showAddAddressMenu() {
	const addAddressMenu: HTMLDivElement = document.querySelector('#add-address-menu')!;
	addAddressMenu.style.display = 'flex';
}
function showModifyAddressMenu(address: Adresse) {
	selectedNomAdresse = address.nomadresse;
	selectedNumRue = address.numerorue;
	selectedNomRue = address.nomrue;
	selectedCodePostal = address.codepostaladresse;
	const addAddressMenu: HTMLDivElement = document.querySelector('#modify-address-menu')!;
	addAddressMenu.style.display = 'flex';
}
// function hideAddAddressMenu() {
// 	const addAddressMenu: HTMLDivElement = document.querySelector('#add-address-menu')!;
// 	addAddressMenu.style.display = 'none';
// }
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<!-- ADD ADDRESS -->
			<PopupWindow id="add-address-menu">
				<div id="add-address-form">
					<div id="add-inputs-div">
						<!-- <SelectControl :name="'paysadresse'" :label="'Nom de l\'adresse'" /> -->
						<InputControl :name="'nomadresse'" :label="'Nom de l\'adresse'" />
						<InputControl :name="'numerorue'" :label="'Numéro de la rue'" />
						<InputControl :name="'nomrue'" :label="'Nom de la rue'" />
						<InputControl :name="'codepostal'" :label="'Code postal de l\'adresse'" />
					</div>
					<div id="button-add-address-div">
						<button class="button button-sm add-address-validate">Valider</button>
					</div>
				</div>
			</PopupWindow>
			<!-- MODIFY ADDRESS -->
			<PopupWindow id="modify-address-menu">
				<div id="modify-address-form">
					<div id="modify-inputs-div">
						<!-- <SelectControl :name="'paysadresse'" :label="'Nom de l\'adresse'" /> -->
						<InputControl :name="'nomadresse'" :label="'Nom de l\'adresse'" :value="`${selectedNomAdresse}`"/>
						<InputControl :name="'numerorue'" :label="'Numéro de la rue'" />
						<InputControl :name="'nomrue'" :label="'Nom de la rue'" />
						<InputControl :name="'codepostal'" :label="'Code postal de l\'adresse'" />
					</div>
					<div id="button-modify-address-div">
						<button class="button button-sm modify-address-validate">Valider</button>
					</div>
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
					<button class="button button-sm button-modif" @click="showModifyAddressMenu(address)">Modifier l'adresse</button>
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
#add-address-menu {
	display: none;
}
#add-address-form {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	// align-items: ;
	justify-content: space-around;
	height: 100%;
	padding: 2rem;
}
#add-inputs-div {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 80%;
}
#button-add-address-div {
	display: flex;
	justify-content: center;
}
</style>
