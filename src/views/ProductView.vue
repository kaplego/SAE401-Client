<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRouter } from 'vue-router';
import { Star } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import API from '@/assets/ts/api';
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const router = useRouter();
const product = ref<Produit | null>(null);
const chosenColoration = ref<Coloration>();

watchEffect(() => {
	API.products.get(router.currentRoute.value.params.id as string)
		.then((produit) => {
			product.value = produit;
			if (product.value)
				chosenColoration.value = product.value.colorationsNavigation[0]!;
		})

});

</script>

<template>
	<main class="container">
		<template v-if="product !== null">
			<div class="illustrations-card">
				<div class="images-card">
					<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
					<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
					<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
					<img src="https://placehold.co/800x800/PNG" :alt="product.nomproduit" class="photo" />
				</div>
				<div class="information-card">
					<div class="scroll-element">
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
							<div class="coloration" v-for="coloration in product.colorationsNavigation"
								v-bind:key="coloration.idcouleur"
								:style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"
								:data-tooltip="coloration.couleurNavigation.nomcouleur"
								@click="chosenColoration = coloration"></div>
						</div>
						<p v-if="chosenColoration!.prixsolde != null" class="pourcentage-reduction">-{{
							(100 - (chosenColoration!.prixsolde) / (chosenColoration!.prixvente) * 100).toFixed(0) }} %
						</p>
						<div class="prix-container">
							<p class="prix-solde">{{ chosenColoration!.prixsolde }}€ </p>
							<p v-if="chosenColoration!.prixvente != null" class="prix-base">{{
								chosenColoration!.prixvente
							}}€</p>
						</div>
						<div class="achat-component">
							<select id="product-amount-select">
								<option
									v-for="i in product.colorationsNavigation[chosenColoration!.idcouleur].quantitestock"
									v-bind:key="i" :value="i">{{ i }}</option>
							</select>
							<button id="buy-button">J'achète</button>
						</div>
					</div>

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
.achat-component {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
}

#product-amount-select {
	background-color: white;
	border: 1px solid black;
	border-radius: 5px;
	height: 70px;
	font-size: 20px;
	box-sizing: border-box;
	width: 70px;
	text-align: center;
	margin-right: 10%;
}

#buy-button {
	height: 70px;
	width: 210px;
	box-sizing: border-box;
	background-color: black;
	color: white;
	border: 1px solid black;
	border-radius: 5px;

}

.illustrations-card {
	display: flex;
}

.images-card {
	width: 100%;
}

.images-card img {
	width: 100%;
}

.information-card {
	position: relative;
	margin-left: 20px;

}

.scroll-element {
	width: 100%;
	align-items: center;
	justify-content: center;
	top: 0;
	position: sticky;
	height: min-content;
}

.prix-container {
	display: flex;
}

.prix-solde {}

.prix-base {
	margin-left: 15px;
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
