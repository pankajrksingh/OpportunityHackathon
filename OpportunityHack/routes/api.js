var express = require('express');
var api = express.Router();

var compare = require('./compare');

/**Handlers**/
api.use('/compare',compare);

module.exports = (function() {
	return api;
})();