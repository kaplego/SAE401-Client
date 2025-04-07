<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRouter } from 'vue-router';
import router from '@/router';
import { computed, ref, onMounted } from 'vue';
import API from '@/assets/ts/api';
import { Minus, Plus, Star } from 'lucide-vue-next';
import CarouselImage from '@/components/CarouselImage.vue';
import PriceDisplay from '@/components/product/PriceDisplay.vue';
import StyledButton from '@/components/StyledButton.vue';
import { useCartStore } from '@/stores/cart';
import InputControl from '@/components/inputs/InputControl.vue';
import ColorDisplay from '@/components/product/ColorDisplay.vue';
const isLoading = useLoadingStore();
isLoading.switchLoading(false);

const cart = useCartStore();
const product = ref<Produit | null>(null);
const fileText = ref<string>('');

const selectedColoration = ref<Coloration | null>(null);
const images = computed(
	() =>
		selectedColoration.value?.photocolsNavigation.reduce(
			(prev, curr) => {
				prev[0].push(curr.photoNavigation.sourcephoto);
				prev[1].push(curr.photoNavigation.descriptionphoto ?? `Photo ${curr.photoNavigation.idphoto}`);
				return prev;
			},
			[[], []] as [string[], string[]],
		) ?? null,
);

const cartQuantity = computed(() =>
	product.value && selectedColoration.value
		? cart.getQuantity(product.value.idproduit, selectedColoration.value.idcouleur)
		: 0,
);
function addToCart() {
	if (!selectedColoration.value || !product.value) return;
	cart.addToCart(product.value.idproduit, selectedColoration.value.idcouleur);
}
function removeFromCart() {
	if (!selectedColoration.value || !product.value) return;
	cart.removeFromCart(product.value.idproduit, selectedColoration.value.idcouleur);
}
function setQuantity(quantity: number) {
	if (!selectedColoration.value || !product.value) return;
	cart.setQuantity(product.value.idproduit, selectedColoration.value.idcouleur, quantity);
}

API.products.get(useRouter().currentRoute.value.params.id as string).then((p) => {
	if (!p) return router.push('/');
	product.value = p;
	selectedColoration.value = product.value!.colorationsNavigation[0];
});
onMounted(async () => {
	try {
		const response = await fetch(
			'./../../img/files/AspectTechnique/produit' + useRouter().currentRoute.value.params.id + '.txt',
		);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		fileText.value = await response.text();
	} catch (error) {
		console.error('Error fetching the text file:', error);
		fileText.value = 'Error loading content.';
	}
});
</script>

<template>
	<main class="container">
		<div id="product" v-if="product !== null">
			<CarouselImage class="carousel" v-if="images" :images="images[0]" :alts="images[1]" />
			<div class="v-separator"></div>
			<div id="details-produit">
				<div class="information-card">
					<h1>{{ product.nomproduit }}</h1>
					<div class="avis-produit">
						<Star fill="currentColor" />
						<Star fill="currentColor" />
						<Star fill="currentColor" />
						<Star />
						<Star />
						<p class="avis-nombre">({{ product.avisNavigation.length }} avis)</p>
					</div>

					<div id="price">
						<PriceDisplay
							v-if="selectedColoration"
							:basePrice="selectedColoration.prixvente"
							:salePrice="selectedColoration.prixsolde"
						/>
					</div>
				</div>

				<div id="color-selector">
					<ColorDisplay
						v-for="coloration of product.colorationsNavigation"
						v-bind:key="coloration.idcouleur"
						:color="coloration.couleurNavigation"
						size="40px"
						@click="selectedColoration = coloration"
						clickable
						:selected="selectedColoration === coloration"
					/>
				</div>

				<StyledButton
					v-if="!cart.isInCart(product.idproduit, selectedColoration?.idcouleur ?? -1)"
					buttonStyle="primary"
					:disabled="selectedColoration === null"
					@click="addToCart"
				>
					Ajouter au panier
				</StyledButton>
				<div v-else id="cart-number">
					<StyledButton buttonStyle="primary" :disabled="selectedColoration === null" @click="removeFromCart">
						<Minus />
					</StyledButton>
					<InputControl
						label="Quantité"
						:modelValue="cartQuantity.toString()"
						@update:modelValue="
							(value) => {
								if (!Number.isNaN(+value)) setQuantity(+value);
							}
						"
					/>
					<StyledButton buttonStyle="primary" :disabled="selectedColoration === null" @click="addToCart">
						<Plus />
					</StyledButton>
				</div>

				<p>Aspect Technique :</p>
				<div id="technical-aspect">
					{{ fileText }}
				</div>
				<p id="description">{{ selectedColoration?.descriptioncoloration }}</p>
			</div>

			<!-- <p>{{ product }}</p> -->
		</div>

		<template v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</template>
	</main>
</template>
<style lang="scss" scoped>
#product {
	display: grid;
	grid-template-columns: 1fr 1px 1fr;
	gap: 1rem;

	.carousel {
		width: 100%;
		max-width: 100%;
		overflow: hidden;
	}

	.v-separator {
		height: 100%;
		width: 100%;
		background-color: var(--t-background3);
	}

	#details-produit {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.information-card {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h1 {
				margin-bottom: 0;
			}
		}

		#cart-number {
			display: flex;
			gap: 1rem;
		}
	}
}
.avis-produit {
	padding: 0;
	display: flex;
	align-items: center;

	.avis-nombre {
		margin-left: 0.5rem;
	}
}
.fa.fa-star {
	font-size: 15px;
}
#color-selector {
	display: flex;
	gap: 0.5rem;
}
.color-dot {
	width: 40px;
	height: 40px;
	border-radius: 40px;
	border: solid 1px black;
	transition: all 100ms;

	&.selected {
		border-radius: 6px;
	}
}
#technical-aspect {
	white-space: pre-wrap;
}
</style>
