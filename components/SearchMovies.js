import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult';
import TextField from '@material-ui/core/TextField';

const SearchMovies = () => {
	const [searchFormData, setSearchFormData] = useState('');
	const [searchResult, setSearchResult] = useState({});
	// for searching, it gives an array of lists
	const urlforSearch = `http://www.omdbapi.com/?s="${searchFormData}"&type=movie&apikey=${process.env.OmdbKey}`;
	// for title specific, it gives a pariticular movie
	const urlforTitle = `http://www.omdbapi.com/?t="${searchFormData}"&type=movie&apikey=${process.env.OmdbKey}`;

	const handleChange = async e => {
		setSearchFormData(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const res = await axios.get(urlforTitle);
		setSearchResult(res);
	};

	useEffect(() => {
		axios.get(urlforSearch).then(res => {
			setSearchResult(res);
		});
	}, [searchFormData]);

	return (
		<div>
			<form
				onSubmit={e => handleSubmit(e)}
				style={{ textAlign: 'center', paddingTop: '15px' }}
			>
				<TextField
					id='standard-basic'
					type='text'
					value={searchFormData}
					onChange={e => handleChange(e)}
					label='Search for movies'
				/>
			</form>
			<br />
			{searchFormData ? (
				searchResult.data && searchResult.data.Response === 'True' ? (
					<SearchResult searchresult={searchResult} />
				) : (
					searchResult.data &&
					searchResult.data.Response === 'False' && (
						<p className='resultsText'>{searchResult.data.Error}</p>
					)
				)
			) : (
				<p className='resultsText'>Nothing to search!!!</p>
			)}
		</div>
	);
};

export default SearchMovies;
