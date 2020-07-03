const express = require('express');
const connection = require('../dbconfig/dbconfig');

const server = express.Router();

server.post('/', (req, res) => {
	// console.log(req.body.userId);
	try {
		connection.query(
			`SELECT email_hash, is_Verified from users WHERE id = ?`,
			req.body.userId,
			(err, results) => {
				if (err) throw err;
				if (results[0].email_hash === req.body.userEmailHash) {
					connection.query(
						'UPDATE users SET is_Verified = 1 WHERE  id = ?',
						req.body.userId,
						(err, results) => {
							if (err) throw err;
							return res.status(200).send({ msg: 'Email Verified!' });
						}
					);
				} else {
					throw new Error(`Verification not matched`);
				}
			}
		);
	} catch (error) {
		return res.status(400).send({ error: error.msg });
	}
});

module.exports = server;
