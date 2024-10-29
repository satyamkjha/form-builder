import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Form } from '../types'; // Ensure you import the Form type if necessary
import FieldPreview from './FieldPreview';

interface FormPreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentForm: Form | null;
}

const FormPreviewModal: React.FC<FormPreviewModalProps> = ({
	isOpen,
	onClose,
	currentForm,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered>
			<ModalOverlay />
			<ModalContent borderRadius={0}>
				<ModalHeader>Form Preview</ModalHeader>
				<ModalCloseButton />
				<ModalBody maxHeight={'70vh'} overflowY={'scroll'}>
					{currentForm ? (
						<VStack height={'fit-content'} spacing={4} align='stretch'>
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
					) : (
						<Text>No form available to preview.</Text>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default FormPreviewModal;
