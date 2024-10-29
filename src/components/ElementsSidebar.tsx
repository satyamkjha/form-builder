import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { useForm } from '../FormContext';
import { FORM_ELEMENTS } from '../types';
import FormPreviewModal from './FormPreviewModal';
import { useNavigate } from 'react-router-dom'; // Import useHistory

const ElementsSidebar: React.FC<{
	onAddField: (element: (typeof FORM_ELEMENTS)[number]) => void;
}> = ({ onAddField }) => {
	const [isModalOpen, setModalOpen] = React.useState(false);
	const { saveFormAndToast, saveStateToLocalStorage } = useForm();
	const navigate = useNavigate(); // Initialize useHistory

	const { state } = useForm();


	return (
		<Box
			w='250px'
			p={4}
			bg='gray.50'
			borderRight='1px'
			borderColor='gray.200'
			maxHeight='100vh'
			overflowY='auto'>
			<Text fontSize='xl' mb={4}>
				Form Elements
			</Text>
			<VStack spacing={2}>
				{FORM_ELEMENTS.map((element) => (
					<Button
						key={element.type}
						w='full'
						leftIcon={<Text fontSize='lg'>{element.icon}</Text>}
						onClick={() => onAddField(element)}
						variant='outline'>
						{element.label}
					</Button>
				))}
			</VStack>

			<VStack spacing={4} mt={4}>
				<Button w='full' onClick={() => setModalOpen(true)} colorScheme='teal'>
					Preview Form
				</Button>
				<Button w='full' colorScheme='blue' onClick={saveFormAndToast}>
					Generate Form
				</Button>
				<Button w='full' colorScheme='green' onClick={saveStateToLocalStorage}>
					Save State
				</Button>
				<Button
					w='full'
					colorScheme='blackAlpha'
					onClick={() => navigate('/forms')}>
					Forms Dashboard
				</Button>
				<FormPreviewModal
					currentForm={state.currentForm}
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
				/>
			</VStack>
		</Box>
	);
};

export default ElementsSidebar;
