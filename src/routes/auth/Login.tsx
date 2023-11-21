import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import AuthLayout from '../../layouts/AuthLayout';

const Login = () => {
	const inputs = [
		{ name: 'email', type: 'email', initial: '' },
		{ name: 'password', type: 'password', initial: '' },
	];

	const pageSwith = {
		forwardText: 'Don’t have an account?',
		target: {
			path: '/join',
			text: 'Join',
		},
	};

	const submitEvent = async (
		auth: Auth,
		{ email, password }: { [key: string]: string }
	) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	return (
		<AuthLayout
			type='LOGIN'
			inputs={inputs}
			submitEvent={submitEvent}
			switcher={pageSwith}
		/>
	);
};

export default Login;
