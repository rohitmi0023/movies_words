const Dotenv = require('dotenv-webpack');

module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Add the new plugin to the existing webpack plugins
		config.plugins.push(new Dotenv({ silent: true }));

		return config;
	},
	env: {
		OmdbKey: process.env.OmdbKey,
		dbPassword: process.env.dbPassword,
	},
	exportPathMap: function () {
		return {
			'/': { page: '/' },
			'/:id': { page: '/[movieId]' },
			'/:id/dict': { page: '/[movieId]/dict' },
		};
	},
};
