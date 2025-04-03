import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePaysStore = defineStore('pays', () => {
	const list = ref<Pays[]>([]);

	API.pays.list().then((pays) => {
		list.value = pays;
	});

	return { list };
});
