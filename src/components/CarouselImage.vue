<script setup lang="ts">
import { ref } from 'vue';
import StyledButton from '@/components/StyledButton.vue';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';

const props = defineProps<{
	images: string[];
}>();

const selectedIndex = ref<number>(0);
</script>

<template>
	<div class="carousel-container">
		<div class="big-image-container">
			<StyledButton class="button-left" :button-size="'lg'" @click="selectedIndex = (selectedIndex === 0 ? images.length : selectedIndex) - 1">
				<ArrowLeft />
			</StyledButton>
			<StyledButton class="button-right" :button-size="'lg'" @click="selectedIndex = (selectedIndex + 1) % props.images.length">
				<ArrowRight />
			</StyledButton>
			<img :src="`/img/img/${images[selectedIndex]}`" alt="image de meuble" class="image-carousel-top" />
		</div>
		<div class="carousel-products">
			<div v-for="image in images" v-bind:key="image">
				<img
					:src="`/img/img/${image}`"
					alt="image de meuble"
					:class="`image-carousel ${selectedIndex === images.indexOf(image) ? 'selected' : ''}`"
					@click="
						(ev) => {
							selectedIndex = images.indexOf(image);
						}
					"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
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
	cursor: pointer;

	&.selected {
		border-color: black;
	}
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
