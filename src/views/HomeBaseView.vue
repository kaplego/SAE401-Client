<script setup lang="ts">
import { useCategoriesStore } from '@/stores/api/categories';

const categories = useCategoriesStore();
</script>

<template>
	<nav id="navigationProduits">
		<div class="container">

			<template v-for="category in categories.list" v-bind:key="category.idcategorie">
				<div class="item" v-if="category.idcategorieParent === null">
					<p class="item-name">{{ category.nomcategorie }}</p>
					<div class="dropdown dropdown-columns">
						<div class="column" >
								<RouterLink :to="`/category/${ children.idcategorie }`" class="column-item" v-for="children in category.categorieEnfanteNavigation" v-bind:key="children.idcategorie">
									{{ children.nomcategorie }}
								</RouterLink>
						</div>
					</div>
				</div>
			</template>
		</div>
	</nav>
	<RouterView />
</template>

<style lang="scss">
#navigationProduits {
	display: flex;
	gap: 1rem;
	padding-bottom: 0;
}

#navigationProduits .item {
	user-select: none;
	cursor: pointer;
	transition: color 100ms;
	padding-bottom: 1rem;

	&:hover {
		.item-name,
		&:not(:has(.dropdown)) {
			color: var(--c-accent-500);
		}

		.dropdown {
			opacity: 1;
			scale: 1;
			padding: 1rem 2rem;
		}
	}

	.dropdown {
		transition: all 200ms;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		opacity: 0;
		scale: 1 0;
		transform-origin: top;
		overflow: auto;
		background-color: var(--t-background1-accent);
		border-radius: 0 0 6px 6px;
		cursor: auto;
		padding: 0rem 2rem;
		max-height: 300px;
		z-index: 100;

		&.dropdown-columns {
			display: grid;
			grid-template-rows: 100%;
			grid-auto-columns: 200px;
			grid-auto-flow: column;
			line-height: 1.5;

			.column-item {
				font-weight: 300;
				cursor: pointer;
				width: max-content;
				transition: color 100ms;
				display: block;
				text-decoration: none;

				&:hover {
					color: var(--c-accent-400);
				}

				a {
					color: inherit;
					text-decoration: none;
				}
			}
			.column-title {
				font-family: 'Rubik';
			}
		}
	}
}
</style>
