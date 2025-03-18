<script setup lang="ts">
import '@/assets/sass/home.scss';
import CardProduit from '@/components/CardProduit.vue';
import { useLoadingStore } from '@/stores/loading';
import axios from 'axios';
import { ref } from 'vue';

const loading = useLoadingStore();

const produits = ref<Produit[] | null>(null);

axios.get('https://api.miliboo.lou-magnenat.tech/api/produits').then((res) => {
	produits.value = res.data;
	loading.switchLoading(false);
});
</script>

<template>
	<nav id="navigationProduits">
		<div class="container">
			<div class="item">
				<p class="item-name">Canapés & Fauteuils</p>
				<div class="dropdown dropdown-columns">
					<div class="column">
						<p class="column-title">Titre</p>
						<p class="column-item">Item</p>
						<p class="column-item">Item</p>
					</div>
					<div class="column">
						<p class="column-title">Titre</p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
					</div>
				</div>
			</div>

			<p class="item">Chaise & Tabouret</p>

			<p class="item">Bureau</p>

			<p class="item">Table</p>

			<p class="item">Rangement</p>

			<p class="item">Chambre</p>

			<p class="item">Enfant</p>

			<p class="item">Jardin</p>

			<p class="item">Luminaire</p>

			<p class="item">Déco</p>

			<p class="item">Meubles reconditionnés</p>
		</div>
	</nav>
	<main class="home container">
		<h1>Produits</h1>
		<div v-if="produits !== null" class="grille-produits">
			<CardProduit v-for="produit in produits" v-bind:key="produit.idproduit" :produit="produit" />
		</div>
	</main>
</template>
<style scoped></style>
