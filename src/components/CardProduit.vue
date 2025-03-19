<script setup lang="ts">
const props = defineProps({
	produit: {
		type: Object,
		required: true,
	},
}) as {
	produit: Produit;
};

let randomcolorations = [
	{
		idproduit: props.produit.idproduit,
		idcouleur: 0,
		prixvente: 18999.99,
		prixsolde: 899.99,
		estvisible: true,
		descriptioncoloration: 'La coloration la moins chère.',
		quantitestock: 10000,
		couleurNavigation: {
			idcouleur: 0,
			nomcouleur: 'Noir',
			rgbcouleur: '000000',
		},
	},
	{
		idproduit: props.produit.idproduit,
		idcouleur: 1,
		prixvente: 12999.99,
		prixsolde: null,
		estvisible: true,
		descriptioncoloration: 'La coloration la moins chère.',
		quantitestock: 10000,
		couleurNavigation: {
			idcouleur: 1,
			nomcouleur: 'Blanc',
			rgbcouleur: 'FFFFFF',
		},
	},
	{
		idproduit: props.produit.idproduit,
		idcouleur: 2,
		prixvente: 999.99,
		prixsolde: null,
		estvisible: true,
		descriptioncoloration: 'La coloration la moins chère.',
		quantitestock: 100,
		couleurNavigation: {
			idcouleur: 2,
			nomcouleur: 'Vert',
			rgbcouleur: '55AA88',
		},
	},
] as Coloration[];

props.produit.colorations = [];

for (let i = 0; i < 3; i++) {
	if (i > 0 && Math.random() >= 0.5) continue;
	const random = Math.floor(Math.random() * randomcolorations.length);
	const element = randomcolorations[random];
	props.produit.colorations.push({ ...element, couleurNavigation: { ...element.couleurNavigation } });
	randomcolorations = randomcolorations.filter((e) => e != element);
}

const colorationLaMoinsChere = props.produit.colorations.reduce(
	(prev, curr) => ((curr.prixsolde ?? curr.prixvente) < (prev?.prixsolde ?? prev?.prixvente) ? curr : prev),
	props.produit.colorations[0],
);

props.produit.colorations.sort((a, b) => (a == colorationLaMoinsChere ? -1 : b == colorationLaMoinsChere ? 1 : 0));
</script>

<template>
	<div class="card-produit">
		<div class="banniere-soldes-container">
			<div class="banniere-soldes" v-if="colorationLaMoinsChere?.prixsolde !== null">Soldes</div>
		</div>
		<img src="https://placehold.co/800x800/PNG" :alt="props.produit.nomproduit" class="photo" />
		<div class="content">
			<p class="nom">{{ props.produit.nomproduit }}</p>
			<div>
				<p class="prix">
					<template v-if="colorationLaMoinsChere?.prixsolde !== null">
						<span class="prixsolde">{{ colorationLaMoinsChere.prixsolde }} €</span>
						<span class="prixvente-solde">{{ colorationLaMoinsChere.prixvente }} €</span>
					</template>
					<template v-else>{{ colorationLaMoinsChere?.prixvente }} €</template>
				</p>
				<div class="colorations">
					<div
						class="coloration"
						v-for="coloration in props.produit.colorations"
						v-bind:key="coloration.idcouleur"
						:style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"
						:data-tooltip="coloration.couleurNavigation.nomcouleur"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>
