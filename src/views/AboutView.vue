<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading';

const isLoading = useLoadingStore();
isLoading.switchLoading(false);
</script>

<template>
	<main>
		<div class="container">
			<h1>About us</h1>
		</div>
	</main>
</template>
