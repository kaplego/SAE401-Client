import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
	const isLoading = ref(true);

	function switchLoading(newValue: boolean = !isLoading.value) {
		isLoading.value = newValue;
	}

	return { isLoading, switchLoading };
});
