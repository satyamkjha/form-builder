// types.ts
export const FORM_ELEMENTS = [
	{
		type: 'text',
		label: 'Text Input',
		icon: 'T',
		defaultProps: {
			placeholder: 'Enter text',
			required: false,
		},
	},
	{
		type: 'textarea',
		label: 'Text Area',
		icon: '📝',
		defaultProps: {
			placeholder: 'Enter text here',
			required: false,
		},
	},
	{
		type: 'number',
		label: 'Number Input',
		icon: '#',
		defaultProps: {
			placeholder: 'Enter number',
			required: false,
		},
	},
	{
		type: 'select',
		label: 'Dropdown',
		icon: '▼',
		defaultProps: {
			options: ['Option 1', 'Option 2'],
			required: false,
		},
	},
	{
		type: 'checkbox',
		label: 'Checkbox',
		icon: '✓',
		defaultProps: {
			required: false,
		},
	},
	{
		type: 'radio',
		label: 'Radio Group',
		icon: '○',
		defaultProps: {
			options: ['Option 1', 'Option 2'],
			required: false,
		},
	},
] as const;
export interface FormField {
	id: string;
	type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'radio';
	label: string;
	placeholder?: string;
	required: boolean;
	options?: { value: number; label: string }[]; // For select, radio, and checkbox
	validation?: {
		pattern?: string;
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
	};
}

export interface Form {
	id: string;
	title: string;
	description: string;
	fields: FormField[];
	createdAt: string;
	updatedAt: string;
}

export interface FormState {
	forms: Form[];
	currentForm: Form | null;
	selectedField: FormField | null;
}
export type FormAction =
	| { type: 'SET_CURRENT_FORM'; payload: Form }
	| { type: 'ADD_FIELD'; payload: FormField }
	| {
			type: 'UPDATE_FIELD';
			payload: { id: string; updates: Partial<FormField> };
	  }
	| { type: 'DELETE_FIELD'; payload: string }
	| { type: 'DELETE_FORM'; payload: string } // Add DELETE_FORM action type
	| { type: 'SELECT_FIELD'; payload: FormField | null }
	| { type: 'SAVE_FORM' }
	| { type: 'UPDATE_FORM_SETTINGS'; payload: Partial<Form> }
	| { type: 'SET_STATE_FROM_STORAGE'; payload: FormState };
