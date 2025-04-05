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
	autocomplete?: Autocomplete;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

// Mettre à jour le `v-model` lorsque l'utilisateur écrit
function onInput(event: Event) {
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
	if (!props.autocomplete || value === '') return value;
	switch (props.autocomplete.type) {
		// Cherche un résultat exact
		case AutocompleteType.Exact:
			const strExact = props.autocomplete.values.find((v) => v.toUpperCase().startsWith(value.toUpperCase()));
			return strExact ?? value;
		// Cherche un résultat exact s'il existe
		case AutocompleteType.ExactWithFallback:
			const strExactFallback = props.autocomplete.values.find((v) =>
				v.toUpperCase().startsWith(value.toUpperCase()),
			);
			if (strExactFallback) return strExactFallback; // S'il existe, sinon :
		// Cherche le résultat le plus proches
		case AutocompleteType.Near:
			let nearest: [number, string] | null = null;
			for (const str of props.autocomplete.values) {
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
	<div class="input-control">
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
		/>
		<p class="hint" v-if="hint">{{ hint }}</p>
	</div>
</template>
