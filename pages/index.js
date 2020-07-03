import Head from 'next/head';
import SearchMovies from '../components/SearchMovies';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';

const Home = () => {
	useEffect(() => {
		localStorage.setItem('user', '1');
	}, []);
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
