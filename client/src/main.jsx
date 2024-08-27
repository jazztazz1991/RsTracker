import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Landing from './pages/Landing.jsx';
import Profile from './pages/Profile.jsx';
import Runemetrics from './pages/Runemetrics.jsx';
import Team from './pages/Team.jsx';
import Auth from './pages/Auth.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <h1 className='display-2'>Wrong page!</h1>,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: '/auth',
				element: <Auth />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
			{
				path: '/runemetrics',
				element: <Runemetrics />,
			},
			{
				path: '/team',
				element: <Team />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
