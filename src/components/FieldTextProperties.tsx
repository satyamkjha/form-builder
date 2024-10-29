import React, { useEffect, useState } from 'react';
import { Box, Text, Input } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import { FormField } from '../types';

const FieldTextProperties: React.FC = () => {
	const { state, dispatch } = useForm();
	const { selectedField } = state;

	const [label, setLabel] = useState(selectedField?.label || '');
	const [placeholder, setPlaceholder] = useState(
		selectedField?.placeholder || ''
	);

	useEffect(() => {
		setLabel(selectedField?.label || '');
		setPlaceholder(selectedField?.placeholder || '');
	}, [selectedField]);

	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			if (selectedField) {
				dispatch({
					type: 'UPDATE_FIELD',
					payload: {
						id: selectedField.id,
						updates: { label, placeholder },
					},
				});
			}
		}, 300);

		return () => clearTimeout(debounceTimeout);
	}, [label, placeholder, selectedField, dispatch]);

	if (!selectedField) return null;

	return (
		<>
			<Box>
				<Text mb={2}>Field Label</Text>
				<Input value={label} onChange={(e) => setLabel(e.target.value)} />
			</Box>

			<Box>
				<Text mb={2}>Placeholder</Text>
				<Input
					value={placeholder}
					onChange={(e) => setPlaceholder(e.target.value)}
				/>
			</Box>
		</>
	);
};

export default FieldTextProperties;
