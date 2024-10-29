// App.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { FormProvider } from './FormContext';
import FormBuilder from './components/FormBuilder';
import FormList from './components/FormList';
import FormRenderer from './components/FormRenderer';

function App() {
	return (
		<Router basename='/form-builder'>
			<Suspense fallback=''>
				<ChakraProvider>
					<FormProvider>
						<Routes>
							<Route path='/create-forms' element={<FormBuilder />} />
							<Route path='/forms' element={<FormList />} />
							<Route path='/' element={<FormList />} />
							<Route path='/forms/:id' element={<FormRenderer />} />
						</Routes>
					</FormProvider>
				</ChakraProvider>
			</Suspense>
		</Router>
	);
}

export default App;
