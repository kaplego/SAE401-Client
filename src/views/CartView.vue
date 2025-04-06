<script setup lang="ts">
import CardProduitCart from '@/components/CardProduitCart.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
</script>

<template>
	<main class="container">
		<h1>
			Mon panier <template v-if="cart.count > 0">({{ cart.count }})</template>
		</h1>
		<div id="cart">
			<div id="cart-list">
				<LoadingSpinner v-if="cart.isListLoading" />
				<div class="cart-empty" v-else-if="cart.count === 0">Votre panier est vide.</div>
				<CardProduitCart
					v-else
					v-for="item in cart.list"
					v-bind:key="`${item.idcouleur}${item.idproduit}`"
					:coloration="item"
					:quantite="item.quantitepanier"
				/>
			</div>
			<div class="v-separator"></div>
			<div id="cart-details">
				<p>Résumé du panier</p>
				<div class="separator"></div>
				<p>Prix total : {{ cart.price.toFixed(2) }} €</p>
			</div>
		</div>
	</main>
</template>

<style lang="scss" scoped>
#cart {
	display: grid;
	grid-template-columns: 2fr 1px 1fr;
	gap: 1rem;

	#cart-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;
		overflow: hidden;
	}

	.v-separator {
		background-color: var(--t-border1);
	}

	#cart-details {
		height: max-content;
		padding: 3rem 1rem;
		font-family: 'Courier New', Courier, monospace;
		background-color: var(--c-blackAlpha-100);
		position: sticky;
		top: 1.5rem;
		clip-path: polygon(
			0 0,
			calc(1 / 24 * 100%) 0.75em,
			calc(2 / 24 * 100%) 0,
			calc(3 / 24 * 100%) 0.75em,
			calc(4 / 24 * 100%) 0,
			calc(5 / 24 * 100%) 0.75em,
			calc(6 / 24 * 100%) 0,
			calc(7 / 24 * 100%) 0.75em,
			calc(8 / 24 * 100%) 0,
			calc(9 / 24 * 100%) 0.75em,
			calc(10 / 24 * 100%) 0,
			calc(11 / 24 * 100%) 0.75em,
			calc(12 / 24 * 100%) 0,
			calc(13 / 24 * 100%) 0.75em,
			calc(14 / 24 * 100%) 0,
			calc(15 / 24 * 100%) 0.75em,
			calc(16 / 24 * 100%) 0,
			calc(17 / 24 * 100%) 0.75em,
			calc(18 / 24 * 100%) 0,
			calc(19 / 24 * 100%) 0.75em,
			calc(20 / 24 * 100%) 0,
			calc(21 / 24 * 100%) 0.75em,
			calc(22 / 24 * 100%) 0,
			calc(23 / 24 * 100%) 0.75em,
			calc(24 / 24 * 100%) 0,
			100% 0,
			100% 100%,
			calc(24 / 24 * 100%) calc(100% - 0em),
			calc(23 / 24 * 100%) calc(100% - 0.75em),
			calc(22 / 24 * 100%) calc(100% - 0em),
			calc(21 / 24 * 100%) calc(100% - 0.75em),
			calc(20 / 24 * 100%) calc(100% - 0em),
			calc(19 / 24 * 100%) calc(100% - 0.75em),
			calc(18 / 24 * 100%) calc(100% - 0em),
			calc(17 / 24 * 100%) calc(100% - 0.75em),
			calc(16 / 24 * 100%) calc(100% - 0em),
			calc(15 / 24 * 100%) calc(100% - 0.75em),
			calc(14 / 24 * 100%) calc(100% - 0em),
			calc(13 / 24 * 100%) calc(100% - 0.75em),
			calc(12 / 24 * 100%) calc(100% - 0em),
			calc(11 / 24 * 100%) calc(100% - 0.75em),
			calc(10 / 24 * 100%) calc(100% - 0em),
			calc(9 / 24 * 100%) calc(100% - 0.75em),
			calc(8 / 24 * 100%) calc(100% - 0em),
			calc(7 / 24 * 100%) calc(100% - 0.75em),
			calc(6 / 24 * 100%) calc(100% - 0em),
			calc(5 / 24 * 100%) calc(100% - 0.75em),
			calc(4 / 24 * 100%) calc(100% - 0em),
			calc(3 / 24 * 100%) calc(100% - 0.75em),
			calc(2 / 24 * 100%) calc(100% - 0em),
			calc(1 / 24 * 100%) calc(100% - 0.75em),
			0 100%
		);

		.separator {
			height: 1px;
			width: 100%;
			background-color: var(--c-blackAlpha-200);
			margin: 1rem 0;
		}
	}
}
.theme-dark #cart #cart-details {
	background-color: var(--c-whiteAlpha-800);
	color: black;
}
</style>
