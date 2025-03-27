<script setup lang="ts">
import { Asterisk } from 'lucide-vue-next';

type Option = {
	label: string;
	value: string;
};

type OptionGroup = {
	label: string;
	options: Option[];
};

defineProps<{
	name: string;
	label: string;
	options:
		| {
				groups: false;
				values: Option[];
		  }
		| {
				groups: true;
				values: OptionGroup[];
		  };
	selected?: any;
	id?: string;
	required?: boolean;
}>();
</script>

<template>
	<div class="select-control">
		<label class="label" :for="id ?? name">{{ label }} <Asterisk class="required" v-if="required" /></label>
		<select class="input" :name="name" :id="id ?? name" :required="required">
			<template v-if="options.groups">
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
