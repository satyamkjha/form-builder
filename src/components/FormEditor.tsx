// components/FormBuilder.tsx
import React from 'react';
import { Box, VStack, Text, Input } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import FieldPreview from './FieldPreview';

const FormEditor: React.FC = () => {
	const { state, dispatch } = useForm();

	if (!state.currentForm) {
		return (
			<Box flex={1} p={8} textAlign='center'>
				<Text>Create a new form to get started</Text>
			</Box>
		);
	}

	console.log(state.currentForm);

	return (
		<Box flex={1} p={8} maxHeight='100vh' overflowY='auto'>
			<VStack spacing={4} align='stretch'>
				<Input
					placeholder='Form Title'
					value={state.currentForm.title}
					onChange={(e) =>
						dispatch({
							type: 'UPDATE_FORM_SETTINGS',
							payload: { title: e.target.value },
						})
					}
				/>
				{state.currentForm.fields.map((field) => (
					<FieldPreview
						key={field.id}
						field={field}
						isDisabled={true}
						onSelect={() => dispatch({ type: 'SELECT_FIELD', payload: field })}
					/>
				))}
			</VStack>
		</Box>
	);
};

export default FormEditor;
