import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDataStore = defineStore('data', () => {
	const flashData = ref<Map<string, any>>(new Map());
	const data = ref<Map<string, any>>(new Map());

	function get<T = any>(key: string): T {
		if (flashData.value.has(key)) {
			let result = flashData.value.get(key)!;
			if (typeof result === 'object') result = { ...result };
			flashData.value.delete(key);
			return result;
		} else return data.value.get(key) ?? null;
	}

	function set(key: string, value: any) {
		data.value.set(key, value);
	}

	function flash(key: string, value: any) {
		flashData.value.set(key, value);
	}

	return { get, set, flash };
});
