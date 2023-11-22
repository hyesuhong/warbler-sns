import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const BasicLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default BasicLayout;
