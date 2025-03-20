declare type Couleur = {
	idcouleur: number;
	nomcouleur: string;
	rgbcouleur: string;
};

declare type Coloration = {
	idproduit: number;
	idcouleur: number;
	prixvente: number;
	prixsolde: number | null;
	quantitestock: number;
	descriptioncoloration: string;
	estvisible: boolean;
	couleurNavigation: Couleur;
};

declare type Produit = {
	idproduit: number;
	idtypeproduit: number;
	idpays: number;
	nomproduit: string;
	sourcenotice: string;
	sourceaspecttechnique: string;
	delailivraison: number;
	coutlivraison: number;
	nbpaiementmax: number;
	avisproduits: unknown[];
	colorationsNavigation: Coloration[];
	historiqueconsultations: unknown[];
	idpaysNavigation: number | null;
	idtypeproduitNavigation: number | null;
	valeurattributs: ValeurAttribut[];
	idproduitsimilaire: number[];
	idproduitsimilaire2: number[];
	aimes: unknown[];
};

declare type ValeurAttribut = {
	idattribut: number;
	idproduit: number;
	valeur: string;
	attributNavigation: Attribut | null;
	produitNavigation: Produit | null;
}

declare type Attribut = {
	idattribut: number;
	idtypeproduit: number;
	nomattribut: string;
	typeproduitNavigation: TypeProduit;
	valeursNavigation: ValeurAttribut[];
}

declare type TypeProduit = {
	idtypeproduit: number;
	idcategorie: number;
	nomtypeproduit: string;
	attributsNavigation: Attribut[];
}

declare type Categorie = {
	idcategorie: number;
	idcategorieParent: number | null;
	idphoto : number | null;
	nomcategorie: string;
	descriptioncategorie: string;
	estfiltrable: boolean;
	categorieParenteNavigation: Categorie | null;
	photoNavigation: string | null;
	categorieEnfanteNavigation: Categorie[];
	typesNavigation: TypeProduit[];
}

declare type Client = {
	idclient: number;
	nomclient: string;
	prenomclient: string;
	civiliteclient: string | null;
	emailclient: string | null;
	telfixeclient: string | null;
	telportableclient: string;
	datecreationcompte: string | Date;
	hashmdp: string;
	pointfideliteclient: number;
	newslettermiliboo: boolean;
	newsletterpartenaires: boolean;
	adressesNavigation: unknown[];
	avisNavigation: unknown[];
	cartesNavigation: unknown[];
	codesNavigation: unknown[];
	commandesNavigation: unknown[];
	paniersProduitNavigation: unknown[];
	aimesNavigation: unknown[];
	paniersCompositionNavigation: unknown[];
	historiquesNavigation: unknown[];
	messagesNavigation: unknown[];
	professionelNavigation: unknown;
}
