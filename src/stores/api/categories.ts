import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoriesStore = defineStore('categories', () => {
	const list = ref<Categorie[] | null>(null);

	axios.get('https://api.miliboo.lou-magnenat.tech/api/categorie/GetAllCategorie').then((res) => {
		list.value = res.data;
	});

	return { list };
});
