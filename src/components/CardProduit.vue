<script setup lang="ts">
const props = defineProps({
	produit: {
		type: Object,
		required: true,
	},
}) as {
	produit: Produit;
};

const colorationLaMoinsChere = props.produit.colorationsNavigation.reduce(
	(prev, curr) => ((curr.prixsolde ?? curr.prixvente) < (prev?.prixsolde ?? prev?.prixvente) ? curr : prev),
	props.produit.colorationsNavigation[0],
);

props.produit.colorationsNavigation.sort((a, b) => (a == colorationLaMoinsChere ? -1 : b == colorationLaMoinsChere ? 1 : 0));
</script>

<template>
	<RouterLink :to="'/produits/'+props.produit.idproduit">
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
							v-for="coloration in props.produit.colorationsNavigation"
							v-bind:key="coloration.idcouleur"
							:style="`--couleur: #${coloration.couleurNavigation.rgbcouleur};`"
							:data-tooltip="coloration.couleurNavigation.nomcouleur"
						></div>
					</div>
				</div>
			</div>
		</div>
	</RouterLink>
</template>
