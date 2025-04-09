import { useCategoriesStore } from '@/stores/api/categories';
import { expect, test } from 'vitest';

import App from '@/App.vue';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { createPinia } from 'pinia';
import { TESTS_ASYNC_TIMEOUT } from '@/assets/ts/utils';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

const categories = useCategoriesStore();

test('are categories not null', () => {
	expect(useCategoriesStore).not.toBeNull();
});

test('are categories not empty', () => {
	expect(useCategoriesStore).length.above(0);
});

test('do categories contain categories', async () => {
	return new Promise((r) => {
		categories.onLoad(() => {
			r(expect(categories.list![0]).toBeTypeOf('object'));
		});
	});
}, TESTS_ASYNC_TIMEOUT);
