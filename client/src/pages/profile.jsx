import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import instance from '../hooks/API';

const Profile = () => {
	const [cookies, setCookie] = useCookies(['token', 'user']);
	const [user, setUser] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [accountName, setAccountName] = useState('');

	useEffect(() => {
		console.log(cookies);
		const username = cookies.user.username;
		setUser(username);
	}, []);

	const addAccountModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleAccountNameChange = (e) => {
		setAccountName(e.target.value);
	};

	const addAccount = async () => {
		try {
			const response = await instance.post('/api/accounts/add', {
				username: user,
				accountName,
			});
			console.log(response);
			handleCloseModal();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h1>Welcome {user}!</h1>
			<div className='flex justify-end w-full'>
				<button
					className='rounded bg-slate-600 p-2 mx-10'
					onClick={addAccountModal}
				>
					Add Account
				</button>
			</div>
			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
					<div className='bg-slate-400 p-4 rounded'>
						<h2 className='text-xl mb-4'>Add Account</h2>
						<input
							type='text'
							value={accountName}
							onChange={handleAccountNameChange}
							className='border p-2 mb-4 w-full'
							placeholder='Enter account name'
						/>
						<div className='flex justify-end'>
							<button
								className='bg-red-500 text-white p-2 rounded mr-2'
								onClick={handleCloseModal}
							>
								Cancel
							</button>
							<button
								className='bg-blue-500 text-white p-2 rounded'
								onClick={addAccount}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
