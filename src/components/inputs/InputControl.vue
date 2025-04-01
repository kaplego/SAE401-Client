<script setup lang="ts">
import { Asterisk } from 'lucide-vue-next';
import type { InputTypeHTMLAttribute } from 'vue';

defineProps<{
	value?: any;
	name: string;
	label: string;
	id?: string;
	placeholder?: string;
	required?: boolean;
	type?: InputTypeHTMLAttribute;
	pattern?: string;
	min?: number;
	max?: number;
	hint?: string;
}>();
</script>

<template>
	<div class="input-control">
		<label class="label" :for="id ?? name">{{ label }} <Asterisk class="required" v-if="required" /></label>
		<input
			class="input"
			:type="type ?? 'text'"
			:name="name"
			:id="id ?? name"
			:value="value"
			:placeholder="!placeholder || placeholder.length === 0 ? ' ' : placeholder"
			:required="required"
			:pattern="pattern"
			:min="min"
			:max="max"
		/>
		<p class="hint" v-if="hint">{{ hint }}</p>
	</div>
</template>
