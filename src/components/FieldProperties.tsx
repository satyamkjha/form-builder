// FieldProperties.tsx
import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import FieldTextProperties from './FieldTextProperties';
import FieldOptions from './FieldOptions';
import { DeleteIcon } from '@chakra-ui/icons';

const FieldProperties: React.FC = () => {
	const { state, dispatch } = useForm();
	const { selectedField } = state;

	// Local state for required field
	const [isRequired, setIsRequired] = useState(
		selectedField?.required || false
	);

	useEffect(() => {
		setIsRequired(selectedField?.required || false);
	}, [selectedField]);

	if (!selectedField) {
		return (
			<Box w='300px' p={4} bg='gray.50' borderLeft='1px' borderColor='gray.200'>
				<Text>Select a field to edit its properties</Text>
			</Box>
		);
	}

	// Toggles the "required" state of the selected field
	const toggleRequired = () => {
		const newRequiredState = !isRequired;
		setIsRequired(newRequiredState); // Update local state
		dispatch({
			type: 'UPDATE_FIELD',
			payload: {
				id: selectedField.id,
				updates: { required: newRequiredState },
			},
		});
	};

	// Handle field deletion
	const handleDelete = () => {
		dispatch({ type: 'DELETE_FIELD', payload: selectedField.id });
	};

	return (
		<Box
			w='300px'
			p={4}
			bg='gray.50'
			borderLeft='1px'
			borderColor='gray.200'
			maxHeight='100vh' // Restrict height to 100vh
			overflowY='auto' // Enable vertical scrolling
		>
			<VStack spacing={4} align='stretch'>
				<FieldTextProperties />
				<Box>
					<Text mb={2}>Required</Text>
					<Button
						onClick={toggleRequired}
						variant={isRequired ? 'solid' : 'outline'}
						colorScheme='blue'>
						{isRequired ? 'Required' : 'Optional'}
					</Button>
				</Box>
				{/* Only render FieldOptions for checkbox, radio, and select */}
				{(selectedField.type === 'checkbox' ||
					selectedField.type === 'radio' ||
					selectedField.type === 'select') && <FieldOptions />}
				<Button
					leftIcon={<DeleteIcon />}
					onClick={handleDelete}
					colorScheme='red'
					variant='outline'>
					Delete Field
				</Button>
			</VStack>
		</Box>
	);
};

export default FieldProperties;
