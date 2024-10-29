import React from 'react';
import {
	Box,
	Flex,
	VStack,
	Text,
	Input,
	Select,
	Radio,
	RadioGroup,
	Stack,
	NumberInput,
	NumberInputField,
	Textarea,
	Checkbox,
	Button,
} from '@chakra-ui/react';
import { useForm } from '../FormContext';
import { FormField } from '../types';

interface FieldPreviewProps {
	field: FormField;
	onSelect: () => void;
	isDisabled: boolean;
}

const FieldPreview: React.FC<FieldPreviewProps> = ({
	field,
	onSelect,
	isDisabled,
}) => {
	const renderField = () => {
		switch (field.type) {
			case 'text':
				return (
					<Input placeholder={field.placeholder} isDisabled={isDisabled} />
				);

			case 'number':
				return (
					<NumberInput isDisabled={isDisabled}>
						<NumberInputField placeholder={field.placeholder} />
					</NumberInput>
				);

			case 'select':
				return (
					<Select isDisabled={isDisabled}>
						{field.options?.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				);

			case 'radio':
				return (
					<RadioGroup>
						<Stack>
							{field.options?.map((option) => (
								<Radio
									key={option.value}
									value={`${option.value}`}
									isDisabled={isDisabled}>
									{option.label}
								</Radio>
							))}
						</Stack>
					</RadioGroup>
				);

			case 'checkbox':
				return (
					<Flex direction='column'>
						{field.options?.map((option) => (
							<Checkbox key={option.value} isDisabled={isDisabled}>
								<Text ml={2}>{option.label}</Text>
							</Checkbox>
						))}
					</Flex>
				);

			case 'textarea':
				return (
					<Textarea placeholder={field.placeholder} isDisabled={isDisabled} />
				);

			default:
				return null;
		}
	};

	return (
		<Box
			p={4}
			border='1px'
			borderColor='gray.200'
			borderRadius='md'
			onClick={onSelect}
			cursor='pointer'
			_hover={{ bg: 'gray.50' }}>
			<Text fontWeight='bold' mb={2}>
				{field.label}{' '}
				{field.required && (
					<Text as='span' color='red.500'>
						*
					</Text>
				)}
			</Text>
			{renderField()}
		</Box>
	);
};

export default FieldPreview;
