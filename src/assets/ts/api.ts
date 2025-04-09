import axios, { type AxiosResponse } from 'axios';
import Result from './result';
import bcrypt from 'bcryptjs';
import { BCRYPT_ROUNDS } from './utils';

/** Renvoie les données de la requête, ou null si erreur */
async function dataOrNull<T>(cb: () => Promise<AxiosResponse<T>>): Promise<T | null> {
	try {
		const data = await cb();
		if (!!data.data) return data.data as T;
		return null;
	} catch {
		return null;
	}
}

/** Renvoie les données de la requête, ou la valeur par défaut si erreur */
async function dataOrDefault<T, D>(defaultValue: D, cb: () => Promise<AxiosResponse<T>>): Promise<T | D> {
	try {
		const data = await cb();
		if (!!data.data) return data.data as T;
		return defaultValue;
	} catch {
		return defaultValue;
	}
}

/** Renvoie une instance de [`Result`](./result.ts) */
async function dataOrError<Success, Error = any>(
	cb: () => Promise<AxiosResponse<Success>>,
): Promise<Result<Success, Error>> {
	return new Promise<Result<Success, Error>>((r) => {
		cb()
			.then((res) => {
				r(Result.success(res.data));
			})
			.catch((err) => {
				r(Result.error(err.response.data));
			});
	});
}

/** Renvoie un booléen en fonction du succès de la requête */
async function boolData(cb: () => Promise<AxiosResponse>): Promise<boolean> {
	try {
		await cb();
		return true;
	} catch {
		return false;
	}
}

/** Génère l'en-tête d'autorisation JWT */
const AuthHeader = (jwt: string | null) => ({
	headers: {
		Authorization: `Bearer ${jwt}`,
	},
});

/** Méthodes de communication avec l'API */
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
			return dataOrNull(() => axios.post(`${this.$endpoint}/adresse`, adresse, AuthHeader(jwt)));
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
			return boolData(() =>
				axios.put(`${this.$endpoint}/adresse/${adresse.idadresse}`, adresse, AuthHeader(jwt)),
			);
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
		create: async (
			client: Pick<
				Client,
				'nomclient' | 'prenomclient' | 'emailclient' | 'civiliteclient' | 'telportableclient'
			> & {
				password: string;
			},
		) => {
			const hash = bcrypt.hashSync(client.password, BCRYPT_ROUNDS);
			const { password: _, ...clientWithoutMdp } = client;
			return dataOrError<Client>(() =>
				axios.post(`${this.$endpoint}/client`, { ...clientWithoutMdp, hashmdp: hash }),
			);
		},
		update: async (
			client: Pick<
				Client,
				| 'idclient'
				| 'nomclient'
				| 'prenomclient'
				| 'civiliteclient'
				| 'emailclient'
				| 'telfixeclient'
				| 'telportableclient'
				| 'pointfideliteclient'
				| 'newslettermiliboo'
				| 'newsletterpartenaires'
			>,
		) => {
			const jwt = localStorage.getItem('jwt');
			return dataOrError<Client, APIResponseError>(() =>
				axios.put(`${this.$endpoint}/client/${client.idclient}`, client, AuthHeader(jwt)),
			);
		},
	};

	public readonly colorations = {
		get: async (idproduit: ID, idcouleur: ID) =>
			dataOrNull<Coloration>(() => axios.get(`${this.$endpoint}/coloration/${idproduit}/${idcouleur}`)),
	};

	public readonly commandes = {
		get: async (id: ID) => {
			const jwt = localStorage.getItem('jwt');
			return dataOrNull<Commande>(() => axios.get(`${this.$endpoint}/commande/${id}`, AuthHeader(jwt)));
		},
		create: async (
			data: Omit<
				Commande,
				| 'idcommande'
				| 'datecommande'
				| 'adresseFactNavigation'
				| 'detailsCompositionNavigation'
				| 'detailsProduitNavigation'
				| 'adresseLivrNavigation'
				| 'clientNavigation'
				| 'codeNavigation'
				| 'statutNavigation'
				| 'transporteurNavigation'
				| 'paiementsNavigation'
			>,
		) => {
			const jwt = localStorage.getItem('jwt');
			return dataOrError<Commande>(() => axios.post(`${this.$endpoint}/commande`, data, AuthHeader(jwt)));
		},
	};

	public readonly couleurs = {
		get: async (idcouleur: ID) => dataOrNull<Couleur>(() => axios.get(`${this.$endpoint}/couleur/${idcouleur}`)),
	};

	public readonly departements = {
		list: async (): Promise<Departement[]> =>
			dataOrDefault([], () => axios.get(`${this.$endpoint}/departement/getalldepartement`)),
	};

	public readonly detailsPanier = {
		get: async (idproduit: ID, idcouleur: ID, idclient: ID): Promise<DetailPanier | null> =>
			dataOrNull(() => axios.get(`${this.$endpoint}/detailsPanier/${idproduit}/${idcouleur}/${idclient}`)),
	};

	public readonly detailsCommande = {
		create: async (data: Pick<DetailCommande, 'idcommande' | 'idcouleur' | 'idproduit' | 'quantitecommande'>) => {
			const jwt = localStorage.getItem('jwt');
			return dataOrError<DetailCommande>(() =>
				axios.post(`${this.$endpoint}/detailcommande`, data, AuthHeader(jwt)),
			);
		},
	};

	public readonly paiements = {
		create: async (
			data: Pick<Paiement, 'idcommande' | 'idtypepaiement' | 'idcartebancaire' | 'montantpaiement'>,
		) => {
			const jwt = localStorage.getItem('jwt');
			return dataOrError<Paiement>(() => axios.post(`${this.$endpoint}/paiement`, data, AuthHeader(jwt)));
		},
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

	public readonly transporteurs = {
		list: () => dataOrDefault([], () => axios.get(`${this.$endpoint}/transporteur/getalltransporteur`)),
	};

	public readonly typesPaiement = {
		list: () => dataOrDefault([], () => axios.get(`${this.$endpoint}/typePaiement/getalltypepaiement`)),
	};

	public readonly villes = {
		list: async (): Promise<Ville[]> => dataOrDefault([], () => axios.get(`${this.$endpoint}/ville/getallville`)),
	};
}

const API = new APIManager(`https://api-miliboo.lou-magnenat.fr/api`);

export default API;
