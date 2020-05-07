// Route /api/:id/dict/matched

const express = require('express');
const connection = require('../dbconfig/dbconfig');
const fs = require('fs');

const server = express.Router();

// To get the matched words with the subtitles
server.get('/', (req, res) => {
	const movie_id = req.originalUrl.replace('/api/', '').replace('/dict/matched', '');
	try {
		connection.query(
			'SELECT name from `movies_subtitles` where movie_id = ?',
			`${movie_id}`,
			(err, results) => {
				// if (err) throw err;
				if (results.length) {
					fs.readFile(`./uploads/${results[0].name}`, 'utf-8', (err, data) => {
						// console.log(data.search(/[0-9]+/));
						if (err) throw err;
						data = data.replace(/[^a-zA-Z ]/g, '').toLowerCase();
						res.json(data);
					});
				} else {
					res.send('No subtitles found');
				}
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send(`Server Errors`);
	}
});

module.exports = server;
