import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Fab from '@material-ui/core/Fab';
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const Movies = () => {
	const [currentMovie, setCurrentMovie] = useState('');
	const router = useRouter();
	const { movieId } = router.query;

	useEffect(() => {
		axios(`http://www.omdbapi.com/?i=${movieId}&type=movie&apikey=${process.env.OmdbKey}`).then(
			res => {
				setCurrentMovie(res.data);
			}
		);
	}, []);

	let rating = currentMovie.Ratings;
	if (rating) {
		rating = rating.map(each => {
			return (
				<span key={Math.random()}>
					<b>{each.Source} : </b> {each.Value}
					<br />
				</span>
			);
		});
	}
	return (
		<Fragment>
			<NavBar />
			<br />
			<Link href='/[movieId]/dict' as={`/${movieId}/dict`}>
				<Fab style={{ float: 'right' }} variant='extended'>
					<a style={{ textDecoration: 'none', letterSpacing: '1.5px' }}>Words</a>
				</Fab>
			</Link>
			<span className='currentMovieTitle'>{currentMovie.Title}</span>
			{console.log(currentMovie)}
			{currentMovie ? (
				<div className='currentMovieHead'>
					<img
						src={currentMovie.Poster}
						alt='Movie poster'
						className='currentMoviePoster'
					></img>
					<div className='currentMovieDetailsHead'>
						<span className='currentMoviePlot'>{currentMovie.Plot}</span>
						<br />
						<Paper elevation={3} className='currentMovieDetails'>
							<span
								style={{
									padding: '15px 15px',
								}}
							>
								<span>
									<b>Released on :</b> {currentMovie.Released}
								</span>
								<br />
								<span>
									<b>Directed by: </b>
								</span>
								{currentMovie.Director}
								<br />
								<span>
									<b>Genre:</b> {currentMovie.Genre}
								</span>
								<br />
								<span>
									<b>Cast :</b> {currentMovie.Actors}
								</span>
							</span>
						</Paper>
						<br />
						<br />
						<Paper elevation={3} className='currentMovieDetails'>
							<span style={{ padding: '15px 15px' }}>{rating}</span>
						</Paper>
					</div>
				</div>
			) : (
				<div style={{ textAlign: 'center' }}>
					<CircularProgress />
				</div>
			)}
		</Fragment>
	);
};

export default Movies;
