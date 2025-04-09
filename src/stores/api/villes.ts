import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVillesStore = defineStore('ville', () => {
	const list = ref<Ville[]>([]);
	const loaded = ref<boolean>(false);

	API.villes.list().then((villes) => {
		list.value = villes;
		loaded.value = true;
		events.value.forEach((e) => e());
	});

	function find(codeinsee: string) {
		return loaded.value ? (list.value.find((v) => v.codeinsee === codeinsee) ?? null) : null;
	}

	const events = ref<(() => unknown)[]>([]);
	function onLoad(callback: () => unknown) {
		events.value.push(callback);
	}

	return { list, loaded, find, onLoad };
});
