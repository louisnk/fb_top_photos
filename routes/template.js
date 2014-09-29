/*
*
* Serve Hogan precompiled templates as a single js file,
* if not found, try to compile then serve.
*
*/
var reader = require('recursive-readdir');

exports.serve = function(req, res) {

	var templateFile = path.join(__dirname, '..', 'views', 'templates.js');

	this.serveTemplate = function(file) {
		fs.readFile(file, {'encoding': 'utf8'}, function(err, datas) {
			if (!err) {
				res.setHeader('content-type', 'application/javascript');
				res.end(datas);
			} 
			else {
				this.compileTemplates(function(err, done) {
					if (done) {
						this.serveTemplate(templateFile);
					} else throw err;
				}.bind(this));
			}
		}.bind(this));
	}.bind(this);

	this.compileTemplates = function(callback) {
		var dir = path.join(__dirname, '..', 'views', 'templates');
		this.hogan_compiler = require('../lib/hogan_compiler');

		reader(dir, function(err, list) {
			if (!err) {
				hogan_compiler.makeTemplates(dir,list, function(err, done) {
					return callback(err, done);
				});				
			} else console.log('Failed to compile templates - ' + err);
		});  
	}.bind(this);

	this.serveTemplate(templateFile);
	
	return this;
};