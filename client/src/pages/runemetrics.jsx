import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import instance from '../hooks/API';
import addNames from '../hooks/getSkillNames';

const Runemetrics = () => {
	const [username, setUsername] = useState();
	const [profile, setProfile] = useState();
	const [userSkills, setUserSkills] = useState([]);

	useEffect(() => {
		let account = profile;
		if (profile) {
			let skills = addNames(profile.skillvalues);
			setUserSkills(skills);
			console.log(skills);
		}
	}, [profile]);
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUsername(value);
	};

	const playerSearch = async (event) => {
		event.preventDefault();
		console.log(username);
		// const response = await fetch(`/api/characters/profile/${username}`, {
		// 	method: 'GET',
		//   headers:{
		//     "Content-Type": "application/json"
		//   }
		// });

		// console.log(response.data);
		instance
			.get(`/api/characters/profile/${username}`, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => setProfile(response.data));
	};
	return (
		<>
			<h1>Runemetrics</h1>
			<form onSubmit={playerSearch}>
				<label>Runescape 3 Player Name</label>
				<input type='text' name='username' onChange={handleChange} />
				<input type='submit' value='submit' />
			</form>

			<div className='bg-metric text-m-text'>
				{profile ? <h1>{profile.name}</h1> : null}

				{userSkills ? (
					<div className='grid grid-cols-3 w-1/2'>
						{userSkills.map((skill) => (
							<div
								key={skill.id}
								className='rounded-md border-2 border-black text-white m-1 p-1'
							>
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

export default Runemetrics;
