import Router from 'next/router';
import Paper from '@material-ui/core/Paper';

const SearchResult = ({ searchresult }) => {
	let moviesList = [];
	const movies = searchresult.data.Search;

	const handleClick = Id => {
		Router.push(`/movies/[movieId]`, `/movies/${Id}`);
	};

	if (movies) {
		// User has not submitted the form, we are diplaying the array results
		moviesList = movies.map(movie => {
			return (
				<div key={movie.imdbID} className='movie'>
					<Paper elevation={5}>
						<a onClick={() => handleClick(movie.imdbID)}>
							<img src={movie.Poster} className='moviePoster' alt='Movie poster' />
							<p className='movieTitle'>
								{movie.Title} ({movie.Year})
							</p>
						</a>
					</Paper>
				</div>
			);
		});
	} else {
		// User has submiited the form, we are displaying the best matched a single movie
		moviesList.push(searchresult.data);
		moviesList = moviesList.map(movie => {
			return (
				<div key={movie.imdbID} className='movie'>
					<a onClick={() => handleClick(movie.imdbID)}>
						<img src={movie.Poster} className='moviePoster' alt='Movie poster' />
						<p className='movieTitle'>
							{movie.Title} ({movie.Year})
						</p>
					</a>
				</div>
			);
		});
	}
	return (
		<div>
			<p className='resultsText'>Search Results...</p>
			{moviesList}
		</div>
	);
};

export default SearchResult;
