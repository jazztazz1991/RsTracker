/* eslint-disable react/prop-types */
const Quests = (props) => {
	const handleClick = (questName) => {
		window.open(`https://www.runescape.wiki/w/${questName}`, '_blank');
	};
	return (
		<div className='questHeight bg-m-bg text-m-text border-2 border-m-bg m-1 overflow-y-scroll'>
			<div className='grid grid-cols-5 m-1 text-xl border-b-2 border-m-text'>
				<p className='rounded-left bg-metric text-m-text col-span-3'>Title</p>
				<p className=' bg-metric text-m-text'>Difficulty</p>
				<p className='rounded-right bg-metric text-m-text'>Status</p>
			</div>
			{props.quests.map((quest) => (
				<div
					key={quest.name}
					className='bg-metric text-m-text rounded m-1 grid grid-cols-5 hover:cursor-pointer'
					onClick={() => handleClick(quest.name)}
				>
					<h1 className='col-span-3'>{quest.name}</h1>
					<h3 className=''>{quest.difficulty}</h3>
					{quest.status !== 'COMPLETED' ? (
						<h3 className=''>{quest.eligible ? 'Eligible' : 'Non-Eligible'}</h3>
					) : (
						<h3 className=''>{quest.status}</h3>
					)}
				</div>
			))}
		</div>
	);
};

export default Quests;
