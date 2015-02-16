'use strict';

var fs = require('fs');
var url = require('url');
var app = module.exports = {};
var fileName;
var resource;

module.exports = function(req, res, routeArray) {
  var method = req.method;
  var urlPieces = req.url.split('/');
  fileName = urlPieces[urlPieces.length - 1];
  resource = urlPieces[urlPieces.length - 2];
  
  if(routeArray.indexOf(resource) === -1) {
  	res.writeHead(404, {
	  'Content-Type': 'text/plain'
	});
			
	res.end("file not found");
	return;
  };

  app[method](req,res,fileName);
};

app.POST = function (req, res, file) {
	var input = ''; // jshint ignore:line

	req.on('data', function(data) {
		input += data.toString('utf-8');
		console.log(input);
	});

	req.on('end', function() {
			var parsed = JSON.parse(input);
			console.log("on end");
			var postName = fileName;
			var doesFileExist;
			var poster = function (postName) {
					try {
  						doesFileExist = fs.readFileSync('./' + resource + '/' + postName +'.json');
  						return 'errorfile.json';
					} catch(e) {
  						return './' + resource + '/' + postName +'.json';
					}
			};

			console.log(poster(postName));

			if (poster(postName) ===  'errorfile.json') {
			parsed.system_says = "file already exists, data stored in errorfile.";
			} else {
			parsed.system_says = "this shit was posted.";
			}

			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			
			res.write(JSON.stringify(parsed));
			res.end(fs.writeFileSync(poster(postName), JSON.stringify(parsed)));
		});

};

app.PUT = function (req, res, file) {
		var input = ''; // jshint ignore:line

		req.on('data', function(data) {
			input += data.toString('utf-8');
		});

		req.on('end', function() {
			var parsed = JSON.parse(input);
			var postName = fileName;
			var doesFileExist;
			var poster = function (postName) {
					try {
  						doesFileExist = fs.readFileSync('./' + resource + '/' + postName +'.json');
  						return './' + resource + '/' + postName +'.json';
					} catch(e) {
  						return 'errorfile.json';
					}
			};
			if (poster(postName) ===  'errorfile.json') {
			parsed.system_says = "no such file exists.  data stored in errorfile.";
			} else {
			parsed.system_says = "this shit was put";
			}
			
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			
			res.write(JSON.stringify(parsed));
			res.end(fs.writeFileSync(poster(postName), JSON.stringify(parsed)));
		});
};

app.GET = function (req, res, file) {
		var input = ''; // jshint ignore:line

		req.on('data', function(data) {
			input += data.toString('utf-8');
		});

		req.on('end', function() {
			var postName = fileName;
			var doesFileExist;
			var getter = function(postName) {
				try {
  					doesFileExist = fs.readFileSync('./' + resource + '/' + postName +'.json');
  					return './' + resource + '/' + postName +'.json';
				} catch(e) {
					doesFileExist = {system_says: "no such file"};
  					return 'no such file';
				}

			};
			getter(postName);
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			var stringed = doesFileExist.toString('utf-8');
			res.write(stringed);
			res.end();
		});
};

app.PATCH = function (req, res, file) {
	var input = ''; // jshint ignore:line

		req.on('data', function(data) {
			input += data.toString('utf-8');
		});

		req.on('end', function() {
			var parsed = JSON.parse(input);
			var postName = fileName;
			var doesFileExist;
			var stringed = "";
			var poster = function (postName) {
					try {
  						doesFileExist = fs.readFileSync('./' + resource + '/' + postName +'.json');
  						stringed = doesFileExist.toString('utf-8');
  						return './' + resource + '/' + postName +'.json';
					} catch(e) {
						doesFileExist = {system_says: "no such file"};
  						return 'errorfile.json';
					}
			};
			if (poster(postName) ===  'errorfile.json') {
			parsed.system_says = "no such file exists.  nothing to patch.";
			} else {
			parsed.system_says = "this shit was patched";
			}

			var fileArray = stringed.split('"');
			var inputArray = JSON.stringify(parsed).split('"');
			var keyMatches = [];
			console.log("Old: ");
			console.log(fileArray);
			console.log("New: ");
			console.log(inputArray);

			for (var i = 1; i < fileArray.length; i += 4) {
				for (var k = 1; k <inputArray.length; k += 4) {

					if (fileArray[i] === inputArray[k]) {
						fileArray[i+2] = inputArray[k+2];
						console.log(fileArray[i] + ": this key has a match.  patch completed");
						keyMatches.push(fileArray[i]);
					} else {
						console.log(fileArray[i] + ": this key doesn't match");
					}
				}
			}

			var finalObject = "{";

			for (var j = 1; j < fileArray.length; j += 4) {
				finalObject += ('"'+fileArray[j]+'":"'+fileArray[j+2] + '"');
				if (fileArray[j] !== "system_says") {
					finalObject += ',';
				}
			}

			finalObject += "}";

			console.log("Transformed: " + finalObject);
			
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.write(JSON.stringify({keys_patched: keyMatches.toString()}));
			res.end(fs.writeFileSync(poster(postName), finalObject));
		});
	} 

app.DELETE = function (req, res, file) {
	var input = ''; // jshint ignore:line

	req.on('data', function(data) {
		input += data.toString('utf-8');
	});

	req.on('end', function() {
		var postName = fileName;
		var deleteFile = function(postName) {
			try {
  				fs.unlinkSync('./' + resource + '/' + postName +'.json');
  				return 'Your file deleted, master';
			} catch(e) {
  				return 'No such file.';
			}

		};
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.write(JSON.stringify({system_says: deleteFile(postName)}));
		res.end();
	});
};