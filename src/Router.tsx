import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import Home from './routes/basic/Home';
import Profile from './routes/basic/Profile';
import Login from './routes/auth/Login';
import Join from './routes/auth/Join';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<BasicLayout />
			</ProtectedRoute>
		),
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
