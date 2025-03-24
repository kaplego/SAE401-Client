<script setup lang="ts">
import { useCategoriesStore } from '@/stores/api/categories';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import CardProduit from '@/components/CardProduit.vue';
import { getProductsByCategory } from '@/assets/ts/api/produits';

const list = ref<Produit[] | null>(null);
const category = ref<Categorie>();
const router = useRouter();

watchEffect(() => {
	const idCategory = router.currentRoute.value.params.id as string;
	getProductsByCategory(idCategory).then((produits) => (list.value = produits));
	const categories = useCategoriesStore();
	category.value = categories.list?.find((c) => c.idcategorie == +idCategory);
});
</script>

<template>
	<main class="home container">
		<h1>{{ category?.nomcategorie }}</h1>
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

<style lang="scss">
.grille-produits {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
}
</style>
