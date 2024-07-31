import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Landing from './pages/landing.jsx';
import Profile from './pages/profile.jsx';
import Runemetrics from './pages/runemetrics.jsx';
import Team from './pages/team.jsx';

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
