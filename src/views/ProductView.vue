<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useProductsStore } from '@/stores/api/products';
import { useRouter, useRoute } from 'vue-router'
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const products = useProductsStore();
const product = products.list?.find((x:Produit) => x.idproduit.toString()==useRouter().currentRoute.value.params.id);

</script>

<template>
	<main>
		<div class="container">
			<div class="illustrations-card">
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />

				<div class="information-card">
					<h1>{{product?.nomproduit}}</h1>
					<a href="#description">Description détaillée</a>
					<div class="star-container">
						<span class="fa fa-star checked">★</span>
						<span class="fa fa-star checked">★</span>
						<span class="fa fa-star checked">★</span>
						<span class="fa fa-star">★</span>
						<span class="fa fa-star">★</span>
						<p>({{product?.avisNavigation.length}} avis)</p>
					</div>

				</div>
			</div>
			<div id="description">
				<p></p>
			</div>

            <p>{{product}}</p>
		</div>
	</main>
</template>
<style lang="scss">
	.star-container{
		padding:0;
		display:flex;
		align-item:center;

	}
	.fa.fa-star{
		font-size:15px;
	}
</style>
