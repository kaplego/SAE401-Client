import axios from 'axios';

export async function getProductsByCategory(idcategory: number | string) {
	return (await axios.get(`https://api.miliboo.lou-magnenat.tech/api/produits/GetAllProduitByCategorie/${idcategory}`))
		.data as Produit[];
}

export async function getProduct(idproduct: number | string) {
	return (await axios.get(`https://api.miliboo.lou-magnenat.tech/api/produits/GetProduitById/${idproduct}`))
		.data as Produit;
}

export async function searchProduct(query: string) {
	return (await axios.get(`https://api.miliboo.lou-magnenat.tech/api/produits/GetAllProduitByRecherche/${query}`))
		.data as Produit[];
}
