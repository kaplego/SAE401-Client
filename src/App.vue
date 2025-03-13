<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<header>
		<img src="/logo.svg" alt="Miliboo" class="logo" />
		<h1>aaa</h1>
	</header>

	<nav>
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/about">About</RouterLink>
	</nav>

	<RouterView />
</template>

<style scoped></style>
