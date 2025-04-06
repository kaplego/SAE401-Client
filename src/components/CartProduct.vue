<script setup lang="ts">
import { computed, ref } from 'vue';
import ImagePlaceholder from './placeholders/ImagePlaceholder.vue';
import ImageHover from './ImageHover.vue';
import StyledButton from './StyledButton.vue';
import InputControl from './inputs/InputControl.vue';
import { useCartStore } from '@/stores/cart';
import { Minus, Plus } from 'lucide-vue-next';
import PriceDisplay from './PriceDisplay.vue';

const props = defineProps<{
	coloration: Coloration;
	quantite: number;
}>();

const cart = useCartStore();

// Récupérer les sources des photos
const photos = computed(() => props.coloration?.photocolsNavigation.map((p) => p.photoNavigation.sourcephoto));
const isHovered = ref<boolean>(false);

const totalSalePrice = computed(() =>
	props.coloration.prixsolde ? props.coloration.prixsolde * props.quantite : null,
);
const totalBasePrice = computed(() => (props.coloration.prixvente ?? 0) * props.quantite);

const cartQuantity = computed(() => cart.getQuantity(props.coloration.idproduit, props.coloration.idcouleur));
</script>

<template>
	<RouterLink :to="'/produits/' + props.coloration.idproduit" class="link-produit">
		<div class="card-produit" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
			<ImageHover
				v-if="photos.length > 1"
				:force-is-hovered="isHovered"
				:primary-src="`/img/img/${photos[0]}`"
				:hovered-src="`/img/img/${photos[1]}`"
			/>
			<ImagePlaceholder
				v-else
				:image-props="{
					src: photos.length === 1 ? `/img/img/${photos[0]}` : 'https://placehold.co/800x800/PNG?text=Photo',
					alt: coloration.produitNavigation.nomproduit,
				}"
			/>
			<div class="content">
				<div class="product-details">
					<p class="nom">{{ coloration.produitNavigation.nomproduit }}</p>
					<p class="prix">
						<template v-if="coloration.prixsolde !== null">
							<span class="prixsolde">{{ coloration.prixsolde }} €</span>
							<span class="prixvente-solde">{{ coloration.prixvente }} €</span>
						</template>
						<template v-else>{{ coloration.prixvente }} €</template>
					</p>
					<div class="coloration">
						<div class="couleur" :style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"></div>
						<p class="nom">{{ coloration.couleurNavigation.nomcouleur }}</p>
					</div>
				</div>
				<div class="cart-details">
					<div
						class="cart-quantity"
						@click="
							(e) => {
								e.preventDefault();
								e.stopPropagation();
							}
						"
					>
						<StyledButton
							buttonStyle="primary"
							button-size="sm"
							@click="cart.removeFromCart(coloration.idproduit, coloration.idcouleur)"
						>
							<Minus />
						</StyledButton>
						<InputControl
							label="Quantité"
							input-size="sm"
							:modelValue="cartQuantity.toString()"
							@update:modelValue="
								(value) => {
									if (!Number.isNaN(+value))
										cart.setQuantity(coloration.idproduit, coloration.idcouleur, +value);
								}
							"
						/>
						<StyledButton
							buttonStyle="primary"
							button-size="sm"
							@click="cart.addToCart(coloration.idproduit, coloration.idcouleur)"
						>
							<Plus />
						</StyledButton>
					</div>
					<p class="total-price">
						Prix total : <PriceDisplay :selling-price="totalBasePrice" :on-sale-price="totalSalePrice" />
					</p>
				</div>
			</div>
		</div>
	</RouterLink>
</template>

<style lang="scss">
.card-produit {
	img,
	.image-placeholder {
		aspect-ratio: 1;
		height: 100%;
		border-radius: 4px;
	}

	.cart-quantity {
		.input-control {
			--bg: var(--t-background2);
			width: 100px;
		}
	}

	&:hover .cart-quantity .input-control {
		--bg: var(--t-background1-accent);
	}
}
</style>

<style lang="scss" scoped>
.link-produit {
	text-decoration: none;
	overflow: hidden;
}

.card-produit {
	width: 100%;
	height: 150px;
	max-width: 100%;
	overflow: hidden;
	padding: 1rem;
	background-color: var(--t-background2);
	border: 2px solid var(--t-border1);
	border-radius: 12px;
	transition: all 100ms;
	position: relative;

	display: flex;
	gap: 1rem;

	&:hover {
		background-color: var(--t-background1-accent);
		border-color: var(--t-border1-accent);
	}

	.content {
		height: 100%;
		width: 100%;
		display: flex;
		gap: 1rem;

		.product-details {
			flex: 1;
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow: hidden;
			gap: 0.5rem;

			.nom {
				font-family: 'Rubik';
				overflow: hidden;
			}

			.prix {
				.prixsolde {
					color: var(--c-red-500);
					font-weight: bold;
					margin-right: 6px;
				}

				.prixvente-solde {
					text-decoration: line-through;
					font-weight: normal;
					color: var(--t-foreground3);
				}
			}

			.coloration {
				display: flex;
				align-items: center;
				border: 2px solid var(--t-background3);
				border-radius: 4px;
				width: max-content;

				.couleur {
					height: 100%;
					aspect-ratio: 1;
					background-color: var(--couleur);
					border-radius: 2px 0 0 2px;
				}

				.nom {
					padding: 0.125rem 0.5rem;
					background-color: var(--t-background3);
					border-radius: 0 2px 2px 0;
				}
			}
		}

		.cart-details {
			flex: 1;
			display: flex;
			align-items: flex-end;
			justify-content: flex-end;
			flex-direction: column;
			height: 100%;
			overflow: hidden;
			gap: 0.5rem;
			padding: 0.5rem 1rem;

			.cart-quantity {
				display: flex;
				gap: 0.5rem;
			}
		}
	}
}
</style>
