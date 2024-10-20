import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import instance from '../hooks/API';
import Skills from '../components/Skills';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Quests from '../components/Quests';
import RecentActivities from '../components/RecentActivities/RecentActivities';

const Profile = () => {
	const [cookies, setCookie] = useCookies(['token', 'user']);
	const [user, setUser] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [characterName, setCharacterName] = useState('');
	const [characters, setCharacters] = useState(null);
	const [selectedCharacter, setSelectedCharacter] = useState(null);
	const [showQuests, setShowQuests] = useState(true);
	const [showRecentActivities, setShowRecentActivities] = useState(false);

	useEffect(() => {
		console.log(cookies);
		const username = cookies.user.username;
		setUser(username);
		getCharacters(username);
	}, []);
	useEffect(() => {
		if (characters !== null) {
			setSelectedCharacter(characters[0]);
			console.log(characters[0]);
		}
	}, [characters]);
	const getCharacters = async (username) => {
		try {
			const response = await instance.get(`/api/characters/${username}`, {
				headers: {
					token: cookies.token,
				},
			});
			console.log(response.data);
			if (response.data.length !== 0) {
				setCharacters(response.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const addCharacterModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleCharacterNameChange = (e) => {
		setCharacterName(e.target.value);
	};

	const addCharacter = async () => {
		try {
			const response = await instance.post('/api/characters/addAccount', {
				username: user,
				characterName,
			});
			console.log(response);
			setShowModal(false);
			getCharacters(user);
		} catch (err) {
			console.log(err);
		}
	};

	const showAllQuests = () => {
		setShowQuests(true);
		setShowRecentActivities(false);
	};

	const showAllActivities = () => {
		setShowQuests(false);
		setShowRecentActivities(true);
	};

	return (
		<>
			<h1>Welcome {user}!</h1>
			<div className='flex justify-end mx-2'>
				<Menu as='div' className='relative inline-block text-left'>
					<div>
						<MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-metric px-3 py-2 text-sm font-semibold text-m-text shadow-sm ring-1 ring-inset'>
							{selectedCharacter ? selectedCharacter.name : 'Select Character'}
							<ChevronDownIcon
								aria-hidden='true'
								className='-mr-1 h-5 w-5 text-gray-400'
							/>
						</MenuButton>
					</div>

					<MenuItems
						transition
						className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-metric shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
					>
						<div className='py-1'>
							{characters !== null
								? characters.map((character) => (
										<MenuItem key={character.name}>
											<a
												href='#'
												className='block px-4 py-2 text-sm text-m-text data-[focus]:bg-metric data-[focus]:border-2 data-[focus]:border-m-text data-[focus]:rounded'
												onClick={() => setSelectedCharacter(character)}
											>
												{character.name}
											</a>
										</MenuItem>
								  ))
								: null}
						</div>
					</MenuItems>
				</Menu>
				<button
					className='inline-flex justify-center gap-x-1.5 rounded-md bg-metric px-3 py-2 text-sm font-semibold text-m-text shadow-sm ring-1 ring-inset'
					onClick={addCharacterModal}
				>
					+
				</button>
			</div>
			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75'>
					<div className='bg-slate-400 p-4 rounded'>
						<h2 className='text-xl mb-4'>Add Character</h2>
						<input
							type='text'
							value={characterName}
							onChange={handleCharacterNameChange}
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
								onClick={addCharacter}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}
			{selectedCharacter !== null ? (
				<div className='flex content-start'>
					<Skills
						skills={selectedCharacter.skillvalues}
						className='flex-grow-0'
					/>
					<div className='w-full'>
						<div className='w-full flex-grow-1'>
							<button
								className='rounded bg-metric text-m-text w-1/2'
								onClick={showAllQuests}
							>
								Quests
							</button>
							<button
								className='rounded bg-metric text-m-text w-1/2'
								onClick={showAllActivities}
							>
								Recent Activities
							</button>
						</div>
						<div className='w-full'>
							{showQuests ? <Quests quests={selectedCharacter.quests} /> : null}
							{showRecentActivities ? (
								<RecentActivities activities={selectedCharacter.activities} />
							) : null}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Profile;
