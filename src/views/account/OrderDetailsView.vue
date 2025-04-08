<script setup lang="ts">
import API from '@/assets/ts/api';
import { finalPrice } from '@/assets/ts/utils';
import CartProduct from '@/components/CartProduct.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useVillesStore } from '@/stores/api/villes';
import { ChartNoAxesGantt, Truck } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const villes = useVillesStore();
const router = useRouter();
const orderId = router.currentRoute.value.params.id as string;

const order = ref<Commande | null>(null);

const fetch = () =>
	API.commandes.get(orderId).then(async (res) => {
		if (res) {
			for (const dp of res.detailsProduitNavigation) {
				const dpProduit = await API.products.get(dp.idproduit);
				if (dpProduit) dp.colorationNavigation.produitNavigation = dpProduit;
			}
			order.value = res;
		} else router.replace('/compte/commandes');
	});

watch(router.currentRoute, () => {
	order.value = null;
	fetch();
});
fetch();

const price = computed(
	() =>
		order.value?.detailsProduitNavigation?.reduce(
			(prev, curr) => prev + finalPrice(curr.colorationNavigation.prixvente, curr.colorationNavigation.prixsolde),
			0,
		) ?? 0,
);
</script>

<template>
	<template v-if="order">
		<h1>
			Commande N°{{ order.idcommande }} du
			{{
				new Date(order.datecommande).toLocaleDateString('fr', {
					dateStyle: 'long',
				})
			}}
		</h1>
		<div id="columns">
			<div id="products-list">
				<CartProduct
					v-for="(item, i) in order.detailsProduitNavigation"
					v-bind:key="i"
					:coloration="item.colorationNavigation"
					:quantite="item.quantitecommande"
				/>
			</div>
			<div class="v-separator"></div>
			<div id="order-details">
				<p class="bold">Résumé de la commande</p>
				<div class="separator"></div>
				<template v-for="(item, i) in order.detailsProduitNavigation" v-bind:key="i">
					<p class="inline">
						{{
							finalPrice(item.colorationNavigation.prixvente, item.colorationNavigation.prixsolde)
								.toFixed(2)
								.padEnd(8, '&nbsp;')
						}}
						&times;
						{{ item.quantitecommande }}
						<span class="end">
							&equals;
							{{
								finalPrice(
									item.colorationNavigation.prixvente,
									item.colorationNavigation.prixsolde,
									item.quantitecommande,
								)
									.toFixed(2)
									.padStart(9, '&nbsp;')
							}}
							€
						</span>
					</p>
				</template>
				<div class="separator"></div>
				<p class="inline">
					<span class="bold">Prix total</span>
					<span class="end">{{ price.toFixed(2) }} €</span>
				</p>
				<div class="separator"></div>
				<p class="inline mb">
					<span class="bold">Livraison</span>
					<span v-if="order.aveclivraisonexpress" class="express-delivery end">
						<span><ChartNoAxesGantt /><Truck /></span> Expresse
					</span>
				</p>
				<p v-if="order.adresseLivrNavigation.nomadresse">{{ order.adresseLivrNavigation.nomadresse }}</p>
				<p>{{ order.adresseLivrNavigation.numerorue }}, {{ order.adresseLivrNavigation.nomrue }}</p>
				<p>
					{{ order.adresseLivrNavigation.codepostaladresse }}
					{{
						villes.list.find((v) => v.codeinsee === order!.adresseLivrNavigation.codeinsee)?.nomville ??
						order.adresseLivrNavigation.codeinsee
					}}
				</p>
				<template v-if="order.instructionlivraison">
					<p class="bold mt">Instructions pour la Livraison</p>
					<p>{{ order.instructionlivraison }}</p>
				</template>
				<div class="separator"></div>
				<p class="bold mb">Facturation</p>
				<p v-if="order.adresseFactNavigation.nomadresse">{{ order.adresseFactNavigation.nomadresse }}</p>
				<p>{{ order.adresseFactNavigation.numerorue }}, {{ order.adresseFactNavigation.nomrue }}</p>
				<p>
					{{ order.adresseFactNavigation.codepostaladresse }}
					{{
						villes.list.find((v) => v.codeinsee === order!.adresseFactNavigation.codeinsee)?.nomville ??
						order.adresseFactNavigation.codeinsee
					}}
				</p>
				<div class="separator"></div>
				<p class="inline">
					<span class="bold">Avec assurance</span>
					<span class="end">{{ order.avecassurance ? 'Oui' : 'Non' }}</span>
				</p>
				<div class="separator"></div>
				<p class="inline">
					<span class="bold">Statut</span>
					<span class="end">{{ order.statutNavigation.nomstatut }}</span>
				</p>
			</div>
		</div>
	</template>
	<LoadingSpinner v-else />
