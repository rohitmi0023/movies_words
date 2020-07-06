// Route /api/:id/subtitles

const express = require('express');
const connection = require('../dbconfig/dbconfig');
const multer = require('multer');
const path = require('path');
const alert = require('alert');

const server = express.Router();

let storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

let upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		if (!file.originalname.match(/\.(srt)$/)) {
			req.fileValidationError = 'Only subtitles files (srt) are allowed!';
			return cb(new Error('Only subtitles files (srt) are allowed!'), false);
		}
		cb(null, true);
	},
	limits: {
		fileSize: 400 * 1000,
	},
}).single('profile');

// To upload the subtitles
server.post('/', (req, res) => {
	upload(req, res, function (err) {
		const movie_id = req.originalUrl.replace('/api/movies/', '').replace('/subtitles', '');
		if (err) {
			if (req.fileValidationError) {
				alert(err);
				res.redirect(`/movies/${movie_id}/dict`);
			}
			if (err.code == 'LIMIT_FILE_SIZE') {
				err.message = 'File Size is too large. Allowed file size is 400KB';
				err.success = false;
				alert('File Size is too large. Allowed file size is 400KB');
				res.redirect(`/movies/${movie_id}/dict`);
			}
		} else {
			if (!req.file) {
				const movie_id = req.originalUrl
					.replace('/api/movies', '')
					.replace('/subtitles', '');
				alert('Please select a file!');
				res.redirect(`/movies/${movie_id}/dict`);
			}
			if (req.file) {
				const movie_id = req.originalUrl
					.replace('/api/movies/', '')
					.replace('/subtitles', '');
				let data = {
					movie_id,
					name: `${req.file.filename}`,
					type: `${req.file.mimetype}`,
					file_size: `${req.file.size}`,
				};
				connection.query(
					'SELECT movie_id from `movies_subtitles` WHERE `movie_id` = ?',
					`${movie_id}`,
					(err, results) => {
						if (err) throw err;
						if (!results.length) {
							// subtitles is not added
							connection.query(
								`INSERT INTO movies_subtitles (id, username, email, password) VALUES (1, ${username}, ${email}, ${password}) `,
								function (err, result) {
									if (err) throw err;
									console.log(result);
								}
							);
						} else {
							//Subtitles is already added to it
							connection.query(
								'UPDATE movies_subtitles SET ? ',
								data,
								(err, results) => {
									if (err) throw err;
								}
							);
						}
					}
				);
				alert('Successfully uploaded!');
				res.redirect(`/movies/${movie_id}/dict`);
			}
		}
	});
});

// to check whether the subtitles exists for the specific movie
server.get('/', (req, res) => {
	const movie_id = req.originalUrl.replace('/api/movies/', '').replace('/subtitles', '');
	connection.query(
		'SELECT name from movies_subtitles WHERE movie_id = ?',
		movie_id,
		(err, results) => {
			if (err) throw err;
			if (results.length) {
				res.json(true);
			}
		}
	);
});

module.exports = server;
