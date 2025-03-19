import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductsStore = defineStore('products', () => {
	const list = ref<Produit[] | null>(null);

	axios.get('https://api.miliboo.lou-magnenat.tech/api/produits/getallproduit').then((res) => {
		list.value = res.data;
	});

	return { list };
});
