import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FirebaseError } from 'firebase/app';
import { Auth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import Title from '../components/Title';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import { errorMsg } from '../constants/message';
import { auth } from '../firebase';
import Button from '../components/Button';
import GithubMark from '../assets/github-mark.svg';

const Wrapper = styled.main`
	flex: 1;
	max-width: 430px;
	padding-top: 30px;
`;

const Social = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;

	margin: 30px 0;

	&::after {
		content: 'OR';
		margin-top: 20px;
	}
`;

const Form = styled.form`
	margin: 20px 0;
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 20px;
	& > li {
		display: flex;
		flex-direction: column;

		&:last-child {
			margin-top: 20px;
		}
	}
`;

const Switcher = styled.div`
	margin-top: 20px;
	padding-top: 20px;
	border-top: 1px solid grey;

	& a {
		color: inherit;
		font-weight: 500;

		&:hover {
			color: skyblue;
		}
	}
`;

type Obj = { [key: string]: string };

type InitialInput = { name: string; type: string; initial: string };

interface Props {
	type: 'LOGIN' | 'JOIN';
	inputs: InitialInput[];
	submitEvent: (auth: Auth, values: Obj) => Promise<void>;
	switcher: {
		forwardText: string;
		target: {
			path: string;
			text: string;
		};
	};
}

const AuthLayout = ({ type, inputs, submitEvent, switcher }: Props) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [values, setValues] = useState<Obj>(
		inputs.reduce<Obj>((acc, input) => {
			acc[input.name] = input.initial;
			return acc;
		}, {})
	);
	const [error, setError] = useState('');

	const pageTitle = type[0] + type.slice(1).toLowerCase();

	const onInputChagne = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = ev;

		if (typeof values[name] === 'undefined') {
			return;
		}

		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		setError('');

		const valueArr = Object.values(values);

		if (isLoading || valueArr.some((v) => v === '')) {
			return;
		}

		try {
			setIsLoading(true);

			await submitEvent(auth, { ...values });

			navigate('/');
		} catch (error) {
			if (error instanceof FirebaseError) {
				console.log(error.code);
				setError(errorMsg.Firebase[error.code] || error.message);
			} else {
				const e = error as Error;
				setError(e.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const onGithubClick = async () => {
		const provider = new GithubAuthProvider();

		try {
			setIsLoading(true);

			await signInWithPopup(auth, provider);

			navigate('/');
		} catch (error) {
			console.error(error);
			if (error instanceof FirebaseError) {
				setError(errorMsg.Firebase[error.code] || error.message);
			} else {
				const e = error as Error;
				setError(e.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Wrapper>
				<Title text={pageTitle} />

				<Social>
					<Button
						label='Continue with Github'
						icon={GithubMark}
						onClick={onGithubClick}
					/>
				</Social>

				<Form onSubmit={onSubmit}>
					<List>
						{inputs.map(({ type, name }, index) => (
							<li key={index}>
								<InputField
									hasLabel
									type={type}
									name={name}
									value={values[name]}
									required
									onChange={onInputChagne}
								/>
							</li>
						))}
						<li>
							<InputField
								type='submit'
								value={isLoading ? 'Loading...' : pageTitle}
							/>
						</li>
					</List>
				</Form>
				{error && <ErrorMessage text={error} />}
				<Switcher>
					<p>
						{switcher.forwardText}{' '}
						<Link to={switcher.target.path}>{switcher.target.text}</Link>
					</p>
				</Switcher>
			</Wrapper>
		</>
	);
};

export default AuthLayout;
