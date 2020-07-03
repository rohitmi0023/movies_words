//Route /api/auth
const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../dbconfig/dbconfig');

const server = express.Router();

//getting a user information
server.get(
	'/',
	(req, res, next) => {
		const token = req.header('auth-header-token');
		if (!token) {
			return res.status(401).json({ msg: 'No token, authentication failed' });
		}
		try {
			const decoded = jwt.verify(token, process.env.jwtSecret);
			req.userId = decoded.userId;
		} catch (err) {
			res.status(401).json({ msg: 'Invalid Token' });
		}
		next();
	},
	(req, res) => {
		try {
			connection.query(
				'SELECT email, username from `users` WHERE `id` = ?',
				[req.userId],
				(err, results) => {
					if (err) throw err;
					res.json({
						user: {
							id: req.userId,
							username: results[0].username,
							email: results[0].email,
						},
					});
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = server;
