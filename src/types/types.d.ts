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
	avisNavigation: Avisproduit[];
	colorationsNavigation: Coloration[];
	historiqueconsultations: Historiqueconsultation[];
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

declare type Commande = {
	idcommande: number;
	idclient: number;
	idadresseLivr: number;
	idcodepromo: number | null;
	idadresseFact: number;
	idstatus: number;
	idtransporteur: number;
	datecommande: Date;
	avecassurance: boolean;
	aveclivraisonexpress: boolean;
	instructionlivraison: string | null;
	adresseFactNavigation: Adresse;
	detailsCompositionNavigation: CommandeComposition[];
	detailProduitNavigation: Detailcommande[];
	adresseLivrNavigation: Adresse;
	clientNavigation: Client;
	codeNavigation: Codepromo | null;
	statutNavigation: Statutcommande;
	transporteurNavigation: Transporteur;
	paiementsNavigation: Paiement[];
}

declare type Cartebancaire = {
	idcartebancaire: number;
	idclient: number;
	nomcartebancaire: string | null;
	dateenregistement: Date;
	numcartebancaire: string;
	dateexpirationcarte: Date;
	clientNavigation: Client;
	paiementsNavigation: Paiement[];
}

declare type Typepaiement = {
	idtypepaiement: number;
	nomtypepaiement: string;
	paiementsNavigation: Paiement[];
}

declare type Paiement = {
	idpaiement: number;
	idcartebancaire: number | null;
	idcommande: number;
	idtypepaiement: number;
	datepaiement: Date;
	montantpaiement: number;
	indicepaiement: string | null;
	carteNavigation: Cartebancaire | null;
	commandeNavigation: Commande;
	typeNavigation: Typepaiement;
}

declare type Transporteur = {
	idtransporteur: number;
	nomtransporteur: string;
	commandesNavigation: Commande[];
}

declare type Statutcommande = {
	idstatut: number;
	nomstatut: string;
	commandesNavigation: Commande[];
}

declare type Codepromo = {
	idcodepromo: number;
	idclient: number | null;
	nomcodepromo: string;
	valeurreduction: number;
	estvalide: boolean;
	dateexpirationcode: Date | null;
	commandesNavigation: Commande[];
	clientNavigation: Client | null;
}

declare type Detailcommande = {
	idproduit: number;
	idcouleur: number;
	idcommande: number;
	quantitecommande: number;
	colorationNavigation: Coloration;
	commandeNavigation: Commande;
}

declare type CompositionProduit = {
	idcomposition: number;
	nomcomposition: string | null;
	prixventecomposition: number;
	prixsoldecomposition: number | null;
	descriptioncomposition: string | null;
	commandesNavigation: CommandeComposition[];
	detailsNavigation: Detailcomposition[];
	paniersNavigation: Detailpaniercomposition[];
}

declare type Detailpaniercomposition = {
	idcomposition: number;
	idclient: number;
	quantitepaniercomposition: number;
	compositionNaigation: CompositionProduit;
	clientNavigation: Client;
}

declare type Detailcomposition = {
	idproduit: number;
	idcouleur: number;
	idcomposition: number;
	quantitecomposition: number;
	colorationNavigation: Coloration;
	compositionNavigation: CompositionProduit;
}

declare type CommandeComposition = {
	idcomposition: number;
	idcommande: number;
	quantitecompositioncommande: number;
	commandeNavigation: Commande;
	compositionNavigation: Composition
}

declare type Ville = {
	codeinsee: string;
	nomville: string | null;
	adressesNavigation: Adresse[];
}

declare type Departement = {
	iddepartement: number;
	nomdepartement: string | null;
	adressesNavigation: Adresse[];
}

declare type Pay = {
	idpays: number;
	nompays: string;
	adressesNavigation: Adresse[];
	produitsNavigation: Produit[];
}

declare type Adresse = {
	idadresse: number;
	idpays: number;
	codeinsee: string;
	idclient: number;
	iddepartement: number;
	nomadresse: string | null;
	numerorue: string | null;
	nomrue: string;
	codepostaladresse: string;
	villeNavigation: Ville;
	commandeLivrNavigation: Commande[];
	commandeFactNavigation: Commande[];
	clientNavigation: Client;
	departementNavigation: Departement;
	payNavigation: Pay;
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
	adressesNavigation: Adresse[];
	avisNavigation: Avisproduit[];
	cartesNavigation: unknown[];
	codesNavigation: Codepromo[];
	commandesNavigation: Commande[];
	paniersProduitNavigation: unknown[];
	aimesNavigation: unknown[];
	paniersCompositionNavigation: Detailpaniercomposition[];
	historiquesNavigation: Historiqueconsultation[];
	messagesNavigation: unknown[];
	professionelNavigation: unknown | null;
}

declare type Photocoloration = {
	idproduit: number;
	idcouleur: number;
	idphoto: number;
	colorationNavigation: Coloration;
	photoNavigation: Photo;
}

declare type Photo = {
	idphoto: number;
	sourcephoto: string;
	descriptionphoto: string | null;
	categoriesNavigation: Categorie[];
	photoavisNavigation: Photoavi[];
	photocolsNavigation: Photocoloration[];
}

declare type Photoavi = {
	idavi: number;
	idphoto: number;
	aviNavigation: Avisproduit;
	photoNavigation: Photo;
}

declare type Avisproduit = {
	idavis: number;
	idproduit: number;
	idclient: number;
	noteavis: number;
	dateavis: Date;
	commentaireavis: string | null;
	reponsemiliboo: string | null;
	clientNavigation: Client;
	produitNavigation: Produit;
	signalementNavigation: Signalementavi;
	photoavisNavigation: Photoavi[];
}

declare type Typesignalement = {
	idtypesignalement: number;
	nomtypesignalement: string;
	signalementNavigation: Signalementavi[];
}

declare type Signalementavi = {
	idsignalement: number;
	idavis: number;
	idtypesignalement: number;
	emailsignalement: string;
	datesignalement: Date;
	contenusignalement: string;
	aviNavigation: Avisproduit;
	typeNavigation: Typesignalement;
}

declare type Historiqueconsultation = {
	idclient: number;
	idproduit: number;
	dateconsultation: Date;
	clientNavigation: Client;
	produitNavigation: Produit;
}

