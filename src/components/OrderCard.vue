<script setup lang="ts">
import { Calendar, ChartNoAxesGantt, Euro, Handshake, Hash, Package, ScrollText, Truck } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
	order: Commande;
}>();

const price = computed(
	() =>
		props.order.detailProduitNavigation?.reduce((prev, curr) => prev + curr.colorationNavigation.prixvente, 0) ?? 0,
);
</script>

<template>
	<RouterLink class="link-order" :to="`/compte/order/${order.idcommande}`">
		<div class="card-order">
			<div class="order-info">
				<p class="label"><Hash aria-label="Numéro de commande" /> Numéro de commande</p>
				<p class="value">{{ order.idcommande }}</p>
			</div>
			<div class="separator"></div>
			<div class="order-info">
				<p class="label"><Euro aria-label="Prix total" /> Prix total</p>
				<p class="value">{{ price.toFixed(2) }} €</p>
			</div>
			<div class="separator"></div>
			<div></div>
			<div class="separator"></div>
			<div class="order-info delivery-infos">
				<p class="label"><Calendar aria-label="Date" /> Date</p>
				<p class="value">
					{{
						new Date(order.datecommande).toLocaleString('fr', {
							dateStyle: 'medium',
							timeStyle: 'short',
						})
					}}
				</p>
			</div>
			<div class="separator"></div>
			<div class="order-info delivery-infos">
				<p class="label"><Handshake aria-label="Assurance" /> Assurance</p>
				<p class="value">{{ order.avecassurance ? 'Oui' : 'Non' }}</p>
			</div>
			<div class="separator"></div>
			<div></div>
			<div class="separator"></div>
			<div class="order-info">
				<p class="label"><Package aria-label="Livraison" /> Livraion</p>
				<p class="value" v-if="order.adresseLivrNavigation">
					<template v-if="order.adresseLivrNavigation.nomadresse">
						{{ order.adresseLivrNavigation.nomadresse }}
					</template>
					<template v-else>
						{{ order.adresseLivrNavigation.numerorue }} {{ order.adresseLivrNavigation.nomrue }},
						{{ order.adresseLivrNavigation.codeinsee }}
					</template>
					<template v-if="order.aveclivraisonexpress">
						<p class="express">
							<span><ChartNoAxesGantt aria-label="Express" /><Truck aria-label="Livraion" /></span>
							Express
						</p>
					</template>
				</p>
				<p class="value" v-else>-</p>
			</div>
			<div class="separator"></div>
			<div class="order-info delivery-infos">
				<p class="label">
					<ScrollText aria-label="Instructions pour la livraison" /> Instructions pour la livraison
				</p>
				<p class="value" v-if="order.instructionlivraison">{{ order.instructionlivraison }}</p>
				<p class="value" v-else>-</p>
			</div>
		</div>
	</RouterLink>
</template>

<style lang="scss" scoped>
.link-order {
	text-decoration: none;
	overflow: hidden;
}

.card-order {
	width: 100%;
	max-width: 100%;
	overflow: hidden;
	padding: 1rem;
	background-color: var(--t-background2);
	border: 2px solid var(--t-border1);
	border-radius: 12px;
	transition: all 100ms;
	position: relative;

	display: grid;
	grid-template-columns: 1fr 1px 1fr 1px 1fr;
	grid-template-rows: auto 1px auto;
	grid-auto-flow: column;
	gap: 1rem;

	&:hover {
		background-color: var(--t-background1-accent);
		border-color: var(--t-border1-accent);
	}

	.separator {
		width: 100%;
		height: 100%;
		background-color: var(--t-background3);
	}

	.order-info {
		display: flex;
		flex-direction: column;
		justify-self: start;

		.label {
			font-size: 0.9rem;
			opacity: 0.75;
			display: flex;
			align-items: center;
			height: max-content;
			gap: 0.5rem;

			span {
				display: flex;
			}
		}

		.value {
			font-size: 1.1rem;
			font-weight: bold;
		}
	}

	.express {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		span {
			display: flex;
		}
	}
}
</style>
