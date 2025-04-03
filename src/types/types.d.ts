declare type ID = string | number;
declare type ButtonStyle = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

declare type Autocomplete = {
	type: AutocompleteType;
	values: string[];
}

declare type Option = {
	label: string;
	value: string;
};
declare type OptionGroup = {
	label: string;
	options: Option[];
};
