import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../hooks/API';
import { useCookies } from 'react-cookie';

const Register = () => {
	const [cookies, setCookie] = useCookies(['token', 'user']);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [error, setError] = useState('');
	const navigate = useNavigate();

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
				setCookie('user', response.data.userData, { path: '/', maxAge: 3600 });
				setCookie('token', response.data.token, { path: '/', maxAge: 3600 });
				navigate('/');
			} else {
				setError('Please fill out all fields');
			}
		} catch (err) {
			console.log(err);
		}
	};
	const showPassword = (event) => {
		const { checked } = event.target;
		const password = document.querySelector('input[name="password"]');
		console.log(checked);
		console.log(password);
		if (checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
		}
	};
	const showConfirmPassword = (event) => {
		const { checked } = event.target;
		const password = document.querySelector('input[name="confirmPassword"]');
		console.log(checked);
		if (checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
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
				<div className='flex gap-4'>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
					/>
					<input type='checkbox' name='showPassword' onClick={showPassword} />
					<label>Show Password</label>
				</div>
				<label>Confirm Password</label>
				<div className='flex gap-4'>
					<input
						type='password'
						name='confirmPassword'
						onChange={handleChange}
					/>
					<input
						type='checkbox'
						name='showPassword'
						onClick={showConfirmPassword}
					/>
					<label>Show Password</label>
				</div>
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
