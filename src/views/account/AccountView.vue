<script setup lang="ts">
import { pathnameToBreadcrumb } from '@/assets/ts/utils';
import BreadCrumb from '@/components/BreadCrumb.vue';
import { User } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
	<main class="container">
		<BreadCrumb :items="pathnameToBreadcrumb(router.currentRoute.value.path, null, 1)">
			<RouterLink to="/compte"><User /></RouterLink>
		</BreadCrumb>
		<RouterView />
	</main>
</template>
