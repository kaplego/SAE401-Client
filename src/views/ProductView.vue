<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useProductsStore } from '@/stores/api/products';
import { useRouter, useRoute } from 'vue-router'
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const products = useProductsStore();
const product = products.list?.find((x:Produit) => x.idproduit.toString()==useRouter().currentRoute.value.params.id);
console.log(product);
</script>

<template>
	<main>
		<div class="container">
			<h1>{{product?.nomproduit}}</h1>
            <p>{{product}}</p>
		</div>
	</main>
</template>
