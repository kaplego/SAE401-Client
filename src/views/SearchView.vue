<script setup lang="ts">
import API from '@/assets/ts/api';
import { computed, ref, watchEffect } from 'vue';
import CardProduit from '@/components/ProductCard.vue';
import { useRouter } from 'vue-router';
import { Search } from 'lucide-vue-next';

const list = ref<Produit[] | null>(null);
const router = useRouter();
const query = computed(() => router.currentRoute.value.query.q as string | null);

watchEffect(() => {
	list.value = null;
	if (query.value && query.value.length > 0)
		API.products.search(query.value).then((p) => {
			list.value = p;
		});
});

const searchQuery = ref<string>('');
function searchProduct(event: SubmitEvent) {
	event.preventDefault();
	event.stopPropagation();
	if (searchQuery.value.length > 0) router.push('/search?q=' + encodeURIComponent(searchQuery.value));
}
</script>

<template>
	<main class="container" v-if="query && query !== ''">
		<h1 id="search-title">Recherche : {{ query }}</h1>
		<template v-if="list !== null">
			<p id="search-count">{{ list.length }} {{ list?.length == 1 ? 'résultat' : 'résultats' }}</p>
			<div class="grille-produits">
				<CardProduit v-for="produit in list" v-bind:key="produit.idproduit" :produit="produit" /></div
		></template>
		<template v-else>
			<div class="loading loading-lg">
				<div class="loading-spinner"></div>
			</div>
		</template>
	</main>
	<main class="container empty" v-else>
		<h1><label for="searchinput">Rechercher un produit</label></h1>
		<form :onsubmit="searchProduct" id="searchbar">
			<input id="searchinput" type="text" placeholder="Chaise, canapé, ..." v-model="searchQuery" />
			<button type="submit"><Search /></button>
		</form>
	</main>
</template>

<style scoped lang="scss">
.grille-produits {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
}

#search-title {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 4px;
}

#search-count {
	margin-bottom: 1rem;
	font-size: 1.25rem;
}

.container.empty {
	margin-top: 4rem;
	margin-bottom: 4rem;
	h1 {
		text-align: center;
	}
}

#searchbar {
	width: 50%;
	display: grid;
	grid-template-columns: 1fr auto;
	margin: 0 auto;
	outline: 0px solid var(--t-border1-accent);
	transition: all 100ms;
	border-radius: 12px;

	input {
		padding: 0.75rem 1.25rem;
		font-size: 1.5rem;
		border-radius: 12px 0 0 12px;
		border: 2px solid var(--t-border1-accent);
		outline: none;
	}

	button {
		padding: 0.75rem 1.25rem;
		font-size: 1.5rem;
		border-radius: 0 12px 12px 0;
		border: 2px solid var(--t-border1-accent);
		background-color: var(--t-border1-accent);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	&:focus-within {
		outline-width: 2px;
	}
}
</style>
