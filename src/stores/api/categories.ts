import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoriesStore = defineStore('categories', () => {
	const list = ref<Categorie[] | null>(null);

	API.categories.list().then((categories) => {
		list.value = categories;
	});

	return { list };
});
