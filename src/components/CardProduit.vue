<script setup lang="ts">
const props = defineProps({
	produit: {
		type: Object,
		required: true,
	},
}) as {
	produit: Produit;
};

// Calculer la coloration la moins chère pour la placer en premier
const colorationLaMoinsChere = props.produit.colorationsNavigation.reduce(
	(prev, curr) => ((curr.prixsolde ?? curr.prixvente) < (prev?.prixsolde ?? prev?.prixvente) ? curr : prev),
	props.produit.colorationsNavigation[0],
);

props.produit.colorationsNavigation.sort((a, b) =>
	a == colorationLaMoinsChere ? -1 : b == colorationLaMoinsChere ? 1 : 0,
);
</script>

<template>
	<RouterLink :to="'/produits/' + props.produit.idproduit" class="link-produit">
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

<style lang="scss" scoped>
.link-produit {
	text-decoration: none;
}
.card-produit {
	--ratio: 1.5;
	aspect-ratio: 1 / var(--ratio);
	background-color: var(--t-background2);
	border-radius: 8px;
	width: 100%;
	border: 2px solid var(--t-background1);
	cursor: pointer;
	transition: all 100ms;
	position: relative;

	display: grid;
	grid-template-rows: calc(100% / var(--ratio)) auto;

	&:hover {
		background-color: var(--t-background1-accent);
		border-color: var(--t-border1-accent);
	}

	.banniere-soldes-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;

		.banniere-soldes {
			position: absolute;
			width: 100%;
			background-color: var(--c-red-500);
			color: var(--c-gray-50);
			transform: rotateZ(45deg) translateY(50px);
			transform-origin: center center;
			right: -50%;
			text-align: center;
			z-index: 50;
			text-transform: uppercase;
			font-weight: bold;
			letter-spacing: 2px;
			user-select: none;
		}
	}

	.photo {
		aspect-ratio: 1;
		width: 100%;
		border-radius: 6px 6px 0 0;
	}

	.content {
		padding: 0.5rem 1rem;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 0.5rem;

		.nom {
			font-family: 'Rubik';
			overflow: hidden;
		}

		.prix {
			margin-bottom: 0.5rem;

			.prixsolde {
				color: var(--c-red-500);
				font-weight: bold;
				margin-right: 6px;
			}

			.prixvente-solde {
				text-decoration: line-through;
				font-weight: normal;
				color: var(--t-foreground3);
			}
		}

		.colorations {
			display: flex;
			height: 20px;
			gap: 0.5rem;

			.coloration {
				aspect-ratio: 1;
				height: 100%;
				border: 1px solid var(--t-foreground1);
				background-color: var(--couleur);
				border-radius: 100vw;
			}
		}
	}
}
</style>
