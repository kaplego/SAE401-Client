<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, useTemplateRef } from 'vue';

const navContainer = useTemplateRef('navContainer');

const currentNavItem = ref(null);

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
router.afterEach(async() => {
	await new Promise((r) => setTimeout(r, 5));
	currentNavItem.value = navContainer.value.querySelector('.router-link-active');
	resetUnderline();
});
</script>

<template>
	<header>
		<div class="container">
			<img src="/logo.svg" alt="Miliboo" class="logo" />
			<div class="icones">
				<h1>aaa</h1>
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
