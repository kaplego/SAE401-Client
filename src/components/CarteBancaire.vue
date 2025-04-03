<script setup lang="ts">
import { CARD_EXPIRATION_WARNING, cardNumberFormat } from '@/assets/ts/utils';
import { useLoggedInStore } from '@/stores/login';
import { OctagonX, Trash, TriangleAlert } from 'lucide-vue-next';
import { ref } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';
import PopupWindow from './windows/PopupWindow.vue';
import API from '@/assets/ts/api';
const props = defineProps<{
	card: CarteBancaire;
	deletable?: boolean;
}>();

const shown = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const cardElement = ref<HTMLDivElement>();

const now = new Date();
now.setDate(0);
now.setHours(0, 0, 0, 0);
const expiration = new Date(props.card.dateexpirationcarte);
expiration.setDate(0);
expiration.setHours(0, 0, 0, 0);
const expirationDiff = expiration.valueOf() - now.valueOf();
const expirationStatus = expirationDiff < 0 ? 'expired' : expirationDiff < CARD_EXPIRATION_WARNING ? 'soon' : null;
const login = useLoggedInStore();

async function remove() {
	isLoading.value = true;
	await API.cartes.delete(props.card.idcartebancaire);
	login.refresh();
	isLoading.value = false;
}
const popupDelete = ref<boolean>(false);
</script>

<template>
	<div
		ref="cardElement"
		:class="`cb-container ${shown && !isLoading ? 'shown' : ''} ${isLoading ? 'loading' : ''}`"
		@mouseleave="shown = false"
		@click="shown = !shown"
	>
		<div class="cb">
			<div class="front">
				<div
					v-if="expirationStatus"
					:class="`badge ${expirationStatus}`"
					:data-tooltip="expirationStatus === 'expired' ? 'Expirée' : 'Expire bientôt'"
				>
					<OctagonX v-if="expirationStatus === 'expired'" />
					<TriangleAlert v-else />
				</div>
				<p class="label">{{ card.nomcartebancaire ?? 'Aucun libellé' }}</p>
				<p class="name">{{ card.titulairecartebancaire }}</p>
			</div>
			<div class="back">
				<p class="date">
					{{
						new Date(card.dateexpirationcarte).toLocaleDateString('fr', {
							month: '2-digit',
							year: 'numeric',
						})
					}}
				</p>
				<p v-if="expirationStatus" :class="`expiration ${expirationStatus}`">
					<template v-if="expirationStatus === 'expired'"><OctagonX /> Expirée</template>
					<template v-else><TriangleAlert /> Expire bientôt</template>
				</p>
				<p class="number">{{ cardNumberFormat(card.numcartebancaire) }}</p>
			</div>
		</div>
		<button
			class="delete"
			type="button"
			v-if="deletable && !isLoading"
			@click="() => (popupDelete = true)"
			data-tooltip="Retirer la carte de mon compte"
		>
			<Trash />
		</button>
		<LoadingSpinner v-if="isLoading" />
	</div>
	<PopupWindow
		v-if="popupDelete"
		title="Confirmer la suppression"
		@close="
			(value) => {
				popupDelete = false;
				if (value === 'confirm') remove();
			}
		"
		:buttons="[
			{
				label: 'Annuler',
				style: 'secondary',
				value: 'cancel',
			},
			{
				label: 'Confirmer',
				style: 'danger',
				value: 'confirm',
			},
		]"
		><h2>Êtes-vous sûr(e) de vouloir supprimer cette carte bancaire ?</h2></PopupWindow
	>
</template>

<style lang="scss">
.cb-container {
	position: relative;
	height: 200px;
	aspect-ratio: 85.6 / 53.98;
	width: 100%;
	cursor: pointer;

	.cb {
		position: absolute;
		transition: transform 1s;
		transform-style: preserve-3d;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;

		.front,
		.back {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			border-radius: calc(100% * (3.175 / 85.6)) / calc(100% * (3.175 / 53.98));
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
			color: white;
			background: linear-gradient(135deg, var(--c-gray-900) 0%, var(--c-gray-700) 100%);
			box-shadow: 0 0 2rem var(--t-shadow1);
			padding: 10%;
		}

		.front {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			position: relative;

			.badge {
				position: absolute;
				top: 0;
				right: 0;
				transform: translate(30%, -30%);
				background-color: white;
				color: black;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.5rem;
				border-radius: 100vw;
				-webkit-backface-visibility: hidden;
				backface-visibility: hidden;

				&.expired {
					background-color: var(--c-red-500);
					color: white;
				}

				&.soon {
					background-color: var(--c-yellow-500);
					color: white;
				}

				.lucide {
					font-size: 1.5rem;
				}
			}

			.label {
				font-family: 'Rubik', 'Lato', Arial, Helvetica, sans-serif;
				font-weight: bold;
				font-size: 125%;
			}

			.name {
				text-align: right;
			}
		}

		.back {
			transform: rotateY(180deg);
			display: grid;
			grid-template-columns: 2fr 1fr;
			grid-template-rows: auto auto 1fr;
			gap: 0.5rem 0;

			.date {
				font-family: monospace;
				font-size: 1.25em;
			}

			.expiration {
				grid-row: 2 / 3;
				display: flex;
				align-items: center;
				gap: 0.5em;

				&.expired {
					color: var(--c-red-500);
				}

				&.soon {
					color: var(--c-yellow-500);
				}
			}

			.number {
				grid-column: 1 / 3;
				grid-row: 3 / 4;
				align-self: flex-end;
				user-select: none;
				font-family: monospace;
				font-size: 1.25em;
			}
		}
	}

	.delete {
		--transform: translate(30%, 30%);
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: var(--c-red-500);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 100vw;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		cursor: pointer;
		border: none;
		transform: var(--transform) scale(0);
		transform-origin: center center;
		transition: transform 100ms;

		.lucide {
			font-size: 1.2rem;
		}
	}

	&:not(.loading).shown .cb {
		transform: rotateY(180deg);
	}

	&:not(.loading):hover {
		.delete {
			transform: var(--transform) scale(1);
			border: none;
		}
	}

	&.loading {
		cursor: default;

		.cb {
			filter: blur(4px);
		}

		.loading-spinner {
			color: white;
		}
	}
}
</style>
