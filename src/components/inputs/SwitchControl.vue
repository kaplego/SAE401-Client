<script setup lang="ts">
import { Asterisk } from 'lucide-vue-next';

defineProps<{
	name?: string;
	label: string;
	id?: string;
	required?: boolean;
	hint?: string;
	modelValue?: boolean;
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void;
}>();

// Effectuer l'autocomplétion lorsque l'utilisateur sort du champ
function onChange(event: Event) {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value == 'on');
}
</script>

<template>
	<div class="switch-control">
		<label class="label" :for="id ?? name">{{ label }} <Asterisk class="required" v-if="required" /></label>
		<div class="switch">
			<input
				class="switch-input"
				type="checkbox"
				:name="name"
				:id="id ?? name"
				value="on"
				@change="onChange"
				:required="required"
			/>
			<label :for="id ?? name" class="switch-track">
				<div class="switch-knob"></div>
			</label>
		</div>
		<p class="hint" v-if="hint">{{ hint }}</p>
	</div>
</template>
