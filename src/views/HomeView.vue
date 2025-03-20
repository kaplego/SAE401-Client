<script setup lang="ts">
import CardProduit from '@/components/CardProduit.vue';
import { useProductsStore } from '@/stores/api/products';

const products = useProductsStore();
</script>

<template>
	<main class="home container">
		<h1>Produits</h1>
		<div v-if="products.list !== null" class="grille-produits">
			<CardProduit v-for="produit in products.list" v-bind:key="produit.idproduit" :produit="produit" />
		</div>
		<div v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.grille-produits {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
}
</style>
