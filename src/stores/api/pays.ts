import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePaysStore = defineStore('pays', () => {
	const list = ref<Pays[]>([]);

	API.pays.list().then((pays) => {
		list.value = pays;
		events.value.forEach((e) => e());
	});

	const events = ref<(() => unknown)[]>([]);
	function onLoad(callback: () => unknown) {
		events.value.push(callback);
	}

	return { list, onLoad };
});
