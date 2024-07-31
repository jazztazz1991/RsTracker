import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<>
			<h1>Landing Page</h1>
			<Link to='/runemetrics'>RuneMetrics</Link>
			<Link to='/team'>team</Link>
		</>
	);
};

export default Landing;
