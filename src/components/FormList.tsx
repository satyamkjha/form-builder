import React from 'react';
import { Box, Button, SimpleGrid, Text, VStack, Flex } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import { useNavigate } from 'react-router-dom';
import { Form } from '../types';

const FormList: React.FC = () => {
	const { state, dispatch } = useForm();
	const forms = state.forms;
	const navigate = useNavigate();

	const deleteForm = (id: string) => {
		dispatch({ type: 'DELETE_FORM', payload: id });
	};

	const viewForm = (formId: string) => {
		navigate(`/forms/${formId}`); 
	};

	return (
		<Box
			m={5}
			p={5}
			borderWidth={1}
			borderRadius='md'
			boxShadow='sm'
			borderColor='gray.200'>
			<Flex justifyContent='space-between' alignItems='center' mb={4}>
				<Text fontSize='2xl'>All Forms</Text>
				<Button
					colorScheme='blue'
					onClick={() => navigate('/create-forms')}
					ml='auto'>
					Create a Form
				</Button>
			</Flex>

			{forms.length === 0 ? (
				<VStack spacing={4} align='center' justify='center' minHeight='200px'>
					<Text fontSize='lg'>You have not created any forms yet.</Text>
					<Button colorScheme='blue' onClick={() => navigate('/create-forms')}>
						Create a Form
					</Button>
				</VStack>
			) : (
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
					{forms.map((form) => (
						<Box
							key={form.id}
							p={4}
							borderRadius='md'
							boxShadow='md'
							bg='white'>
							<VStack spacing={2}>
								<Text fontSize='lg' fontWeight='bold'>
									{form.title}
								</Text>
								<Text color='gray.500'>
									Created At: {new Date(form.createdAt).toLocaleDateString()}
								</Text>
								<Text color='gray.500'>
									Updated At: {new Date(form.updatedAt).toLocaleDateString()}
								</Text>
								<Button
									colorScheme='blue'
									size='sm'
									onClick={() => viewForm(form.id)}>
									View Form
								</Button>
								<Button
									colorScheme='red'
									size='sm'
									onClick={() => deleteForm(form.id)}>
									Delete Form
								</Button>
							</VStack>
						</Box>
					))}
				</SimpleGrid>
			)}
		</Box>
	);
};

export default FormList;
