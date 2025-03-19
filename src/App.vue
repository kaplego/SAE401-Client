<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, useTemplateRef } from 'vue';
import { THEME, useThemeStore } from './stores/theme';
import { Moon, Search, Sun } from 'lucide-vue-next';

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
</script>

<template>
	<header>
		<div class="container">
			<img src="/logo.svg" alt="Miliboo" class="logo" />
			<div id="recherche">
				<input type="text" placeholder="Rechercher un produit..." />
				<button>
					<Search />
				</button>
			</div>
			<div class="icones">
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

	<RouterView />
</template>

<style scoped></style>
