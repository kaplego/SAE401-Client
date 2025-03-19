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
	valeurattributs: unknown[];
	idproduitsimilaire: number[];
	idproduitsimilaire2: number[];
	aimes: unknown[];
};
