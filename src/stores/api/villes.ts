import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVillesStore = defineStore('ville', () => {
	const list = ref<Ville[]>([]);

	API.villes.list().then((villes) => {
		list.value = villes;
	});

	return { list };
});