</template>

<style lang="scss" scoped>
#columns {
	display: grid;
	grid-template-columns: 2fr 1px 1fr;
	gap: 1rem;

	#products-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;
		height: max-content;
		overflow: hidden;
	}

	.v-separator {
		background-color: var(--t-border1);
	}

	#order-details {
		height: max-content;
		padding: 3rem 1rem;
		font-family: 'Courier New', Courier, monospace;
		background-color: var(--c-blackAlpha-100);
		position: sticky;
		top: 1.5rem;
		clip-path: polygon(
			0 0,
			calc(1 / 24 * 100%) 0.75em,
			calc(2 / 24 * 100%) 0,
			calc(3 / 24 * 100%) 0.75em,
			calc(4 / 24 * 100%) 0,
			calc(5 / 24 * 100%) 0.75em,
			calc(6 / 24 * 100%) 0,
			calc(7 / 24 * 100%) 0.75em,
			calc(8 / 24 * 100%) 0,
			calc(9 / 24 * 100%) 0.75em,
			calc(10 / 24 * 100%) 0,
			calc(11 / 24 * 100%) 0.75em,
			calc(12 / 24 * 100%) 0,
			calc(13 / 24 * 100%) 0.75em,
			calc(14 / 24 * 100%) 0,
			calc(15 / 24 * 100%) 0.75em,
			calc(16 / 24 * 100%) 0,
			calc(17 / 24 * 100%) 0.75em,
			calc(18 / 24 * 100%) 0,
			calc(19 / 24 * 100%) 0.75em,
			calc(20 / 24 * 100%) 0,
			calc(21 / 24 * 100%) 0.75em,
			calc(22 / 24 * 100%) 0,
			calc(23 / 24 * 100%) 0.75em,
			calc(24 / 24 * 100%) 0,
			100% 0,
			100% 100%,
			calc(24 / 24 * 100%) calc(100% - 0em),
			calc(23 / 24 * 100%) calc(100% - 0.75em),
			calc(22 / 24 * 100%) calc(100% - 0em),
			calc(21 / 24 * 100%) calc(100% - 0.75em),
			calc(20 / 24 * 100%) calc(100% - 0em),
			calc(19 / 24 * 100%) calc(100% - 0.75em),
			calc(18 / 24 * 100%) calc(100% - 0em),
			calc(17 / 24 * 100%) calc(100% - 0.75em),
			calc(16 / 24 * 100%) calc(100% - 0em),
			calc(15 / 24 * 100%) calc(100% - 0.75em),
			calc(14 / 24 * 100%) calc(100% - 0em),
			calc(13 / 24 * 100%) calc(100% - 0.75em),
			calc(12 / 24 * 100%) calc(100% - 0em),
			calc(11 / 24 * 100%) calc(100% - 0.75em),
			calc(10 / 24 * 100%) calc(100% - 0em),
			calc(9 / 24 * 100%) calc(100% - 0.75em),
			calc(8 / 24 * 100%) calc(100% - 0em),
			calc(7 / 24 * 100%) calc(100% - 0.75em),
			calc(6 / 24 * 100%) calc(100% - 0em),
			calc(5 / 24 * 100%) calc(100% - 0.75em),
			calc(4 / 24 * 100%) calc(100% - 0em),
			calc(3 / 24 * 100%) calc(100% - 0.75em),
			calc(2 / 24 * 100%) calc(100% - 0em),
			calc(1 / 24 * 100%) calc(100% - 0.75em),
			0 100%
		);

		.separator {
			height: 1px;
			width: 100%;
			background-color: var(--c-blackAlpha-200);
			margin: 1rem 0;
		}

		.inline {
			display: flex;
			.end {
				margin-left: auto;
			}
		}

		.bold {
			font-weight: bold;
		}

		.mt {
			margin-top: 1lh;
		}
		.mb {
			margin-bottom: 1lh;
		}
	}
}

.express-delivery {
	display: flex;
	gap: 0.5rem;
	color: var(--t-foreground2-accent);

	span {
		display: flex;
	}
}
</style>
