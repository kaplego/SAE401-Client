<script setup lang="ts">
defineProps<{
	items: AnyBreadcrumbItem[];
}>();
</script>

<template>
	<div class="breadcrumb">
		<slot></slot>
		<template v-for="item in items" v-bind:key="item.key">
			<div class="breadcrumb-separator">/</div>
			<RouterLink v-if="item.type === 'link'" :to="(item as BreadcrumbLinkItem).path">
				{{ item.label }}
			</RouterLink>
			<p v-else>
				{{ item.label }}
			</p>
		</template>
	</div>
</template>

<style lang="scss">
.breadcrumb {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	> * {
		display: flex;
	}

	a {
		color: dodgerblue;
	}
}
</style>
