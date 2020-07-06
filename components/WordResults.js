import React, { useEffect } from 'react';
import Axios from 'axios';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/dist/client/router';

const WordResults = ({ words }) => {
	const router = useRouter();
	// For upvoting and downvoting
	const handleClick = async (word_id, vote) => {
		try {
			// if (localStorage.jwtToken) {
			// 	Axios.defaults.headers.common['auth-header-token'] = localStorage.jwtToken;
			// } else {
			// 	delete Axios.defaults.headers.common['auth-header-token'];
			// }
			const word_id_var = {
				word_id: `${word_id}`,
				vote: `${vote}`,
			};
			const body = JSON.stringify(word_id_var);
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'auth-header-token': localStorage.getItem('jwtToken'),
				},
			};
			console.log(`Just above axios request of wordResults`);
			const res = await Axios.post(`/api/movies/:id/dict/${word_id}`, body, config);
			console.log(res);
		} catch (err) {
			console.log(err.message);
			console.log(err.response);
			console.log(err);
			console.log(err.response.data);
			console.log(err.response.data.message);
		}
	};
	// wordlist is the collection of words for each movie
	let wordList;
	if (words.data) {
		wordList = words.data.map(each => {
			return (
				<div
					key={each.id}
					style={{
						border: '2px dashed black',
						margin: '5px 5px',
						fontWeight: '500',
						fontStyle: 'italic',
						padding: '10px 10px',
						display: 'inline-block',
					}}
				>
					{each.word} {'   '}
					<ThumbUpIcon onClick={() => handleClick(each.id, +1)} /> {'  '} {each.upvotes}{' '}
					<ThumbDownIcon onClick={() => handleClick(each.id, -1)} />{' '}
				</div>
			);
		});
	}

	return (
		<div>
			{words.length + 1 ? (
				<div style={{ textAlign: 'center' }}>
					<CircularProgress />
				</div>
			) : words.data.length ? (
				<div style={{ display: 'inlineFlow' }}>{wordList}</div>
			) : (
				<p>No word added yet.</p>
			)}
		</div>
	);
};

export default WordResults;
