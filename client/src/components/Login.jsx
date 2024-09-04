import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../hooks/API';
import { useCookies } from 'react-cookie';

const Login = () => {
	const [cookies, setCookie] = useCookies(['token', 'user']);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (cookies.token !== 'undefined' && cookies.token) {
			navigate('/');
		}
	}, []);
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
		console.log('Loging in');
		try {
			const user = {
				username: username,
				password: password,
			};
			if (password && username) {
				const response = await instance.post('/api/users/login', user);
				console.log(response);
				setCookie('user', response.data.userData, { path: '/', maxAge: 3600 });
				setCookie('token', response.data.token, { path: '/', maxAge: 3600 });
				navigate('/');
			} else {
				setError('Please fill out all fields');
			}
		} catch (err) {
			setError('Incorrect username or password, please try again');
			console.log(err);
		}
	};

	const showPassword = (event) => {
		const { checked } = event.target;
		const password = document.querySelector('input[name="password"]');
		if (checked) {
			password.type = 'text';
		} else {
			password.type = 'password';
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
				<div className='flex gap-4'>
					<input type='password' name='password' onChange={handleChange} />
					<input type='checkbox' name='showPassword' onClick={showPassword} />
					<label>Show Password</label>
				</div>
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
