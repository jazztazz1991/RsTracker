const RecentActivities = (props) => {
	return (
		<div className='questHeight bg-m-bg text-m-text border-2 border-m-bg m-1 overflow-y-scroll'>
			{props.activities.map((activity) => (
				<div
					key={activity.date}
					className='bg-metric text-m-text rounded m-1 grid grid-cols-5 hover:cursor-pointer'
				>
					<h1 className='p-2'>{activity.date}</h1>
					<h3 className='border-l-2 p-2 border-m-bg'>{activity.text}</h3>
					<h3 className='border-l-2 p-2 border-m-bg col-span-3'>
						{activity.details}
					</h3>
				</div>
			))}
		</div>
	);
};

export default RecentActivities;
