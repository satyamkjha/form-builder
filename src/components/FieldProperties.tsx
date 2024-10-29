import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import FieldTextProperties from './FieldTextProperties';
import FieldOptions from './FieldOptions';
import { DeleteIcon } from '@chakra-ui/icons';

const FieldProperties: React.FC = () => {
	const { state, dispatch } = useForm();
	const { selectedField } = state;

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

	const toggleRequired = () => {
		const newRequiredState = !isRequired;
		setIsRequired(newRequiredState);
		dispatch({
			type: 'UPDATE_FIELD',
			payload: {
				id: selectedField.id,
				updates: { required: newRequiredState },
			},
		});
	};

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
			maxHeight='100vh'
			overflowY='auto'>
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
