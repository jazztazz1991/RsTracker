import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import instance from '../hooks/API';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const Navbar = () => {
	const [cookies, removeCookie] = useCookies(['token', 'user']);
	const navigate = useNavigate();

	useEffect(() => {
		console.log(cookies);
		if (cookies.token === 'undefined' || !cookies.token) {
			console.log('true');
			navigate('/auth');
		}
	}, []);
	const logout = async () => {
		try {
			const response = await instance.post('/api/users/logout');
			removeCookie('token');
			removeCookie('user');
			console.log(response);
			navigate('/auth');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className='mb-20 flex items-center justify-between py-6 text-xl'>
			<div className='flex flex-shrink-0 items-center'>
				<h1>RsTracker</h1>
			</div>
			<div className='m-8 flex items-center justify-center gap-4 text-xl'>
				{cookies.token ? (
					<>
						<Link to='/profile' className='rounded bg-slate-600 p-2'>
							Profile
						</Link>
						<Link to='/team' className='rounded bg-slate-600 p-2'>
							Team
						</Link>
						<Link to='/runemetrics' className='rounded bg-slate-600 p-2'>
							Runemetrics
						</Link>
						<button className='rounded bg-slate-600 p-2' onClick={logout}>
							Logout
						</button>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Navbar;
