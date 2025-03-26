<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useLoggedInStore } from '@/stores/login';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = useLoggedInStore();

if (!login.isLoggedIn) router.push('/login');

watchEffect(() => {
	if (login.clientReady && login.client === null) router.push('/login');
});
</script>

<template>
	<main class="container">
		<template v-if="login.client !== null">
			<h1>Mes informations personnelles</h1>
			<div class="grille-infos"></div>
		</template>
		<LoadingSpinner v-else />
	</main>
</template>

<style lang="scss" scoped>
.grille-infos {
	display: grid;

}
</style>
