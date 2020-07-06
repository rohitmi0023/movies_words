// Route /api/users
const express = require('express');
const connection = require('../dbconfig/dbconfig');
const { check, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const gravatar = require('gravatar');

const server = express.Router();

server.post(
	'/',
	[
		check('username', 'Username is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
		// .custom((value, { req }) => {
		// 	if (value !== req.body.rePassword) {
		// 		throw new Error(`Passwords don't match`);
		// 	} else {
		// 		return value;
		// 	}
		// }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { username, email, password } = req.body;
		try {
			connection.query('SELECT email from users WHERE email = ?', email, (err, results) => {
				if (err) throw err;
				try {
					if (!results.length) {
						// new user
						const userId = uuidv4();
						const emailVerifyHash = crypto
							.createHmac('sha256', process.env.CRYPTO_SECRET)
							.update(userId)
							.digest('hex');
						console.log(emailVerifyHash);
						const avatar = gravatar.url(email, {
							s: '200',
							r: 'pg',
							d: 'mm',
						});
						bcrypt.hash(password, 10, async (err, hash) => {
							let data = {
								id: userId,
								username,
								email,
								password: hash,
								email_hash: emailVerifyHash,
								avatar,
							};
							connection.query('INSERT INTO users SET ?', [data], (err, results) => {
								if (err) throw err;
								jwt.sign(
									{
										userId: userId,
									},
									process.env.jwtSecret,
									{ expiresIn: '1h' },
									(err, token) => {
										if (err) throw err;
										main(emailVerifyHash, userId, email).catch(console.error);
										return res.status(200).send({ token, emailVerifyHash });
									}
								);
							});
						});
					} else {
						throw new Error('Email is already in use!');
					}
				} catch (error) {
					return res.status(400).json({
						errors: [{ msg: error.message, param: 'email' }],
					});
				}
			});
		} catch (error) {
			console.log(`This is the throw error message ${error.message}`);
			return res.status(400).json({ errors: [{ msg: error.message, param: 'unknown' }] });
		}
	}
);

async function main(emailVerifyHash, userId, email) {
	// Generate test SMTP service account from ethereal.email
	// create reusable transporter object using the default SMTP transport
	const link = `http://localhost:3000/auth/verify/${userId}?q=${emailVerifyHash}`;
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		service: 'Gmail',
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'rohitracer0023@gmail.com', // generated ethereal user
			pass: `${process.env.EMAIL_PASSWORD}`, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'rohitracer0023@gmail.com', // sender address
		to: email, // list of receivers
		subject: 'Account Verification', // Subject line
		text: 'Verify', // plain text body
		html: `<div><a href=${link}><b>Click to verify</b></a></div>`,
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = server;
