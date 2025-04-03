<script setup lang="ts">
import { Asterisk } from 'lucide-vue-next';

defineProps<{
	name: string;
	label: string;
	options:
		| {
				groupped: false;
				values: Option[];
		  }
		| {
				groupped: true;
				values: OptionGroup[];
		  };
	selected?: any;
	id?: string;
	required?: boolean;
	modelValue?: string;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

function onChange(event: Event) {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
}
</script>

<template>
	<div class="select-control">
		<label class="label" :for="id ?? name">{{ label }} <Asterisk class="required" v-if="required" /></label>
		<select class="input" :name="name" :id="id ?? name" :required="required" :value="modelValue" @change="onChange">
			<template v-if="options.groupped">
				<optgroup v-for="group in options.values" :label="group.label" v-bind:key="group.label">
					<option
						v-for="option in group.options"
						v-bind:key="option.value"
						:value="option.value"
						:selected="selected === option.value"
					>
						{{ option.label }}
					</option>
				</optgroup>
			</template>
			<template v-else>
				<option
					v-for="option in options.values"
					v-bind:key="option.value"
					:value="option.value"
					:selected="selected === option.value"
				>
					{{ option.label }}
				</option>
			</template>
		</select>
	</div>
</template>
