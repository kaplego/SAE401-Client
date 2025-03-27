<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRouter } from 'vue-router';
import { Star } from 'lucide-vue-next';
import { ref, watchEffect } from 'vue';
import API from '@/assets/ts/api';
import axios from 'axios';
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const router = useRouter();
const product = ref<Produit | null>(null);
const chosenColoration = ref<Coloration>();
const aspectTechnique = ref<string>();
const imagesColorationProduct = ref<Record<string, string[]>>({});
let photoIndexOutOfBounds = false;
const maxIteration = 10;

async function isPhotoAvailable(url: string): Promise<boolean> {
	try {
		// console.log(url)
		const content = await axios.get(url);
		console.log(content)
		const found = content.data.substr(0, 9) != "<!doctype"
		console.log(found)
		return found;
	} catch (_) {

	}
}
watchEffect(() => {
	API.products.get(router.currentRoute.value.params.id as string).then((produit) => {
		if (produit)
			axios.get(`/files/AspectTechnique/produit${produit.idproduit}.txt`).then((res) => {
				product.value = produit;
				chosenColoration.value = product.value.colorationsNavigation[0]!;
				aspectTechnique.value = res.data;
			});

		produit!.colorationsNavigation.forEach((color) => {
			let i = 1;
			while (!photoIndexOutOfBounds && i < maxIteration) {
				const url = `/img/imagesProduit/Produit${((produit!.idproduit+'').length<2?'0':'')+produit!.idproduit}/produit${produit!.idproduit}_couleur${color.idcouleur}_photo${i}.jpg`;
				//console.log(url)


				isPhotoAvailable(url).then(isAvaliable => {
					if(isAvaliable){
						console.log("URL : "+url)
						console.log(imagesColorationProduct.value![color.idcouleur][i])
						if (!(color.idcouleur)){
							imagesColorationProduct.value![color.idcouleur][i] =
							`/img/imagesProduit/produit${produit!.idproduit}_couleur${color.idcouleur}_photo${i}.jpg`;
							console.log("AAAAAAAAA "+imagesColorationProduct.value)
						}

					}
					else {
						photoIndexOutOfBounds = true;
						console.log("out")
					}


				})
				i++;
				console.log(i)

			}
		});
	});
});
//console.log("AAAAAAAAAA :"+imagesColorationProduct.value[1][2])
</script>

<template>
	<div class="homebackground">
		<main class="container">
			<template v-if="product !== null">
				<div class="illustrations-card">

					<div class="images-card" v-for="image in imagesColorationProduct[chosenColoration?.idcouleur!]" v-bind:key="image">

						<img :src=image :alt="product.nomproduit" class="photo" />

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
								<div
									class="coloration"
									v-for="coloration in product.colorationsNavigation"
									v-bind:key="coloration.idcouleur"
									:style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"
									:data-tooltip="coloration.couleurNavigation.nomcouleur"
									@click="chosenColoration = coloration"
								></div>
							</div>
							<p v-if="chosenColoration!.prixsolde != null" class="pourcentage-reduction">
								-{{
									(100 - (chosenColoration!.prixsolde / chosenColoration!.prixvente) * 100).toFixed(0)
								}}
								%
							</p>
							<div class="prix-container">
								<p class="prix-solde">{{ chosenColoration!.prixsolde }}€</p>
								<p v-if="chosenColoration!.prixvente != null" class="prix-base">
									{{ chosenColoration!.prixvente }}€
								</p>
							</div>
							<div class="achat-component">
								<select id="product-amount-select">
									<option
										v-for="i in product.colorationsNavigation[chosenColoration!.idcouleur]
											.quantitestock"
										v-bind:key="i"
										:value="i"
									>
										{{ i }}
									</option>
								</select>
								<button id="buy-button">J'achète</button>
							</div>
						</div>
					</div>
				</div>
				<div id="technique">
					<h2>Aspect technique</h2>
					<p style="white-space: pre">{{ aspectTechnique }}</p>
				</div>

				<p>{{ product }}</p>
			</template>
			<template v-else>
				<div class="loading loading-lg">
					<div class="loading-spinner"></div>
				</div>
			</template>
		</main>
	</div>
</template>
<style lang="scss">
main {
	background-color: white;
	padding-right: 0 !important;
	padding-left: 0 !important;
}

#technique {
	padding: 1rem;
	background-color: var(--c-gray-200);
}
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
	padding-left: 1rem;
	padding-right: 1rem;
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
.homebackground {
	background-color: var(--c-gray-100);
}
.prix-solde {
}

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
