import { useDepartementsStore } from '@/stores/api/departements';
import { expect, test } from 'vitest';


import App from '@/App.vue';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

function sleep(ms: number = 200) {
	return new Promise<void>((r) => {
		setTimeout(() => {
			r();
		}, ms);
	});
}

const departements = useDepartementsStore();

test('are departements not null', () => {
	expect(useDepartementsStore).not.toBeNull();
});

test('are departements not empty', () => {
	expect(useDepartementsStore).length.above(0);
});

test('do departements contain departements', async () => {
	await sleep(5000);
	expect(departements.list?.[0]).toBeTypeOf('object');
}, 150000);
