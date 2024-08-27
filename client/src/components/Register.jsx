import { useState } from 'react';
import { redirect } from 'react-router-dom';
import instance from '../hooks/API';

const Register = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [error, setError] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'username') {
			setUsername(value);
		} else if (name === 'password') {
			setPassword(value);
		} else if (name === 'confirmPassword') {
			setConfirmPassword(value);
		}
	};

	const register = async (event) => {
		event.preventDefault();
		console.log('registering');
		try {
			const user = {
				username: username,
				password: password,
			};
			if (password === confirmPassword) {
				const response = await instance.post('/api/users/register', user);
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
			<h1>Register</h1>
			<p>{error}</p>
			<form className='flex flex-col'>
				<label>Username</label>
				<input type='text' name='username' onChange={handleChange} />
				<label>Password</label>
				<input type='password' name='password' onChange={handleChange} />
				<label>Confirm Password</label>
				<input type='password' name='confirmPassword' onChange={handleChange} />
				<input
					type='submit'
					value='submit'
					onClick={register}
					className='rounded bg-slate-600 p-2'
				/>
			</form>
		</div>
	);
};

export default Register;
