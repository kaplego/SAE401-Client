<script setup lang="ts">
withDefaults(
	defineProps<{
		sellingPrice: number;
		onSalePrice?: number | null;
	}>(),
	{
		onSalePrice: null,
	},
);
</script>

<template>
	<div class="price" v-if="onSalePrice != null">
		<div class="onSalePrice">{{ onSalePrice }} €</div>
		<div class="sellingPrice">{{ sellingPrice }} €</div>
	</div>
	<div class="price" v-else>
		<div class="sellingPrice">{{ sellingPrice }} €</div>
	</div>
</template>

<style lang="scss" scoped>
.price {
	display: inline-flex;
	gap: 0.5rem;

	.sellingPrice {
		&:not(:has(~ .onSalePrice)) {
			font-weight: bold;
		}
	}
	.onSalePrice {
		font-weight: bold;
		color: var(--c-red-500);

		& + .sellingPrice {
			text-decoration: line-through;
		}
	}
}
</style>
