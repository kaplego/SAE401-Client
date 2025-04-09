import { useDepartementsStore } from '@/stores/api/departements';
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

const departements = useDepartementsStore();

test('are departements not null', () => {
	expect(useDepartementsStore).not.toBeNull();
});

test('are departements not empty', () => {
	expect(useDepartementsStore).length.above(0);
});

test('do departements contain departements', async () => {
	return new Promise((r) => {
		departements.onLoad(() => {
			r(expect(departements.list?.[0]).toBeTypeOf('object'));
		});
	});
}, TESTS_ASYNC_TIMEOUT);
