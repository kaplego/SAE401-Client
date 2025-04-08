<script setup lang="ts">
import { pathnameToBreadcrumb } from '@/assets/ts/utils';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { Home } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
	<main class="container">
		<BreadCrumb :items="pathnameToBreadcrumb(router.currentRoute.value.path, ['Mon Compte'])">
			<RouterLink to="/"><Home /></RouterLink>
			<div class="breadcrumb-separator">/</div>
		</BreadCrumb>
		<RouterView />
	</main>
</template>
