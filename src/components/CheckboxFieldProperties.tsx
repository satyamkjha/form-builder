import React from 'react';
import { Box, VStack, Text, Flex, Button } from '@chakra-ui/react';
import { useForm } from '../FormContext';

const CheckboxFieldProperties: React.FC = () => {
	const { state, dispatch } = useForm();
	const { selectedField } = state;

	const updateOptions = (options: { value: number; label: string }[]) => {
		dispatch({
			type: 'UPDATE_FIELD',
			payload: { id: selectedField?.id || '', updates: { options } },
		});
	};

	const maxValue = () => {
		return 0;
	};

	return (
		<Box>
			<Text mb={2}>Checkbox Options</Text>
			<VStack spacing={2}>
				{selectedField?.options?.map((option, index) => (
					<Flex key={index} gap={2}>
						<input
							type='text'
							value={option.value || ''}
							onChange={(e) => {
								const newOptions = [...(selectedField?.options || [])];
								newOptions[index].label = e.target.value;
								updateOptions(newOptions);
							}}
						/>
						<Button
							onClick={() => {
								const newOptions =
									selectedField?.options?.filter((_, i) => i !== index) || [];
								updateOptions(newOptions);
							}}
							colorScheme='red'
							size='sm'>
							Remove
						</Button>
					</Flex>
				))}
				<Button
					onClick={() => {
						const newOptions = [
							...(selectedField?.options || []),
							{ label: 'New Option', value: maxValue() },
						];
						updateOptions(newOptions);
					}}
					size='sm'>
					Add Option
				</Button>
			</VStack>
		</Box>
	);
};

export default CheckboxFieldProperties;
