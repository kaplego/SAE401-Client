<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrderCard from '@/components/OrderCard.vue';
import { useLoggedInStore } from '@/stores/login';

const login = useLoggedInStore();
</script>

<template>
	<h1>Commandes</h1>
	<template v-if="login.client !== null">
		<div id="order-list">
			<OrderCard
				v-for="order in login.client?.commandesNavigation ?? []"
				v-bind:key="order.idcommande"
				:order="order"
			/>
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
