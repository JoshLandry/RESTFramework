'use strict';

var http = require('http');
var fs = require('fs');
var rESTMethods = require('./RESTMethods');
console.log(rESTMethods);
var routeArray = [];

module.exports = {
	start: function () {
		http.createServer(function(req,res) {
			rESTMethods(req, res, routeArray);
		}).listen(3000, function() {
		console.log('server listening');
		});
	},
	addResource: function (resourceName) {
		routeArray.push(resourceName);
		try {
			fs.mkdirSync('./' + resourceName);
			return 'made new folders'
		} catch(e) {
			return 'folders already exist'
		}
	}
};