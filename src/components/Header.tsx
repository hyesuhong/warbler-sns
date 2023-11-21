import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
	const navigate = useNavigate();
	const logOut = async () => {
		await auth.signOut();
		navigate('/login');
	};
	return (
		<header>
			<i>Warbler</i>
			<button onClick={logOut}>Logout</button>
		</header>
	);
};

export default Header;
