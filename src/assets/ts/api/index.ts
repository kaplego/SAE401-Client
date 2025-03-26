import { useLoggedInStore } from '@/stores/login';
import axios, { type AxiosResponse } from 'axios';

async function dataOrNull<T>(cb: () => Promise<AxiosResponse<T>>): Promise<T | null> {
	try {
		const data = await cb();
		if (!!data.data) return data.data as T;
		return null;
	} catch {
		return null;
	}
}

async function dataOrDefault<T, D>(defaultValue: D, cb: () => Promise<AxiosResponse<T>>): Promise<T | D> {
	try {
		const data = await cb();
		if (!!data.data) return data.data as T;
		return defaultValue;
	} catch {
		return defaultValue;
	}
}

async function boolData(cb: () => Promise<AxiosResponse>): Promise<boolean> {
	try {
		await cb();
		return true;
	} finally {
		return false;
	}
}

class APIManager {
	public readonly endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	public categories = {
		list: async (): Promise<Categorie[]> =>
			dataOrDefault([], () => axios.get(`${this.endpoint}/categorie/GetAllCategorie`)),
	};

	public clients = {
		login: async (
			email: string,
			password: string,
		): Promise<{
			token: string;
			client: Client;
		} | null> => {
			const login = useLoggedInStore();
			const result = await dataOrNull<{
				token: string;
				client: Client;
			}>(() =>
				axios.post(`${this.endpoint}/client/GetClientByLogin`, {
					email,
					password,
				}),
			);
			if (result && result.token) {
				login.login(result.token, result.client.idclient);
			}
			return result;
		},
		get: async (id: ID): Promise<Client | null> => {
			const jwt = localStorage.getItem('jwt');
			return dataOrNull(() =>
				axios.get(`${this.endpoint}/client/GetClientById/${id}`, {
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}),
			);
		},
	};

	public detailsPanier = {
		get: async (idproduit: ID, idcouleur: ID, idclient: ID): Promise<DetailPanier | null> =>
			dataOrNull(() => axios.get(`${this.endpoint}/detailsPanier/${idproduit}/${idcouleur}/${idclient}`)),
	};

	public products = {
		get: async (id: ID): Promise<Produit | null> =>
			dataOrNull(() => axios.get(`${this.endpoint}/produit/GetProduitById/${id}`)),
		list: async (): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.endpoint}/produit/GetAllProduit`)),
		search: async (query: string): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.endpoint}/produit/GetAllProduitByRecherche/${query}`)),
		byRegroupement: async (idregroupement: ID): Promise<Produit[]> =>
			dataOrDefault([], () =>
				axios.get(`${this.endpoint}/produit/GetAllProduitByRegroupement/${idregroupement}`),
			),
		byCategorie: async (idcategorie: ID): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.endpoint}/produit/GetAllProduitByCategorie/${idcategorie}`)),
		byType: async (idtype: ID): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.endpoint}/produit/GetAllProduitByType/${idtype}`)),
		create: async (
			produit: Pick<
				Produit,
				| 'idtypeproduit'
				| 'idpays'
				| 'nomproduit'
				| 'sourcenotice'
				| 'sourceaspecttechnique'
				| 'delailivraison'
				| 'coutlivraison'
				| 'nbpaiementmax'
			>,
		): Promise<boolean> => boolData(() => axios.post(`${this.endpoint}/produit`, produit)),
		update: async (
			produit: Pick<
				Produit,
				| 'idproduit'
				| 'idtypeproduit'
				| 'idpays'
				| 'nomproduit'
				| 'sourcenotice'
				| 'sourceaspecttechnique'
				| 'delailivraison'
				| 'coutlivraison'
				| 'nbpaiementmax'
			>,
		): Promise<Produit | null> =>
			dataOrNull(() => axios.put(`${this.endpoint}/produit/${produit.idproduit}`, produit)),
		delete: async (id: ID): Promise<boolean> => boolData(() => axios.delete(`${this.endpoint}/produit/${id}`)),
	};
}

const API = new APIManager('https://api.miliboo.lou-magnenat.tech/api');

export default API;
