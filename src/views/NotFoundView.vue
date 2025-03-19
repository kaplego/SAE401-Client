<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const isLoading = useLoadingStore();
isLoading.switchLoading(false);
</script>

<template>
	<main>
		<div class="container">
			<h1>Erreur 404</h1>
			<p>La page demandée n'a pas été trouvée...</p>
			<RouterLink to="/">Aller à la page d'accueil</RouterLink>
		</div>
	</main>
</template>
