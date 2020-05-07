//Route /api/:id/dict

const express = require('express');
const connection = require('../dbconfig/dbconfig');
const { check, validationResult } = require('express-validator');
const _ = require('lodash');

const server = express.Router();

// to add a new word
server.post(
	'/',
	[
		check('searchWord')
			.isLength({ max: 25 })
			.withMessage('Word length exceeds 25!')
			.isLength({ min: 1 })
			.withMessage('Word cannot be empty!')
			.matches(/[A-Za-z]+$/)
			.withMessage('Word can contain only alphabets')
			.custom(async (value, { req }) => {
				const query = new Promise((resolve, reject) => {
					connection.query(
						'SELECT word from movies_word WHERE word = ? AND movie_id = ?',
						[value, req.body.imdbID],
						(err, results) => {
							if (!_.isEmpty(results)) {
								return reject(`${value} is already added!`);
							} else {
								resolve();
							}
						}
					);
				});
				await query;
			}),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		let {
			imdbID,
			Title,
			searchWord,
			Year,
			Genre,
			Director,
			Actors,
			Metascore,
			imdbRating,
			imdbVotes,
			Poster,
		} = req.body;
		imdbVotes = imdbVotes.replace(',', '');
		let data = {
			id: `${imdbID}`,
			title: `${Title}`,
			released_year: `${Year}`,
			genre: `${Genre}`,
			director: `${Director}`,
			actors: `${Actors}`,
			metascore: `${Metascore}`,
			imdb_rating: `${imdbRating}`,
			imdb_votes: `${imdbVotes}`,
			poster: `${Poster}`,
		};
		try {
			connection.query(
				'SELECT id from `movies_details` WHERE `id` = ?',
				`${imdbID}`,
				(err, results) => {
					if (err) throw err;
					if (!results.length) {
						// Movie isn't added yet, so adding the movie first
						connection.query(
							'INSERT INTO movies_details SET ?',
							data,
							(error, results) => {
								if (error) throw error;
							}
						);
					}
				}
			);
			connection.query(
				'SELECT word, movie_id from `movies_word` WHERE `word` = ? AND `movie_id` = ? ORDER BY upvotes DESC',
				[`${searchWord}`, `${imdbID}`],
				(err, results) => {
					if (err) throw err;
					if (!results.length) {
						// word isn't added yet
						const wordData = { word: `${searchWord}`, movie_id: `${imdbID}` };
						connection.query(
							'INSERT INTO movies_word SET ?',
							wordData,
							(err, results) => {
								if (err) throw err;
								res.json(`${searchWord} added!!!`).status(200);
							}
						);
					} else {
						// Word isn't added yet
					}
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send(`Server Errors`);
		}
	}
);

//To fetch all the words from db
server.get('/', (req, res) => {
	try {
		let movie_id = req.originalUrl.replace('/api/', '').replace('/dict', '');
		connection.query(
			'SELECT word, id, upvotes from `movies_word` WHERE movie_id = ? ORDER BY upvotes DESC',
			`${movie_id}`,
			(err, results) => {
				if (err) throw err;
				res.send(results);
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send(`Server Errors`);
	}
});

module.exports = server;
