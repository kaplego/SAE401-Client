<script setup lang="ts">
import { useCategoriesStore } from '@/stores/api/categories';
import axios from 'axios';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import CardProduit from '@/components/CardProduit.vue';

const list = ref<Produit[] | null>(null);
const category = ref<Categorie>();
const router = useRouter();

watchEffect(() => {
	const idCategory = router.currentRoute.value.params.id;
	axios.get('https://api.miliboo.lou-magnenat.tech/api/produits/getallproduitbycategorie/' + idCategory).then((res) => {
		list.value = res.data;
	});
	const categories = useCategoriesStore();
	category.value = categories.list?.find((c) => c.idcategorie == + idCategory);
});

</script>

<template>
	<main class="home container">
		<h1> {{ category?.nomcategorie }} </h1>
		<div v-if="list !== null" class="grille-produits">
			<CardProduit v-for="produit in list" v-bind:key="produit.idproduit" :produit="produit" />
		</div>
		<div v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</div>
	</main>
</template>