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

async function dataOrError<T, E = any>(cb: () => Promise<AxiosResponse<T>>): Promise<[true, T] | [false, E]> {
	return new Promise<[true, T] | [false, E]>((r) => {
		cb()
			.then((res) => {
				r([true, res.data]);
			})
			.catch((err) => {
				r([false, err.data as E]);
			});
	});
}

async function boolData(cb: () => Promise<AxiosResponse>): Promise<boolean> {
	try {
		await cb();
		return true;
	} catch {
		return false;
	}
}

const AuthHeader = (jwt: string | null) => ({
	headers: {
		Authorization: `Bearer ${jwt}`,
	},
});

class APIManager {
	public readonly $endpoint: string;

	constructor(endpoint: string) {
		this.$endpoint = endpoint;
	}

	public readonly addresses = {
		create: (
			adresse: Omit<
				Adresse,
				| 'idadresse'
				| 'villeNavigation'
				| 'commandeLivrNavigation'
				| 'commandeFactNavigation'
				| 'clientNavigation'
				| 'departementNavigation'
				| 'payNavigation'
			>,
		): Promise<Adresse | null> => {
			const jwt = localStorage.getItem('jwt');
			return dataOrNull(() => axios.put(`${this.$endpoint}/adresse`, adresse, AuthHeader(jwt)));
		},
		update: (
			adresse: Omit<
				Adresse,
				| 'villeNavigation'
				| 'commandeLivrNavigation'
				| 'commandeFactNavigation'
				| 'clientNavigation'
				| 'departementNavigation'
				| 'payNavigation'
			>,
		): Promise<boolean> => {
			const jwt = localStorage.getItem('jwt');
			return boolData(() => axios.put(`${this.$endpoint}/adresse/${adresse.idadresse}`, adresse, AuthHeader(jwt)));
		},
		delete: (idadresse: ID): Promise<boolean> => {
			const jwt = localStorage.getItem('jwt');
			return boolData(() => axios.delete(`${this.$endpoint}/adresse/${idadresse}`, AuthHeader(jwt)));
		},
	};

	public readonly cartes = {
		byClient: async (idclient: ID): Promise<CarteBancaire[]> => {
			const jwt = localStorage.getItem('jwt');
			return dataOrDefault([], () =>
				axios.get(`${this.$endpoint}/cartebancaire/GetAllCarteBancaireByClient/${idclient}`, AuthHeader(jwt)),
			);
		},
		create: (
			carte: Omit<
				CarteBancaire,
				'idcartebancaire' | 'clientNavigation' | 'paiementsNavigation' | 'dateenregistement'
			>,
		): Promise<CarteBancaire | null> => {
			const jwt = localStorage.getItem('jwt');
			return dataOrNull(() => axios.post(`${this.$endpoint}/cartebancaire`, carte, AuthHeader(jwt)));
		},
		delete: (idcarte: ID): Promise<boolean> => {
			const jwt = localStorage.getItem('jwt');
			return boolData(() => axios.delete(`${this.$endpoint}/cartebancaire/${idcarte}`, AuthHeader(jwt)));
		},
	};

	public readonly categories = {
		list: async (): Promise<Categorie[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/categorie/GetAllCategorie`)),
	};

	public readonly clients = {
		login: async (
			email: string,
			password: string,
		): Promise<{
			token: string;
			client: Client;
		} | null> => {
			const result = await dataOrNull<{
				token: string;
				client: Client;
			}>(() =>
				axios.post(`${this.$endpoint}/client/GetClientByLogin`, {
					email,
					password,
				}),
			);
			if (result?.client) result.client.cartesNavigation = await this.cartes.byClient(result.client.idclient);
			return result;
		},
		get: async (id: ID): Promise<Client | null> => {
			const jwt = localStorage.getItem('jwt');
			const result = await dataOrNull<Client>(() =>
				axios.get(`${this.$endpoint}/client/GetClientById/${id}`, AuthHeader(jwt)),
			);
			if (result) result.cartesNavigation = await this.cartes.byClient(result.idclient);
			return result;
		},
		update: async (client: Client): Promise<[true, ''] | [false, unknown]> => {
			const jwt = localStorage.getItem('jwt');
			return dataOrError<''>(() =>
				axios.put(`${this.$endpoint}/client/${client.idclient}`, client, AuthHeader(jwt)),
			);
		},
		create: async (client: Client): Promise<[true, ''] | [false, unknown]> => {
			return dataOrError<''>(() => axios.post(`${this.$endpoint}/client`, client));
		},
	};

	public readonly departements = {
		list: async (): Promise<Departement[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/departement/getalldepartement`)),
	};

	public readonly detailsPanier = {
		get: async (idproduit: ID, idcouleur: ID, idclient: ID): Promise<DetailPanier | null> =>
			dataOrNull(() => axios.get(`${this.$endpoint}/detailsPanier/${idproduit}/${idcouleur}/${idclient}`)),
	};

	public readonly pays = {
		list: async (): Promise<Pays[]> => dataOrDefault([], () => axios.get(`${this.$endpoint}/pays/getallpays`)),
	};

	public readonly products = {
		get: async (id: ID): Promise<Produit | null> =>
			dataOrNull(() => axios.get(`${this.$endpoint}/produit/GetProduitById/${id}`)),
		list: async (): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/produit/GetAllProduit`)),
		search: async (query: string): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/produit/GetAllProduitByRecherche/${query}`)),
		byRegroupement: async (idregroupement: ID): Promise<Produit[]> =>
			dataOrDefault([], () =>
				axios.get(`${this.$endpoint}/produit/GetAllProduitByRegroupement/${idregroupement}`),
			),
		byCategorie: async (idcategorie: ID): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/produit/GetAllProduitByCategorie/${idcategorie}`)),
		byType: async (idtype: ID): Promise<Produit[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/produit/GetAllProduitByType/${idtype}`)),
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
		): Promise<boolean> => boolData(() => axios.post(`${this.$endpoint}/produit`, produit)),
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
			dataOrNull(() => axios.put(`${this.$endpoint}/produit/${produit.idproduit}`, produit)),
		delete: async (id: ID): Promise<boolean> => boolData(() => axios.delete(`${this.$endpoint}/produit/${id}`)),
	};

	public readonly villes = {
		list: async (): Promise<Ville[]> => dataOrDefault([], () => axios.get(`${this.$endpoint}/ville/getallville`)),
	};
}

const API = new APIManager(`https://api-miliboo.lou-magnenat.fr/api`);

export default API;
