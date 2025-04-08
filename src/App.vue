<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, useTemplateRef, watchEffect } from 'vue';
import { THEME, useThemeStore } from './stores/theme';
import { Asterisk, Moon, Search, ShoppingCart, Sun, User } from 'lucide-vue-next';
import { useCategoriesStore } from './stores/api/categories';
import { useCartStore } from './stores/cart';
import TextPlaceholder from './components/placeholders/TextPlaceholder.vue';
import InputControl from './components/inputs/InputControl.vue';

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

const searchQuery = ref<string>('');
function searchProduct() {
	router.push('/search?q=' + encodeURIComponent(searchQuery.value));
}

const cart = useCartStore();

const placeholders: number[] = [];
const placeholderMin = 50;
const placeholderMax = 150;
for (let i = 0; i < 8; i++) {
	placeholders.push(Math.floor(Math.random() * (placeholderMax - placeholderMin)) + placeholderMin);
}
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
				<InputControl
					id="searchbar"
					label="Rechercher un produit"
					v-on:keydown.enter="searchProduct()"
					v-model="searchQuery"
				/>
				<button @click="searchProduct()">
					<Search />
				</button>
			</div>
			<div class="icons">
				<RouterLink to="/compte" data-tooltip-down="Mon compte" class="icon-button"><User /></RouterLink>
				<RouterLink to="/cart" data-tooltip-down="Mon panier" class="icon-button"
					><div v-if="cart.count > 0" class="badge">
						<template v-if="cart.count < 100">{{ cart.count }}</template>
						<!-- <div v-else class="circle"></div> -->
						<Asterisk v-else />
					</div>
					<ShoppingCart
				/></RouterLink>
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
			<RouterLink class="item" @mouseover="moveUnderline" to="/search">Recherche</RouterLink>
			<RouterLink class="item" @mouseover="moveUnderline" to="/about">À propos de nous</RouterLink>
		</div>
	</nav>

	<nav id="navigationProduits">
		<div class="container">
			<template v-if="categories.list !== null">
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
			</template>
			<template v-else>
				<TextPlaceholder
					class="item"
					v-for="placeholder in placeholders"
					v-bind:key="placeholder"
					:width="`${placeholder}px`"
				/>
			</template>
		</div>
	</nav>

	<RouterView />
</template>

<style scoped></style>
