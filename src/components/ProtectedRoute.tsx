import { useEffect } from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
	const user = auth.currentUser;

	useEffect(() => {
		console.log(user);
	}, [user]);

	if (!user) {
		return <Navigate to='/login' />;
	}

	return children;
};

export default ProtectedRoute;
