<template>
	<div class="loading loading-lg">
		<div class="loading-spinner"></div>
	</div>
</template>

<style lang="scss">
.loading {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&.loading-sm .loading-spinner {
		height: 1em;
	}

	&.loading-lg .loading-spinner {
		height: 2em;
	}
}
</style>
