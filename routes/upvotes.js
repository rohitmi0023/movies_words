// Route /api/:id/dict/:word_id

const express = require('express');
const connection = require('../dbconfig/dbconfig');

const server = express.Router();

// To post a vote(upvote and downvote)
server.post('/', (req, res) => {
	if (req.body.vote === '1') {
		connection.query(
			'UPDATE movies_word SET upvotes = upvotes + 1 WHERE id = ?',
			req.body.word_id,
			(err, results) => {
				if (err) throw err;
				res.send(`Upvoted!!!`);
			}
		);
	} else {
		connection.query(
			'UPDATE movies_word SET upvotes = upvotes - 1 WHERE id = ?',
			req.body.word_id,
			(err, results) => {
				if (err) throw err;
				res.send('Downvoted!!!');
			}
		);
	}
});

module.exports = server;
