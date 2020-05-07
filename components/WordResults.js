import React, { useEffect } from 'react';
import Axios from 'axios';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CircularProgress from '@material-ui/core/CircularProgress';

const WordResults = ({ words }) => {
	const handleClick = async (word_id, vote) => {
		const value = localStorage.getItem('user');
		if (value) {
			localStorage.clear();
			const word_id_var = {
				word_id: `${word_id}`,
				vote: `${vote}`,
			};
			const body = JSON.stringify(word_id_var);
			console.log(body);
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const res = await Axios.post(`/api/:id/dict/${word_id}`, body, config);
			alert(res.data);
		} else {
			alert('You can vote just once per session!!!');
		}
	};
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
				<p>Nothing Found</p>
			)}
		</div>
	);
};

export default WordResults;
