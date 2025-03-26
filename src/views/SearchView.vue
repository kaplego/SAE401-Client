<script setup lang="ts">
import API from '@/assets/ts/api';
import { ref, watchEffect } from 'vue';
import CardProduit from '@/components/CardProduit.vue';
import { useRouter } from 'vue-router';

const list = ref<Produit[] | null>(null);
watchEffect(() => {
	API.products.search(useRouter().currentRoute.value.query.q as string).then((p) => {
		list.value = p;
	});
});

console.log(list);
</script>

<template>
<div v-if="list !== null" class="grille-produits">
			<CardProduit v-for="produit in list" v-bind:key="produit.idproduit" :produit="produit" />
		</div>
		<template v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</template>
</template>

<style scoped>

</style>
