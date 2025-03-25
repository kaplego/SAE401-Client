import axios from 'axios';

class APIManager {
	public readonly endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	public categories = {
		list: async (): Promise<Categorie[]> => (await axios.get(`${this.endpoint}/categorie/GetAllCategorie`)).data,
	};

	public detailsPanier = {
		get: async (idproduit: ID, idcouleur: ID, idclient: ID): Promise<DetailPanier> =>
			(await axios.get(`${this.endpoint}/detailsPanier/${idproduit}/${idcouleur}/${idclient}`)).data,
	};

	public products = {
		get: async (id: ID): Promise<Produit> =>
			(await axios.get(`${this.endpoint}/produits/GetProduitById/${id}`)).data,
		list: async (): Promise<Produit[]> => (await axios.get(`${this.endpoint}/api/categorie/GetAllCategorie`)).data,
		search: async (query: string): Promise<Produit[]> =>
			(await axios.get(`${this.endpoint}/produits/GetAllProduitByRecherche/${query}`)).data,
		byRegroupement: async (idregroupement: ID): Promise<Produit[]> =>
			(await axios.get(`${this.endpoint}/produits/GetAllProduitByRegroupement/${idregroupement}`)).data,
		byCategorie: async (idcategorie: ID): Promise<Produit[]> =>
			(await axios.get(`${this.endpoint}/produits/GetAllProduitByCategorie/${idcategorie}`)).data,
		byType: async (idtype: ID): Promise<Produit[]> =>
			(await axios.get(`${this.endpoint}/produits/GetAllProduitByType/${idtype}`)).data,
	};
}

const API = new APIManager('https://api.miliboo.lou-magnenat.tech/api');

export default API;
