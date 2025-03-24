<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, useTemplateRef, watchEffect } from 'vue';
import { THEME, useThemeStore } from './stores/theme';
import { Moon, Search, ShoppingCart, Sun, User } from 'lucide-vue-next';
import { useCategoriesStore } from './stores/api/categories';

const navContainer = useTemplateRef('navContainer');

const currentNavItem = ref<HTMLElement | null>(null);

const underlineLeft = ref(16);
const underlineWidth = ref(0);

function moveUnderline(event: MouseEvent) {
	const boundingRect = (event.currentTarget ?? event.target) as HTMLElement;
	underlineLeft.value = boundingRect.offsetLeft;
	underlineWidth.value = boundingRect.clientWidth;
}

function resetUnderline() {
	underlineLeft.value = currentNavItem.value?.offsetLeft ?? 16;
	underlineWidth.value = currentNavItem.value?.clientWidth ?? 0;
}

const router = useRouter();
router.afterEach(async () => {
	await new Promise((r) => setTimeout(r, 5));
	currentNavItem.value = navContainer.value?.querySelector('.router-link-active') ?? null;
	resetUnderline();
});

const theme = useThemeStore();

const categories = useCategoriesStore();
const idCategory = ref<string | null>();
watchEffect(() => {
	idCategory.value = router.currentRoute.value.params.id as string;
});
</script>

<template>
	<header>
		<div
			class="obV3p295"
			@click="() => theme.switchTheme(theme.currentTheme === THEME.DarkDim ? THEME.Light : THEME.DarkDim)"
		></div>
		<div class="container">
			<img src="/logo.svg" alt="Miliboo" class="logo" />
			<div id="recherche">
				<input type="text" placeholder="Rechercher un produit..." />
				<button>
					<Search />
				</button>
			</div>
			<div class="icons">
				<RouterLink to="/account" data-tooltip-down="Mon compte" class="icon-button"><User /></RouterLink>
				<RouterLink to="/cart" data-tooltip-down="Mon panier" class="icon-button"><ShoppingCart /></RouterLink>
				<div
					@click="theme.switchTheme(theme.currentTheme == THEME.Light ? THEME.Dark : THEME.Light)"
					id="theme-switch"
				>
					<input type="checkbox" id="theme-cb" :checked="theme.currentTheme === THEME.Dark" />
					<div id="theme-track">
						<Sun />
						<Moon />
						<div id="theme-knob"></div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<nav>
		<div class="container" @mouseleave="resetUnderline" ref="navContainer">
			<div class="underline" :style="`left: ${underlineLeft}px;width: ${underlineWidth}px;`"></div>
			<RouterLink class="item" @mouseover="moveUnderline" to="/">Accueil</RouterLink>
			<RouterLink class="item" @mouseover="moveUnderline" to="/about">À propos de nous</RouterLink>
		</div>
	</nav>

	<nav id="navigationProduits">
		<div class="container">
			<template v-for="category in categories.list" v-bind:key="category.idcategorie">
				<template v-if="category.idcategorieParent === null">
					<div class="item" v-if="category.categorieEnfanteNavigation.length > 0">
						<RouterLink :to="`/category/${category.idcategorie}`" class="item-name">{{
							category.nomcategorie
						}}</RouterLink>
						<div class="dropdown dropdown-columns">
							<div class="column">
								<RouterLink
									:to="`/category/${children.idcategorie}`"
									class="column-item"
									v-for="children in category.categorieEnfanteNavigation"
									v-bind:key="children.idcategorie"
								>
									{{ children.nomcategorie }}
								</RouterLink>
							</div>
						</div>
					</div>
					<RouterLink :to="`/category/${category.idcategorie}`" class="item" v-else>{{
						category.nomcategorie
					}}</RouterLink>
				</template>
			</template>
		</div>
	</nav>

	<RouterView />
</template>

<style scoped></style>
