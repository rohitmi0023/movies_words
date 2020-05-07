let mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: `${process.env.dbPassword}`,
	database: 'movies_words',
});

module.exports = connection;
