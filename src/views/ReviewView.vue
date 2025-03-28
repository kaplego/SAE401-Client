<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';
import { useRouter } from 'vue-router';
import router from '@/router';
import API from '@/assets/ts/api';

const isLoading = useLoadingStore();
isLoading.switchLoading(false);
</script>

<template>
	<main>
		<div class="container">
			<h1>Vos avis !</h1>
			<p>Vous avez posté x avis</p>
		</div>
	</main>
</template>
