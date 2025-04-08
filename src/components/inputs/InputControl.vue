<script setup lang="ts">
import { AutocompleteType, levenshteinDistance } from '@/assets/ts/utils';
import { Asterisk } from 'lucide-vue-next';
import type { InputTypeHTMLAttribute } from 'vue';

const props = defineProps<{
	name?: string;
	label: string;
	id?: string;
	placeholder?: string;
	required?: boolean;
	type?: InputTypeHTMLAttribute;
	pattern?: string;
	min?: number;
	max?: number;
	hint?: string;
	modelValue?: string;
	autocompletion?: Autocomplete;
	autocomplete?:
		| 'home'
		| 'work'
		| 'mobile'
		| 'fax'
		| 'page'
		| 'tel'
		| 'tel-country-code'
		| 'tel-national'
		| 'tel-area-code'
		| 'tel-local'
		| 'tel-extension'
		| 'email'
		| 'impp'
		| 'name'
		| 'honorific-prefix'
		| 'given-name'
		| 'additional-name'
		| 'family-name'
		| 'honorific-suffix'
		| 'nickname'
		| 'username'
		| 'new-password'
		| 'current-password'
		| 'one-time-code'
		| 'organization-title'
		| 'organization'
		| 'street-address'
		| 'address-line1'
		| 'address-line2'
		| 'address-line3'
		| 'address-level4'
		| 'address-level3'
		| 'address-level2'
		| 'address-level1'
		| 'country'
		| 'country-name'
		| 'postal-code'
		| 'cc-name'
		| 'cc-given-name'
		| 'cc-additional-name'
		| 'cc-family-name'
		| 'cc-number'
		| 'cc-exp'
		| 'cc-exp-month'
		| 'cc-exp-year'
		| 'cc-csc'
		| 'cc-type'
		| 'transaction-currency'
		| 'transaction-amount'
		| 'language'
		| 'bday'
		| 'bday-day'
		| 'bday-month'
		| 'bday-year'
		| 'sex'
		| 'url'
		| 'photo';
	inputSize?: 'sm' | 'md' | 'lg';
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void;
	(e: 'input', event: InputEvent): void;
	(e: 'keydown', event: KeyboardEvent): void;
}>();

// Mettre à jour le `v-model` lorsque l'utilisateur écrit
function onInput(event: Event) {
	emit('input', event as InputEvent);
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
}

// Effectuer l'autocomplétion lorsque l'utilisateur sort du champ
function onChange(event: Event) {
	const target = event.target as HTMLInputElement;
	target.value = getAutocompletion(target.value);
	emit('update:modelValue', target.value);
}

function getAutocompletion(value: string) {
	if (!props.autocompletion || value === '') return value;
	switch (props.autocompletion.type) {
		// Cherche un résultat exact
		case AutocompleteType.Exact:
			const strExact = props.autocompletion.values.find((v) => v.toUpperCase().startsWith(value.toUpperCase()));
			return strExact ?? value;
		// Cherche un résultat exact s'il existe
		case AutocompleteType.ExactWithFallback:
			const strExactFallback = props.autocompletion.values.find((v) =>
				v.toUpperCase().startsWith(value.toUpperCase()),
			);
			if (strExactFallback) return strExactFallback; // S'il existe, sinon :
		// Cherche le résultat le plus proches
		case AutocompleteType.Near:
			let nearest: [number, string] | null = null;
			for (const str of props.autocompletion.values) {
				// Utilise la distance de Levenshtein
				const l = levenshteinDistance(value.toUpperCase(), str);
				if (nearest == null || l < nearest[0]) nearest = [l, str];
			}
			// Renvoie le résultat le plus proche
			return nearest?.[1] ?? value;
	}
	return value;
}
</script>

<template>
	<div :class="`input-control input-${inputSize ?? 'md'}`">
		<label class="label" :for="id ?? name">{{ label }} <Asterisk class="required" v-if="required" /></label>
		<input
			class="input"
			:type="type ?? 'text'"
			:name="name"
			:id="id ?? name"
			:value="modelValue"
			@input="onInput"
			@change="onChange"
			:placeholder="!placeholder || placeholder.length === 0 ? ' ' : placeholder"
			:required="required"
			:pattern="pattern"
			:min="min"
			:max="max"
			:autocomplete="autocomplete"
			@keydown="(e) => emit('keydown', e as KeyboardEvent)"
		/>
		<p class="hint" v-if="hint">{{ hint }}</p>
	</div>
</template>
