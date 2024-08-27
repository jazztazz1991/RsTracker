import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import instance from '../hooks/API';

const Navbar = () => {
	const logout = async () => {
		try {
			const response = await instance.post('/api/users/logout');
			console.log(response);
			redirect('/');
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
				{}
				<Link to='/auth' className='rounded bg-slate-600 p-2'>
					Login/Register
				</Link>
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
			</div>
		</div>
	);
};

export default Navbar;
