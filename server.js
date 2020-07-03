const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const server = express();
		server.use(bodyParser.urlencoded({ extended: false }));
		server.use(bodyParser.json());

		//Routes
		server.use('/api/auth/verify', require('./routes/verify'));
		server.use('/api/auth', require('./routes/authRoute'));
		server.use('/api/users', require('./routes/signup'));
		server.use('/api/login', require('./routes/login'));
		server.use('/api/:id/dict', require('./routes/words'));
		server.use('/api/:id/dict/matched', require('./routes/wordSearch'));
		server.use('/api/:id/dict/:word_id', require('./routes/upvotes'));
		server.use('/api/:id/subtitles', require('./routes/subtitles'));

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		// Serve static assests if in production
		// if (process.env.NODE_ENV === 'production') {
		// 	//Set static folder
		// 	// app.use('/', express.static(path.join(__dirname, 'out')));
		// 	app.get('*', (req, res) => {
		// 		res.sendFile(path.join(__dirname, 'out', 'index.html'));
		// 	});
		// }

		server.listen(process.env.PORT || 3000, err => {
			if (err) throw err;
			console.log(`Server ready on localhost 3000`);
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		process.exit(1);
	});
