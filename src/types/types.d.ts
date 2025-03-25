declare type ActivitePro = {
	idactivitepro: number;
	nomactivitepro: string;
	professionelsNavigation: Professionel[];
};

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
};

declare type Aime = {
	idclient: number;
	idproduit: number;
	clientNavigation: Client;
	produitNavigation: Produit;
};

declare type Attribut = {
	idattribut: number;
	idtypeproduit: number;
	nomattribut: string;
	typeproduitNavigation: TypeProduit;
	valeursNavigation: ValeurAttribut[];
};

declare type AvisProduit = {
	idavis: number;
	idproduit: number;
	idclient: number;
	noteavis: number;
	dateavis: Date;
	commentaireavis: string | null;
	reponsemiliboo: string | null;
	clientNavigation: Client;
	produitNavigation: Produit;
	signalementNavigation: SignalementAvi;
	photoavisNavigation: PhotoAvi[];
};

declare type CarteBancaire = {
	idcartebancaire: number;
	idclient: number;
	nomcartebancaire: string | null;
	dateenregistement: Date;
	numcartebancaire: string;
	dateexpirationcarte: Date;
	clientNavigation: Client;
	paiementsNavigation: Paiement[];
};

declare type Categorie = {
	idcategorie: number;
	idcategorieParent: number | null;
	idphoto: number | null;
	nomcategorie: string;
	descriptioncategorie: string;
	estfiltrable: boolean;
	categorieParenteNavigation: Categorie | null;
	photoNavigation: string | null;
	categorieEnfanteNavigation: Categorie[];
	typesNavigation: TypeProduit[];
};

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
	avisNavigation: AvisProduit[];
	cartesNavigation: CarteBancaire[];
	codesNavigation: CodePromo[];
	commandesNavigation: Commande[];
	paniersProduitNavigation: DetailPanier[];
	aimesNavigation: Aime[];
	paniersCompositionNavigation: DetailPanierComposition[];
	historiquesNavigation: HistoriqueConsultation[];
	messagesNavigation: MessageChatbot[];
	professionelNavigation: Professionel | null;
};

declare type CodePromo = {
	idcodepromo: number;
	idclient: number | null;
	nomcodepromo: string;
	valeurreduction: number;
	estvalide: boolean;
	dateexpirationcode: Date | null;
	commandesNavigation: Commande[];
	clientNavigation: Client | null;
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
	detailProduitNavigation: DetailCommande[];
	adresseLivrNavigation: Adresse;
	clientNavigation: Client;
	codeNavigation: CodePromo | null;
	statutNavigation: StatutCommande;
	transporteurNavigation: Transporteur;
	paiementsNavigation: Paiement[];
};

declare type CommandeComposition = {
	idcomposition: number;
	idcommande: number;
	quantitecompositioncommande: number;
	commandeNavigation: Commande;
	compositionNavigation: Composition;
};

declare type CompositionProduit = {
	idcomposition: number;
	nomcomposition: string | null;
	prixventecomposition: number;
	prixsoldecomposition: number | null;
	descriptioncomposition: string | null;
	commandesNavigation: CommandeComposition[];
	detailsNavigation: DetailComposition[];
	paniersNavigation: DetailPanierComposition[];
};

declare type Couleur = {
	idcouleur: number;
	nomcouleur: string;
	rgbcouleur: string;
};

declare type Departement = {
	iddepartement: number;
	nomdepartement: string | null;
	adressesNavigation: Adresse[];
};

declare type DetailCommande = {
	idproduit: number;
	idcouleur: number;
	idcommande: number;
	quantitecommande: number;
	colorationNavigation: Coloration;
	commandeNavigation: Commande;
};

declare type DetailComposition = {
	idproduit: number;
	idcouleur: number;
	idcomposition: number;
	quantitecomposition: number;
	colorationNavigation: Coloration;
	compositionNavigation: CompositionProduit;
};

declare type DetailPanier = {
	idproduit: number;
	idcouleur: number;
	idclient: number;
	quantitepanier: number;
	colorationNavigation: Coloration;
	clientNavigation: Client;
};

