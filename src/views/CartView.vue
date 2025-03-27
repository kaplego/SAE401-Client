<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
</script>

<template>
	<main class="container">
		<h1>
			Mon panier <template v-if="cart.count > 0">({{ cart.count }})</template>
		</h1>
		<button @click="cart.addToCart(1, 2)">Ajouter</button>
		<button @click="cart.removeFromCart(1, 2)">Retirer</button>
		{{ cart.list }}
	</main>
</template>
