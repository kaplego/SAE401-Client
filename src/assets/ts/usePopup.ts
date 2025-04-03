import { ref } from 'vue';

export default function usePopup<T, V>(defaultValue: T, defaultModelValue: V = null as V) {
	const isOpen = ref<T>(defaultValue);
	const isLoading = ref<boolean>(false);
	const error = ref<string | null>(null);
	const model = ref<V>(defaultModelValue);

	return { isOpen, isLoading, error, model };
}