declare type DetailPanierComposition = {
	idcomposition: number;
	idclient: number;
	quantitepaniercomposition: number;
	compositionNaigation: CompositionProduit;
	clientNavigation: Client;
};

declare type DetailRegroupement = {
	idproduit: number;
	idcouleur: number;
	idregroupement: number;
	colorationsNavigation: Coloration;
	regroupementNavigation: RegroupementProduit;
};

declare type HistoriqueConsultation = {
	idclient: number;
	idproduit: number;
	dateconsultation: Date;
	clientNavigation: Client;
	produitNavigation: Produit;
};

declare type MessageChatbot = {
	idmessage: number;
	idclient: number;
	contenumessage: string;
	reponsemessage: string;
	clientNavigation: Client;
};

declare type Paiement = {
	idpaiement: number;
	idcartebancaire: number | null;
	idcommande: number;
	idtypepaiement: number;
	datepaiement: Date;
	montantpaiement: number;
	indicepaiement: string | null;
	carteNavigation: CarteBancaire | null;
	commandeNavigation: Commande;
	typeNavigation: TypePaiement;
};

declare type Pay = {
	idpays: number;
	nompays: string;
	adressesNavigation: Adresse[];
	produitsNavigation: Produit[];
};

declare type Photo = {
	idphoto: number;
	sourcephoto: string;
	descriptionphoto: string | null;
	categoriesNavigation: Categorie[];
	photoavisNavigation: PhotoAvi[];
	photocolsNavigation: PhotoColoration[];
};

declare type PhotoAvi = {
	idavi: number;
	idphoto: number;
	aviNavigation: AvisProduit;
	photoNavigation: Photo;
};

declare type PhotoColoration = {
	idproduit: number;
	idcouleur: number;
	idphoto: number;
	colorationNavigation: Coloration;
	photoNavigation: Photo;
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
	avisNavigation: AvisProduit[];
	colorationsNavigation: Coloration[];
	historiqueconsultations: HistoriqueConsultation[];
	idpaysNavigation: number | null;
	idtypeproduitNavigation: number | null;
	valeurattributs: ValeurAttribut[];
	idproduitsimilaire: number[];
	idproduitsimilaire2: number[];
	aimes: Aime[];
};

declare type ProduitSimilaire = {
	idproduitRef: number;
	idproduitSim: number;
	produitRefNavigation: Produit;
	produitSimNavigation: Produit;
};

declare type Professionel = {
	idclient: number;
	idactivitepro: number;
	nomsociete: string;
	numtva: string;
	activiteproNavigation: ActivitePro;
	clientNavigation: Client;
};

declare type RegroupementProduit = {
	idregroupement: number;
	nomregroupement: string;
	detailsNavigation: DetailRegroupement[];
};

declare type SignalementAvi = {
	idsignalement: number;
	idavis: number;
	idtypesignalement: number;
	emailsignalement: string;
	datesignalement: Date;
	contenusignalement: string;
	aviNavigation: AvisProduit;
	typeNavigation: TypeSignalement;
};

declare type StatutCommande = {
	idstatut: number;
	nomstatut: string;
	commandesNavigation: Commande[];
};

declare type Transporteur = {
	idtransporteur: number;
	nomtransporteur: string;
	commandesNavigation: Commande[];
};

declare type TypePaiement = {
	idtypepaiement: number;
	nomtypepaiement: string;
	paiementsNavigation: Paiement[];
};

declare type TypeProduit = {
	idtypeproduit: number;
	idcategorie: number;
	nomtypeproduit: string;
	attributsNavigation: Attribut[];
};

declare type TypeSignalement = {
	idtypesignalement: number;
	nomtypesignalement: string;
	signalementNavigation: SignalementAvi[];
};

declare type ValeurAttribut = {
	idattribut: number;
	idproduit: number;
	valeur: string;
	attributNavigation: Attribut | null;
	produitNavigation: Produit | null;
};

declare type Ville = {
	codeinsee: string;
	nomville: string | null;
	adressesNavigation: Adresse[];
};

declare type ID = string | number;
