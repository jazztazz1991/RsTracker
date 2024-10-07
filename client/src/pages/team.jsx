import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import instance from '../hooks/API';
import addNames from '../hooks/getSkillNames';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Team = () => {
	const [teamMembers, setTeamMembers] = useState([]);
	const [teamName, setTeamName] = useState('');
	const [teams, setTeams] = useState(null);
	const [skills, setSkills] = useState([]);
	const [user, setUser] = useCookies(['user']);

	// useEffect(() => {
	// 	if (teamMembers.length >= 1) {
	// 		instance
	// 			.post('/api/teams/getTopSkills', { members: teamMembers })
	// 			.then((response) => {
	// 				console.log(response.data);
	// 				setSkills(response.data);
	// 			});
	// 	}
	// }, [teamMembers]);

	useEffect(() => {
		teamSearch();
	}, []);
	useEffect(() => {
		if (teamName !== '') {
			instance.get(`/api/teams/getTeamMembers/${teamName}`).then((response) => {
				console.log(response.data);
				setTeamMembers(response.data);
			});
		}
	}, [teamName]);
	const handleChange = (event) => {
		const { value } = event.target;
		setTeamName(value);
	};

	const teamSearch = () => {
		instance.get('/api/teams/getTeams').then((response) => {
			console.log(response.data[0]);
			setTeams(response.data);
			setTeamName(response.data[0]);

			instance
				.get(`/api/teams/getTeamMembers/${response.data[0]}`)
				.then((response) => {
					console.log(response.data);
					setTeamMembers(response.data);
				});
		});
	};

	const createTeam = (event) => {
		event.preventDefault();

		instance
			.post('/api/teams/createTeam', {
				teamName: teamName,
				userId: user.user.id,
			})
			.then((response) => {
				console.log(response.data);
				setTeams(...teams, response.data.team_name);
			});
	};

	return (
		<>
			<h1>Team Page</h1>
			<form onSubmit={createTeam}>
				<label>Create Team</label>
				<input
					type='text'
					name='team'
					value={teamName}
					onChange={handleChange}
				/>
				<input type='submit' value='Create Team' />
			</form>

			<div className='flex justify-end mx-2'>
				<Menu as='div' className='relative inline-block text-left'>
					<div>
						<MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-metric px-3 py-2 text-sm font-semibold text-m-text shadow-sm ring-1 ring-inset'>
							{teams ? teamName : 'Select Team'}
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
							{teams !== null
								? teams.map((team) => (
										<MenuItem key={team}>
											<a
												href='#'
												className='block px-4 py-2 text-sm text-m-text data-[focus]:bg-metric data-[focus]:border-2 data-[focus]:border-m-text data-[focus]:rounded'
												onClick={() => setTeamName(team)}
											>
												{team}
											</a>
										</MenuItem>
								  ))
								: null}
						</div>
					</MenuItems>
				</Menu>
			</div>
			<div className='bg-metric text-m-text'>
				{skills ? (
					<div className='grid grid-cols-3 w-1/2'>
						{skills.map((skill) => (
							<div
								key={skill.id}
								className='rounded-md border-2 border-black text-white m-1 p-1 text-sm'
							>
								<h2>{skill.username}</h2>
								<h3>
									{skill.name}: {skill.level}
								</h3>
							</div>
						))}
					</div>
				) : null}
			</div>
		</>
	);
};

export default Team;
