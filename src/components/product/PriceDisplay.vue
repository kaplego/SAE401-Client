<script setup lang="ts">
withDefaults(
	defineProps<{
		basePrice: number;
		salePrice?: number | null;
	}>(),
	{
		salePrice: null,
	},
);
</script>

<template>
	<div class="price" v-if="salePrice != null">
		<div class="onSalePrice">{{ salePrice.toFixed(2) }} €</div>
		<div class="sellingPrice">{{ basePrice.toFixed(2) }} €</div>
	</div>
	<div class="price" v-else>
		<div class="sellingPrice">{{ basePrice.toFixed(2) }} €</div>
	</div>
</template>

<style lang="scss" scoped>
.price {
	display: inline-flex;
	gap: 0.5rem;

	.sellingPrice {
		font-weight: bold;
	}
	.onSalePrice {
		font-weight: bold;
		color: var(--c-red-500);

		& + .sellingPrice {
			text-decoration: line-through;
			opacity: 0.6;
			font-weight: normal;
		}
	}
}
</style>
