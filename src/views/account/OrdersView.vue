<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrderCard from '@/components/OrderCard.vue';
import { useLoggedInStore } from '@/stores/login';
import { computed } from 'vue';

const login = useLoggedInStore();

const commandes = computed(() =>
	[...(login.client?.commandesNavigation ?? [])].sort(
		(a, b) => Date.parse(b.datecommande) - Date.parse(a.datecommande),
	),
);
</script>

<template>
	<h1>Commandes</h1>
	<template v-if="login.client !== null">
		<div id="order-list">
			<OrderCard v-for="order in commandes" v-bind:key="order.idcommande" :order="order" />
		</div>
	</template>
	<LoadingSpinner v-else />
</template>

<style lang="scss" scoped>
#order-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
