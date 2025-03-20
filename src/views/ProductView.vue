<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useProductsStore } from '@/stores/api/products';
import { useRouter } from 'vue-router';
import { Star } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const router = useRouter();
const products = useProductsStore();
const product = ref<Produit | null>(null);
const chosenColoration = ref<Coloration>();

watchEffect(() => {
	product.value = products.list?.find((x: Produit) => x.idproduit.toString() == router.currentRoute.value.params.id) ?? null;
	if (product.value)
		chosenColoration.value = product.value.colorationsNavigation[0]!;
});

</script>

<template>
	<main v-if="product">
		<div class="container">
			<div class="illustrations-card">
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />

				<div class="information-card">
					<h1>{{ product?.nomproduit }}</h1>
					<a href="#description">Description détaillée</a>
					<div class="star-container">
						<Star />
						<Star />
						<Star />
						<Star />
						<Star />

						<p>({{ product.avisNavigation.length }} avis)</p>
					</div>
					<p>Coloris disponibles ({{ product.colorationsNavigation.length }})</p>

					<div class="colorations">
						<div
							class="coloration"
							v-for="coloration in product.colorationsNavigation"
							v-bind:key="coloration.idcouleur"
							:style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"
							:data-tooltip="coloration.couleurNavigation.nomcouleur"
							@click="chosenColoration = coloration"
						></div>
					</div>
					<p v-if="chosenColoration!.prixsolde!=null" class="pourcentage-reduction">-{{ (100-(chosenColoration!.prixsolde)/(chosenColoration!.prixvente)*100).toFixed(0) }} %</p>
					<div class="prix-container">
						<p class="prix-solde">{{ chosenColoration!.prixsolde }}€ </p>
						<p v-if="chosenColoration!.prixvente!=null" class="prix-base">{{ chosenColoration!.prixvente }}€</p>

					</div>
				</div>

			</div>
			<div id="description">
				<p></p>
			</div>

			<p>{{ product }}</p>
		</div>
	</main>
</template>
<style lang="scss">
.prix-container{
	display:flex;
}
.prix-solde{
}
.prix-base{
	margin-left:15px;
	text-decoration: line-through;
}
.colorations {
	display: flex;
	height: 20px;
	gap: 0.5rem;

	.coloration {
		aspect-ratio: 1;
		height: 100%;
		border: 1px solid var(--t-foreground1);
		background-color: var(--couleur);
		border-radius: 100vw;
	}
}
</style>
