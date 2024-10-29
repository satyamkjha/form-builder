import React, { useEffect } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import { FormField, FORM_ELEMENTS } from '../types';
import ElementsSidebar from './ElementsSidebar';
import FieldProperties from './FieldProperties';
import FormEditor from './FormEditor';

const FormBuilder: React.FC = () => {
	const { state, dispatch } = useForm();
	const toast = useToast();

	useEffect(() => {
		const newForm = {
			id: `form-${Date.now()}`,
			title: '',
			fields: [],
			description: '',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		dispatch({ type: 'SET_CURRENT_FORM', payload: newForm });
	}, [dispatch]);

	const handleAddField = (elementType: (typeof FORM_ELEMENTS)[number]) => {
		const newField: FormField = {
			id: `field-${Date.now()}`,
			type: elementType.type,
			label: elementType.label,
			required: false,
		};

		dispatch({ type: 'ADD_FIELD', payload: newField });
		toast({
			title: 'Field added',
			status: 'success',
			duration: 2000,
		});
	};

	return (
		<Flex h='100vh'>
			<ElementsSidebar onAddField={handleAddField} />
			<FormEditor />
			<FieldProperties />
		</Flex>
	);
};

export default FormBuilder;
