import { useState } from 'react';
import { redirect } from 'react-router-dom';
import instance from '../hooks/API';

const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'username') {
			setUsername(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const login = async (event) => {
		event.preventDefault();
		console.log('registering');
		try {
			const user = {
				username: username,
				password: password,
			};
			if (password && username) {
				const response = await instance.post('/api/users/login', user);
				console.log(response);
				redirect('/');
			} else {
				setError('Please fill out all fields');
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='m-3 border rounded border-black p-2 bg-slate-500'>
			<h1>Login</h1>
			<p className='text-red-500'>{error}</p>
			<form className='flex flex-col'>
				<label>Username</label>
				<input type='text' name='username' onChange={handleChange} />
				<label>Password</label>
				<input type='password' name='password' onChange={handleChange} />
				<input
					type='submit'
					value='submit'
					onClick={login}
					className='rounded bg-slate-600 p-2'
				/>
			</form>
		</div>
	);
};

export default Login;
