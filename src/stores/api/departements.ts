import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDepartementsStore = defineStore('departements', () => {
	const list = ref<Departement[]>([]);
	const loaded = ref<boolean>(false);

	API.departements.list().then((departements) => {
		list.value = departements;
		loaded.value = true;
	});

	return { list, loaded };
});
