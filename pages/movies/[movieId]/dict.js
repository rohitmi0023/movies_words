import { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import WordResults from '../../../components/WordResults';
import NavBar from '../../../components/NavBar';
import { Container, Button, TextField } from '@material-ui/core';

const dictionary = () => {
	const [currentMovie, setCurrentMovie] = useState('');
	const [searchWord, setSearchWord] = useState('');
	const [searched, setSearched] = useState(false);
	const [words, setWords] = useState([]);
	const [matchedWords, setMatchedWords] = useState([]);
	const [wordErrors, setWordErrors] = useState();
	const [file, setFile] = useState(false);
	const handleChange = async e => {
		setWordErrors('');
		setSearchWord(e.target.value);
	};
	// Submitting a word
	const handleSubmit = async e => {
		e.preventDefault();
		const {
			imdbID,
			Title,
			Year,
			Poster,
			Genre,
			Director,
			Actors,
			Metascore,
			imdbRating,
			imdbVotes,
		} = currentMovie;
		const searchForm = {
			imdbID,
			Title,
			searchWord,
			Year,
			Poster,
			Genre,
			Director,
			Actors,
			Metascore,
			imdbRating,
			imdbVotes,
		};
		// For new word submission
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const body = JSON.stringify(searchForm);
			const res = await Axios.post(`/api/movies/${imdbID}/dict`, body, config);
			alert(res.data);
			setSearchWord('');
		} catch (err) {
			if (err.response) {
				setWordErrors(err.response.data.errors[0].msg);
			}
		}
		// for fetching all the words including the recent one just after submission
		try {
			const config2 = {
				'Content-Type': 'application/json',
			};
			Axios.get(`/api/movies/${imdbID}/dict`, config2).then(res => {
				setWords(res);
			});
		} catch (error) {
			if (error) throw error;
		}
	};

	useEffect(() => {
		const config = {
			'Content-Type': 'application/json',
		};
		const movieId = window.location.pathname.replace('/movies/', '').replace('/dict', '');
		// Fetching the current movie details
		Axios.get(
			`https://www.omdbapi.com/?i=${movieId}&type=movie&apikey=${process.env.OmdbKey}`
		).then(res => {
			setCurrentMovie(res.data);
		});
		// Fetching all the words on the initial render of the page
		Axios.get(`/api/movies/${movieId}/dict`, config).then(res => {
			setWords(res);
		});
		// checcking for whether the subtitle for it is already there or not
		Axios.get(`/api/movies/${movieId}/subtitles`, config).then(res => {
			setFile(res.data);
		});
	}, []);

	//To display the matched words with the subtitles
	const handleSearch = async e => {
		setSearched(true);
		if (!words.data.length) {
			alert(`No word is added yet!`);
		} else {
			const res = await Axios.get(`/api/movies/${currentMovie.imdbID}/dict/matched`);
			setMatchedWords([]);
			words.data.map(item => {
				if (!(res.data.search(item.word) === -1)) {
					setMatchedWords(prevArray => [...prevArray, item]);
				}
			});
		}
	};

	return (
		<div>
			<Head>
				<title>Movies Words</title>
			</Head>
			<NavBar />
			{currentMovie.imdbID ? (
				<div>
					<p className='currentMovieTitle'>{currentMovie.Title}</p>
					<Container>
						<form
							method='POST'
							action={`/api/movies/${currentMovie.imdbID}/subtitles`}
							encType='multipart/form-data'
							className='formStyle'
						>
							<input
								style={{ fontSize: '17px', width: '225px' }}
								type='file'
								name='profile'
								placeholder="Upload it's subtitles"
							/>
							<button style={{ fontSize: '17px' }}>Upload subtitle</button>
						</form>
						<br />
						{/* Search button */}
						{file ? (
							<span style={{ float: 'right', position: 'relative' }}>
								<span>Subtitles Found!</span>
								<br />
								<Button
									variant='contained'
									onClick={e => handleSearch(e)}
									style={{ margin: '10px 25px' }}
								>
									Search
								</Button>
							</span>
						) : null}
						<br />
						<br />
						<form onSubmit={e => handleSubmit(e)}>
							<TextField
								error={Boolean(wordErrors)}
								value={searchWord}
								label={wordErrors ? 'Error' : 'Add a word'}
								helperText={wordErrors}
								onChange={e => handleChange(e)}
								placeholder='Enter the word'
							></TextField>
						</form>
						<br />
						{searched ? (
							matchedWords.length > 0 ? (
								<div style={{ display: 'inlineFlow' }}>
									<p style={{ textAlign: 'center', fontSize: '18px' }}>
										Matched words...
									</p>
									{matchedWords.map(each => {
										return <div className='matchedWords'>{each.word}</div>;
									})}
								</div>
							) : (
								<p>Nothing matched</p>
							)
						) : (
							<p>Try searching to find matched words with the subtitles</p>
						)}
						<br />
						<WordResults words={words} />
					</Container>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default dictionary;
