import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type CartItem = Omit<DetailPanier, 'idclient' | 'clientNavigation' | 'colorationNavigation'>;

export const useCartStore = defineStore('cart', () => {
	const list = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') ?? '[]'));

	function addToCart(idcouleur: number, idproduit: number) {
		const citem = list.value.find((i) => i.idcouleur === idcouleur && i.idproduit === idproduit);
		if (citem)
			list.value = list.value.map((i) => ({
				...i,
				quantitepanier:
					i.idcouleur === idcouleur && i.idproduit === idproduit ? i.quantitepanier + 1 : i.quantitepanier,
			}));
		else list.value.push({ idcouleur, idproduit, quantitepanier: 1 });
		localStorage.setItem('cart', JSON.stringify(list.value));
	}

	function removeFromCart(idcouleur: number, idproduit: number) {
		const citem = list.value.find((i) => i.idcouleur === idcouleur && i.idproduit === idproduit);
		if (citem) {
			const newCart = [];
			for (const i of list.value) {
				if (i.idcouleur === idcouleur && i.idproduit === idproduit) {
					if (i.quantitepanier <= 1) continue;
					i.quantitepanier--;
				}
				newCart.push(i);
			}
			list.value = newCart;
			localStorage.setItem('cart', JSON.stringify(list.value));
		}
	}

	function save() {}

	const count = computed(() => list.value.reduce((prev, curr) => prev + curr.quantitepanier, 0));

	return { list, count, addToCart, removeFromCart, save };
});
