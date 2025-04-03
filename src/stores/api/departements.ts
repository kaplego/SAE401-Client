import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDepartementsStore = defineStore('departements', () => {
	const list = ref<Departement[]>([]);

	API.departements.list().then((departements) => {
		list.value = departements;
	});

	return { list };
});
