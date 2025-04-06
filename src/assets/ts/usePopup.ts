import { ref } from 'vue';

/** Fonction utile pour créer des popups */
export default function usePopup<T, V>(
	/** Valeur par défaut pour `isOpen` */ defaultStatus: T,
	/** Valeur par défaut pour le modèle */ defaultModel: V = null as V,
) {
	/** Le statut de la popup */
	const status = ref<T>(defaultStatus);
	/** Le statut de chargement de la popup */
	const isLoading = ref<boolean>(false);
	/** Le message d'erreur de la popup */
	const error = ref<string | null>(null);
	// Pour les `v-model`
	/** Le modèle de la popup */
	const model = ref<V>(defaultModel);

	return { status, isLoading, error, model };
}
