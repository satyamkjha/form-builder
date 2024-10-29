// components/FormContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { FormState, FormAction, Form, FormField } from './types';
import { useToast } from '@chakra-ui/react';

const initialState: FormState = {
	forms: [],
	currentForm: null,
	selectedField: null,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
	switch (action.type) {
		case 'SET_CURRENT_FORM':
			return {
				...state,
				currentForm: action.payload,
				selectedField: null,
			};

		case 'ADD_FIELD':
			if (!state.currentForm) return state;
			const newField = action.payload;
			return {
				...state,
				currentForm: {
					...state.currentForm,
					fields: [...state.currentForm.fields, newField],
					updatedAt: new Date().toISOString(),
				},
				selectedField: newField,
			};

		case 'UPDATE_FIELD':
			if (!state.currentForm) return state;
			return {
				...state,
				currentForm: {
					...state.currentForm,
					fields: state.currentForm.fields.map((field) =>
						field.id === action.payload.id
							? { ...field, ...action.payload.updates }
							: field
					),
					updatedAt: new Date().toISOString(),
				},
			};

		case 'DELETE_FIELD':
			if (!state.currentForm) return state;
			return {
				...state,
				currentForm: {
					...state.currentForm,
					fields: state.currentForm.fields.filter(
						(field) => field.id !== action.payload
					),
					updatedAt: new Date().toISOString(),
				},
				selectedField: null,
			};

		case 'SELECT_FIELD':
			return {
				...state,
				selectedField: action.payload,
			};

		case 'SAVE_FORM':
			if (!state.currentForm) return state;
			const formIndex = state.forms.findIndex(
				(form) => form.id === state.currentForm?.id
			);

			if (formIndex === -1) {
				return {
					...state,
					forms: [...state.forms, state.currentForm],
				};
			}

			return {
				...state,
				forms: state.forms.map((form, index) =>
					index === formIndex ? state.currentForm! : form
				),
			};

		case 'UPDATE_FORM_SETTINGS':
			if (!state.currentForm) return state;
			return {
				...state,
				currentForm: {
					...state.currentForm,
					...action.payload,
					updatedAt: new Date().toISOString(),
				},
			};

		case 'SET_STATE_FROM_STORAGE':
			return action.payload;

		case 'DELETE_FORM':
			return {
				...state,
				forms: state.forms.filter((form) => form.id !== action.payload),
			};

		default:
			return state;
	}
};

const FormContext = createContext<{
	state: FormState;
	dispatch: React.Dispatch<FormAction>;
	saveFormAndToast: () => void;
	saveStateToLocalStorage: () => void;
} | null>(null);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const toast = useToast();

	const saveFormAndToast = () => {
		if (!state.currentForm) return;

		if (!state.currentForm.title || state.currentForm.title.trim() === '') {
			toast({
				title: 'Form title is required!',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		dispatch({ type: 'SAVE_FORM' });

		toast({
			title: 'Form saved successfully!',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
		localStorage.setItem('formState', JSON.stringify(state));
	};

	const saveStateToLocalStorage = () => {
		localStorage.setItem('formState', JSON.stringify(state));
		toast({
			title: 'State saved to local storage!',
			status: 'success',
			duration: 3000,
			isClosable: true,
		});
	};

	const loadStateFromLocalStorage = () => {
		const savedState = localStorage.getItem('formState');
		if (savedState) {
			dispatch({
				type: 'SET_STATE_FROM_STORAGE',
				payload: JSON.parse(savedState),
			});
		}
	};

	useEffect(() => {
		loadStateFromLocalStorage();
	}, []);

	return (
		<FormContext.Provider
			value={{ state, dispatch, saveFormAndToast, saveStateToLocalStorage }}>
			{children}
		</FormContext.Provider>
	);
};

export const useForm = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error('useForm must be used within a FormProvider');
	}
	return context;
};
