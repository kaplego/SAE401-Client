<script setup lang="ts">
import API from '@/assets/ts/api';
import { ref, watchEffect } from 'vue';
import CardProduit from '@/components/CardProduit.vue';
import { useRouter } from 'vue-router';

const list = ref<Produit[] | null>(null);
const router = useRouter();

watchEffect(() => {
	API.products.search(router.currentRoute.value.query.q as string).then((p) => {
		list.value = p;
	});
});

console.log(list);
</script>

<template>
	<main class="container">
		<h1 id="search-title">Recherche : {{ router.currentRoute.value.query.q }}</h1>
		<p>{{ list?.length }} {{ list?.length == 1 ? "résultat" : "résultats" }}</p>
		<div v-if="list !== null" class="grille-produits">
			<CardProduit v-for="produit in list" v-bind:key="produit.idproduit" :produit="produit" />
		</div>
		<template v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</template>
	</main>
</template>

<style scoped>
.grille-produits {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
}

#search-title {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 0.5em;
}
</style>
