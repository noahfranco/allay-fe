import React, { useState, useEffect, useRef } from 'react';
import ReactGA from 'react-ga'; // for google analytics

import { useForm } from 'react-hook-form';

import {
	FormControl,
	Flex,
	Select,
	Input,
	Textarea,
	Button,
	ButtonGroup,
	Spinner,
	FormErrorMessage,
	FormLabel,
	Link,
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogOverlay,
	AlertDialogFooter,
	Checkbox
} from '@chakra-ui/core';

import { connect } from 'react-redux';
import postReview from '../../state/actions';
import getCompanies from '../../state/actions';
import postCompany from '../../state/actions';

const ReviewForm = ({
	postReview,
	getCompanies,
	companies,
	history,
	isLoading
}) => {
	const { register, handleSubmit, errors, formState } = useForm();
	// specifically for the cancel button functionality
	const [isOpen, setIsOpen] = useState();
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();
	// search state
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	// validating salary
	function validateSalary(value) {
		let error;
		if (!value) {
			error = 'Salary is required';
		} else if (value < 0) {
			error = 'Salary cannot be less than zero.';
		}
		return error || true;
	}

	useEffect(() => {
		getCompanies();
	}, [getCompanies]);

	useEffect(() => {
		if (searchTerm.length >= 3) {
			const results = companies.filter(company =>
				company.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setSearchResults(results);
		}
	}, [searchTerm, companies]);

	const submitForm = data => {
		postReview(localStorage.getItem('userId'), data).then(() =>
			history.push('/dashboard')
		);
		ReactGA.event({
			category: 'Review',
			action: `Submit review`
		});
	};

	if (isLoading) {
		return (
			<Flex justify='center' align='center' w='100vh' h='100vh'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Flex>
		);
	}

	return (
		<Flex bg='rgba(72, 72, 72, 0.1)'>
			<Flex justify='flexStart' py='6rem' px='15rem' bg='white'>
				<Flex justify='center' align='start' flexDir='column'>
					<h2> Add a Review</h2>
					<form onSubmit={handleSubmit(submitForm)}>
						<Flex as='h3' mb='3'>
							Other Information
						</Flex>
						<FormControl isRequired>
							<FormLabel fontSize='15px' color='#525252'>
								Tag Line
							</FormLabel>
							<Input
								variant='filled'
								ref={register}
								py='32px'
								mb='4'
								type='text'
								name='tagline'
								placeholder='e.g. Headline example goes here'
								rounded='6px'
							/>
							<FormLabel fontSize='15px' color='#525252'>
								Did you receive an offer?
							</FormLabel>
							<Flex mb='4'>
								<Checkbox
									name='offer_received'
									mr='3'
									defaultIsChecked
									ref={register}
								>
									Offer Received
								</Checkbox>
								<Checkbox name='offer_accepted' defaultIsChecked ref={register}>
									Offer Accepted
								</Checkbox>
							</Flex>
						</FormControl>
						<Flex as='h3' mb='3'>
							Company Information
						</Flex>
						<FormControl isRequired>
							<FormLabel fontSize='15px' color='#525252'>
								Company Name
							</FormLabel>
							<Input
								variant='filled'
								mb='3'
								py='32px'
								type='text'
								name='company'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								placeholder='Search for a company'
								rounded='6px'
							/>
							<Select
								variant='filled'
								h='64px'
								rounded='6x'
								name='company_id'
								id='company_name'
								type='select'
								ref={register}
							>
								{searchResults.map(company => (
									<option value={company.id} key={company.id}>
										{company.name}
									</option>
								))}
							</Select>
							<Flex>
								<Link color='black' href='/add-company'>
									Need to add a company?
								</Link>
							</Flex>
							<FormLabel fontSize='15px' mt='4' color='#525252'>
								Job Title
							</FormLabel>
							<Input
								variant='filled'
								ref={register}
								mb='4'
								py='32px'
								type='text'
								name='job_title'
								placeholder='e.g. Software Engineer'
								rounded='6px'
							/>
							<FormLabel fontSize='15px' color='#525252'>
								Job Location
							</FormLabel>
							<Input
								variant='filled'
								ref={register}
								mb='4'
								py='32px'
								type='text'
								name='job_location'
								placeholder='e.g. San Francisco, CA'
								rounded='6px'
							/>
						</FormControl>
						<FormControl isRequired isInvalid={errors.salary}>
							<FormLabel fontSize='15px' color='#525252'>
								Salary
							</FormLabel>
							<Input
								variant='filled'
								ref={register({ validate: validateSalary })}
								mb='4'
								py='32px'
								type='number'
								name='salary'
								rounded='6px'
								placeholder='e.g. 70000'
							/>
							<FormErrorMessage>
								{errors.salary && errors.salary.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isRequired>
							<Flex as='h3' mb='3'>
								Interview Process
							</Flex>
							<FormLabel fontSize='15px' color='#525252'>
								Interview Difficulty
							</FormLabel>
							<Input
								variant='filled'
								min='1'
								max='5'
								ref={register}
								mb='4'
								py='32px'
								type='number'
								name='interview_rating'
								placeholder='1 to 5, very difficult to very easy'
								rounded='6px'
							/>
							<FormLabel fontSize='15px' color='#525252'>
								Interview Process
							</FormLabel>
							<Textarea
								variant='filled'
								ref={register}
								mb='4'
								rowsMax={6}
								type='text'
								name='interview_review'
								placeholder='Describe the interview process.'
								rounded='6px'
							/>
							<Flex as='h3' mb='3'>
								Overall Job Review
							</Flex>
							<FormLabel fontSize='15px' color='#525252'>
								Job Rating
							</FormLabel>
							<Input
								variant='filled'
								min='1'
								max='5'
								ref={register}
								mb='4'
								py='32px'
								type='number'
								name='job_rating'
								placeholder='1 to 5, terrible to great'
								rounded='6px'
							/>
							<FormLabel fontSize='15px' color='#525252'>
								Job Review
							</FormLabel>
							<Textarea
								variant='filled'
								ref={register}
								mb='4'
								rowsMax={6}
								type='text'
								name='job_review'
								placeholder='Describe your experiences at your job.'
								rounded='6px'
							/>
						</FormControl>
						<ButtonGroup mb='3' mt='3'>
							<Button
								w='558px'
								h='64px'
								type='submit'
								_hover={{ bg: '#979797' }}
								_active={{ bg: '#979797' }}
								bg='#615E5E'
								color='white'
								isLoading={formState.isSubmitting}
								rounded='6x'
								border='none'
							>
								Add Your Review
							</Button>
							<Button
								h='64px'
								rounded='6x'
								border='2px solid #615E5E'
								bg='none'
								color='#615E5E'
								onClick={() => setIsOpen(true)}
							>
								Cancel
							</Button>
							<AlertDialog
								isOpen={isOpen}
								leastDestructiveRef={cancelRef}
								onClose={onClose}
							>
								<AlertDialogOverlay />
								<AlertDialogContent>
									<AlertDialogHeader fontSize='lg' fontWeight='bold'>
										Cancel form?
									</AlertDialogHeader>
									<AlertDialogBody>
										Are you sure? You can't undo this action.
									</AlertDialogBody>

									<AlertDialogFooter>
										<Button ref={cancelRef} onClick={onClose}>
											Cancel
										</Button>
										<Button onClick={() => history.push('/dashboard')} ml={3}>
											Yes I'm sure
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</ButtonGroup>
					</form>
					<Flex></Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.review.fetchingData,
		companies: state.company.data
	};
};

export default connect(
	mapStateToProps,
	(postReview, getCompanies, postCompany)
)(ReviewForm);
