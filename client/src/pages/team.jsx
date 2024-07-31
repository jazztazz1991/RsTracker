import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import instance from '../hooks/API';
import addNames from '../hooks/getSkillNames';

const Team = () => {
	const [teamMembers, setTeamMembers] = useState([]);
	const [username, setUsername] = useState('');
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		if (teamMembers.length >= 1) {
			instance
				.post('/api/teams/getTopSkills', { members: teamMembers })
				.then((response) => {
					console.log(response.data);
					setSkills(response.data);
				});
		}
	}, [teamMembers]);
	const handleChange = (event) => {
		const { value } = event.target;
		setUsername(value);
	};

	const addPlayer = (event) => {
		event.preventDefault();

		setTeamMembers((teamMembers) => [...teamMembers, username]);
		setUsername('');
	};

	return (
		<>
			<h1>Team Page</h1>
			<form onSubmit={addPlayer}>
				<label>Runescape 3 Player Name</label>
				<input
					type='text'
					name='username'
					value={username}
					onChange={handleChange}
				/>
				<input type='submit' value='Add Team Member' />
			</form>

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
