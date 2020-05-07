import { useState, useEffect } from 'react';
import Head from 'next/head';
import Axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import WordResults from '../../components/WordResults';
import NavBar from '../../components/NavBar';
import { Container, Button, TextField } from '@material-ui/core';

const dictionary = ({ data }) => {
	const [searchWord, setSearchWord] = useState('');
	const [words, setWords] = useState([]);
	const [matchedWords, setMatchedWords] = useState([]);
	const [wordErrors, setWordErrors] = useState();
	const [file, setFile] = useState(false);

	const handleChange = async e => {
		setWordErrors('');
		setSearchWord(e.target.value);
	};

	const router = useRouter();
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
	} = data;

	const handleSubmit = async e => {
		e.preventDefault();
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
			const res = await Axios.post(`/api/${router.query.movieId}/dict`, body, config);
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
			Axios.get(`/api/${router.query.movieId}/dict`, config2).then(res => {
				setWords(res);
			});
		} catch (error) {
			if (error) throw error;
		}
	};

	useEffect(() => {
		// Fetching all the words on the initial render of the page
		const config = {
			'Content-Type': 'application/json',
		};
		Axios.get(`/api/${router.query.movieId}/dict`, config).then(res => {
			setWords(res);
		});
		// checcking for whether the subtitle for it is already there or not
		const config2 = {
			'Content-Type': 'application/json',
		};
		Axios.get(`/api/${router.query.movieId}/subtitles`, config2).then(res => {
			setFile(res.data);
		});
	}, []);

	//To display the matched words with the subtitles
	const handleSearch = async e => {
		if (!words.data.length) {
			alert(`No word is added yet!`);
		} else {
			const res = await Axios.get(`/api/${data.imdbID}/dict/matched`);
			setMatchedWords([]);
			words.data.map(item => {
				if (!(res.data.search(item.word) === -1)) {
					setMatchedWords(prevArray => [...prevArray, item]);
				}
			});
		}
		if (!matchedWords.length) {
			alert('Nothing matched!');
		}
	};

	return (
		<div>
			<Head>
				<title>Movies Words</title>
			</Head>
			<NavBar />
			<p className='currentMovieTitle'>{data.Title}</p>
			<Container>
				<form
					method='POST'
					action={`/api/${data.imdbID}/subtitles`}
					enctype='multipart/form-data'
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
				{matchedWords.length > 0 && (
					<div style={{ display: 'inlineFlow' }}>
						<p style={{ textAlign: 'center', fontSize: '18px' }}>Matched words...</p>
						{matchedWords.map(each => {
							return <div className='matchedWords'>{each.word}</div>;
						})}
					</div>
				)}
				<br />
				<WordResults words={words} />
			</Container>
		</div>
	);
};

dictionary.getInitialProps = async ctx => {
	console.log(ctx.query);
	if (ctx.query.movieId) {
		const res = await fetch(
			`http://www.omdbapi.com/?i=${ctx.query.movieId}&type=movie&apikey=${process.env.OmdbKey}`
		);
		const data = await res.json();
		return { data };
	}
};

export default dictionary;
