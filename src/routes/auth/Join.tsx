import {
	Auth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import AuthLayout from '../../layouts/AuthLayout';

const Join = () => {
	const inputs = [
		{ name: 'name', type: 'text', initial: '' },
		{ name: 'email', type: 'email', initial: '' },
		{ name: 'password', type: 'password', initial: '' },
	];

	const pageSwith = {
		forwardText: 'Already have an account?',
		target: {
			path: '/login',
			text: 'Login',
		},
	};

	const submitEvent = async (
		auth: Auth,
		{ email, password, name }: { [key: string]: string }
	) => {
		const credentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		await updateProfile(credentials.user, { displayName: name });
	};

	return (
		<AuthLayout
			type='JOIN'
			inputs={inputs}
			submitEvent={submitEvent}
			switcher={pageSwith}
		/>
	);
};

export default Join;
