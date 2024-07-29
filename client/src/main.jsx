import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Landing from './pages/landing.jsx';
import Profile from './pages/profile.jsx';
import './index.css';

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
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
