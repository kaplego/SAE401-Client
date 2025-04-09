import { usePaysStore } from '@/stores/api/pays';
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

const pays = usePaysStore();

test('are pays not null', () => {
	expect(usePaysStore).not.toBeNull();
});

test('are pays not empty', () => {
	expect(usePaysStore).length.above(0);
});

test('do pays contain pays', async () => {
	return new Promise((r) => {
		pays.onLoad(() => {
			r(expect(pays.list?.[0]).toBeTypeOf('object'));
		});
	});
}, TESTS_ASYNC_TIMEOUT);
