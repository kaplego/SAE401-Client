<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRouter } from 'vue-router';
import router from '@/router';
import { getProduct } from '@/assets/ts/api/produits';
import { ref } from 'vue';
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const product = ref<Produit | null>(null);

getProduct(useRouter().currentRoute.value.params.id as string).then((p) => {
	if (!p) router.push('/');
	product.value = p;
});
</script>

<template>
	<main class="container">
		<template v-if="product !== null">
			<div class="illustrations-card">
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />

				<div class="information-card">
					<h1>{{ product.nomproduit }}</h1>
					<a href="#description">Description détaillée</a>
					<div class="star-container">
						<span class="fa fa-star checked">★</span>
						<span class="fa fa-star checked">★</span>
						<span class="fa fa-star checked">★</span>
						<span class="fa fa-star">★</span>
						<span class="fa fa-star">★</span>
						<p>({{ product.avisNavigation.length }} avis)</p>
					</div>

					<!--<div class="color-container" v-for="color.couleurNavigation in product.colorationsNavigation"></div>-->
				</div>
			</div>
			<div id="description">
				<p></p>
			</div>

			<p>{{ product }}</p>
		</template>
		<template v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</template>
	</main>
</template>
<style lang="scss">
.star-container {
	padding: 0;
	display: flex;
	align-items: center;
}
.fa.fa-star {
	font-size: 15px;
}
</style>
