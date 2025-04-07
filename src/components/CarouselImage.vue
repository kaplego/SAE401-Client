<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import StyledButton from '@/components/StyledButton.vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';

const props = defineProps<{
	images: string[];
	alts?: string[];
}>();

const selectedIndex = ref<number>(0);
const bottomImagesContainer = ref<HTMLDivElement>();
const bottomImages = ref<HTMLDivElement[]>([]);

watchEffect(() => {
	const image = bottomImages.value.find((v) => v.getAttribute('data-index') === selectedIndex.value.toString());
	if (!image) return;

	// Faire défiler la liste des photos jusqu'à la photo sélectionnée
	bottomImagesContainer.value?.scrollTo({
		behavior: 'smooth',
		left: image.offsetLeft,
	});
});
</script>

<template>
	<div class="carousel-container">
		<div class="big-image-container">
			<StyledButton
				class="button-left"
				:button-size="'lg'"
				@click="selectedIndex = (selectedIndex <= 0 ? images.length : selectedIndex) - 1"
			>
				<ArrowLeft />
			</StyledButton>
			<img :src="`/img/img/${images[selectedIndex]}`" :alt="alts?.[selectedIndex]" class="image-carousel-top" />
			<StyledButton
				class="button-right"
				:button-size="'lg'"
				@click="selectedIndex = (selectedIndex + 1) % props.images.length"
			>
				<ArrowRight />
			</StyledButton>
		</div>
		<div class="carousel-products" ref="bottomImagesContainer">
			<div v-for="image in images" v-bind:key="image" ref="bottomImages" :data-index="images.indexOf(image)">
				<img
					:src="`/img/img/${image}`"
					:alt="alts?.[images.indexOf(image)]"
					:class="`image-carousel ${selectedIndex === images.indexOf(image) ? 'selected' : ''}`"
					@click="selectedIndex = images.indexOf(image)"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.carousel-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 100%;
	overflow: hidden;

	.big-image-container {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 10px;
		aspect-ratio: 1;

		.image-carousel-top {
			width: clamp(100px, 600px, 100%);
			aspect-ratio: 1;
			margin: 1rem;
			border-radius: 8px;
		}

		.button {
			position: absolute;
			bottom: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;

			&.button-left {
				left: 0.75rem;
			}

			&.button-right {
				right: 0.75rem;
			}
		}
	}
	.carousel-products {
		display: flex;
		flex-direction: row;
		overflow: auto;
		background-color: var(--t-background2);
		width: 100%;
		border-radius: 8px;

		.image-carousel {
			width: 200px;
			height: 200px;
			margin: 1rem;
			border: solid 4px transparent;
			cursor: pointer;
			border-radius: 6px;

			&.selected {
				border-color: var(--t-border2-accent);
			}
		}
	}
}
</style>
