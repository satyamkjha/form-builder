import React, { useState, useEffect } from 'react';
import { Flex, Input, IconButton } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';

interface OptionInputProps {
	label: string;
	onChange: (label: string) => void;
	onRemove: () => void;
}

const OptionInput: React.FC<OptionInputProps> = ({
	label,
	onChange,
	onRemove,
}) => {
	const [inputLabel, setInputLabel] = useState(label);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (inputLabel !== '') {
				onChange(inputLabel);
			}
		}, 300); // Debounce delay

		return () => {
			clearTimeout(handler);
		};
	}, [inputLabel]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputLabel(e.target.value);
	};

	return (
		<Flex gap={2} align='center'>
			<Input value={inputLabel} onChange={handleInputChange} />
			<IconButton
				aria-label='Remove option'
				icon={<MinusIcon />}
				colorScheme='red'
				onClick={onRemove}
				size='sm'
			/>
		</Flex>
	);
};

export default OptionInput;
