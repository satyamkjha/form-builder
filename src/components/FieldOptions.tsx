// components/FieldOptions.tsx
import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, useToast } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import OptionInput from './OptionInput';

const FieldOptions: React.FC = () => {
	const { state, dispatch } = useForm();
	const { selectedField } = state;
	const toast = useToast();

	const [options, setOptions] = useState<{ value: number; label: string }[]>(
		[]
	);

	useEffect(() => {
		if (selectedField?.options) {
			setOptions(selectedField.options);
		}
	}, [selectedField?.id || '']);

	const updateOptions = (newOptions: { value: number; label: string }[]) => {
		console.log('UPDATE_FIELD');
		dispatch({
			type: 'UPDATE_FIELD',
			payload: {
				id: selectedField?.id || '',
				updates: { options: newOptions },
			},
		});
	};

	const getNextValue = () => {
		const maxValue = options.reduce(
			(max, option) => Math.max(max, option.value),
			0
		);
		return maxValue + 1;
	};

	const handleOptionChange = (value: number, newLabel: string) => {
		const updatedOptions = options.map((option) =>
			option.value === value ? { ...option, label: newLabel } : option
		);
		setOptions(updatedOptions);
		console.log('from optionChage');
		updateOptions(updatedOptions);
	};

	const handleRemoveOption = (value: number) => {
		const updatedOptions = options.filter((option) => option.value !== value);
		setOptions(updatedOptions);
		updateOptions(updatedOptions);
	};

	const handleAddOption = () => {
		const newOption = { value: getNextValue(), label: '' };

		const isDuplicate = options.some(
			(option) => option.label === newOption.label
		);
		if (isDuplicate) {
			toast({
				title: 'Duplicate Value',
				description: 'Each option must have a unique value.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		const updatedOptions = [...options, newOption];
		setOptions(updatedOptions);
		updateOptions(updatedOptions);
	};

	return (
		<Box>
			<Text mb={2}>
				{selectedField?.type === 'checkbox' ? 'Checkbox Options' : 'Options'}
			</Text>
			<VStack spacing={2}>
				{options.map((option) => (
					<OptionInput
						key={option.value}
						label={option.label}
						onChange={(newLabel) => handleOptionChange(option.value, newLabel)}
						onRemove={() => handleRemoveOption(option.value)}
					/>
				))}
				<Button onClick={handleAddOption} size='sm'>
					Add Option
				</Button>
			</VStack>
		</Box>
	);
};

export default FieldOptions;
