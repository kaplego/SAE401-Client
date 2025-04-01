<script setup lang="ts">
import { ref } from 'vue';
import StyledButton from '@/components/StyledButton.vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';

const props = defineProps<{
	images: string[];
}>();

const lienImageTop = ref<string>();
const idImageBottom = ref<number>();
idImageBottom.value = 0;
lienImageTop.value = props.images[0];

function carouselImageClicked(image: string, imageHTML: HTMLImageElement) {
	lienImageTop.value = image;
	const smallImagesCarousel: NodeListOf<HTMLImageElement> = document.querySelectorAll('.image-carousel');
	for (const imageCarousel of smallImagesCarousel) {
		imageCarousel.style.borderColor = 'var(--c-gray-50)';
	}
	imageHTML.style.borderColor = 'var(--c-gray-800)';
}

function rightButtonClicked() {
	const indexOfCurrentImage = props.images.indexOf(lienImageTop.value as string);
	if (indexOfCurrentImage + 1 <= props.images.length - 1) {
		lienImageTop.value = props.images[indexOfCurrentImage + 1];
	} else {
		lienImageTop.value = props.images[0];
	}
	const allSmallCarouselImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('.image-carousel');
	allSmallCarouselImages.forEach((img) => { //TODO faire du joli parsing pour pouvoir highlight le bon bouton
		// console.log("imagesProduit"+lienImageTop.value.split("imagesProduit")[1]);
		// console.log("imagesProduit"+img.src.split("imagesProduit")[1]);
		// if (img.src == lienImageTop.value.split("/img/img/")[1]) {
		// 	console.log(lienImageTop.value);
		// 	console.log(img.src);
		// 	carouselImageClicked(lienImageTop.value?.split('img/img/')[1]!, img);
		// }
	});
}
</script>

<template>
	<div class="carousel-container">
		<div class="big-image-container">
			<StyledButton class="button-left" :button-size="'lg'">
				<ArrowLeft />
			</StyledButton>
			<StyledButton class="button-right" :button-size="'lg'" @click="rightButtonClicked()">
				<ArrowRight />
			</StyledButton>
			<img :src="`/img/img/${lienImageTop}`" alt="image de meuble" class="image-carousel-top" />
		</div>
		<div class="carousel-products">
			<div v-for="image in images" v-bind:key="image">
				<img
					:src="`/img/img/${image}`"
					alt="image de meuble"
					class="image-carousel"
					@click="
						(ev) => {
							carouselImageClicked(image, ev.target as HTMLImageElement);
						}
					"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
.button-left {
	position: absolute;
	left: 2rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
}
.button-right {
	position: absolute;
	right: 2rem;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
}
.carousel-products {
	display: flex;
	flex-direction: row;
	overflow: auto;
	background-color: var(--c-gray-50);
	width: 100%;
}
.image-carousel {
	width: 200px;
	height: 200px;
	margin: 1rem;
	border: solid 3px;
	border-color: var(--c-gray-50);
}
.image-carousel-top {
	width: 600px;
	height: 600px;
	margin: 1rem;
}
.carousel-container {
	position: relative;
	padding: 0px 10px 10px 10px;
	background-color: var(--c-gray-300);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.big-image-container {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 10px;
}
</style>
