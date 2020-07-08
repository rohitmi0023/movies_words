import Head from 'next/head';
import SearchMovies from '../components/SearchMovies';
import NavBar from '../components/NavBar';

const Home = () => {
	return (
		<div>
			<Head>
				<title>Movies Words</title>
			</Head>
			<NavBar />
			<br />
			<br />
			<SearchMovies />
		</div>
	);
};

export default Home;
