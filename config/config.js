const path = require('path')
module.exports = {
	src: path.resolve(__dirname, '../src'),
	build: path.resolve(__dirname, '../dist'),
	public: path.resolve(__dirname, '../src'),
	pages: ['index', 'extensions', 'actions', 'userscripts', 'guides', '404']
}
