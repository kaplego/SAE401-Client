<script setup lang="ts">
import { computed, ref } from 'vue';
import ImagePlaceholder from './placeholders/ImagePlaceholder.vue';
import ImageHover from './ImageHover.vue';

const props = defineProps<{
	coloration: Coloration;
	quantite: number;
}>();

// Récupérer les sources des photos
const photos = computed(() => props.coloration?.photocolsNavigation.map((p) => p.photoNavigation.sourcephoto));
const isHovered = ref<boolean>(false);

const totalPrice = computed(() => (props.coloration?.prixsolde ?? props.coloration?.prixvente ?? 0) * props.quantite);
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
					<div
						class="coloration"
						:style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"
						:data-tooltip-right="coloration.couleurNavigation.nomcouleur"
					></div>
				</div>
				<div class="cart-details">
					<p class="quantity">Quantité : {{ quantite }}</p>
					<p class="total-price">Prix total : {{ totalPrice.toFixed(2) }} €</p>
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
				height: 1.5em;
				width: 1.5em;
				border: 1px solid var(--t-foreground1);
				background-color: var(--couleur);
				border-radius: 100vw;
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
		}
	}
}
</style>
