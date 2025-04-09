<script setup lang="ts">
import { OrdersSortMode } from '@/assets/ts/utils';
import SelectControl from '@/components/inputs/SelectControl.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import OrderCard from '@/components/OrderCard.vue';
import { useLoggedInStore } from '@/stores/login';
import { ref } from 'vue';

const login = useLoggedInStore();

const sortMode = ref<OrdersSortMode>(OrdersSortMode.Date);
</script>

<template>
	<h1>Commandes</h1>
	<template v-if="login.client !== null">
		<SelectControl
			label="Trier par"
			:options="{ groupped: false, values: Object.values(OrdersSortMode).map((v) => ({ label: v, value: v })) }"
			v-model="sortMode"
		/>
		<div id="order-list">
			<OrderCard v-for="order in login.client.commandesNavigation" v-bind:key="order.idcommande" :order="order" :sort-by="sortMode" />
		</div>
	</template>
	<LoadingSpinner v-else />
</template>

<style lang="scss" scoped>
#order-list {
	display: flex;
	flex-direction: column-reverse;
	gap: 1rem;
	margin-top: 1.5rem;
}
</style>
