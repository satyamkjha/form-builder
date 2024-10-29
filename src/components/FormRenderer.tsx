import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import FieldPreview from './FieldPreview';

const FormRenderer: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { state } = useForm();
	const currentForm = state.forms.find((form) => form.id === id);

	return (
		<Flex
			width={'100vw'}
			height={'100vh'}
			bg='gray.50'
			justifyContent={'center'}
			alignItems={'center'}>
			<Box
				width={'100%'}
				maxWidth='1400px'
				height={'100vh'}
				margin='0 auto'
				padding={5}
				bg='white'>
				{!currentForm ? (
					<Text fontSize='lg' color='red.500'>
						Form not found.
					</Text>
				) : (
					<VStack height='fit-content' spacing={4} align='stretch'>
						<Heading size='lg'>{currentForm.title}</Heading>
						{currentForm.fields.map((field) => (
							<FieldPreview
								key={field.id}
								field={field}
								onSelect={() => {}}
								isDisabled={false}
							/>
						))}
					</VStack>
				)}
			</Box>
		</Flex>
	);
};

export default FormRenderer;
