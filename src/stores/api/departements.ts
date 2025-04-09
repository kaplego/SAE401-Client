import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDepartementsStore = defineStore('departements', () => {
	const list = ref<Departement[]>([]);
	const loaded = ref<boolean>(false);

	API.departements.list().then((departements) => {
		list.value = departements;
		loaded.value = true;
		events.value.forEach((e) => e());
	});

	const events = ref<(() => unknown)[]>([]);
	function onLoad(callback: () => unknown) {
		events.value.push(callback);
	}

	return { list, loaded, onLoad };
});
