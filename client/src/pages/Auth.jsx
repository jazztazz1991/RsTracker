import { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth = () => {
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);

	const loginClick = () => {
		setLogin(true);
		setSignup(false);
	};
	const signupClick = () => {
		setLogin(false);
		setSignup(true);
	};

	return (
		<div>
			<h1 className='flex gap-4 justify-center text-center text-xl '>
				Please Login or Signup
			</h1>
			<div className='flex gap-4 justify-center text-center'>
				<button className='rounded bg-slate-600 p-2' onClick={loginClick}>
					Login
				</button>
				<button className='rounded bg-slate-600 p-2' onClick={signupClick}>
					Signup
				</button>
			</div>
			{login && <Login />}
			{signup && <Register />}
		</div>
	);
};

export default Auth;
