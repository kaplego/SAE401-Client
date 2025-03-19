<script setup lang="ts">
import CardProduit from '@/components/CardProduit.vue';
import { useProductsStore } from '@/stores/api/products';

const products = useProductsStore();
</script>

<template>
	<nav id="navigationProduits">
		<div class="container">
			<div class="item">
				<p class="item-name">Canapés & Fauteuils</p>
				<div class="dropdown dropdown-columns">
					<div class="column">
						<p class="column-title">Titre</p>
						<p class="column-item">Item</p>
						<p class="column-item">Item</p>
					</div>
					<div class="column">
						<p class="column-title">Titre</p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
						<p class="column-item"><RouterLink to="/test">Item</RouterLink></p>
					</div>
				</div>
			</div>

			<p class="item">Chaise & Tabouret</p>

			<p class="item">Bureau</p>

			<p class="item">Table</p>

			<p class="item">Rangement</p>

			<p class="item">Chambre</p>

			<p class="item">Enfant</p>

			<p class="item">Jardin</p>

			<p class="item">Luminaire</p>

			<p class="item">Déco</p>

			<p class="item">Meubles reconditionnés</p>
		</div>
	</nav>
	<main class="home container">
		<h1>Produits</h1>
		<div v-if="products.list !== null" class="grille-produits">
			<CardProduit v-for="produit in products.list" v-bind:key="produit.idproduit" :produit="produit" />
		</div>
		<div v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
#navigationProduits {
	display: flex;
	gap: 1rem;
	padding-bottom: 0;
}

#navigationProduits .item {
	user-select: none;
	cursor: pointer;
	transition: color 100ms;
	padding-bottom: 1rem;

	&:hover {
		.item-name,
		&:not(:has(.dropdown)) {
			color: var(--c-accent-500);
		}

		.dropdown {
			opacity: 1;
			scale: 1;
			padding: 1rem 2rem;
		}
	}

	.dropdown {
		transition: all 200ms;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		opacity: 0;
		scale: 1 0;
		transform-origin: top;
		overflow: auto;
		background-color: var(--t-background1-accent);
		border-radius: 0 0 6px 6px;
		cursor: auto;
		padding: 0rem 2rem;
		max-height: 300px;
		z-index: 100;

		&.dropdown-columns {
			display: grid;
			grid-template-rows: 100%;
			grid-auto-columns: 200px;
			grid-auto-flow: column;
			line-height: 1.5;

			.column-item {
				font-weight: 300;
				cursor: pointer;
				width: max-content;
				transition: color 100ms;

				&:hover {
					color: var(--c-accent-400);
				}

				a {
					color: inherit;
					text-decoration: none;
				}
			}
			.column-title {
				font-family: 'Rubik';
			}
		}
	}
}

.grille-produits {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
}
</style>
