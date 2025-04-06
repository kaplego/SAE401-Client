<script setup lang="ts">
withDefaults(defineProps<{
	sellingPrice: number;
	onSalePrice: number | null;
}>(), {
	onSalePrice: null
});

</script>


<template>
	<div v-if="onSalePrice != null">
		<div class="sellingPrice strikethrough">
			{{ sellingPrice }} €
		</div>
		<div class="onSalePrice">
			{{ onSalePrice }} €
		</div>
	</div>
	<div v-else>
		<div class="sellingPrice">
			{{ sellingPrice }} €
		</div>
	</div>
</template>



<style scoped>
.sellingPrice {
	font-weight: bold;
}
.onSalePrice {
	font-weight: bolder;
}
.strikethrough{
	text-decoration: line-through;
}
</style>