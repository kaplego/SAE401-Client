import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVillesStore = defineStore('ville', () => {
	const list = ref<Ville[]>([]);
	const loaded = ref<boolean>(false);

	API.villes.list().then((villes) => {
		list.value = villes;
		loaded.value = true;
	});

	return { list, loaded };
});
