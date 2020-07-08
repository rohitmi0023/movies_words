// Route /api/:id/dict/:word_id

const express = require('express');
const connection = require('../dbconfig/dbconfig');
const jwt = require('jsonwebtoken');

const server = express.Router();

// To post a vote(upvote and downvote)
server.post(
	'/',
	(req, res, next) => {
		const token = req.header('auth-header-token');
		if (!token) {
			console.log('Came here !token');
			return res.status(401).json({ msg: 'No token, authorization failed!' });
		}
		try {
			console.log(`came under try button`);
			const decoded = jwt.verify(token, process.env.jwtSecret);
			req.userId = decoded.userId;
		} catch (err) {
			console.log(`Came here under catch`);
			return res.status(401).json({ msg: 'Invalid Token' });
		}
		next();
	},
	(req, res) => {
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
	}
);

module.exports = server;
