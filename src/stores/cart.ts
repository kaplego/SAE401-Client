import API from '@/assets/ts/api';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
	const itemsList = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') ?? '[]'));

	const list = ref<
		(Coloration & {
			quantitepanier: number;
		})[] // eslint-disable-next-line indent
	>([]);
	const isListLoading = ref<boolean>(false);

	async function refresh() {
		const newList = await Promise.all(
			itemsList.value.map((item) => {
				// Vérifie si le produit est déjà dans le panier
				const itemInItemList = list.value.find(
					(i) => i.idproduit === item.idproduit && i.idcouleur === item.idcouleur,
				);

				// S'il n'y est pas, alors le récupérer depuis l'API
				if (!itemInItemList) {
					isListLoading.value = true;

					return new Promise<
						Coloration & {
							quantitepanier: number;
						}
					>((r) =>
						API.products.get(item.idproduit).then((resProduit) => {
							if (!resProduit) return;

							const coloration = resProduit.colorationsNavigation.find(
								(c) => c.idcouleur === item.idcouleur,
							);
							if (!coloration) return;

							const { colorationsNavigation: _, ...produitNav } = resProduit;
							coloration.produitNavigation = produitNav as Produit;
							r({ ...coloration, quantitepanier: item.quantitepanier });
						}),
					);
				}
				// Sinon, uniquement modifier sa quantité
				else
					return {
						...itemInItemList,
						quantitepanier: item.quantitepanier,
					};
			}),
		);

		list.value = newList;
		isListLoading.value = false;
	}

	// Rafraîchir les items à chaque changement de itemsList
	watch(itemsList, refresh, {
		immediate: true,
	});

	function addToCart(idproduit: number, idcouleur: number) {
		console.log('Add');
		const citem = itemsList.value.find((i) => i.idcouleur === idcouleur && i.idproduit === idproduit);
		if (citem)
			// Si le produit existe déjà dans le panier, alors augmenter sa quantité
			itemsList.value = itemsList.value.map((i) => ({
				...i,
				quantitepanier:
					i.idcouleur === idcouleur && i.idproduit === idproduit ? i.quantitepanier + 1 : i.quantitepanier,
			}));
		// Sinon l'ajouter dans le panier
		else itemsList.value = [...itemsList.value, { idcouleur, idproduit, quantitepanier: 1 }];
		localStorage.setItem('cart', JSON.stringify(itemsList.value));
	}

	function removeFromCart(idproduit: number, idcouleur: number) {
		const citem = itemsList.value.find((i) => i.idcouleur === idcouleur && i.idproduit === idproduit);
		if (citem) {
			const newCart = [];
			// Supprimer les produits avec une quantité <= 0
			for (const item of itemsList.value) {
				if (item.idcouleur === idcouleur && item.idproduit === idproduit) {
					item.quantitepanier--;
				}
				if (item.quantitepanier <= 1) continue;
				newCart.push(item);
			}
			itemsList.value = newCart;
			localStorage.setItem('cart', JSON.stringify(itemsList.value));
		}
	}

	function save() {}

	// Calculer la quantité totale et le prix total
	const count = computed(() => itemsList.value.reduce((prev, curr) => prev + curr.quantitepanier, 0));
	const price = computed(() =>
		list.value.reduce((prev, curr) => prev + curr.quantitepanier * (curr.prixsolde ?? curr.prixvente), 0),
	);

	return { list, itemsList, isListLoading, count, price, addToCart, removeFromCart, save };
});
