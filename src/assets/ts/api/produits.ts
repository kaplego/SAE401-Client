import axios from 'axios';

export async function getProduitsByCategorie(idcategorie: number | string) {
	return (await axios.get(`https://api.miliboo.lou-magnenat.tech/api/produits/GetAllProduitByCategorie/${idcategorie}`))
		.data as Produit[];
}

export async function getProduit(idproduit: number | string) {
	return (await axios.get(`https://api.miliboo.lou-magnenat.tech/api/produits/GetProduitById/${idproduit}`))
		.data as Produit;
}
