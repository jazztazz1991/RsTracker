/* eslint-disable react/prop-types */

const Skills = (props) => {
	const userSkills = props.skills;

	const findStat = (skill) => {
		const currentSkill = userSkills.find((s) => s.name === skill);
		return currentSkill.level;
	};
	return (
		<div className='grid gap-2 w-1/3 h-fit'>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Attack')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Constitution')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Mining')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Strength')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Agility')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Smithing')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Defence')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Herblore')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Fishing')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Ranged')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Thieving')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Cooking')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Prayer')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Crafting')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Firemaking')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Magic')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Fletching')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Woodcutting')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Runecrafting')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Slayer')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Farming')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Construction')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Hunter')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Summoning')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>
						{findStat('Dungeoneering')}
					</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Divination')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Invention')}</p>
				</div>
			</div>
			<div className='grid grid-cols-3 place-content-evenly'>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Archaeology')}</p>
				</div>
				<div className='rounded grid grid-cols-2 bg-metric text-m-text w-auto p-2 mx-1'>
					<img
						src='/images/attack.jpg'
						alt=''
						className='w-8 h-8 justify-self-end m-1'
					/>
					<p className='justify-items-center p-2'>{findStat('Necromancy')}</p>
				</div>
				<div className=''></div>
			</div>
		</div>
	);
};

export default Skills;
