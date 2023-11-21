import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/basic/Home';
import Profile from './routes/basic/Profile';
import Login from './routes/auth/Login';
import Join from './routes/auth/Join';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '', element: <Home /> },
			{ path: 'profile', element: <Profile /> },
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/join',
		element: <Join />,
	},
]);

export default router;
