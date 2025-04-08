import { expect, test } from 'vitest';
import { createApp } from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { createPinia } from 'pinia';
import {
	cardNumberFormat,
	cardNumberReverseFormat,
	finalPrice,
	levenshteinDistance,
	pathnameToBreadcrumb,
	phoneFormat,
	phoneReverseFormat,
} from '@/assets/ts/utils';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

test('phoneFormat fonctionne', () => {
	const basePhoneNumber: string = '33692829381';

	const formatedPhoneNumber = phoneFormat(basePhoneNumber);

	expect(formatedPhoneNumber).toBe('06 92 82 93 81');
});

test('phoneReverseFormat fonctionne', () => {
	const baseFormatedPhoneNumber: string = '06 92 82 93 81';

	const unformatedNumber = phoneReverseFormat(baseFormatedPhoneNumber);

	expect(unformatedNumber).toBe('33692829381');
});

test('cardNumberFormat fonctionne', () => {
	const baseCardNumber = '1234123412341234';

	const formatedCardNumber = cardNumberFormat(baseCardNumber);

	expect(formatedCardNumber).toBe('1234 1234 1234 1234');
});

test('cardNumberReverseFormat fonctionne', () => {
	const baseFormatedCardNumber = '1234 1234 1234 1234';

	const unformatedCardNumber = cardNumberReverseFormat(baseFormatedCardNumber);

	expect(unformatedCardNumber).toBe('1234123412341234');
});

test('finalPrice fonctionne', () => {
	expect(finalPrice(100, 69, 2)).toBe(138);
	expect(finalPrice(100, null, 2)).toBe(200);
	expect(finalPrice(2, null, 60)).toBe(120);
});

test('pathnameToBreadcrumb fonctionne', () => {
	expect(pathnameToBreadcrumb('/test/1', ['Test', 'First'])).toMatchObject([
		{ key: '0', label: 'Test', type: 'link', path: '/test' },
		{ key: '1', label: 'First', type: 'text' },
	]);
	expect(pathnameToBreadcrumb('/un/tres/long/chemin', ['Un', 'Très', 'Long', 'Chemin'])).toMatchObject([
		{ key: '0', label: 'Un', type: 'link', path: '/un' },
		{ key: '1', label: 'Très', type: 'link', path: '/un/tres' },
		{ key: '2', label: 'Long', type: 'link', path: '/un/tres/long' },
		{ key: '3', label: 'Chemin', type: 'text' },
	]);
	expect(pathnameToBreadcrumb('/un/autre/long/chemin', ['Un', 'Autre', 'Chemin'], 1)).toMatchObject([
		{ key: '1', label: 'Un', type: 'link', path: '/un/autre' },
		{ key: '2', label: 'Autre', type: 'link', path: '/un/autre/long' },
		{ key: '3', label: 'Chemin', type: 'text' },
	]);
});

test('levenshteinDistance fonctionne', () => {
	expect(levenshteinDistance('chaise', 'chaize')).toBe(1);
	expect(levenshteinDistance('canapé', 'sofa')).toBe(5);
	expect(levenshteinDistance('sofa', 'canapé')).toBe(5);
	expect(levenshteinDistance('armoire', 'étagère')).toBe(5);
	expect(levenshteinDistance('armoire', 'lit')).toBe(6);
	expect(levenshteinDistance('rick', 'astley')).toBe(6);
});
