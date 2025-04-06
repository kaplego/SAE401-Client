<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRouter } from 'vue-router';
import router from '@/router';
import { ref } from 'vue';
import API from '@/assets/ts/api';
import { Star } from 'lucide-vue-next';
import CarouselImage from '@/components/CarouselImage.vue';
import PriceDisplay from '@/components/PriceDisplay.vue';
const isLoading = useLoadingStore();
isLoading.switchLoading(false);
const product = ref<Produit | null>(null);
const images: string[] = [];
const currentColorObj: { image: string; color: string; sellingPrice: number; onSalePrice: number | null; }[] = [];
const currentSellingPrice = ref<number>();
const currentOnSalePrice = ref<number | undefined | null>();

const filteredImages = ref<string[]>([]);


const rgb2hex = (rgb: any) =>
	`#${rgb
		.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
		.slice(1)
		.map((n: any) => parseInt(n, 10).toString(16).padStart(2, '0'))
		.join('')}`;

API.products.get(useRouter().currentRoute.value.params.id as string).then((p) => {
	if (!p) router.push('/');
	product.value = p;
	p?.colorationsNavigation.forEach((coloration) => {
		const color = '#' + coloration.couleurNavigation.rgbcouleur;

		coloration.photocolsNavigation.forEach((photocol) => {
			images.push(photocol.photoNavigation.sourcephoto);
			// filteredImages.value.push(photocol.photoNavigation.sourcephoto);
			currentColorObj.push({
				image: photocol.photoNavigation.sourcephoto,
				color: color,
				sellingPrice: coloration.prixvente,
				onSalePrice: coloration.prixsolde,
			});
		});
	});
}).then(() => {
	changeItemFromColor(currentColorObj[0].color);
});

function changeItemFromColor(hexColor: string){
	filteredImages.value = [];
	currentColorObj.forEach((obj) => {
		console.log(obj.color);
		if (obj.color == hexColor) {
			filteredImages.value.push(obj.image);
			currentSellingPrice.value = obj.sellingPrice;
			currentOnSalePrice.value = obj.onSalePrice;
		}
	});
}

function switch2Color500CestTropCher(div: HTMLDivElement) {
	const hexColor: string = rgb2hex(div.style.backgroundColor);

	changeItemFromColor(hexColor);
}
</script>

<template>
	<main class="container">
		<template v-if="product !== null">
			<div class="illustrations-card">
				<!-- <template v-for="coloration in product.colorationsNavigation">
					<img v-for="photocol in coloration.photocolsNavigation" :src='`/img/img/${photocol.photoNavigation.sourcephoto}`' alt="" v-bind:key="photocol.idphoto">
				</template>
				<img :src='`/img/img/${product.colorationsNavigation[0].photocolsNavigation[0].photoNavigation.sourcephoto}`' alt=""> -->

				<CarouselImage :images="filteredImages" />

				<div id="color-selector">
					<div
						v-for="coloration of product.colorationsNavigation"
						v-bind:key="coloration.idcouleur"
						class="color-dot"
						:style="`background-color: #${coloration.couleurNavigation.rgbcouleur};`"
						@click="
							(ev) => {
								switch2Color500CestTropCher(ev.target as HTMLDivElement);
							}
						"
					></div>
				</div>

				<div class="information-card">
					<h1>{{ product.nomproduit }}</h1>
					<a href="#description">Description détaillée</a>
					<div class="star-container">
						<span class="fa fa-star checked"><Star /></span>
						<span class="fa fa-star checked"><Star /></span>
						<span class="fa fa-star checked"><Star /></span>
						<span class="fa fa-star"><Star /></span>
						<span class="fa fa-star"><Star /></span>
						<p>({{ product.avisNavigation.length }} avis)</p>
					</div>


					<div id="price">
						<PriceDisplay :sellingPrice="currentSellingPrice!" :onSalePrice="currentOnSalePrice"/>
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
.star-container {
	padding: 0;
	display: flex;
	align-items: center;
}
.fa.fa-star {
	font-size: 15px;
}
#color-selector {
	display: flex;
}
.color-dot {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: solid 1px black;
}
</style>
